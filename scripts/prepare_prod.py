#!/usr/bin/env python3
"""Copy the site from the local tq-site-staging clone into this repo, ready to publish as teamcubation.com.

Run it, review and commit, then push: GitHub Actions builds the site and publishes it
(.github/workflows/deploy.yml, copied from staging). Neither repo commits the built docs/ anymore.

    python3 scripts/prepare_prod.py --dry-run  # list what would change
    python3 scripts/prepare_prod.py            # copy and prepare for production
    python3 scripts/prepare_prod.py --staging ~/elsewhere/tq-site-staging  # if the clone isn't next to this repo

This repo ends up with the staging clone's content: every file git tracks there (or would add, so nothing
ignored) is copied over, and files here that staging doesn't have are deleted. Left alone on both sides:
anything ignored (node_modules, docs/, ...), editor/agent settings and staging's client editor (SKIP_DIRS)
and this repo's scripts/.

The copy is prepared for production on the way:
- every reference to site-staging.teamcubation.com becomes teamcubation.com (SITE.deployUrl in
  src/lib/seo.ts, ...). With the production deployUrl the build leaves out the noindex every staging page
  carries; the deploy workflow fails if a production page other than a redirect still says noindex;
- every CNAME file is set to site-origin.teamcubation.com. teamcubation.com is served by CloudFront, which
  sends /blog/* to the WordPress blog and everything else to GitHub Pages; GitHub Pages' custom domain is
  that origin hostname (staging's is site-staging-origin.teamcubation.com, mapped the same way);
- robots.txt allows indexing: every rule that blocks the whole site ("Disallow: /") becomes "Allow: /",
  "Noindex:" lines are dropped, and the site's and the blog's sitemaps are declared if they aren't.
"""

import argparse
import contextlib
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

STAGING_DOMAIN = "site-staging.teamcubation.com"
PROD_DOMAIN = "teamcubation.com"
# GitHub Pages' custom domains: CloudFront serves the public domains and fetches the site from these.
STAGING_ORIGIN = "site-staging-origin.teamcubation.com"
PROD_ORIGIN = "site-origin.teamcubation.com"
SITEMAP_URLS = (f"https://{PROD_DOMAIN}/sitemap-index.xml", f"https://{PROD_DOMAIN}/blog/sitemap_index.xml")

SELF = Path(__file__).resolve()
ROOT = SELF.parent.parent
# Not site content (editor/agent settings, dependencies, generated files, staging's client editor, an Apps
# Script project): never copied or deleted.
SKIP_DIRS = {".idea", ".vscode", ".claude", "node_modules", ".astro", "dist", "__pycache__", "editor-clientes"}
# This repo's own tooling, which staging doesn't have: never deleted.
KEEP_DIRS = {"scripts"}

STAGING_RE = re.compile(re.escape(STAGING_DOMAIN), re.IGNORECASE)
STAGING_ORIGIN_RE = re.compile(re.escape(STAGING_ORIGIN), re.IGNORECASE)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--staging", type=Path, default=ROOT.parent / "tq-site-staging",
                        help="local clone of the staging repo to copy from (default: %(default)s)")
    parser.add_argument("--dry-run", action="store_true", help="only list what would change, without writing anything")
    args = parser.parse_args()
    staging = args.staging.expanduser().resolve()

    if not (ROOT / "astro.config.mjs").is_file():
        sys.exit(f"error: {ROOT} doesn't look like the site repo (no astro.config.mjs)")
    if staging == ROOT:
        sys.exit("error: --staging points at this repo, it must be the staging clone")
    if not (staging / "astro.config.mjs").is_file() or not (staging / "public" / "CNAME").is_file():
        sys.exit(f"error: {staging} doesn't look like the staging clone (no astro.config.mjs or public/CNAME), "
                 "pass its path with --staging")

    warnings, errors = staging_state_warnings(staging), []
    staging_files, prod_files = content_files(staging), content_files(ROOT)
    counts = {"added": 0, "updated": 0, "deleted": 0}

    # Deletions go first: on a case-insensitive disk, a file renamed only by case would otherwise be
    # copied onto the old name and then deleted.
    for rel in sorted(prod_files - staging_files):
        if rel.split("/")[0] in KEEP_DIRS:
            continue
        print(f"{'deleted':<8}{rel}")
        counts["deleted"] += 1
        if not args.dry_run:
            (ROOT / rel).unlink()
            with contextlib.suppress(OSError):  # and its folder, once empty
                os.removedirs((ROOT / rel).parent)

    for rel in sorted(staging_files):
        src, dst = staging / rel, ROOT / rel
        if dst == SELF:
            continue
        data = src.read_bytes()
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:  # images, videos, fonts: copied as they are
            if STAGING_DOMAIN.encode() in data.lower():
                errors.append(f"{rel} is a binary file that mentions {STAGING_DOMAIN}, it can't be fixed automatically")
        else:
            data = to_production(src.name, text).encode("utf-8")
        if dst.is_file() and dst.read_bytes() == data:
            continue
        action = "updated" if dst.exists() else "added"
        print(f"{action:<8}{rel}")
        counts[action] += 1
        if not args.dry_run:
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(data)
            shutil.copymode(src, dst)

    source = os.path.relpath(staging, ROOT)
    changes = ", ".join(f"{count} {action}" for action, count in counts.items())
    if not any(counts.values()):
        print(f"Already up to date with {source}.")
    elif args.dry_run:
        print(f"\nDry run of copying {source}: {changes}. Nothing was written.")
    else:
        print(f"\nCopied {source}: {changes}. Review the changes with `git diff` before pushing.")
    for message in warnings:
        print(f"warning: {message}", file=sys.stderr)
    for message in errors:
        print(f"error: {message}", file=sys.stderr)
    return 1 if errors else 0


def staging_state_warnings(staging: Path) -> list:
    """Warn when the staging clone isn't its pushed main branch, since what's there is what gets copied."""
    # The first line looks like "## main...origin/main [ahead 3]", the rest are uncommitted changes.
    head, *changes = git(staging, "status", "--porcelain", "--branch").splitlines()
    branch = head[3:].split("...")[0]
    out_of_sync = re.search(r"\[(.+)\]$", head)
    warnings = []
    if branch != "main":
        warnings.append(f"{staging.name} is on branch {branch!r}, not main")
    if out_of_sync:
        warnings.append(f"{staging.name} isn't in sync with its remote ({out_of_sync.group(1)})")
    if changes:
        warnings.append(f"{staging.name} has uncommitted changes, they're included")
    return warnings


def content_files(repo: Path) -> set:
    """Paths, relative to the repo, of what git tracks or would add there, minus SKIP_DIRS and symlinks."""
    paths = git(repo, "ls-files", "-z", "--cached", "--others", "--exclude-standard").split("\0")
    return {
        rel for rel in paths
        if rel and not SKIP_DIRS.intersection(rel.split("/")[:-1])
        and (repo / rel).is_file() and not (repo / rel).is_symlink()
    }


def git(repo: Path, *args: str) -> str:
    # --no-optional-locks: don't take the index lock, git may be busy in that repo right now.
    result = subprocess.run(["git", "--no-optional-locks", "-C", str(repo), *args], capture_output=True, text=True)
    if result.returncode:
        sys.exit(f"error: git {args[0]} failed in {repo}: {result.stderr.strip()}")
    return result.stdout


def to_production(name: str, text: str) -> str:
    """Return the production version of a file's text."""
    if name == "CNAME":
        return PROD_ORIGIN + ("\n" if text.endswith("\n") else "")
    text = STAGING_RE.sub(PROD_DOMAIN, STAGING_ORIGIN_RE.sub(PROD_ORIGIN, text))
    if name == "robots.txt":
        text = allow_indexing(text)
    return text


def allow_indexing(robots: str) -> str:
    """Turn rules that block the whole site into "Allow: /", drop "Noindex:" lines, declare the sitemaps."""
    block_all = (("disallow", "/"), ("disallow", "/*"))
    lines = ["Allow: /" if robots_rule(line) in block_all else line
             for line in robots.rstrip().splitlines() if robots_rule(line)[0] != "noindex"]
    declared = {value for field, value in map(robots_rule, lines) if field == "sitemap"}
    missing = [url for url in SITEMAP_URLS if url not in declared]
    if missing:
        lines += ([""] if not declared else []) + [f"Sitemap: {url}" for url in missing]
    return "\n".join(lines) + "\n"


def robots_rule(line: str) -> tuple[str, str]:
    """Split a robots.txt line into its lowercased field and its value, ignoring comments."""
    field, _, value = line.split("#", 1)[0].partition(":")
    return field.strip().lower(), value.strip()


if __name__ == "__main__":
    sys.exit(main())

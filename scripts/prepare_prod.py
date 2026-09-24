#!/usr/bin/env python3
"""Copy the site from the local tq-site-staging clone into this repo, ready to publish as teamcubation.com.

Run it before pushing:

    python3 scripts/prepare_prod.py --dry-run  # list what would change
    python3 scripts/prepare_prod.py            # copy and prepare for production
    python3 scripts/prepare_prod.py --staging ~/elsewhere/tq-site-staging  # if the clone isn't next to this repo

This repo ends up with the staging clone's content: every file git tracks there (or would add, so nothing
ignored) is copied over, and files here that staging doesn't have are deleted. Left alone on both sides:
anything ignored (node_modules, ...), editor/agent settings (SKIP_DIRS) and this repo's scripts/.

The copy is prepared for production on the way:
- every reference to site-staging.teamcubation.com becomes teamcubation.com (og:url, og:image and
  twitter:image in the built pages, SITE.deployUrl in src/lib/seo.ts, ...);
- every CNAME file is set to teamcubation.com;
- robots.txt allows indexing: every rule that blocks the whole site ("Disallow: /") becomes "Allow: /",
  "Noindex:" lines are dropped, and the sitemap is declared if it isn't;
- no built page keeps a robots meta tag asking not to be indexed (noindex or none, for robots, googlebot,
  bingbot...), whatever its form. That covers the one Layout.astro adds to every page while
  SITE.deployUrl isn't production, and pages using its noindex prop. Only Astro's redirect pages keep
  theirs. If a noindex it doesn't recognize is left on a page, the run fails.
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
SITEMAP_URL = f"https://{PROD_DOMAIN}/sitemap-index.xml"

SELF = Path(__file__).resolve()
ROOT = SELF.parent.parent
# Not site content (editor/agent settings, dependencies, generated files): never copied or deleted.
SKIP_DIRS = {".idea", ".vscode", ".claude", "node_modules", ".astro", "dist", "__pycache__"}
# This repo's own tooling, which staging doesn't have: never deleted.
KEEP_DIRS = {"scripts"}

STAGING_RE = re.compile(re.escape(STAGING_DOMAIN), re.IGNORECASE)
META_TAG_RE = re.compile(r"<meta\b[^>]*>", re.IGNORECASE)
ATTR_RE = re.compile(r"""([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>/]+))""")


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
    # docs/CNAME matters: GitHub Pages drops the custom domain if the published folder doesn't have it.
    if not (staging / "astro.config.mjs").is_file() or not (staging / "docs" / "CNAME").is_file():
        sys.exit(f"error: {staging} doesn't look like the staging clone (no astro.config.mjs or docs/CNAME), "
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
            text = to_production(src.name, text)
            data = text.encode("utf-8")
            if src.suffix == ".html" and is_noindexed(text):
                errors.append(f"{rel} still has a noindex meta tag, in a form this script doesn't handle")
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
        return PROD_DOMAIN + ("\n" if text.endswith("\n") else "")
    text = STAGING_RE.sub(PROD_DOMAIN, text)
    if name == "robots.txt":
        text = allow_indexing(text)
    elif name.endswith(".html"):
        text = strip_noindex(text)
    return text


def allow_indexing(robots: str) -> str:
    """Turn rules that block the whole site into "Allow: /", drop "Noindex:" lines, declare the sitemap."""
    block_all = (("disallow", "/"), ("disallow", "/*"))
    lines = ["Allow: /" if robots_rule(line) in block_all else line
             for line in robots.rstrip().splitlines() if robots_rule(line)[0] != "noindex"]
    if not any(robots_rule(line)[0] == "sitemap" for line in lines):
        lines += ["", f"Sitemap: {SITEMAP_URL}"]
    return "\n".join(lines) + "\n"


def robots_rule(line: str) -> tuple[str, str]:
    """Split a robots.txt line into its lowercased field and its value, ignoring comments."""
    field, _, value = line.split("#", 1)[0].partition(":")
    return field.strip().lower(), value.strip()


def strip_noindex(html: str) -> str:
    """Drop the meta tags that keep a page out of search results, unless it's one of Astro's redirect pages."""
    if is_redirect(html):
        return html
    return META_TAG_RE.sub(lambda tag: "" if blocks_indexing(tag.group()) else tag.group(), html)


def blocks_indexing(tag: str) -> bool:
    """Whether a <meta> tag tells crawlers not to index the page."""
    attrs = meta_attrs(tag)
    directives = {d.strip() for d in attrs.get("content", "").lower().split(",")}
    # "robots" and the crawler-specific names (googlebot, googlebot-news, bingbot...) all contain "bot".
    return "bot" in attrs.get("name", "").lower() and bool(directives & {"noindex", "none"})


def is_noindexed(html: str) -> bool:
    """Whether a page other than a redirect still mentions noindex in a meta tag (a form not handled above)."""
    return not is_redirect(html) and any("noindex" in tag.lower() for tag in META_TAG_RE.findall(html))


def is_redirect(html: str) -> bool:
    """Whether the page is one of Astro's redirect pages (a meta refresh), which are meant to be noindex."""
    return any(meta_attrs(tag).get("http-equiv", "").lower() == "refresh" for tag in META_TAG_RE.findall(html))


def meta_attrs(tag: str) -> dict:
    """The attributes of an HTML tag, with lowercased names."""
    return {m[1].lower(): next(v for v in m.groups()[1:] if v is not None) for m in ATTR_RE.finditer(tag)}


if __name__ == "__main__":
    sys.exit(main())

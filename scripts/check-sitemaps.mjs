// Revisa los sitemaps publicados contra el sitio real: lee los que declara robots.txt (el del
// sitio y el del blog), abre los índices y pide cada URL sin seguir redirects. Falla si una URL
// no responde 200, si su canonical no es exactamente ella, si dice noindex (meta robots o
// X-Robots-Tag), si es un meta refresh, si no es https://<dominio>/… o si no tiene barra final.
// Ve lo que el build no puede ver (CloudFront, GitHub Pages, WordPress). Pide como un crawler que
// prefiere inglés: así detecta redirects por idioma (el blog manda /blog/ a /blog/en/ a quien pide en
// inglés, salvo a los crawlers). Corre en GitHub Actions después de cada deploy de producción, y a mano:
//
//   node scripts/check-sitemaps.mjs                         # https://teamcubation.com
//   node scripts/check-sitemaps.mjs https://otro.dominio
const base = new URL(process.argv[2] ?? "https://teamcubation.com");
const PARALELAS = 8;

const problemas = [];

async function pedir(url) {
  for (let intento = 1; ; intento++) {
    try {
      const r = await fetch(url, {
        redirect: "manual",
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; teamcubation-sitemap-check-bot)",
          "accept-language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(20000),
      });
      if (r.status < 500 || intento === 2) return { r, texto: await r.text() };
    } catch (e) {
      if (intento === 2) throw e;
    }
    await new Promise((listo) => setTimeout(listo, 2000));
  }
}

const desescapar = (s) => s.trim().replaceAll("&amp;", "&");
const attr = (tag, nombre) => tag.match(new RegExp(`\\s${nombre}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];

function revisarUrl(loc) {
  const url = new URL(loc);
  if (url.origin !== base.origin || url.search || url.hash) return [`no es una URL de ${base.origin}/`];
  if (!url.pathname.endsWith("/")) return ["no tiene barra final"];
  return [];
}

// Devuelve las URLs de un sitemap; si es un índice, las de todos sus sitemaps.
async function urlsDe(sitemap) {
  const { r, texto } = await pedir(sitemap);
  if (r.status !== 200) {
    problemas.push(`${sitemap}: el sitemap responde ${r.status}${r.headers.get("location") ? ` → ${r.headers.get("location")}` : ""}`);
    return [];
  }
  if (/<sitemapindex[\s>]/.test(texto)) {
    const hijos = [...texto.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)].map((m) => desescapar(m[1]));
    const urls = [];
    for (const hijo of hijos) {
      if (new URL(hijo).origin !== base.origin) problemas.push(`${sitemap}: lista ${hijo}, de otro dominio`);
      else urls.push(...(await urlsDe(hijo)));
    }
    return urls;
  }
  const urls = [...texto.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => desescapar(m[1]));
  console.log(`${sitemap}: ${urls.length} URLs`);
  return urls;
}

async function revisarPagina(loc) {
  const errores = revisarUrl(loc);
  if (errores.length) return errores;
  const { r, texto } = await pedir(loc);
  if (r.status !== 200) return [`responde ${r.status}${r.headers.get("location") ? ` → ${r.headers.get("location")}` : ""}`];
  if (/noindex|none/i.test(r.headers.get("x-robots-tag") ?? "")) errores.push(`X-Robots-Tag: ${r.headers.get("x-robots-tag")}`);
  if (!(r.headers.get("content-type") ?? "").includes("html")) return errores;
  const metas = texto.match(/<meta\b[^>]*>/gi) ?? [];
  if (metas.some((m) => /^refresh$/i.test(attr(m, "http-equiv") ?? ""))) errores.push("es un meta refresh");
  const robots = metas.filter((m) => /^(robots|googlebot|bingbot)$/i.test(attr(m, "name") ?? "")).map((m) => attr(m, "content"));
  if (robots.some((c) => /noindex|none/i.test(c ?? ""))) errores.push(`dice ${robots.join(" / ")}`);
  const canonical = (texto.match(/<link\b[^>]*>/gi) ?? []).find((l) => /^canonical$/i.test(attr(l, "rel") ?? ""));
  const href = canonical && attr(canonical, "href");
  if (href !== loc) errores.push(`su canonical es ${href ?? "(ninguno)"}`);
  return errores;
}

const robots = await pedir(new URL("/robots.txt", base));
const sitemaps = [...robots.texto.matchAll(/^\s*sitemap\s*:\s*(\S+)/gim)].map((m) => m[1]);
if (robots.r.status !== 200 || sitemaps.length === 0) {
  console.error(`${base.origin}/robots.txt no declara sitemaps (responde ${robots.r.status}).`);
  process.exit(1);
}

const todas = [];
for (const sitemap of sitemaps) {
  if (new URL(sitemap).origin !== base.origin) problemas.push(`robots.txt declara ${sitemap}, de otro dominio`);
  else todas.push(...(await urlsDe(sitemap)));
}
const vistas = new Set();
for (const loc of todas) {
  if (vistas.has(loc)) problemas.push(`${loc}: está repetida`);
  vistas.add(loc);
}

const pendientes = [...vistas];
let conProblemas = 0;
await Promise.all(
  Array.from({ length: PARALELAS }, async () => {
    while (pendientes.length) {
      const loc = pendientes.shift();
      const errores = await revisarPagina(loc).catch((e) => [`no se pudo pedir: ${e.message}`]);
      if (errores.length) {
        conProblemas++;
        problemas.push(`${loc}: ${errores.join("; ")}`);
      }
    }
  }),
);

for (const p of problemas.sort()) console.log(`✗ ${p}`);
console.log(`${vistas.size} URLs revisadas: ${vistas.size - conProblemas} bien, ${conProblemas} con problemas.`);
process.exit(problemas.length ? 1 : 0);

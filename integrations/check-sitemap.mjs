// Integración de Astro: al terminar el build revisa el sitemap que arma @astrojs/sitemap (va
// después de sitemap() en la lista de integraciones) y falla si una URL no es la canónica exacta
// de una página publicada: https://teamcubation.com/… con barra final, que no sea un redirect
// (meta refresh) ni diga noindex. También falla si una página publicada (salvo los redirects y
// la 404) no está en el sitemap con la URL de su canonical, así una página nueva no puede
// quedar afuera. Cada URL, y cada sitemap del índice, tiene que tener un lastmod W3C que no esté en el
// futuro (lo agrega sitemap-lastmod). El status real detrás de CloudFront y GitHub Pages lo revisa
// scripts/check-sitemaps.mjs contra el sitio publicado.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

function* archivosHtml(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) yield* archivosHtml(ruta);
    else if (e.name.endsWith(".html")) yield ruta;
  }
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim().replaceAll("&amp;", "&"));

const W3C = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;
function revisarLastmod(xml, etiqueta, problemas) {
  for (const [, entrada] of xml.matchAll(new RegExp(`<${etiqueta}>([\\s\\S]*?)</${etiqueta}>`, "g"))) {
    const loc = entrada.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const fechas = [...entrada.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1].trim());
    if (fechas.length !== 1) problemas.push(`${loc}: tiene ${fechas.length} lastmod, debe tener uno`);
    else if (!W3C.test(fechas[0]) || Number.isNaN(Date.parse(fechas[0]))) problemas.push(`${loc}: lastmod ${fechas[0]} no es una fecha W3C`);
    else if (Date.parse(fechas[0]) > Date.now() + 60_000) problemas.push(`${loc}: lastmod ${fechas[0]} está en el futuro`);
  }
}

function leerPagina(html) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  // En staging (og:url en otro dominio que el canonical) todas las páginas dicen noindex.
  const staging = Boolean(canonical && ogUrl && new URL(ogUrl).host !== new URL(canonical).host);
  return {
    canonical,
    redirect: html.includes('http-equiv="refresh"'),
    noindex: !staging && /noindex|none/.test(robots),
  };
}

export default function checkSitemap() {
  let site;
  return {
    name: "check-sitemap",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = new URL(config.site);
      },
      "astro:build:done": ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        const problemas = [];

        const indice = join(raiz, "sitemap-index.xml");
        if (!existsSync(indice)) throw new Error("Sitemap: no se generó sitemap-index.xml");
        const urls = [];
        const xmlIndice = readFileSync(indice, "utf8");
        revisarLastmod(xmlIndice, "sitemap", problemas);
        for (const loc of locs(xmlIndice)) {
          const archivo = join(raiz, new URL(loc).pathname);
          if (new URL(loc).origin !== site.origin || !existsSync(archivo)) {
            problemas.push(`sitemap-index.xml lista ${loc}, que no es un sitemap de este build`);
          } else {
            const xml = readFileSync(archivo, "utf8");
            revisarLastmod(xml, "url", problemas);
            urls.push(...locs(xml));
          }
        }

        const enSitemap = new Set();
        for (const loc of urls) {
          if (enSitemap.has(loc)) problemas.push(`${loc}: repetida`);
          enSitemap.add(loc);
          const url = new URL(loc);
          if (url.origin !== site.origin || url.search || url.hash) {
            problemas.push(`${loc}: no es una URL de ${site.origin}/`);
            continue;
          }
          if (!url.pathname.endsWith("/")) {
            problemas.push(`${loc}: no tiene barra final`);
            continue;
          }
          const archivo = join(raiz, decodeURIComponent(url.pathname), "index.html");
          if (!existsSync(archivo)) {
            problemas.push(`${loc}: no hay una página publicada en esa ruta`);
            continue;
          }
          const pagina = leerPagina(readFileSync(archivo, "utf8"));
          if (pagina.redirect) problemas.push(`${loc}: es un redirect`);
          else if (pagina.canonical !== loc) problemas.push(`${loc}: su canonical es ${pagina.canonical ?? "(ninguno)"}`);
          else if (pagina.noindex) problemas.push(`${loc}: dice noindex`);
        }

        for (const archivo of archivosHtml(raiz)) {
          const ruta = archivo.slice(raiz.length);
          if (ruta === "404.html") continue;
          const pagina = leerPagina(readFileSync(archivo, "utf8"));
          if (pagina.redirect || pagina.noindex) continue;
          if (!pagina.canonical) problemas.push(`${ruta}: no tiene canonical`);
          else if (!enSitemap.has(pagina.canonical)) problemas.push(`${ruta}: ${pagina.canonical} no está en el sitemap`);
        }

        if (problemas.length) throw new Error(`Sitemap con problemas:\n${problemas.join("\n")}`);
        logger.info(`Sitemap revisado: ${enSitemap.size} URLs, todas canónicas e indexables y con lastmod, sin páginas afuera.`);
      },
    },
  };
}

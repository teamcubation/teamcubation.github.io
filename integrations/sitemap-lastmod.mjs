// Integración de Astro: agrega <lastmod> al sitemap que arma @astrojs/sitemap (va después de
// sitemap() y de check-jsonld en la lista de integraciones; check-sitemap lo revisa después).
//
// El lastmod de una URL es cuándo cambió por última vez el contenido de esa página, no cuándo se hizo
// el build. Para saberlo, compara cada página del build con la que está publicada (en el dominio de
// og:url: staging o producción): si su contenido no cambió, conserva el lastmod del sitemap publicado;
// si cambió o es nueva, usa la hora del build, que es cuando el cambio se publica. El contenido es lo
// que se lee en la página: el title, la meta description, el JSON-LD propio (sin Organization ni
// WebSite, que van en todas) y el <main>, con su texto, sus enlaces y sus imágenes. El header, el
// footer, el CSS y los scripts no cuentan. En sitemap-index.xml, el lastmod de cada sitemap es cuándo
// cambió ese archivo.
//
// Si no puede leer el sitio publicado, en GitHub Actions el build falla (una fecha inventada en el
// sitemap es peor que reintentar el deploy); en una máquina local avisa y usa la hora del build.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Pocos pedidos a la vez y reintentos durante un minuto: justo después de un deploy, GitHub Pages
// puede responder 503 por un rato, y CloudFront guarda ese error unos 10 segundos.
const PARALELAS = 4;
const INTENTOS = 6;
const INDICE = "/sitemap-index.xml";

const attr = (tag, nombre) => tag.match(new RegExp(`\\s${nombre}\\s*=\\s*"([^"]*)"`))?.[1];

/** Lo que cuenta como contenido de una página (su HTML), como texto para comparar. */
export function contenido(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
  const descripcion = attr(html.match(/<meta name="description"[^>]*>/)?.[0] ?? "", "content") ?? "";
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((m) => {
      const datos = JSON.parse(m[1]);
      return datos["@graph"] ?? [datos];
    })
    .filter((n) => n["@type"] !== "Organization" && n["@type"] !== "WebSite");
  const main = (html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/g, "");
  const partes = [];
  for (const [, etiqueta, texto] of main.matchAll(/(<[^>]*>)|([^<]+)/g)) {
    if (etiqueta) {
      for (const nombre of ["href", "src", "alt"]) {
        const valor = attr(etiqueta, nombre);
        if (valor !== undefined) partes.push(`${nombre}=${valor}`);
      }
    } else if (texto.trim()) {
      partes.push(texto.replace(/\s+/g, " ").trim());
    }
  }
  return JSON.stringify({ title, descripcion, jsonLd, main: partes });
}

async function pedir(url) {
  for (let intento = 1; ; intento++) {
    try {
      const r = await fetch(url, {
        redirect: "manual",
        headers: { "user-agent": "Mozilla/5.0 (compatible; teamcubation-sitemap-lastmod-bot)" },
        signal: AbortSignal.timeout(20000),
      });
      if (r.status < 500) return { status: r.status, texto: await r.text() };
      if (intento === INTENTOS) throw new Error(`responde ${r.status}`);
    } catch (e) {
      if (intento === INTENTOS) throw new Error(`no se pudo leer ${url}: ${e.message}`);
    }
    await new Promise((listo) => setTimeout(listo, 1000 * 2 ** intento));
  }
}

// Las entradas de un sitemap (<url>) o de un índice (<sitemap>): loc → lastmod.
const entradas = (xml, etiqueta) =>
  new Map(
    [...xml.matchAll(new RegExp(`<${etiqueta}>([\\s\\S]*?)</${etiqueta}>`, "g"))].map(([, e]) => [
      e.match(/<loc>([^<]+)<\/loc>/)?.[1].trim(),
      e.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].trim(),
    ])
  );

// Escribe el lastmod de cada entrada después de su <loc>.
const conLastmod = (xml, etiqueta, fecha) =>
  xml.replace(new RegExp(`(<${etiqueta}>\\s*<loc>([^<]+)</loc>)`, "g"), (_, inicio, loc) => `${inicio}<lastmod>${fecha(loc.trim())}</lastmod>`);

async function publicado(ruta, origen, etiqueta) {
  const url = new URL(ruta, origen);
  const { status, texto } = await pedir(url);
  if (status !== 200) throw new Error(`${url} responde ${status}`);
  return { texto, entradas: entradas(texto, etiqueta) };
}

// Las fechas publicadas que siguen valiendo: las de las URLs cuyo contenido no cambió y las de los
// sitemaps que quedan iguales. Las que no están acá llevan la hora del build.
async function fechasVigentes(raiz, sitemaps, origen, ahora) {
  const indice = await publicado(INDICE, origen, "sitemap");
  const urls = new Map();
  const deSitemaps = new Map();
  for (const s of sitemaps) {
    const anterior = await publicado(s.ruta, origen, "url");
    const pendientes = [...entradas(s.xml, "url").keys()];
    await Promise.all(
      Array.from({ length: PARALELAS }, async () => {
        while (pendientes.length) {
          const url = pendientes.shift();
          const path = decodeURIComponent(new URL(url).pathname);
          const nuevo = contenido(readFileSync(join(raiz, path, "index.html"), "utf8"));
          const viejo = await pedir(new URL(path, origen));
          let igual = false;
          try {
            igual = viejo.status === 200 && contenido(viejo.texto) === nuevo;
          } catch {} // JSON-LD roto en la página publicada: cuenta como cambio
          const fecha = anterior.entradas.get(url);
          if (igual && fecha) urls.set(url, fecha);
        }
      })
    );
    const xml = conLastmod(s.xml, "url", (url) => urls.get(url) ?? ahora);
    if (xml === anterior.texto && indice.entradas.get(s.loc)) deSitemaps.set(s.loc, indice.entradas.get(s.loc));
  }
  return { urls, deSitemaps };
}

export default function sitemapLastmod() {
  return {
    name: "sitemap-lastmod",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        const ahora = new Date().toISOString().replace(/\.\d+Z$/, "Z");
        // El sitio publicado está en el dominio de og:url (donde vive este build).
        const ogUrl = readFileSync(join(raiz, "index.html"), "utf8").match(/<meta property="og:url" content="([^"]+)"/)?.[1];
        if (!ogUrl) throw new Error("sitemap-lastmod: la home no tiene og:url");
        const origen = new URL(ogUrl).origin;

        const indice = readFileSync(join(raiz, INDICE), "utf8");
        const sitemaps = [...entradas(indice, "sitemap").keys()].map((loc) => {
          const ruta = new URL(loc).pathname;
          return { loc, ruta, xml: readFileSync(join(raiz, ruta), "utf8") };
        });
        let vigentes = { urls: new Map(), deSitemaps: new Map() };
        try {
          vigentes = await fechasVigentes(raiz, sitemaps, origen, ahora);
        } catch (e) {
          if (process.env.CI) throw new Error(`sitemap-lastmod: ${e.message}`);
          logger.warn(`${e.message}. Todas las URLs llevan la hora del build: este sitemap sirve para revisar, no para publicar.`);
        }

        let total = 0;
        for (const s of sitemaps) {
          total += entradas(s.xml, "url").size;
          writeFileSync(join(raiz, s.ruta), conLastmod(s.xml, "url", (url) => vigentes.urls.get(url) ?? ahora));
        }
        writeFileSync(join(raiz, INDICE), conLastmod(indice, "sitemap", (loc) => vigentes.deSitemaps.get(loc) ?? ahora));
        logger.info(`lastmod: ${total} URLs comparadas con ${origen}; ${total - vigentes.urls.size} cambiaron o son nuevas (${ahora}).`);
      },
    },
  };
}

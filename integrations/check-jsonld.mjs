// Integración de Astro: al terminar el build revisa el JSON-LD de cada página publicada y
// falla si un bloque no es JSON válido, si una referencia {"@id"} no apunta a un nodo de la
// misma página, si falta el Organization, si el WebPage no es uno solo con la url del
// canonical, si una pregunta del FAQPage o su respuesta no está tal cual en el texto que
// muestra la página, o si aparece el dominio donde vive el build (el de og:url, p.ej. staging)
// cuando no es el canónico.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const TIPOS_PAGINA = new Set(["WebPage", "AboutPage", "ContactPage", "CollectionPage"]);

function* archivosHtml(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) yield* archivosHtml(ruta);
    else if (e.name.endsWith(".html")) yield ruta;
  }
}

// Junta los @id definidos (nodos con datos) y los referenciados (objetos que solo tienen @id).
function recorrer(valor, definidos, referencias) {
  if (Array.isArray(valor)) return valor.forEach((v) => recorrer(v, definidos, referencias));
  if (!valor || typeof valor !== "object") return;
  const claves = Object.keys(valor);
  if (typeof valor["@id"] === "string") (claves.length === 1 ? referencias : definidos).add(valor["@id"]);
  for (const k of claves) recorrer(valor[k], definidos, referencias);
}

const ENTIDADES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const normalizar = (texto) =>
  texto
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (entidad, c) =>
      /^#x/i.test(c) ? String.fromCodePoint(parseInt(c.slice(2), 16))
      : c[0] === "#" ? String.fromCodePoint(Number(c.slice(1)))
      : (ENTIDADES[c] ?? entidad)
    )
    .replace(/\s+/g, " ")
    .trim();

// El texto que muestra la página: el <body> sin scripts, estilos ni etiquetas.
const textoVisible = (html) =>
  normalizar((html.match(/<body[\s\S]*<\/body>/)?.[0] ?? "").replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " "));

function revisarPagina(html) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  // Las páginas de redirect (meta refresh) y la 404 no llevan JSON-LD.
  if (!canonical || html.includes('http-equiv="refresh"')) return [];
  const bloques = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (bloques.length === 0) return ["no tiene JSON-LD"];

  const errores = [];
  const definidos = new Set();
  const referencias = new Set();
  const nodos = [];
  for (const bloque of bloques) {
    try {
      const datos = JSON.parse(bloque);
      recorrer(datos, definidos, referencias);
      nodos.push(...(datos["@graph"] ?? [datos]));
    } catch (e) {
      errores.push(`JSON-LD inválido: ${e.message}`);
    }
  }
  for (const id of referencias) if (!definidos.has(id)) errores.push(`referencia sin nodo: ${id}`);
  if (!nodos.some((n) => n["@type"] === "Organization")) errores.push("falta el nodo Organization");
  const paginas = nodos.filter((n) => TIPOS_PAGINA.has(n["@type"]));
  if (paginas.length !== 1 || paginas[0].url !== canonical) {
    errores.push(`debe tener un solo WebPage, con url ${canonical}`);
  }
  const faqs = nodos.filter((n) => n["@type"] === "FAQPage");
  const visible = faqs.length ? textoVisible(html) : "";
  for (const faq of faqs) {
    const preguntas = Array.isArray(faq.mainEntity) ? faq.mainEntity : [];
    if (!preguntas.length) errores.push("el FAQPage no tiene preguntas");
    for (const q of preguntas) {
      const respuesta = q.acceptedAnswer?.text;
      if (q["@type"] !== "Question" || !q.name || q.acceptedAnswer?.["@type"] !== "Answer" || !respuesta) {
        errores.push(`FAQPage: pregunta incompleta: ${q.name ?? "(sin texto)"}`);
      } else if (!visible.includes(normalizar(q.name)) || !visible.includes(normalizar(respuesta))) {
        errores.push(`FAQPage: la página no muestra tal cual «${q.name}» y su respuesta`);
      }
    }
  }
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const hostBuild = ogUrl && new URL(ogUrl).host;
  if (hostBuild && hostBuild !== new URL(canonical).host && bloques.some((b) => b.includes(hostBuild))) {
    errores.push(`menciona ${hostBuild}; el JSON-LD usa siempre el dominio canónico`);
  }
  return errores;
}

export default function checkJsonLd() {
  return {
    name: "check-jsonld",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        const problemas = [];
        let revisadas = 0;
        for (const archivo of archivosHtml(raiz)) {
          const html = readFileSync(archivo, "utf8");
          const errores = revisarPagina(html);
          if (html.includes("application/ld+json")) revisadas++;
          for (const error of errores) problemas.push(`${archivo.slice(raiz.length)}: ${error}`);
        }
        if (problemas.length) throw new Error(`JSON-LD con problemas:\n${problemas.join("\n")}`);
        logger.info(`JSON-LD revisado en ${revisadas} páginas, sin problemas.`);
      },
    },
  };
}

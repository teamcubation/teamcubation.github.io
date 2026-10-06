// Clientes del sitio, en el orden en que se muestran. La lista vive en clientes.json y la edita
// el editor de clientes (editor-clientes/); cada logo es src/assets/clientes/<slug>.png, un solo
// gris con transparencia, recortado y de 120 px de alto. La usan la grilla de Clientes (todos),
// la tira de logos de la home (los que tienen home: true) y llms.txt. Las marcas no se traducen.
// Si la lista o un logo no es válido, el build falla y no se publica nada.
import type { ImageMetadata } from "astro";
import lista from "./clientes.json";

export interface Cliente {
  slug: string;
  nombre: string;
  home: boolean;
  logo: ImageMetadata;
}

const logos = import.meta.glob<{ default: ImageMetadata }>("../assets/clientes/*.png", { eager: true });
const logoDe = (slug: string) => logos[`../assets/clientes/${slug}.png`]?.default;

function validar(datos: unknown): Cliente[] {
  if (!Array.isArray(datos)) throw new Error("clientes.json: tiene que ser una lista");
  const errores: string[] = [];
  const slugs = new Set<string>();
  const nombres = new Set<string>();
  const clientes = datos.map((c, i): Cliente => {
    const donde = `clientes.json, cliente ${i + 1}`;
    const { slug, nombre, home } = c ?? {};
    if (typeof slug !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errores.push(`${donde}: slug inválido (${JSON.stringify(slug)})`);
    else if (slugs.has(slug)) errores.push(`${donde}: el slug ${slug} está repetido`);
    if (typeof nombre !== "string" || !nombre.trim()) errores.push(`${donde}: falta el nombre`);
    else if (nombres.has(nombre.trim().toLowerCase())) errores.push(`${donde}: el nombre ${nombre} está repetido`);
    if (typeof home !== "boolean") errores.push(`${donde}: home tiene que ser true o false`);
    const logo = logoDe(slug);
    if (typeof slug === "string" && !logo) errores.push(`${donde}: falta el logo src/assets/clientes/${slug}.png`);
    slugs.add(slug);
    if (typeof nombre === "string") nombres.add(nombre.trim().toLowerCase());
    return { slug, nombre: typeof nombre === "string" ? nombre.trim() : nombre, home, logo };
  });
  if (errores.length) throw new Error(`Lista de clientes con problemas:\n${errores.join("\n")}`);
  const sobrantes = Object.keys(logos)
    .map((ruta) => ruta.split("/").pop()!.replace(/\.png$/, ""))
    .filter((slug) => !slugs.has(slug));
  if (sobrantes.length) console.warn(`Logos de clientes que no están en clientes.json: ${sobrantes.join(", ")}`);
  return clientes;
}

export const clientes = validar(lista);
export const clientesHome = clientes.filter((c) => c.home);

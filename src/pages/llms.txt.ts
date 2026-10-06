// llms.txt: el texto vive en src/content/llms.txt y la lista de clientes de cada idioma se arma
// con src/data/clientes.json, para que siempre coincida con la que muestra el sitio.
import type { APIRoute } from "astro";
import plantilla from "../content/llms.txt?raw";
import { clientes } from "../data/clientes";

// "A, B y C" con la conjunción de cada idioma; en español va "e" antes de un nombre que suena a i.
function enumerar(nombres: string[], idioma: string): string {
  if (nombres.length < 2) return nombres.join("");
  const ultimo = nombres[nombres.length - 1];
  const y = idioma === "en" ? "and" : idioma === "pt" ? "e" : /^[hH]?[iíIÍ](?![aeiouáéíóú])/.test(ultimo) ? "e" : "y";
  return `${nombres.slice(0, -1).join(", ")} ${y} ${ultimo}`;
}

export const GET: APIRoute = () => {
  const nombres = clientes.map((c) => c.nombre);
  const texto = plantilla.replace(/\{\{clientes:(en|es|pt)\}\}/g, (_, idioma) => enumerar(nombres, idioma));
  if (texto.includes("{{")) throw new Error("llms.txt: quedó un marcador sin reemplazar");
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

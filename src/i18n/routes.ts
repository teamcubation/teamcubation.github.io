// Mapa de rutas localizadas. Los segmentos de nivel superior se traducen;
// los slugs de programa (marca) NO se traducen (starter-ai, booster-ai, …).
import type { Locale } from "./config";

export interface RutaLoc {
  path: string;
  label: string;
}

/** Páginas principales: path + label de navegación por idioma. */
export const rutas: Record<string, Record<Locale, RutaLoc>> = {
  home: {
    es: { path: "/", label: "Inicio" },
    en: { path: "/en/", label: "Home" },
    pt: { path: "/pt/", label: "Início" },
  },
  metodologia: {
    es: { path: "/metodologia", label: "Metodología" },
    en: { path: "/en/methodology", label: "Methodology" },
    pt: { path: "/pt/metodologia", label: "Metodologia" },
  },
  servicios: {
    es: { path: "/servicios", label: "Servicios" },
    en: { path: "/en/services", label: "Services" },
    pt: { path: "/pt/servicos", label: "Serviços" },
  },
  teamboarding: {
    es: { path: "/teamboarding", label: "Teamboarding" },
    en: { path: "/en/teamboarding", label: "Teamboarding" },
    pt: { path: "/pt/teamboarding", label: "Teamboarding" },
  },
  casos: {
    es: { path: "/casos", label: "Clientes" },
    en: { path: "/en/clients", label: "Clients" },
    pt: { path: "/pt/clientes", label: "Clientes" },
  },
  nosotros: {
    es: { path: "/nosotros", label: "Nosotros" },
    en: { path: "/en/about", label: "About" },
    pt: { path: "/pt/sobre", label: "Sobre" },
  },
  contacto: {
    es: { path: "/contacto", label: "Contacto" },
    en: { path: "/en/contact", label: "Contact" },
    pt: { path: "/pt/contato", label: "Contato" },
  },
};

/** Base de la sección de servicios por idioma (para armar las URLs de programa). */
export const basesServicios: Record<Locale, string> = {
  es: "/servicios",
  en: "/en/services",
  pt: "/pt/servicos",
};

/** Devuelve el path localizado de una página principal. */
export function ruta(key: string, locale: Locale): string {
  return rutas[key]?.[locale]?.path ?? "/";
}

/** URL de un programa (slug de marca, sin traducir) en un idioma. */
export function rutaPrograma(slug: string, locale: Locale): string {
  const s = slug.replace("/servicios/", "");
  return `${basesServicios[locale]}/${s}`;
}

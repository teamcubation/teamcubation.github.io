// Helpers de SEO: constantes del sitio + generadores de JSON-LD (schema.org).

export const SITE = {
  // Dominio canónico (producción) — canonical, hreflang, JSON-LD.
  url: "https://teamcubation.com",
  // Dominio donde vive ESTE build (staging) — og:image / og:url, para que
  // la preview resuelva mientras producción no esté publicada.
  deployUrl: "https://site-staging.teamcubation.com",
  name: "Teamcubation",
  email: "hola@teamcubation.com",
  ogImage: "/og/og-default.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

// Países donde opera (según el copy del sitio).
const PAISES = ["Argentina", "Brasil", "Uruguay", "Chile", "Colombia", "España"];

/** Organization — se incluye en todas las páginas (fuente para @id refs). */
export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo-horizontal-color.png`,
  email: SITE.email,
  foundingDate: "2021",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
  },
  founder: [
    { "@type": "Person", name: "Mariano Wechsler" },
    { "@type": "Person", name: "Diego Jolodenco" },
  ],
  areaServed: PAISES,
};

// Códigos BCP-47 por idioma (para inLanguage de schema.org).
export const langCode: Record<string, string> = { es: "es-AR", en: "en", pt: "pt-BR" };

/** WebSite — para la Home, con inLanguage según el idioma. */
export function websiteSchema(lang: string) {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: langCode[lang] ?? lang,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

/** BreadcrumbList a partir de una lista {name, path}. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

/** Service — para las páginas de programa. Sin precios ni reviews (regla de marca). */
export function serviceSchema(
  svc: { nombre: string; slug: string; meta: string; foco: string },
  lang = "es",
  url?: string
) {
  const pageUrl = url ?? `${SITE.url}${svc.slug}`;
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: svc.nombre,
    serviceType: svc.foco,
    description: svc.meta,
    url: pageUrl,
    inLanguage: langCode[lang] ?? lang,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: PAISES,
  };
}

/** ItemList — para el índice de Servicios. */
export function itemListSchema(items: { nombre: string; slug: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      url: `${SITE.url}${it.slug}`,
    })),
  };
}

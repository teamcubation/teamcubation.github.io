// Helpers de SEO: constantes del sitio + generadores de JSON-LD (schema.org).
// Los textos salen del contenido de las páginas, así el JSON-LD dice lo mismo que el sitio.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { Locale } from "../i18n/config";
import { conBarra, ruta } from "../i18n/routes";
import { nosotrosContent } from "../content/nosotros";
import { teamboardingContent } from "../content/teamboarding";

export const SITE = {
  // Dominio canónico (producción) — canonical, hreflang, JSON-LD.
  url: "https://teamcubation.com",
  // Dominio donde vive ESTE build (staging) — og:image / og:url, para que
  // la preview resuelva mientras producción no esté publicada.
  deployUrl: "https://teamcubation.com",
  name: "Teamcubation",
  // Razón social (la que figura en los Términos y Condiciones).
  legalName: "TQ DESARROLLADORES S.A.S.",
  email: "hola@teamcubation.com",
  linkedin: "https://www.linkedin.com/company/teamcubation/",
  ogImage: "/og/og-default.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

/** @id de los nodos que se referencian entre sí. El blog (WordPress, snippet WPCode 713)
 *  reemplaza la organización de Yoast por esta, con su @id, logo, razón social y LinkedIn,
 *  y usa estas @id para los autores del equipo: si cambian, actualizar el snippet. */
export const ids = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  logo: `${SITE.url}/#logo`,
  teamboarding: `${SITE.url}/#teamboarding`,
  person: (slug: string) => `${SITE.url}/#/schema/person/${slug}`,
};

// Países donde opera (según el copy del sitio), con el nombre en cada idioma.
const PAISES: Record<Locale, string[]> = {
  es: ["Argentina", "Brasil", "Uruguay", "Chile", "Colombia", "España"],
  en: ["Argentina", "Brazil", "Uruguay", "Chile", "Colombia", "Spain"],
  pt: ["Argentina", "Brasil", "Uruguai", "Chile", "Colômbia", "Espanha"],
};
const areaServed = (lang: Locale) => PAISES[lang].map((name) => ({ "@type": "Country", name }));

// Fundadores: su clave de foto en Nosotros, que también es el slug de su @id.
const FUNDADORES = ["mariano-wechsler", "diego-jolodenco"];

// Códigos BCP-47 por idioma (para inLanguage de schema.org).
export const langCode: Record<string, string> = { es: "es-AR", en: "en", pt: "pt-BR" };

/** Organization — se incluye en todas las páginas (fuente para @id refs). */
export function organizationSchema(lang: Locale) {
  const c = nosotrosContent[lang];
  const logoUrl = `${SITE.url}/brand/logo-horizontal-color.png`;
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: logoUrl,
      contentUrl: logoUrl,
      width: 8000,
      height: 1760,
      caption: SITE.name,
    },
    image: { "@id": ids.logo },
    description: c.defQ.ps[0],
    slogan: c.heroMarca,
    email: SITE.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      url: `${SITE.url}${ruta("contacto", lang)}`,
      availableLanguage: ["Spanish", "English", "Portuguese"],
    },
    sameAs: [SITE.linkedin],
    foundingDate: "2021",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressCountry: "AR",
      },
    },
    founder: c.fundadores
      .filter((f) => FUNDADORES.includes(f.foto))
      .map((f) => ({ "@type": "Person", "@id": ids.person(f.foto), name: f.nombre, sameAs: [f.linkedin] })),
    areaServed: areaServed(lang),
  };
}

/** WebSite — en todas las páginas, para que los WebPage puedan referenciarlo. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": ids.website,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: Object.values(langCode),
  publisher: { "@id": ids.organization },
};

/** WebPage (o AboutPage, ContactPage, CollectionPage) — lo arma el Layout para cada página. */
export function webPageSchema(p: {
  type?: string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  breadcrumb?: string;
  mainEntity?: string;
}) {
  return {
    "@type": p.type ?? "WebPage",
    "@id": `${p.url}#webpage`,
    url: p.url,
    name: p.name,
    description: p.description,
    inLanguage: p.inLanguage,
    isPartOf: { "@id": ids.website },
    ...(p.breadcrumb && { breadcrumb: { "@id": p.breadcrumb } }),
    ...(p.mainEntity && { mainEntity: { "@id": p.mainEntity } }),
  };
}

/** BreadcrumbList a partir de una lista {name, path}; el último item es la página. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}${conBarra(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${conBarra(it.path)}`,
    })),
  };
}

/** Service — para las páginas de programa. Sin precios ni reviews (regla de marca). */
export function serviceSchema(
  svc: { nombre: string; slug: string; meta: string; foco: string },
  lang: Locale = "es",
  url?: string
) {
  const pageUrl = conBarra(url ?? `${SITE.url}${svc.slug}`);
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: svc.nombre,
    serviceType: svc.foco,
    description: svc.meta,
    url: pageUrl,
    provider: { "@id": ids.organization },
    areaServed: areaServed(lang),
  };
}

/** ItemList — para el índice de Servicios (path = la página del índice). */
export function itemListSchema(items: { nombre: string; slug: string }[], path: string) {
  return {
    "@type": "ItemList",
    "@id": `${SITE.url}${conBarra(path)}#list`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      url: `${SITE.url}${conBarra(it.slug)}`,
    })),
  };
}

/** SoftwareApplication — Teamboarding, el producto de Teamcubation (página Teamboarding). */
export function teamboardingSchema(lang: Locale) {
  return {
    "@type": "SoftwareApplication",
    "@id": ids.teamboarding,
    name: "Teamboarding",
    url: "https://teamboarding.com/",
    description: teamboardingContent[lang].heroBajada,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": ids.organization },
  };
}

const equipoFotos = import.meta.glob<{ default: ImageMetadata }>("../assets/equipo/*.png", { eager: true });

/** Person — el equipo de Nosotros, con el mismo rol, foto y LinkedIn que muestra la página. */
export async function equipoSchema(lang: Locale) {
  return Promise.all(
    nosotrosContent[lang].fundadores.map(async (f) => {
      // Mismas opciones que el <Image> de NosotrosBody: reutiliza ese mismo archivo.
      const foto = await getImage({ src: equipoFotos[`../assets/equipo/${f.foto}.png`].default, width: 400 });
      return {
        "@type": "Person",
        "@id": ids.person(f.foto),
        name: f.nombre,
        jobTitle: f.rol,
        image: `${SITE.url}${foto.src}`,
        sameAs: [f.linkedin],
        worksFor: { "@id": ids.organization },
      };
    })
  );
}

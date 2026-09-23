// Configuración i18n — ES es el idioma raíz; EN y PT quedan preparados.
// El copy actual está solo en español (ver decisión en .agent/landing-v5-brief.md §2).

export const locales = ["es", "en", "pt"] as const;
export const defaultLocale = "es";

export type Locale = (typeof locales)[number];

/** Extrae el locale del pathname. Raíz sin prefijo => 'es'. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, seg] = url.pathname.split("/");
  return (locales as readonly string[]).includes(seg)
    ? (seg as Locale)
    : defaultLocale;
}

/** Antepone el prefijo de idioma a una ruta ('es' no lleva prefijo). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}

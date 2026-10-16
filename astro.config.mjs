// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import checkJsonLd from './integrations/check-jsonld.mjs';
import checkSitemap from './integrations/check-sitemap.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://teamcubation.com',
  outDir: './docs',
  // Inlinea el CSS en el HTML para eliminar la cadena crítica de requests
  // (CSS render-blocking). El CSS del sitio es chico (~7KB gzip por página).
  build: { inlineStylesheets: 'always' },
  // i18n: ES es el idioma raíz (sin prefijo); EN y PT quedan preparados.
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Redirects de URLs del sitio anterior hacia las rutas nuevas.
  // Segmentos traducidos por idioma; los slugs de programa (marca) no se traducen.
  // Los destinos EN/PT resuelven cuando se publiquen esos idiomas.
  // Astro solo genera páginas con meta refresh: CloudFront (función tc-viewer-redirects) repite
  // esta lista como 301. Si se agrega uno acá, agregarlo también allá.
  redirects: {
    // Español
    '/incubation': '/servicios/incubation/',
    '/booster-ai': '/servicios/booster-ai/',
    '/es': '/', // sitio de 2022
    // Inglés (dos formatos históricos → /en/services/…)
    '/incubation-en': '/en/services/incubation/',
    '/en/incubation': '/en/services/incubation/',
    '/booster-ai-en': '/en/services/booster-ai/',
    '/en/booster-ai': '/en/services/booster-ai/',
    '/contact': '/en/contact/',
    // Portugués (dos formatos históricos → /pt/servicos/…)
    '/incubation-pt': '/pt/servicos/incubation/',
    '/pt/incubation': '/pt/servicos/incubation/',
    '/booster-ai-pt': '/pt/servicos/booster-ai/',
    '/pt/booster-ai': '/pt/servicos/booster-ai/',
    '/contato': '/pt/contato/',
    '/pt/contact': '/pt/contato/', // sitio de 2022
  },
  // check-sitemap va después de sitemap(): revisa lo que deja en docs/.
  integrations: [sitemap(), checkJsonLd(), checkSitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
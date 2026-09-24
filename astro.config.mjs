// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
  redirects: {
    // Español
    '/incubation': '/servicios/incubation/',
    '/booster-ai': '/servicios/booster-ai/',
    // Inglés (dos formatos históricos → /en/services/…)
    '/incubation-en': '/en/services/incubation/',
    '/en/incubation': '/en/services/incubation/',
    '/booster-ai-en': '/en/services/booster-ai/',
    '/en/booster-ai': '/en/services/booster-ai/',
    // Portugués (dos formatos históricos → /pt/servicos/…)
    '/incubation-pt': '/pt/servicos/incubation/',
    '/pt/incubation': '/pt/servicos/incubation/',
    '/booster-ai-pt': '/pt/servicos/booster-ai/',
    '/pt/booster-ai': '/pt/servicos/booster-ai/',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://teamcubation.com',
  outDir: './docs',
  redirects: {
    '/incubation-en': '/en/incubation',
    '/incubation-pt': '/pt/incubation',
    '/booster-ai-en': '/en/booster-ai',
    '/booster-ai-pt': '/pt/booster-ai',
    '/contact': '/en/contact',
    '/contato': '/pt/contato',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
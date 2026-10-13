// Integración de Astro: al terminar el build deja una copia de la página ES de Teamboarding en
// /teamboarding-es/. En producción GitHub Pages no sirve /teamboarding/: teamcubation.com es el
// sitio de la organización (teamcubation.github.io) y GitHub manda esa ruta al repo
// teamcubation/teamboarding, que es teamboarding.com. Por eso CloudFront (función
// tc-viewer-redirects) pide /teamboarding/ a esta copia y redirige /teamboarding-es/ a
// /teamboarding/. La copia es idéntica (canonical /teamboarding/) y no entra al sitemap.
import { cpSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export default function teamboardingEs() {
  return {
    name: "teamboarding-es",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        cpSync(join(raiz, "teamboarding", "index.html"), join(raiz, "teamboarding-es", "index.html"));
        logger.info("Copia de /teamboarding/ en /teamboarding-es/, para CloudFront.");
      },
    },
  };
}

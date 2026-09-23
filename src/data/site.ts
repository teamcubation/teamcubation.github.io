// Datos de sitio compartidos (navegación, footer, contacto).
// Fuente: .agent/content-map.md §0. Español (raíz). Al sumar EN/PT se localiza aquí.

export const email = "hola@teamcubation.com";

export const ctaPrincipal = {
  label: "Agendar una conversación",
  href: "/contacto",
};

/** Navegación principal (cabecera). */
export const navPrincipal = [
  { label: "Metodología", href: "/metodologia" },
  { label: "Servicios", href: "/servicios" },
  { label: "Teamboarding", href: "/teamboarding" },
  { label: "Clientes", href: "/casos" },
  { label: "Nosotros", href: "/nosotros" },
];

/** Footer — grupo «Conozca Teamcubation» (nav principal + Contacto). */
export const conozca = [
  ...navPrincipal,
  { label: "Contacto", href: "/contacto" },
];

/** Footer — grupo «Programas». Orden EXACTO del diseño (const ORDEN en v2). */
export const programas = [
  { label: "Discovery", href: "/servicios/discovery" },
  { label: "Starter AI", href: "/servicios/starter-ai" },
  { label: "Booster AI", href: "/servicios/booster-ai" },
  { label: "Booster AI Intensivo", href: "/servicios/booster-ai-intensivo" },
  { label: "VibeCode Studio", href: "/servicios/vibecode-studio" },
  { label: "AI Builders", href: "/servicios/ai-builders" },
  { label: "Booster AI Dev", href: "/servicios/booster-ai-dev" },
  { label: "Incubation", href: "/servicios/incubation" },
];

export const footerBrand = {
  claim: "La capacidad queda en las personas.",
  descripcion:
    "Teamcubation entrena equipos para adoptar IA sobre sus procesos y construir capacidades que crecen dentro de la empresa.",
  copyright: "Teamcubation. La experiencia no se enseña: se entrena.",
};

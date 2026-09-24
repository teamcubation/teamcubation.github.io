// Strings de interfaz compartidos, por idioma. (ES = original; EN/PT traducidos
// con criterio empresarial — pendientes de revisión humana antes de publicar.)
import type { Locale } from "./config";

export const email = "hola@teamcubation.com";

export const ui: Record<Locale, {
  cta: string;
  skip: string;
  navAria: string;
  footerAria: string;
  footerConoce: string;
  footerProgramas: string;
  footerClaim: string;
  footerDesc: string;
  footerCopy: string;
  legalTerminos: string;
  legalPrivacidad: string;
  cierreTexto: string;
  langNombre: string;
}> = {
  es: {
    cta: "Agendar una conversación",
    skip: "Ir al contenido",
    navAria: "Navegación principal",
    footerAria: "Pie de página",
    footerConoce: "Conozca Teamcubation",
    footerProgramas: "Programas",
    footerClaim: "La capacidad queda en las personas.",
    footerDesc: "Teamcubation entrena equipos para adoptar IA y desarrollar software sobre los procesos y proyectos de su empresa. La capacidad queda en las personas.",
    footerCopy: "Teamcubation. La experiencia no se enseña: se entrena.",
    legalTerminos: "Términos y Condiciones",
    legalPrivacidad: "Política de Privacidad",
    cierreTexto: "Conversemos sobre cómo potenciar su compañía con IA.",
    langNombre: "Español",
  },
  en: {
    cta: "Schedule a conversation",
    skip: "Skip to content",
    navAria: "Main navigation",
    footerAria: "Footer",
    footerConoce: "Get to know Teamcubation",
    footerProgramas: "Programs",
    footerClaim: "The capability stays with your people.",
    footerDesc: "Teamcubation trains teams to adopt AI and build software on their company's processes and projects. The capability stays with the people.",
    footerCopy: "Teamcubation. Experience isn't taught: it's trained.",
    legalTerminos: "Terms and Conditions",
    legalPrivacidad: "Privacy Policy",
    cierreTexto: "Let's talk about how to power your company with AI.",
    langNombre: "English",
  },
  pt: {
    cta: "Agende uma conversa",
    skip: "Ir para o conteúdo",
    navAria: "Navegação principal",
    footerAria: "Rodapé",
    footerConoce: "Conheça a Teamcubation",
    footerProgramas: "Programas",
    footerClaim: "A capacidade fica nas pessoas.",
    footerDesc: "A Teamcubation treina equipes para adotar IA e desenvolver software sobre os processos e projetos da sua empresa. A capacidade fica nas pessoas.",
    footerCopy: "Teamcubation. A experiência não se ensina: se treina.",
    legalTerminos: "Termos e Condições",
    legalPrivacidad: "Política de Privacidade",
    cierreTexto: "Vamos conversar sobre como potencializar sua empresa com IA.",
    langNombre: "Português",
  },
};

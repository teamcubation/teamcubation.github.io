// Contenido de Clientes (Casos) por idioma. ES = original (v2); EN traducido con
// criterio empresarial (pendiente de revisión humana). Nombres de clientes (marca)
// no se traducen; los países sí.
import type { Locale } from "../i18n/config";

interface Stat { num?: string; lbl: string }
interface Enlace { label: string; href: string }

export interface CasosContent {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  heroH1: string;
  heroBajada: string;
  heroImgAlt: string;
  industriasH2: string;
  stats: Stat[];
  clientesH3: string;
  impactoH2: string;
  destacado: string;
  nota: string;
  partidaH2: string;
  partidaP: string;
  links: Enlace[];
  cierreTexto: string;
}

export interface ClienteLogo { logo: string; alt: string }

// Grilla de clientes (logos). Las marcas no se traducen: lista única para los 3 idiomas.
export const clientesGrilla: ClienteLogo[] = [
  { logo: "mercado-libre", alt: "Mercado Libre" },
  { logo: "coca-cola", alt: "Coca-Cola" },
  { logo: "visa", alt: "Visa" },
  { logo: "ey", alt: "EY" },
  { logo: "hp", alt: "HP" },
  { logo: "cargill", alt: "Cargill" },
  { logo: "accenture", alt: "Accenture" },
  { logo: "tenaris", alt: "Tenaris" },
  { logo: "boston-scientific", alt: "Boston Scientific" },
  { logo: "banco-macro", alt: "Banco Macro" },
  { logo: "banco-comafi", alt: "Banco Comafi" },
  { logo: "swiss-medical", alt: "Swiss Medical" },
  { logo: "byma", alt: "BYMA" },
  { logo: "wtw", alt: "WTW" },
  { logo: "prosegur", alt: "Prosegur" },
  { logo: "andreani", alt: "Andreani" },
  { logo: "arcor-agronegocios", alt: "Arcor Agronegocios" },
  { logo: "advanta", alt: "Advanta" },
  { logo: "gdm-seeds", alt: "GDM Seeds" },
  { logo: "vista-energy", alt: "Vista Energy" },
  { logo: "aconcagua-energia", alt: "Aconcagua Energía" },
  { logo: "clear-petroleum", alt: "Clear Petroleum" },
  { logo: "elea", alt: "Elea" },
  { logo: "endeavor", alt: "Endeavor" },
  { logo: "iov-labs", alt: "Rootstock Labs" },
  { logo: "agrotoken", alt: "JusToken" },
  { logo: "tca", alt: "TCA" },
  { logo: "grupo-corven", alt: "Grupo Corven" },
  { logo: "max-capital", alt: "Max Capital" },
  { logo: "plaza-logistica", alt: "Plaza Logística" },
  { logo: "celsur", alt: "Celsur" },
  { logo: "defiba", alt: "Defiba" },
  { logo: "metropol", alt: "Metropol" },
  { logo: "bolsapel", alt: "Bolsapel" },
  { logo: "ceibos-group", alt: "Ceibos Group" },
  { logo: "espartina", alt: "Espartina" },
  { logo: "telviso", alt: "Telviso" },
  { logo: "vital-network", alt: "Vital Network" },
  { logo: "strix", alt: "Strix" },
  { logo: "natura", alt: "Natura" },
  { logo: "payway", alt: "Payway" },
  { logo: "parque-de-la-innovacion", alt: "Parque de la Innovación" },
  { logo: "arcelormittal-acindar", alt: "ArcelorMittal Acindar" },
  { logo: "dreamco", alt: "Dreamco" },
];

export const casosContent: Record<"es" | "en" | "pt", CasosContent> = {
  es: {
    seoTitle: "Clientes: impacto medible con IA | Teamcubation",
    seoDesc: "Conozca la trayectoria de Teamcubation: más de 90 empresas líderes en 5 países. Entre sus clientes están Mercado Libre y Banco Comafi.",
    kicker: "Clientes",
    heroH1: "La experiencia de Teamcubation trabajando con empresas.",
    heroBajada: "Teamcubation opera actualmente en 6 países —Argentina, Brasil, Uruguay, Chile, Colombia y España— y entrega sus programas de forma remota a equipos en cualquier geografía. Más de 90 empresas líderes confían en ellos, entre ellas Mercado Libre, Coca-Cola Latam y Visa.",
    heroImgAlt: "Equipo reunido alrededor de una mesa de trabajo",
    industriasH2: "Equipos y procesos en distintas industrias.",
    stats: [
      { num: "+90", lbl: "Más de 90 empresas líderes." },
      { num: "5", lbl: "5 países." },
      { lbl: "Nuestra trayectoria incluye empresas de banca, salud, logística, energía y tecnología." },
    ],
    clientesH3: "Entre nuestros clientes.",    impactoH2: "Impacto en los procesos intervenidos.",
    destacado: "Teamcubation registra resultados de hasta 35% de eficiencia en los procesos intervenidos.",
    nota: "Es un resultado agregado de la experiencia de Teamcubation. No representa un promedio ni una mejora general de toda la empresa, y no se atribuye a cada cliente nombrado en esta página.",
    partidaH2: "El punto de partida es una necesidad concreta.",
    partidaP: "Un proceso que necesita automatizarse, un equipo que empieza a usar IA o un producto que debe construirse. El trabajo de Teamcubation parte de esa necesidad y de la capacidad que la empresa quiere desarrollar en su gente.",
    links: [
      { label: "Conocer la metodología", href: "/metodologia/" },
      { label: "Comparar los programas", href: "/servicios/" },
    ],
    cierreTexto: "Conversemos sobre cómo potenciar su compañía con IA.",
  },

  en: {
    seoTitle: "Clients: measurable impact with AI | Teamcubation",
    seoDesc: "Explore Teamcubation's track record: more than 90 leading companies in 5 countries. Its clients include Mercado Libre and Banco Comafi.",
    kicker: "Clients",
    heroH1: "Teamcubation's experience working with companies.",
    heroBajada: "Teamcubation currently operates in 6 countries —Argentina, Brazil, Uruguay, Chile, Colombia and Spain— and delivers its programs remotely to teams in any geography. More than 90 leading companies trust them, including Mercado Libre, Coca-Cola Latam and Visa.",
    heroImgAlt: "Team gathered around a work table",
    industriasH2: "Teams and processes across different industries.",
    stats: [
      { num: "+90", lbl: "More than 90 leading companies." },
      { num: "5", lbl: "5 countries." },
      { lbl: "Our track record includes companies in banking, healthcare, logistics, energy and technology." },
    ],
    clientesH3: "Among our clients.",    impactoH2: "Impact on the processes we worked on.",
    destacado: "Teamcubation records results of up to 35% efficiency in the processes it worked on.",
    nota: "It is an aggregate result of Teamcubation's experience. It does not represent an average or an overall improvement across the entire company, and it is not attributed to each client named on this page.",
    partidaH2: "The starting point is a concrete need.",
    partidaP: "A process that needs to be automated, a team starting to use AI or a product that needs to be built. Teamcubation's work starts from that need and from the capability the company wants to develop in its people.",
    links: [
      { label: "Explore our methodology", href: "/en/methodology/" },
      { label: "Compare the programs", href: "/en/services/" },
    ],
    cierreTexto: "Let's talk about how to power your company with AI.",
  },

  pt: {
    seoTitle: "Clientes: impacto mensurável com IA | Teamcubation",
    seoDesc: "Conheça a trajetória da Teamcubation: mais de 90 empresas líderes em 5 países. Entre seus clientes estão o Mercado Livre e o Banco Comafi.",
    kicker: "Clientes",
    heroH1: "A experiência da Teamcubation trabalhando com empresas.",
    heroBajada: "A Teamcubation atua atualmente em 6 países —Argentina, Brasil, Uruguai, Chile, Colômbia e Espanha— e entrega seus programas de forma remota a equipes em qualquer geografia. Mais de 90 empresas líderes confiam neles, entre elas Mercado Livre, Coca-Cola Latam e Visa.",
    heroImgAlt: "Equipe reunida ao redor de uma mesa de trabalho",
    industriasH2: "Equipes e processos em diferentes indústrias.",
    stats: [
      { num: "+90", lbl: "Mais de 90 empresas líderes." },
      { num: "5", lbl: "5 países." },
      { lbl: "Nossa trajetória inclui empresas de banca, saúde, logística, energia e tecnologia." },
    ],
    clientesH3: "Entre nossos clientes.",    impactoH2: "Impacto nos processos em que atuamos.",
    destacado: "A Teamcubation registra resultados de até 35% de eficiência nos processos em que atuou.",
    nota: "É um resultado agregado da experiência da Teamcubation. Não representa uma média nem uma melhoria geral de toda a empresa, e não é atribuído a cada cliente citado nesta página.",
    partidaH2: "O ponto de partida é uma necessidade concreta.",
    partidaP: "Um processo que precisa ser automatizado, uma equipe que começa a usar IA ou um produto que precisa ser construído. O trabalho da Teamcubation parte dessa necessidade e da capacidade que a empresa quer desenvolver em sua gente.",
    links: [
      { label: "Conheça nossa metodologia", href: "/pt/metodologia/" },
      { label: "Comparar os programas", href: "/pt/servicos/" },
    ],
    cierreTexto: "Vamos conversar sobre como potencializar a sua empresa com IA.",
  },
};

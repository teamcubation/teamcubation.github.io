// Contenido de Prensa. El español es el del diseño (entrega de octubre de 2026); EN y PT,
// traducidos. Cada nota está una sola vez, con su texto en los tres idiomas. Para sumar una:
// agregarla en su sección (con su logo en src/assets/medios/, gris #595959 sobre fondo
// transparente) y actualizar ACTUALIZADO.
import type { Locale } from "../i18n/config";

type Texto = Record<Locale, string>;

/** Última actualización de la página: la página muestra mes y año; el JSON-LD, la fecha. */
export const ACTUALIZADO = "2026-10-08";

/** Otra cobertura del mismo hecho, con el logo de su medio. */
export interface Extra {
  url: string;
  texto: Texto;
  logo?: string;
}

export interface Nota {
  medio: string;
  /** Logo en src/assets/medios/<logo>.png; sin logo se muestra el nombre del medio. */
  logo?: string;
  /** Texto alternativo del logo, cuando el logo no es el del medio. */
  logoAlt?: string;
  tipo: Texto;
  /** AAAA-MM-DD. */
  fecha: string;
  titulo: Texto;
  url: string;
  /** Idioma de la nota (hreflang del enlace), si no es español. */
  idioma?: string;
  /** Tarjetas: resumen y texto del enlace. En el archivo el enlace es el título. */
  parrafos?: Record<Locale, string[]>;
  enlace?: Texto;
  /** Archivo: otras coberturas, debajo del título. */
  extra?: Extra[];
}

const igual = (s: string): Texto => ({ es: s, en: s, pt: s });

const TIPO = {
  columna: { es: "Columna", en: "Column", pt: "Coluna" },
  cobertura: { es: "Cobertura", en: "Coverage", pt: "Cobertura" },
  entrevista: { es: "Entrevista", en: "Interview", pt: "Entrevista" },
  podcast: igual("Podcast"),
  charla: { es: "Charla", en: "Talk", pt: "Palestra" },
  inversion: { es: "Inversión", en: "Investment", pt: "Investimento" },
};

/** Tarjetas grandes, en dos columnas. */
export const destacados: Nota[] = [
  {
    medio: "Infobae",
    logo: "infobae",
    tipo: TIPO.columna,
    fecha: "2025-06-17",
    titulo: {
      es: "Habilitar a todos: el camino más directo hacia la productividad y la transformación digital",
      en: "Enabling everyone: the most direct path to productivity and digital transformation",
      pt: "Habilitar todos: o caminho mais direto para a produtividade e a transformação digital",
    },
    parrafos: {
      es: ["En esta columna, Mariano Wechsler plantea la idea que da origen a Booster AI: habilitar a personas de cualquier área para que automaticen sus propias tareas con IA, con acompañamiento y sobre su trabajo real, mientras IT se enfoca en lo estratégico."],
      en: ["In this column, Mariano Wechsler sets out the idea behind Booster AI: enabling people in any area to automate their own tasks with AI, with support and on their real work, while IT focuses on strategic work."],
      pt: ["Nesta coluna, Mariano Wechsler apresenta a ideia que dá origem ao Booster AI: habilitar pessoas de qualquer área para que automatizem as suas próprias tarefas com IA, com acompanhamento e sobre o seu trabalho real, enquanto a área de TI se concentra no que é estratégico."],
    },
    url: "https://www.infobae.com/opinion/2025/06/17/habilitar-a-todos-el-camino-mas-directo-hacia-la-productividad-y-la-transformacion-digital/",
    enlace: { es: "Leer la columna en Infobae", en: "Read the column in Infobae", pt: "Ler a coluna no Infobae" },
  },
  {
    medio: "Forbes Argentina",
    logo: "forbes-argentina",
    tipo: TIPO.cobertura,
    fecha: "2026-03-13",
    titulo: {
      es: "Booster AI: cómo convertir la inversión en inteligencia artificial en eficiencia y ganancias",
      en: "Booster AI: how to turn investment in artificial intelligence into efficiency and profits",
      pt: "Booster AI: como transformar o investimento em inteligência artificial em eficiência e lucro",
    },
    parrafos: {
      es: [
        "Forbes presenta el modelo de adopción de IA de Teamcubation: trabajar sobre procesos concretos de empleados no técnicos para convertir tareas repetitivas en automatizaciones y lograr impacto medible dentro de las empresas.",
        "La nota describe a Teamcubation como una compañía que busca desarrollar una nueva categoría: empresas que no venden IA, sino adopción real de IA.",
      ],
      en: [
        "Forbes presents Teamcubation's AI adoption model: working on the concrete processes of non-technical employees to turn repetitive tasks into automations and achieve measurable impact inside companies.",
        "The article describes Teamcubation as a company seeking to build a new category: companies that don't sell AI, but real AI adoption.",
      ],
      pt: [
        "A Forbes apresenta o modelo de adoção de IA da Teamcubation: trabalhar sobre processos concretos de funcionários não técnicos para transformar tarefas repetitivas em automações e alcançar impacto mensurável dentro das empresas.",
        "A matéria descreve a Teamcubation como uma empresa que busca desenvolver uma nova categoria: empresas que não vendem IA, e sim adoção real de IA.",
      ],
    },
    url: "https://www.forbesargentina.com/negocios/booster-ai-como-convertir-inversion-inteligencia-artificial-eficiencia-ganancias-n87629",
    enlace: { es: "Leer la nota en Forbes Argentina", en: "Read the article in Forbes Argentina", pt: "Ler a matéria na Forbes Argentina" },
  },
  {
    medio: "LA NACION",
    logo: "la-nacion",
    tipo: TIPO.cobertura,
    fecha: "2026-08-13",
    titulo: {
      es: "Las empresas invierten millones en IA, pero pocas ven resultados: el error que explica por qué",
      en: "Companies invest millions in AI, but few see results: the mistake that explains why",
      pt: "As empresas investem milhões em IA, mas poucas veem resultados: o erro que explica por quê",
    },
    parrafos: {
      es: ["LA NACION analiza por qué muchas organizaciones incorporan inteligencia artificial sin conseguir todavía impacto económico significativo. Mariano Wechsler y Diego Jolodenco, fundadores de Teamcubation, explican el problema de adopción y la distancia entre tener acceso a una tecnología y aprender a incorporarla al trabajo real."],
      en: ["LA NACION looks at why many organizations bring in artificial intelligence without yet achieving significant economic impact. Mariano Wechsler and Diego Jolodenco, Teamcubation's founders, explain the adoption problem and the gap between having access to a technology and learning to bring it into real work."],
      pt: ["O LA NACION analisa por que muitas organizações incorporam inteligência artificial sem ainda conseguir um impacto econômico significativo. Mariano Wechsler e Diego Jolodenco, fundadores da Teamcubation, explicam o problema de adoção e a distância entre ter acesso a uma tecnologia e aprender a incorporá-la ao trabalho real."],
    },
    url: "https://www.lanacion.com.ar/economia/IA/las-empresas-invierten-millones-en-ia-pero-pocas-ven-resultados-el-error-que-explica-por-que-nid13082026/",
    enlace: { es: "Leer la nota en LA NACION", en: "Read the article in LA NACION", pt: "Ler a matéria no LA NACION" },
  },
  {
    medio: "iProfesional",
    logo: "iprofesional",
    tipo: TIPO.cobertura,
    fecha: "2026-03-03",
    titulo: {
      es: "¿Por qué la inteligencia artificial no está dando resultados en las empresas?",
      en: "Why isn't artificial intelligence delivering results in companies?",
      pt: "Por que a inteligência artificial não está dando resultados nas empresas?",
    },
    parrafos: {
      es: ["La nota aborda la distancia entre invertir en herramientas de IA y obtener impacto concreto. Presenta el enfoque de Teamcubation para cerrar la brecha entre adopción superficial y productividad real trabajando sobre el «metro cuadrado» de cada persona: sus propios procesos y tareas."],
      en: ["The article addresses the gap between investing in AI tools and getting concrete impact. It presents Teamcubation's approach to closing the gap between superficial adoption and real productivity by working on each person's “square meter”: their own processes and tasks."],
      pt: ["A matéria aborda a distância entre investir em ferramentas de IA e obter impacto concreto. Apresenta a abordagem da Teamcubation para fechar a lacuna entre a adoção superficial e a produtividade real trabalhando sobre o “metro quadrado” de cada pessoa: os seus próprios processos e tarefas."],
    },
    url: "https://www.iprofesional.com/tecnologia/449333-inteligencia-artificial-gasto-vs-productividad-la-clave-es-el-metro-cuadrado",
    enlace: { es: "Leer la nota en iProfesional", en: "Read the article in iProfesional", pt: "Ler a matéria no iProfesional" },
  },
];

/** Tarjetas chicas, en tres columnas, debajo de los destacados. */
export const adopcion: Nota[] = [
  {
    medio: "Forbes Argentina",
    logo: "forbes-argentina",
    tipo: igual("Forbes IA Summit"),
    fecha: "2026-03-27",
    titulo: {
      es: "Startups en la era de la inteligencia artificial: velocidad extrema, talento distribuido y el nacimiento del emprendedor «AI first»",
      en: "Startups in the age of artificial intelligence: extreme speed, distributed talent and the birth of the “AI first” entrepreneur",
      pt: "Startups na era da inteligência artificial: velocidade extrema, talento distribuído e o nascimento do empreendedor “AI first”",
    },
    parrafos: {
      es: [
        "Mariano Wechsler, CEO y cofundador de Teamcubation, participó del panel de startups del Forbes IA Summit junto a Carlos Diehl, Diego Fernández Slezak e Ignacio Plaza.",
        "La conversación abordó cómo la IA está reduciendo las barreras para construir tecnología y aumentando la importancia del criterio, el pensamiento computacional y la capacidad para dividir y estructurar problemas.",
      ],
      en: [
        "Mariano Wechsler, CEO and co-founder of Teamcubation, took part in the Forbes IA Summit startup panel alongside Carlos Diehl, Diego Fernández Slezak and Ignacio Plaza.",
        "The conversation covered how AI is lowering the barriers to building technology and increasing the importance of judgment, computational thinking and the ability to break down and structure problems.",
      ],
      pt: [
        "Mariano Wechsler, CEO e cofundador da Teamcubation, participou do painel de startups do Forbes IA Summit ao lado de Carlos Diehl, Diego Fernández Slezak e Ignacio Plaza.",
        "A conversa abordou como a IA está reduzindo as barreiras para construir tecnologia e aumentando a importância do critério, do pensamento computacional e da capacidade de dividir e estruturar problemas.",
      ],
    },
    url: "https://www.forbesargentina.com/summit/startups-era-inteligencia-artificial-velocidad-extrema-talento-distribuido-nacimiento-emprendedor-ai-first-n88326",
    enlace: { es: "Leer la cobertura del Forbes IA Summit", en: "Read the Forbes IA Summit coverage", pt: "Ler a cobertura do Forbes IA Summit" },
  },
  {
    medio: "Endeavor Argentina",
    logo: "endeavor",
    tipo: TIPO.podcast,
    fecha: "2026-03-30",
    titulo: {
      es: "Nunca fue tan fácil empezar. Nunca fue tan difícil diferenciarse.",
      en: "It's never been so easy to start. It's never been so hard to stand out.",
      pt: "Nunca foi tão fácil começar. Nunca foi tão difícil se diferenciar.",
    },
    parrafos: {
      es: ["En Mindset Emprendedor, Mariano Wechsler conversa sobre cómo la inteligencia artificial está cambiando las reglas para construir empresas: crear productos es cada vez más fácil, mientras que desarrollar una ventaja diferencial exige más criterio, comprensión de los problemas y capacidad de adaptación."],
      en: ["On Mindset Emprendedor, Mariano Wechsler talks about how artificial intelligence is changing the rules for building companies: creating products keeps getting easier, while building a competitive edge takes more judgment, understanding of problems and adaptability."],
      pt: ["No Mindset Emprendedor, Mariano Wechsler conversa sobre como a inteligência artificial está mudando as regras para construir empresas: criar produtos é cada vez mais fácil, enquanto desenvolver um diferencial exige mais critério, compreensão dos problemas e capacidade de adaptação."],
    },
    url: "https://www.endeavor.org.ar/blog-article-novedades-mariano-wechseler-mindset-emprendedor-podcast-emprender/",
    enlace: { es: "Escuchar el episodio en Endeavor", en: "Listen to the episode on Endeavor", pt: "Ouvir o episódio na Endeavor" },
  },
  {
    medio: "iProfesional",
    logo: "idea",
    logoAlt: "IDEA",
    tipo: igual("Experiencia IDEA Management"),
    fecha: "2026-06-05",
    titulo: {
      es: "Los principales referentes del management en Argentina disertaron ante 1.300 personas",
      en: "Argentina's leading management voices spoke to 1,300 people",
      pt: "Os principais nomes da gestão na Argentina falaram para 1.300 pessoas",
    },
    parrafos: {
      es: ["Mariano Wechsler participó como CEO de Teamcubation en Experiencia IDEA Management 2026, una jornada dedicada a liderazgo, transformación de negocios, tecnología e innovación."],
      en: ["Mariano Wechsler took part as CEO of Teamcubation in Experiencia IDEA Management 2026, a day devoted to leadership, business transformation, technology and innovation."],
      pt: ["Mariano Wechsler participou como CEO da Teamcubation do Experiencia IDEA Management 2026, uma jornada dedicada a liderança, transformação de negócios, tecnologia e inovação."],
    },
    url: "https://www.iprofesional.com/management/456558-los-principales-referentes-del-management-en-argentina-disertaron-ante-1300-personas",
    enlace: { es: "Leer la cobertura de IDEA Management", en: "Read the IDEA Management coverage", pt: "Ler a cobertura do IDEA Management" },
  },
];

/** Archivo: listas con logo chico, por sección. */
export const archivo: { titulo: Texto; notas: Nota[] }[] = [
  {
    titulo: {
      es: "El origen: desarrollar experiencia sobre trabajo real.",
      en: "The origin: building experience on real work.",
      pt: "A origem: desenvolver experiência sobre trabalho real.",
    },
    notas: [
      {
        medio: "LA NACION",
        logo: "la-nacion",
        tipo: TIPO.cobertura,
        fecha: "2022-08-24",
        titulo: {
          es: "Teamcubation: así funciona la «residencia médica de los programadores» que busca cubrir la falta de talento IT",
          en: "Teamcubation: inside the “medical residency for programmers” that seeks to close the IT talent gap",
          pt: "Teamcubation: assim funciona a “residência médica dos programadores” que busca suprir a falta de talentos de TI",
        },
        url: "https://www.lanacion.com.ar/tecnologia/teamcubator-asi-funciona-la-residencia-medica-de-los-programadores-que-busca-cubrir-la-falta-de-nid24082022/",
      },
      {
        medio: "Infobae",
        logo: "infobae",
        tipo: TIPO.entrevista,
        fecha: "2022-08-18",
        titulo: {
          es: "«Inventamos la residencia médica, pero para programadores»: una startup argentina ideó cómo agregarle experiencia al talento tech",
          en: "“We invented the medical residency, but for programmers”: an Argentine startup found a way to add experience to tech talent",
          pt: "“Inventamos a residência médica, mas para programadores”: uma startup argentina criou uma forma de agregar experiência ao talento tech",
        },
        url: "https://www.infobae.com/economia/2022/08/18/inventamos-la-residencia-medica-pero-para-programadores-una-startup-argentina-ideo-como-agregarle-experiencia-al-talento-tech/",
      },
      {
        medio: "Newsweek Argentina",
        logo: "newsweek",
        tipo: TIPO.cobertura,
        fecha: "2022-08-25",
        titulo: {
          es: "Qué es y cómo funciona Teamcubation, «la residencia médica de los programadores»",
          en: "What Teamcubation is and how it works: “the medical residency for programmers”",
          pt: "O que é e como funciona a Teamcubation, “a residência médica dos programadores”",
        },
        url: "https://www.newsweek.com.ar/tecnologia/que-es-y-como-funciona-teamcubation---la-residencia-medica-de-los-programadores-_a6818e2bbb133cc90c0788811",
      },
      {
        medio: "Forbes Argentina",
        logo: "forbes-argentina",
        tipo: TIPO.entrevista,
        fecha: "2022-09-12",
        titulo: {
          es: "Cómo es y funciona la primera «residencia médica» de programadores",
          en: "How the first “medical residency” for programmers works",
          pt: "Como é e como funciona a primeira “residência médica” de programadores",
        },
        url: "https://www.forbesargentina.com/innovacion/como-funciona-primera-residencia-medica-programadores-n21962",
      },
    ],
  },
  {
    titulo: {
      es: "Crecimiento, clientes e inversión.",
      en: "Growth, clients and investment.",
      pt: "Crescimento, clientes e investimento.",
    },
    notas: [
      {
        medio: "El Cronista / InfoTechnology",
        logo: "el-cronista",
        tipo: TIPO.cobertura,
        fecha: "2023-05-02",
        titulo: {
          es: "Dos argentinos inventaron la solución al mayor problema de Mercado Libre y otros gigantes: cómo lo hicieron",
          en: "Two Argentines invented the solution to the biggest problem facing Mercado Libre and other giants: how they did it",
          pt: "Dois argentinos inventaram a solução para o maior problema do Mercado Libre e de outros gigantes: como eles fizeram",
        },
        url: "https://www.cronista.com/infotechnology/actualidad/dos-argentinos-inventaron-la-solucion-al-mayor-problema-de-mercado-libre-y-otros-gigantes-como-lo-hicieron/",
      },
      {
        medio: "LAVCA",
        logo: "lavca",
        tipo: TIPO.inversion,
        fecha: "2023-04-30",
        titulo: {
          es: "Alaya Capital, FJ Labs, Mr. Pink and Opera Ventures Invest in Argentina’s Teamcubation",
          en: "Alaya Capital, FJ Labs, Mr. Pink and Opera Ventures Invest in Argentina’s Teamcubation",
          pt: "Alaya Capital, FJ Labs, Mr. Pink e Opera Ventures investem na argentina Teamcubation",
        },
        url: "https://www.lavca.org/alaya-capital-fj-labs-mr-pink-and-opera-ventures-invest-in-argentinas-teamcubation/",
        idioma: "en",
      },
      {
        medio: "Forbes Argentina",
        logo: "forbes-argentina",
        tipo: TIPO.cobertura,
        // El diseño decía solo «2023»: la nota es del 15 de agosto de 2023.
        fecha: "2023-08-15",
        titulo: {
          es: "Teamcubation, la primera incubadora para programadores, expande operaciones y estima una facturación de US$2.000.000",
          en: "Teamcubation, the first incubator for programmers, expands operations and projects US$2,000,000 in revenue",
          pt: "Teamcubation, a primeira incubadora de programadores, expande operações e estima um faturamento de US$ 2.000.000",
        },
        url: "https://www.forbesargentina.com/negocios/teamcubation-primera-incubadora-programadores-expande-operaciones-estima-una-facturacion-us-2000000-n39109",
      },
    ],
  },
  {
    titulo: {
      es: "Ideas y conversaciones de nuestros fundadores.",
      en: "Ideas and conversations from our founders.",
      pt: "Ideias e conversas dos nossos fundadores.",
    },
    notas: [
      {
        medio: "Forbes Argentina",
        logo: "forbes-argentina",
        tipo: TIPO.columna,
        fecha: "2023-03-26",
        titulo: {
          es: "ChatGPT: ¿un impulso para las habilidades de hoy o un límite al talento del futuro?",
          en: "ChatGPT: a boost for today's skills or a limit on tomorrow's talent?",
          pt: "ChatGPT: um impulso para as habilidades de hoje ou um limite para o talento do futuro?",
        },
        url: "https://www.forbesargentina.com/columnistas/chatgpt-un-impulso-habilidades-hoy-o-limite-talento-futuro-n31247",
      },
      {
        medio: "Argentinos, a las cosas!",
        tipo: TIPO.podcast,
        fecha: "2023-09-07",
        titulo: {
          es: "Mariano Wechsler — Teamcubation: desarrolladores de experiencia",
          en: "Mariano Wechsler — Teamcubation: developers of experience",
          pt: "Mariano Wechsler — Teamcubation: desenvolvedores de experiência",
        },
        url: "https://podcasts.apple.com/za/podcast/mariano-wechsler-teamcubation-desarrolladores-de/id1593198369?i=1000627216129",
      },
      {
        medio: "Experiencia Endeavor NOA",
        logo: "endeavor",
        tipo: TIPO.charla,
        fecha: "2024-09-05",
        titulo: {
          es: "A la hora de emprender, no tomés el camino fácil",
          en: "When starting a company, don't take the easy road",
          pt: "Na hora de empreender, não escolha o caminho fácil",
        },
        url: "https://www.endeavor.org.ar/blog-article-novedades-experiencia-endeavor-noa-tucuman-2024-inspiracion/",
        extra: [
          {
            url: "https://www.lagaceta.com.ar/nota/1050390/economia/consejo-wechsler-endeavor-2024-a-hora-emprender-no-tomes-camino-facil.html",
            texto: { es: "Leer la cobertura en La Gaceta", en: "Read the coverage in La Gaceta", pt: "Ler a cobertura no La Gaceta" },
            logo: "la-gaceta",
          },
        ],
      },
      {
        medio: "Provocación Live!",
        tipo: TIPO.charla,
        fecha: "2024-06-18",
        titulo: {
          es: "Mariano Wechsler en Provocación Live!",
          en: "Mariano Wechsler at Provocación Live!",
          pt: "Mariano Wechsler no Provocación Live!",
        },
        url: "https://www.youtube.com/watch?v=1dDQBYKlda4",
      },
    ],
  },
];

/** Todas las notas, en el orden de la página (para el JSON-LD). */
export const todasLasNotas: Nota[] = [...destacados, ...adopcion, ...archivo.flatMap((s) => s.notas)];

const INTL: Record<Locale, string> = { es: "es-AR", en: "en-US", pt: "pt-BR" };

/** «17 de junio de 2025», «June 17, 2025», «17 de junho de 2025»; sin día: «octubre de 2026». */
export function formatearFecha(fecha: string, lang: Locale, conDia = true): string {
  const opciones: Intl.DateTimeFormatOptions = conDia
    ? { day: "numeric", month: "long", year: "numeric" }
    : { month: "long", year: "numeric" };
  return new Intl.DateTimeFormat(INTL[lang], { ...opciones, timeZone: "UTC" }).format(new Date(`${fecha}T00:00:00Z`));
}

interface EnlacePagina { label: string; href: string; idioma?: string }

export interface PrensaContent {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  heroH1: string;
  heroPs: string[];
  actualizado: string;
  adopcionH2: string;
  origen: { h2: string; sub: string; psHtml: string[] };
  // porQue, inversion, acerca y contacto: BloquePrensa.astro, que también se muestra en Nosotros.
  porQue:{ h2: string; ps: string[]; marca: string; ps2: string[]; link: EnlacePagina };
  inversion: { h2: string; ps: string[]; links: EnlacePagina[] };
  acerca: { h2: string; ps: string[]; link: EnlacePagina };
  contacto: { h2: string; p: string };
}

const LAVCA = "https://www.lavca.org/alaya-capital-fj-labs-mr-pink-and-opera-ventures-invest-in-argentinas-teamcubation/";
const FORBES_2023 = "https://www.forbesargentina.com/negocios/teamcubation-primera-incubadora-programadores-expande-operaciones-estima-una-facturacion-us-2000000-n39109";

export const prensaContent: Record<Locale, PrensaContent> = {
  es: {
    seoTitle: "Teamcubation en los medios | Prensa, entrevistas y conferencias",
    seoDesc: "Prensa, entrevistas y conferencias de Teamcubation y sus fundadores sobre adopción de IA, automatización, talento tecnológico e inversión desde 2022.",
    kicker: "Prensa",
    heroH1: "Lo que dijeron de Teamcubation, y lo que Teamcubation dijo.",
    heroPs: [
      "Teamcubation aparece en medios de negocios y tecnología desde 2022. Las primeras coberturas documentaron su modelo de formación de desarrolladores sobre proyectos reales; más recientemente, medios como Forbes, LA NACION e iProfesional cubrieron su trabajo en adopción de IA, automatización y desarrollo de capacidades dentro de empresas.",
      "Esta página reúne notas, entrevistas, columnas, podcasts y conferencias de Teamcubation y sus fundadores, Mariano Wechsler y Diego Jolodenco.",
    ],
    actualizado: "Última actualización:",
    adopcionH2: "Teamcubation y la adopción de IA.",
    origen: {
      h2: "Una misma idea desde el comienzo.",
      sub: "La tecnología cambió. El problema de aprendizaje no.",
      psHtml: [
        "Teamcubation nació en 2021 en Buenos Aires a partir de una idea simple: tener conocimiento no es lo mismo que tener experiencia.",
        "Su primer modelo trabajó sobre esa brecha en el desarrollo de software. Desarrolladores que ya habían aprendido a programar adquirían experiencia trabajando dentro de empresas, sobre proyectos reales, en equipos mixtos con profesionales senior y con su evolución medida mediante datos.",
        'La prensa lo describió entonces como <span class="resaltado">«la residencia médica de los programadores»</span>.',
        'Ese principio continúa hoy en <a class="enlace" href="/servicios/incubation/">Incubation</a> y se convirtió también en la base del trabajo de Teamcubation con inteligencia artificial: las personas no incorporan nuevas capacidades solamente escuchando cómo funcionan. Necesitan utilizarlas sobre sus propios procesos, acompañadas por alguien con experiencia, hasta desarrollar criterio y autonomía.',
        "Las notas de 2022 y 2023 documentan el origen de ese modelo. Las coberturas más recientes muestran su aplicación a la adopción de IA dentro de las empresas.",
      ],
    },
    porQue: {
      h2: "¿Por qué Teamcubation empezó formando desarrolladores?",
      ps: ["Teamcubation nació en 2021 con un modelo que la prensa llamó «la residencia médica de los programadores»: desarrolladores que ya tenían conocimientos técnicos adquirían experiencia trabajando dentro de empresas, sobre software real, en equipos acompañados por profesionales senior y con su evolución medida mediante datos."],
      marca: "La experiencia no se enseña: se entrena.",
      ps2: [
        "Cuando la inteligencia artificial comenzó a transformar la manera de trabajar, Teamcubation encontró un problema muy parecido. Las empresas podían ofrecer herramientas, licencias y capacitaciones, pero eso no garantizaba que las personas supieran utilizarlas para transformar sus propios procesos.",
        "Teamcubation aplicó entonces el mismo principio a la adopción de IA: trabajar sobre tareas y procesos reales, con un guía experto al lado, hasta que cada persona desarrolla el criterio y la autonomía necesarios para hacerlo por sí misma.",
        "Ese modelo original continúa hoy en Incubation y se extiende a los programas de adopción, automatización y construcción con inteligencia artificial de Teamcubation.",
      ],
      link: { label: "Conocer nuestra metodología", href: "/metodologia/" },
    },
    inversion: {
      h2: "¿Quién invirtió en Teamcubation?",
      ps: [
        "En 2023, Alaya Capital, FJ Labs, Mr. Pink y Opera Ventures participaron de la ronda seed de Teamcubation. LAVCA registró la operación como una ronda de monto no divulgado; Forbes Argentina informó posteriormente que la compañía había levantado US$1 millón.",
        "La inversión acompañó una etapa de expansión del modelo de Teamcubation hacia nuevos clientes y mercados.",
      ],
      links: [
        { label: "Ver la operación en LAVCA", href: LAVCA, idioma: "en" },
        { label: "Leer la cobertura de Forbes Argentina", href: FORBES_2023 },
      ],
    },
    acerca: {
      h2: "Acerca de Teamcubation",
      ps: [
        "Teamcubation ayuda a empresas a desarrollar capacidades para adoptar inteligencia artificial, automatizar procesos y construir tecnología sobre trabajo real.",
        "Sus programas combinan práctica sobre procesos propios con guía experta hasta que los equipos pueden trabajar de forma autónoma. Teamcubation fue fundada en Buenos Aires en 2021 por Mariano Wechsler y Diego Jolodenco.",
      ],
      link: { label: "Conocer Teamcubation", href: "/nosotros/" },
    },
    contacto: {
      h2: "Contacto de prensa",
      p: "Para entrevistas, datos, voceros o material de prensa:",
    },
  },

  en: {
    seoTitle: "Teamcubation in the media | Press, interviews and talks",
    seoDesc: "Press coverage, interviews and talks by Teamcubation and its founders on AI adoption, automation, tech talent and investment since 2022.",
    kicker: "Press",
    heroH1: "What the media said about Teamcubation, and what Teamcubation said.",
    heroPs: [
      "Teamcubation has appeared in business and technology media since 2022. The first stories documented its model for training developers on real projects; more recently, outlets such as Forbes, LA NACION and iProfesional have covered its work on AI adoption, automation and capability building inside companies.",
      "This page brings together articles, interviews, columns, podcasts and talks featuring Teamcubation and its founders, Mariano Wechsler and Diego Jolodenco. Everything is in Spanish except LAVCA's post, which is in English.",
    ],
    actualizado: "Last updated:",
    adopcionH2: "Teamcubation and AI adoption.",
    origen: {
      h2: "The same idea from the start.",
      sub: "The technology changed. The learning problem didn't.",
      psHtml: [
        "Teamcubation was born in 2021 in Buenos Aires from a simple idea: having knowledge is not the same as having experience.",
        "Its first model tackled that gap in software development. Developers who had already learned to code gained experience working inside companies, on real projects, in mixed teams with senior professionals, with their progress measured through data.",
        'The press described it at the time as <span class="resaltado">“the medical residency for programmers”</span>.',
        'That principle continues today in <a class="enlace" href="/en/services/incubation/">Incubation</a> and also became the foundation of Teamcubation\'s work with artificial intelligence: people don\'t acquire new capabilities just by hearing how they work. They need to use them on their own processes, supported by someone with experience, until they develop judgment and autonomy.',
        "The 2022 and 2023 stories document the origin of that model. The more recent coverage shows how it applies to AI adoption inside companies.",
      ],
    },
    porQue: {
      h2: "Why did Teamcubation start by training developers?",
      ps: ["Teamcubation was born in 2021 with a model the press called “the medical residency for programmers”: developers who already had technical knowledge gained experience working inside companies, on real software, in teams supported by senior professionals, with their progress measured through data."],
      marca: "Experience isn't taught: it's trained.",
      ps2: [
        "When artificial intelligence began to transform the way people work, Teamcubation found a very similar problem. Companies could provide tools, licenses and training, but that didn't guarantee that people knew how to use them to transform their own processes.",
        "So Teamcubation applied the same principle to AI adoption: working on real tasks and processes, with an expert guide alongside, until each person develops the judgment and autonomy to do it on their own.",
        "That original model continues today in Incubation and extends to Teamcubation's programs for adopting, automating and building with artificial intelligence.",
      ],
      link: { label: "Explore our methodology", href: "/en/methodology/" },
    },
    inversion: {
      h2: "Who has invested in Teamcubation?",
      ps: [
        "In 2023, Alaya Capital, FJ Labs, Mr. Pink and Opera Ventures took part in Teamcubation's seed round. LAVCA reported the deal without disclosing the amount; Forbes Argentina later reported that the company had raised US$1 million.",
        "The investment supported the expansion of Teamcubation's model to new clients and markets.",
      ],
      links: [
        { label: "See the deal on LAVCA", href: LAVCA, idioma: "en" },
        { label: "Read Forbes Argentina's coverage", href: FORBES_2023 },
      ],
    },
    acerca: {
      h2: "About Teamcubation",
      ps: [
        "Teamcubation helps companies build the capabilities to adopt artificial intelligence, automate processes and build technology on real work.",
        "Its programs combine practice on the company's own processes with expert guidance until teams can work autonomously. Teamcubation was founded in Buenos Aires in 2021 by Mariano Wechsler and Diego Jolodenco.",
      ],
      link: { label: "Get to know Teamcubation", href: "/en/about/" },
    },
    contacto: {
      h2: "Press contact",
      p: "For interviews, data, spokespeople or press materials:",
    },
  },

  pt: {
    seoTitle: "Teamcubation na mídia | Imprensa, entrevistas e palestras",
    seoDesc: "Imprensa, entrevistas e palestras da Teamcubation e dos seus fundadores sobre adoção de IA, automação, talento tecnológico e investimento desde 2022.",
    kicker: "Imprensa",
    heroH1: "O que disseram sobre a Teamcubation, e o que a Teamcubation disse.",
    heroPs: [
      "A Teamcubation aparece em veículos de negócios e tecnologia desde 2022. As primeiras matérias documentaram o seu modelo de formação de desenvolvedores sobre projetos reais; mais recentemente, veículos como Forbes, LA NACION e iProfesional cobriram o seu trabalho em adoção de IA, automação e desenvolvimento de capacidades dentro das empresas.",
      "Esta página reúne matérias, entrevistas, colunas, podcasts e palestras da Teamcubation e dos seus fundadores, Mariano Wechsler e Diego Jolodenco. Todo o material está em espanhol, exceto a publicação da LAVCA, que está em inglês.",
    ],
    actualizado: "Última atualização:",
    adopcionH2: "A Teamcubation e a adoção de IA.",
    origen: {
      h2: "A mesma ideia desde o começo.",
      sub: "A tecnologia mudou. O problema de aprendizagem, não.",
      psHtml: [
        "A Teamcubation nasceu em 2021 em Buenos Aires a partir de uma ideia simples: ter conhecimento não é o mesmo que ter experiência.",
        "O seu primeiro modelo trabalhou sobre essa lacuna no desenvolvimento de software. Desenvolvedores que já tinham aprendido a programar adquiriam experiência trabalhando dentro das empresas, sobre projetos reais, em equipes mistas com profissionais seniores e com a sua evolução medida por meio de dados.",
        'A imprensa o descreveu então como <span class="resaltado">“a residência médica dos programadores”</span>.',
        'Esse princípio continua hoje no <a class="enlace" href="/pt/servicos/incubation/">Incubation</a> e também se tornou a base do trabalho da Teamcubation com inteligência artificial: as pessoas não incorporam novas capacidades apenas ouvindo como funcionam. Precisam utilizá-las sobre os seus próprios processos, acompanhadas por alguém com experiência, até desenvolver critério e autonomia.',
        "As matérias de 2022 e 2023 documentam a origem desse modelo. As coberturas mais recentes mostram a sua aplicação à adoção de IA dentro das empresas.",
      ],
    },
    porQue: {
      h2: "Por que a Teamcubation começou formando desenvolvedores?",
      ps: ["A Teamcubation nasceu em 2021 com um modelo que a imprensa chamou de “a residência médica dos programadores”: desenvolvedores que já tinham conhecimentos técnicos adquiriam experiência trabalhando dentro das empresas, sobre software real, em equipes acompanhadas por profissionais seniores e com a sua evolução medida por meio de dados."],
      marca: "A experiência não se ensina: se treina.",
      ps2: [
        "Quando a inteligência artificial começou a transformar a maneira de trabalhar, a Teamcubation encontrou um problema muito parecido. As empresas podiam oferecer ferramentas, licenças e capacitações, mas isso não garantia que as pessoas soubessem utilizá-las para transformar os seus próprios processos.",
        "A Teamcubation aplicou então o mesmo princípio à adoção de IA: trabalhar sobre tarefas e processos reais, com um guia especialista ao lado, até que cada pessoa desenvolva o critério e a autonomia necessários para fazê-lo por conta própria.",
        "Esse modelo original continua hoje no Incubation e se estende aos programas de adoção, automação e construção com inteligência artificial da Teamcubation.",
      ],
      link: { label: "Conhecer a nossa metodologia", href: "/pt/metodologia/" },
    },
    inversion: {
      h2: "Quem investiu na Teamcubation?",
      ps: [
        "Em 2023, Alaya Capital, FJ Labs, Mr. Pink e Opera Ventures participaram da rodada seed da Teamcubation. A LAVCA registrou a operação como uma rodada de valor não divulgado; a Forbes Argentina informou depois que a empresa havia captado US$ 1 milhão.",
        "O investimento acompanhou uma etapa de expansão do modelo da Teamcubation para novos clientes e mercados.",
      ],
      links: [
        { label: "Ver a operação na LAVCA", href: LAVCA, idioma: "en" },
        { label: "Ler a cobertura da Forbes Argentina", href: FORBES_2023 },
      ],
    },
    acerca: {
      h2: "Sobre a Teamcubation",
      ps: [
        "A Teamcubation ajuda empresas a desenvolver capacidades para adotar inteligência artificial, automatizar processos e construir tecnologia sobre trabalho real.",
        "Os seus programas combinam prática sobre processos próprios com orientação especializada até que as equipes possam trabalhar de forma autônoma. A Teamcubation foi fundada em Buenos Aires em 2021 por Mariano Wechsler e Diego Jolodenco.",
      ],
      link: { label: "Conhecer a Teamcubation", href: "/pt/sobre/" },
    },
    contacto: {
      h2: "Contato para a imprensa",
      p: "Para entrevistas, dados, porta-vozes ou material de imprensa:",
    },
  },
};

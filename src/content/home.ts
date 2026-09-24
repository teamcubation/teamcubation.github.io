// Contenido del Home por idioma. ES = original (render v2); EN traducido con
// criterio empresarial (pendiente de revisión humana). PT: pendiente.
import type { HeroContent } from "../components/home/HeroHome.astro";
import type { CapasContent } from "../components/home/CapasApiladas.astro";

interface Enlace { label: string; href: string }

export interface HomeContent {
  hero: HeroContent;
  capacidad: {
    h2: string;
    listaIntro: string;
    bullets: [string, string];
    p: string;
    chips: [string, string, string];
    link: Enlace;
  };
  dosfotos: {
    criterioH2Html: string;
    criterioP: string;
    criterioLink: Enlace;
    capacidadH2: string;
    panelP: string;
  };
  capas: CapasContent;
  airank: {
    eyebrow: string;
    h2: string;
    intro: string;
    cardTitulo: string;
    cardDesc: string;
    bullets: [string, string, string];
    accion: string;
  };
  evidencia: {
    h2: string;
    p: string;
    stats: { num: string; lbl: string }[];
    link: Enlace;
  };
  alts: {
    capacidadImg: string;
    criterioFoto: string;
    resultadoFoto: string;
    airankImg: string;
  };
}

export const homeContent: Record<"es" | "en" | "pt", HomeContent> = {
  es: {
    hero: {
      eyebrow: "La inversión en IA necesita adopción.",
      tituloHtml:
        '¿Su compañía está aprovechando todo <span class="resaltado">el potencial de la IA?</span>',
      subhead: "Entrenamos a sus equipos para adoptar IA con impacto real en el negocio.",
      bajadaHtml:
        "A diferencia de un curso sus colaboradores aprenden, guiados por nuestros mentores expertos, trabajando en procesos y proyectos reales de su día a día.<br />Porque la experiencia no se enseña: se entrena.",
    },
    capacidad: {
      h2: "Desarrollamos la capacidad de tu empresa para usar y construir la tecnología que necesita.",
      listaIntro: "En Teamcubation entrenamos a los equipos sobre sus propios procesos y proyectos:",
      bullets: [
        "Acompañamos a las personas no técnicas que necesitan incorporar IA a su trabajo.",
        "También entrenamos a nuevos desarrolladores mientras construyen el software que la empresa necesita.",
      ],
      p: "La experiencia que se construye haciendo queda en las personas y les permite encarar el siguiente desafío con más autonomía.",
      chips: ["Procesos reales", "Experiencia", "Capacidad"],
      link: { label: "Conocer nuestra metodología", href: "/metodologia/" },
    },
    dosfotos: {
      criterioH2Html: 'El <span class="resaltado">criterio</span> se forma haciendo.',
      criterioP:
        "Tener acceso a una herramienta es el comienzo. Aprender a pensar de forma sistémica, elegir qué problema resolver, entender cómo funciona una solución y evaluar cómo implementarla requiere ejecución sobre el trabajo real.",
      criterioLink: { label: "Conoce nuestra metodología", href: "/metodologia/" },
      capacidadH2: "La capacidad queda en las personas.",
      panelP:
        "Nuestro objetivo es que cada equipo pueda sostener lo que construye y resolver el siguiente problema con más autonomía.",
    },
    capas: {
      grande: "¿Qué podemos lograr juntos?",
      headH2: "Un punto de partida para cada equipo.",
      intro:
        "Desde aplicar IA en las tareas cotidianas hasta construir software y formar desarrolladores. Cada equipo empieza según lo que necesita resolver y la experiencia que ya tiene.",
      capas: [
        {
          titulo:
            "Que las personas en su compañía utilicen todo el potencial de la IA para trabajar con mayor eficiencia.",
          prefijo: "Capa de superficie — equipos de negocio.",
          desc: "Sus equipos conocen las tareas que necesitan mejorar. El entrenamiento parte de ese conocimiento y trabaja sobre sus herramientas y procesos con foco en la adopción.",
          imgAlt: "Colaboradores verdes y un mentor naranja moviendo una esfera lima sobre un bloque de concreto",
          programas: [
            { nombre: "Starter AI", href: "/servicios/starter-ai/", desc: "Equipos sin experiencia previa aprenden a usar IA sobre sus tareas y con las herramientas que ya tienen.", dato: "Un mes." },
            { nombre: "Booster AI", href: "/servicios/booster-ai/", desc: "Equipos de negocio automatizan procesos propios con IA y agentes, acompañados por mentores expertos.", dato: "Cinco semanas." },
            { nombre: "Booster AI Intensivo", href: "/servicios/booster-ai-intensivo/", desc: "Seis personas en tres duplas construyen una primera automatización real por dupla, en un piloto acotado.", dato: "Una semana." },
          ],
        },
        {
          titulo: "Que las personas más avanzadas en el uso de la IA, puedan construir tecnología.",
          prefijo: "Capa intermedia — construcción con IA.",
          desc: "Los perfiles de negocio pueden crear herramientas internas. Los perfiles técnicos pueden profundizar en integraciones y procesos de mayor complejidad.",
          imgAlt: "Equipos verdes y naranjas construyendo estructuras de concreto con anillos ámbar y piezas lima",
          programas: [
            { nombre: "VibeCode Studio", href: "/servicios/vibecode-studio/", desc: "Equipos que ya usan IA construyen micro-aplicaciones de negocio, sin programación tradicional.", dato: "Dos meses." },
            { nombre: "AI Builders", href: "/servicios/ai-builders/", desc: "Perfiles técnicos se forman para construir automatizaciones complejas e integraciones entre sistemas dentro de su empresa.", dato: "Cuatro meses, dedicación completa." },
          ],
        },
        {
          titulo: "Incorporar talento y habilidades tech a su equipo.",
          prefijo: "Núcleo IT — equipos de desarrollo.",
          desc: "Entrenamos a los equipos de desarrollo para incorporar IA y formamos desarrolladores mientras construyen el software que la empresa necesita.",
          imgAlt: "Torre densa de concreto en contrapicado que equipos verdes y naranjas escalan con piezas lima y ámbar",
          programas: [
            { nombre: "Booster AI Dev", href: "/servicios/booster-ai-dev/", desc: "Equipos de desarrollo incorporan herramientas y agentes de IA sobre su sprint y sus repositorios.", dato: "Un mes." },
            { nombre: "Incubation", href: "/servicios/incubation/", desc: "Software construido mientras se forman los desarrolladores que después pueden integrarse a su equipo.", dato: "Seis meses." },
          ],
        },
      ],
    },
    airank: {
      eyebrow: "Diagnóstico · sin costo",
      h2: "¿Cómo usan la IA las personas de su organización?",
      intro: "Antes de elegir un programa conviene saber de dónde parte cada persona.",
      cardTitulo: "AI Rank",
      cardDesc: "Diagnóstico gratuito de adopción de IA. Mide el nivel real de cada persona por rol y por dimensión.",
      bullets: [
        "La distancia entre el nivel actual y el que necesita su empresa",
        "Qué programa corresponde según la brecha",
        "Sin costo y sin compromiso.",
      ],
      accion: "Hacer el diagnóstico",
    },
    evidencia: {
      h2: "Experiencia construida con empresas de distintos sectores.",
      p: "Trabajamos con más de 90 empresas líderes en Argentina, Brasil, Uruguay, Colombia y España. Entre nuestros clientes están empresas como Mercado Libre, Coca-Cola y Visa.",
      stats: [
        { num: "+90", lbl: "Más de 90 empresas líderes." },
        { num: "5", lbl: "5 países: Argentina, Brasil, Uruguay, Colombia y España." },
        { num: "35%", lbl: "Hasta 35% de mejora de eficiencia en los procesos intervenidos." },
      ],
      link: { label: "Conocer nuestra trayectoria", href: "/casos/" },
    },
    alts: {
      capacidadImg: "Torre de concreto blanco en contrapicado que equipos verdes y naranjas escalan con piezas ámbar y lima",
      criterioFoto: "Una mentora señala la pantalla de una laptop junto a un colaborador que toma notas",
      resultadoFoto: "Equipo mirando un resultado en pantalla",
      airankImg: "Escalones de concreto que equipos verdes suben con piezas de vidrio lima y resina ámbar, mientras un mentor naranja señala desde arriba",
    },
  },

  en: {
    hero: {
      eyebrow: "Your AI investment needs adoption.",
      tituloHtml:
        'Is your company harnessing all <span class="resaltado">the potential of AI?</span>',
      subhead: "We train your teams to adopt AI with real business impact.",
      bajadaHtml:
        "Unlike a course, your people learn by working on the real processes and projects of their day-to-day, guided by our expert mentors.<br />Because experience isn't taught: it's trained.",
    },
    capacidad: {
      h2: "We build your company's capability to use and build the technology it needs.",
      listaIntro: "At Teamcubation we train teams on their own processes and projects:",
      bullets: [
        "We support non-technical people who need to bring AI into their work.",
        "We also train new developers while they build the software the company needs.",
      ],
      p: "The experience built by doing stays with the people and lets them tackle the next challenge with more autonomy.",
      chips: ["Real processes", "Experience", "Capability"],
      link: { label: "Explore our methodology", href: "/en/methodology/" },
    },
    dosfotos: {
      criterioH2Html: 'Good <span class="resaltado">judgment</span> is formed by doing.',
      criterioP:
        "Having access to a tool is just the beginning. Learning to think systematically, choosing which problem to solve, understanding how a solution works and evaluating how to implement it takes execution on real work.",
      criterioLink: { label: "Explore our methodology", href: "/en/methodology/" },
      capacidadH2: "The capability stays with your people.",
      panelP:
        "Our goal is for every team to sustain what it builds and solve the next problem with more autonomy.",
    },
    capas: {
      grande: "What can we achieve together?",
      headH2: "A starting point for every team.",
      intro:
        "From applying AI to everyday tasks to building software and training developers. Each team starts based on what it needs to solve and the experience it already has.",
      capas: [
        {
          titulo: "Have the people in your company use AI's full potential to work more efficiently.",
          prefijo: "Surface layer — business teams.",
          desc: "Your teams know the tasks they need to improve. Training starts from that knowledge and works on their tools and processes with a focus on adoption.",
          imgAlt: "Green collaborators and an orange mentor moving a lime sphere over a concrete block",
          programas: [
            { nombre: "Starter AI", href: "/en/services/starter-ai/", desc: "Teams with no prior experience learn to use AI on their tasks with the tools they already have.", dato: "One month." },
            { nombre: "Booster AI", href: "/en/services/booster-ai/", desc: "Business teams automate their own processes with AI and agents, guided by expert mentors.", dato: "Five weeks." },
            { nombre: "Booster AI Intensive", href: "/en/services/booster-ai-intensivo/", desc: "Six people in three pairs build a first real automation per pair, in a focused pilot.", dato: "One week." },
          ],
        },
        {
          titulo: "Have your most advanced AI users build technology.",
          prefijo: "Middle layer — building with AI.",
          desc: "Business profiles can create internal tools. Technical profiles can go deeper into integrations and more complex processes.",
          imgAlt: "Green and orange teams building concrete structures with amber rings and lime pieces",
          programas: [
            { nombre: "VibeCode Studio", href: "/en/services/vibecode-studio/", desc: "Teams already using AI build business micro-apps, with no traditional programming.", dato: "Two months." },
            { nombre: "AI Builders", href: "/en/services/ai-builders/", desc: "Technical profiles train to build complex automations and integrations between systems within your company.", dato: "Four months, full-time." },
          ],
        },
        {
          titulo: "Add tech talent and skills to your team.",
          prefijo: "IT core — development teams.",
          desc: "We train development teams to adopt AI and we train developers while they build the software the company needs.",
          imgAlt: "A dense concrete tower seen from below that green and orange teams climb with lime and amber pieces",
          programas: [
            { nombre: "Booster AI Dev", href: "/en/services/booster-ai-dev/", desc: "Development teams adopt AI tools and agents on their sprint and repositories.", dato: "One month." },
            { nombre: "Incubation", href: "/en/services/incubation/", desc: "Software built while training developers who can then join your team.", dato: "Six months." },
          ],
        },
      ],
    },
    airank: {
      eyebrow: "Assessment · free",
      h2: "How do the people in your organization use AI?",
      intro: "Before choosing a program, it helps to know where each person starts.",
      cardTitulo: "AI Rank",
      cardDesc: "Free AI adoption assessment. It measures each person's real level by role and by dimension.",
      bullets: [
        "The gap between the current level and the one your company needs",
        "Which program fits based on the gap",
        "Free and with no commitment.",
      ],
      accion: "Take the assessment",
    },
    evidencia: {
      h2: "Experience built with companies across industries.",
      p: "We've worked with more than 90 leading companies in Argentina, Brazil, Uruguay, Colombia and Spain. Our clients include companies like Mercado Libre, Coca-Cola and Visa.",
      stats: [
        { num: "+90", lbl: "More than 90 leading companies." },
        { num: "5", lbl: "5 countries: Argentina, Brazil, Uruguay, Colombia and Spain." },
        { num: "35%", lbl: "Up to 35% efficiency improvement in the processes we worked on." },
      ],
      link: { label: "Explore our track record", href: "/en/clients/" },
    },
    alts: {
      capacidadImg: "A white concrete tower seen from below that green and orange teams climb with amber and lime pieces",
      criterioFoto: "A mentor points at a laptop screen next to a collaborator taking notes",
      resultadoFoto: "A team looking at a result on screen",
      airankImg: "Concrete steps that green teams climb with lime glass and amber resin pieces, while an orange mentor points from above",
    },
  },

  pt: {
    hero: {
      eyebrow: "O investimento em IA precisa de adoção.",
      tituloHtml:
        'A sua empresa está aproveitando todo <span class="resaltado">o potencial da IA?</span>',
      subhead: "Treinamos as suas equipes para adotar IA com impacto real no negócio.",
      bajadaHtml:
        "Diferente de um curso, as suas pessoas aprendem trabalhando nos processos e projetos reais do seu dia a dia, guiadas pelos nossos mentores especialistas.<br />Porque a experiência não se ensina: se treina.",
    },
    capacidad: {
      h2: "Desenvolvemos a capacidade da sua empresa para usar e construir a tecnologia que ela precisa.",
      listaIntro: "Na Teamcubation treinamos as equipes sobre os seus próprios processos e projetos:",
      bullets: [
        "Acompanhamos as pessoas não técnicas que precisam incorporar IA ao seu trabalho.",
        "Também treinamos novos desenvolvedores enquanto constroem o software que a empresa precisa.",
      ],
      p: "A experiência que se constrói fazendo fica nas pessoas e permite que encarem o próximo desafio com mais autonomia.",
      chips: ["Processos reais", "Experiência", "Capacidade"],
      link: { label: "Conheça a nossa metodologia", href: "/pt/metodologia/" },
    },
    dosfotos: {
      criterioH2Html: 'O <span class="resaltado">critério</span> se forma fazendo.',
      criterioP:
        "Ter acesso a uma ferramenta é o começo. Aprender a pensar de forma sistêmica, escolher qual problema resolver, entender como funciona uma solução e avaliar como implementá-la exige execução sobre o trabalho real.",
      criterioLink: { label: "Conheça a nossa metodologia", href: "/pt/metodologia/" },
      capacidadH2: "A capacidade fica nas pessoas.",
      panelP:
        "O nosso objetivo é que cada equipe possa sustentar o que constrói e resolver o próximo problema com mais autonomia.",
    },
    capas: {
      grande: "O que podemos alcançar juntos?",
      headH2: "Um ponto de partida para cada equipe.",
      intro:
        "Desde aplicar IA nas tarefas do dia a dia até construir software e formar desenvolvedores. Cada equipe começa conforme o que precisa resolver e a experiência que já tem.",
      capas: [
        {
          titulo: "Fazer com que as pessoas da sua empresa usem todo o potencial da IA para trabalhar com mais eficiência.",
          prefijo: "Camada de superfície — equipes de negócio.",
          desc: "As suas equipes conhecem as tarefas que precisam melhorar. O treinamento parte desse conhecimento e trabalha sobre as suas ferramentas e processos com foco na adoção.",
          imgAlt: "Colaboradores verdes e um mentor laranja movendo uma esfera lima sobre um bloco de concreto",
          programas: [
            { nombre: "Starter AI", href: "/pt/servicos/starter-ai/", desc: "Equipes sem experiência prévia aprendem a usar IA nas suas tarefas e com as ferramentas que já têm.", dato: "Um mês." },
            { nombre: "Booster AI", href: "/pt/servicos/booster-ai/", desc: "Equipes de negócio automatizam os seus próprios processos com IA e agentes, acompanhadas por mentores especialistas.", dato: "Cinco semanas." },
            { nombre: "Booster AI Intensivo", href: "/pt/servicos/booster-ai-intensivo/", desc: "Seis pessoas em três duplas constroem uma primeira automação real por dupla, em um piloto delimitado.", dato: "Uma semana." },
          ],
        },
        {
          titulo: "Fazer com que as pessoas mais avançadas no uso da IA possam construir tecnologia.",
          prefijo: "Camada intermediária — construção com IA.",
          desc: "Os perfis de negócio podem criar ferramentas internas. Os perfis técnicos podem se aprofundar em integrações e processos de maior complexidade.",
          imgAlt: "Equipes verdes e laranjas construindo estruturas de concreto com anéis âmbar e peças lima",
          programas: [
            { nombre: "VibeCode Studio", href: "/pt/servicos/vibecode-studio/", desc: "Equipes que já usam IA constroem microaplicações de negócio, sem programação tradicional.", dato: "Dois meses." },
            { nombre: "AI Builders", href: "/pt/servicos/ai-builders/", desc: "Perfis técnicos se formam para construir automações complexas e integrações entre sistemas dentro da sua empresa.", dato: "Quatro meses, dedicação integral." },
          ],
        },
        {
          titulo: "Incorporar talento e habilidades tech à sua equipe.",
          prefijo: "Núcleo IT — equipes de desenvolvimento.",
          desc: "Treinamos as equipes de desenvolvimento para incorporar IA e formamos desenvolvedores enquanto constroem o software que a empresa precisa.",
          imgAlt: "Torre densa de concreto em contra-plongée que equipes verdes e laranjas escalam com peças lima e âmbar",
          programas: [
            { nombre: "Booster AI Dev", href: "/pt/servicos/booster-ai-dev/", desc: "Equipes de desenvolvimento incorporam ferramentas e agentes de IA sobre o seu sprint e os seus repositórios.", dato: "Um mês." },
            { nombre: "Incubation", href: "/pt/servicos/incubation/", desc: "Software construído enquanto se formam os desenvolvedores que depois podem se integrar à sua equipe.", dato: "Seis meses." },
          ],
        },
      ],
    },
    airank: {
      eyebrow: "Diagnóstico · sem custo",
      h2: "Como as pessoas da sua organização usam a IA?",
      intro: "Antes de escolher um programa, convém saber de onde parte cada pessoa.",
      cardTitulo: "AI Rank",
      cardDesc: "Diagnóstico gratuito de adoção de IA. Mede o nível real de cada pessoa por função e por dimensão.",
      bullets: [
        "A distância entre o nível atual e o que a sua empresa precisa",
        "Qual programa corresponde conforme a lacuna",
        "Sem custo e sem compromisso.",
      ],
      accion: "Fazer o diagnóstico",
    },
    evidencia: {
      h2: "Experiência construída com empresas de diferentes setores.",
      p: "Trabalhamos com mais de 90 empresas líderes na Argentina, Brasil, Uruguai, Colômbia e Espanha. Entre os nossos clientes estão empresas como Mercado Livre, Coca-Cola e Visa.",
      stats: [
        { num: "+90", lbl: "Mais de 90 empresas líderes." },
        { num: "5", lbl: "5 países: Argentina, Brasil, Uruguai, Colômbia e Espanha." },
        { num: "35%", lbl: "Até 35% de melhoria de eficiência nos processos em que atuamos." },
      ],
      link: { label: "Conheça a nossa trajetória", href: "/pt/clientes/" },
    },
    alts: {
      capacidadImg: "Torre de concreto branco em contra-plongée que equipes verdes e laranjas escalam com peças âmbar e lima",
      criterioFoto: "Uma mentora aponta para a tela de um laptop ao lado de um colaborador que faz anotações",
      resultadoFoto: "Equipe olhando um resultado na tela",
      airankImg: "Degraus de concreto que equipes verdes sobem com peças de vidro lima e resina âmbar, enquanto um mentor laranja aponta de cima",
    },
  },
};

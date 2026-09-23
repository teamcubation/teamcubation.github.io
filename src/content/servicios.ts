// Contenido de la página Servicios (índice) por idioma. ES = original (v2); EN traducido.
interface CapaTxt { titulo: string; etiqueta: string; bajada: string; keys: string[] }
interface CardItem { nombre: string; necesita: string; resumen: string; publico: string; duracion: string; foco: string }
interface PrimerPasoCol { h3: string; pHtml: string }

export interface ServiciosContent {
  seoTitle: string;
  seoDesc: string;
  hero: { kicker: string; tituloHtml: string; bajada: string; imgAlt: string };
  tituloCapas: string;
  labels: { necesita: string; publico: string; duracion: string; foco: string };
  capas: CapaTxt[];
  items: Record<string, CardItem>;
  primerPaso: { h2: string; cols: PrimerPasoCol[] };
  panel: { h2: string; p1: string; p2: string; links: { label: string; routeKey: string }[] };
}

export const serviciosContent: Record<"es" | "en" | "pt", ServiciosContent> = {
  es: {
    seoTitle: "Servicios | Compare ocho servicios según su equipo y su objetivo: adoptar IA, automatizar procesos, crear aplicaciones o desarrollar software formando talento.",
    seoDesc: "Compare ocho servicios según su equipo y su objetivo: adoptar IA, automatizar procesos, crear aplicaciones o desarrollar software formando talento.",
    hero: {
      kicker: "Servicios",
      tituloHtml: 'Programas de IA y formación de talento para <span class="resaltado">su empresa.</span>',
      bajada: "Teamcubation ofrece ocho servicios para identificar oportunidades de IA, entrenar equipos de negocio, formar especialistas internos y desarrollar software mientras se forman desarrolladores. El punto de partida depende de sus necesidades y de la experiencia de sus equipos.",
      imgAlt: "Figuras verdes y naranjas atravesando juntas un anillo ámbar",
    },
    tituloCapas: "¿Qué podemos lograr juntos?",
    labels: { necesita: "Si necesita:", publico: "Para quién:", duracion: "Duración:", foco: "Foco:" },
    capas: [
      { titulo: "Que las personas de su compañía aprovechen la IA para trabajar con mayor eficiencia.", etiqueta: "Capa de superficie — equipos de negocio.", bajada: "Sus equipos conocen las tareas que necesitan mejorar. El entrenamiento parte de ese conocimiento y trabaja sobre sus herramientas y procesos.", keys: ["starter", "booster", "intensivo"] },
      { titulo: "Que las personas más avanzadas en el uso de la IA, puedan construir tecnología.", etiqueta: "Capa intermedia — construcción con IA.", bajada: "Los perfiles de negocio pueden crear herramientas internas. Los perfiles técnicos pueden profundizar en integraciones y procesos de mayor complejidad.", keys: ["vibecode", "builders"] },
      { titulo: "Incorporar talento y nuevas habilidades tecnológicas a su equipo de desarrollo.", etiqueta: "Núcleo IT — equipos de desarrollo.", bajada: "Entrenamos a los equipos de desarrollo para incorporar IA y formamos desarrolladores mientras construyen el software que la empresa necesita.", keys: ["dev", "incubation"] },
    ],
    items: {
      starter: { nombre: "Starter AI", necesita: "Usar IA en las tareas diarias", resumen: "Equipos sin experiencia previa aprenden a usar IA sobre sus tareas y con las herramientas que ya tienen.", publico: "Equipos no técnicos, hasta 16 personas", duracion: "Un mes", foco: "Aplicación de herramientas sobre tareas propias" },
      booster: { nombre: "Booster AI", necesita: "Automatizar procesos del equipo", resumen: "Equipos de negocio automatizan procesos propios con IA y agentes, acompañados por mentores expertos.", publico: "Equipos de negocio, hasta 8 personas", duracion: "Cinco semanas", foco: "Automatización con IA y agentes" },
      intensivo: { nombre: "Booster AI Intensivo", necesita: "Probar un piloto acotado", resumen: "Seis personas en tres duplas construyen una primera automatización real por dupla, en un piloto acotado.", publico: "Seis personas en tres duplas", duracion: "Una semana", foco: "Primera automatización real por dupla" },
      vibecode: { nombre: "VibeCode Studio", necesita: "Crear aplicaciones internas", resumen: "Equipos que ya usan IA construyen micro-aplicaciones de negocio, sin programación tradicional.", publico: "Equipos que ya adoptaron IA, hasta 8 personas", duracion: "Dos meses", foco: "Micro-aplicaciones de negocio" },
      builders: { nombre: "AI Builders", necesita: "Desarrollar capacidad técnica de automatización", resumen: "Perfiles técnicos se forman para construir automatizaciones complejas e integraciones entre sistemas dentro de su empresa.", publico: "Perfiles técnicos, hasta 3 personas", duracion: "Cuatro meses, dedicación completa", foco: "Automatizaciones complejas e integraciones" },
      dev: { nombre: "Booster AI Dev", necesita: "Incorporar IA al desarrollo", resumen: "Equipos de desarrollo incorporan herramientas y agentes de IA sobre su sprint y sus repositorios.", publico: "Equipos de desarrollo, hasta 8 personas", duracion: "Un mes", foco: "Adopción sobre el sprint real" },
      incubation: { nombre: "Incubation", necesita: "Construir software y formar desarrolladores", resumen: "Software construido mientras se forman los desarrolladores que después pueden integrarse a su equipo.", publico: "Organización y equipo mixto de Teamcubation", duracion: "Seis meses", foco: "Software y formación sobre el proyecto" },
    },
    primerPaso: {
      h2: "El primer paso depende de su punto de partida.",
      cols: [
        { h3: "¿Su equipo todavía no usa IA?", pHtml: 'Starter AI trabaja sobre las herramientas y las tareas de cada persona para construir una base de uso cotidiano. <a class="enlace" href="/servicios/starter-ai">Empezar con Starter AI</a>' },
        { h3: "¿Ya usa IA y quiere automatizar procesos?", pHtml: 'Booster AI acompaña la automatización de procesos propios. Booster AI Intensivo permite conocer el método con un piloto acotado de una semana. <a class="enlace" href="/servicios/booster-ai">Ver Booster AI</a> · <a class="enlace" href="/servicios/booster-ai-intensivo">Ver el formato Intensivo</a>' },
      ],
    },
    panel: {
      h2: "Una forma de construir experiencia.",
      p1: "Los programas de entrenamiento trabajan sobre necesidades concretas con mentores expertos y seguimiento en Teamboarding. Discovery define prioridades; Incubation combina desarrollo de software y formación dentro del proyecto.",
      p2: "Starter AI y Booster AI incluyen Charlas AI como punto de partida y acompañamiento a los líderes.",
      links: [
        { label: "Conocer la metodología", routeKey: "metodologia" },
        { label: "Conocer Teamboarding", routeKey: "teamboarding" },
      ],
    },
  },

  en: {
    seoTitle: "Services | Compare eight services based on your team and your goal: adopt AI, automate processes, build applications or develop software while training talent.",
    seoDesc: "Compare eight services based on your team and your goal: adopt AI, automate processes, build applications or develop software while training talent.",
    hero: {
      kicker: "Services",
      tituloHtml: 'AI and talent-development programs for <span class="resaltado">your company.</span>',
      bajada: "Teamcubation offers eight services to identify AI opportunities, train business teams, develop internal specialists and build software while training developers. The starting point depends on your needs and your teams' experience.",
      imgAlt: "Green and orange figures going through an amber ring together",
    },
    tituloCapas: "What can we achieve together?",
    labels: { necesita: "If you need:", publico: "For whom:", duracion: "Duration:", foco: "Focus:" },
    capas: [
      { titulo: "Have the people in your company use AI to work more efficiently.", etiqueta: "Surface layer — business teams.", bajada: "Your teams know the tasks they need to improve. Training starts from that knowledge and works on their tools and processes.", keys: ["starter", "booster", "intensivo"] },
      { titulo: "Have your most advanced AI users build technology.", etiqueta: "Middle layer — building with AI.", bajada: "Business profiles can create internal tools. Technical profiles can go deeper into integrations and more complex processes.", keys: ["vibecode", "builders"] },
      { titulo: "Add talent and new tech skills to your development team.", etiqueta: "IT core — development teams.", bajada: "We train development teams to adopt AI and we train developers while they build the software the company needs.", keys: ["dev", "incubation"] },
    ],
    items: {
      starter: { nombre: "Starter AI", necesita: "Use AI in daily tasks", resumen: "Teams with no prior experience learn to use AI on their tasks with the tools they already have.", publico: "Non-technical teams, up to 16 people", duracion: "One month", foco: "Applying tools to your own tasks" },
      booster: { nombre: "Booster AI", necesita: "Automate your team's processes", resumen: "Business teams automate their own processes with AI and agents, guided by expert mentors.", publico: "Business teams, up to 8 people", duracion: "Five weeks", foco: "Automation with AI and agents" },
      intensivo: { nombre: "Booster AI Intensive", necesita: "Try a focused pilot", resumen: "Six people in three pairs build a first real automation per pair, in a focused pilot.", publico: "Six people in three pairs", duracion: "One week", foco: "A first real automation per pair" },
      vibecode: { nombre: "VibeCode Studio", necesita: "Create internal applications", resumen: "Teams already using AI build business micro-apps, with no traditional programming.", publico: "Teams that already adopted AI, up to 8 people", duracion: "Two months", foco: "Business micro-apps" },
      builders: { nombre: "AI Builders", necesita: "Build technical automation capability", resumen: "Technical profiles train to build complex automations and integrations between systems within your company.", publico: "Technical profiles, up to 3 people", duracion: "Four months, full-time", foco: "Complex automations and integrations" },
      dev: { nombre: "Booster AI Dev", necesita: "Bring AI into development", resumen: "Development teams adopt AI tools and agents on their sprint and repositories.", publico: "Development teams, up to 8 people", duracion: "One month", foco: "Adoption on the real sprint" },
      incubation: { nombre: "Incubation", necesita: "Build software and train developers", resumen: "Software built while training developers who can then join your team.", publico: "Your organization and a mixed Teamcubation team", duracion: "Six months", foco: "Software and training on the project" },
    },
    primerPaso: {
      h2: "The first step depends on your starting point.",
      cols: [
        { h3: "Doesn't your team use AI yet?", pHtml: 'Starter AI works on each person’s tools and tasks to build a base of everyday use. <a class="enlace" href="/en/services/starter-ai">Start with Starter AI</a>' },
        { h3: "Already using AI and want to automate processes?", pHtml: 'Booster AI supports the automation of your own processes. Booster AI Intensive lets you get to know the method with a focused one-week pilot. <a class="enlace" href="/en/services/booster-ai">See Booster AI</a> · <a class="enlace" href="/en/services/booster-ai-intensivo">See the Intensive format</a>' },
      ],
    },
    panel: {
      h2: "A way to build experience.",
      p1: "The training programs work on concrete needs with expert mentors and tracking in Teamboarding. Discovery sets priorities; Incubation combines software development and training within the project.",
      p2: "Starter AI and Booster AI include Charlas AI as a starting point and support for leaders.",
      links: [
        { label: "Explore our methodology", routeKey: "metodologia" },
        { label: "Discover Teamboarding", routeKey: "teamboarding" },
      ],
    },
  },

  pt: {
    seoTitle: "Serviços | Compare oito serviços de acordo com a sua equipe e o seu objetivo: adotar IA, automatizar processos, criar aplicações ou desenvolver software formando talentos.",
    seoDesc: "Compare oito serviços de acordo com a sua equipe e o seu objetivo: adotar IA, automatizar processos, criar aplicações ou desenvolver software formando talentos.",
    hero: {
      kicker: "Serviços",
      tituloHtml: 'Programas de IA e formação de talentos para <span class="resaltado">a sua empresa.</span>',
      bajada: "A Teamcubation oferece oito serviços para identificar oportunidades de IA, treinar equipes de negócio, formar especialistas internos e desenvolver software enquanto forma desenvolvedores. O ponto de partida depende das suas necessidades e da experiência das suas equipes.",
      imgAlt: "Figuras verdes e laranjas atravessando juntas um anel âmbar",
    },
    tituloCapas: "O que podemos alcançar juntos?",
    labels: { necesita: "Se você precisa:", publico: "Para quem:", duracion: "Duração:", foco: "Foco:" },
    capas: [
      { titulo: "Que as pessoas da sua empresa aproveitem a IA para trabalhar com mais eficiência.", etiqueta: "Camada de superfície — equipes de negócio.", bajada: "Suas equipes conhecem as tarefas que precisam melhorar. O treinamento parte desse conhecimento e trabalha sobre suas ferramentas e processos.", keys: ["starter", "booster", "intensivo"] },
      { titulo: "Que as pessoas mais avançadas no uso da IA possam construir tecnologia.", etiqueta: "Camada intermediária — construção com IA.", bajada: "Os perfis de negócio podem criar ferramentas internas. Os perfis técnicos podem aprofundar em integrações e processos de maior complexidade.", keys: ["vibecode", "builders"] },
      { titulo: "Incorporar talentos e novas habilidades tecnológicas à sua equipe de desenvolvimento.", etiqueta: "Núcleo IT — equipes de desenvolvimento.", bajada: "Treinamos as equipes de desenvolvimento para incorporar IA e formamos desenvolvedores enquanto constroem o software que a empresa precisa.", keys: ["dev", "incubation"] },
    ],
    items: {
      starter: { nombre: "Starter AI", necesita: "Usar IA nas tarefas diárias", resumen: "Equipes sem experiência prévia aprendem a usar IA em suas tarefas e com as ferramentas que já têm.", publico: "Equipes não técnicas, até 16 pessoas", duracion: "Um mês", foco: "Aplicação de ferramentas sobre as próprias tarefas" },
      booster: { nombre: "Booster AI", necesita: "Automatizar processos da equipe", resumen: "Equipes de negócio automatizam seus próprios processos com IA e agentes, acompanhadas por mentores especialistas.", publico: "Equipes de negócio, até 8 pessoas", duracion: "Cinco semanas", foco: "Automação com IA e agentes" },
      intensivo: { nombre: "Booster AI Intensivo", necesita: "Testar um piloto delimitado", resumen: "Seis pessoas em três duplas constroem uma primeira automação real por dupla, em um piloto delimitado.", publico: "Seis pessoas em três duplas", duracion: "Uma semana", foco: "Primeira automação real por dupla" },
      vibecode: { nombre: "VibeCode Studio", necesita: "Criar aplicações internas", resumen: "Equipes que já usam IA constroem micro-aplicações de negócio, sem programação tradicional.", publico: "Equipes que já adotaram IA, até 8 pessoas", duracion: "Dois meses", foco: "Micro-aplicações de negócio" },
      builders: { nombre: "AI Builders", necesita: "Desenvolver capacidade técnica de automação", resumen: "Perfis técnicos se formam para construir automações complexas e integrações entre sistemas dentro da sua empresa.", publico: "Perfis técnicos, até 3 pessoas", duracion: "Quatro meses, tempo integral", foco: "Automações complexas e integrações" },
      dev: { nombre: "Booster AI Dev", necesita: "Incorporar IA ao desenvolvimento", resumen: "Equipes de desenvolvimento incorporam ferramentas e agentes de IA em seu sprint e seus repositórios.", publico: "Equipes de desenvolvimento, até 8 pessoas", duracion: "Um mês", foco: "Adoção sobre o sprint real" },
      incubation: { nombre: "Incubation", necesita: "Construir software e formar desenvolvedores", resumen: "Software construído enquanto se formam os desenvolvedores que depois podem integrar a sua equipe.", publico: "Sua organização e uma equipe mista da Teamcubation", duracion: "Seis meses", foco: "Software e formação sobre o projeto" },
    },
    primerPaso: {
      h2: "O primeiro passo depende do seu ponto de partida.",
      cols: [
        { h3: "Sua equipe ainda não usa IA?", pHtml: 'Starter AI trabalha sobre as ferramentas e as tarefas de cada pessoa para construir uma base de uso cotidiano. <a class="enlace" href="/pt/servicos/starter-ai">Começar com Starter AI</a>' },
        { h3: "Já usa IA e quer automatizar processos?", pHtml: 'Booster AI acompanha a automação dos seus próprios processos. Booster AI Intensivo permite conhecer o método com um piloto delimitado de uma semana. <a class="enlace" href="/pt/servicos/booster-ai">Ver Booster AI</a> · <a class="enlace" href="/pt/servicos/booster-ai-intensivo">Ver o formato Intensivo</a>' },
      ],
    },
    panel: {
      h2: "Uma forma de construir experiência.",
      p1: "Os programas de treinamento trabalham sobre necessidades concretas com mentores especialistas e acompanhamento no Teamboarding. Discovery define prioridades; Incubation combina desenvolvimento de software e formação dentro do projeto.",
      p2: "Starter AI e Booster AI incluem Charlas AI como ponto de partida e acompanhamento aos líderes.",
      links: [
        { label: "Conhecer a metodologia", routeKey: "metodologia" },
        { label: "Conhecer o Teamboarding", routeKey: "teamboarding" },
      ],
    },
  },
};

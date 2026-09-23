// Contenido de Metodología por idioma. ES = original (v2); EN traducido.
interface Ficha { titulo: string; ps: string[]; cierreHtml?: string }
interface QuedaItem { h3: string; pHtml: string }
interface Paso { titulo: string; p: string }

export interface MetodologiaContent {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  heroTituloHtml: string;
  heroBajada: string;
  heroImgAlt: string;
  s2: { h2: string; ps: string[] }[];
  fichas: Ficha[];
  confianza: { h2: string; p: string };
  acomp: { h2Html: string; guiasH3: string; guiasP: string; tbH3: string; tbP: string; nota: string; linkLabel: string };
  pasosH2: string;
  pasos: Paso[];
  quedaImgAlt: string;
  quedaH2: string;
  queda: QuedaItem[];
  faqH2: string;
  faqs: { pregunta: string; respuesta: string }[];
  programasH2: string;
}

export const metodologiaContent: Record<"es" | "en" | "pt", MetodologiaContent> = {
  es: {
    seoTitle: "Metodología | Cómo entrenamos equipos en IA: práctica sobre procesos reales, mentores expertos y seguimiento del avance y el impacto con Teamboarding.",
    seoDesc: "Cómo entrenamos equipos en IA: práctica sobre procesos reales, mentores expertos y seguimiento del avance y el impacto con Teamboarding.",
    kicker: "Metodología",
    heroTituloHtml: 'La experiencia no se enseña: <br /><span class="resaltado">se entrena.</span>',
    heroBajada: "El entrenamiento sucede dentro del trabajo real: nuestros mentores expertos acompañan a cada equipo y a cada persona mientras resuelven una necesidad concreta del negocio.",
    heroImgAlt: "Un colaborador verde y un mentor naranja cargando juntos una esfera de concreto",
    s2: [
      { h2: "Nosotros vamos al escritorio de la gente.", ps: [
        "Cuando alguien hace un curso dice: «Me voy al curso». En Teamcubation, nosotros vamos al escritorio de la gente, a trabajar con ellos.",
        "Partimos de la planilla que necesita ordenar, del reporte que tiene que preparar o del software que está construyendo. El entrenamiento sucede sobre sus herramientas, sus tareas y las decisiones de su trabajo.",
      ] },
      { h2: "El trabajo avanza. La experiencia queda en las personas.", ps: [
        "Una capacitación previa es una buena base. Nosotros acompañamos su aplicación a una necesidad concreta: entender el problema, construir una respuesta y revisar si funciona.",
        "Así, lo aprendido queda en las personas sumado a trabajo concreto realizado con esos aprendizajes en el proceso.",
      ] },
    ],
    fichas: [
      { titulo: "Aprender a pensar en procesos y sistemas.", ps: [
        "Con IA, más personas pueden construir soluciones. Para hacerlo con criterio necesitan comprender el problema: dividirlo en pasos, identificar qué información entra, qué reglas y excepciones existen y cómo cada cambio afecta al resto.",
        "Esa forma de pensar, habitual en el desarrollo de software, también es útil en finanzas, operaciones o recursos humanos. Nuestra experiencia entrenando desarrolladores guía cómo acompañamos a los equipos de negocio.",
      ] },
      { titulo: "Un mentor para desarrollar criterio.", ps: [
        "El criterio es saber qué problema atacar y cuándo la solución sirve.",
        "El mentor ayuda a ordenar el problema, cuestionar supuestos, destrabar el trabajo y evaluar resultados. A medida que avanza, el equipo aprende a explicar sus decisiones, detectar errores y resolver con más autonomía.",
      ], cierreHtml: 'El <span class="resaltado">criterio</span> se forma haciendo.' },
    ],
    confianza: {
      h2: "La confianza se construye con experiencia.",
      p: "Entender una explicación o un nuevo concepto es el comienzo. Aplicarla, probar, equivocarse y corregir sobre una tarea propia permite reconocer qué funciona y por qué. Esa experiencia es la base para encarar el siguiente problema y adoptar el uso de la tecnología de manera natural.",
    },
    acomp: {
      h2Html: 'Acompañamiento humano, guiado por <span class="resaltado">datos.</span>',
      guiasH3: "Guías expertos.",
      guiasP: "En los programas de entrenamiento, los mentores guían y los participantes construyen. Incubation combina desarrolladores experimentados y personas en formación en un equipo que trabaja sobre el proyecto de la empresa.",
      tbH3: "Teamboarding.",
      tbP: "Teamboarding es la plataforma propia de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, personaliza el entrenamiento y genera los informes que recibe el sponsor.",
      nota: "El sponsor es el responsable del programa dentro de su empresa.",
      linkLabel: "Conocer la medición en Teamboarding",
    },
    pasosH2: "¿Cómo se trabaja, en concreto?",
    pasos: [
      { titulo: "1. Entrenar sobre el trabajo real.", p: "Un guía experto trabaja junto al equipo sobre sus herramientas y tareas. Cada participante construye experiencia mientras avanza sobre un problema que conoce." },
      { titulo: "2. Medir el avance.", p: "Teamboarding registra el progreso de las personas y el impacto sobre los procesos trabajados. Los responsables reciben informes para seguir el recorrido." },
      { titulo: "3. Sostener lo aprendido.", p: "El objetivo es que el equipo pueda utilizar lo construido y encarar el siguiente problema con más autonomía. La entrega y el acompañamiento se definen según cada programa." },
    ],
    quedaImgAlt: "Figuras ascendiendo una montaña de concreto cargando piezas ámbar",
    quedaH2: "¿Qué queda al terminar?",
    queda: [
      { h3: "IA aplicada a las tareas.", pHtml: 'Starter AI entrena el uso de herramientas sobre las tareas de cada persona.<br><a class="enlace" href="/servicios/starter-ai">Ver Starter AI</a>' },
      { h3: "Procesos y herramientas propios.", pHtml: 'Los programas de automatización y construcción trabajan sobre procesos o aplicaciones concretos y entrenan al equipo para sostenerlos, con el alcance definido en cada programa. <a class="enlace" href="/servicios">Comparar los programas</a>' },
      { h3: "Software y desarrolladores formados en el proyecto.", pHtml: 'Incubation combina la construcción de software con la formación de desarrolladores que pueden integrarse a la empresa. <a class="enlace" href="/servicios/incubation">Ver Incubation</a>' },
    ],
    faqH2: "Preguntas sobre la metodología.",
    faqs: [
      { pregunta: "¿Qué significa on-the-job?", respuesta: "Significa que el entrenamiento ocurre sobre las tareas de la persona. En Teamcubation, cada participante aprende trabajando sobre una necesidad propia, acompañado por un guía experto." },
      { pregunta: "¿Qué significa doble entrega?", respuesta: "La doble entrega es la solución en producción más el equipo capacitado para sostenerla. Expresa el objetivo de los programas de construcción y automatización de Teamcubation. El alcance concreto se describe en cada programa; Discovery entrega un diagnóstico." },
      { pregunta: "¿Los mentores hacen el trabajo por el equipo?", respuesta: "En los programas de entrenamiento, los mentores guían y los participantes construyen. Incubation combina desarrolladores experimentados y personas en formación en un equipo que trabaja sobre el proyecto de la empresa." },
      { pregunta: "¿Cómo se sigue el avance?", respuesta: "Con Teamboarding, que registra el progreso de las personas y el impacto en los procesos trabajados y genera informes para quienes acompañan el programa dentro de la empresa." },
    ],
    programasH2: "Nuestros programas",
  },

  en: {
    seoTitle: "Methodology | How we train teams in AI: practice on real processes, expert mentors and tracking of progress and impact with Teamboarding.",
    seoDesc: "How we train teams in AI: practice on real processes, expert mentors and tracking of progress and impact with Teamboarding.",
    kicker: "Methodology",
    heroTituloHtml: "Experience isn't taught: <br /><span class=\"resaltado\">it's trained.</span>",
    heroBajada: "Training happens inside real work: our expert mentors support each team and each person while they solve a concrete business need.",
    heroImgAlt: "A green collaborator and an orange mentor carrying a concrete sphere together",
    s2: [
      { h2: "We go to people's desks.", ps: [
        "When someone takes a course they say: «I'm off to the course.» At Teamcubation, we go to people's desks, to work alongside them.",
        "We start from the spreadsheet they need to sort out, the report they have to prepare or the software they're building. Training happens on their tools, their tasks and the decisions of their work.",
      ] },
      { h2: "The work moves forward. The experience stays with the people.", ps: [
        "Prior training is a good base. We support its application to a concrete need: understand the problem, build a response and check whether it works.",
        "That way, what's learned stays with the people, together with concrete work done using those learnings in the process.",
      ] },
    ],
    fichas: [
      { titulo: "Learning to think in processes and systems.", ps: [
        "With AI, more people can build solutions. To do it with judgment they need to understand the problem: break it into steps, identify what information comes in, what rules and exceptions exist and how each change affects the rest.",
        "That way of thinking, common in software development, is also useful in finance, operations or HR. Our experience training developers guides how we support business teams.",
      ] },
      { titulo: "A mentor to develop judgment.", ps: [
        "Judgment is knowing which problem to tackle and when the solution is good enough.",
        "The mentor helps order the problem, question assumptions, unblock the work and evaluate results. As they progress, the team learns to explain its decisions, spot errors and solve with more autonomy.",
      ], cierreHtml: 'Good <span class="resaltado">judgment</span> is formed by doing.' },
    ],
    confianza: {
      h2: "Confidence is built with experience.",
      p: "Understanding an explanation or a new concept is the beginning. Applying it, testing, making mistakes and correcting on a task of your own lets you recognize what works and why. That experience is the base to tackle the next problem and adopt technology naturally.",
    },
    acomp: {
      h2Html: 'Human support, guided by <span class="resaltado">data.</span>',
      guiasH3: "Expert guides.",
      guiasP: "In the training programs, mentors guide and participants build. Incubation combines experienced developers and people in training in a team that works on the company's project.",
      tbH3: "Teamboarding.",
      tbP: "Teamboarding is Teamcubation's own platform that records each person's progress and the impact on each process, personalizes the training and generates the reports the sponsor receives.",
      nota: "The sponsor is the person responsible for the program within the company.",
      linkLabel: "See how we measure with Teamboarding",
    },
    pasosH2: "How does it work, in practice?",
    pasos: [
      { titulo: "1. Train on real work.", p: "An expert guide works alongside the team on their tools and tasks. Each participant builds experience while advancing on a problem they know." },
      { titulo: "2. Measure progress.", p: "Teamboarding records people's progress and the impact on the processes worked on. Those responsible receive reports to follow the journey." },
      { titulo: "3. Sustain what's learned.", p: "The goal is for the team to be able to use what was built and tackle the next problem with more autonomy. Delivery and support are defined per program." },
    ],
    quedaImgAlt: "Figures climbing a concrete mountain carrying amber pieces",
    quedaH2: "What's left at the end?",
    queda: [
      { h3: "AI applied to tasks.", pHtml: 'Starter AI trains the use of tools on each person’s tasks.<br><a class="enlace" href="/en/services/starter-ai">See Starter AI</a>' },
      { h3: "Your own processes and tools.", pHtml: 'The automation and building programs work on concrete processes or applications and train the team to sustain them, with the scope defined per program. <a class="enlace" href="/en/services">Compare the programs</a>' },
      { h3: "Software and developers trained on the project.", pHtml: 'Incubation combines building software with training developers who can join the company. <a class="enlace" href="/en/services/incubation">See Incubation</a>' },
    ],
    faqH2: "Questions about the methodology.",
    faqs: [
      { pregunta: "What does on-the-job mean?", respuesta: "It means training happens on the person's tasks. At Teamcubation, each participant learns by working on a need of their own, supported by an expert guide." },
      { pregunta: "What does double delivery mean?", respuesta: "Double delivery is the solution in production plus the team trained to sustain it. It expresses the goal of Teamcubation's building and automation programs. The concrete scope is described in each program; Discovery delivers a diagnosis." },
      { pregunta: "Do mentors do the work for the team?", respuesta: "In the training programs, mentors guide and participants build. Incubation combines experienced developers and people in training in a team that works on the company's project." },
      { pregunta: "How is progress tracked?", respuesta: "With Teamboarding, which records people's progress and the impact on the processes worked on and generates reports for those supporting the program within the company." },
    ],
    programasH2: "Our programs",
  },

  pt: {
    seoTitle: "Metodologia | Como treinamos equipes em IA: prática sobre processos reais, mentores especialistas e acompanhamento do avanço e do impacto com Teamboarding.",
    seoDesc: "Como treinamos equipes em IA: prática sobre processos reais, mentores especialistas e acompanhamento do avanço e do impacto com Teamboarding.",
    kicker: "Metodologia",
    heroTituloHtml: "A experiência não se ensina: <br /><span class=\"resaltado\">se treina.</span>",
    heroBajada: "O treinamento acontece dentro do trabalho real: nossos mentores especialistas acompanham cada equipe e cada pessoa enquanto resolvem uma necessidade concreta do negócio.",
    heroImgAlt: "Um colaborador verde e um mentor laranja carregando juntos uma esfera de concreto",
    s2: [
      { h2: "Nós vamos até a mesa das pessoas.", ps: [
        "Quando alguém faz um curso, diz: «Vou para o curso.» Na Teamcubation, nós vamos até a mesa das pessoas, para trabalhar ao lado delas.",
        "Partimos da planilha que você precisa organizar, do relatório que você tem que preparar ou do software que você está construindo. O treinamento acontece sobre suas ferramentas, suas tarefas e as decisões do seu trabalho.",
      ] },
      { h2: "O trabalho avança. A experiência fica nas pessoas.", ps: [
        "Um treinamento prévio é uma boa base. Nós acompanhamos sua aplicação a uma necessidade concreta: entender o problema, construir uma resposta e verificar se funciona.",
        "Assim, o que foi aprendido fica nas pessoas, somado ao trabalho concreto realizado com esses aprendizados no processo.",
      ] },
    ],
    fichas: [
      { titulo: "Aprender a pensar em processos e sistemas.", ps: [
        "Com IA, mais pessoas podem construir soluções. Para fazer isso com critério, elas precisam compreender o problema: dividi-lo em passos, identificar quais informações entram, quais regras e exceções existem e como cada mudança afeta o restante.",
        "Essa forma de pensar, comum no desenvolvimento de software, também é útil em finanças, operações ou recursos humanos. Nossa experiência treinando desenvolvedores orienta como acompanhamos as equipes de negócio.",
      ] },
      { titulo: "Um mentor para desenvolver critério.", ps: [
        "Critério é saber qual problema atacar e quando a solução é boa o suficiente.",
        "O mentor ajuda a organizar o problema, questionar suposições, destravar o trabalho e avaliar resultados. À medida que avança, a equipe aprende a explicar suas decisões, detectar erros e resolver com mais autonomia.",
      ], cierreHtml: 'O <span class="resaltado">critério</span> se forma fazendo.' },
    ],
    confianza: {
      h2: "A confiança se constrói com experiência.",
      p: "Entender uma explicação ou um novo conceito é o começo. Aplicá-la, testar, errar e corrigir sobre uma tarefa própria permite reconhecer o que funciona e por quê. Essa experiência é a base para encarar o próximo problema e adotar o uso da tecnologia de maneira natural.",
    },
    acomp: {
      h2Html: 'Acompanhamento humano, guiado por <span class="resaltado">dados.</span>',
      guiasH3: "Guias especialistas.",
      guiasP: "Nos programas de treinamento, os mentores guiam e os participantes constroem. Incubation combina desenvolvedores experientes e pessoas em formação em uma equipe que trabalha sobre o projeto da empresa.",
      tbH3: "Teamboarding.",
      tbP: "Teamboarding é a plataforma própria da Teamcubation que registra o avanço de cada pessoa e o impacto em cada processo, personaliza o treinamento e gera os relatórios que o sponsor recebe.",
      nota: "O sponsor é o responsável pelo programa dentro da sua empresa.",
      linkLabel: "Conhecer a medição no Teamboarding",
    },
    pasosH2: "Como se trabalha, na prática?",
    pasos: [
      { titulo: "1. Treinar sobre o trabalho real.", p: "Um guia especialista trabalha junto à equipe sobre suas ferramentas e tarefas. Cada participante constrói experiência enquanto avança sobre um problema que conhece." },
      { titulo: "2. Medir o avanço.", p: "Teamboarding registra o progresso das pessoas e o impacto sobre os processos trabalhados. Os responsáveis recebem relatórios para acompanhar o percurso." },
      { titulo: "3. Sustentar o que foi aprendido.", p: "O objetivo é que a equipe possa utilizar o que foi construído e encarar o próximo problema com mais autonomia. A entrega e o acompanhamento são definidos conforme cada programa." },
    ],
    quedaImgAlt: "Figuras subindo uma montanha de concreto carregando peças âmbar",
    quedaH2: "O que fica ao terminar?",
    queda: [
      { h3: "IA aplicada às tarefas.", pHtml: 'Starter AI treina o uso de ferramentas sobre as tarefas de cada pessoa.<br><a class="enlace" href="/pt/servicos/starter-ai">Ver Starter AI</a>' },
      { h3: "Processos e ferramentas próprios.", pHtml: 'Os programas de automação e construção trabalham sobre processos ou aplicações concretos e treinam a equipe para sustentá-los, com o escopo definido em cada programa. <a class="enlace" href="/pt/servicos">Comparar os programas</a>' },
      { h3: "Software e desenvolvedores formados no projeto.", pHtml: 'Incubation combina a construção de software com a formação de desenvolvedores que podem se integrar à empresa. <a class="enlace" href="/pt/servicos/incubation">Ver Incubation</a>' },
    ],
    faqH2: "Perguntas sobre a metodologia.",
    faqs: [
      { pregunta: "O que significa on-the-job?", respuesta: "Significa que o treinamento acontece sobre as tarefas da pessoa. Na Teamcubation, cada participante aprende trabalhando sobre uma necessidade própria, acompanhado por um guia especialista." },
      { pregunta: "O que significa entrega dupla?", respuesta: "A entrega dupla é a solução em produção mais a equipe capacitada para sustentá-la. Expressa o objetivo dos programas de construção e automação da Teamcubation. O escopo concreto é descrito em cada programa; Discovery entrega um diagnóstico." },
      { pregunta: "Os mentores fazem o trabalho pela equipe?", respuesta: "Nos programas de treinamento, os mentores guiam e os participantes constroem. Incubation combina desenvolvedores experientes e pessoas em formação em uma equipe que trabalha sobre o projeto da empresa." },
      { pregunta: "Como se acompanha o avanço?", respuesta: "Com Teamboarding, que registra o progresso das pessoas e o impacto nos processos trabalhados e gera relatórios para quem acompanha o programa dentro da empresa." },
    ],
    programasH2: "Nossos programas",
  },
};

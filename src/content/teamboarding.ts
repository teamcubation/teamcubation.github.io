// Contenido de Teamboarding por idioma. ES = original; EN traducido
// con criterio empresarial. Nombres de producto (Teamboarding) sin traducir.
interface Card { titulo: string; texto: string }
interface FaqItem { pregunta: string; respuesta: string }

export interface TeamboardingContent {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  heroH1: string;
  heroSub: string;
  heroBajada: string;
  heroNota: string;
  heroImgAlt: string;
  chips: string[];
  registraH2: string;
  registra: Card[];
  infoH2: string;
  informacion: Card[];
  mentoriaH2: string;
  mentoriaP: string;
  linkMetodologia: string;
  linkServicios: string;
  discoImgAlt: string;
  faqH2: string;
  faqs: FaqItem[];
  cierreEnlaceLabel: string;
}

export const teamboardingContent: Record<"es" | "en" | "pt", TeamboardingContent> = {
  es: {
    seoTitle: "Teamboarding | Teamboarding es la plataforma propia de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, y genera los informes que recibe el sponsor.",
    seoDesc: "Teamboarding es la plataforma propia de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, y genera los informes que recibe el sponsor.",
    kicker: "Teamboarding / Nuestra tecnología",
    heroH1: "Teamboarding: es cómo medimos el avance y el impacto de la adopción de IA.",
    heroSub: "Detrás de cada entrenamiento: datos.",
    heroBajada: "Teamboarding es la plataforma propietaria de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, personaliza el entrenamiento y genera los informes que recibe el sponsor.",
    heroNota: "El sponsor es el responsable del programa dentro de su empresa. Los datos acompañan el trabajo de los mentores y permiten seguir el recorrido del equipo.",
    heroImgAlt: "Mural de placas de concreto donde figuras registran el avance del equipo",
    chips: ["Personas", "Procesos", "Informes"],
    registraH2: "¿Qué registra Teamboarding?",
    registra: [
      { titulo: "Impacto en lo trabajado.", texto: "El trabajo sobre el proceso, la aplicación o el desarrollo que aborda cada participante, según el programa." },
      { titulo: "Crecimiento de habilidades.", texto: "El avance de las personas a lo largo del entrenamiento, para acompañar su recorrido y adaptar el trabajo a su nivel." },
      { titulo: "Participación en el programa.", texto: "Asistencia, horas de mentoría y satisfacción de participantes y responsables: información para seguir cómo se desarrolla el entrenamiento." },
    ],
    infoH2: "Información que sirve para acompañar al equipo.",
    informacion: [
      { titulo: "Informes de avance e impacto.", texto: "Los responsables del programa reciben información sobre el recorrido de las personas y el trabajo sobre los procesos." },
      { titulo: "Guías y resúmenes.", texto: "El entrenamiento deja materiales de referencia que ayudan a recuperar y reutilizar lo trabajado." },
      { titulo: "Un recorrido que se adapta.", texto: "La información registrada ayuda a personalizar el acompañamiento según el nivel y el avance de cada participante." },
    ],
    mentoriaH2: "Mentoría humana y guiada por datos.",
    mentoriaP: "El mentor trabaja junto a las personas. Teamboarding aporta información para acompañar ese trabajo. Son los dos motores del método de Teamcubation: experiencia humana y seguimiento del recorrido con IA.",
    linkMetodologia: "Conocer la metodología",
    linkServicios: "Comparar los programas",
    discoImgAlt: "Figuras empujando juntas un disco ámbar sobre una placa de concreto",
    faqH2: "Preguntas sobre Teamboarding.",
    faqs: [
      { pregunta: "¿Teamboarding es parte de Teamcubation?", respuesta: "Sí. Teamboarding es nuestra plataforma propietaria. Funciona como copiloto del mentor: ordena el proceso, resguarda su cumplimiento y hace visible el avance y los resultados en tiempo real." },
      { pregunta: "¿La plataforma reemplaza al mentor?", respuesta: "El trabajo del mentor y los datos de Teamboarding se complementan. La persona entrena con acompañamiento experto; la plataforma registra información para seguir y personalizar el recorrido." },
      { pregunta: "¿Cómo puede conocerla el responsable de mi empresa?", respuesta: "Podemos conversar sobre el programa que necesita su equipo y cómo se acompaña su avance con Teamboarding." },
    ],
    cierreEnlaceLabel: "Conocer la plataforma Teamboarding",
  },

  en: {
    seoTitle: "Teamboarding | Teamboarding is Teamcubation's own platform that records each person's progress and the impact on each process, and generates the reports the sponsor receives.",
    seoDesc: "Teamboarding is Teamcubation's own platform that records each person's progress and the impact on each process, and generates the reports the sponsor receives.",
    kicker: "Teamboarding / Our technology",
    heroH1: "Teamboarding: it's how we measure the progress and impact of AI adoption.",
    heroSub: "Behind every training: data.",
    heroBajada: "Teamboarding is Teamcubation's proprietary platform that records each person's progress and the impact on each process, personalizes the training and generates the reports the sponsor receives.",
    heroNota: "The sponsor is the person responsible for the program within the company. The data supports the mentors' work and makes it possible to follow the team's journey.",
    heroImgAlt: "Concrete-slab mural where figures record the team's progress",
    chips: ["People", "Processes", "Reports"],
    registraH2: "What does Teamboarding record?",
    registra: [
      { titulo: "Impact on the work done.", texto: "The work on the process, application or development each participant takes on, depending on the program." },
      { titulo: "Skills growth.", texto: "People's progress throughout the training, to support their journey and adapt the work to their level." },
      { titulo: "Program participation.", texto: "Attendance, mentoring hours and satisfaction of participants and program leads: information to follow how the training unfolds." },
    ],
    infoH2: "Information that helps support the team.",
    informacion: [
      { titulo: "Progress and impact reports.", texto: "The program leads receive information about people's journey and the work on the processes." },
      { titulo: "Guides and summaries.", texto: "The training leaves reference materials that help recover and reuse what was worked on." },
      { titulo: "A journey that adapts.", texto: "The recorded information helps personalize the support according to each participant's level and progress." },
    ],
    mentoriaH2: "Human mentoring, guided by data.",
    mentoriaP: "The mentor works alongside people. Teamboarding provides information to support that work. They are the two engines of Teamcubation's method: human experience and journey tracking with AI.",
    linkMetodologia: "Explore our methodology",
    linkServicios: "Compare the programs",
    discoImgAlt: "Figures pushing an amber disc together on a concrete slab",
    faqH2: "Questions about Teamboarding.",
    faqs: [
      { pregunta: "Is Teamboarding part of Teamcubation?", respuesta: "Yes. Teamboarding is our proprietary platform. It works as the mentor's copilot: it orders the process, safeguards its completion and makes progress and results visible in real time." },
      { pregunta: "Does the platform replace the mentor?", respuesta: "The mentor's work and Teamboarding's data complement each other. The person trains with expert support; the platform records information to follow and personalize the journey." },
      { pregunta: "How can the person responsible at my company get to know it?", respuesta: "We can talk about the program your team needs and how its progress is supported with Teamboarding." },
    ],
    cierreEnlaceLabel: "Discover the Teamboarding platform",
  },

  pt: {
    seoTitle: "Teamboarding | O Teamboarding é a plataforma própria da Teamcubation que registra o progresso de cada pessoa e o impacto em cada processo, e gera os relatórios que o sponsor recebe.",
    seoDesc: "O Teamboarding é a plataforma própria da Teamcubation que registra o progresso de cada pessoa e o impacto em cada processo, e gera os relatórios que o sponsor recebe.",
    kicker: "Teamboarding / Nossa tecnologia",
    heroH1: "Teamboarding: é como medimos o progresso e o impacto da adoção de IA.",
    heroSub: "Por trás de cada treinamento: dados.",
    heroBajada: "O Teamboarding é a plataforma proprietária da Teamcubation que registra o progresso de cada pessoa e o impacto em cada processo, personaliza o treinamento e gera os relatórios que o sponsor recebe.",
    heroNota: "O sponsor é o responsável pelo programa dentro da sua empresa. Os dados acompanham o trabalho dos mentores e permitem seguir a trajetória da equipe.",
    heroImgAlt: "Mural de placas de concreto onde figuras registram o progresso da equipe",
    chips: ["Pessoas", "Processos", "Relatórios"],
    registraH2: "O que o Teamboarding registra?",
    registra: [
      { titulo: "Impacto no que foi trabalhado.", texto: "O trabalho sobre o processo, a aplicação ou o desenvolvimento que cada participante aborda, conforme o programa." },
      { titulo: "Crescimento de habilidades.", texto: "O progresso das pessoas ao longo do treinamento, para acompanhar sua trajetória e adaptar o trabalho ao seu nível." },
      { titulo: "Participação no programa.", texto: "Presença, horas de mentoria e satisfação de participantes e responsáveis: informação para acompanhar como o treinamento se desenvolve." },
    ],
    infoH2: "Informação que serve para acompanhar a equipe.",
    informacion: [
      { titulo: "Relatórios de progresso e impacto.", texto: "Os responsáveis pelo programa recebem informação sobre a trajetória das pessoas e o trabalho sobre os processos." },
      { titulo: "Guias e resumos.", texto: "O treinamento deixa materiais de referência que ajudam a recuperar e reutilizar o que foi trabalhado." },
      { titulo: "Uma trajetória que se adapta.", texto: "A informação registrada ajuda a personalizar o acompanhamento conforme o nível e o progresso de cada participante." },
    ],
    mentoriaH2: "Mentoria humana e guiada por dados.",
    mentoriaP: "O mentor trabalha junto às pessoas. O Teamboarding fornece informação para acompanhar esse trabalho. São os dois motores do método da Teamcubation: experiência humana e acompanhamento da trajetória com IA.",
    linkMetodologia: "Conhecer a metodologia",
    linkServicios: "Comparar os programas",
    discoImgAlt: "Figuras empurrando juntas um disco âmbar sobre uma placa de concreto",
    faqH2: "Perguntas sobre o Teamboarding.",
    faqs: [
      { pregunta: "O Teamboarding faz parte da Teamcubation?", respuesta: "Sim. O Teamboarding é a nossa plataforma proprietária. Funciona como copiloto do mentor: organiza o processo, resguarda seu cumprimento e torna o progresso e os resultados visíveis em tempo real." },
      { pregunta: "A plataforma substitui o mentor?", respuesta: "O trabalho do mentor e os dados do Teamboarding se complementam. A pessoa treina com acompanhamento especialista; a plataforma registra informação para seguir e personalizar a trajetória." },
      { pregunta: "Como o responsável da minha empresa pode conhecê-la?", respuesta: "Podemos conversar sobre o programa que sua equipe precisa e como o seu progresso é acompanhado com o Teamboarding." },
    ],
    cierreEnlaceLabel: "Conhecer a plataforma Teamboarding",
  },
};

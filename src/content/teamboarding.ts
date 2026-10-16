// Contenido de Teamboarding por idioma. ES = original; EN traducido
// con criterio empresarial. Nombres de producto (Teamboarding) sin traducir.
interface Card { titulo: string; texto: string }
interface FaqItem { pregunta: string; respuesta: string }
// clave = nombre de la captura en src/assets/teamboarding/<idioma>/<clave>.webp.
interface Pantalla { clave: string; pestana: string; titulo: string; texto: string; alt: string }

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
  accesoPregunta: string;
  accesoLabel: string;
  registraH2: string;
  registra: Card[];
  infoH2: string;
  informacion: Card[];
  mentoriaH2: string;
  mentoriaP: string;
  linkMetodologia: string;
  linkServicios: string;
  discoImgAlt: string;
  pantallasH2: string;
  pantallasP: string;
  pantallasPestanasLabel: string;
  pantallas: Pantalla[];
  pantallasNota: string;
  faqH2: string;
  faqs: FaqItem[];
  cierreEnlaceLabel: string;
}

export const teamboardingContent: Record<"es" | "en" | "pt", TeamboardingContent> = {
  es: {
    seoTitle: "Teamboarding: el motor de datos del método | Teamcubation",
    seoDesc: "Teamboarding es la plataforma propia de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, y genera los informes que recibe el sponsor.",
    kicker: "Teamboarding / Nuestra tecnología",
    heroH1: "Teamboarding: es cómo medimos el avance y el impacto de la adopción de IA.",
    heroSub: "Detrás de cada entrenamiento: datos.",
    heroBajada: "Teamboarding es la plataforma propietaria de Teamcubation que registra el avance de cada persona y el impacto en cada proceso, personaliza el entrenamiento y genera los informes que recibe el sponsor.",
    heroNota: "El sponsor es el responsable del programa dentro de su empresa. Los datos acompañan el trabajo de los mentores y permiten seguir el recorrido del equipo.",
    heroImgAlt: "Mural de placas de concreto donde figuras registran el avance del equipo",
    chips: ["Personas", "Procesos", "Informes"],
    accesoPregunta: "¿Ya participa de un programa?",
    accesoLabel: "Ingresar a Teamboarding",
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
    pantallasH2: "Así funcionan las mentorías en Teamboarding.",
    pantallasP: "Del relevamiento inicial a la evaluación de cada sesión: así acompaña Teamboarding el trabajo de mentores y participantes.",
    pantallasPestanasLabel: "Funciones de Teamboarding",
    pantallas: [
      { clave: "relevamiento-inicial", pestana: "Relevamiento inicial", titulo: "El punto de partida de cada persona.", texto: "Antes de la primera mentoría, cada participante conversa con un agente de IA sobre su proceso, sus herramientas y sus datos. Teamboarding resume el nivel del equipo y las oportunidades de automatización, y el mentor llega con ese contexto.", alt: "Relevamiento inicial en Teamboarding: participantes que lo completaron, madurez del equipo en IA, principales oportunidades de automatización y mapa de habilidades por persona" },
      { clave: "agenda", pestana: "Agenda", titulo: "Cada persona reserva sus mentorías.", texto: "Los participantes eligen día y horario en la agenda del programa, junto con las charlas y los workshops. Teamboarding lleva la cuenta de las horas de mentoría de cada equipo.", alt: "Calendario semanal de Teamboarding con mentorías, charlas y workshops, y el panel para reservar una sesión con las horas disponibles" },
      { clave: "mentoria-en-vivo", pestana: "Mentoría en vivo", titulo: "Sesiones sobre el trabajo real.", texto: "Mentor y participante trabajan sobre el proceso que buscan mejorar, con la agenda de la sesión a la vista. Teamboarding registra la sesión, las notas y los próximos pasos.", alt: "Mentoría 1:1 en videollamada, con la agenda del día, notas tomadas por la IA y accionables" },
      { clave: "resumen-ia", pestana: "Resumen con IA", titulo: "Lo trabajado queda registrado.", texto: "Al terminar, cada sesión queda grabada con su transcripción, un resumen, las decisiones clave, los accionables y el foco de la próxima sesión.", alt: "Grabación de una mentoría con capítulos, transcripción y un resumen generado por IA con decisiones clave y accionables" },
      { clave: "charlas-workshops", pestana: "Charlas y workshops", titulo: "Encuentros para todo el grupo.", texto: "Las charlas, los workshops y los Show & Tell del programa, con agenda, inscripción y grabaciones para ver después.", alt: "Próximas charlas y workshops del programa en Teamboarding, con su agenda, inscriptos y grabaciones" },
      { clave: "nps-feedback", pestana: "NPS y feedback", titulo: "La opinión de los participantes, sesión a sesión.", texto: "Después de cada encuentro, los participantes califican la sesión y dejan sus comentarios. El NPS y un resumen con IA muestran qué funciona y qué conviene ajustar.", alt: "Panel de NPS y feedback en Teamboarding: NPS del programa, evolución por semana, puntaje por tipo de sesión y últimos comentarios" },
    ],
    pantallasNota: "Pantallas de Teamboarding con datos de ejemplo.",
    faqH2: "Preguntas sobre Teamboarding.",
    faqs: [
      { pregunta: "¿Teamboarding es parte de Teamcubation?", respuesta: "Sí. Teamboarding es nuestra plataforma propietaria. Funciona como copiloto del mentor: ordena el proceso, resguarda su cumplimiento y hace visible el avance y los resultados en tiempo real." },
      { pregunta: "¿La plataforma reemplaza al mentor?", respuesta: "El trabajo del mentor y los datos de Teamboarding se complementan. La persona entrena con acompañamiento experto; la plataforma registra información para seguir y personalizar el recorrido." },
      { pregunta: "¿Cómo puede conocerla el responsable de mi empresa?", respuesta: "Podemos conversar sobre el programa que necesita su equipo y cómo se acompaña su avance con Teamboarding." },
    ],
    cierreEnlaceLabel: "Ingresar a Teamboarding",
  },

  en: {
    seoTitle: "Teamboarding: the data engine behind the method | Teamcubation",
    seoDesc: "Teamboarding is Teamcubation's own platform that records each person's progress and the impact on each process, and generates the reports the sponsor receives.",
    kicker: "Teamboarding / Our technology",
    heroH1: "Teamboarding: it's how we measure the progress and impact of AI adoption.",
    heroSub: "Behind every training: data.",
    heroBajada: "Teamboarding is Teamcubation's proprietary platform that records each person's progress and the impact on each process, personalizes the training and generates the reports the sponsor receives.",
    heroNota: "The sponsor is the person responsible for the program within the company. The data supports the mentors' work and makes it possible to follow the team's journey.",
    heroImgAlt: "Concrete-slab mural where figures record the team's progress",
    chips: ["People", "Processes", "Reports"],
    accesoPregunta: "Already in a program?",
    accesoLabel: "Sign in to Teamboarding",
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
    pantallasH2: "How mentoring works in Teamboarding.",
    pantallasP: "From the initial assessment to the rating of each session: this is how Teamboarding supports the work of mentors and participants.",
    pantallasPestanasLabel: "Teamboarding features",
    pantallas: [
      { clave: "relevamiento-inicial", pestana: "Initial assessment", titulo: "Each person's starting point.", texto: "Before the first mentoring session, each participant talks with an AI agent about their process, their tools and their data. Teamboarding summarizes the team's level and the automation opportunities, and the mentor arrives with that context.", alt: "Initial assessment in Teamboarding: participants who completed it, the team's AI maturity, top automation opportunities and a skills map per person" },
      { clave: "agenda", pestana: "Calendar", titulo: "Each person books their mentoring sessions.", texto: "Participants pick a day and time on the program calendar, alongside the talks and workshops. Teamboarding keeps track of each team's mentoring hours.", alt: "Teamboarding weekly calendar with mentoring sessions, talks and workshops, and the panel to book a session with the hours available" },
      { clave: "mentoria-en-vivo", pestana: "Live mentoring", titulo: "Sessions on real work.", texto: "Mentor and participant work on the process they want to improve, with the session agenda in view. Teamboarding records the session, the notes and the next steps.", alt: "1:1 mentoring video call with today's agenda, notes taken by AI and action items" },
      { clave: "resumen-ia", pestana: "AI summary", titulo: "What was worked on stays on record.", texto: "When it ends, each session is recorded with its transcript, a summary, the key decisions, the action items and the focus for the next session.", alt: "Recording of a mentoring session with chapters, transcript and an AI-generated summary with key decisions and action items" },
      { clave: "charlas-workshops", pestana: "Talks & workshops", titulo: "Sessions for the whole group.", texto: "The program's talks, workshops and Show & Tells, with agenda, registration and recordings to watch later.", alt: "Upcoming talks and workshops of the program in Teamboarding, with their agenda, attendees and recordings" },
      { clave: "nps-feedback", pestana: "NPS & feedback", titulo: "What participants think, session by session.", texto: "After each session, participants rate it and leave their comments. The NPS and an AI summary show what works and what to adjust.", alt: "NPS and feedback dashboard in Teamboarding: program NPS, weekly trend, score by session type and latest comments" },
    ],
    pantallasNota: "Teamboarding screens with sample data.",
    faqH2: "Questions about Teamboarding.",
    faqs: [
      { pregunta: "Is Teamboarding part of Teamcubation?", respuesta: "Yes. Teamboarding is our proprietary platform. It works as the mentor's copilot: it orders the process, safeguards its completion and makes progress and results visible in real time." },
      { pregunta: "Does the platform replace the mentor?", respuesta: "The mentor's work and Teamboarding's data complement each other. The person trains with expert support; the platform records information to follow and personalize the journey." },
      { pregunta: "How can the person responsible at my company get to know it?", respuesta: "We can talk about the program your team needs and how its progress is supported with Teamboarding." },
    ],
    cierreEnlaceLabel: "Sign in to Teamboarding",
  },

  pt: {
    seoTitle: "Teamboarding: o motor de dados do método | Teamcubation",
    seoDesc: "O Teamboarding é a plataforma própria da Teamcubation que registra o progresso de cada pessoa e o impacto em cada processo, e gera os relatórios que o sponsor recebe.",
    kicker: "Teamboarding / Nossa tecnologia",
    heroH1: "Teamboarding: é como medimos o progresso e o impacto da adoção de IA.",
    heroSub: "Por trás de cada treinamento: dados.",
    heroBajada: "O Teamboarding é a plataforma proprietária da Teamcubation que registra o progresso de cada pessoa e o impacto em cada processo, personaliza o treinamento e gera os relatórios que o sponsor recebe.",
    heroNota: "O sponsor é o responsável pelo programa dentro da sua empresa. Os dados acompanham o trabalho dos mentores e permitem seguir a trajetória da equipe.",
    heroImgAlt: "Mural de placas de concreto onde figuras registram o progresso da equipe",
    chips: ["Pessoas", "Processos", "Relatórios"],
    accesoPregunta: "Já participa de um programa?",
    accesoLabel: "Entrar no Teamboarding",
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
    pantallasH2: "Como funcionam as mentorias no Teamboarding.",
    pantallasP: "Da avaliação inicial ao feedback de cada sessão: é assim que o Teamboarding acompanha o trabalho de mentores e participantes.",
    pantallasPestanasLabel: "Funções do Teamboarding",
    pantallas: [
      { clave: "relevamiento-inicial", pestana: "Avaliação inicial", titulo: "O ponto de partida de cada pessoa.", texto: "Antes da primeira mentoria, cada participante conversa com um agente de IA sobre o seu processo, as suas ferramentas e os seus dados. O Teamboarding resume o nível da equipe e as oportunidades de automação, e o mentor chega com esse contexto.", alt: "Avaliação inicial no Teamboarding: participantes que a completaram, maturidade da equipe em IA, principais oportunidades de automação e mapa de habilidades por pessoa" },
      { clave: "agenda", pestana: "Agenda", titulo: "Cada pessoa agenda as suas mentorias.", texto: "Os participantes escolhem dia e horário na agenda do programa, junto com as palestras e os workshops. O Teamboarding acompanha as horas de mentoria de cada equipe.", alt: "Agenda semanal do Teamboarding com mentorias, palestras e workshops, e o painel para agendar uma sessão com as horas disponíveis" },
      { clave: "mentoria-en-vivo", pestana: "Mentoria ao vivo", titulo: "Sessões sobre o trabalho real.", texto: "Mentor e participante trabalham sobre o processo que querem melhorar, com a pauta da sessão à vista. O Teamboarding registra a sessão, as anotações e os próximos passos.", alt: "Mentoria 1:1 por videochamada, com a pauta do dia, anotações feitas pela IA e ações combinadas" },
      { clave: "resumen-ia", pestana: "Resumo com IA", titulo: "O que foi trabalhado fica registrado.", texto: "Ao terminar, cada sessão fica gravada com a sua transcrição, um resumo, as decisões principais, as ações combinadas e o foco da próxima sessão.", alt: "Gravação de uma mentoria com capítulos, transcrição e um resumo gerado por IA com as decisões principais e as ações combinadas" },
      { clave: "charlas-workshops", pestana: "Palestras e workshops", titulo: "Encontros para todo o grupo.", texto: "As palestras, os workshops e os Show & Tell do programa, com agenda, inscrição e gravações para assistir depois.", alt: "Próximas palestras e workshops do programa no Teamboarding, com a sua agenda, inscritos e gravações" },
      { clave: "nps-feedback", pestana: "NPS e feedback", titulo: "A opinião dos participantes, sessão a sessão.", texto: "Depois de cada encontro, os participantes avaliam a sessão e deixam os seus comentários. O NPS e um resumo com IA mostram o que funciona e o que vale a pena ajustar.", alt: "Painel de NPS e feedback no Teamboarding: NPS do programa, evolução por semana, nota por tipo de sessão e últimos comentários" },
    ],
    pantallasNota: "Telas do Teamboarding com dados de exemplo.",
    faqH2: "Perguntas sobre o Teamboarding.",
    faqs: [
      { pregunta: "O Teamboarding faz parte da Teamcubation?", respuesta: "Sim. O Teamboarding é a nossa plataforma proprietária. Funciona como copiloto do mentor: organiza o processo, resguarda seu cumprimento e torna o progresso e os resultados visíveis em tempo real." },
      { pregunta: "A plataforma substitui o mentor?", respuesta: "O trabalho do mentor e os dados do Teamboarding se complementam. A pessoa treina com acompanhamento especialista; a plataforma registra informação para seguir e personalizar a trajetória." },
      { pregunta: "Como o responsável da minha empresa pode conhecê-la?", respuesta: "Podemos conversar sobre o programa que sua equipe precisa e como o seu progresso é acompanhado com o Teamboarding." },
    ],
    cierreEnlaceLabel: "Entrar no Teamboarding",
  },
};

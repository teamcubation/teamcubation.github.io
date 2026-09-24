// Contenido de Nosotros por idioma. ES = original; EN traducido con
// criterio empresarial (pendiente de revisión humana).
interface ConviccionBloque { h3: string; pHtml: string }
interface Fundador { nombre: string; rol: string; linkedin: string; foto: string }
interface Enlace { label: string; href: string }

export interface NosotrosContent {
  seoTitle: string;
  seoDesc: string;
  kicker: string;
  heroH1: string;
  heroBajada: string;
  heroMarca: string;
  defQ: { h2: string; ps: string[] };
  conviccion: { h2: string; bloques: ConviccionBloque[] };
  heroImgAlt: string;
  fundadoresH2: string;
  fundadores: Fundador[];
  criterioImgAlt: string;
  criterioH2Html: string;
  criterioP: string;
  criterioPaises: string;
  criterioLinks: Enlace[];
}

export const nosotrosContent: Record<"es" | "en" | "pt", NosotrosContent> = {
  es: {
    seoTitle: "Nosotros: la experiencia se entrena | Teamcubation",
    seoDesc: "Teamcubation fue fundada en 2021 en Buenos Aires por Mariano Wechsler y Diego Jolodenco. Conozca su historia y su método de entrenamiento.",
    kicker: "Nosotros",
    heroH1: "Qué es Teamcubation y quiénes la fundaron.",
    heroBajada: "Teamcubation fue fundada en 2021 en Argentina por Mariano Wechsler y Diego Jolodenco. Comenzó entrenando desarrolladores junior que ganaban experiencia y seniority construyendo software real para las empresas que los contrataban desde el inicio, sin esperar a que estuvieran listos. Hoy aplica ese mismo principio al entrenamiento de equipos en la adopción de IA sobre su propio trabajo.",
    heroMarca: "La experiencia no se enseña: se entrena.",
    defQ: {
      h2: "¿Qué es Teamcubation?",
      ps: [
        "Teamcubation desarrolla la capacidad de las empresas para usar y construir tecnología, entrenando a sus equipos sobre procesos y proyectos propios.",
        "Training tech: la combinación de entrenamiento y tecnología que usamos para acompañar a los equipos. Los mentores trabajan sobre las tareas de las personas y Teamboarding aporta seguimiento del recorrido.",
      ],
    },
    conviccion: {
      h2: "Una convicción que creció con el trabajo.",
      bloques: [
        { h3: "2021: formar construyendo software.", pHtml: 'Teamcubation nació formando desarrolladores mientras trabajaban sobre proyectos de software. Esa forma de construir experiencia es la base del programa Incubation. <a class="enlace" href="/servicios/incubation/">Conocer Incubation</a>' },
        { h3: "Entrenar equipos para adoptar IA.", pHtml: 'Aplicamos el mismo principio a las tareas de negocio, la automatización y la construcción con IA: que las personas desarrollen experiencia trabajando sobre necesidades que conocen. <a class="enlace" href="/servicios/">Conocer los programas</a>' },
      ],
    },
    heroImgAlt: "Equipo trabajando sobre planos y procesos propios en planta",
    fundadoresH2: "El equipo.",
    fundadores: [
      { nombre: "Mariano Wechsler", rol: "Cofundador y CEO", linkedin: "https://www.linkedin.com/in/marianowechsler/", foto: "mariano-wechsler" },
      { nombre: "Diego Jolodenco", rol: "Cofundador y COO", linkedin: "https://www.linkedin.com/in/diegojolodenco/", foto: "diego-jolodenco" },
      { nombre: "Jonathan Tapicer", rol: "CTO", linkedin: "https://www.linkedin.com/in/tapicer/", foto: "jonathan-tapicer" },
      { nombre: "Agustín Pina", rol: "Head of Training", linkedin: "https://www.linkedin.com/in/agustin-pina/", foto: "agustin-pina" },
      { nombre: "Tomás Estruga", rol: "Director Comercial y Alianzas", linkedin: "https://www.linkedin.com/in/tomas-estruga-892140b/", foto: "tomas-estruga" },
      { nombre: "Tomás Muñoz", rol: "CFO", linkedin: "https://www.linkedin.com/in/tomasmunoz/", foto: "tomas-munoz" },
      { nombre: "Florencia Díaz", rol: "Head of People", linkedin: "https://www.linkedin.com/in/mariaflorenciadiaz/", foto: "florencia-diaz" },
    ],
    criterioImgAlt: "Mentora trabajando junto a un participante sobre su propia tarea",
    criterioH2Html: 'El <span class="resaltado">criterio</span> se forma haciendo.',
    criterioP: "El criterio es saber qué problema atacar, si la IA puede ayudar a resolverlo y cómo encararlo. Se forma decidiendo sobre problemas propios, no sobre casos de ejemplo. Nuestros mentores no dan respuestas: preguntan por qué, hasta que el equipo reconoce el patrón y lo aplica solo.",
    criterioPaises: "Teamcubation trabajó con más de 90 empresas líderes en 6 países: Argentina, Brasil, Uruguay, Chile, Colombia y España.",
    criterioLinks: [
      { label: "Conocer nuestra trayectoria", href: "/casos/" },
      { label: "Conocer la metodología", href: "/metodologia/" },
      { label: "Conocer Teamboarding", href: "/teamboarding/" },
    ],
  },

  en: {
    seoTitle: "About: experience is trained | Teamcubation",
    seoDesc: "Teamcubation was founded in 2021 in Buenos Aires by Mariano Wechsler and Diego Jolodenco. Learn about its history and its training method.",
    kicker: "About",
    heroH1: "What Teamcubation is and who founded it.",
    heroBajada: "Teamcubation was founded in 2021 in Argentina by Mariano Wechsler and Diego Jolodenco. It started by training junior developers who gained experience and seniority building real software for the companies that hired them from the start, without waiting until they were ready. Today it applies that same principle to training teams in the adoption of AI on their own work.",
    heroMarca: "Experience isn't taught: it's trained.",
    defQ: {
      h2: "What is Teamcubation?",
      ps: [
        "Teamcubation builds companies' capability to use and build technology, training their teams on their own processes and projects.",
        "Training tech: the combination of training and technology we use to support teams. Mentors work on people's tasks and Teamboarding provides tracking of the journey.",
      ],
    },
    conviccion: {
      h2: "A conviction that grew with the work.",
      bloques: [
        { h3: "2021: training by building software.", pHtml: 'Teamcubation was born training developers while they worked on software projects. That way of building experience is the base of the Incubation program. <a class="enlace" href="/en/services/incubation/">Explore Incubation</a>' },
        { h3: "Training teams to adopt AI.", pHtml: 'We apply the same principle to business tasks, automation and building with AI: that people build experience working on needs they know. <a class="enlace" href="/en/services/">Explore the programs</a>' },
      ],
    },
    heroImgAlt: "Team working on their own plans and processes on site",
    fundadoresH2: "The team.",
    fundadores: [
      { nombre: "Mariano Wechsler", rol: "Cofundador y CEO", linkedin: "https://www.linkedin.com/in/marianowechsler/", foto: "mariano-wechsler" },
      { nombre: "Diego Jolodenco", rol: "Cofundador y COO", linkedin: "https://www.linkedin.com/in/diegojolodenco/", foto: "diego-jolodenco" },
      { nombre: "Jonathan Tapicer", rol: "CTO", linkedin: "https://www.linkedin.com/in/tapicer/", foto: "jonathan-tapicer" },
      { nombre: "Agustín Pina", rol: "Head of Training", linkedin: "https://www.linkedin.com/in/agustin-pina/", foto: "agustin-pina" },
      { nombre: "Tomás Estruga", rol: "Director Comercial y Alianzas", linkedin: "https://www.linkedin.com/in/tomas-estruga-892140b/", foto: "tomas-estruga" },
      { nombre: "Tomás Muñoz", rol: "CFO", linkedin: "https://www.linkedin.com/in/tomasmunoz/", foto: "tomas-munoz" },
      { nombre: "Florencia Díaz", rol: "Head of People", linkedin: "https://www.linkedin.com/in/mariaflorenciadiaz/", foto: "florencia-diaz" },
    ],
    criterioImgAlt: "A mentor working alongside a participant on their own task",
    criterioH2Html: 'Good <span class="resaltado">judgment</span> is formed by doing.',
    criterioP: "Judgment is knowing which problem to tackle, whether AI can help solve it and how to approach it. It's formed by deciding on your own problems, not on example cases. Our mentors don't give answers: they ask why, until the team recognizes the pattern and applies it on its own.",
    criterioPaises: "Teamcubation has worked with more than 90 leading companies across 6 countries: Argentina, Brazil, Uruguay, Chile, Colombia and Spain.",
    criterioLinks: [
      { label: "Explore our track record", href: "/en/clients/" },
      { label: "Explore our methodology", href: "/en/methodology/" },
      { label: "Explore Teamboarding", href: "/en/teamboarding/" },
    ],
  },

  pt: {
    seoTitle: "Sobre: a experiência se treina | Teamcubation",
    seoDesc: "A Teamcubation foi fundada em 2021 em Buenos Aires por Mariano Wechsler e Diego Jolodenco. Conheça a sua história e o seu método de treinamento.",
    kicker: "Sobre",
    heroH1: "O que é a Teamcubation e quem a fundou.",
    heroBajada: "A Teamcubation foi fundada em 2021 na Argentina por Mariano Wechsler e Diego Jolodenco. Começou treinando desenvolvedores juniores que ganhavam experiência e senioridade construindo software real para as empresas que os contratavam desde o início, sem esperar que estivessem prontos. Hoje aplica esse mesmo princípio ao treinamento de equipes na adoção de IA sobre o seu próprio trabalho.",
    heroMarca: "A experiência não se ensina: se treina.",
    defQ: {
      h2: "O que é a Teamcubation?",
      ps: [
        "A Teamcubation desenvolve a capacidade das empresas de usar e construir tecnologia, treinando as suas equipes sobre processos e projetos próprios.",
        "Training tech: a combinação de treinamento e tecnologia que usamos para acompanhar as equipes. Os mentores trabalham sobre as tarefas das pessoas e o Teamboarding contribui com o acompanhamento do percurso.",
      ],
    },
    conviccion: {
      h2: "Uma convicção que cresceu com o trabalho.",
      bloques: [
        { h3: "2021: formar construindo software.", pHtml: 'A Teamcubation nasceu formando desenvolvedores enquanto trabalhavam sobre projetos de software. Essa forma de construir experiência é a base do programa Incubation. <a class="enlace" href="/pt/servicos/incubation/">Conhecer o Incubation</a>' },
        { h3: "Treinar equipes para adotar IA.", pHtml: 'Aplicamos o mesmo princípio às tarefas de negócio, à automação e à construção com IA: que as pessoas desenvolvam experiência trabalhando sobre necessidades que conhecem. <a class="enlace" href="/pt/servicos/">Conhecer os programas</a>' },
      ],
    },
    heroImgAlt: "Equipe trabalhando sobre planos e processos próprios na planta",
    fundadoresH2: "A equipe.",
    fundadores: [
      { nombre: "Mariano Wechsler", rol: "Cofundador y CEO", linkedin: "https://www.linkedin.com/in/marianowechsler/", foto: "mariano-wechsler" },
      { nombre: "Diego Jolodenco", rol: "Cofundador y COO", linkedin: "https://www.linkedin.com/in/diegojolodenco/", foto: "diego-jolodenco" },
      { nombre: "Jonathan Tapicer", rol: "CTO", linkedin: "https://www.linkedin.com/in/tapicer/", foto: "jonathan-tapicer" },
      { nombre: "Agustín Pina", rol: "Head of Training", linkedin: "https://www.linkedin.com/in/agustin-pina/", foto: "agustin-pina" },
      { nombre: "Tomás Estruga", rol: "Director Comercial y Alianzas", linkedin: "https://www.linkedin.com/in/tomas-estruga-892140b/", foto: "tomas-estruga" },
      { nombre: "Tomás Muñoz", rol: "CFO", linkedin: "https://www.linkedin.com/in/tomasmunoz/", foto: "tomas-munoz" },
      { nombre: "Florencia Díaz", rol: "Head of People", linkedin: "https://www.linkedin.com/in/mariaflorenciadiaz/", foto: "florencia-diaz" },
    ],
    criterioImgAlt: "Mentora trabalhando junto a um participante sobre a sua própria tarefa",
    criterioH2Html: 'O <span class="resaltado">critério</span> se forma fazendo.',
    criterioP: "O critério é saber qual problema atacar, se a IA pode ajudar a resolvê-lo e como encará-lo. Se forma decidindo sobre problemas próprios, não sobre casos de exemplo. Os nossos mentores não dão respostas: perguntam por quê, até que a equipe reconheça o padrão e o aplique sozinha.",
    criterioPaises: "A Teamcubation trabalhou com mais de 90 empresas líderes em 6 países: Argentina, Brasil, Uruguai, Chile, Colômbia e Espanha.",
    criterioLinks: [
      { label: "Conhecer a nossa trajetória", href: "/pt/clientes/" },
      { label: "Conhecer a metodologia", href: "/pt/metodologia/" },
      { label: "Conhecer o Teamboarding", href: "/pt/teamboarding/" },
    ],
  },
};

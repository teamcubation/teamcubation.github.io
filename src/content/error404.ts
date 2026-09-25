// Contenido de la página 404 por idioma. ES = original; EN y PT traducidos (pendientes de
// revisión humana, como el resto del sitio).
export interface Error404Content {
  tituloHtml: string;
  parrafos: string[];
  enlacesAria: string;
  enlaces: { inicio: string; servicios: string; contacto: string };
  imagenAlt: string;
}

export const error404Content: Record<"es" | "en" | "pt", Error404Content> = {
  es: {
    tituloHtml: '404 <span class="resaltado">not found</span>',
    parrafos: [
      "Pero no se preocupe: equivocarse es parte del método. Nosotros lo decimos todo el tiempo: la experiencia es lo que queda después de haber hecho, equivocado, aprender, volver a hacer y finalmente haber entendido.",
      "Usted clickeó o escribió la URL y hay dos opciones: tenemos un link roto o se equivocó de URL. Ahora falta entender qué pasó y resolver la cuestión.",
    ],
    enlacesAria: "Para seguir navegando",
    enlaces: {
      inicio: "Volver al inicio",
      servicios: "Conocer los servicios",
      contacto: "Ir al formulario de contacto",
    },
    imagenAlt: "Una figura verde se encoge de hombros junto al hueco vacío de un bloque de concreto",
  },
  en: {
    tituloHtml: '404 <span class="resaltado">not found</span>',
    parrafos: [
      "But don't worry: making mistakes is part of the method. We say it all the time: experience is what remains after doing, getting it wrong, learning, doing it again and finally understanding.",
      "You clicked or typed the URL, and there are two options: we have a broken link or you got the URL wrong. Now all that's left is to understand what happened and sort it out.",
    ],
    enlacesAria: "Keep browsing",
    enlaces: {
      inicio: "Back to the home page",
      servicios: "Explore our services",
      contacto: "Go to the contact form",
    },
    imagenAlt: "A green figure shrugs next to the empty hollow in a concrete block",
  },
  pt: {
    tituloHtml: '404 <span class="resaltado">not found</span>',
    parrafos: [
      "Mas não se preocupe: errar faz parte do método. Dizemos isso o tempo todo: a experiência é o que fica depois de fazer, errar, aprender, fazer de novo e, finalmente, entender.",
      "Você clicou ou digitou a URL e há duas opções: temos um link quebrado ou você errou a URL. Agora falta entender o que aconteceu e resolver a questão.",
    ],
    enlacesAria: "Para continuar navegando",
    enlaces: {
      inicio: "Voltar ao início",
      servicios: "Conhecer os serviços",
      contacto: "Ir para o formulário de contato",
    },
    imagenAlt: "Uma figura verde dá de ombros ao lado do buraco vazio de um bloco de concreto",
  },
};

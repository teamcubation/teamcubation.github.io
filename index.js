// import data_en from "./src/locales/en.json" assert {type: 'json'};
// import data_es from "./src/locales/es.json" assert {type: 'json'};
import CarouselAnimator from './animations.js';

const url = "https://teamcubation.com/";
const initialLocation = document.location.href;
const lang = document.documentElement.lang;
let json_path;

$(document).ready(
  document.documentElement.lang === "es"
    ? (json_path = "./src/locales/es.json")
    : (json_path = "./src/locales/en.json"),
  // $('.top-quotes').animatedHeadline({ animationType: "push" })
);

const dataByLang = {
  home: {
    btnEnter: lang === "es" ? "> Entrar <" : "> Enter <",
  },
  enter: {
    "organization-enter": {
      defaultLegend:
        lang === "es" ? "Soy una organización" : "I’m an organization",
    },
    "senior-enter": {
      defaultLegend: lang === "es" ? "Soy un dev Senior" : "I’m a Senior dev",
    },
    "junior-enter": {
      defaultLegend: lang === "es" ? "Soy un dev Junior" : "I’m a Junior dev",
    },
    "team-enter": {
      defaultLegend: lang === "es" ? "Nosotros" : "Us",
    },
  },
  formContact: {
    btnSend: lang === "es" ? "Enviar" : "Submit",
    btnSending: lang === "es" ? "Enviando..." : "Sending...",
    originExtraPlaceholder:
      lang === "es" ? "¿Cómo te identificás?" : "How do you identify yourself?",
    originExtraOhterOption: lang === "es" ? "otro" : "other",
    validation: {
      noOptionSelected:
        lang == "es" ? "Por favor elegí una opción" : "Please select an option",
      noTextOtherOption:
        lang == "es" ? "Por favor ingresá un texto" : "Please enter a text",
    },
    submitResponse: {
      success:
        lang === "es"
          ? "Su mensaje se ha enviado correctamente, gracias!"
          : "Your message has been sent, thank you!",
      error:
        lang === "es"
          ? "Ocurrió un error durante el envío del formulario, por favor vuelva a intentarlo"
          : "An error occurred while sending the form, please try again.",
    },
  },
};

// const urlBuilder = (currentUrl) => {
//   return !currentUrl.includes("/en/") ? url : `${url}/en/`;
// };


$(".form-contact").append(
  '<button type="submit" name="submit-contact" class="btn-tc submit-contact" style="float: right; width: 25%">' +
    dataByLang.formContact.btnSend + "<span class=_effect>_</span></button>"
);
$(".form-contact").on("submit", function (ev) {
  ev.preventDefault();
  let data_origin_extra_error_message = dataByLang.formContact.validation.noOptionSelected;
  const currentForm = $(this).attr("id");
  const btn = $(this).find(".submit-contact");
  const data_name = $(`#${currentForm} .name`).val();
  let data_number = `+${$(`#${currentForm} .country-phone`).val()} ${$(`#${currentForm} .area-phone`).val()} ${$(`#${currentForm} .number-phone`).val()}`;
  if (data_number.trim() === "+") {
    data_number = undefined;
  }
  let data_email = $(`#${currentForm} .email`).val();
  if (data_email.trim() === "") {
    data_email = undefined;
  }
  const data_message = $(`#${currentForm} .message`).val();
  let data_organization = $(`#${currentForm} .organizationContact`).val();
  if (!data_organization) {
    data_organization = undefined;
  }
  let data_origin_extra = $(`#${currentForm} .input-select`).data(
    "value-selected"
  );
  if (data_origin_extra === "other") {
    data_origin_extra_error_message =
      dataByLang.formContact.validation.noTextOtherOption;
    const inputSelectText = $(`#${currentForm} .input-select`).val();
    inputSelectText === ""
      ? (data_origin_extra = null)
      : (data_origin_extra = `${data_origin_extra}: ${inputSelectText}`);
  }
  if (data_origin_extra) {
    $(".select-tc").css("border-bottom", "2px solid rgba(128, 128, 128, 0.507)");
    btn.text(dataByLang.formContact.btnSending);
    $.ajax({
      url: "https://api.prod.tq.teamcubation.com/contact",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        full_name: data_name,
        message: data_message,
        organization: data_organization,
        phone_number: data_number,
        email: data_email,
        origin_extra: data_origin_extra,
        lang: lang,
      }),
      dataType: "json",
      success: (r) => {
        $(".alert").remove();
        $(".form-contact").prepend(
          '<div class="alert alert-success mt-5" role="alert"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.success);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
        btn.replaceWith(
          '<button type="submit" name="submit-contact" class="btn-tc submit-contact">' +
            dataByLang.formContact.btnSend +
            "<span class=_effect>_</span></button>"
        );
        clearForm();
      },
      error: (r) => {
        $(".alert").remove();
        $(".form-contact").prepend(
          '<div class="alert alert-danger mt-5" role="alert"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.error);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
        btn.replaceWith(
          '<button type="submit" name="submit-contact" class="btn-tc submit-contact">' +
            dataByLang.formContact.btnSend +
            "<span class=_effect>_</span></button>"
        );
        clearForm();
      },
    });
    return false;
  } else {
    $(".select-tc").css("border-bottom", "2px solid red");
    $(".dropdown-select").append(
      '<p class="text-error" style="color: red">' +
        data_origin_extra_error_message +
        "</p>"
    );
    return false;
  }
});

const clearForm = () => {
  $(".text-error").remove();
  $(".name").val("");
  $(".country-phone").val("");
  $(".area-phone").val("");
  $(".number-phone").val("");
  $(".email").val("");
  $(".message").val("");
  $(".organizationContact").val("");
  $(".list-options-tc").slideUp();
  $(".chevron-select").removeClass("chevron-effect");
  $(".select-tc").css("border-bottom", "2px solid rgba(128, 128, 128, 0.507)");
  $(".input-select")
    .prop("disabled", true)
    .val("")
    .attr("placeholder", dataByLang.formContact.originExtraPlaceholder)
    .removeData("value-selected")
    .height('40px');
};

$(".language-select").hover(
  function () {
    if (screen.width > 1024) {
      $(`.language-options li`).each(function () {
        if ($(this).data("lang") === lang) {
          $(this).find("a").addClass("a-disbled");
        }
      });
      $(`.language-options`).toggle();
    }
  },
  function () {
    $(`.language-options`).toggle();
  }
);

$(".language-select-mobile").on("click", function () {
  $(`.language-options li`).each(function () {
    if ($(this).data("lang") === lang) {
      $(this).find("a").addClass("a-disbled");
    }
  });
  $(`.language-options`).toggle();
});

// input select //

$(".select-tc").on("click", function () {
  if ($(".option-tc").is(":visible")) {
    $(".list-options-tc").slideUp();
    $(this).find(".chevron-select").removeClass("chevron-effect");
  } else {
    $(".list-options-tc").slideDown();
    $(this).find(".chevron-select").addClass("chevron-effect");
    $(".select-tc").css("border-bottom", " 2px solid red");
  }
});

$(".option-tc").hover(
  function () {
    $(this).addClass("option-hover");
  },
  function () {
    $(this).removeClass("option-hover");
  }
);

$(".option-tc").on("click", function () {
  const optionSelected = $(this);
  const valueOption = optionSelected.data("option");
  const textOption = optionSelected.text();
  $(".text-error").remove();
  if (valueOption === "other") {
    $('.form-message').css('display', 'none');
    $("#formInformation").css('visibility', 'visible');
    $(".submit-contact").css('visibility', 'visible');
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $(".input-select").prop("disabled", false).focus().val("")
      .attr("placeholder", dataByLang.formContact.originExtraPlaceholder);
  } 
  else if (valueOption === "organization") {
    $('.form-message').css('display', 'none');
    $("#formInformation").css('visibility', 'visible');
    $(".submit-contact").css('visibility', 'visible');
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $(".input-select").prop("disabled", true);
  } 
  else {
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $("#formInformation").css('visibility', 'hidden');
    $(".submit-contact").css('visibility', 'hidden');
    $('.form-message').css('display', 'none');
    valueOption === "senior" && $("#seniorsMessage").css('display', 'block');
    valueOption === "junior" && $("#juniorsMessage").css('display', 'block');
    valueOption === "no-exp" && $('#noCodersMessage').css('display', 'block');
  }
  adjustContactTextareaHeight();
  $(".list-options-tc").slideUp();
  $(".chevron-select").removeClass("chevron-effect");
});

// function adjustContactTextareaHeight() {
//   $('.input-select').height(0);
//   $('.input-select').height($('.input-select')[0].scrollHeight - 4);
// }

// $(adjustContactTextareaHeight);

// 
// window.addEventListener("click", function (e) {
//   if (
//     !document.getElementById("dropdown-select").contains(e.target)
//   ) {
//     $(".list-options-tc").slideUp();
//     $(".chevron-select").removeClass("chevron-effect");
//     $(".select-tc").css(
//       "border-bottom",
//       "2px solid rgba(128, 128, 128, 0.507)"
//     );
//     if ($(".input-select").val() !== "") $(".text-error").remove();
//   }
//   if (
//     !document.getElementById("selectLangMobile").contains(e.target)
//   ) {
//     $(`.language-options`).hide();
//   }
// });

// mobile navbar 

$(".menu-button").on("click", function () {
  $("#navbar-content").toggleClass('open-menu');
  $("#menu").toggleClass('hidden');
  $('#logo').toggleClass('hidden');
  $("#footer-menu").toggleClass('hidden');
  $('#logo-orange').toggleClass('hidden');
});

$("a").on("click", function () {
  $("#navbarMobile").css("display", "none");
});


// navbar - scroll
const heigthNav = document.getElementById("navbar").clientHeight;
let lastScrollTop = 0;
let isNavigate = false;  

// window.addEventListener('scroll', (e) => {
//   if(screen.width > 768){
//     const currentPositionScroll = window.scrollY;
//     if(currentPositionScroll > 600){
//       $('#logo').addClass('navigate-home');
//       $('#backToTop').addClass('show-nav');
//     }
//     else{
//       $('#logo').removeClass('navigate-home');
//     //   // $('#backToTop').removeClass('show-nav');
//     // }
//     // // if (currentPositionScroll > lastScrollTop && currentPositionScroll > 600 && !isNavigate){
//     // //   $('nav').addClass('hidden-nav');
//     // //   $('nav').removeClass('show-nav');
//     // // } 
//     // // else {
//     // //   $('nav').removeClass('hidden-nav');
//     // //   $('nav').addClass('show-nav');
//     // // }
//     if(currentPositionScroll === 0){
//       $('nav').removeClass('hidden-nav');
//       $('nav').removeClass('show-nav');
//     }
//     lastScrollTop = currentPositionScroll <= 0 ? 0 : currentPositionScroll;
//   }
// });

// effects - mouseevent
// window.addEventListener('mousemove', (e) => {
//   if(screen.width > 768){
//     const currentPositionScroll = window.scrollY;
//     if(currentPositionScroll > 500){
//       heigthNav + 80 > e.clientY && $('nav').removeClass('hidden-nav') && $('nav').addClass('show-nav');;
//     };
//   }
// });

// navigation - scroll
// $(".scrollToTop").on("click", function (e) {
//   e.preventDefault();
//   location.href = initialLocation;
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });

// const perfectScroll = (section, marginToAdd) => { 
//   const distanceCalculated = heigthNav + 30 + marginToAdd;
//   const scrollToSection = document.getElementById(section).offsetTop;
//   const scrollTo = scrollToSection - distanceCalculated;
//   isNavigate = true;
//   window.scrollTo({ top: scrollTo, behavior: "smooth" });
// };

// is scrolling ?
const  noScroll = (callback, refresh = 100) => {
  if (!callback || typeof callback !== 'function') return;
  let isScrolling;
  window.addEventListener('scroll', function (event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(callback, refresh);
  }, false);
}

noScroll(function () {
  isNavigate = false;
});

$(function(){
  if (localStorage.getItem('lang_redirect') === null && location.href.indexOf('/en/') === -1) {
    localStorage.setItem('lang_redirect', '1');
    location.href = 'en/';
  }
});

// partners slide
document.addEventListener("DOMContentLoaded", function() {
  const logosSlide = document.querySelector(".logos div");
  logosSlide.classList.add("logos-slide");
  const logosSlideCopy = logosSlide.cloneNode(true);
  logosSlideCopy.classList.add("logos-slide");
  document.querySelector(".logos").appendChild(logosSlideCopy);
});


// opportunities  cards 
const leftCard = document.getElementById('opportunities-left-card').offsetHeight;
const rightCard = document.getElementById('opportunities-right-card').offsetHeight;
const maxHeight = Math.max(leftCard, rightCard);
let maxOpenHeight;
document.getElementById('opportunities-left-card').style.height = `${maxHeight}px`;
document.getElementById('opportunities-right-card').style.height = `${maxHeight}px`;
document.getElementById('largeArrow').style.height = `${maxHeight}px`;

$("#opportunities-left-card").on("click", function (e) {
  if ($("#opportunities-left-card-collapsed-content").is(":visible")){
    $("#opportunities-left-card-collapsed-content").slideUp();
    $("#opportunities-left-card").css('min-height', maxHeight)
   
  }
  else{
    $("#opportunities-left-card").css('height', 'fit-content');    
    $("#opportunities-left-card-collapsed-content").slideDown();
  }
})

$("#opportunities-right-card").on("click", function (e) {
  if ($("#opportunities-right-card-collapsed-content").is(":visible")){
    $("#opportunities-right-card-collapsed-content").slideUp();
  }
  else{
    $("#opportunities-right-card-collapsed-content").slideDown();
    $("#opportunities-right-card").css('height', 'fit-content');
    maxOpenHeight = document.getElementById('opportunities-right-card').offsetHeight;    
  }
})

var openCardLeft = false;
var openCardRight = false;

// arrow effect - open-close card
document.getElementById('opportunities-right-card').addEventListener('click', function(){
  var icon = document.getElementById('opportunities-right-card-btn');
    if(openCardRight){
    icon.className = 'fa fa-arrow-down';  
  } else{
    icon.className = 'fa fa-arrow-down open';
  }
  openCardRight = !openCardRight;
});

document.getElementById('opportunities-left-card').addEventListener('click', function(){
  var icon = document.getElementById('opportunities-left-card-btn');
    if(openCardLeft){
    icon.className = 'fa fa-arrow-down';  
  } else{
    icon.className = 'fa fa-arrow-down open';
  }
  openCardLeft = !openCardLeft;
});


// carousel animation
const bannerNav = document.getElementById("banner-layout");
const bannerContent = document.getElementById("banner-content");
const partners = document.getElementById("partners");
const opportunities = document.getElementById("opportunities");

// no-more-devs
const noMoreDevs = document.getElementById('no-more-devs');
const noMoreDevsPositionHeight = noMoreDevs.offsetTop;
const carouselNoMoreDevs = document.getElementById("no-more-devs-carousel");
const noMoreDevsCarouselItemWidth = document.querySelector(".no-more-devs-item-scroll").scrollWidth;

// how-do
const howDo = document.getElementById('how-do');
const howDoCarousel = document.getElementById("how-do-carousel");
const howDoCarouselItemWidth = document.querySelector(".how-do-item-scroll").scrollWidth;

// the-whell

const theWheel = document.getElementById('the-wheel');

const scrollDirection = (prevPosition, currentPosition) => {
  return currentPosition > prevPosition ? 'down' : 'up';
}

const noMoreDevsAnimation = new CarouselAnimator(carouselNoMoreDevs, noMoreDevsCarouselItemWidth);
const howDoAnimation = new CarouselAnimator(howDoCarousel, howDoCarouselItemWidth);

window.addEventListener('scroll', (e) => {
  // if(screen.width > 768){
    if(window.scrollY < 500){
      noMoreDevsAnimation.animate('reverse');
      howDoAnimation.animate('reverse');
    }
    
    const currentPositionScroll = window.scrollY;
    const opportunitiesToTop = opportunities.getBoundingClientRect();
    const noMoreDevsToTop = noMoreDevs.getBoundingClientRect();
    const howDoToTop = howDo.getBoundingClientRect();
    const direction = scrollDirection(lastScrollTop, currentPositionScroll)

    if(opportunitiesToTop.top >= 100){
      bannerNav.classList.add('fixed-scroll-position');
      opportunities.classList.add('sticky-scroll-position');
      bannerContent.classList.add('display-none');
      partners.classList.add('display-none');
      theWheel.style.marginTop= '2000px';
    }

    if(noMoreDevsToTop.top >= 100){
      noMoreDevs.classList.add('sticky-scroll-position');
    }
   
    if(currentPositionScroll >= noMoreDevsPositionHeight){
      
      if(noMoreDevsAnimation.loopCarousel < 2){
        noMoreDevsAnimation.animate('play');
      }
    }

    if(howDoToTop.top <= 0 && !howDoAnimation.finished){
      howDo.classList.add('sticky-scroll-position-top');
      if(howDoAnimation.loopCarousel < 2){
        howDoAnimation.animate('play');
      }
    }

  // }
  if(noMoreDevsAnimation.finished && currentPositionScroll >= noMoreDevsPositionHeight  && direction === 'down'){
    opportunities.classList.remove('sticky-scroll-position');
    noMoreDevs.classList.remove('sticky-scroll-position');
    bannerNav.classList.remove('fixed-scroll-position');
    theWheel.style.marginTop= '200px';
  }
  if(howDoAnimation.finished  && direction === 'down'){
    howDo.classList.remove('sticky-scroll-position-top')
  }
  lastScrollTop = currentPositionScroll;
});

// diagram venn switch control

const isTqState = () => {
  const seniors = $("#seniors-venn-diagram-item").is(":visible");

  if($("#seniors-venn-diagram-item").is(":visible") 
    && $("#junior-venn-diagram-item").is(":visible") 
    && $("#software-venn-diagram-item").is(":visible")) {
      $("#diagram-logo").removeClass('hidden');
  }else{
    $("#diagram-logo").addClass('hidden');
  };

} 
$("#seniors-switch").on("click", function(){
  $("#seniors-venn-diagram-item").toggleClass('hidden');
  isTqState();
});

$("#junior-switch").on("click", function(){
  $("#junior-venn-diagram-item").toggleClass('hidden');
  isTqState();
});

$("#software-switch").on("click", function(){
  $("#software-venn-diagram-item").toggleClass('hidden');
  isTqState();
})


// styles for how-do carousel
const getCSSVariableValue = (name) => {
  return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
}
var padding = getCSSVariableValue('padding');
console.log(padding)
const itemOne = document.getElementById("step-leyend-container-01").offsetLeft;
const itemTwo = document.getElementById("step-leyend-container-02").offsetLeft;
const itemThree = document.getElementById("step-leyend-container-03").offsetLeft;
const divider = document.getElementById("divider-how-do");
const dividerCenter = document.getElementById("divider-center-how-do");

divider.style.width = `calc(${itemThree - itemOne}px - 3em)`;
divider.style.left = `calc(${itemOne}px + 3em)`;
dividerCenter.style.left = `calc(${itemTwo - itemOne}px)`;

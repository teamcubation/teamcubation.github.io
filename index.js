import {CarouselAnimator, incrementCounter} from './animations.js';

const url = "https://teamcubation.com/";
const initialLocation = document.location.href;
const lang = document.documentElement.lang;
let json_path;

$(document).ready(
  document.documentElement.lang === "es"
    ? (json_path = "./src/locales/es.json")
    : (json_path = "./src/locales/en.json"),
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


$(".contact-button").on("click", () => {
  $("#form-modal").toggleClass('hidden');
});

$("#close-modal").on("click", (e) => {
  e.preventDefault();
  $("#form-modal").toggleClass('hidden');
});

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
      // url: "https://api.prod.tq.teamcubation.com/contact",
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
          '<div class="alert alert-success" role="alert" style="position: absolute; z-index: 101"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.success);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
          btn.text(dataByLang.formContact.btnSend);
        clearForm();
      },
      error: (r) => {
        $(".alert").remove();
        $(".form-contact").prepend(
          '<div class="alert alert-danger" role="alert" style="position: absolute; z-index: 101"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.error);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
          btn.text(dataByLang.formContact.btnSend);
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
    .style("disabled", true)
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

$(".open-dropdown-select").on("click", function () {
  if ($(".option-tc").is(":visible")) {
    $(".list-options-tc").slideUp();
    $(this).find(".chevron-select").removeClass("chevron-effect");
  } else {
    $(".list-options-tc").slideDown();
    $(this).find(".chevron-select").addClass("chevron-effect");
    $(".select-tc").css("border-bottom", " 2px solid #551872");
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

function adjustContactTextareaHeight() {
  const selectHeight = $('.input-select')[0].scrollHeight;
  const height = !selectHeight || selectHeight == 0 ? 50 : selectHeight;   
  $('.input-select').height(height - 4);
}

$(adjustContactTextareaHeight);

// navbar - scroll
const heigthNav = document.getElementById("navbar").clientHeight;
let isNavigate = false;  

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

// $(function(){
//   if (localStorage.getItem('lang_redirect') === null && location.href.indexOf('/en/') === -1) {
//     localStorage.setItem('lang_redirect', '1');
//     location.href = 'en/';
//   }
// });

// partners slide
document.addEventListener("DOMContentLoaded", function() {
  const logosSlide = document.querySelector(".logos div");
  logosSlide.classList.add("logos-slide");
  const logosSlideCopy = logosSlide.cloneNode(true);
  logosSlideCopy.classList.add("logos-slide");
  document.querySelector(".logos").appendChild(logosSlideCopy);
});

// incrementCounter
const peopleNumber = document.getElementById("people-number");
let incrementAmountPeopleNumber = false;
const costFromNumber = document.getElementById("cost-from-number");
let incrementAmountCostFromNumber = false;
const costTopNumber = document.getElementById("cost-to-number");
const turnoverNumber = document.getElementById("turnover-number");
let incrementAmountTurnoverNumber = false;

// carousel animation
const bannerNav = document.getElementById("banner-layout");
const bannerContent = document.getElementById("banner-content");
const partners = document.getElementById("partners");
const proposal = document.getElementById("proposal");

// problem
const noMoreDevs = document.getElementById('problem');
const noMoreDevsPositionHeight = noMoreDevs.offsetTop;
const carouselNoMoreDevs = document.getElementById("problem-carousel");
// const noMoreDevsCarouselItemWidth = document.querySelector(".problem-item-scroll").scrollWidth;

// process
const howDo = document.getElementById('process');
const howDoCarousel = document.getElementById("process-carousel");
const howDoCarouselItemWidth = document.querySelector(".process-item-scroll").scrollWidth;

// results
const results = document.getElementById('results');
// const resultsCarousel = document.getElementById("results-carousel");
// let resultsCarouselItemWidth = document.querySelector(".results-item-scroll").scrollWidth;
// const margin= parseFloat(getComputedStyle(document.querySelector(".results-item-scroll")).marginRight);
// resultsCarouselItemWidth= margin * 2 + resultsCarouselItemWidth;
// const cardsToMove = window.innerWidth > 600 ? 3 : 1;
// const noMoreDevsAnimation = new CarouselAnimator(carouselNoMoreDevs, noMoreDevsCarouselItemWidth, 4);
const howDoAnimation = new CarouselAnimator(howDoCarousel, howDoCarouselItemWidth, 2);
// const resultsAnimation = new CarouselAnimator(resultsCarousel, (resultsCarouselItemWidth) * cardsToMove , 6 / cardsToMove - 1);

let lastScrollTop = 0;

const scrollDirection = (prevPosition, currentPosition) => {
  return currentPosition > prevPosition ? 'down' : 'up';
}

$(".process-prev").on("click", function(){
  howDoAnimation.animate('play');
  console.log('process prev')
  if(howDoAnimation.loopCarousel >= 0){
    $(".process-next").removeClass('hidden')
  }else{
    $(".process-next").addClass('hidden')
  }
  if(howDoAnimation.loopCarousel >= howDoAnimation.stop){
    $(".process-prev").addClass('hidden')
  }else{
    $(".process-prev").removeClass('hidden')
  }
});

$(".process-next").on("click", function(){
  howDoAnimation.animate('play-reverse');
  if(howDoAnimation.loopCarousel == 0){
    $(".process-next").addClass('hidden')
  }
  if(howDoAnimation.loopCarousel >= howDoAnimation.stop){
    $(".process-prev").addClass('hidden')
  }else{
    $(".process-prev").removeClass('hidden')
  }
});

window.addEventListener("click", function (e) {
  if (!document.getElementById("dropdown-select").contains(e.target)) {
    $(".list-options-tc").slideUp();
    $(".chevron-select").removeClass("chevron-effect");
    $(".select-tc").css(
      "border-bottom",
      "2px solid rgba(128, 128, 128, 0.507)"
    );
    if ($(".input-select").val() !== "") $(".text-error").remove();
  }
  if (!document.getElementById("form-container").contains(e.target)) {
    if(!$('.contact-button').is(event.target)) {
      $("#form-modal").addClass('hidden'); 
    }
  }
});

window.addEventListener('scroll', (e) => {
  // if(screen.width > 768){
      if(peopleNumber.getBoundingClientRect().top <= 500 && !incrementAmountPeopleNumber){
        incrementCounter(peopleNumber, 0, 20000, 250);
        incrementAmountPeopleNumber = true;
      }
      if(turnoverNumber.getBoundingClientRect().top <= 500 && !incrementAmountTurnoverNumber){
        const text={prev: '', next: '%'}
        incrementCounter(turnoverNumber, 0, 78, 1, text);
        incrementAmountTurnoverNumber = true;
      }
      if(costFromNumber.getBoundingClientRect().top <= 500 && !incrementAmountCostFromNumber){
        incrementCounter(costFromNumber, 0, 10000, 125);
        incrementCounter(costTopNumber, 0, 14000, 125);
        incrementAmountCostFromNumber = true;
      }
      // if(window.scrollY < 500){
      //   // noMoreDevsAnimation.animate('reverse');
      //   // howDoAnimation.animate('reverse');
      //   resultsAnimation.animate('reverse');
      // }
      
      const currentPositionScroll = window.scrollY;
      // const proposalToTop = proposal.getBoundingClientRect();
      // const noMoreDevsToTop = noMoreDevs.getBoundingClientRect();
      // const howDoToTop = howDo.getBoundingClientRect();
      const resultsToTop = results.getBoundingClientRect();
      const direction = scrollDirection(lastScrollTop, currentPositionScroll);
      
      // effect fix cards at top
      // if(proposalToTop.top <= 100 && direction == 'down'){
      //   bannerNav.classList.add('fixed-scroll-position');
      //   proposal.classList.add('sticky-scroll-position');
      //   bannerContent.classList.add('display-none');
      //   partners.classList.add('display-none');
      // }

    if(resultsToTop.top <= 100  && direction === 'down'){
      // results.classList.add('sticky-scroll-position');
      // if(resultsAnimation.loopCarousel < 2){
      //   resultsAnimation.animate('play');
      // };
    };

    // if(howDoToTop.top <= 0 && !howDoAnimation.finished){
    //   howDo.classList.add('sticky-scroll-position');
    //   if(howDoAnimation.loopCarousel < 2){
    //     howDoAnimation.animate('play');
    //   }
    // }

    // no more devs
      // if(direction === 'down' && noMoreDevsToTop.top <= 0 && !noMoreDevsAnimation.finished){
      //   noMoreDevs.classList.add('sticky-scroll-position');
      //   if(noMoreDevsAnimation.loopCarousel < 4){
      //     noMoreDevsAnimation.animate('play');
      //   }
      // }


    // }
    // if(noMoreDevsAnimation.finished && currentPositionScroll >= noMoreDevsPositionHeight  && direction === 'down'){
    //   // proposal.classList.remove('sticky-scroll-position');
    //   noMoreDevs.classList.remove('sticky-scroll-position');
    //   bannerNav.classList.remove('fixed-scroll-position');
    // }
    // if(howDoAnimation.finished  && direction === 'down'){
    //   howDo.classList.remove('sticky-scroll-position')
    // }
    // if(resultsAnimation.finished && direction === 'down'){
    //   results.classList.remove('sticky-scroll-position')
    // }
  // lastScrollTop = currentPositionScroll;
});

// navbar and menu
const proposalToTop = proposal.getBoundingClientRect().top;

$(".navigate-home").on("click", function(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

$(".link-button").on("click", function(){
  closeMenu();
  // $('#navbar').addClass('hidden-nav');
});

const openMenu = () => {
  $("#menu").removeClass('hidden');
  $("#navbar-content").addClass('open-menu');
  $("#footer-menu").removeClass('hidden');
  $('#logo').addClass('hidden');
  $('#logo-orange').removeClass('hidden');
  if(screen.width < 574){
    $("#navbar-content").addClass('open-menu-mobile');
  }
};

const closeMenu = () => {
  $("#menu").addClass('hidden');
  $("#navbar-content").removeClass('open-menu');
  $("#navbar-content").removeClass('open-mobile-menu');
  $("#footer-menu").addClass('hidden');
  $("#form-modal").addClass('hidden');
  if( $(".display-nav").is(":visible")){
    return
  }
  $('#logo').removeClass('hidden');
  $('#logo-orange').addClass('hidden');
};

const handleControlMenu = (action) => {
  $('#navbar').removeClass('background-nav');
  if(action == 'open'){
    openMenu();
  } 
  else{
    closeMenu();
  }
}

$(".menu-button").on("click", function () {
  const isOpen = $(".open-menu").is(":visible") ? 'close' : 'open';
  handleControlMenu(isOpen);
});

window.addEventListener('scroll', (e) => {
  const currentPositionScroll = window.scrollY;
  const direction = scrollDirection(lastScrollTop, currentPositionScroll);
  const isOpen = $(".open-menu").is(":visible");

  if(currentPositionScroll > 600){
    $('#logo').addClass('navigate-home');
  }
  else{
    $('#logo').removeClass('navigate-home');
  }
  if(currentPositionScroll < proposalToTop){
    $('#navbar-content').removeClass('display-nav');
    if(!isOpen){
      $('#logo').removeClass('hidden');
      $('#logo-orange').addClass('hidden');
    }
  }
  if(currentPositionScroll > proposalToTop && direction == "down"){
    $('#navbar').addClass('hidden-nav');
    handleControlMenu('close');
  }
  if(currentPositionScroll > proposalToTop && direction == "up"){
    $('#navbar').removeClass('hidden-nav');
    $('#navbar-content').addClass('display-nav');
    $('#logo').addClass('hidden');
    $('#logo-orange').removeClass('hidden');
  }
  lastScrollTop = currentPositionScroll <= 0 ? 0 : currentPositionScroll;
});

// diagram venn switch control

const isTqState = () => {
  if($("#seniors-venn-diagram-item").hasClass('venn-diagram-item-disabled') 
    || $("#junior-venn-diagram-item").hasClass('venn-diagram-item-disabled') 
    || $("#software-venn-diagram-item").hasClass('venn-diagram-item-disabled')) {
      $("#diagram-logo").addClass('hidden');
  } else {
    $("#diagram-logo").removeClass('hidden');
  };
};

const isCodeSchoolState = () => {
  if($("#junior-venn-diagram-item").hasClass('venn-diagram-item-disabled')
    || $("#seniors-venn-diagram-item").hasClass('venn-diagram-item-disabled')) {
      $("#intersection-seniors-junior").addClass('hidden');
  } else {
    $("#intersection-seniors-junior").removeClass('hidden');
  };
} 

const isSoftWareFactoryState = () => {
  if($("#software-venn-diagram-item").hasClass('venn-diagram-item-disabled')
    || $("#seniors-venn-diagram-item").hasClass('venn-diagram-item-disabled')) {
      $("#intersection-seniors-software").addClass('hidden');
  } else {
    $("#intersection-seniors-software").removeClass('hidden');
  };
};

const isNotExistState = () => {
  if($("#software-venn-diagram-item").hasClass('venn-diagram-item-disabled')
    || $("#junior-venn-diagram-item").hasClass('venn-diagram-item-disabled')) {
      $("#intersection-software-junior").addClass('hidden');
  } else {
    $("#intersection-software-junior").removeClass('hidden');
  };
} 

$("#seniors-switch").on("click", function(){
  $("#seniors-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isTqState();
  isSoftWareFactoryState();
  isCodeSchoolState();
});

$("#junior-switch").on("click", function(){
  $("#junior-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isTqState();
  isCodeSchoolState();
  isNotExistState();
});

$("#software-switch").on("click", function(){
  $("#software-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isTqState();
  isSoftWareFactoryState();
  isNotExistState();
})


// styles for process carousel
const itemOne = document.getElementById("step-leyend-container-01").offsetLeft;
const itemTwo = document.getElementById("step-leyend-container-02").offsetLeft;
const itemThree = document.getElementById("step-leyend-container-03").offsetLeft;
const divider = document.getElementById("divider-process");
const dividerCenter = document.getElementById("divider-center-process");

divider.style.width = `calc(${itemThree - itemOne}px - 3em)`;
divider.style.left = `calc(${itemOne}px + 3em)`;
dividerCenter.style.left = `calc(${itemTwo - itemOne}px)`;


// pep
const dropdowns = document.querySelectorAll('.dropdown-standard-item');

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.card-standard-header .dropdown-item-button');
  const title = dropdown.querySelector('.card-standard-header .sm-text-card');
  const content = dropdown.querySelector('.collapsed-content');
  const image = dropdown.querySelector('.hidden');
  const iconbutton = button.querySelector('img');

  dropdown.addEventListener('click', () => {
    dropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.querySelector('.collapsed-content').classList.remove('d-flex');
        otherDropdown.querySelector('.card-standard-header .dropdown-item-button img').src = 'media/arrow-dropdowns-down.svg';
        otherDropdown.querySelector('.card-standard-header .sm-text-card').style.color = '#484848';
      }
    });
  
  iconbutton.src = 'media/arrow-dropdowns.svg';  
  content.classList.add('d-flex');
  title.style.color = '#F34E1E';
   
  const imageContainer = document.getElementById('pep-img-container');
  imageContainer.innerHTML = '';
  const newImage = document.createElement('img');
  newImage.style.maxWidth = '100%';
  newImage.src = image.src;
  imageContainer.appendChild(newImage);
  });
}); 

// restore in top sin scrollTop
history.scrollRestoration = "manual";
$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

const video = document.getElementById("video-cases")
video.addEventListener('ended', function() {
  $(".video-overlay").css("display", "block");
  $("#link-button-video-container").css("display", "block");
});

video.addEventListener('play', function() {
  $(".video-overlay").css("display", "none");
  $("#link-button-video-container").css("display", "none");
});

document.getElementById('button-redirect-youtube').addEventListener('click', function() {
  window.open('https://www.youtube.com/@teamcubation/playlists', '_blank');
});
import {CarouselAnimator, CounterAnimator} from './animations.js';

const url = "https://teamcubation.com/";
const initialLocation = document.location.href;
const lang = document.documentElement.lang;
const shortenedURL = initialLocation.match(/^(https?:\/\/[^\/]+)/)[1];

$(function(){
  if (window.location.hash === '#contact') {
    $('#form-modal').removeClass('hidden');
  }
});

$(function(){
  if (localStorage.getItem('lang_redirect') === null) {
    const browser_lang = navigator.language.split('-')[0];

    if (browser_lang !== lang && (['en', 'es', 'pt'].includes(browser_lang))) {
      localStorage.setItem('lang_redirect', '1');
      if (browser_lang === 'es') {
        location.href = '/';
      } else {
        location.href = `/${browser_lang}/`;
      }
    }
  }
});

const currentYear = document.getElementById("currentYear");
const year = new Date().getFullYear();
currentYear.textContent = year;

const dataByLang = {
  formContact: {
    btnSend: {"es": "Enviar", "en": "Submit", "pt": "Enviar"},
    btnSending: {"es": "Enviando...", "en": "Enviando...", "pt": "Enviando..."},
    originExtraPlaceholder: {
      "es": "¿Cómo te identificás?",
      "en": "How do you identify yourself?",
      "pt": "Como você se identifica?"
    },
    validation: {
      noOptionSelected: {
        "es": "Por favor elegí una opción",
        "en": "Please select an option",
        "pt": "Por favor escolha uma opção"
      },
      noTextOtherOption: {
        "es": "Por favor ingresá un texto",
        "en": "Please enter a text",
        "pt": "Por favor insira um texto"
      }
    },
    submitResponse: {
      success: {
        "es": "Su mensaje se ha enviado correctamente, gracias!",
        "en": "Your message has been sent, thank you!",
        "pt": "Sua mensagem foi enviada com sucesso, obrigado!"
      },
      error: {
        "es": "Ocurrió un error durante el envío del formulario, por favor vuelva a intentarlo",
        "en": "An error occurred while sending the form, please try again.",
        "pt": "Ocorreu um erro durante o envio do formulário, tente novamente"
      }
    },
  },
};


///////////////////////////////// navbar functions 

$(".language-title").on("click", function (e) {
  // e.preventDefault();
  $(`.language-options li`).each(function () {
    if ($(this).data("lang") === lang) {
      $(this).find("a").addClass("hidden");
    }
  });
  $('.language-select .collapsed-content').slideToggle('slow');
});

let selectedService = '';
const modal = $("#form-modal");

const openFormModal = () => {
  closeMenu();
  $('#navbar').addClass("hidden");
  modal.removeClass("hidden");
  window.location.hash = "#contact";
}

const closeFormModal = () => {
  modal.addClass("hidden");
  $('#navbar').removeClass("hidden");
  history.replaceState(null, null, " ");
};

const handleControlFormModal = () => {
  if (modal.hasClass("hidden")) {
    openFormModal();
  } else {
    closeFormModal();
  }
}

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function() {
    const serviceName = this.getAttribute('data-service');
    selectedService = serviceName;
    handleControlFormModal();
  });
});

$(".contact-button").on("click", () => {
  handleControlFormModal()
});


$("#close-modal").on("click", (e) => {
  e.preventDefault();
  handleControlFormModal();
});

$('#open_team_boarding').click(function(e) {
  e.preventDefault();
  window.open('https://teamboarding.com/', '_blank');
});

const openMenu = () => {
  $("#menu").removeClass('hidden');
  $("#navbar-content").addClass('open-menu');
  // $("#footer-menu").removeClass('hidden');
  $('#logo').addClass('hidden');
  $('#logo-orange').removeClass('hidden');
  $('#language-select').addClass('language-menu-open');
  $('.language-title').addClass('language-menu-open');
  $('#language-options').addClass('language-menu-open');
  $('#language-options-mobile').addClass('language-menu-open');  
  
  if(screen.width < 574){
    $("#navbar-content").addClass('open-menu-mobile');
    $('#language-select-mobile').addClass('language-menu-open');
  }
};

const closeMenu = () => {
  $("#menu").addClass('hidden');
  $("#navbar-content").removeClass('open-menu');
  $("#navbar-content").removeClass('open-mobile-menu');
  // $("#footer-menu").addClass('hidden');
  $("#form-modal").addClass('hidden');
  if( $(".display-nav").is(":visible")){
    return
  }
  $('#logo').removeClass('hidden');
  $('#logo-orange').addClass('hidden');
  $('#language-select').removeClass('language-menu-open');
  $('.language-title').removeClass('language-menu-open');
  $('#language-options').removeClass('language-menu-open');
  $('#language-options-mobile').removeClass('language-menu-open');  
  
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

$("#services_button").on("click", function() {
  let section = "proposal"
  const offset = 100;
  const targetPosition = $(`#${section}`).offset().top - offset;
  $("html, body").animate({ scrollTop: targetPosition }, 100, function () {
    history.pushState(null, null, `#${section}`);
  });
  closeMenu();
});

$("#success_stories_button").on("click", function() {
  let section = "cases"
  const offset = 120;
  const targetPosition = $(`#${section}`).offset().top - offset;
  $("html, body").animate({ scrollTop: targetPosition }, 100, function () {
    history.pushState(null, null, `#${section}`);
  });
  closeMenu();
});

$(".link-button").on("click", function (e) {
  
  const section = $(this).data('navigate');
  if(section === "external"){
    return;
  }
  e.preventDefault();
  let offset = 120;
  if(section === "process"){
    offset = 20
  }
  
  const targetPosition = $(`#${section}`).offset().top - offset;
  $("html, body").animate({ scrollTop: targetPosition }, 100, function () {
    history.pushState(null, null, `#${section}`);
  });
  closeMenu();
});

$(".menu-button").on("click", function () {
  const isOpen = $(".open-menu").is(":visible") ? 'close' : 'open';
  handleControlMenu(isOpen);
});

window.addEventListener("click", function (e) {
  if (!document.getElementById("dropdown-select").contains(e.target)) {
    $(".list-options-tc").slideUp();
    $(".chevron-select").removeClass("chevron-effect");
    if ($(".input-select").val() !== "") $(".text-error").remove();
  }
  if (
    !document.getElementById("form-container").contains(e.target) &&
    !e.target.closest(".service-card") &&
    !$(".contact-button").is(e.target)
  ) {
    closeFormModal();
  }
});

//  submit form contact
$(".form-contact").on("submit", function (ev) {
  ev.preventDefault();
  let data_origin_extra_error_message = dataByLang.formContact.validation.noOptionSelected[lang];
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
      dataByLang.formContact.validation.noTextOtherOption[lang];
    const inputSelectText = $(`#${currentForm} .input-select`).val();
    inputSelectText === ""
      ? (data_origin_extra = null)
      : (data_origin_extra = `${data_origin_extra}: ${inputSelectText}`);
  }
  if (data_origin_extra) {
    // $(".select-tc").css("border-bottom", "2px solid rgba(128, 128, 128, 0.507)");
    btn.text(dataByLang.formContact.btnSending[lang]);
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
           selectedService
      }),
      dataType: "json",
      success: (r) => {
        $(".alert").remove();
        $("#form-container").prepend(
          '<div class="alert alert-success" role="alert" style="position: absolute; top: 25px; width: 90%, margin: 0 auto; z-index: 101"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.success[lang]);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
          btn.text(dataByLang.formContact.btnSend[lang]);
        clearForm();
      },
      error: (r) => {
        $(".alert").remove();
        $("#form-container").prepend(
          '<div class="alert alert-danger" role="alert" style="position: absolute; top: 25px; width: 90%, margin: 0 auto; z-index: 101"></div>'
        );
        $(".alert").text(dataByLang.formContact.submitResponse.error[lang]);
        $(".alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $(".alert").slideUp(500);
          });
          btn.text(dataByLang.formContact.btnSend[lang]);
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
  $(".input-select")
    .prop("disabled", true)
    .val("")
    .attr("placeholder", dataByLang.formContact.originExtraPlaceholder[lang])
    .removeData("value-selected")
    .height('40px');
};

// input select //
$(".open-dropdown-select").on("click", function () {
  let dropdown = $(this).closest(".dropdown-select").find(".list-options-tc");
  if (dropdown.is(":visible")) {
    dropdown.slideUp();
    $(this).find(".chevron-select").removeClass("chevron-effect");
  } else {
    dropdown.css("top", 73 + "px"); 
    dropdown.slideDown();
    $(this).find(".chevron-select").addClass("chevron-effect");
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
    $(".name-form-container").css('visibility', 'visible');
    $(".submit-contact").css('visibility', 'visible');
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $(".input-select").prop("disabled", false).focus().val("")
      .attr("placeholder", dataByLang.formContact.originExtraPlaceholder[lang]);
  } 
  else if (valueOption === "organization") {
    $('.form-message').css('display', 'none');
    $("#formInformation").css('visibility', 'visible');
    $(".name-form-container").css('visibility', 'visible');
    $(".submit-contact").css('visibility', 'visible');
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $(".input-select").prop("disabled", true);
  } 
  else {
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $("#formInformation").css('visibility', 'hidden');
    $(".name-form-container").css('visibility', 'hidden');
    $(".submit-contact").css('visibility', 'hidden');
    $('.form-message').css('display', 'none');
    valueOption === "senior" && $("#seniorsMessage").css('display', 'block');
    valueOption === "junior" && $("#juniorsMessage").css('display', 'block');
    valueOption === "no-exp" && $('#noCodersMessage').css('display', 'block');
  }
  $(".list-options-tc").slideUp();
  $(".chevron-select").removeClass("chevron-effect");
});

// function adjustContactTextareaHeight() {
//   const selectHeight = $('.input-select')[0].scrollHeight;
//   const height = !selectHeight || selectHeight == 0 ? 50 : selectHeight;   
//   $('.input-select').height(height - 4);
// }

// $(adjustContactTextareaHeight);



// navbar - scroll
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


// navBar effect to - top
// const navBar = document.getElementsByTagName('nav'); 

const proposal = document.getElementById("proposal");
const howDoCarousel = document.getElementById("process-carousel");
const howDoCarouselItemWidth = document.querySelector(".process-item-scroll").scrollWidth;
// const results = document.getElementById('results');
const howDoAnimation = new CarouselAnimator(howDoCarousel, howDoCarouselItemWidth, 2);

let lastScrollTop = 0;

const scrollDirection = (prevPosition, currentPosition) => {
  return currentPosition > prevPosition ? 'down' : 'up';
}

$(".process-prev").on("click", function(){
  if(!$(this).hasClass('disabled')){
    howDoAnimation.animate('play');
    if(howDoAnimation.loopCarousel >= 0){
      $(".process-next").removeClass('disabled');
    }else{
      $(".process-next").addClass('disabled')
    }
    if(howDoAnimation.loopCarousel >= howDoAnimation.stop){
      $(".process-prev").addClass('disabled')
    }else{
      $(".process-prev").removeClass('disabled')
    }
  }
});

$(".process-next").on("click", function(){
  if(!$(this).hasClass('disabled')){
    howDoAnimation.animate('play-reverse');
    if(howDoAnimation.loopCarousel == 0){
      $(".process-next").addClass('disabled')
    }
    if(howDoAnimation.loopCarousel >= howDoAnimation.stop){
      $(".process-prev").addClass('disabled')
    }else{
      $(".process-prev").removeClass('disabled')
    }
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

// window.addEventListener('scroll', (e) => {
//   const currentPositionScroll = window.scrollY;
//   const direction = scrollDirection(lastScrollTop, currentPositionScroll);

// });

// navbar and menu
const proposalToTop = proposal.getBoundingClientRect().top;

$(".navigate-home").on("click", function(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

window.addEventListener('scroll', (e) => {
  const currentPositionScroll = window.scrollY;
  const direction = scrollDirection(lastScrollTop, currentPositionScroll);
  const isOpen = $(".open-menu").is(":visible");
  $('#language-select .collapsed-content').slideUp('slow');
  
  if(currentPositionScroll > 600){
    $('#logo').addClass('navigate-home');
  }

  if(currentPositionScroll < proposalToTop){
    $('#navbar-content').removeClass('display-nav');
    if(!isOpen){
      $('#logo').removeClass('hidden');
      $('#logo-orange').addClass('hidden');
      $('#language-select').removeClass('language-menu-open');
      $('.language-title').removeClass('language-menu-open');
      $('#language-options').removeClass('language-menu-open');
      $('#language-options-mobile').removeClass('language-menu-open');  
  
    }
  }
  // if(currentPositionScroll > proposalToTop && direction == "down"){
  //   $('#navbar').addClass('hidden-nav');
  //   handleControlMenu('close');
  // }
  if(currentPositionScroll > 0){
    $('#navbar').removeClass('hidden-nav');
    $('#navbar-content').addClass('display-nav');
    $('#logo').addClass('hidden');
    $('#logo-orange').removeClass('hidden');
    $('#language-select').addClass('language-menu-open');
    $('.language-title').addClass('language-menu-open');
    $('#language-options').addClass('language-menu-open');
    $('#language-options-mobile').addClass('language-menu-open');  
  }
  lastScrollTop = currentPositionScroll <= 0 ? 0 : currentPositionScroll;
});

// diagram venn switch control

const isTqState = () => {
  if($("#seniors-venn-diagram-item").hasClass('venn-diagram-item-disabled') 
  || $("#junior-venn-diagram-item").hasClass('venn-diagram-item-disabled') 
  || $("#software-venn-diagram-item").hasClass('venn-diagram-item-disabled')) {
    $("#diagram-logo").addClass('hidden');
    isCodeSchoolState();
    isSoftWareFactoryState();
    isNotExistState();
  } else {
    $("#diagram-logo").removeClass('hidden');
    $("#intersection-seniors-junior").addClass('hidden');
    $("#intersection-seniors-software").addClass('hidden');
    $("#intersection-software-junior").addClass('hidden');
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
  } else{
    $("#intersection-software-junior").removeClass('hidden');
  };
} 

$("#seniors-switch").on("click", function(){
  $("#seniors-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isSoftWareFactoryState();
  isCodeSchoolState();
  isTqState();
});

$("#junior-switch").on("click", function(){
  $("#junior-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isCodeSchoolState();
  isNotExistState();
  isTqState();
});

$("#software-switch").on("click", function(){
  $("#software-venn-diagram-item").toggleClass('venn-diagram-item-disabled');
  isSoftWareFactoryState();
  isNotExistState();
  isTqState();
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
const imageContainer = document.getElementById('pep-img-container');
const initOpen = document.getElementById("pep-one");
const imgInitOpen = initOpen.querySelector('img');

if(window.innerWidth < 992){
  imgInitOpen.classList.remove('hidden');
  const img = imageContainer.querySelector("img");
  imageContainer.removeChild(img)
}

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.card-standard-header .dropdown-item-button');
  const title = dropdown.querySelector('.card-standard-header .sm-text-card');
  const content = dropdown.querySelector('.collapsed-content');
  const image = content.querySelector('img');
  const iconbutton = button.querySelector('img');

  dropdown.addEventListener('click', () => {
    dropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.querySelector('.collapsed-content').classList.remove('d-flex');
        otherDropdown.querySelector('.card-standard-header .dropdown-item-button img').src = `${shortenedURL}/media/arrow-dropdowns-down.svg`;;
        otherDropdown.querySelector('.card-standard-header .sm-text-card').style.color = '#484848';
      }
    });
  
    iconbutton.src = `${shortenedURL}/media/arrow-dropdowns.svg`;
    content.classList.add('d-flex');
    title.style.color = '#F34E1E';
    image.classList.remove('hidden');

    if(window.innerWidth > 992){
      imageContainer.innerHTML = '';
      imageContainer.appendChild(image);
    }

  });
}); 

// restore in top sin scrollTop
history.scrollRestoration = "manual";
$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

// video 
const video = document.getElementById("video-cases");

video.addEventListener('ended', function() {
  $(".video-overlay").css("display", "block");
  $("#link-button-video-container").css("display", "block");
});

video.addEventListener('play', function() {
  $(".video-overlay").css("display", "none");
  $("#link-button-video-container").css("display", "none");
});

$('#video-play, .video-pre-overlay').click(function() {
  $('.video-pre-overlay').hide();
  video.play();
});

document.getElementById('button-redirect-youtube').addEventListener('click', function() {
  window.open('https://www.youtube.com/@teamcubation/videos', '_blank');
});

$('#holon_iq').click(function(){
  window.open('https://credentials.holoniq.com/credentials/6bb15f13-623b-4c19-a87f-78874dd4680a', '_blank');
})
$('#south_summit').click(function(){
  window.open('https://www.southsummit.io/madrid/winners-and-finalists/', '_blank');
})

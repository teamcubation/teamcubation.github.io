// import data_en from "./src/locales/en.json" assert {type: 'json'};
// import data_es from "./src/locales/es.json" assert {type: 'json'};

const url = "https://teamcubation.com/";
const initialLocation = document.location.href;
const lang = document.documentElement.lang;
let json_path;

$(document).ready(
  gtag("event", "page_view", {
    page_title: `home`,
    page_location: `${url}`,
    page_path: `${url}`,
    send_to: "G-VVX5NJFK14",
  }),
  document.documentElement.lang === "es"
    ? (json_path = "./src/locales/es.json")
    : (json_path = "./src/locales/en.json"),
  $('.top-quotes').animatedHeadline({ animationType: "push" })
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
      $(`.lenguage-options li`).each(function () {
        if ($(this).data("lang") === lang) {
          $(this).find("a").addClass("a-disbled");
        }
      });
      $(`.lenguage-options`).slideDown();
    }
  },
  function () {
    $(`.lenguage-options`).slideUp();
  }
);

$(".language-select").on("click", function () {
  $(`.lenguage-options li`).each(function () {
    if ($(this).data("lang") === lang) {
      $(this).find("a").addClass("a-disbled");
    }
  });
  $(`.lenguage-options`).toggle("slow");
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
  $('.input-select').height('40px');
  $('.input-select').height($('.input-select')[0].scrollHeight - 4);
  $(".list-options-tc").slideUp();
  $(".chevron-select").removeClass("chevron-effect");
});

window.addEventListener("click", function (e) {
  if (
    !document.getElementById("dropdown-select").contains(e.target)
  ) {
    $(".list-options-tc").slideUp();
    $(".chevron-select").removeClass("chevron-effect");
    $(".select-tc").css(
      "border-bottom",
      "2px solid rgba(128, 128, 128, 0.507)"
    );
    if ($(".input-select").val() !== "") $(".text-error").remove();
  }
});

// mobile navbar 

$(".ion-md-menu").on("click", function () {
  $("#navBarMobile").toggle("slow");
});

$("a").on("click", function () {
  $("#navBarMobile").css("display", "none");
});


// navbar - scroll
const heigthNav = document.getElementById("navBar").clientHeight;
let lastScrollTop = 0;
let isNavigate = false;  

window.addEventListener('scroll', (e) => {
  if(screen.width > 768){
    const currentPositionScroll = window.scrollY;
    if(currentPositionScroll > 600){
      $('#logo').addClass('navigate-home');
      $('#backToTop').addClass('show-nav');
    }
    else{
      $('#logo').removeClass('navigate-home');
      $('#backToTop').removeClass('show-nav');
    }
    if (currentPositionScroll > lastScrollTop && currentPositionScroll > 600 && !isNavigate){
      $('nav').addClass('hidden-nav');
    } 
    else {
      $('nav').removeClass('hidden-nav');
    }
    lastScrollTop = currentPositionScroll <= 0 ? 0 : currentPositionScroll;
  }
});

// effects - mouseevent
window.addEventListener('mousemove', (e) => {
  if(screen.width > 768){
    const currentPositionScroll = window.scrollY;
    if(currentPositionScroll > 500){
      heigthNav + 80 > e.clientY && $('nav').removeClass('hidden-nav');
    };
  }
});

// navigation - scroll
$(".scrollToTop").on("click", function (e) {
  e.preventDefault();
  location.href = initialLocation;
  window.scrollTo({ top: 0, behavior: "smooth" });
});


$(".how").on("click", function (e) {
  e.preventDefault();
  console.log(e)
  location.href = `#how`;
  perfectScroll("scrolltoHow", screen.width > 768 ? 150 : 10);
});

$(".what").on("click", function (e) {
  e.preventDefault();
  location.href = `#what`;
  perfectScroll(`weDoLayer`, screen.width > 768 ? 100 : -10);
});

$(".clients").on("click", function (e) {
  e.preventDefault();
  location.href = `#clients`;
  perfectScroll(`clients`, -40);
});

$(".team").on("click", function (e) {
  e.preventDefault();
  location.href = `#team`;
  perfectScroll(`scrolltoTeam`, 100);
});

$(".devsJuniors").on("click", function (e) {
  e.preventDefault();
  location.href = `#devsJuniors`;
  perfectScroll(`scrollToJuniors`, -80);
});

$(".devsSeniors").on("click", function (e) {
  e.preventDefault();
  location.href = `#devsSeniors`;
  perfectScroll("devsSeniorsLayer", -30);
});

$(".contact").on("click", function (e) {
  e.preventDefault();
  location.href = `#contact`;
  perfectScroll("contact", 10);
});

const perfectScroll = (section, marginToAdd) => { 
  const distanceCalculated = heigthNav + 30 + marginToAdd;
  const scrollToSection = document.getElementById(section).offsetTop;
  const scrollTo = scrollToSection - distanceCalculated;
  isNavigate = true;
  window.scrollTo({ top: scrollTo, behavior: "smooth" });
};

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

// scroll effect 
AOS.init({
  once: true,
  duration: 500,
  easing: 'ease'
});


//plus parallax effect
let parallaxSceneOne = document.getElementById('parallaxOne');
let parallaxSceneThree = document.getElementById('parallaxThree');
let parallaxInstanceOne = new Parallax(parallaxSceneOne);
let parallaxInstanceThree = new Parallax(parallaxSceneThree);

parallaxSceneOne.style.display = 'block';


// test effect logo-card
// var card = document.getElementById("cardDuration");
// card.addEventListener("mouseover", function (e) {
//   document.getElementById("pathDurationOne").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationTwo").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationThree").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationFour").setAttribute("stroke", "#ff7c00");
// });

const team = {
  ceo: {
    name: "ceo",
    role: "CEO "
  },
  coo: {
    name: "coo",
    role: "COO "
  },
  training: {
    name: "training",
    role: "Head of Training "
  },
  cto: {
    name: "cto",
    role: "CTO "
  },
  people: {
    name: "people",
    role: "Head of People "
  },
  cfo: {
    name: "cfo",
    role: "CFO "
  },
  data: {
    name: "data",
    role: "Head of Data & Analytics "
  }
}

$(function(){
  writer(team.ceo.name, team.ceo.role, 150, 0);
  writer(team.coo.name, team.coo.role, 150, 0);
  writer(team.training.name, team.training.role, 150, 0);
  writer(team.cto.name, team.cto.role, 150, 0);
  writer(team.people.name, team.people.role, 150, 0);
  writer(team.cfo.name, team.cfo.role, 150, 0);
  writer(team.data.name, team.data.role, 150, 0);
 });
 
const writer = (container, text, interval, n) => {
  var i=0,
   timer = setInterval(function() {
    if ( i<text.length ) {
      $("#"+container).html( text.substr(0,i++) + `<span id=underscore${container}>_</span>`);
      $(`#underscore${container}`).addClass('_effect_style'); 
    } 
    else {
      $(`#underscore${container}`).addClass('_effect')
      clearInterval(timer);
      if ( --n!=0 ) {
        setTimeout(function() {
          writer(container,text,interval,n);
        },2000);
      }
    }
  },interval);
};
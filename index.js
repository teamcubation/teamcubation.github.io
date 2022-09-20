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
    : (json_path = "./src/locales/en.json")
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

const urlBuilder = (currentUrl) => {
  return !currentUrl.includes("/en/") ? url : `${url}/en/`;
};

// const styledScroll = (classToAdd) => {
//     $("body").removeClass().addClass(classToAdd);
// }

// if (initialLocation.includes("organization")) {
//   $("body").css("overflow-y", "scroll");
//   styledScroll("organization-scrollbar");
//   $("#organization").show();
// } else if (initialLocation.includes("senior")) {
//   $("body").css("overflow-y", "scroll");
//   styledScroll("senior-scrollbar");
//   $("#senior").show();
// } else if (initialLocation.includes("junior")) {
//   $("body").css("overflow-y", "scroll");
//   styledScroll("junior-scrollbar");
//   $("#junior").show();
// } else if (initialLocation.includes("/#team")) {
//   $("body").css("overflow-y", "scroll");
//   styledScroll("team-scrollbar");
//   $("#team").show();
// } else {
//   $("body").css("overflow-y", "scroll");
//   $("#home").show();
// }

// window.addEventListener("hashchange", function (ev) {
//   if (ev.newURL === url || ev.oldURL.includes("/#")) {
//     window.history.replaceState("", "", `${url}`);
//     hideShowPage("home", urlBuilder(document.location.href));
//   } else if (ev.newURL.includes("organization")) {
//     hideShowPage("organization", url);
//   } else if (ev.newURL.includes("senior")) {
//     hideShowPage("senior", url);
//   } else if (ev.newURL.includes("junior")) {
//     hideShowPage("junior", url);
//   } else if (ev.newURL.includes("team")) {
//     hideShowPage("team", url);
//   }
// });

$(".form-contact").append(
  '<button type="submit" name="submit-contact" class="btn-tc submit-contact" style="float: right; width: 25%">' +
    dataByLang.formContact.btnSend +
    "<span class=_effect>_</span></button>"
);
$(".form-contact").on("submit", function (ev) {
  ev.preventDefault();
  let data_origin_extra_error_message =
    dataByLang.formContact.validation.noOptionSelected;
  const currentForm = $(this).attr("id");
  const btn = $(this).find(".submit-contact");
  const data_name = $(`#${currentForm} .name`).val();
  let data_number = `+${$(`#${currentForm} .country-phone`).val()} ${$(
    `#${currentForm} .area-phone`
  ).val()} ${$(`#${currentForm} .number-phone`).val()}`;
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
  const data_origin = $(`#${currentForm} .typeContact`).val();
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
    $(".select-tc").css(
      "border-bottom",
      "2px solid rgba(128, 128, 128, 0.507)"
    );
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
        origin: data_origin,
        origin_extra: data_origin_extra,
        lang: lang,
      }),
      dataType: "json",
      success: (r) => {
        $(".alert").remove();
        $(".form-contact").prepend(
          '<div class="alert alert-success mt-5" role="alert"</div>'
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
          '<div class="alert alert-danger mt-5" role="alert"</div>'
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
    .removeData("value-selected");
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
    $(this).css("color", "red");
  },
  function () {
    $(this).css("color", "gray");
  }
);

$(".option-tc").on("click", function () {
  const optionSelected = $(this);
  const valueOption = optionSelected.data("option");
  const textOption = optionSelected.text();
  $(".text-error").remove();
  if (valueOption === "other") {
    $(".input-select").data("value-selected", valueOption);
    $(".input-select")
      .prop("disabled", false)
      .focus()
      .val("")
      .attr("placeholder", dataByLang.formContact.originExtraPlaceholder);
  } else {
    $(".input-select").data("value-selected", valueOption);
    $(".input-select").val(textOption);
    $(".input-select").prop("disabled", true);
  }
  $(".list-options-tc").slideUp();
  $(".chevron-select").removeClass("chevron-effect");
});

window.addEventListener("click", function (e) {
  if (
    // !document.getElementById("dropdown-select-org").contains(e.target) &&
    !document.getElementById("dropdown-select-team").contains(e.target)
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

$(".ion-md-menu").on("click", function () {
  $("#navBarMobile").toggle("slow");
});

$("a").on("click", function () {
  $("#navBarMobile").css("display", "none");
});

$(".how").on("click", function (e) {
  e.preventDefault();
  location.href = `#how`;
  perfectScroll("scrolltoHow", 0);
});

$(".what").on("click", function (e) {
  e.preventDefault();
  location.href = `#what`;
  perfectScroll(`weDoLayer`, 0);
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
  perfectScroll("scrolltoContact", 150);
});


const perfectScroll = (section, marginToAdd) => { 
  const heigthNav = document.getElementById("navBar").clientHeight + 30 + marginToAdd;
  const scrollToSection = document.getElementById(section).offsetTop;
  const scrollTo = scrollToSection - heigthNav;
  console.log(scrollToSection);
  window.scrollTo({ top: scrollTo, behavior: "smooth" });

};

// test effect logo-card
// var card = document.getElementById("cardDuration");
// card.addEventListener("mouseover", function (e) {
//   document.getElementById("pathDurationOne").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationTwo").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationThree").setAttribute("stroke", "#ff7c00");
//   document.getElementById("pathDurationFour").setAttribute("stroke", "#ff7c00");
// });

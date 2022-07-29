// import data_en from "./src/locales/en.json" assert {type: 'json'};
// import data_es from "./src/locales/es.json" assert {type: 'json'};

const url= 'https://teamcubation.com/';
const initialLocation = document.location.href;
const lang = document.documentElement.lang;

const dataByLang = {
    landing: {
        btnEnter: lang === 'es' ? '> Entrar <' : '> Enter <',
    },
    formContact: {
        btnSend: lang === 'es' ? 'Enviar' : 'Submit',
        btnSending : lang === 'es' ? 'Enviando...' : 'Sending...',
        submitResponse: {
            success: lang === 'es' ? 'Su mensaje se ha enviado correctamente, gracias !!' : 'Your message has been sent, thank you!',
            error: lang === 'es' ? 'Ocurrió un error durante el envío del formulario, por favor vuelva a intentarlo' : 'An error occurred while sending the form, please try again.',
        }
    }
};

const urlBuilder = (currentUrl) => {
    return !currentUrl.includes('/en/') ? url : `${url}/en/`
};

const styledScroll = (classToAdd) => {
    $("body").removeClass().addClass(classToAdd);
}

if(initialLocation.includes('organization')){
    $("body").css('overflow-y', 'scroll');
    styledScroll('organization-scrollbar');
    $("#organization").show();
}
else if(initialLocation.includes('senior')){
    $("body").css('overflow-y', 'scroll');
    styledScroll('senior-scrollbar');
    $("#senior").show();
}
else if(initialLocation.includes('junior')){
    $("body").css('overflow-y', 'scroll');
    styledScroll('junior-scrollbar');
    $("#junior").show();
}
else if (initialLocation.includes('/#team')){
    $("body").css('overflow-y', 'scroll');
    styledScroll('team-scrollbar');
    $("#team").show();
}
else{
    $("body").css('overflow-y', 'scroll');
    $("#home").show();
};

window.addEventListener("hashchange", function(ev) {
    ev.stopPropagation();
    // if(screen.width > 1024){

    //     if(ev.newURL === url || ev.oldURL.includes('/#')){
    //         window.history.replaceState('', '', `${url}`);
    //         hideShowPage('home', urlBuilder(document.location.href));
    //     }
    //     else if(ev.newURL.includes('organization')){
    //         hideShowPage('organization', url);
    //     }
    //     else if(ev.newURL.includes('senior')){
    //         hideShowPage('senior', url);
    //     }
    //     else if(ev.newURL.includes('junior')){
    //         hideShowPage('junior', url);
    //     }
    //     else if(ev.newURL.includes('team')){
    //         hideShowPage('team', url);
    //     }
    // }
})
   
let json_path;

$(document).ready(
    document.documentElement.lang === 'es' 
      ? json_path = './src/locales/es.json' 
      : json_path = './src/locales/en.json',
);

$(".form-contact").append('<button type="submit" name="submit-contact" class="btn-tc submit-contact">' + dataByLang.formContact.btnSend +'<span class=_effect>_</span></button>')
$(".form-contact").on("submit", function(ev) {
    ev.preventDefault();
    const currentForm =  $(this).attr('id');
    const btn= $(this).find('.submit-contact');
    btn.text(dataByLang.formContact.btnSending);
    const data_name = $(`#${currentForm} .name`).val();
    const data_number = `+${$(`#${currentForm} .country-phone`).val()} ${$(`#${currentForm} .area-phone`).val()} ${$(`#${currentForm} .number-phone`).val()}` 
    const data_email = $(`#${currentForm} .email`).val();
    const data_message = $(`#${currentForm} .message`).val();
    const data_organization = $(`#${currentForm} .organizationContact`).val();
    const data_origin = $(`#${currentForm} .typeContact`).val(); 
    const data_linkedin = $(`#${currentForm} .linkedin`).val();
    $.ajax({
            // url: "ttps://localhost:3000",
        url: 'https://api.prod.tq.teamcubation.com/contact',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            full_name: data_name,
            message: data_message,
            organization: data_organization,
            phone_number: data_number,
            email: data_email,
            origin: data_origin,
            linkedin: data_linkedin
        }),
        dataType: 'json',
        success: (r) => {
            $('.alert').remove(); 
            $(".form-contact").prepend('<div class="alert alert-success mt-5" role="alert"</div>')
            $(".alert").text(dataByLang.formContact.submitResponse.success)
            $(".alert").fadeTo(2000, 500).slideUp(500, function() {
                $(".alert").slideUp(500);
            });
            btn.replaceWith('<button type="submit" name="submit-contact" class="btn-tc submit-contact">' + dataByLang.formContact.btnSend +'<span class=_effect>_</span></button>')
            clearForm();
        },
        error: (r) => {
            $('.alert').remove(); 
            $(".form-contact").prepend('<div class="alert alert-danger mt-5" role="alert"</div>')
            $(".alert").text(dataByLang.formContact.submitResponse.error)
            $(".alert").fadeTo(2000, 500).slideUp(500, function() {
                $(".alert").slideUp(500);
            });
            btn.replaceWith('<button type="submit" name="submit-contact" class="btn-tc submit-contact">' + dataByLang.formContact.btnSend +'<span class=_effect>_</span></button>')
            clearForm();
        }
    });
    return false;
});
    
const clearForm = () => {
    $(".name").val('');
    $(".country-phone").val('');
    $(".area-phone").val('');
    $(".number-phone").val('')    
    $(".email").val('');
    $(".message").val('');
    $(".organization").val('');
}

// hide-show home and pages /////////

$("#organization-enter").on("click", function(ev){
    ev.preventDefault();
    if (screen.width > 1024){
        $("#home").slideUp('slow');
        $("#senior").slideUp('slow');
        $("#junior").slideUp('slow');
        $("#organization").slideDown(3500);
        $("body").css('overflow-y', 'scroll');
        styledScroll('organization-scrollbar');
        window.history.pushState('', '', `${urlBuilder(document.location.href)}#organization`);
    }
    else{
        if($(this).hasClass('organization-enter')){
            $("#home").slideUp('slow');
            $("#organization").slideDown('slow');
            window.history.pushState('', '', `${urlBuilder(document.location.href)}#organization`);
        }
        else{
           hideShowItemMenu('organization-enter', 'color-red');    
        } 
    }
});

$("#senior-enter").on("click", function(ev){
    ev.preventDefault();
    if (screen.width > 1024){
        $("#home").slideUp('slow');
        $("#organization").hide();
        $("#junior").hide();
        $("body").css('overflow-y', 'scroll');
        styledScroll('senior-scrollbar');
        $("#senior").slideDown(3500);
        window.history.pushState('', '', `${urlBuilder(document.location.href)}#senior`);
    }
    else{
        if($(this).hasClass('senior-enter')){
            $("#home").slideUp('slow');
            $("#senior").slideDown('slow');
            window.history.pushState('', '', `${urlBuilder(document.location.href)}#senior`);
        }
        else{
           hideShowItemMenu('senior-enter', 'color-green'); 
        } 
    }
});

$("#junior-enter").on("click", function(ev){
    ev.preventDefault();
    if (screen.width > 1024){
        $("#home").slideUp('slow');
        $("#organization").hide();
        $("#senior").hide('slow');
        $("body").css('overflow-y', 'scroll');
        styledScroll('junior-scrollbar');
        $("#junior").slideDown(3500);
        window.history.pushState('', '', `${urlBuilder(document.location.href)}#junior`);
    }
    else{
        if($(this).hasClass('junior-enter')){
            $("#home").slideUp('slow');
            $("#junior").slideDown('slow');
            window.history.pushState('', '', `${urlBuilder(document.location.href)}#junior`);
        }
        else{
           hideShowItemMenu('junior-enter', 'color-orange');    
        } 
    }
});

$("#team-enter").on("click", function(ev){
    ev.preventDefault();
    if (screen.width > 1024){
        $("#home").slideUp('slow');
        $("#organization").hide();
        $("#senior").hide('slow');
        $("#junior").hide('slow');
        $("body").css('overflow-y', 'scroll');
        styledScroll('team-scrollbar');
        $("#team").slideDown(3500);
        window.history.pushState('', '', `${urlBuilder(document.location.href)}#team`);
    }
    else{
        if($(this).hasClass('team-enter')){
            $("#home").slideUp('slow');
            $("#team").slideDown('slow');
            window.history.pushState('', '', `${urlBuilder(document.location.href)}#team`);
        }
        else{
           hideShowItemMenu('team-enter', 'color-turquoise');    
        } 
    }
});


$("#organization-enter").hover(
    function(ev) {
        if (screen.width > 1024){
            hideShowItemMenu('organization-enter', 'color-red');
        }
    }
);

$("#senior-enter").hover(
    function() {
        if (screen.width > 1024){
            hideShowItemMenu('senior-enter', 'color-green');
        }
    }
);

$("#junior-enter").hover(
    function() {
        if (screen.width > 1024){
            hideShowItemMenu('junior-enter', 'color-orange');
        }
    }
);

$("#team-enter").hover(
    function() {
        if (screen.width > 1024){
            hideShowItemMenu('team-enter', 'color-turquoise');
        }
    }
);

const hideShowItemMenu = (itemToShow, classToAdd) => {
    const itemsBurguer = ['organization-enter', 'senior-enter', 'junior-enter', 'team-enter'];
    itemsBurguer.map(item => {
        if(item !== itemToShow){
            $(`#${item}-item`).hide('slow')
            $(`#${item}`).text('').removeClass(`${item}`)
        }
        else{
            $(`#${itemToShow}`).text(dataByLang.landing.btnEnter).addClass(itemToShow)
            $(`#${itemToShow}-item`).slideDown('slow');
            $('.scroll-prompt-arrow-container').hide('slow');
            $("#welcome").removeClass().addClass(classToAdd);
        }  
    });    
};

$('.navigate-home').on("click", function(ev){
    hideShowPage('home', urlBuilder(document.location.href));
});

$('.navigate-senior').on("click", function(ev){
    hideShowPage('senior', urlBuilder(document.location.href));
});

$('.navigate-junior').on("click", function(ev){
    hideShowPage('junior', urlBuilder(document.location.href));
});

$('.navigate-organization').on("click", function(ev){
    hideShowPage('organization', urlBuilder(document.location.href));
});

$('.navigate-team').on("click", function(ev){
    hideShowPage('team', urlBuilder(document.location.href));
});


$('.navigate-what').on("click", function(ev){
    const page= $(this).attr("id");
    let navigate_to;
    if(page.includes('organization')){
        navigate_to = 'organization/what'
    }
    else if(page.includes('senior')){
        navigate_to = 'senior/what'
    }
    else if(page.includes('junior')){
        navigate_to = 'junior/what'
    }
    else{
        navigate_to = 'team/what'
    }
    document.getElementById(navigate_to).scrollIntoView({behavior: 'smooth'}, true);
})

const hideShowPage = (pageToShow, url) => {
    const pages = ['home', 'organization', 'senior', 'junior', 'team'];
    pages.map(page => {
        if(page === pageToShow){
            $(`#${pageToShow}`).slideDown(page !== 'home' ? 3500 : 1000);
            styledScroll(`${page}-scrollbar`);
            page !== 'home' ? window.history.pushState(``, '', `${url}#${pageToShow}`) : window.history.replaceState('', '', `${url}`); ;
        }
        else{
            $("body").css('overflow-y', 'scroll');
            window.scrollTo(0, 0);
            $(`#${page}`).hide()
        }  
    });    
};

$(".no-effect-item").hover(
    function() {
        $('.scroll-prompt-arrow-container').show()
        hideShowItemMenu('');
        $("#welcome").removeClass().addClass('color-light-grey');
    }
);

$(".language-select").hover(
    function() {
        if (screen.width > 1024){
            $(`.lenguage-options li`).each(function(){
                if($(this).data("lang") === lang){
                    $(this).find('a').addClass('a-disbled');
                }
        	});
            $(`.lenguage-options`).slideDown();
        }
    },
    function() {
        $(`.lenguage-options`).slideUp();
    }
);

$(".language-select").on('click',
    function() {
        $(`.lenguage-options li`).each(function(){
            if($(this).data("lang") === lang){
                $(this).find('a').addClass('a-disbled');
            }
        });
        $(`.lenguage-options`).toggle('slow');
    },
);

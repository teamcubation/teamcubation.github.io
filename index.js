$("#form-contact").on("submit", function(ev) {
    ev.preventDefault();
    $("#submit-contact").text('Sending...')
	const data_name = $("#name").val();
    const data_number = `+${$("#country-phone").val()} ${$("#area-phone").val()} ${$("#number-phone").val()}` 
    const data_email = $("#email").val();
	const data_message = $("#message").val();
    const data_organization = $("#organization").val();
    $.ajax({
        url: 'https://api.prod.tq.teamcubation.com/contact',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            full_name: data_name,
            message: data_message,
            organization: data_organization,
            phone_number: data_number,
            email: data_email
        }),
        dataType: 'json',
        success: (r) => {
            $('.alert').remove(); 
            $("#form-contact").prepend('<div class="alert alert-success mt-5" role="alert"</div>')
            $(".alert").text('Your message has been sent, thank you!')
            $("#submit-contact").text('Submit')
            clearForm();
        },
        error: (r) => {
            $('.alert').remove(); 
            $("#form-contact").prepend('<div class="alert alert-danger mt-5" role="alert"</div>')
            $(".alert").text('An error ocurred while sending the form, please try again.')
            $("#submit-contact").text('Submit')
            clearForm();
        }
    });
    return false;
});

const clearForm = () => {
    $("#name").val('');
    $("#country-phone").val('');
    $("#area-phone").val('');
    $("#number-phone").val('')    
    $("#email").val('');
    $("#message").val('');
    $("#organization").val('');
}
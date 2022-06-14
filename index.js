$("#submit-contact").on( "click", function(){
    $("#submit-contact").text('sending')
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
            $("#form-contact").prepend('<div class="alert alert-success mt-1" role="alert"</div>')
            $(".alert").text('send !!')
            $("#submit-contact").text('submit')
            $("#name").text('');
            clearForm();
        },
        error: (r) => {
            $('.alert').remove(); 
            $("#form-contact").prepend('<div class="alert alert-danger mt-1" role="alert"</div>')
            $(".alert").text('error !!')
            $("#submit-contact").text('submit')
            clearForm();
        }
    });
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
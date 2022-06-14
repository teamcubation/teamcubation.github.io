$("#submit-contact").on( "click", function(){
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
        success: (r) => { alert('Sent!'); },
        error: (r) => { alert('error!'); }
    });
});

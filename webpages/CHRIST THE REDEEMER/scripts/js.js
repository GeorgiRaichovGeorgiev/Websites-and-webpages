$(function() {
	var placeholder = $('#placeholder'),
		emailField = $('#email-field');

	if (emailField.val().length) {
		placeholder.css('visibility', 'hidden');
	}

	emailField.keyup(function() {
		placeholder.css('visibility', 'hidden');
	});
	placeholder.on('click', function() {
		$(this).css('visibility', 'hidden');
		emailField.focus();
	});
	emailField.on('focus', function() {
		placeholder.css('visibility', 'hidden');
	});
	emailField.on('blur', function() {
		if(!(emailField.val().length)) {
			placeholder.css('visibility', 'visible');
		} else {
			placeholder.css('visibility', 'hidden');
		}
	});
});
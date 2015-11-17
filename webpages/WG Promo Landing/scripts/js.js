$(function() {
	$('.social-link').mouseover(function() {
		$(this).next().addClass('message-active');
	});
	$('.social-link').mouseout(function() {
		$(this).next().removeClass('message-active');
	});
});
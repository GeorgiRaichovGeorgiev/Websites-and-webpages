$(function() {
	$('article').mouseover(function() {
		$(this).stop().animate({'opacity': '0.7'}, 400);
	});
	$('article').mouseout(function() {
		$(this).stop().animate({'opacity': '1'}, 400);
	});
});
$("#arrow-left, #arrow-right").click(false);

$("#arrow-left").click(function(){
	var lastChild = $("#clients-slider li:last-child");
	$("#clients-slider > ul").prepend(lastChild);
	lastChild.css("margin-left", 0);
	$("#clients-slider > ul > li + li").css("margin-left", "50px");
});
$("#arrow-right").click(function(){
	var firstChild = $("#clients-slider li:first-child");
	$("#clients-slider > ul").append(firstChild);
	$("#clients-slider > ul > li + li").css("margin-left", "50px");
	$("#clients-slider > ul > li:first-child").css("margin-left", 0);
});
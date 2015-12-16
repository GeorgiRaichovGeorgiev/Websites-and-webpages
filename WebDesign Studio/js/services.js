$(".learn-more").click(false);
var infoWrapper = $("#info-wrapper"),
	info = $("#info-wrapper > div");

/* Adding margin to odd-even elements */
var elements = document.querySelectorAll('article');
for (var index = 0; index < elements.length; index+=1) {
	if(index % 2 !== 0) {
		elements[index].style.marginLeft = '40px';
	}
}

$("#info-wrapper, #close-icon").click(function(){
	$(infoWrapper).css("display", "none");
});
$(document).keyup(function(e){
	if(e.keyCode === 27) {
		$(infoWrapper).css("display", "none");
	}
});
$("#info-wrapper > div").click(false);

$(".learn-more").click(function(){
	var header = $(this).parents("article").find("h2").text(),
		paragraph = $(this).parents("article").find("p").text();

	$(infoWrapper).css("display", "block");
	$(info).children("h2").text(header);
	$(info).children("p").text(paragraph);

	var topPos = $(window).scrollTop() + 150;
	$(info).css("top", topPos);
});
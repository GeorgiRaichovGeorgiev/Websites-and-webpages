/* Adding margin to odd-even elements */
var elements = document.querySelectorAll('article');
for (var index = 0; index < elements.length; index+=1) {
	if(index % 2 !== 0) {
		elements[index].style.marginLeft = '7px';
	}
}

/* Centering ".title-and-branding" */
var titleBrand = document.querySelectorAll(".title-and-branding"),
	index,
	height,
	topPx;
for(index = 0; index < titleBrand.length; index += 1) {
	height = titleBrand[index].offsetHeight;
	topPx = (150 - height) / 2;
	if (topPx > 0) {
		titleBrand[index].style.top = topPx + "px";
	}
}

/* Centering ".project-info" on hover */
$("article").hover(
	function(){
		$(this).stop(true, true).find(".project-info").animate({top: "20px"}, {queue: false, duration: 200});
	},
	function(){
		$(this).stop(true, true).find(".project-info").animate({top: "200px"}, {queue: false, duration: 200});
	}
);
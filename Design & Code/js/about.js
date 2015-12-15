$(".way-of-working a").click(false);

$(".way-of-working a").hover(
	function(){
		$(this).stop(true, true).find(".hover").animate({"top": "-134px"}, {queue: false, duration: 200});
	},
	function(){
		$(this).stop(true, true).find(".hover").animate({"top": "-268px"}, {queue: false, duration: 200});
	}
);

$(".way-of-working li:nth-child(4n + 1)").css("marginLeft", 0);
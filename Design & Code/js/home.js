var seeMoreBtn = $("#see-more");
seeMoreBtn.click(false);

/* Showing/hiding elements at clicking #see-more */
seeMoreBtn.click(function(){
	// height by default (four images) - 558px
	var workUl = $("#work > ul"),
		ulHeight = workUl[0].scrollHeight, // full height
		ulVisHeight = workUl.height(), // visible height
		isChrome = /chrome/.test(navigator.userAgent.toLowerCase()); // check if the browser is Chrome

	if ((ulVisHeight + 558) < ulHeight) {
		workUl.css("height", ulVisHeight + 558);
		$(isChrome ? "body" : "html").animate({
			scrollTop: $(isChrome ? "body" : "html").scrollTop() + 558
		}, 1000);

	} else {
		workUl.css("height", ulHeight);
		seeMoreBtn.css("display", "none");
		$(isChrome ? "body" : "html").animate({
			scrollTop: $(isChrome ? "body" : "html").scrollTop() + (ulHeight - ulVisHeight)
		}, 1000);
	}
});
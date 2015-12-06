$(function(){
	var searchInput = $('#search'),
		searchField = $('#search-field'),
		searchFieldWidth,
		searchValue,
		articleHeaders = $('article > header'),
		findedResults,
		findedResultsLength,
		isThereFindedResults = $('.finded-results'),
		width;

	jQuery.expr[':'].Contains = function(a, i, m) { 
  		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};

	$('#search-image').click(function(){
		searchFieldWidth = searchField.width() - 40;
		console.log(searchFieldWidth);
		width = parseInt(searchInput.css('width'));
		if (width < 6) {
			searchInput.animate({'width': searchFieldWidth}, 300).focus();
		} else {
			searchInput.animate({'width': '0'}, 300);
		}
	});

	

	searchInput.keyup(function(){
		searchValue = $(this).val();

		$('article').show();

		if ($.trim(searchValue) !== '') {
			$('article').hide();
			findedResults = $('article > header' + ':Contains(' + searchValue + ')');
			findedResultsLength = findedResults.length;

			if (!findedResultsLength) {
				isThereFindedResults.addClass('no-results');
			} else {
				isThereFindedResults.removeClass('no-results');
			}

			findedResults.parent().show().find('header');
		} else {
			isThereFindedResults.removeClass('no-results');
		}
	});
});
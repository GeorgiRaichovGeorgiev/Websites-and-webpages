var currentLetter = $("#current-letter").text(),
	currentRegion = $(".current-region").text(),
	currentIndustry = $("#current-industry").text(),
	regions = {
				"Africa": [
						   "Algeria", "Angola", "Benin", "Botswana",
						   "Burkina Faso", "Burundi", "Cabo Verde",
						   "Cameroon", "Central African Republic",
						   "Chad", "Comoros", "Congo", "Republic of the Congo",
						   "Democratic Republic of the Cote d'Ivoire",
						   "Djibouti", "Egypt", "Equatorial Guinea",
						   "Eritrea", "Ethiopia", "Gabon", "Gambia",
						   "Ghana", "Guinea", "Guinea-Bissau", "Kenya",
						   "Lesotho", "Liberia", "Libya", "Madagascar",
						   "Malawi", "Mali", "Mauritania", "Mauritius",
						   "Marocco", "Mozambique", "Namibia", "Niger",
						   "Nigeria", "Rwanda", "Sao Tome and Principe",
						   "Senegal", "Seychelles", "Sierra Leone",
						   "Somalia", "South Africa", "South Sudan",
						   "Sudan", "Swaziland", "Tanzania", "Togo",
						   "Tunisia", "Uganda", "Zambia", "Zimbabwe"
						  ],
				"Asia": [
						   "Afghanistan", "Armenia", "Azerbaijan",
						   "Bahrain", "Bangladesh", "Bhutan", "Brunei",
						   "Cambodia", "China", "Cyprus", "Georgia",
						   "India", "Indonesia", "Iran", "Iraq", "Israel",
						   "Japan", "Jordan", "Kazakhstan", "Kuwait",
						   "Kyrguzstan", "Laos", "Lebanon", "Malaysia",
						   "Maldives", "Mongolia", "Myanmar",
						   "Nepal", "North Korea", "Oman", "Pakistan",
						   "Palestine", "Philippines", "Qatar", "Russia",
						   "Saudi Arabia", "Singapore", "South Korea",
						   "Sri Lanka", "Syria", "Taiwan", "Tajikistan",
						   "Thailand", "Timor-Leste", "Turkey",
						   "Turkmenistan", "United Arab Emirates",
						   "Uzbekistan", "Vietnam", "Yemen"
						],
				"Australia and Oceania": [
											"Australia", "Fiji", "Kiribati",
											"Marshall Islands", "Micronesia",
											"Nauru", "New Zeland", "Palau",
											"Papua New Guinea", "Samoa",
											"Solomon Islands", "Tonga",
											"Tuvalu", "Vanuatu"
										 ],
				"Europe": [
							"Albania", "Andorra", "Armenia", "Austria",
							"Azerbaijan", "Belarus", "Belgium",
							"Bosnia and Herzegovina", "Bulgaria",
							"Croatia", "Cyprus", "Czech Republic",
							"Denmark", "Estonia", "Finland", "France",
							"Georgia", "Germany", "Greece", "Hungary",
							"Iceland", "Ireland", "Italy", "Kazakhstan",
							"Kosovo", "Latvia", "Liechtenstein", "Lithuania",
							"Luxembourg", "Macedonia", "Malta", "Moldova",
							"Monaco", "Montenegro", "Netherlands",
							"Norway", "Poland", "Portugal", "Romania",
							"Russia", "San Marino", "Serbia", "Slovakia",
							"Slovenia", "Spain", "Sweden", "Switzerland",
							"Turkey", "Ukraine", "United Kingdom",
							"Vatican City"
						  ],
				"North America": [
									"Antigua and Barbuda", "Bahamas",
									"Barbados", "Belize", "Canada",
									"Costa Rica", "Cuba", "Dominicia",
									"Dominican Republic", "El Salvador",
									"Grenada", "Guatemala", "Haiti",
									"Honduras", "Jamaica", "Mexico",
									"Nicaragua", "Panama", "St. Kitts and Nevis",
									"St. Lucia", "St. Vincent and The Grenadines",
									"Trinidad and Tobago", "USA"
								 ],
				"South America": [
									"Argentina", "Bolivia", "Brazil",
									"Chile", "Colombia", "Ecuador",
									"Guyana", "Paraguay", "Peru",
									"Suriname", "Uruguay", "Venezuela"
								 ]
			  },
    mainFilter,
	loading = $("#loading"),
	companies,
	companiesIndices,
	companiesWithCurrLetter = [],
	companiesWithCurrRegion = [],
	companiesWithCurrIndustry = [],
	currCompanyCategory,
	currCompanyByIndex,
	additionalFilters = $("#other-filters a");

$.ajax({
    async: false,
    global: false,
	url: "../../js/companies.json",
	dataType: "json",
	success: function(data){
		companies = data;
	}
});

$.ajax({
    async: false,
    global: false,
	url: "../../js/companies_indexes.json",
	dataType: "json",
	success: function(data){
		companiesIndices = data;
	}
});


/* Changing the section active button, when some letter, region or industry is 
clicked, without reloading the page. */
$("#section-wrapper > nav a").click(changeSection);


if($("#current-letter").text()) {
	sortingByLetter(currentLetter);
	mainFilter = "letter";
} else if($(".current-region").text()) {
	sortingByRegion(currentRegion);
	mainFilter = "region";
} else {
	sortingByIndustry(currentIndustry);
	mainFilter = "industry";
}


additionalFilters.click(function() { 
	sortingByAddFilter($(this), mainFilter);
	return false;
});



/* Changing URL with the new section name and changing the data with the new 
section data. */
function changeSection() {
	var sectionURL = $(this).text();
	/* replace space with dash */
	sectionURL = sectionURL.replace(/\s+/g, '-') + ".html";
	window.history.pushState("object or string", "Title", sectionURL);
	
	if ($("#current-letter").text()) {
		$("#current-letter").attr("id", "");
		$(this).attr("id", "current-letter");
		currentLetter = $(this).text();
		document.title = "Companies with letter: " + currentLetter;
		$("h1").text("Companies with letter: " + currentLetter);
		sortingByLetter(currentLetter);
	
	} else if ($(".current-region").text()) {
		$(".current-region").attr("class", "");
		$(this).attr("class", "current-region");
		currentRegion = $(this).text();
		document.title = "Companies in region: " + currentRegion;
		$("h1").text("Companies in region: " + currentRegion);
		sortingByRegion(currentRegion);
	
	} else {
		$("#current-industry").attr("id", "");
		$(this).attr("id", "current-industry");
		currentIndustry = $(this).text();
		document.title = "Companies in industry: " + currentIndustry;
		$("h1").text("Companies in industry: " + currentIndustry);
		sortingByIndustry(currentIndustry);
	}

	return false;
}



/* Functions about putting all companies starting with a specific
letter, with a specific region or industry and also appending new
table rows when some of the letters/region/industries are clicked */
function sortingByLetter(letter) {
	additionalFilters.css({
		"font-weight": "normal",
		"color": "blue"
	});
	$("#section-wrapper > table > tbody").text("");
	loading.css("display", "inline");
	companiesWithCurrLetter = [];
	var newCompanyTableRow,
		companyFirstLetter,
		index;
		
	for(index = 0; index < companies.length; index += 1) {
		companyFirstLetter = companies[index].symbol[0];
		if (companyFirstLetter === letter) {
			newCompanyTableRow = "<tr><td>" + companies[index].name + "</td><td><a href='#'>" + companies[index].symbol + "</a></td><td>" + companies[index].country + "</td><td>" + companies[index].marketCap + "</td><td>" + companies[index].sector + "</td><td>" + companies[index].industry + "</td></tr>";
			$("#section-wrapper > table > tbody").append(newCompanyTableRow);
			companiesWithCurrLetter.push(companies[index]);
		}
	}
	loading.css("display", "none");
}

function sortingByRegion(region) {
	additionalFilters.css({
		"font-weight": "normal",
		"color": "blue"
	});
	$("#section-wrapper > table > tbody").text("");
	loading.css("display", "inline");
	companiesWithCurrRegion = [];
	var currentRegions = regions[currentRegion],
		newCompanyTableRow,
		index;

	for(index = 0; index < companies.length; index += 1) {
		companyCountry = companies[index].country;
		if(currentRegions.indexOf(companyCountry) !== -1) {
			newCompanyTableRow = "<tr><td>" + companies[index].name + "</td><td><a href='#'>" + companies[index].symbol + "</a></td><td>" + companies[index].country + "</td><td>" + companies[index].marketCap + "</td><td>" + companies[index].sector + "</td><td>" + companies[index].industry + "</td></tr>";
			$("#section-wrapper > table > tbody").append(newCompanyTableRow);
			companiesWithCurrRegion.push(companies[index]);
		}
	}
	loading.css("display", "none");
}

function sortingByIndustry(industry) {
	additionalFilters.css({
		"font-weight": "normal",
		"color": "blue"
	 });
	$("#section-wrapper > table > tbody").text("");
	loading.css("display", "inline");
	companiesWithCurrIndustry = [];
	var newCompanyTableRow,
		index;

	for(index = 0; index < companies.length; index += 1) {
		companyIndustry = companies[index].industry;
		if(companyIndustry === industry) {
			newCompanyTableRow = "<tr><td>" + companies[index].name + "</td><td><a href='#'>" + companies[index].symbol + "</a></td><td>" + companies[index].country + "</td><td>" + companies[index].marketCap + "</td><td>" + companies[index].sector + "</td><td>" + companies[index].industry + "</td></tr>";
			$("#section-wrapper > table > tbody").append(newCompanyTableRow);
			companiesWithCurrIndustry.push(companies[index]);
		}
	}
	loading.css("display", "none");
}



/* Sorting by additional filters. */
function sortingByAddFilter(clickedElem, mainFilter) {
	additionalFilters.css({
						"font-weight": "normal",
						"color": "blue"
					  });
	clickedElem.css({
					"font-weight": "bold",
					"color": "#ff0033"
				});

	$("#section-wrapper > table > tbody").text("");
	loading.css("display", "inline");

	var filter = clickedElem.attr("class"),
		content = clickedElem.text(),
		index,
		companyContent,
		newCompanyTableRow,
		currSectionCompanies;

	if (mainFilter === "region") {
		currSectionCompanies = companiesWithCurrRegion;
	} else if (mainFilter === "letter") {
		currSectionCompanies = companiesWithCurrLetter;
	} else {
		currSectionCompanies = companiesWithCurrIndustry;
	}

	if(filter === "market-cap") {
		switch(content) {
			case "Above 300 M.": sortByMarketCap("Above300M", currSectionCompanies); break;
			case "To 200 M.": sortByMarketCap("To200M", currSectionCompanies); break;
			case "Below 200 M.": sortByMarketCap("Below200M", currSectionCompanies); break;
		}
	}
	
	for(index = 0; index < currSectionCompanies.length; index += 1) {
		companyContent = currSectionCompanies[index][filter];
		if(companyContent === content) {
			newCompanyTableRow = "<tr><td>" + currSectionCompanies[index].name + "</td><td><a href='#'>" + currSectionCompanies[index].symbol + "</a></td><td>" + currSectionCompanies[index].country + "</td><td>" + currSectionCompanies[index].marketCap + "</td><td>" + currSectionCompanies[index].sector + "</td><td>" + currSectionCompanies[index].industry + "</td></tr>";
			$("#section-wrapper > table > tbody").append(newCompanyTableRow);
		}
	}
	loading.css("display", "none");
	return false;
}



/* Function for sorting by Market Cap */
function sortByMarketCap(criterion, companiesForFiltering) {
	var index,
		tableRowByMarketCap,
		companyMarketCapValue;
	if (criterion === "Above300M") {
		for(index = 0; index < companiesForFiltering.length; index += 1) {
			companyMarketCapValue = companiesForFiltering[index].marketCap;
			if(companyMarketCapValue > 300000000) {
				tableRowByMarketCap = "<tr><td>" + companiesForFiltering[index].name + "</td><td><a href='#'>" + companiesForFiltering[index].symbol + "</a></td><td>" + companiesForFiltering[index].country + "</td><td>" + companiesForFiltering[index].marketCap + "</td><td>" + companiesForFiltering[index].sector + "</td><td>" + companiesForFiltering[index].industry + "</td></tr>";
				$("#section-wrapper > table > tbody").append(tableRowByMarketCap);
			}
		}
	} else if (criterion === "To200M") {
		for(index = 0; index < companiesForFiltering.length; index += 1) {
			companyMarketCapValue = companiesForFiltering[index].marketCap;
			if(companyMarketCapValue <= 200000000) {
				tableRowByMarketCap = "<tr><td>" + companiesForFiltering[index].name + "</td><td><a href='#'>" + companiesForFiltering[index].symbol + "</a></td><td>" + companiesForFiltering[index].country + "</td><td>" + companiesForFiltering[index].marketCap + "</td><td>" + companiesForFiltering[index].sector + "</td><td>" + companiesForFiltering[index].industry + "</td></tr>";
				$("#section-wrapper > table > tbody").append(tableRowByMarketCap);
			}
		}
	} else {
		for(index = 0; index < companiesForFiltering.length; index += 1) {
			companyMarketCapValue = companiesForFiltering[index].marketCap;
			if(companyMarketCapValue < 200000000) {
				tableRowByMarketCap = "<tr><td>" + companiesForFiltering[index].name + "</td><td><a href='#'>" + companiesForFiltering[index].symbol + "</a></td><td>" + companiesForFiltering[index].country + "</td><td>" + companiesForFiltering[index].marketCap + "</td><td>" + companiesForFiltering[index].sector + "</td><td>" + companiesForFiltering[index].industry + "</td></tr>";
				$("#section-wrapper > table > tbody").append(tableRowByMarketCap);
			}
		}
	}
}



/* Showing additional indices for a certain company. */
$("body").on("click", "td > a", function(){
	var trParentIndex = $(this).parents("tr").index(),
		windowScrollPos = $(window).scrollTop() + 70,
		currCompanyByIndex;
	currCompanyCategory = mainFilter === "letter" ? 
						 companiesWithCurrLetter : mainFilter === "region" ? 
						 companiesWithCurrRegion : companiesWithCurrIndustry;
	currCompanyIndex =  currCompanyCategory[trParentIndex].companyId;
	currCompanyByIndex = companiesIndices[currCompanyIndex - 1];
	
	var currCompanyIndices = [
			currCompanyByIndex.Ask, currCompanyByIndex.Bid,
			currCompanyByIndex.PercentChange, currCompanyByIndex.MarketCapitalization,
			currCompanyByIndex.Open, currCompanyByIndex.Changee,
			currCompanyByIndex.LastTradeDate, currCompanyByIndex.DaysLow,
			currCompanyByIndex.DaysHigh, currCompanyByIndex.YearLow,
			currCompanyByIndex.YearHigh, currCompanyByIndex.EBITDA,
			currCompanyByIndex.BookValue, currCompanyByIndex.PriceBook,
			currCompanyByIndex.PriceSales
		],
		index = 0,
		value;
	
	$("#compIndicesWrapper").css("display", "block");
	$("#cancel-icon").css("top", windowScrollPos - 20);
	$("#company-indexes").css("top", windowScrollPos);

	$.each($('.dinamic'), function(){
		value = currCompanyIndices[index];
		if (value === null) {
			value = "n/a";
		}
		$(this).text(value);
		index++;
	});

	return false;
});

/* Cancel the additional indices view. */
$("#company-indexes").click(function(){
	return false;
});
$("#compIndicesWrapper").click(function(){
	$(this).css("display", "none");
});


/* !!!!!!!!!!!!!! */
// To make all letters, regions and industries pages to be like A letter page.
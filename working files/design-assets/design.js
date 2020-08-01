$(document).ready(function () {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	let selectedCategory;
	const optionsContainer = $('div.options-container');

	const pastDiv = $('div#past-div');

	// Selectors for nav buttons
	const homeBtn = $('a#home-link');
	const pastBtn = $('a#past-link');

	// for testing only - hide and show different divs
	const showSearchBtn = $('#show-search');

	// Home button



	$('#search-btn').on('click', function () {
		event.preventDefault();
		selectedCategory = $('#meal-category').val();
		$.ajax({ // this ajax call will display recipes in a selected cattagory
			url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory,
			method: "GET",
		})
			.then(function (responseRecipeSelection) {
				var b = responseRecipeSelection.meals
				b.forEach(function (displayoptions) {

					const mealId = displayoptions.idMeal
					let mealLink = ""

					const mealRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;

					$.ajax({ //this ajax call gets the URL for the recipe I wrote the HTML inside this, to get the URL before I write the HTML
						url: mealRecipe,
						method: "GET",
					})
						.then(function (mealDisplay) {
							mealLink = mealDisplay.meals[0].strSource
							const optionsDiv = $('<div>').addClass('options col s12 m3');
							const optionsCard = $('<div>').addClass('card');
							const optionsCardImgDiv = $('<div>').addClass('card-imgage');
							const optionsImg = $('<img>').attr('src', displayoptions.strMealThumb).attr('alt', displayoptions.strMeal).width('100%');
							const addButton = $('<a>').addClass('btn-floating halfway-fab waves-effect waves-light red');
							const addIcon = $('<i>').addClass('material-icons').text('add');
							const optionsTextDiv = $('<div>').addClass('history-text card-content');
							const optionsMealName = $('<span>').addClass('meal-name card-title').text(displayoptions.strMeal);
							const recipeLinkDiv = $('<div>').addClass('card-action');
							const addLinkButton = $('<a>').attr("href", mealLink).text('View Recipe');

							optionsTextDiv.append(optionsMealName);
							addButton.append(addIcon)
							optionsCardImgDiv.append(optionsImg, addButton);
							recipeLinkDiv.append(addLinkButton)
							optionsCard.append(optionsCardImgDiv, optionsTextDiv, recipeLinkDiv);
							optionsDiv.append(optionsCard);
							optionsContainer.append(optionsDiv);
						});


				});

			});
	});



	showGameBtn.on('click', function () {
		hideShow(gameDiv);
	});

	showSearchBtn.on('click', function () {
		hideShow(searchDiv);
	});

	showPastBtn.on('click', function () {
		hideShow(pastDiv);
    
	homeBtn.on('click', function() {
		gameDiv.removeClass('hide');
		searchDiv.addClass('hide');
		pastDiv.addClass('hide');
	});

	// Past Meals button

	pastBtn.on('click', function() {
		pastDiv.removeClass('hide');
		searchDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	$('#search-btn').on('click', function() {
		event.preventDefault();
		console.log($('#meal-category').val());
	});

	// for testing only
	showSearchBtn.on('click', function() {
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});
})

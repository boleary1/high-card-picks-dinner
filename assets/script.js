$(document).ready(function() {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	const optionsContainer = $('div.options-container');
	const pastDiv = $('div#past-div');
	const winnerNameEl = $('span#winner-name');
	// Selectors for nav buttons
	const homeBtn = $('a#home-link');
	const pastBtn = $('a#past-link');

	// ****** for testing only - hide and show different divs ***** DELETE when done testing
	const showSearchBtn = $('#show-search');

	// Selector for pick recipe buttons

	const optionsContainerEl = $('div.options-container');

	// Nav buttons

	// Home Button

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

	// ******** for testing only ********* DELETE when done testing
	showSearchBtn.on('click', function() {
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// Store Picked Meal

	let pickedMeal = {};

	// ******************** Put Game Code Here **********************

	let winnerName = 'Molly';
	pickedMeal.Name = winnerName;

	// *********** Game code above **********************

	// ******** for testing only ********* DELETE when done testing
	showSearchBtn.on('click', function() {
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
		winnerNameEl.text(winnerName);
	});

	// Search button event handler

	let selectedCategory;

	$('#search-btn').on('click', function() {
		event.preventDefault();
		selectedCategory = $('#meal-category').val();
		$.ajax({
			// this ajax call will display recipes in a selected cattagory
			url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + selectedCategory,
			method: 'GET'
		}).then(function(responseRecipeSelection) {
			let b = responseRecipeSelection.meals;
			b.forEach(function(displayoptions) {
				const mealId = displayoptions.idMeal;
				let mealLink = '';

				const mealRecipe = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId;

				$.ajax({
					//this ajax call gets the URL for the recipe I wrote the HTML inside this, to get the URL before I write the HTML
					url: mealRecipe,
					method: 'GET'
				}).then(function(mealDisplay) {
					mealLink = mealDisplay.meals[0].strSource;
					const optionsDiv = $('<div>').addClass('options col s12 m3');
					const optionsCard = $('<div>').addClass('card');
					const optionsCardImgDiv = $('<div>').addClass('card-image');
					const optionsImg = $('<img>')
						.attr('src', displayoptions.strMealThumb)
						.attr('alt', displayoptions.strMeal)
						.width('100%');
					const addButton = $('<a>').addClass(
						'btn-floating halfway-fab waves-effect waves-light red pick-recipe-btn'
					);
					const addIcon = $('<i>').addClass('material-icons').text('add');
					const optionsTextDiv = $('<div>').addClass('history-text card-content');
					const optionsMealName = $('<span>').addClass('meal-name card-title').text(displayoptions.strMeal);
					const recipeLinkDiv = $('<div>').addClass('card-action');
					const addLinkButton = $('<a>').attr('href', mealLink).attr('target', '_blank').text('View Recipe');

					optionsTextDiv.append(optionsMealName);
					addButton.append(addIcon);
					optionsCardImgDiv.append(optionsImg, addButton);
					recipeLinkDiv.append(addLinkButton);
					optionsCard.append(optionsCardImgDiv, optionsTextDiv, recipeLinkDiv);
					optionsDiv.append(optionsCard);
					optionsContainer.append(optionsDiv);
				});
			});
		});
	});

	// Pick Recipe Button event handler

	optionsContainer.on('click', 'a.pick-recipe-btn', function(event) {
		pickedMeal.ImgURL = $(this).siblings()[0].src;
		pickedMeal.Date = moment().format('L');
		pickedMeal.Meal = $(this).parent().siblings().children()[0].outerText;
		pickedMeal.RecipeLink = $(this).parent().siblings().children()[1].href;
		console.log(pickedMeal);
	});

	// Materialize JavaScript Initializations

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});

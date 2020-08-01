$(document).ready(function () {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	const optionsContainer = $('div.options-container');
	const pastDiv = $('div#past-div');
	const winnerNameEl = $('span#winner-name');
	const historyContainer = $('#past-recipe-cards');
	// Selectors for nav buttons
	const homeBtn = $('a.home-link');
	const pastBtn = $('a.past-link');

	// ****** for testing only - hide and show different divs ***** DELETE when done testing
	const showSearchBtn = $('a.search-link');

	// array to be used to store the information which will be saves in local storage
	let historyData = [];

	// Store Picked Meal

	let pickedMeal = {};

	// ******************** Put Game Code Here **********************

	let winnerName = 'The Chef';
	pickedMeal.Name = winnerName;

	// *********** Game code above **********************

	// ******** for testing only ********* DELETE when done testing
	showSearchBtn.on('click', function () {
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
		winnerName = 'The Chef';
		winnerNameEl.text(winnerName);
	});

	// Search button event handler

	let selectedCategory;



	$('#search-btn').on('click', function () {
		event.preventDefault();
		selectedCategory = $('#meal-category').val();
		$.ajax({
			// this ajax call will display recipes in a selected cattagory
			url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + selectedCategory,
			method: 'GET'
		}).then(function (responseRecipeSelection) {
			let b = responseRecipeSelection.meals;
			b.forEach(function (displayoptions) {
				const mealId = displayoptions.idMeal;
				let mealLink = '';

				const mealRecipe = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId;

				$.ajax({
					//this ajax call gets the URL for the recipe I wrote the HTML inside this, to get the URL before I write the HTML
					url: mealRecipe,
					method: 'GET'
				}).then(function (mealDisplay) {
					if (mealDisplay.meals[0].strSource == "" || mealDisplay.meals[0].strSource == null) { //checks if the recipe link is invalid
						if (mealDisplay.meals[0].strYoutube == "" || mealDisplay.meals[0].strYoutube == null) { //if the youtube link is invalid it completes a google search
							const str = ((mealDisplay.meals[0].strMeal).split(' ').join('+')); //gets the string ready for google search
							mealLink = ("https://www.google.com/search?q=" + str); //writes URL
						}
						else {
							mealLink = mealDisplay.meals[0].strYoutube; //displays youtube link
						}
					}
					else {
						mealLink = mealDisplay.meals[0].strSource; //displays recipe link
					}


					const optionsDiv = $('<div>').addClass('options col s12 m6 l3');
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
					const addLinkButton = $('<a>').attr('href', mealLink).attr('target', '_blank').text('View Recipe'); //link to external website with recipe.  Tried for the website link, youtube link, then a google search.

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

	// Meal history code starts here, including save function

	// Gets info from local storage and stores it in the historyData variable if there is any available.
	function getHistory() {
		historyData = JSON.parse(localStorage.getItem('historyKEY')) || [{ Name: "", Meal: "", Date: "", ImgURL: "", RecipeLink: "" }];
	};

	function populateHistory() {
		// If history data exists, create a card for each object and add the img, meal name, who picked it, date, and link
		if (historyData[0].Name) {
			historyContainer.empty();
			historyData.forEach(function (object) {
				const historyDiv = $('<div>').addClass('col s12 m6 l3'); //Changed these classes a little
				const historyCard = $('<div>').addClass('card');
				const cardImgDiv = $('<div>').addClass('card-img');
				const img = $('<img>').attr('src', object.ImgURL).attr('alt', object.Meal).addClass('past-recipe-img').width('100%');
				const cardContentDiv = $('<div>').addClass('card-content');
				const mealName = $('<p>').addClass('card-title past-recipe-name').text(object.Meal);
				const whoPickedPara = $('<p>').text('Picked by: ');
				const pickedBySpan = $('<span>').addClass('green-text past-picked-by').text(object.Name);
				const date = $('<p>').addClass('past-date').text(object.Date);
				const linkDiv = $('<div>').addClass('card-action');
				const pastRecipeLink = $('<a>').addClass('past-recipe-link').attr('href', object.RecipeLink).attr('target', '_blank').text('View Recipe');

				whoPickedPara.append(pickedBySpan);
				cardContentDiv.append(mealName, whoPickedPara, date);
				cardImgDiv.append(img);
				linkDiv.append(pastRecipeLink);
				historyCard.append(cardImgDiv, cardContentDiv, linkDiv);
				historyDiv.append(historyCard);
				historyContainer.append(historyDiv);
			});
		}
	};

	// Stores meal info in local storage
	// Format of newObj: {Name: "Molly", ImgURL: "https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg", Date: "07/31/2020", Meal: "Bean & Sausage Hotpot", RecipeLink: "https://www.bbcgoodfood.com/recipes/339607/bean-and-sausage-hotpot"}
	// when called, call with pickedMeal
	function saveMeal(newObj) {
		// If the name in the first history object is blank, set the historyData to the new object; otherwise, ad the new object to the array
		if (!historyData[0].Name) {
			historyData = [newObj];
		} else {
			historyData.push(newObj);
		}
		localStorage.setItem('historyKEY', JSON.stringify(historyData));
	};

	// Nav buttons

	// Home Button

	homeBtn.on('click', function () {
		gameDiv.removeClass('hide');
		searchDiv.addClass('hide');
		pastDiv.addClass('hide');
	});

	// Past Meals button

	pastBtn.on('click', function () {
		getHistory();
		populateHistory();
		pastDiv.removeClass('hide');
		searchDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// ******** for testing only ********* DELETE when done testing
	showSearchBtn.on('click', function () {
		optionsContainer.empty();
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// Pick Recipe Button event handler

	optionsContainer.on('click', 'a.pick-recipe-btn', function (event) {
		pickedMeal.ImgURL = $(this).siblings()[0].src;
		pickedMeal.Date = moment().format('L');
		pickedMeal.Meal = $(this).parent().siblings().children()[0].outerText;
		pickedMeal.RecipeLink = $(this).parent().siblings().children()[1].href;
		getHistory();
		saveMeal(pickedMeal);
		populateHistory();
		pastDiv.removeClass('hide');
		searchDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// Materialize JavaScript Initializations

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});

$(document).ready(function () {

	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	const optionsContainer = $('div.options-container');
	const pastDiv = $('div#past-div');
	const winnerNameEl = $('span#winner-name');
	const historyContainer = $('#past-recipe-cards');
	const pickerName = $('#picker-name');
	const pickerNameBtn = $('#picker-name-submit');
	const winnersCircleBtn = $('#winners-circle-btn');

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

	let winnerName = '';


	let newDeck = [];
	let p1Card = [];
	let p2Card = [];
	let score = [];
	let score1 = 0;
	let score2 = 0;
	const p1NameEl = $('#p1-name-input');
	const p2NameEl = $('#p2-name-input');
	let p1Name
	let p2Name

	$('#submit-start').click(function () {
		p1Name = p1NameEl.val()
		p2Name = p2NameEl.val()
		$('#p1-name').html(p1Name);
		$('#p2-name').html(p2Name);
		$('#deal-btn').removeClass("hide");

	})
	$('#deal-btn').click(function () {


		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/new/draw/?count=52",
			method: "GET"
		})
			.then(function (response) {

				let newDeck = response.cards;

				for (var i = 0; i < newDeck.length; i++) {
					if (newDeck[i].value === "JACK") {
						newDeck[i].value = 11;
					}
					if (newDeck[i].value === "QUEEN") {
						newDeck[i].value = 12;
					}
					if (newDeck[i].value === "KING") {
						newDeck[i].value = 13;
					}
					if (newDeck[i].value === "ACE") {
						newDeck[i].value = 14;
					}
					if (newDeck[i].value != "KING" && newDeck[i].value != "QUEEN" && newDeck[i].value != "JACK" && newDeck[i].value != "ACE") {
						newDeck[i].value = parseInt(newDeck[i].value);
					}
				}

				p1Card.length = 0
				p1Card.push(newDeck[0])
				p2Card.length = 0
				p2Card.push(newDeck[1])

				$("#p1-card").attr("src", p1Card[0].image);
				$("#p2-card").attr("src", p2Card[0].image);

				if (p1Card[0].value > p2Card[0].value) {
					score1++;

				} else if (p1Card[0].value < p2Card[0].value) {
					score2++;

				}
				$("#p1-score").html(score1.toString());
				$("#p2-score").html(score2.toString());
				if (score1 === 5) {
					winnerName = p1Name;
					resetVars()
					endgame();
				} else if (score2 === 5) {
					winnerName = p2Name;
					resetVars()
					endgame();

				}

				function resetVars() {
					score1 = 0;
					score2 = 0;
					p1Name = "Player 1";
					p2Name = "Player 2";
					$("#p1-score").html(score1.toString());
					$("#p2-score").html(score2.toString());
					$('#p1-name').html(p1Name);
					$('#p2-name').html(p2Name);
				}

				function endgame() {
					$('#search-div').removeClass('hide');
					$('#game-div').addClass('hide');
					$('#winner-name').text(winnerName);
					$('#winner-modal-display').text(winnerName);
					$('#won-modal').modal('open');
				}



			})
	})




	// *********** Game code above **********************



	// Search button event handler

	let selectedCategory;

	$('#search-btn').on('click', function () {
		event.preventDefault();
		optionsContainer.empty(); //clear out last search

		selectedCategory = $('#meal-category').val();
		$.ajax({
			// this ajax call will display recipes in a selected cattagory
			url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + selectedCategory,
			method: 'GET'
		}).then(function (responseRecipeSelection) {
			let b = responseRecipeSelection.meals; //creates an array of meal options in a category
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
						if (mealDisplay.meals[0].strYoutube == "" || mealDisplay.meals[0].strYoutube == null) { //if the recipe link isn't valid,  check for a youtube link
							const str = ((mealDisplay.meals[0].strMeal).split(' ').join('+')); // if there is no recipe link or youtube link, then google the recipe name.
							mealLink = ("https://www.google.com/search?q=" + str); //writes URL
						}
						else {
							mealLink = mealDisplay.meals[0].strYoutube; //displays youtube link
						}
					}
					else {
						mealLink = mealDisplay.meals[0].strSource; //displays recipe link
					}

					//********************declaring variables to help write the cards *****************************
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
					//*************dynamically creating cards for meal options *************
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

	// ******** Meal history code starts here, including save function ********

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
				//******************* */ dynamically create cards for the meal history.**********************
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

	// ****** Chart stuff starts here ********

	const ctx = document.getElementById('past-winners-chart').getContext('2d');

	function generateChart() {

		//Creates an array of all the names from the historyData (stored in mem)
		let names = [];
		historyData.forEach(function (obj) {
			names.push(obj.Name)
		});

		// Takes an array of the winners, and puts the name of each winner in the object once as well as how many times they've won
		function howManyWins(array) {
			let winCounts = {}
			array.forEach(function (name) {
				winCounts[name] = (winCounts[name] || 0) + 1;
			});
			return winCounts;
		}

		//Data for chart would come from historyData
		// Labels: names, data would be the number of times a name was in the dataHistory
		// store in an object
		let historyChart = howManyWins(names);  // Format: {name: wins}

		// Chart settings
		var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'doughnut',

			// The data for our dataset
			data: {
				labels: Object.keys(historyChart),
				datasets: [{
					label: 'Wins',
					backgroundColor: ['#005800', '#FBBC0D', '#D30206', '#D85701', '#321372', '#446C60', '#192C37'],
					borderColor: 'black',
					data: Object.values(historyChart)
				}]
			},

			// Configuration options go here
			options: {
				legend: {
					labels: {
						// This more specific font property overrides the global property
						fontColor: 'black'
					}
				}
			}
		});
	}


	// ****** Nav button click handlers start here ******

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

	// Search Meals Button - Keep or not after game is done?

	showSearchBtn.on('click', function () {
		searchDiv.removeClass('hide');
		pastDiv.addClass('hide');
		gameDiv.addClass('hide');
		$('#search-modal').modal('open');
	});

	// Name Picker in Modal OK Button - Keep or not after game is done?

	pickerNameBtn.on("click", function () {
		winnerName = pickerName.val();
		winnerNameEl.text(winnerName);
		pickerName.val('');
	});

	winnersCircleBtn.on('click', function () {
		generateChart();
		$('#winners-modal').modal('open');
	})


	// Pick Recipe Button event handler

	optionsContainer.on('click', 'a.pick-recipe-btn', function (event) {
		pickedMeal.ImgURL = $(this).siblings()[0].src;
		pickedMeal.Date = moment().format('L');
		pickedMeal.Meal = $(this).parent().siblings().children()[0].outerText;
		pickedMeal.RecipeLink = $(this).parent().siblings().children()[1].href;
		console.log(winnerName);
		pickedMeal.Name = winnerName;
		getHistory();
		saveMeal(pickedMeal);
		populateHistory();
		pastDiv.removeClass('hide');
		searchDiv.addClass('hide');
		gameDiv.addClass('hide');
	});

	// ******* Initialize App Section *********

	getHistory();

	// Materialize JavaScript Initializations

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();


});

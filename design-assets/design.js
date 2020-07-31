$(document).ready(function () {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	let selectedCategory;
	// var recipeSelection = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory;

	const pastDiv = $('div#past-div');

	// for testing only - hide and show different divs
	const showGameBtn = $('#show-game');
	const showSearchBtn = $('#show-search');
	const showPastBtn = $('#show-past');

	function hideShow(element) {
		element.toggleClass('hide');
	}

	$('#search-btn').on('click', function () {
		event.preventDefault();
		console.log($('#meal-category').val());
		selectedCategory = $('#meal-category').val();
		console.log("selected category " + selectedCategory);
		$.ajax({ // this ajax call will display recipes in a selected cattagory
			url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory,
			method: "GET",
		})
			.then(function (responseRecipeSelection) {
				// console.log(responserecipeSelection)
				var b = responseRecipeSelection.meals
				// console.log(b)
				b.forEach(function (displayoptions) {
					$(".cityCurrent").html(); //add city and date

					// console.log(displayoptions.idMeal);
					console.log(displayoptions.strMeal);
					// console.log(displayoptions.strMealThumb);

				});

			});
	});



	showGameBtn.on('click', function () {
		hideShow(gameDiv);
	});

	showSearchBtn.on('click', function () {
		hideShow(searchDiv);
	});

	showPastBtn.on('click', function() {
		hideShow(pastDiv);
	});

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});

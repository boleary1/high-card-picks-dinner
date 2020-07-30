$(document).ready(function() {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');

	// for testing only - hide and show different divs
	const showGameBtn = $('#show-game');
	const showSearchBtn = $('#show-search');

	function hideShow(element) {
		element.toggleClass('hide');
	}

	$('#search-btn').on('click', function() {
		event.preventDefault();
		console.log($('#meal-category').val());
	});

	showGameBtn.on('click', function() {
		hideShow(gameDiv);
	});

	showSearchBtn.on('click', function() {
		hideShow(searchDiv);
	});

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});

$(document).ready(function() {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');
	const searchDiv = $('div#search-div');
	const pastDiv = $('div#past-div');

	// Selectors for nav buttons
	const homeBtn = $('a#home-link');
	const pastBtn = $('a#past-link');

	// for testing only - hide and show different divs
	const showSearchBtn = $('#show-search');

	// Home button

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

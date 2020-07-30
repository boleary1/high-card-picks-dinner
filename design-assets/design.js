$(document).ready(function() {
	// Selectors for main divs - game, recipe search, meal history
	const gameDiv = $('div#game-div');
	const startBtn = $('button#start-btn');

	// for testing only - hide and show different divs
	const hideGameBtn = $('#hide-game');

	function hideShow(element) {
		element.toggleClass('hide');
	}

	hideGameBtn.on('click', function() {
		hideShow(gameDiv);
	});

	// Materialize Side Nav Menu for Mobile
	$('.sidenav').sidenav();

	// Materialize Initialization for Modal
	$('.modal').modal();

	// Materialize Initialization for Select
	$('select').formSelect();
});

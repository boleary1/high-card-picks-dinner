$(document).ready(function () {

    // Selectors for main divs - game, recipe search, meal history
    const gameDiv = $('div#game-div')

    // for testing only - hide and show different divs
    const hideGameBtn = $('#hide-game')

    function hideShow(element) {
        element.toggleClass("hide");
    }

    hideGameBtn.on("click", function () {
        hideShow(gameDiv);
    })

    // Materialize Side Nav Menu for Mobile
    $('.sidenav').sidenav();




});
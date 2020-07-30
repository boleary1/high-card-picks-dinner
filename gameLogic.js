$(document).ready()
    //array of drawn cards for each match, draw all 52 then choose from array to avoid multiple api calls?
let newDeck = [];
let gameCards = [];
let p1Card = [];
let p2Card = [];
let score1 = 0;
let score2 = 0;
let score = [];



$('#deal-btn').click(function() {


    $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/draw/?count=52",
            method: "GET"
        })
        .then(function(response) {
            console.log(response)

            let newDeck = response.cards;
            console.log(newDeck)

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
            gameCards = newDeck;
            console.log(gameCards)

            p1Card.length = 0
            p1Card.push(newDeck[0])
            p2Card.length = 0
            p2Card.push(newDeck[1])

            console.log(p1Card.suit)
            $("#p1-card").attr("src", p1Card.image);
        })

})
$(document).ready()
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
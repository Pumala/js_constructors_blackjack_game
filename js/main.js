$(document).ready(function() {

  $("#deal-button").click(function() {

    // // shuffle the deck
    // myDeck.shuffle();

    deal('player');
    deal('dealer');
    deal('player');
    deal('dealer');

    // disable the deal button
    // only deal once per game
    $("#deal-button").prop('disabled', true);

    // undisable hit and stand buttons
    $("#hit-button").prop('disabled', false);
    $("#stand-button").prop('disabled', false);

    // check if dealer gets blackjack
    dealerGetsBlackjack();

  });

  $("#hit-button").click(function() {

    deal('player');

    // check if player busts or not
    playerBusts()

  });

  $("#stand-button").click(function() {
    getWinner();

  });

  $("#reset-button").click(function() {

    resetGame();

  });

});

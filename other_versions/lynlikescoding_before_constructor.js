function newDeck() {
  var deck = [];
  for (var i = 0; i < 4; i++) {
    var suit = {
      0: 'hearts',
      1: 'diamonds',
      2: 'clubs',
      3: 'spades'
    }
    for (var k = 1; k <= 13; k++) {
      deck.push(
        { point: k, suit: suit[i] }
      );
    }
  }
  return(deck);
}

$(document).ready(function() {
  var deck = newDeck();
  var dealerPoints = [];
  var playerPoints = [];
  var usedCards = [];

  function randomCardGenerator(handSelector) {

    var length = deck.length;
    var randomNum52 = Math.floor(Math.random() * length);
    var randomCard1 = deck[randomNum52];
    var cardValue1 = randomCard1.point;
    var cardSuit1 = randomCard1.suit;

    usedCards.push(randomCard1);
    deck.splice(randomNum52, 1)

    if (cardValue1 === 11) {
      cardValue1 = 'jack';
    } else if (cardValue1 === 12) {
      cardValue1 = 'queen'
    } else if (cardValue1 === 13) {
      cardValue1 = 'king'
    } else if (cardValue1 === 1) {
      cardValue1 = 'ace';
    }
    var hand = "";
    if (handSelector === "player") {
      hand = playerPoints;
    } else {
      hand = dealerPoints;
    }
    hand.push(randomCard1);

    $("#" + handSelector + "-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
    $('#' + handSelector + '-points').text(calculatePoints(hand));
  }

  $("#deal-button").click(function() {

    randomCardGenerator('player');
    randomCardGenerator('dealer');
    randomCardGenerator('player');
    randomCardGenerator('dealer');

    $(this).prop('disabled', true);

  });

  function calculatePoints(cards) {
  var sum2Cards = cards.map(function(card) {
    if (card.point > 10) {
      card.point = 10;
    }
    return card.point
  }).reduce(function(a, b) {
    return a + b;
  });
  return sum2Cards;
}

  $("#hit-button").click(function() {

    randomCardGenerator('player');

    var currPlayerPoints = calculatePoints(playerPoints);
    $('#player-points').text(currPlayerPoints);
    if (currPlayerPoints > 21) {
      $("#messages").text("BIG BUST!!");
      $("#hit-button").prop('disabled', true);
      $("#stand-button").prop('disabled', true);
    }
  });

  $("#stand-button").click(function() {
    var currDealerPoints = calculatePoints(dealerPoints);
    var currPlayerPoints = calculatePoints(playerPoints);
    while (currDealerPoints < 17) {

      randomCardGenerator('dealer');

      currDealerPoints += dealerPoints[dealerPoints.length - 1].point;
      $('#dealer-points').text(currDealerPoints);
      if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
        $('#messages').text("Dealer Wins!");
      } else if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
        $('#messages').text("You Win!");
      }
        else if(currDealerPoints > 21) {
          $('#messages').text("Dealer Busted!");
        }
    }
    if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
      $('#messages').text("You Win!");
    }
    if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
      $('#messages').text("Dealer Wins!");
    }
    if(currDealerPoints === currPlayerPoints) {
    $('#messages').text("Push!");
    }

    $("#hit-button").prop('disabled', true);

  });

  $("#reset-button").click(function() {
    $("#deal-button").prop('disabled', false);
    $("#hit-button").prop('disabled', false);
    $("#stand-button").prop('disabled', false);

    $("#player-hand").empty();
    $("#dealer-hand").empty();
    $('#player-points').text("");
    $('#dealer-points').text("");
    $('#messages').text("");

    deck = newDeck();
    dealerPoints = [];
    playerPoints = [];

    usedCards.forEach(function(card) {
      deck.push(card);
    });
    usedCards = [];

  });

});

var deck = [
  { point: 1, suit: 'hearts'},
  { point: 2, suit: 'hearts'},
  { point: 3, suit: 'hearts'},
  { point: 4, suit: 'hearts'},
  { point: 5, suit: 'hearts'},
  { point: 6, suit: 'hearts'},
  { point: 7, suit: 'hearts'},
  { point: 8, suit: 'hearts'},
  { point: 9, suit: 'hearts'},
  { point: 10, suit: 'hearts'},
  { point: 11, suit: 'hearts'},
  { point: 12, suit: 'hearts'},
  { point: 13, suit: 'hearts'},
  { point: 1, suit: 'diamonds'},
  { point: 2, suit: 'diamonds'},
  { point: 3, suit: 'diamonds'},
  { point: 4, suit: 'diamonds'},
  { point: 5, suit: 'diamonds'},
  { point: 6, suit: 'diamonds'},
  { point: 7, suit: 'diamonds'},
  { point: 8, suit: 'diamonds'},
  { point: 9, suit: 'diamonds'},
  { point: 10, suit: 'diamonds'},
  { point: 11, suit: 'diamonds'},
  { point: 12, suit: 'diamonds'},
  { point: 13, suit: 'diamonds'},
  { point: 1, suit: 'clubs'},
  { point: 2, suit: 'clubs'},
  { point: 3, suit: 'clubs'},
  { point: 4, suit: 'clubs'},
  { point: 5, suit: 'clubs'},
  { point: 6, suit: 'clubs'},
  { point: 7, suit: 'clubs'},
  { point: 8, suit: 'clubs'},
  { point: 9, suit: 'clubs'},
  { point: 10, suit: 'clubs'},
  { point: 11, suit: 'clubs'},
  { point: 12, suit: 'clubs'},
  { point: 13, suit: 'clubs'},
  { point: 1, suit: 'spades'},
  { point: 2, suit: 'spades'},
  { point: 3, suit: 'spades'},
  { point: 4, suit: 'spades'},
  { point: 5, suit: 'spades'},
  { point: 6, suit: 'spades'},
  { point: 7, suit: 'spades'},
  { point: 8, suit: 'spades'},
  { point: 9, suit: 'spades'},
  { point: 10, suit: 'spades'},
  { point: 11, suit: 'spades'},
  { point: 12, suit: 'spades'},
  { point: 13, suit: 'spades'}
];

$(document).ready(function() {

  var dealerPoints = [];
  var playerPoints = [];
  var usedCards = [];

  $("#deal-button").click(function() {

    for (var i = 0; i < 4; i++) {
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

      if (i < 2) {
        playerPoints.push(randomCard1);
        $("#player-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
      } else {
        dealerPoints.push(randomCard1);
        $("#dealer-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
      }
    }
    $('#dealer-points').text(calculatePoints(dealerPoints));
    $('#player-points').text(calculatePoints(playerPoints));
    console.log(playerPoints);
    console.log(dealerPoints);
    console.log(usedCards);
  });

  function calculatePoints(cards) {
  var sum2Cards = cards.map(function(card) {
    if (card.point === 11 || card.point === 12 || card.point === 13) {
      card.point = 10;
    }
    return card.point
  }).reduce(function(a, b) {
    return a + b;
  });
  return sum2Cards;
}


  $("#hit-button").click(function() {

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
    $("#player-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');

    playerPoints.push(randomCard1);
    var currPlayerPoints = calculatePoints(playerPoints);
    $('#player-points').text(currPlayerPoints);
    if (currPlayerPoints > 21) {
      $("#messages").text("BIG BUST!!");
    }
  });

  $("#stand-button").click(function() {
    var currDealerPoints = calculatePoints(dealerPoints);
    var currPlayerPoints = calculatePoints(playerPoints);
    while (currDealerPoints < 17) {
      var length = deck.length;
      var randomNum52 = Math.floor(Math.random() * length);
      var randomCard1 = deck[randomNum52];
      var cardValue1 = randomCard1.point;
      var cardSuit1 = randomCard1.suit;
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
      $("#dealer-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');

      dealerPoints.push(randomCard1);
      currDealerPoints += randomCard1.point;
      $('#dealer-points').text(currDealerPoints);
      console.log(currDealerPoints);
      console.log(currPlayerPoints);
      if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
        // console.log(currDealerPoints);
        // console.log(currPlayerPoints);
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
  });

  $("#reset-button").click(function() {
    $("#player-hand").empty();
    $("#dealer-hand").empty();
    $('#player-points').text("");
    $('#dealer-points').text("");
    $('#messages').text("");

    dealerPoints = [];
    playerPoints = [];

    usedCards.forEach(function(card) {
      deck.push(card);
    });
    usedCards = [];

  });

});

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
  // set counter to 0 => how many times the deal button has been clicked on
  var counter = 0;
  var usedCards = [];

  $("#deal-button").click(function() {
  var loopRuns;
  // if counter === 0, then it is the first time that the deal button has been clicked on
  if (counter === 0) {
    // run 2 loops => generate 2 random Cards
    loopRuns = 2;
  } else {
    // run 1 loop => generate 1 random Card
    loopRuns = 1;
  }
  for (var i = 0; i < loopRuns; i++) {
    var length = deck.length;
    var randomNum52 = Math.floor(Math.random() * length);
    var randomCard1 = deck[randomNum52];
    var cardValue1 = randomCard1.point;
    var cardSuit1 = randomCard1.suit;
    console.log("USED CARD: " + deck.splice(randomNum52, 1));
    if (cardValue1 === 11) {
      cardValue1 = 'jack';
    } else if (cardValue1 === 12) {
      cardValue1 = 'queen'
    } else if (cardValue1 === 13) {
      cardValue1 = 'king'
    } else if (cardValue1 === 1) {
      cardValue1 = 'ace';
    }
    console.log(deck);
    $("#player-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
  }
  counter++;
  });
  $("#hit-button").click(function() {
    $("#player-hand").append('<img class="card" src="images/9_of_clubs.png" alt="" />');
  });
});







// NEWEST VERSION

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
  // set counter to 0 => how many times the deal button has been clicked on
  var counter = 0;

  $("#deal-button").click(function() {
  var loopRuns;
  // if counter === 0, then it is the first time that the deal button has been clicked on
  if (counter === 0) {
    // run 2 loops => generate 2 random Cards
    loopRuns = 4;
  } else {
    // run 1 loop => generate 1 random Card
    loopRuns = 1;
  }
  for (var i = 0; i < loopRuns; i++) {
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
    console.log(deck);
    if (i < 2) {
      $("#player-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
    } else {
      $("#dealer-hand").append('<img class="card" src="images/' + cardValue1 + '_of_' + cardSuit1 + '.png" alt="" />');
    }
  }
  counter++;
  });
  $("#hit-button").click(function() {
    $("#player-hand").append('<img class="card" src="images/9_of_clubs.png" alt="" />');
  });
});

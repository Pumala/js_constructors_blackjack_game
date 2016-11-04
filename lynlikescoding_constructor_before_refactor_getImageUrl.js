$(document).ready(function() {

  Card = function(point, suit) {
    this.point = point;
    this.suit = suit;
  }

  Card.prototype.getImageUrl = function(handSelector) {

    // grab the first card in the deck
    var card1 = myDeck.deck[0];

    // remove that card from the deck to avoid dupicated
    myDeck.deck.splice(0, 1);

    // take that card that has now been used in a game
    // and add that to an array that stores used cards
    // to be later reinserted before new game
    usedCards.push(card1);

    // assign the card's points to a variable called point
    var point = card1.point;

    // var point = card.point;
    var suit = card1.suit;

    if (point === 11) {
      point = 'jack';
    } else if (point === 12) {
      point = 'queen';
    } else if (point === 13) {
      point = 'king'
    } else if (point === 1) {
      point = 'ace';
    }

    // whoseHand is an array of constructors (a.k.a. cards)
    var whoseHand = "";
    if (handSelector === "player") {
      whoseHand = playerHand;
    } else {
      whoseHand = dealerHand;
    }
    whoseHand.cards.push(card1);

    $("#" + handSelector + "-hand").append('<img class="card" src="images/' + point + '_of_' + suit + '.png" alt="" />');
    $('#' + handSelector + '-points').text(whoseHand.getPoints());
    // return 'images/' + point + '_of_' + this.suit + '.png';
  }

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
        deck.push(new Card( k, suit[i]) );
      }
    }
    return(deck);
  }

  function Hand() {
    this.cards = [];
    this.points = 0;

    this.getPoints = function() {
      var cards = this.cards;
      var length = this.cards.length;
      var totalPoints = 0;
      var counter = 0;

      this.points = cards.map(function(card) {
      if (card.point > 10) {
        card.point = 10;
      }
      counter++;
      if (card.point !== 1) {
        totalPoints += card.point;
      }
      if (counter === length) {
        if (totalPoints <= 10) {
          if (card.point === 1) {
            card.point = 11;
          }
        }
      }
      return card.point
      }).reduce(function(a, b) {
        return a + b;
      }, 0);
      return this.points;
    }

    this.addCard = function(newCard) {
      this.cards.push({point: newCard.point, suit: newCard.suit});
    };
  }

  function Deck() {
    this.deck = newDeck();
    this.usedCards = [];

    this.draw = function() {
      var drawnCard = this.deck[0];

      this.usedCards.push(drawnCard);
      this.usedCards.push(this.deck.splice(0, 1));
      console.log(drawnCard);
      return drawnCard;
    }
    this.shuffle = function() {
      var array = this.deck;
      var i = 0, j = 0, temp = null;

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      this.deck = array;
      return this.deck;
    }
    this.numCardsLeft = function() {
      return this.deck.length;
    }
  }

  // create a new deck of cards
  // it's a global variable so
  // all the local scopes can access it
  var myDeck = new Deck();

  // create 2 new instances of hand
  // one for player
  // other for dealer
  var dealerHand = new Hand();
  var playerHand = new Hand();

  // create an empty array
  // which will be used later to store
  // all the cards that have been in a hand
  // to avoid duplicates in a game
  var usedCards = [];

  // when player clicks on the deal button
  // deal two cards to the dealer and player
  // the deck of cards has already been shuffled at this point
  // dealing order => 1 card to dealer, then 1 card to player,
  // then 1 more card to dealer, and 1 more card to player

  $("#deal-button").click(function() {

    // shuffle the deck
    myDeck.shuffle();

    // // grab the first card in the deck
    // var card1 = myDeck.deck[0];
    //
    // // remove that card from the deck to avoid dupicated
    // myDeck.deck.splice(0, 1);
    //
    // // take that card that has now been used in a game
    // // and add that to an array that stores used cards
    // // to be later reinserted before new game
    // usedCards.push(card1);
    //
    // // assign the card's points to a variable called point
    // var point = card1.point;

    myDeck.deck[0].getImageUrl('player');
    myDeck.deck[0].getImageUrl('dealer');
    myDeck.deck[0].getImageUrl('player');
    myDeck.deck[0].getImageUrl('dealer');

    $("#deal-button").prop('disabled', true);
  });

  $("#hit-button").click(function() {
    myDeck.deck[0].getImageUrl('player');

    // check if player has Busted
    if (playerHand.getPoints() > 21) {
      $('#messages').text("You busted!");
      $("#hit-button").prop('disabled', true);
      $("#stand-button").prop('disabled', true);
    }
  });

  $("#stand-button").click(function() {

    // check if dealer has a minimum of 17
    if (dealerHand.getPoints() < 16) {
      while(dealerHand < 16) {
        myDeck.deck[0].getImageUrl('dealer');
      }
    }

    if (dealerHand.getPoints() === playerHand().getPoints) {
      $('#messages').text("It's a push!");
    }

  });

});

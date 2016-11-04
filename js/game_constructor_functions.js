// $(document).ready(function() {

  // create Card Constructor
  Card = function(point, suit) {
    this.point = point;
    this.suit = suit;
  }

  Card.prototype.getImageUrl = function() {

    var point = this.point;
    var suit = this.suit;

    if (point === 11) {
      point = 'jack';
    } else if (point === 12) {
      point = 'queen';
    } else if (point === 13) {
      point = 'king'
    } else if (point === 1) {
      point = 'ace';
    }

    return 'images/' + point + '_of_' + suit + '.png';
  }

  // create Hand Constructor
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

  // Create Deck Constructor
  function Deck() {
    this.deck = newDeck();
    this.usedCards = [];

    this.draw = function() {
      var drawnCard = this.deck[0];

      this.usedCards.push(drawnCard);
      this.deck.splice(0, 1);

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

  function deal(handSelector) {

    // draw the first card from the deck
    var myCard = myDeck.draw();

    // render the image on the page
    $("#"+ handSelector +"-hand").append('<img class="card" src="' + myCard.getImageUrl() + '" alt="" />');

    // check who is the current Hand Selector
    if (handSelector === "player") {
      hand = playerHand;
    } else {
      hand = dealerHand;
    }

    // add the card to the current Hand Selector's cards
    hand.cards.push(myCard);

    // update the Hand Selector's points
    $('#' + handSelector + '-points').text(hand.getPoints());

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

  function getWinner() {
    var message = "";

    // check if dealer has a minimum of 17
    if (dealerHand.getPoints() < 17) {
      while(dealerHand.getPoints() < 17) {
        deal('dealer');
      }
    }

    // determine the winner
    if (dealerHand.getPoints() === playerHand.getPoints()) {
      message = "It's a push!";
    } else if (dealerHand.getPoints() > 21) {
      message = "Dealer busts!";
    } else if (dealerHand.getPoints() > playerHand.getPoints()) {
      message = "Dealer wins!";
    } else {
      message = "You win!";
    }

    // render message on the page
    $('#messages').text(message);

    // disable hit button
    $("#hit-button").prop('disabled', true);
  }

  function playerBusts() {
    // check if player has Busted
    if (playerHand.getPoints() > 21) {
      $('#messages').text("You busted!");
      $("#hit-button").prop('disabled', true);
    }
  }

  function resetGame() {

    // add used cards back into the deck
    myDeck.usedCards.forEach(function(card) {
      myDeck.deck.push(card);
    });

    // clear used cards
    myDeck.usedCards = [];

    // remove cards from the table
    $("#player-hand").empty();
    $("#dealer-hand").empty();

    // shuffle the deck
    myDeck.shuffle();

    // reset cards and points
    dealerHand.cards = [];
    playerHand.cards = [];
    dealerHand.points = [];
    playerHand.points = [];

    // remove all messages and point displays
    $("#dealer-points").text("");
    $("#player-points").text("");
    $('#messages').text("");

    // undisable buttons
    $("#deal-button").prop('disabled', false);

    // disable stand buttons
    $("#stand-button").prop('disabled', true);
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

  // disable hit and stand buttons
  $("#hit-button").prop('disabled', true);
  $("#stand-button").prop('disabled', true);

  // shuffle the deck
  myDeck.shuffle();

// });

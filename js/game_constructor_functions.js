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
  }

  Hand.prototype.getPoints = function() {

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

  Hand.prototype.addCard = function(newCard) {
    this.cards.push({point: newCard.point, suit: newCard.suit});
  };

  // Create Deck Constructor
  function Deck() {
    this.currentDeck = [];
  }

  // generate a new deck of cards
  // store in into currentDeck
  Deck.prototype.newDeck = function() {
    for (var i = 0; i < 4; i++) {
      var suit = {
        0: 'hearts',
        1: 'diamonds',
        2: 'clubs',
        3: 'spades'
      }
      for (var k = 1; k <= 13; k++) {
        this.currentDeck.push(new Card( k, suit[i]) );
      }
    }
  }

  Deck.prototype.draw = function() {
    var drawnCard = this.currentDeck[0];
    this.currentDeck.splice(0, 1);

    return drawnCard;
  }

  // shuffle the cards
  Deck.prototype.shuffle = function() {
    var i = 0, j = 0, temp = null;

    for (i = this.currentDeck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.currentDeck[i];
      this.currentDeck[i] = this.currentDeck[j];
      this.currentDeck[j] = temp;
    }
  }

  Deck.prototype.numCardsLeft = function() {
    return this.newDeck.length;
  }

  Deck.prototype.deal = function(handSelector) {

    // draw the first card from the deck
    var myCard = this.draw();

    // render the image on the page
    $("#"+ handSelector +"-hand").append('<img class="card" src="' + myCard.getImageUrl() + '" alt="" />');

    return myCard;
  }

  // Create Game Constructor
  function Game() {
    this.myDeck = new Deck();
    this.dealerHand = new Hand();
    this.playerHand = new Hand();
  }

  Game.prototype.deal = function() {

    // generate a new deck of cards
    this.myDeck.newDeck();

    // shuffle the deck
    this.myDeck.shuffle();

    // deal 4 times => order: Player, Dealer, Player, Dealer
    var card1 = this.myDeck.deal('player');
    var card2 = this.myDeck.deal('dealer');
    var card3 = this.myDeck.deal('player');
    var card4 = this.myDeck.deal('dealer');

    this.playerHand.cards.push(card1);
    this.playerHand.cards.push(card3);

    $('#player-points').text(this.playerHand.getPoints());

    this.dealerHand.cards.push(card2);
    this.dealerHand.cards.push(card4);

    $('#dealer-points').text(this.dealerHand.getPoints());

    this.dealerGetsBlackjack();

  }

  Game.prototype.dealerGetsBlackjack = function() {
    // check if dealer gets blackjack
    if (this.dealerHand.points === 21) {
      $('#messages').text("Dealer Wins!");
      $("#hit-button").prop('disabled', true);
    }
    $("#deal-button").prop('disabled', true);
    $("#stand-button").prop('disabled', false);
    $("#hit-button").prop('disabled', false);
  }

  Game.prototype.hit = function() {
    var card = this.myDeck.deal('player');

    this.playerHand.cards.push(card);

    $('#player-points').text(this.playerHand.getPoints());

    // check if player busted
    if (this.playerHand.getPoints() > 21) {
      $('#messages').text("You busted!");
      $("#hit-button").prop('disabled', true);
      $("#stand-button").prop('disabled', true);
    }
  }

  Game.prototype.stand = function() {
    var message = "";

    // check if dealer has a minimum of 17
    if (this.dealerHand.getPoints() < 17) {
      while(this.dealerHand.getPoints() < 17) {
        var card = this.myDeck.deal('dealer');

        this.dealerHand.cards.push(card);

        $('#dealer-points').text(this.dealerHand.getPoints());
      }
    }

    // determine the winner
    if (this.dealerHand.getPoints() === this.playerHand.getPoints()) {
      message = "It's a push!";
    } else if (this.dealerHand.getPoints() > 21) {
      message = "Dealer busts!";
    } else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
      message = "Dealer wins!";
    } else {
      message = "You win!";
    }

    // render message on the page
    $('#messages').text(message);

    // disable hit and stand buttons
    $("#hit-button").prop('disabled', true);
    $("#stand-button").prop('disabled', true);

  }

  Game.prototype.resetGame = function() {
    // clear the cards from the deck
    this.myDeck.currentDeck = [];

    // instantiate a new game
    new Game();

    // remove cards from the table
    $("#player-hand").empty();
    $("#dealer-hand").empty();

    // shuffle the deck
    this.myDeck.shuffle();

    // reset cards and points
    this.dealerHand.cards = [];
    this.playerHand.cards = [];
    this.dealerHand.points = [];
    this.playerHand.points = [];

    // remove all messages and point displays
    $("#dealer-points").text("");
    $("#player-points").text("");
    $('#messages').text("");

    // undisable buttons
    $("#deal-button").prop('disabled', false);

    // disable stand buttons
    $("#hit-button").prop('disabled', true);
    $("#stand-button").prop('disabled', true);
  }

// });

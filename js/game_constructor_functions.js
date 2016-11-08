// $(document).ready(function() {

  // create Card Constructor
  Card = function(point, suit) {
    this.point = point;
    this.suit = suit;
  }

  Card.prototype.getImageUrl = function() {

    var point = this.point;
    var suit = this.suit;

    var cardNames = {
      11: 'jack',
      12: 'queen',
      13: 'king',
      1: 'ace'
    };

    if (point > 10 || point === 1) {
      point = cardNames[point];
    }

    return 'images/' + point + '_of_' + suit + '.png';
  }

  // create Hand Constructor
  function Hand() {
    this.cards = [];
  }

  Hand.prototype.getPoints = function() {
    var length = this.cards.length;
    var counter = 0;
    var count_1 = false;

    var cardPoints = this.cards.reduce(function(totalPoints, card) {
      if (card.point > 10) {
        card.point = 10;
      }
      counter++;
      totalPoints += card.point;
      if (card.point === 1) {
        count_1 = true;
      }
      if (counter === length) {
        if (totalPoints <= 11 && count_1) {
          totalPoints += 10;
        }
      }
      return totalPoints;
    }, 0);
    return cardPoints;
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

    // draw the first card from the deck while removing it from the deck
    var drawnCard = this.currentDeck.splice(0, 1);

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

  Deck.prototype.deal = function(handSelector, currentPlayerHand, hole) {
    var cardImg = "";
    var text = "";

    // draw the first card from the deck
    var myCard = this.draw();

    // add the card to the current player's hand
    currentPlayerHand.cards.push(myCard);

    // check if the current deal is a dealer hole card or not
    if (!hole) {
      cardImg = '<img class="card" src="' + myCard.getImageUrl() + '" alt="card image" />';
      text = currentPlayerHand.getPoints();
    } else {
      cardImg = '<img id="dealer-hole-card" src="images/xmas_card.png" alt="" />';
      text = '???';
    }

    // render the image on the page
    $("#"+ handSelector +"-hand").append(cardImg);

    // update the current player's point count that is being displayed
    $('#' + handSelector + '-points').text(text);

  }

  // Create Game Constructor
  function Game() {
    this.myDeck = new Deck();
    this.dealerHand = new Hand();
    this.playerHand = new Hand();
  }

  Game.prototype.deal = function() {
    // once the deal button has been clicked, undisable the other buttons
    $("#hit-button").prop('disabled', false);
    $("#stand-button").prop('disabled', false);
    $("#reset-button").prop('disabled', false);

    // generate a new deck of cards
    this.myDeck.newDeck();

    // shuffle the deck
    this.myDeck.shuffle();

    // deal 4 times => order: Player, Dealer, Player, Dealer
    this.myDeck.deal('player', this.playerHand);
    this.myDeck.deal('dealer', this.dealerHand);
    this.myDeck.deal('player', this.playerHand);
    this.myDeck.deal('dealer', this.dealerHand, 'hole');

    // check if dealer or player gets blackjack
    this.blackjackAnyone();

    // disable the deal button once everyone has been dealt 2 cards each
    $("#deal-button").prop('disabled', true);
  }

  Game.prototype.blackjackAnyone = function() {
    // check if dealer or player gets blackjack
    if (this.playerHand.getPoints() === 21 || this.dealerHand.getPoints() === 21) {
      if (this.playerHand.getPoints() === 21) {
        $('#messages').text("BLACKJACK! SWEET!");
      } else {
        this.revealDealerHoleCard();
        $('#messages').text("Dealer got a blackjack...");
      }
      $("#hit-button").prop('disabled', true);
      $("#stand-button").prop('disabled', true);
    }
  }

  Game.prototype.revealDealerHoleCard = function() {
    // remove dealer's hole card (back image)
    $('#dealer-hole-card').remove();

    // add dealer's hole card (front image)
    $('#dealer-hand').append('<img class="card" src="' + this.dealerHand.cards[1].getImageUrl() + '" alt="card image" />');

    // update dealer's points to display current points
    $('#dealer-points').text(this.dealerHand.getPoints());
  }

  Game.prototype.hit = function() {

    this.myDeck.deal('player', this.playerHand);

    // check if player busted
    if (this.playerHand.getPoints() > 21) {
      $('#messages').text("Oh no! You busted!");
      $("#hit-button").prop('disabled', true);
      $("#stand-button").prop('disabled', true);
    }
  }

  Game.prototype.getWinner = function() {
    var message = "";

    // determine the winner
    if (this.dealerHand.getPoints() === this.playerHand.getPoints()) {
      message = "It's a push!";
    } else if (this.dealerHand.getPoints() > 21) {
      message = "Whew! The dealer busted!";
    } else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
        message = "Dealer wins...";
    } else {
      message = "Nice! You win!";
    }

    // render message on the page
    $('#messages').text(message);
  }

  Game.prototype.stand = function() {

    this.revealDealerHoleCard();

    // check if dealer has a minimum of 17
    if (this.dealerHand.getPoints() < 17) {
      while(this.dealerHand.getPoints() < 17) {
        console.log('reached the while loop');
        this.myDeck.deal('dealer', this.dealerHand);
        $('#dealer-points').text(this.dealerHand.getPoints());

      }
    }

    // determine the winner
    this.getWinner();

    // disable hit and stand buttons
    $("#hit-button").prop('disabled', true);
    $("#stand-button").prop('disabled', true);

  }

  Game.prototype.resetGame = function() {
    // clear the cards from the deck
    this.myDeck.currentDeck = [];

    // instantiate a new game
    game = new Game();

    // remove cards from the table
    $("#player-hand").empty();
    $("#dealer-hand").empty();

    // shuffle the deck
    this.myDeck.shuffle();

    // reset cards and points
    this.dealerHand.cards = [];
    this.playerHand.cards = [];
    this.dealerHand.points = 0;
    this.playerHand.points = 0;

    // remove all messages and point displays
    $("#dealer-points").text("");
    $("#player-points").text("");
    $('#messages').text("");

    // undisable buttons
    $("#deal-button").prop('disabled', false);

    // disable stand buttons
    $("#hit-button").prop('disabled', true);
    $("#stand-button").prop('disabled', true);
    $("#reset-button").prop('disabled', true);
  }

// });

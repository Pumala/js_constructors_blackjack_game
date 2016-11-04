describe('Card', function() {

  it('should instantiate a card with a point and a suit', function() {
    var card = new Card(5, 'diamonds');
    expect(card.point).toEqual(5);
    expect(card.suit).toEqual('diamonds');
  });

  it('image URL works for 2-10', function() {
    var card = new Card(2, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/2_of_diamonds.png');
    card = new Card(3, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/3_of_diamonds.png');
    card = new Card(4, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/4_of_diamonds.png');
    card = new Card(5, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/5_of_diamonds.png');
    card = new Card(6, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/6_of_diamonds.png');
    card = new Card(7, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/7_of_diamonds.png');
    card = new Card(8, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/8_of_diamonds.png');
    card = new Card(9, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/9_of_diamonds.png');
    card = new Card(10, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/10_of_diamonds.png');
  });

  it('image URL works for jack, queen, king, and ace', function() {
    card = new Card(11, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/jack_of_diamonds.png');
    card = new Card(12, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/queen_of_diamonds.png');
    card = new Card(13, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/king_of_diamonds.png');
    card = new Card(1, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/ace_of_diamonds.png');
  });

  it('image URL works for different suits', function() {
    var card = new Card(11, 'diamonds');
    expect(card.getImageUrl()).toEqual('images/jack_of_diamonds.png');
    card = new Card(11, 'clubs');
    expect(card.getImageUrl()).toEqual('images/jack_of_clubs.png');
    card = new Card(11, 'spades');
    expect(card.getImageUrl()).toEqual('images/jack_of_spades.png');
    card = new Card(11, 'hearts');
    expect(card.getImageUrl()).toEqual('images/jack_of_hearts.png');
  });

});

describe('Hand', function() {

  it('empty hand', function() {
    var hand = new Hand();
    expect(hand.getPoints()).toEqual(0);
  });

  it('should return total points of current hand', function() {
    var myHand = new Hand();

    myHand.addCard(new Card(5, 'diamonds'));
    expect(myHand.getPoints()).toEqual(5);

    myHand.addCard(new Card(13, 'spades'));
    expect(myHand.getPoints()).toEqual(15);
  });

  it('picks 1 or 11 for Ace depending if its busts', function() {
    var myHand = new Hand();
    myHand.addCard(new Card(10, 'diamonds'));
    myHand.addCard(new Card(1, 'diamonds'));
    expect(myHand.getPoints()).toEqual(21);
  });

  it('picks 1 or 11 for Ace depending if its busts', function() {
    var myHand = new Hand();
    myHand.addCard(new Card(2, 'diamonds'));
    myHand.addCard(new Card(10, 'diamonds'));
    myHand.addCard(new Card(1, 'diamonds'));

    expect(myHand.getPoints()).toEqual(13);
  });

  it('picks 1 or 11 for Ace depending if its busts', function() {
    var myHand = new Hand();
    myHand.addCard(new Card(1, 'diamonds'));
    myHand.addCard(new Card(2, 'diamonds'));
    myHand.addCard(new Card(10, 'diamonds'));

    expect(myHand.getPoints()).toEqual(13);
  });

  it('picks 1 or 11 for Ace depending if its busts', function() {
    var myHand = new Hand();
    myHand.addCard(new Card(8, 'diamonds'));
    myHand.addCard(new Card(1, 'diamonds'));
    myHand.addCard(new Card(1, 'diamonds'));
    myHand.addCard(new Card(8, 'diamonds'));

    expect(myHand.getPoints()).toEqual(18);
  });

});

describe('Deck', function() {

  it('all the cards are in the deck', function() {
    var myDeck = new Deck();
    expect(myDeck.deck.length).toEqual(52);
  });

  it('should return new drawn card from deck', function() {
    var myDeck = new Deck();
    expect(myDeck.draw()).toEqual({ point: 1, suit: 'hearts'});
  });

  it('should return new shuffled deck of cards', function() {
    var myDeck = new Deck();
    var currentDeck = newDeck().splice(0, 4);
    console.log(currentDeck);
    myDeck.shuffle();
    var shuffledDeck = myDeck.deck.splice(0, 4);
    expect(currentDeck).not.toEqual(shuffledDeck);
    console.log(shuffledDeck);
  });

  it('should return current deck length', function() {
    var myDeck = new Deck();
    expect(myDeck.numCardsLeft()).toEqual(myDeck.deck.length);
  });

});

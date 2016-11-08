// create a new instance of Game
var game = new Game();

$("#deal-button").click(function() {

  game.deal();

});

$("#hit-button").click(function() {

  game.hit();

});

$("#stand-button").click(function() {
  game.stand();

});

$("#reset-button").click(function() {

  game.resetGame();

});

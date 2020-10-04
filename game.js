var game;
window.onload = function(){
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 1400,
    height: 800,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 400
          }
      }
    },
    scene: [preloadGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
}

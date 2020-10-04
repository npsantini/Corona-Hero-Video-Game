class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      // load all assets tile sprites
      //this.load.image("bg_1", "assets/bg-1.png");
      //this.load.image("bg_2", "assets/bg-2.png");
      //this.load.image("ground", "assets/ground.png");
      this.load.image("bg", "assets/bg.png");
      this.load.image("buildings", "assets/buildings.png");
      this.load.image("street", "assets/street.png");
      this.load.image("clouds", "assets/clouds.png");
      
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

/*
      // load spritesheet
      this.load.spritesheet("player", "assets/bee.png",{
        frameWidth: 37,
        frameHeight: 39
      });
      */
    }
    
    create(){
      this.scene.start("PlayGame");
    }

}

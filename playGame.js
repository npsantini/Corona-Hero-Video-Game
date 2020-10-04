
class playGame extends Phaser.Scene {
  
  constructor() {
    super("PlayGame");
    
  }

  create() {
  /*  // create an tiled sprite with the size of our game screen
    this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
    // Set its pivot to the top left corner
    this.bg_1.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.bg_1.setScrollFactor(0);
  */

    this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg");
    // Set its pivot to the top left corner
    this.bg.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.bg.setScrollFactor(0);

    // add the ground layer which is only 48 pixels tall
    this.street = this.physics.add.staticGroup();
    this.street.create(700, 733, "street");
    
    //this.street = this.add.tileSprite(0, 665, game.config.width, 0, "street");
    //this.street.setOrigin(0, 0);
    //this.street.setScrollFactor(0);

    // Add a second background layer. Repeat as in bg_1
    this.buildings = this.add.tileSprite(0, 50, game.config.width, game.config.height, "buildings");
    this.buildings.setOrigin(0, 0);
    this.buildings.setScrollFactor(0);


    
    // sinc this tile is shorter I positioned it at the bottom of he screen
    //this.ground.y = 12 * 16;
/*
    // add player
    this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "player");
    // create an animation for the player
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.player.play("fly");
*/

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis


    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 3,
        setXY: { x: 200, y: 0, stepX: 70 },
    });

    bombs.setScale(4).refreshBody();

    this.gameOver = false;
    this.score = 0;

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.street);
    this.physics.add.collider(this.stars, this.street);
    this.physics.add.collider(this.bombs, this.street);

    function collectStar (player, star){
      star.disableBody(true, true);
  
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
  
        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.stars.children.iterate(function (child) {
  
                child.enableBody(true, child.x, 0, true, true);
  
            });
  
            var x = (player.x < 700) ? Phaser.Math.Between(700, 1400) : Phaser.Math.Between(0, 700);
  
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setScale(3).refreshBody();
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
  
        }
    }
  
    function hitBomb (player, bomb){
        this.physics.pause();
  
        this.player.setTint(0xff0000);
  
        this.player.anims.play('turn');
  
        this.gameOver = true;
    }

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);


  }


  update() {
/*
    // move the player when the arrow keys are pressed
    if (this.cursors.left.isDown && this.player.x > 0) {
      this.player.x -= 3;
      this.player.scaleX = 1;

    } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
      this.player.x += 3;
      this.player.scaleX = -1;

    }
    */

    if (this.gameOver)
    {
        return;
    }

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else
    {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
      this.player.setVelocityY(-330);
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.street.tilePositionX = this.myCam.scrollX * .3;
    this.buildings.tilePositionX = this.myCam.scrollX * .6;
    this.street.tilePositionX = this.myCam.scrollX;
  }


}

class MainScene2 extends Phaser.Scene {
    constructor() {
        super('mainScene2');
        this.isOnSlippery = false;
        this.gravity = 200; // Set low gravity for underwater effect
        this.jumpForce = 100; // Set jump force for underwater jumping
    }

    preload() {
        // Preload assets here
        this.load.image('background2', '/assets/images/BG2.png');
        this.load.image("tiles2", "/Assets/Images/spritesheet.png");
        this.load.image("Waten", "/Assets/Images/Water.png");
        this.load.tilemapTiledJSON('map2', "/Assets/Tile/map2.json");

        this.load.image('playerFrame1', '/assets/images/Swim1.png');
        this.load.image('playerFrame2', '/assets/images/Swim2.png');
        this.load.image('playerFrame3', '/assets/images/Swim3.png');
        this.load.image('playerFrame4', '/assets/images/Swim4.png');

        this.load.image('playerFrame5', '/assets/images/PlayerIdle1.png');
        this.load.image('playerFrame6', '/assets/images/PlayerIdle2.png');
        this.load.image('playerFrame7', '/assets/images/PlayerIdle3.png');
        this.load.image('playerFrame8', '/assets/images/PlayerIdle4.png');

        this.load.image('coin', '/assets/images/coin.png');
        this.load.image('trans', 'assets/Images/Transparent.png');

        this.load.image('muteButton', '/assets/images/mute.png');
        this.load.audio('music2', '/assets/audio/WaterLevel.mp3');

        this.load.audio('audio1', 'assets/audio/Death1.mp3');
        this.load.audio('audio2', 'assets/audio/Death2.mp3');
        this.load.audio('audio3', 'assets/audio/Death3.mp3')

        this.load.image('piraya1', '/assets/images/Piranha1.png');
        this.load.image('piraya2', '/assets/images/Piranha2.png');

        this.load.audio('UnderwaterJumpSFX', 'assets/audio/UnderwaterJump.wav');

        this.load.image('redbubbles', 'assets/Images/redbubble.png');
        this.load.image('bubbles', 'assets/Images/bubbles.png');
        this.load.audio('CoinPickup', 'assets/audio/Coin.wav');
        this.load.audio('TransitionsSFX', 'assets/audio/Transition.wav');
    }

    create() {
        // Set world bounds and camera bounds
        this.cameras.main.setBounds(0, 0, 1920 * 2, 2160 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 2160 * 2);

        this.add.image(0, 0, 'background2').setOrigin(0);
        this.add.image(1920, 0, 'background2').setOrigin(0).setFlipX(true);
        this.add.image(0, 1080, 'background2').setOrigin(0).setFlipY(true);
        this.add.image(1920, 1080, 'background2').setOrigin(0).setFlipX(true).setFlipY(true);

        // Add music
        this.music = this.sound.add('music2', { loop: true });
        this.music.play();

        // Add audio clips
        this.audioClips = [
            this.sound.add('audio1'),
        ];

        // Create tilemap and tileset
        const map = this.make.tilemap({ key: "map2", tileWidth: 50, tileHeight: 50 });
        const tileset1 = map.addTilesetImage("spritesheet", "tiles2");
        const Water = map.addTilesetImage("Water", "Waten");
        const layer1 = map.createLayer("TileLayer2", tileset1, 0, 0);
        const Watertiles = map.createLayer("BG", Water, 0, 0);
        layer1.setCollisionBetween(0, 100);
        Watertiles.setCollisionBetween(0, 100);

        

        // Create player animation
        this.anims.create({
            key: 'playerIdleRight',
            frames: [
                { key: 'playerFrame1' },
                { key: 'playerFrame2' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'playerIdleLeft',
            frames: [
                { key: 'playerFrame3' },
                { key: 'playerFrame4' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'playerLeft',
            frames: [
                { key: 'playerFrame5' },
                { key: 'playerFrame6' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'playerRight',
            frames: [
                { key: 'playerFrame7' },
                { key: 'playerFrame8' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'piraya',
            frames: [
                { key: 'piraya1' },
                { key: 'piraya2' }
            ],
            frameRate: 3,
            repeat: -1
        });

        // Add player
        this.player = this.physics.add.sprite(160, 450, 'playerFrame1').setScale(0.8);
        this.emitter = this.add.particles(0, 30, 'bubbles', {
            scale: { min: 0.15, max: 0.3 },
            rotate: { start: 0, end: 360 },
            speed: { min: 50, max: 100 },
            lifespan: 6000,
            frequency: 290,
            gravityY: 90,
            follow: this.player, // Set the emitter to follow the piraya
        followOffset: {x: 0, y: 0} // Adjust offset as needed
        });

        this.tweens.add({
            targets: this.emitter,
            particleX: 700,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inout',
            duration: 1500
        });

        // Set low gravity for underwater effect
        this.physics.world.gravity.y = this.gravity;

        // Set up collisions
        this.physics.add.collider(this.player, layer1);
        

        // Set up keyboard input
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE');

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        this.score = 19;
        this.scoreText = this.add.text(16, 16, 'Score: 19', { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);


        // Create a group for Pirayas
    this.pirayasGroup = this.physics.add.group();

    // Create Pirayas and add them to the group
    for (let i = 0; i < 3; i++) { // Example: Create 5 Pirayas
        const piraya = this.physics.add.sprite(2400, 800, 'piraya1'); // Example: Create a Piraya
        piraya.anims.play('piraya', true);
        piraya.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        piraya.setBounce(1);
        piraya.setScale(2);
        piraya.setCollideWorldBounds(false);
        piraya.body.setAllowGravity(false); // Set gravity to 0 for each Piraya
        this.physics.add.collider(piraya, layer1); // Adjust collision settings as needed
        this.physics.add.overlap(this.player, this.pirayasGroup, this.hitPiraya, null, this);
        const directionX = this.player.x - piraya.x;
            const directionY = this.player.y - piraya.y;
            const angle = Math.atan2(directionY, directionX); // Calculate angle
            piraya.setRotation(angle + Math.PI / 1); // Set rotation (adjust as needed)

            this.emitter = this.add.particles(0, 30, 'redbubbles', {
                scale: { min: 0.15, max: 0.3 },
                rotate: { start: 0, end: 360 },
                speed: { min: 50, max: 100 },
                lifespan: 6000,
                frequency: 200,
                gravityY: 90,
                follow: piraya, // Set the emitter to follow the piraya
            followOffset: {x: 0, y: 0} // Adjust offset as needed
            });
    
            this.tweens.add({
                targets: this.emitter,
                particleX: 700,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inout',
                duration: 1500
            });
        

        // Change Piraya's velocity every second (example)
        this.time.addEvent({
            delay: 1800,
            loop: true,
            callback: () => {
                piraya.setVelocity(Phaser.Math.Between(-400, 450), Phaser.Math.Between(-900, 950));
            }
        });

        // Add Piraya to the group
        this.pirayasGroup.add(piraya);
    }

    this.muteButton = this.add.image(1780, 50, 'muteButton').setInteractive().setScrollFactor(0);
        this.muteButton.setOrigin(0);
        this.muteButton.setScale(0.8);

        this.muteButton.on('pointerdown', this.toggleMute, this);


        if (this.sys.game.device.input.touch) {
            // Create on-screen buttons
            this.createButtons();
        }

        this.createCoins();
        this.physics.add.collider(this.coins, layer1);  
        
        this.transitionImage = this.physics.add.sprite(200, 1200, 'trans').setScale(3);
this.transitionImage.setOrigin(0.5);
this.transitionImage.setSize(100, 100); // Set the size of the collider
this.transitionImage.body.immovable = true; // Make the transition image immovable
this.transitionImage.body.allowGravity = false; // Disable gravity for the transition image
this.physics.add.overlap(this.player, this.transitionImage, this.switchScene2, null, this);
    }


    createCoins() {
        // Create a group to hold the coins
        this.coins = this.physics.add.group();

        // Set spawn positions for coins
        const coinPositions = [
            { x: 3190, y: 400 },
            { x: 3300, y: 900 },
            { x: 1000, y: 700 }
        ];

        // Create coins at the specified positions
        coinPositions.forEach(pos => {
            const coin = this.physics.add.sprite(pos.x, pos.y, 'coin').setScale(0.2).setDepth(0);
            this.coins.add(coin); // Add the coin to the group
            
        });

        // Set up overlap detection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        // Collect the coin
        coin.disableBody(true, true);

        // Increase score and update text
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }
    

    collectCoin(player, coin) {
        // Collect the coin
        this.sound.play('CoinPickup')
        coin.disableBody(true, true);
        // Increase score and update text
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        
    }

    toggleMute() {
        // Toggle audio mute state
        this.sound.mute = !this.sound.mute;

        // Change mute button image based on mute state
        if (this.sound.mute) {
            this.muteButton.setTint(0xff0000); // Change color to indicate muted
        } else {
            this.muteButton.clearTint(); // Clear tint to indicate unmuted
        }
    }


    hitPiraya(player, piraya) {
        // Stop the music
        this.music.stop();
    
        // Play death audio clip
        const randomIndex = Phaser.Math.Between(0, this.audioClips.length - 1);
        this.audioClips[randomIndex].play();
    
        // Transition to the death scene after a delay
        this.time.delayedCall(100, () => {

            this.scene.start('DeathScene2', { score: this.score }); // Assuming 'deathScene' is the key for your death scene
        });
    }

    switchScene2() {
        this.music.stop();
        this.sound.play('TransitionsSFX')
        this.scene.start('theEnd'); // Replace 'NextScene' with the key of the scene you want to transition to
    }

    



        createButtons() {
            // Create buttons for left (A), right (D), and jump (W)
            const buttonLeft = this.add.sprite(100, 1000, 'rightButton').setInteractive().setScrollFactor(0);
            const buttonRight = this.add.sprite(200, 1000, 'jumpButton').setInteractive().setScrollFactor(0);
            const buttonJump = this.add.sprite(1600, 1000, 'leftButton').setInteractive().setScrollFactor(0);
        
            // Set the origin of the buttons
            buttonLeft.setOrigin(0.5);
            buttonRight.setOrigin(0.5);
            buttonJump.setOrigin(0.5);
        
            // Set up button input events
            buttonLeft.on('pointerdown', () => {
                this.keys.A.isDown = true;
            });
            buttonLeft.on('pointerup', () => {
                this.keys.A.isDown = false;
            });
        
            buttonRight.on('pointerdown', () => {
                this.keys.D.isDown = true;
            });
            buttonRight.on('pointerup', () => {
                this.keys.D.isDown = false;
            });
        
            buttonJump.on('pointerdown', () => {
                this.keys.W.isDown = true;
            });
            buttonJump.on('pointerup', () => {
                this.keys.W.isDown = false;
            });
        }

    update() {
        // Player movement
        if (this.keys.W.isDown) {
            // Check if the underwater jump sound is not already playing
            if (!this.underwaterJumpSound || !this.underwaterJumpSound.isPlaying) {
                this.underwaterJumpSound = this.sound.add('UnderwaterJumpSFX');
                this.underwaterJumpSound.play();
            }
            this.player.setVelocityY(-this.jumpForce);
        }
        
        if (this.keys.A.isDown) {
            this.player.setVelocityX(-200); // Adjust movement speed as needed
            this.player.flipX = true; // Flip player sprite when moving left
            this.player.anims.play('playerIdleRight', true); // Play left animation
        } else if (this.keys.D.isDown) {
            this.player.setVelocityX(200); // Adjust movement speed as needed
            this.player.flipX = false; // Unflip player sprite when moving right
            this.player.anims.play('playerIdleRight', true); // Play right animation
        } else {
            this.player.setVelocityX(0);
            // If not moving, play idle animation based on player direction
            if (this.player.flipX) {
                this.player.anims.play('playerLeft', true); // Play idle left animation
            } else {
                this.player.anims.play('playerRight', true); // Play idle right animation
            }
        }
    }
    
}

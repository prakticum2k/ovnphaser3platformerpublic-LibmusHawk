class MainScene extends Phaser.Scene {
    constructor() {
        super('mainScene');
        this.isOnSlippery = false;
    }

    preload() {
        // Preload assets here
        this.load.image('background', '/assets/images/BG.png');
        this.load.image('background2', '/assets/images/BG2.png');
        this.load.audio('music', '/assets/audio/Map2.mp3');
        this.load.image("tiles1", "/Assets/Images/spritesheet1.png");
        this.load.image("decos", "/Assets/Images/Icespiek.png");
        this.load.image("Waten", "/Assets/Images/Water.png");
        this.load.image('jetpack', '/assets/images/Jetpack.png'); // Load jetpack image
        // Load the JSON file
        this.load.tilemapTiledJSON('map', "/Assets/Tile/map.json");

        // Load player animation frames
        this.load.image('playerFrames1', '/assets/images/Player.png');
        this.load.image('playerFrames2', '/assets/images/Player1.png');

        // Load coin image
        this.load.image('coin', '/assets/images/coin.png');

        // Load door image
        this.load.image('door', '/assets/images/door.png');

        this.load.image('spike', '/Assets/images/Icespiek.png');
        
        this.load.image('red', 'assets/Images/red.png');

        this.load.image('trans', 'assets/Images/Transparent.png');

        this.load.image('Iceplatform', '/Assets/images/Iceplatform.png');

        this.load.image('Gey1', '/Assets/animations/Geyser1.png');
        this.load.image('Gey2', '/Assets/animations/Geyser2.png');
        this.load.image('Gey3', '/Assets/animations/Geyser3.png');
        this.load.image('Gey4', '/Assets/animations/Geyser4.png');

        this.load.image('muteButton', '/assets/images/mute.png');

        this.load.audio('audio1', 'assets/audio/Death1.mp3');
        this.load.audio('audio2', 'assets/audio/Death2.mp3');
        this.load.audio('audio3', 'assets/audio/Death3.mp3')

        this.load.audio('CoinPickup', 'assets/audio/Coin.wav');
        this.load.audio('JumpSFX', 'assets/audio/Jump.wav');
        this.load.audio('TransitionsSFX', 'assets/audio/Transition.wav');
        this.load.audio('JetpackSFX', 'assets/audio/Jetpack.wav');
        this.load.audio('GeysirSFX', 'assets/audio/Geysir.wav');
        this.load.audio('doorSFX', 'assets/audio/door.wav');

        this.load.image('leftButton', '/Assets/Images/LeftInput.png');
        this.load.image('rightButton', '/Assets/Images/RightInput.png');
        this.load.image('jumpButton', '/Assets/Images/JumpInput.png');
        

    }

    create() {
        // Set world bounds and camera bounds
        this.cameras.main.setBounds(0, 0, 1920 * 2, 2160 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 2160 * 2);
    
        // Create background
        this.add.image(0, 0, 'background').setOrigin(0);
        this.add.image(1920, 0, 'background').setOrigin(0).setFlipX(true);
        this.add.image(0, 1080, 'background').setOrigin(0).setFlipY(true);
        this.add.image(1920, 1080, 'background').setOrigin(0).setFlipX(true).setFlipY(true);
        this.add.image(0, 2160, 'background2').setOrigin(0).setFlipY(true);
        this.add.image(1920, 2060, 'background2').setOrigin(0).setFlipX(true).setFlipY(true);
        this.add.image(0, 2160, 'background2').setOrigin(0).setFlipY(true);
        this.add.image(1920, 2160, 'background2').setOrigin(0).setFlipX(true).setFlipY(true);
        this.add.image(0, 3240, 'background2').setOrigin(0).setFlipY(true);
        this.add.image(1920, 3240, 'background2').setOrigin(0).setFlipX(true).setFlipY(true);
        this.add.image(0, 3240, 'background2').setOrigin(0).setFlipY(true);
        this.add.image(1920, 3240, 'background2').setOrigin(0).setFlipX(true).setFlipY(true);
        
        this.add.text(3530, 800, 'Hug the hatch\nonce you have\ncollected all the\ncoins', { fontFamily: 'Arial', fontSize: 40, color: '#00ff00' }).setDepth(0);
        // Add music
        this.music = this.sound.add('music', { loop: true });
        this.music.play();

        this.audioClips = [
            this.sound.add('audio1'),
            this.sound.add('audio2'),
            this.sound.add('audio3')
        ];
    
        // Create tilemap and tileset
        const map = this.make.tilemap({ key: "map", tileWidth: 50, tileHeight: 50 });
        const tileset1 = map.addTilesetImage("spritesheet1", "tiles1");
        const decotiles = map.addTilesetImage("Icespiek", "decos");
        const Water = map.addTilesetImage("Vatten", "Waten");
        const layer1 = map.createLayer("TileLayer2", tileset1, 0, 0);
        const deco = map.createLayer("Decorations", decotiles, 0, 0);
        const Watertiles = map.createLayer("Vatten", Water, 0, 0);
        const instakill = map.createLayer("Instakill", tileset1, 0, 0);
        const slippery = map.createLayer("Slippery", tileset1, 0, 0);
        layer1.setCollisionBetween(0, 100);
        deco.setCollisionBetween(0, 100);
        instakill.setCollisionBetween(0, 100);
        slippery.setCollisionBetween(0, 100);
        Watertiles.setCollisionBetween(0, 100);

        const fx1 = instakill.postFX.addGlow(0xffff00, 4, 0, false, 0.1, 5);
        const fx2 = instakill.postFX.addGlow(0xff0000, 4, 2);

        

        this.tweens.add({
            targets: fx1, fx2,
            outerStrength: 10,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    
        // Add player animation frames
        this.anims.create({
            key: 'playerAnimation',
            frames: [
                { key: 'playerFrames1' },
                { key: 'playerFrames2' }
            ],
            frameRate: 3,
            repeat: -1
        });
    
        // Add player
        this.player = this.physics.add.sprite(200, 450, 'playerFrames1').setScale(0.2);
        this.player.play('playerAnimation');
        this.player.setMaxVelocity(500,600);
    
        // Set up keyboard input
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE');
    
        // Add coins
        this.coins = this.physics.add.group();
        this.createCoins();
    
        // Add door
        this.door = this.physics.add.sprite(3380, 900, 'door').setScale(1.10);
        this.door.body.immovable = true; // Make the door immovablelight
        this.physics.add.collider(this.player, this.door, this.checkDoor, null, this);

        this.door2 = this.physics.add.sprite(100, 1100, 'door').setScale(1.10);
        this.door2.body.immovable = true; // Make the door immovablelight
        this.physics.add.collider(this.player, this.door2, this.checkDoor, null, this);

        this.door3 = this.physics.add.sprite(3100, 2400, 'door').setScale(1.10);
        this.door3.body.immovable = true; // Make the door immovablelight
        this.physics.add.collider(this.player, this.door3, this.checkDoor, null, this);

        this.door4 = this.physics.add.sprite(200, 3800, 'door').setScale(1.50);
        this.door4.body.immovable = true; // Make the door immovablelight
        this.physics.add.collider(this.player, this.door4, this.checkDoor, null, this);
    
        // Add jetpack pickup
        this.jetpackPickup = this.physics.add.sprite(1000, 1300, 'jetpack').setScale(0.9);
        this.physics.add.overlap(this.player, this.jetpackPickup, this.collectJetpack, null, this);
    
        // Initialize score and score text
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);
    
        // Initialize stamina bar
        this.stamina = 100;
        this.staminaMax = 100;
        this.staminaBarVisible = false; // Flag to track if stamina bar is visible
        this.staminaBar = this.add.graphics();
        this.updateStaminaBar();
    
        // Initialize stamina text
        this.staminaText = this.add.text(16, 64, 'Stamina: 100', { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);
        this.staminaText.setVisible(false); // Hide the stamina text
    
        // Jetpack
        this.playerHasJetpack = false; // Flag to track if player has jetpack
        this.jetpackPower = 500;
    
        // Set up collisions
        this.physics.add.collider(this.player, layer1);
        this.physics.add.collider(this.coins, layer1);
        this.physics.add.collider(this.coins, slippery);
        this.physics.add.collider(this.door, layer1);
        this.physics.add.collider(this.door2, layer1);
        this.physics.add.collider(this.door3, layer1);
        this.physics.add.collider(this.door4, layer1);
        this.physics.add.collider(this.jetpackPickup, layer1);
    
        this.physics.add.collider(this.player, instakill, this.playerHitInstakill, null, this);
        this.physics.add.collider(this.player, Watertiles, this.playerHitInstakill, null, this);
    
        this.physics.add.collider(this.player, layer1, null, null, this); // Add collider with layer1 for normal collisions
        this.physics.add.collider(this.player, slippery, this.onSlippery, null, this); // Add collider with slippery layer
        // Set up camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        this.spikesGroup = this.add.group();

        this.time.addEvent({
            delay: 255,
            callback: function () {
                const spike = this.physics.add.image(Phaser.Math.Between(500, 3000), Phaser.Math.Between(2360, 2370), 'spike');
                spike.setScale(0.8);
                spike.setCircle(); // Set physics body as a circle
                spike.setFriction(0.005).setBounce(0.1);
                
                // Add the spike to the group
                this.spikesGroup.add(spike);
            },
            callbackScope: this,
            repeat: -1
                });

                this.physics.add.overlap(this.player, this.spikesGroup, this.playerHitSpike, null, this);

                // Set up collision detection between spikes and layer
                this.physics.add.collider(this.spikesGroup, Watertiles,layer1, this.spikeHitLayer, null, this);

                const platform1 = this.physics.add.image(1600, 2928, 'Iceplatform', 'platform1').setScale(3.0).setDirectControl().setImmovable();
                const platform2 = this.physics.add.image(2600, 2928, 'Iceplatform', 'platform2').setScale(3.0).setDirectControl().setImmovable();
    
                this.tweens.add({
                    targets: platform1,
                    x: 1200,
                    duration: 3000,
                    yoyo: true,
                    repeat: -1
                });

                this.tweens.add({
                    targets: platform2,
                    x: 2200,
                    duration: 3300,
                    yoyo: true,
                    repeat: -1
                });

                this.physics.add.collider(this.player, [platform1, platform2]);

                this.geysers = this.physics.add.group();

    // Create first geyser
    this.createGeyser(2100, 3770);
    this.createGeyser(1250, 3770);
    this.createGeyser(800, 3770);
    
    this.physics.add.overlap(this.player, this.geysers, this.triggerGeyser, null, this);

    this.muteButton = this.add.image(1780, 50, 'muteButton').setInteractive().setScrollFactor(0);
        this.muteButton.setOrigin(0);
        this.muteButton.setScale(0.8);

        this.muteButton.on('pointerdown', this.toggleMute, this);


        
        this.transitionImage = this.physics.add.sprite(300, 4500, 'trans').setScale(4);
this.transitionImage.setOrigin(0.5);
this.transitionImage.setSize(100, 100); // Set the size of the collider
this.transitionImage.body.immovable = true; // Make the transition image immovable
this.transitionImage.body.allowGravity = false; // Disable gravity for the transition image
this.physics.add.overlap(this.player, this.transitionImage, this.switchScene, null, this);





        if (this.sys.game.device.input.touch) {
            // Create on-screen buttons
            this.createButtons();
        }
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


            onSlippery(player, slipperyLayer) {
                // Check if the player's bottom edge is overlapping with the slippery layer
                const playerBottomEdge = player.y + player.displayHeight / 2;
                const slipperyTopEdge = slipperyLayer.y;
                if (playerBottomEdge >= slipperyTopEdge) {
                    // Player is on top of the slippery layer
                    this.isOnSlippery = true;
                } else {
                    // Player is not on top of the slippery layer
                    this.isOnSlippery = false;
                }
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

            createGeyser(x, y) {
                // Create a geyser sprite
                const geyser = this.geysers.create(x, y, 'Gey1');
            
                // Create animation once for the 'GeyAnim' key
                this.anims.create({
                    key: 'GeyAnim',
                    frames: [
                        { key: 'Gey1' },
                        { key: 'Gey2' },
                        { key: 'Gey3' },
                        { key: 'Gey4' }
                    ],
                    frameRate: 3,
                    repeat: -1
                });
            
                // Play animation on the geyser sprite
                geyser.play('GeyAnim').setScale(5).setDepth(4);
            
                // Enable physics for the geyser
                geyser.setImmovable(true);
                geyser.body.allowGravity = false;
            }

            switchScene() {
                this.music.stop();
                this.sound.play('TransitionsSFX')
                this.scene.start('mainScene2'); // Replace 'NextScene' with the key of the scene you want to transition to
            }
            
            triggerGeyser(player, geyser) {
                // Check if the 'GeysirSFX' sound is not already playing
                if (!this.geysirSound || !this.geysirSound.isPlaying) {
                    // Play the 'GeysirSFX' sound
                    this.geysirSound = this.sound.add('GeysirSFX');
                    this.geysirSound.play();
                }
                // Apply upward force to the player
                player.setVelocityY(-500); // Adjust the force as needed
            }
            
        
            

            playRandomAudio() {
                const randomIndex = Phaser.Math.Between(0, this.audioClips.length - 1);
                const randomClip = this.audioClips[randomIndex];
                randomClip.play();
            }

    createCoins() {
        // Set spawn positions for coins
        const coinPositions = [
            { x: 400, y: 900 },
            { x: 900, y: 300 },
            { x: 1000, y: 700 },
            { x: 1400, y: 200 },
            { x: 1600, y: 800 },
            { x: 2100, y: 100 },
            { x: 3200, y: 100 },
            { x: 2700, y: 500 },
            { x: 2400, y: 700 },
            { x: 2700, y: 900 },
            { x: 2700, y: 1500 },
            { x: 2300, y: 1500 },
            { x: 1500, y: 1300 },
            { x: 400, y: 1200 },
            { x: 400, y: 2400 },
            { x: 400, y: 3500 },
            { x: 2700, y: 3500 },
            { x: 1500, y: 3500 },
            { x: 3000, y: 2400 }
        ];

        // Create coins at the specified positions
        coinPositions.forEach(pos => {
            const coin = this.physics.add.sprite(pos.x, pos.y, 'coin').setScale(0.2);
            this.coins.add(coin);
        });

        // Set up overlap detection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        // Collect the coin
        this.sound.play('CoinPickup')
        coin.disableBody(true, true);
        // Increase score and update text
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        
    }

    collectJetpack(player, jetpack) {
        // Collect the jetpack
        jetpack.disableBody(true, true);
        // Set flag indicating player has jetpack
        this.playerHasJetpack = true;
        // Show the stamina bar and text after picking up the jetpack
        this.staminaBarVisible = true;
        this.staminaBar.setVisible(true);
        this.staminaText.setVisible(true);
    }

    checkDoor(player, door) {
        // Check conditions for opening the door
        if (this.score >= 10) {
            door.destroy();
            this.sound.play('doorSFX')
        }
    }

    checkDoor2(player, door2) {
        // Check conditions for opening the door
        if (this.score >= 14) {
            door2.destroy();
            this.sound.play('doorSFX')
        }
    }

    checkDoor2(player, door3) {
        // Check conditions for opening the door
        if (this.score >= 16) {
            door3.destroy();
            this.sound.play('doorSFX')
        }
    }

    checkDoor3(player, door3) {
        // Check conditions for opening the door
        if (this.score >= 19) {
            door4.destroy();
            this.sound.play('doorSFX')
        }
    }
    
    updateStaminaBar() {
        this.staminaBar.clear();
        this.staminaBar.fillStyle(0x00ff00);
        this.staminaBar.fillRect(20, 100, this.stamina * 2, 20).setScrollFactor(0);
    }
    
    
    update() {
        // Update player movement
        const player = this.player;
        const keys = this.keys;
        const speed = 550;
        const jetpackPower = 200; // Adjust as needed
    
        // Check if player is on the ground
        const isOnGround = player.body.onFloor();
    
        // Jetpack functionality
        if (keys.SPACE.isDown && this.playerHasJetpack && this.stamina > 0 && (isOnGround || player.body.velocity.y < 0)) {
            player.setVelocityY(-jetpackPower);
            this.cameras.main.shake(50, 0.005);
            
            // Check if the jetpack sound is not already playing
            if (!this.jetpackSound || !this.jetpackSound.isPlaying) {
                this.jetpackSound = this.sound.add('JetpackSFX');
                this.jetpackSound.play();
            }
            
            this.stamina -= 0.5; // Adjust depletion rate
            const particles1 = this.add.particles(0, 0, 'playerFrames1', {
                speed: 10,
                scale: { start: 0.1, end: 0 },
            });
            particles1.startFollow(player).setDepth(12);
            
        } else {
            // Restore stamina over time only if on the ground
            if (this.stamina < this.staminaMax && isOnGround) {
                this.stamina += 0.2; // Adjust regeneration rate
            }
                
        }
    
        // Update stamina bar visibility
        if (this.staminaBarVisible) {
            this.staminaBar.setVisible(true);
            this.staminaText.setVisible(true);
        } else {
            this.staminaBar.setVisible(false);
            this.staminaText.setVisible(false);
        }
    
        // Update stamina bar
        this.updateStaminaBar();
    
        // Update stamina bar text
        this.staminaText.setText('Fuel: ' + Math.round(this.stamina));
    
        // Ensure stamina doesn't go below 0 or above maximum
        this.stamina = Phaser.Math.Clamp(this.stamina, 0, this.staminaMax);
    
        // Player movement
        if (this.isOnSlippery && !this.keys.A.isDown && !this.keys.D.isDown) {
            // If on slippery tiles and not pressing A or D, apply friction
            player.setVelocityX(player.body.velocity.x * 0.99); // Adjust friction factor as needed
        } else {
            // If not on the slippery layer or pressing A or D, apply normal movement
            if (this.keys.A.isDown) {
                player.setVelocityX(-speed);
            } else if (this.keys.D.isDown) {
                player.setVelocityX(speed);
            } else {
                player.setVelocityX(0);
            }
        }

        
    
        // Allow jumping only when on the ground
        if (keys.W.isDown && isOnGround) {
            this.sound.play('JumpSFX')
            player.setVelocityY(-500);
        }

    
    }
    playerHitInstakill(player, instakill) {
        this.music.stop();
        this.isOnSlippery = false;
        this.scene.start('DeathScene', { score: this.score });
    }

    playerHitSpike(player, spike) {

        this.music.stop();
        this.isOnSlippery = false;
        this.scene.start('DeathScene', { score: this.score });

    }

    spikeHitLayer(spike, layer1) {
        // Handle spike collision with layer (e.g., despawn the spike)
        spike.destroy();
    }
}

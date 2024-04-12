class LoadingScene extends Phaser.Scene {
    constructor() {
        super('loadingScene');
    }

    preload() {

        this.load.path = 'assets/animations/';

        this.load.image('load1', 'tile000.png');
        this.load.image('load2', 'tile001.png');
        this.load.image('load3', 'tile002.png');
        this.load.image('load4', 'tile003.png');
        this.load.image('load5', 'tile004.png');
        this.load.image('load6', 'tile005.png');
        this.load.image('load7', 'tile006.png');
        this.load.image('load8', 'tile007.png');
    }

    create() {
        // Add background
        this.add.rectangle(0, 0, 1920, 1080, '#00000').setOrigin(0);

        // Add loading bar
        this.anims.create({
            key: 'loadingings',
            frames: [
                { key: 'load1' },
                { key: 'load2' },
                { key: 'load3' },
                { key: 'load4' },
                { key: 'load5' },
                { key: 'load6' },
                { key: 'load7' },
                { key: 'load8', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

       const loadingBar = this.add.sprite(950, 650, 'load1')
            .play('loadingings');

        // Set up loading events
        this.load.on('progress', function (value) {
            loadingBar.setCrop(0, 0, loadingBar.width * value, loadingBar.height);
        });

        this.load.on('complete', function () {
            this.scene.start('mainScene');
        }, this);

        // Start preloading assets for the main game
        this.loadAssets();
    }

    loadAssets() {
        // Simulate loading time
        this.time.delayedCall(1000, () => {
            // Add your actual asset loading here
            // For demonstration, let's just simulate loading time with a delay
            this.load.audio('click', ['Assets/Audio/Click.wav']);
            this.load.start();
        });
    }
}

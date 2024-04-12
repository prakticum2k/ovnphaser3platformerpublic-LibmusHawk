class DeathScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DeathScene' });
    }

    init(data) {
        this.score = data.score || 0; // Get the score from the data or default to 0
    }

    preload() {
        // Load audio files
        this.load.audio('audio1', 'assets/audio/Death1.mp3');
        this.load.audio('audio2', 'assets/audio/Death2.mp3');
        this.load.audio('audio3', 'assets/audio/Death3.mp3'); // Fixed typo: removed extra .mp3 extension
    }

        create() {
            // Add "Death" text
            this.add.text(this.cameras.main.centerX, 300, 'Death', {
                fontSize: '128px',
                fontFamily: 'Impact',
                color: '#ff0000',
                align: 'center'
            }).setOrigin(0.5);
        
            // Display the score
            this.add.text(this.cameras.main.centerX, 500, `Score: ${this.score}`, {
                fontSize: '40px',
                fontFamily: 'Luminari',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
        
            // Add "Press to Start" text
            this.add.text(this.cameras.main.centerX, 800, 'Press to Start', {
                fontSize: '40px',
                fontFamily: 'Helvetica',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
        
            // Initialize audio clips
            this.audioClips = [
                this.sound.add('audio1'),
                this.sound.add('audio2'),
                this.sound.add('audio3')
            ];
        
            // Play random audio
            const randomIndex = Phaser.Math.Between(0, this.audioClips.length - 1);
            const randomClip = this.audioClips[randomIndex];
            randomClip.play();
        
            // Set up input event to transition back to main scene
            this.input.on('pointerdown', () => {
                // Stop the currently playing random audio clip
                randomClip.stop();
        
                // Start the main scene
                this.scene.start('mainScene');
            });
        
        }
        
}

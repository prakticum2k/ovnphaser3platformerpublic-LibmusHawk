class MenuScene extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    preload() {
        this.load.audio('click', 'assets/audio/click.wav')

        this.load.audio('balkan', '/assets/audio/balkan.mp3');
    }
    create() {
        // Add background \n


        this.add.rectangle(0, 0, 1920, 1080, '#00000').setOrigin(0);

        this.add.text(750, 400, 'Sörnäs').setFontSize(100).setFontStyle('bold italic').setFontFamily('Arial').setBackgroundColor('#808080');
        const startText = this.add.text(700, 700, 'Click anywhere to start', { fontSize: '32px', fill: '#fff' });

        this.music = this.sound.add('balkan', { loop: true });
        this.music.play();

        // Add an invisible button to start the game
        const startButton = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0).setOrigin(0);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {

            const click = this.sound.add('click');

        click.play();
            startText.destroy(); // Remove the text
            startButton.destroy(); // Remove the button
            this.scene.start('loadingScene');
            this.music.stop();
        });
    }
}
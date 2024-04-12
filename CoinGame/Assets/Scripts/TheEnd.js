class TheEnd extends Phaser.Scene {
    constructor() {
        super('theEnd');
    }

    preload ()
    {
        this.load.image('raster', 'assets/images/MagicMoscchroom.png');
        this.load.audio('click', 'assets/audio/click.wav')
        this.load.audio('balkan', '/assets/audio/magicmoshromm.wav');
    }

    create ()
    {
        const sprite1 = this.add.sprite(0, 100, 'raster');
        const sprite2 = this.add.sprite(-100, 0, 'raster').setAngle(90);
        const sprite3 = this.add.sprite(0, -100, 'raster').setAngle(180);
        const sprite4 = this.add.sprite(100, 0, 'raster').setAngle(270);

        this.music = this.sound.add('balkan', { loop: true });
        this.music.play();

        this.add.text(750, 400, 'The End').setFontSize(100).setFontStyle('bold italic').setFontFamily('Arial').setBackgroundColor('#ff0000');
        const startText = this.add.text(700, 700, 'Click anywhere to restart', { fontSize: '32px', fill: '#fff' });

        const containers = [];

        for (let i = 0; i < 32; i++)
        {
            const container = this.add.container(960, 540);

            if (i > 0)
            {
                container.setExclusive(false);
            }

            container.add([ sprite1, sprite2, sprite3, sprite4 ]);

            container.setBlendMode(1);

            containers.push(container);
        }

        this.tweens.add({
            targets: sprite1,
            y: -200,
            ease: 'Sine.easeInOut',
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            targets: sprite2,
            x: 300,
            ease: 'Sine.easeInOut',
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            targets: sprite3,
            y: 200,
            ease: 'Sine.easeInOut',
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            targets: sprite4,
            x: -300,
            ease: 'Sine.easeInOut',
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            targets: containers,
            angle: { value: 360, duration: 6000 },
            scaleX: { value: 5, duration: 3000, yoyo: true, ease: 'Quad.easeInOut' },
            scaleY: { value: 5, duration: 3000, yoyo: true, ease: 'Cubic.easeInOut' },
            repeat: -1,
            delay: function (target, key, value, index, total, tween)
            {
                return index * 64;
            }
        });

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



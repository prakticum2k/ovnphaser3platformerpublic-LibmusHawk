const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#00000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [MenuScene, LoadingScene, MainScene, MainScene2, DeathScene, TheEnd],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false,
        transparent: false,
        clearBeforeRender: true,
        premultipliedAlpha: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default',
        batchSize: 4096,
        maxTextures: 16,
        resolution: 1,
        autoResize: false,
    },
    glowFilter: {
        distance: 40,
        outerStrength: 100,
        innerStrength: 5,
        color: 0xffffff,
        quality: 0.1,
    },
};

// Initialize
const game = new Phaser.Game(config);
class ThrowableBottle extends MoveableObject {

    isBroken = false;

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.width = 50;
        this.height = 60;
        this.speed = 20;
        this.applyGravity();
        this.ground_Y_Position = 360;
    }

    throw() {
        this.speedY = 20;

        const bottleInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }

            this.playAnimation(this.IMAGES_ROTATION, true);
            if (this.y >= this.ground_Y_Position) {
                clearInterval(bottleInterval);
                this.currentImage = 0;
                this.playSplashAnimation();
            }
        }, 1000 / 25);

    }

    playSplashAnimation() {
        const splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH, false);
            if (this.currentImage === this.IMAGES_SPLASH.length - 1) {
                clearInterval(splashInterval);
                setTimeout(() => {
                    this.isBroken = true;
                }, 200);
            }
        }, 1000 / 25);
    }

}
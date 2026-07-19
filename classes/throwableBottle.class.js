class ThrowableBottle extends MoveableObject {

    isBroken = false;

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.width = 50;
        this.height = 60;
        this.speed = 10;
        this.applyGravity();
        this.ground_Y_Position = 360;
    }

    throw() {
        this.speedY = 30;

        const bottleInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }

            this.playAnimation(this.IMAGES_ROTATION, true);
            if (this.y >= this.ground_Y_Position) {
                clearInterval(bottleInterval);
                this.isBroken = true;
            }
          }, 1000 / 25);

    }


}
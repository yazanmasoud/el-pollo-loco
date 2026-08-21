class ChickenSmall extends MoveableObject {
    width = 50;
    height = 50;
    damage = 0.5;
    ground_Y_Position = 430;
    offset = {
        top: 10,
        bottom: 10,
        left: 5,
        right: 10
    };
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.setGroundPosition();
        this.x = 200 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.15;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING, true);
            }
        }, 200);
    }

}

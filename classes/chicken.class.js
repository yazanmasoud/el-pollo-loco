/**
 * Represents a normal chicken enemy in the game.
 * The chicken moves continuously to the left and plays
 * a walking animation until it is defeated.
 *
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {

    width = 80;
    height = 80;
    damage = 0.5;
    energy = 20;

    offset = {
        top: 10,
        bottom: 10,
        left: 5,
        right: 10
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a new chicken with a random position and movement speed.
     */
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

    /**
     * Starts the movement and walking animation of the chicken.
     * Both stop when the chicken is defeated.
     */
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
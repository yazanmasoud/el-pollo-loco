/**
 * Represents the final boss enemy of the game.
 * Handles the boss's movement and animations during the fight.
 *
 * @extends MoveableObject
 */
class Boss extends MoveableObject {
    width = 250;
    height = 350;
    energy = 100;
    x = 5000;
    fightStarted = false;
    currentAnimation = 'alert';
    speed = 0.5;

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates a new boss instance and loads all required images.
     */
    constructor() {
        super();
        this.setGroundPosition();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.img = this.imageCache[this.IMAGES_WALKING[0]];

        this.animate();
    }

    /**
     * Handles the boss animation depending on its current state.
     */
    handelBossAnimation() {
        if (this.currentAnimation === 'alert') {
            this.playAnimation(this.IMAGES_ALERT, true);
        }

        if (this.currentAnimation === 'walking') {
            this.playAnimation(this.IMAGES_WALKING, true);
        }
    }

    /**
     * Starts the boss movement and animation intervals.
     */
    animate() {
        setInterval(() => {
            if (this.fightStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.handelBossAnimation();
        }, 150);
    }
}
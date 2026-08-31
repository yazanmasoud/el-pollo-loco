/**
 * Represents the playable character of the game.
 * Handles player movement, animations, jumping, bottle throwing,
 * enemy interactions, and camera movement.
 *
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    x = 50;
    speed = 5;
    coinsAmount = 0;
    bottleAmount = 0;
    interval_counter = 0;
    throwPressed = false;
    canMove = true;
    currentAnimation = 'idle';
    deathSoundPlayed = false;

    offset = {
        top: 85,
        bottom: 10,
        left: 20,
        right: 30
    };

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_JUMP = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Creates a new character instance and initializes its images,
     * gravity, position, and animations.
     */
    constructor() {
        super();

        this.setGroundPosition();
        this.previousY = this.y;

        this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.applyGravity();
        this.animate();
    }

    /**
     * Applies damage to the character and plays the corresponding sound.
     *
     * @param {number} damage - The amount of damage received.
     */
    hit(damage) {
        super.hit(damage);

        if (this.isDead() && !this.deathSoundPlayed) {
            this.deathSoundPlayed = true;

            this.world.audioManager.playSound(
                this.world.audioManager.characterDieSound
            );
        } else if (!this.isDead() &&
            this.world.audioManager.characterHurtSound.paused) {

            this.world.audioManager.playSound(
                this.world.audioManager.characterHurtSound
            );
        }
    }

    /**
     * Starts the character's movement controls and animation handling.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                return;
            }

            if (this.world.keyboard.RIGHT && this.canMove) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0 && this.canMove) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (!this.world.bossIntro.active) {
                this.world.camera_x = -this.x + 100;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround() && this.canMove) {
                this.jump();
            }

            if (this.world.keyboard.D && this.bottleAmount > 0 && !this.throwPressed && this.canMove) {
                this.throwBottle();
                this.throwPressed = true;
            }

            if (!this.world.keyboard.D) {
                this.throwPressed = false;
            }

        }, 1000 / 60);

        setInterval(() => {
            this.interval_counter++;

            if (this.isHurt()) {
                if (this.currentAnimation !== 'hurt') {
                    this.currentAnimation = 'hurt';
                    this.currentImage = 0;
                }

                this.playAnimation(this.IMAGES_HURT, true);
            }

            else if (this.isDead()) {
                if (this.currentAnimation !== 'dead') {
                    this.currentAnimation = 'dead';
                    this.currentImage = 0;
                }

                this.playAnimation(this.IMAGES_DEAD, false);
            }

            else if (this.isAboveGround()) {
                if (this.currentAnimation !== 'jump') {
                    this.currentAnimation = 'jump';
                    this.currentImage = 0;
                }

                this.playAnimation(this.IMAGES_JUMP, true);
            }

            else if (this.canMove && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                if (this.currentAnimation !== 'walking') {
                    this.currentAnimation = 'walking';
                    this.currentImage = 0;
                }

                this.playAnimation(this.IMAGES_WALKING, true);

            } else if (this.interval_counter % 2 == 0) {
                if (this.currentAnimation !== 'idle') {
                    this.currentAnimation = 'idle';
                    this.currentImage = 0;
                }

                this.playAnimation(this.IMAGES_IDLE, true);
            }

        }, 100);
    }

    /**
     * Creates and throws a bottle in the direction the character is facing.
     * Decreases the number of available bottles after throwing.
     */
    throwBottle() {
        let offset = this.otherDirection ? -50 : 100;
        let thrownBottle = new ThrowableBottle(
            this.x + offset,
            this.y + 100,
            this.otherDirection
        );

        if (this.otherDirection) {
            thrownBottle.x = this.x - 50;
        }

        this.world.throwableBottles.push(thrownBottle);
        thrownBottle.throw();
        this.bottleAmount--;
    }

    /**
     * Checks whether the character jumped onto an enemy from above.
     *
     * @param {MoveableObject} enemy - The enemy to check.
     * @returns {boolean} True if the character landed on the enemy from above.
     */
    isJumpingOnEnemy(enemy) {
        const characterFeetBefore =
            this.previousY + this.height - this.offset.bottom;

        const characterFeetNow =
            this.y + this.height - this.offset.bottom;

        const enemyTop =
            enemy.y + enemy.offset.top;

        return characterFeetBefore <= enemyTop &&
            characterFeetNow >= enemyTop;
    }

    /**
     * Makes the character bounce upward after jumping on an enemy.
     */
    bounce() {
        this.speedY = -20;
    }
}
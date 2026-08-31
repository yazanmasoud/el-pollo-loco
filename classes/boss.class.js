/**
 * Represents the final boss enemy of the game.
 * Handles the boss's movement and animations during the fight.
 *
 * @extends MoveableObject
 */
class Boss extends MoveableObject {
    width = 250;
    height = 350;
    energy = 200;
    x = 5000;
    speed = 0.5;
    damage = 10;

    isAttacking = false;
    fightStarted = false;
    attackDamageDone = false;
    deadAnimationFinished = false;
    deadAnimationEnding = false;
    chickensSummonedAt60 = false;
    chickensSummonedAt30 = false;

    currentAnimation = 'alert';


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
     * Applies damage to the boss, plays the hurt sound,
     * updates its speed, and triggers enemy reinforcements.
     *
     * @param {number} damage - The amount of damage received.
     */
    hit(damage) {
        super.hit(damage);

        if (!this.isDead() &&
            this.world.audioManager.bossHurtSound.paused) {

            this.world.audioManager.playSound(
                this.world.audioManager.bossHurtSound
            );
        }

        this.updateSpeed();

        if (this.energy <= 120 && !this.chickensSummonedAt60) {
            this.chickensSummonedAt60 = true;
            this.summonChickens();
        }

        if (this.energy <= 60 && !this.chickensSummonedAt30) {
            this.chickensSummonedAt30 = true;
            this.summonChickens();
        }
    }

    /**
     * Creates and adds two chickens near the boss with
     * different movement speeds.
     */
    summonChickens() {
        const chicken1 = new Chicken(this.x - 100, 1.5);
        const chicken2 = new Chicken(this.x - 180, 2.5);

        this.world.level.enemies.push(chicken1, chicken2);
    }

    /**
     * Updates the boss speed based on its remaining energy.
     */
    updateSpeed() {
        if (this.energy <= 60) {
            this.speed = 5;
        } else if (this.energy <= 120) {
            this.speed = 2;
        } else {
            this.speed = 1;
        }
    }

    /**
     * Checks whether the character is close enough to attack.
     *
     * @returns {boolean} True if the character is within attack range.
     */
    isCharacterInAttackRange() {
        return Math.abs(this.world.character.x - this.x) < 220;
    }

    /**
     * Starts an attack if the boss is not already attacking.
     */
    attack() {
        if (this.isAttacking) return;

        this.isAttacking = true;
        this.attackDamageDone = false;
        this.currentAnimation = 'attack';
        this.currentImage = 0;
    }

    /**
     * Handles the boss animation depending on its current state.
     */
    handleBossAnimation() {
        if (this.isDead()) {
            this.handleDeadAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAttacking) {
            this.handleAttackAnimation();
        } else if (this.fightStarted) {
            this.handleWalkingAnimation();
        } else {
            this.handleAlertAnimation();
        }
    }

    /**
     * Handles the boss death animation and plays the death sound once.
     */
    handleDeadAnimation() {
        if (this.currentAnimation !== 'dead') {
            this.currentAnimation = 'dead';
            this.currentImage = 0;

            this.world.audioManager.playSound(
                this.world.audioManager.bossDieSound
            );
        }

        this.playAnimation(this.IMAGES_DEAD, false);
        this.finishDeadAnimation();
    }

    /**
     * Finishes the boss death animation after the last image.
     */
    finishDeadAnimation() {
        if (this.currentImage !== this.IMAGES_DEAD.length - 1 ||
            this.deadAnimationEnding) return;

        this.deadAnimationEnding = true;

        setTimeout(() => {
            this.deadAnimationFinished = true;
        }, 1000);
    }

    /**
     * Handles the boss hurt animation.
     */
    handleHurtAnimation() {
        if (this.currentAnimation !== 'hurt') {
            this.currentAnimation = 'hurt';
            this.currentImage = 0;
        }

        this.playAnimation(this.IMAGES_HURT, true);
    }

    /**
     * Handles the boss attack animation.
     */
    handleAttackAnimation() {
        if (this.currentAnimation !== 'attack') {
            this.currentAnimation = 'attack';
            this.currentImage = 0;
        }

        this.playAnimation(this.IMAGES_ATTACK, false);

        if (this.currentImage === 4 && !this.attackDamageDone) {
            this.world.character.hit(this.damage);
            this.attackDamageDone = true;
        }

        if (this.currentImage >= this.IMAGES_ATTACK.length - 1) {
            this.isAttacking = false;
        }
    }

    /**
     * Handles the boss walking animation.
     */
    handleWalkingAnimation() {
        if (this.currentAnimation !== 'walking') {
            this.currentAnimation = 'walking';
            this.currentImage = 0;
        }

        this.playAnimation(this.IMAGES_WALKING, true);
    }

    /**
     * Handles the boss alert animation.
     */
    handleAlertAnimation() {
        if (this.currentAnimation !== 'alert') {
            this.currentAnimation = 'alert';
            this.currentImage = 0;
        }

        this.playAnimation(this.IMAGES_ALERT, true);
    }

    /**
     * Starts the boss movement and animation intervals.
     */
    animate() {
        setInterval(() => {
            if (this.fightStarted && !this.isDead()) {
                if (this.isCharacterInAttackRange()) {
                    this.attack();
                } else {
                    this.followCharacter();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            this.handleBossAnimation();
        }, 150);
    }

    /**
     * Makes the boss follow the character.
     */
    followCharacter() {
        if (this.world.character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
    }
}
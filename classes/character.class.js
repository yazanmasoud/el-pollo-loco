class Character extends MoveableObject {
    x = 50;
    y = 200;
    speed = 5;
    coinsAmount = 0;
    bottleAmount = 0;
    interval_counter = 0;
    throwPressed = false;
    currentAnimation = 'idle';
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
    ]

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
    ]

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ]


    constructor() {
        super();
        this.setGroundPosition();
        this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.speed = this.speed;
    }


    animate() {

        setInterval(() => {
            if (this.isDead()) {
                return;
            }

            if (this.world.keyboard.RIGHT) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.D && this.bottleAmount > 0 && !this.throwPressed) {
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

            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
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


    throwBottle() {
        let offset = this.otherDirection ? -50 : 100;
        let bottle = new ThrowableBottle(this.x + offset, this.y + 100, this.otherDirection);
        if (this.otherDirection) {
            bottle.x = this.x - 50;
        }
        this.world.throwableBottles.push(bottle);
        bottle.throw();
        this.bottleAmount--;
    }

    isJumpingOnEnemy(enemy) {
        let characterFeetBefor = this.previousY + this.height - this.offset.bottom;
        let characterFeetNow = this.y + this.height - this.offset.bottom;
        let enemyTop = enemy.y + enemy.offset.top;

        return this.speedY > 0 &&
            characterFeetBefor <= enemyTop &&
            characterFeetNow >= enemyTop;
    }

    bounce() {
        this.speedY = -20;
    }
}
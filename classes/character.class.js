class Character extends MoveableObject {
    x = 50;
    y = 200;
    speed = 5;
    interval_counter = 0;
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


    constructor() {
        super();
        this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.speed = this.speed;
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_End_X) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);


        setInterval(() => {
            this.interval_counter++;
            console.log(this.interval_counter);


            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                this.playAnimation(this.IMAGES_WALKING);

            } else if (this.interval_counter % 2 == 0) {
                this.playAnimation(this.IMAGES_IDLE);
            }

        }, 100);
    }
}
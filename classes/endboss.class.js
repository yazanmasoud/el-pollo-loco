class Endboss extends MoveableObject {
    speed = 10;
    width = 120;
    height = 180;

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',

    ]


    constructor() {
        super();
        this.loadImage('assets/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 10;
        this.x = 500;
        this.y = 270;
    }

}
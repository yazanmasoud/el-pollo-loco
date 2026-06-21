class Chicken extends MoveableObject {

    width = 80;
    height = 80;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.15;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

    }

animate() {
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
        let index = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 200);
}
}
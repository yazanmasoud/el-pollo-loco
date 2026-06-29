class MoveableObject {
    x = 120;
    y = 350;
    img;
    width = 100;
    height = 230;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    playAnimation(images) {
        let index = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {

       
        
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < this.ground_Y_Position
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.y -= this.speed;
    }

    animate() {
        this.moveLeft();
    }
}
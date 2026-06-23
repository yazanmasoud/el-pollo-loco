class MoveableObject {
    x = 120;
    y = 350;
    img;
    width = 100;
    height = 230;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
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

    moveRight() {
        this.x += 5;

    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        console.log("yoho am jumping...");

    }
    animate() {
        this.moveLeft();
    }
}
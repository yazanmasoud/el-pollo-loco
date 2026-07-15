class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    dead = false;
    lastHit = 0;
    ground_Y_Position = 200;





    playAnimation(images, loop) {
        if (!loop) {
            if (this.currentImage < images.length) {
                let index = this.currentImage;
                let path = images[index];
                this.img = this.imageCache[path];
                if (this.currentImage === images.length - 1) {
                    return;
                }
                this.currentImage++;
            }
        } else {
            let index = this.currentImage % images.length;
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;

        }
    }

    applyGravity() {



        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit(damage) {
        this.energy -= damage;
        this.lastHit = Date.now();
        if (this.energy <= 0) {
            this.energy = 0;
            this.dead = true;

        };
    }

    isDead() {
        return this.dead === true;
    }

    isHurt() {
        if (!this.isDead()) {
            let timepassed = Date.now() - this.lastHit;
            timepassed = timepassed / 1000;
            return timepassed < 0.5;
        }
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
        this.speedY = 30;
    }

    animate() {
        this.moveLeft();
    }
}
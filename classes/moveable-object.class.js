/**
 * Represents a movable game object with movement, gravity,
 * collision detection, health, and animation functionality.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    previousY = 0;
    energy = 100;
    dead = false;
    lastHit = 0;
    ground_Y_Position = 430;

    /**
     * Sets the object on the ground based on its height.
     */
    setGroundPosition() {
        this.y = this.ground_Y_Position - this.height;
    }

    /**
     * Plays an animation using the provided image array.
     *
     * @param {string[]} images - Array containing the image paths of the animation.
     * @param {boolean} loop - Determines whether the animation should repeat.
     */
    playAnimation(images, loop) {
        let index = loop
            ? this.currentImage % images.length
            : Math.min(this.currentImage, images.length - 1);

        let path = images[index];
        this.img = this.imageCache[path];

        if (loop || this.currentImage < images.length - 1) {
            this.currentImage++;
        }
    }

    /**
     * Displays the dead animation image of the object.
     */
    playDeadAnimation() {
        this.img = this.imageCache[this.IMAGE_DEAD[0]];
    }

    /**
     * Applies gravity to the object and handles collisions with the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.previousY = this.y;
                this.y += this.speedY;
                this.speedY += this.acceleration;

                if (this.y + this.height >= this.ground_Y_Position) {
                    this.y = this.ground_Y_Position - this.height;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether this object is colliding with another movable object.
     *
     * @param {MoveableObject} mo - The object to check for a collision with.
     * @returns {boolean} True if both objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy by the specified amount.
     * Marks the object as dead when its energy reaches zero.
     *
     * @param {number} damage - The amount of damage to apply.
     */
    hit(damage) {
        this.energy -= damage;
        this.lastHit = Date.now();

        if (this.energy <= 0) {
            this.energy = 0;
            this.dead = true;
        }
    }

    /**
     * Checks whether the object is dead.
     *
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.dead === true;
    }

    /**
     * Checks whether the object was recently hit.
     *
     * @returns {boolean|undefined} True if the object is currently hurt.
     */
    isHurt() {
        if (!this.isDead()) {
            let timepassed = Date.now() - this.lastHit;
            timepassed = timepassed / 1000;
            return timepassed < 0.5;
        }
    }

    /**
     * Checks whether the object is currently above the ground.
     *
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround() {
        return this.y + this.height < this.ground_Y_Position;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying an upward velocity.
     */
    jump() {
        this.speedY = -20;
    }

    /**
     * Starts the default animation behavior of the object.
     */
    animate() {
        this.moveLeft();
    }
}
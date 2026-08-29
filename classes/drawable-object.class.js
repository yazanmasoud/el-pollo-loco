/**
 * Represents a drawable object in the game.
 * Provides basic properties and methods for loading
 * and drawing images on the canvas.
 */
class DrawableObject {
    x = 120;
    y = 350;
    img;
    width = 100;
    height = 230;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Loads a single image.
     *
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's image on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images and stores them in the image cache.
     *
     * @param {string[]} arr - An array containing image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
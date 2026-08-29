/**
 * Represents a background object in the game.
 * Background objects are used to create the visual
 * environment of the level.
 *
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     *
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
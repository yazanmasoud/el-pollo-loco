/**
 * Represents a collectible salsa bottle in the game.
 * The character can collect bottles to use them as throwable weapons.
 *
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {

    width = 50;
    height = 50;

    /**
     * Creates a new collectible bottle at the specified position.
     *
     * @param {number} x - The horizontal position of the bottle.
     * @param {number} y - The vertical position of the bottle.
     */
    constructor(x, y) {
        super();

        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.x = x;
        this.y = y;
    }
}
/**
 * Represents a collectible coin in the game.
 * Coins can be collected by the character.
 *
 * @extends DrawableObject
 */
class Coins extends DrawableObject {
    width = 90;
    height = 90;
    y = 365;

    /**
     * Creates a new coin at the specified position.
     *
     * @param {number} x - The horizontal position of the coin.
     * @param {number} y - The vertical position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}
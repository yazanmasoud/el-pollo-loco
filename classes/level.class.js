/**
 * Represents a game level.
 * Stores all objects and configuration needed for the level,
 * including enemies, clouds, background objects, coins, and bottles.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    level_End_X = 4500;

    /**
     * Creates a new game level with all required game objects.
     *
     * @param {MoveableObject[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects of the level.
     * @param {Coins[]} coins - The collectible coins in the level.
     * @param {Bottle[]} bottle - The collectible bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}
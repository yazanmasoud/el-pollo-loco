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
    bottles;
    totalCoins;
    totalBottles;
    level_End_X = 4000;

    /**
     * Creates a new game level with all required game objects.
     *
     * @param {MoveableObject[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects of the level.
     * @param {Coins[]} coins - The collectible coins in the level.
     * @param {Bottle[]} bottles - The collectible bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.totalCoins = coins.length;
        this.totalBottles = bottles.length;
    }
}
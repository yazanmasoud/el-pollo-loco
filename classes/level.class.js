class Level {
    enemies;
    cloud;
    backgroundObjects;
    coins;
    bottle
    level_End_X = 4900;

    constructor (enemies, clouds, backgroundObjects, coins, bottle){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}
class Level {
    enemies;
    cloud;
    backgroundObjects;
    coins;
    level_End_X = 1800;

    constructor (enemies, clouds, backgroundObjects, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}
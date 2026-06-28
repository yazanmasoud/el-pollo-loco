class Level {
    enemies;
    cloud;
    backgroundObjects;
    level_End_X = 1800;

    constructor (enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
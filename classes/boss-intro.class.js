class BossIntro {
    active = false;

    constructor(world) {
        this.world = world;
    }
    start() {
        this.active = true;
        this.world.character.canMove = false;
    }
}
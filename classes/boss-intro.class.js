class BossIntro {
    active = false;

    constructor(world) {
        this.world = world;
    }
    start() {
        this.active = true;
        this.world.character.canMove = false;
        this.startCameraX = this.world.camera_x;
        this.playBossAlert();

        setInterval(() => {
            this.moveCamera();
        }, 1000 / 60);
    }

    moveCamera() {
        if (this.world.camera_x > this.startCameraX - 500) {
            this.world.camera_x -= 2;
        }
    }

    playBossAlert() {
        this.world.boss.playAlertAnimation();
    }
}
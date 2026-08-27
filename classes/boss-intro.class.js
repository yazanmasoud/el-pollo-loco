class BossIntro {
    active = false;
    phase = 'cameraToBoss';

    constructor(world) {
        this.world = world;
    }
    start() {
        this.active = true;
        this.phase = 'cameraToBoss';
        this.world.character.canMove = false;
        this.startCameraX = this.world.camera_x;

        setInterval(() => {
            this.moveCamera();
        }, 1000 / 60);
    }

    moveCamera() {
        if (this.phase === 'cameraToBoss') {
            this.moveCameraToBoss();
        }

        if (this.phase === 'cameraBack') {
            this.moveCameraBack();
        }
    }

    moveCameraToBoss() {
        if (this.world.camera_x > this.startCameraX - 500) {
            this.world.camera_x -= 2;
        } else {
            this.phase = 'bossAlert';
            this.playBossAlert();
        }
    }

    moveCameraBack() {
        if (this.world.camera_x < this.startCameraX) {
            this.world.camera_x += 2;
        } else {
            this.finishIntro();
        }
    }

    finishIntro() {
        this.phase = 'finished';
        this.active = false;
        this.world.character.canMove = true;
    }

    playBossAlert() {
        this.world.boss.playAlertAnimation(() => {
            this.phase = 'cameraBack';
        });
    }
}
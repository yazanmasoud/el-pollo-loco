/**
 * Controls the introduction sequence of the boss fight.
 * Handles the camera movement, boss alert animation,
 * and the start of the boss fight.
 */
class BossIntro {
    active = false;
    phase = 'cameraToBoss';

    /**
     * Creates a new boss intro controller.
     *
     * @param {World} world - The game world containing the character, camera, and boss.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Starts the boss introduction sequence.
     * Disables character movement and begins moving the camera toward the boss.
     */
    start() {
        this.active = true;
        this.phase = 'cameraToBoss';
        this.world.character.canMove = false;
        this.world.level.enemies = [];
        this.startCameraX = this.world.camera_x;

        setInterval(() => {
            this.moveCamera();
        }, 1000 / 60);
    }

    /**
     * Controls the camera movement depending on the current intro phase.
     */
    moveCamera() {
        if (this.phase === 'cameraToBoss') {
            this.moveCameraToBoss();
        }

        if (this.phase === 'cameraBack') {
            this.moveCameraBack();
        }
    }

    /**
     * Moves the camera toward the boss.
     * Starts the boss alert phase when the camera reaches its target position.
     */
    moveCameraToBoss() {
        if (this.world.camera_x > this.startCameraX - 500) {
            this.world.camera_x -= 3;
        } else {
            this.phase = 'bossAlert';
            this.playBossAlert();
        }
    }

    /**
     * Moves the camera back to its original position.
     * Finishes the intro sequence when the camera reaches its starting position.
     */
    moveCameraBack() {
        if (this.world.camera_x < this.startCameraX) {
            this.world.camera_x += 4;
        } else {
            this.finishIntro();
        }
    }

    /**
     * Finishes the boss introduction sequence.
     * Enables character movement and starts the boss fight.
     */
    finishIntro() {
        this.phase = 'finished';
        this.active = false;
        this.world.character.canMove = true;
        this.world.boss.fightStarted = true;
        this.world.boss.currentAnimation = 'walking';
    }

    /**
     * Plays the boss alert phase before moving the camera back to the character.
     */
    playBossAlert() {
        this.world.boss.currentAnimation = 'alert';

        setTimeout(() => {
            this.phase = 'cameraBack';
        }, 2000);
    }
}
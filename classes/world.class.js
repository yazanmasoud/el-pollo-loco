/**
 * Represents the game world.
 * Manages the character, enemies, collectibles, boss,
 * collisions, camera, and rendering of all game objects.
 */
class World {
    character = new Character();
    statusBar = new StatusBar();
    healthStatusBar = new HealthStatusBar();
    coinsStatusBar = new CoinsStatusBar();
    bottleStatusBar = new BottleStatusBar();
    startScreen = new StartScreen();
    boss;
    bossIntro;
    bossStarted = false;
    throwableBottles = [];
    ctx;
    camera_x = 0;
    level = level1;
    gameStarted = false;

    /**
     * Creates a new game world.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element used to render the game.
     * @param {Keyboard} keyboard - The keyboard object used to control the character.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.world = this;
        this.bossIntro = new BossIntro(this);
        this.draw();
        this.setWorld();
        this.checkEnemyCollisions();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
        this.checkBottleEnemyCollisions();
        this.removeBrokenBottles();
        this.checkLevelEnd();
    }

    /**
     * Defeats an enemy and removes it from the level after a short delay.
     *
     * @param {MoveableObject} enemy - The enemy to defeat.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    killEnemy(enemy, index) {
        enemy.dead = true;
        enemy.playDeadAnimation();

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Continuously checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        setInterval(() => {
            for (let i = 0; i < this.level.enemies.length; i++) {
                this.handleEnemyCollision(this.level.enemies[i], i);
            }
        }, 1000 / 25);
    }

    /**
     * Handles a collision between the character and an enemy.
     * The enemy is defeated if the character jumps on it;
     * otherwise, the character receives damage.
     *
     * @param {MoveableObject} enemy - The enemy involved in the collision.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handleEnemyCollision(enemy, index) {
        if (enemy.dead) return;

        if (this.character.isColliding(enemy)) {
            if (this.character.isJumpingOnEnemy(enemy)) {
                this.killEnemy(enemy, index);
                this.character.bounce();
            } else {
                this.character.hit(enemy.damage);
            }
        }
    }

    /**
     * Continuously checks for collisions between throwable bottles and enemies.
     */
    checkBottleEnemyCollisions() {
        setInterval(() => {
            this.throwableBottles.forEach((bottle) => {
                this.handleBottleEnemyCollision(bottle);
            });
        }, 1000 / 25);
    }

    /**
     * Handles a collision between a throwable bottle and an enemy.
     * Starts the splash animation and defeats the enemy.
     *
     * @param {ThrowableBottle} bottle - The throwable bottle to check.
     */
    handleBottleEnemyCollision(bottle) {
        if (bottle.isSplashing) {
            return;
        }

        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];

            if (bottle.isColliding(enemy)) {
                bottle.isSplashing = true;
                bottle.playSplashAnimation();
                this.killEnemy(enemy, i);
                break;
            }
        }
    }

    /**
     * Continuously checks for collisions between the character and coins.
     * Removes collected coins and increases the character's coin amount.
     */
    checkCoinsCollisions() {
        setInterval(() => {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.level.coins.splice(index, 1);
                    this.character.coinsAmount++;
                }
            });
        }, 100);
    }

    /**
     * Continuously checks for collisions between the character and bottles.
     * Removes collected bottles and increases the character's bottle amount.
     */
    checkBottleCollisions() {
        setInterval(() => {
            this.level.bottle.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.level.bottle.splice(index, 1);
                    this.character.bottleAmount++;
                }
            });
        }, 100);
    }

    /**
     * Checks whether the character has reached the end of the level.
     * Starts the boss introduction when the level end is reached.
     */
    checkLevelEnd() {
        setInterval(() => {
            if (this.character.x >= this.level.level_End_X && !this.bossStarted) {
                this.boss = new Boss();
                this.bossStarted = true;
                this.bossIntro.start();
            }
        }, 100);
    }

    /**
     * Draws all visible game objects on the canvas.
     * Also updates the camera position and status bars.
     */
    draw() {
        if (!this.gameStarted) {
            this.addToMap(this.startScreen);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.enemies);

            if (this.boss) {
                this.addToMap(this.boss);
            }

            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottle);
            this.addObjectsToMap(this.throwableBottles);
            this.addToMap(this.character);

            this.healthStatusBar.setPercentage(this.character.energy);
            this.coinsStatusBar.setPercentage(this.character.coinsAmount * 10);
            this.bottleStatusBar.setPercentage(this.character.bottleAmount * 10);

            this.ctx.translate(-this.camera_x, 0);

            this.addToMap(this.healthStatusBar);
            this.addToMap(this.coinsStatusBar);
            this.addToMap(this.bottleStatusBar);
        }

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Assigns this world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Draws multiple objects on the canvas.
     *
     * @param {DrawableObject[]} objects - The objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Draws an object on the canvas.
     * Flips the image when the object is facing the opposite direction.
     *
     * @param {DrawableObject} movableObject - The object to draw.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips an object's image horizontally on the canvas.
     *
     * @param {DrawableObject} movableObject - The object whose image should be flipped.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the canvas after flipping an object's image.
     *
     * @param {DrawableObject} movableObject - The object whose position should be restored.
     */
    flipImageBack(movableObject) {
        this.ctx.restore();
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Continuously removes broken bottles from the throwable bottles array.
     */
    removeBrokenBottles() {
        setInterval(() => {
            for (let i = 0; i < this.throwableBottles.length; i++) {
                let bottle = this.throwableBottles[i];

                if (bottle.isBroken) {
                    this.throwableBottles.splice(i, 1);
                }
            }
        }, 100);
    }
}
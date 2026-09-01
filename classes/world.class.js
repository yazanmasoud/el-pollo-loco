/**
 * Represents the game world.
 * Manages the character, enemies, collectibles, boss,
 * collisions, camera, and rendering of all game objects.
 */
class World {
    character = new Character();
    healthStatusBar = new HealthStatusBar();
    coinsStatusBar = new CoinsStatusBar();
    bottleStatusBar = new BottleStatusBar();

    startScreen = new StartScreen();


    boss;
    bossIntro;
    bossStatusBar;

    gameStarted = false;
    gameWon = false;
    gameLost = false;
    bossStarted = false;

    throwableBottles = [];
    intervalIds = [];
    ctx;
    camera_x = 0;
    level = createLevel1();


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
        this.audioManager = new AudioManager();
        this.collisionManager = new CollisionManager(this);
        this.draw();
        this.collisionManager.checkEnemyCollisions();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
        this.checkBottleEnemyCollisions();
        this.removeBrokenBottles();
        this.checkLevelEnd();
        this.checkGameLost();
        this.checkGameWon();
    }

    /**
     * Creates and stores a game interval.
     *
     * @param {Function} callback - The function to execute.
     * @param {number} time - The interval time in milliseconds.
     */
    setGameInterval(callback, time) {
        const interval = setInterval(callback, time);
        this.intervalIds.push(interval);
    }

    /**
     * Stops all game intervals.
     */
    stopGame() {
        this.intervalIds.forEach((interval) => {
            clearInterval(interval);
        });

        this.intervalIds = [];

        cancelAnimationFrame(this.animationFrameId);
    }

    /**
     * Defeats an enemy, plays its death animation and removes it
     * from the level after a short delay.
     *
     * @param {MoveableObject} enemy - The enemy to defeat.
     */
    killEnemy(enemy) {
        enemy.dead = true;
        enemy.playDeadAnimation();

        this.audioManager.playSound(
            this.audioManager.chickenDieSound
        );

        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);

            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 500);
    }

    /**
     * Continuously checks for collisions between throwable bottles and enemies.
     */
    checkBottleEnemyCollisions() {
        this.setGameInterval(() => {
            this.throwableBottles.forEach((bottle) => {
                this.handleBottleEnemyCollision(bottle);
            });
        }, 1000 / 25);
    }


    /**
     * Handles collisions between a throwable bottle and active enemies.
     *
     * @param {ThrowableBottle} bottle - The bottle to check.
     */
    handleBottleEnemyCollision(bottle) {
        if (bottle.isSplashing || bottle.isBroken) {
            return;
        }

        const enemies = this.getActiveEnemies();

        for (let i = 0; i < enemies.length; i++) {
            if (bottle.isColliding(enemies[i])) {
                this.handleBottleHit(bottle, enemies[i]);
                break;
            }
        }
    }

    /**
     * Returns all active enemies including the boss.
     *
     * @returns {MoveableObject[]} All active enemies.
     */
    getActiveEnemies() {
        const enemies = [...this.level.enemies];

        if (this.boss && !this.boss.isDead()) {
            enemies.push(this.boss);
        }

        return enemies;
    }

    /**
     * Handles a bottle hitting an enemy.
     *
     * @param {ThrowableBottle} bottle - The bottle that hit.
     * @param {MoveableObject} enemy - The enemy that was hit.
     */
    handleBottleHit(bottle, enemy) {

        bottle.isSplashing = true;
        bottle.playSplashAnimation();
        enemy.hit(20);

        this.removeDeadEnemy(enemy);
    }

    /**
     * Removes a dead regular enemy.
     *
     * @param {MoveableObject} enemy - The enemy to remove.
     */
    removeDeadEnemy(enemy) {
        if (enemy.isDead() && enemy !== this.boss) {
            this.killEnemy(
                enemy,
                this.level.enemies.indexOf(enemy)
            );
        }
    }

    /**
     * Continuously checks for collisions between the character and coins.
     * Removes collected coins and increases the character's coin amount.
     */
    checkCoinsCollisions() {
        this.setGameInterval(() => {
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
        this.setGameInterval(() => {
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.level.bottles.splice(index, 1);
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
        this.setGameInterval(() => {
            if (this.character.x >= this.level.level_End_X && !this.bossStarted) {
                this.boss = new Boss();
                this.boss.world = this;
                this.bossStatusBar = new BossStatusBar();
                this.bossStarted = true;
                this.bossIntro.start();
            }
        }, 100);
    }

    /**
     * Checks whether the character has lost the game.
     */
    checkGameLost() {
        this.setGameInterval(() => {
            if (this.character.isDead() && !this.gameLost) {
                this.gameLost = true;
                resetKeyboard();

                setTimeout(() => {
                    showEndScreen('lost');
                    this.audioManager.playSound(
                        this.audioManager.gameOverSound
                    );
                }, 1000);
            }
        }, 100);
    }

    /**
     * Checks whether the character has won the game.
     */
    checkGameWon() {
        this.setGameInterval(() => {
            if (
                this.boss &&
                this.boss.deadAnimationFinished &&
                !this.gameWon
            ) {
                this.gameWon = true;
                resetKeyboard();

                setTimeout(() => {
                    showEndScreen('won');
                }, 1000);
            }
        }, 100);
    }

    /**
     * Draws the current game screen depending on the game state.
     */
    draw() {
        if (!this.gameStarted) {
            this.addToMap(this.startScreen);
        } else {this.drawGame();

            if (this.gameLost || this.gameWon) {
                this.drawDarkOverlay();
            }
        }

        this.animationFrameId = requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws all game objects and status bars.
     */
    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);

        if (this.boss && !this.boss.deadAnimationFinished) {
            this.addToMap(this.boss);
        }

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableBottles);
        this.addToMap(this.character);

        this.updateStatusBars();

        this.ctx.translate(-this.camera_x, 0);

        this.drawStatusBars();
    }

    /**
     * Draws a dark overlay over the game.
     */
    drawDarkOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Updates all status bars with their current values.
     */
    updateStatusBars() {
        this.healthStatusBar.setCharacterEnergy(this.character.energy);
        this.coinsStatusBar.setCollectedAmount(
            this.character.coinsAmount, this.level.totalCoins
        );
        this.bottleStatusBar.setCollectedAmount(
            this.character.bottleAmount, this.level.totalBottles
        );

        if (this.boss) {this.bossStatusBar.setBossEnergy(this.boss.energy);}
    }

    /**
     * Draws all visible status bars.
     */
    drawStatusBars() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinsStatusBar);
        this.addToMap(this.bottleStatusBar);

        if (this.bossStatusBar) {
            this.addToMap(this.bossStatusBar);
        }
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
        this.setGameInterval(() => {
            for (let i = 0; i < this.throwableBottles.length; i++) {
                let bottle = this.throwableBottles[i];

                if (bottle.isBroken) {
                    this.throwableBottles.splice(i, 1);
                }
            }
        }, 100);
    }
}
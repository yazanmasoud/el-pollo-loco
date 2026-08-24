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

    killEnemy(enemy, index) {
        enemy.dead = true;
        enemy.playDeadAnimation();

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    checkEnemyCollisions() {
        setInterval(() => {
            
            for (let i = 0; i < this.level.enemies.length; i++) {
                this.handleEnemyCollision(this.level.enemies[i], i);
            }
        }, 1000 / 25);
    }

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

    checkBottleEnemyCollisions() {
        setInterval(() => {
            this.throwableBottles.forEach((bottle) => {
                this.handleBottleEnemyCollision(bottle);
            });
        }, 1000 / 25);
    }

    handleBottleEnemyCollision(bottle) {
        if (bottle.isSplashing) { return; }

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

    checkCoinsCollisions() {
        setInterval(() => {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.level.coins.splice(index, 1);
                    this.character.coinsAmount++;
                }
            })
        }, 100);
    }

    checkBottleCollisions() {
        setInterval(() => {
            this.level.bottle.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.level.bottle.splice(index, 1);
                    this.character.bottleAmount++;
                }
            })
        }, 100);
    }

    checkLevelEnd() {
        setInterval(() => {
            if (this.character.x >= this.level.level_End_X && !this.bossStarted) {
                this.boss = new Boss();
                this.bossStarted = true;
                this.bossIntro.start();
                
            }
        }, 100);
    }

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

    setWorld() {
        this.character.world = this;
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        this.ctx.restore();
        movableObject.x = movableObject.x * -1;
    }

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
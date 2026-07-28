class World {
    character = new Character();
    statusBar = new StatusBar();
    healthStatusBar = new HealthStatusBar();
    coinsStatusBar = new CoinsStatusBar();
    bottleStatusBar = new BottleStatusBar();
    throwableBottles = [];
    ctx;
    camera_x = 0;
    level = level1;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.world = this;
        this.draw();
        this.setWorld();
        this.checkEnemyCollisions();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
        this.checkBottleEnemyCollisions();
        this.removeBrokenBottles();

    }

    checkEnemyCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit(enemy.damage);
                }
            });
        }, 100);
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

    checkBottleEnemyCollisions() {
            setInterval(() =>{
                this.throwableBottles.forEach((bottle) => {
                    if (bottle.isBroken) {
                        return;
                    }
                    this.level.enemies.forEach((enemy, index) => {
                        if (bottle.isColliding(enemy)){
                            bottle.playSplashAnimation();
                           setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                           }, 40); 
                        }
                    })
                })


            }, 1000 / 25);
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
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
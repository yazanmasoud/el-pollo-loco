/**
 * Manages all collision checks in the game world.
 */
class CollisionManager {

    /**
     * Creates a collision manager for the given world.
     *
     * @param {World} world - The game world.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Continuously checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        setInterval(() => {
            for (let i = 0; i < this.world.level.enemies.length; i++) {
                this.handleEnemyCollision(
                    this.world.level.enemies[i]
                );
            }
        }, 1000 / 25);
    }

    /**
     * Handles a collision between the character and an enemy.
     *
     * @param {MoveableObject} enemy - The enemy involved in the collision.
     */
    handleEnemyCollision(enemy) {
        if (this.world.gameWon || this.world.gameLost) {
            return;
        }
        if (enemy.dead) return;

        if (this.world.character.isColliding(enemy)) {
            if (this.world.character.isJumpingOnEnemy(enemy)) {
                this.world.killEnemy(enemy);
                this.world.character.bounce();
            } else {
                this.world.character.hit(enemy.damage);
            }
        }
    }
}
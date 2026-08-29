/**
 * Represents a cloud in the game background.
 * Clouds are positioned randomly and can be animated
 * using the functionality inherited from MoveableObject.
 *
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    width = 300;
    height = 200;
    y = 70;

    /**
     * Creates a new cloud with a random horizontal position.
     */
    constructor() {
        super();
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }
}
/**
 * Represents a status bar in the game.
 * Displays a visual representation of a percentage value
 * using different status bar images.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    percentage = 100;
    x = 10;
    width = 200;
    height = 55;

    /**
     * Creates a new status bar.
     */
    constructor() {
        super();
    }

    /**
     * Sets the current percentage of the status bar
     * and updates the displayed image accordingly.
     *
     * @param {number} percentage - The percentage value to display.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which status bar image should be displayed
     * based on the current percentage value.
     *
     * @returns {number} The index of the corresponding status bar image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
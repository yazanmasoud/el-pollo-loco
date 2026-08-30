/**
 * Represents the status bar that displays the number of
 * salsa bottles collected by the character.
 *
 * @extends StatusBar
 */
class BottleStatusBar extends StatusBar {

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Creates a new bottle status bar.
     * Loads all status bar images and sets the initial percentage to zero.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 75;
        this.setPercentage(0);
    }

    /**
     * Updates the bottle bar based on the collected amount and total available bottles.
     *
     * @param {number} collectedBottles - The number of collected bottles.
     * @param {number} totalBottles - The total number of bottles in the level.
     */
    setCollectedAmount(collectedBottles, totalBottles) {
        let percentage = totalBottles === 0 ? 0 : (collectedBottles / totalBottles) * 100;
        this.setPercentage(Math.min(100, percentage));
    }
}
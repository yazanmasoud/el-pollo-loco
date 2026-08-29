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
}
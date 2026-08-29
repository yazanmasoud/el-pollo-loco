/**
 * Represents the status bar that displays the number of
 * coins collected by the character.
 *
 * @extends StatusBar
 */
class CoinsStatusBar extends StatusBar {

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates a new coin status bar.
     * Loads all status bar images and sets the initial percentage to zero.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 30;
        this.setPercentage(0);
    }
}
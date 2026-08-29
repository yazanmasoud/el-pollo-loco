/**
 * Represents the health status bar of the character.
 * Displays the character's current health percentage.
 *
 * @extends StatusBar
 */
class HealthStatusBar extends StatusBar {

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Creates a new health status bar.
     * Loads all status bar images and sets the initial health to 100 percent.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = -10;
        this.setPercentage(100);
    }
}
/**
 * Represents the start screen of the game.
 * Displays the introductory image before the game starts.
 *
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {

    /**
     * Creates a new start screen and initializes its image and dimensions.
     */
    constructor() {
        super();

        this.loadImage('assets/img/9_intro_outro_screens/start/startscreen_3.png');

        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}
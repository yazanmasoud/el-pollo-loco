/**
 * Manages all sound effects and music in the game.
 */
class AudioManager {

    menuMusic = new Audio("assets/audio/menu/menu.mp3");
    jumpSound = new Audio("assets/audio/character/jumping/jump.mp3");
    walkingSound = new Audio("assets/audio/character/walking/walking-through-grass.mp3");
    characterHurtSound = new Audio("assets/audio/character/hurt/hurt-character.mp3");
    characterDieSound = new Audio("assets/audio/character/die/man-death-scream.mp3");

    chickenDieSound = new Audio("assets/audio/enemy/die/chicken-die.mp3");
    bossHurtSound = new Audio("assets/audio/enemy/boss/boss-hurt.mp3");
    bossDieSound = new Audio("assets/audio/enemy/boss/boss-die.mp3");

    gameOverSound = new Audio("assets/audio/gameOver/gameOver.mp3");

    /**
     * Creates a new audio manager and configures the sounds.
     */
    constructor() {
        this.setupSounds();
    }

    /**
     * Configures volume and loop settings for all sounds.
     */
    setupSounds() {
        this.menuMusic.loop = true;
        this.walkingSound.loop = true;

        this.menuMusic.volume = 0.3;
        this.walkingSound.volume = 0.15;
    }

    /**
     * Plays a sound from the beginning.
     *
     * @param {HTMLAudioElement} sound - The sound to play.
     */
    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }
}
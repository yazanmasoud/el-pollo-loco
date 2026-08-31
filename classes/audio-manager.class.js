/**
 * Manages all sound effects and music in the game.
 */
class AudioManager {
    volumeState = 2;
    volumeMultiplier = 1;

    gameMusic = new Audio("assets/audio/menu/menu.mp3");
    jumpSound = new Audio("assets/audio/character/jumping/jump.mp3");
    walkingSound = new Audio("assets/audio/character/walking/walking-through-grass.mp3");
    characterHurtSound = new Audio("assets/audio/character/hurt/hurt-character.mp3");
    characterDieSound = new Audio("assets/audio/character/die/man-death-scream.mp3");
    throwBottleSound = new Audio("assets/audio/character/throwBottle/throw.mp3")

    chickenDieSound = new Audio("assets/audio/enemy/die/chicken-die.mp3");
    bossHurtSound = new Audio("assets/audio/enemy/boss/boss-hurt.mp3");
    bossDieSound = new Audio("assets/audio/enemy/boss/boss-die.mp3");

    gameOverSound = new Audio("assets/audio/gameOver/gameOver.mp3");

    /**
     * Creates a new audio manager and configures the sounds.
     */
    constructor() {
        this.muteButton = document.getElementById('mute');
        this.setupSounds();
        this.loadVolumeState();
    }

    /**
     * Loads the saved volume state from Local Storage.
     */
    loadVolumeState() {
        const savedVolumeState = localStorage.getItem('volumeState');

        if (savedVolumeState !== null) {
            this.volumeState = Number(savedVolumeState);
        }

        this.applyVolumeState();
    }

    /**
     * Applies the current volume state.
     */
    applyVolumeState() {
        if (this.volumeState === 2) {
            this.setVolume(1);

        } else if (this.volumeState === 1) {
            this.setVolume(0.4);

        } else {
            this.setVolume(0);
        }

        this.updateVolumeIcon();
    }

    /**
     * Updates the volume button icon.
     */
    updateVolumeIcon() {
        if (this.volumeState === 2) {
            this.muteButton.style.backgroundImage =
                'url("assets/img/icons/volume-high.svg")';

        } else if (this.volumeState === 1) {
            this.muteButton.style.backgroundImage =
                'url("assets/img/icons/volume-low.svg")';

        } else {
            this.muteButton.style.backgroundImage =
                'url("assets/img/icons/volume-off.svg")';
        }
    }

    setupSounds() {
        this.gameMusic.loop = true;
        this.walkingSound.loop = true;

        this.setVolume(1);
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

    /**
     * Starts the walking sound if it is not already playing.
     */
    playWalkingSound() {
        if (this.walkingSound.paused) {
            this.walkingSound.play();
        }
    }

    /**
     * Starts the game music.
     */
    playGameMusic() {
        this.gameMusic.play();
    }

    /**
     * Stops and resets the walking sound.
     */
    stopWalkingSound() {
        this.walkingSound.pause();
        this.walkingSound.currentTime = 0;
    }

    /**
 * Returns all game audio elements.
 *
 * @returns {HTMLAudioElement[]} All audio elements.
 */
    getAllSounds() {
        return [
            this.gameMusic,
            this.jumpSound,
            this.walkingSound,
            this.characterHurtSound,
            this.characterDieSound,
            this.throwBottleSound,
            this.chickenDieSound,
            this.bossHurtSound,
            this.bossDieSound,
            this.gameOverSound
        ];
    }

    /**
     * Changes the volume level between high, low, and muted.
     */
    controlVolume() {
        if (this.volumeState === 2) {
            this.volumeState = 1;

        } else if (this.volumeState === 1) {
            this.volumeState = 0;

        } else {
            this.volumeState = 2;
        }

        localStorage.setItem('volumeState', this.volumeState);

        this.applyVolumeState();
    }

    /**
     * Sets the volume multiplier for all game sounds.
     *
     * @param {number} multiplier - The volume multiplier between 0 and 1.
     */
    setVolume(multiplier) {
        this.volumeMultiplier = multiplier;

        this.gameMusic.volume = 0.15 * multiplier;
        this.jumpSound.volume = 0.4 * multiplier;
        this.walkingSound.volume = 0.3 * multiplier;
        this.characterHurtSound.volume = 0.4 * multiplier;
        this.characterDieSound.volume = 0.5 * multiplier;
        this.throwBottleSound.volume = 0.1 * multiplier;
        this.chickenDieSound.volume = 0.3 * multiplier;
        this.bossHurtSound.volume = 0.7 * multiplier;
        this.bossDieSound.volume = 0.8 * multiplier;
        this.gameOverSound.volume = 1 * multiplier;
    }
}
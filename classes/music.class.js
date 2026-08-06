class Music {
    menuMusic = new Audio("assets/audio/menu.mp3");

    constructor() {
        this.menuMusic.loop = true;
        this.menuMusic.volume = 0.3;
    }

    playMenuMusic() {
        this.menuMusic.play();
    }
}

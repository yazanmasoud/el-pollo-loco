class Music {
    volumeState = 2;
    menuMusic = new Audio("assets/audio/menu.mp3");

    constructor() {
        this.menuMusic.loop = true;
        this.menuMusic.volume = 0.3;
        this.muteButton = document.getElementById('mute');
    }

    playMenuMusic() {
        this.menuMusic.play();
    }

    controllVolume() {
        if (this.volumeState === 2) {
            this.muteButton.style.backgroundImage = 'url("assets/img/icons/volume-low.svg")';
            this.volumeState = 1;
            this.menuMusic.volume = 0.1;

        }

        else if (this.volumeState === 1) {
            this.muteButton.style.backgroundImage = 'url("assets/img/icons/volume-off.svg")';
            this.volumeState = 0;
            this.menuMusic.volume = 0;
        }

        else {
            this.muteButton.style.backgroundImage = 'url("assets/img/icons/volume-high.svg")';
            this.volumeState = 2;
            this.menuMusic.volume = 0.3;
        }
    }
}

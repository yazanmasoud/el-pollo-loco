let canvas;
let world;
let music;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    music = new Music();
}

function startGame() {
    world.gameStarted = true;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('controlsButton').style.display = 'none';
    document.getElementById('mute').style.display = 'none';
    document.getElementById('fullscreen').style.display = 'none';
    music.playMenuMusic();
}

function toggleFullscreen() {
    let gameContainer = document.getElementById('gameContainer');

    if (!gameContainer.fullscreenElement) {
        gameContainer.requestFullscreen();
    } else {
        if (gameContainer.exitFullscreen) {
            gameContainer.exitFullscreen();
        }
    }
}

function openControls() {
    document.getElementById("overlay").style.display = "flex";

}

function closeControls() {
    document.getElementById("overlay").style.display = "none";
}

window.addEventListener('keydown', (event) => {

    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.code == 'ArrowUp') {
        keyboard.UP = true;

    }
    if (event.code == 'Space') {
        keyboard.SPACE = true;

    }
    if (event.code == 'KeyD') {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {

    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.code == 'ArrowUp') {
        keyboard.UP = false;

    }
    if (event.code == 'Space') {
        keyboard.SPACE = false;

    }
    if (event.code == 'KeyD') {
        keyboard.D = false;
    }
});
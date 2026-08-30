let canvas;
let world;
let music;
let keyboard = new Keyboard();
let fullscreenButton;


/**
 * Initializes the game.
 * Sets up the canvas, world, music, fullscreen functionality,
 * and required DOM elements.
 */
function init() {
    fullscreenButton = document.getElementById("fullscreen");

    document.onfullscreenchange = updateFullscreenIcon;

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    music = new Music();

    if (sessionStorage.getItem('restartGame') === 'true') {
        sessionStorage.removeItem('restartGame');
        startGame();
    }
}

/**
 * Starts the game and hides the start screen controls.
 */
function startGame() {
    world.gameStarted = true;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('controlsButton').style.display = 'none';
    document.getElementById('mute').style.display = 'none';
    document.getElementById('fullscreen').style.display = 'none';
}

/**
 * Restarts the game immediately.
 */
function restartGame() {
    sessionStorage.setItem('restartGame', 'true');
    location.reload();
}

/**
 * Returns to the start screen.
 */
function exitGame() {
    sessionStorage.removeItem('restartGame');
    location.reload();
}

/**
 * Shows the end screen with the selected game result.
 *
 * @param {string} result - The result of the game.
 */
function showEndScreen(result) {
    let overlay = document.getElementById('endScreenOverlay');
    let image = document.getElementById('endScreenImage');

    image.src = getEndScreenImage(result);
    overlay.style.display = 'flex';
}


/**
 * Returns the correct image path for the game result.
 *
 * @param {string} result - The result of the game.
 *
 * @returns {string} The path of the end screen image.
 */
function getEndScreenImage(result) {
    if (result === 'won') {
        return 'assets/img/You won, you lost/You won A.png';
    }

    return 'assets/img/You won, you lost/You lost.png';
}


/**
 * Toggles fullscreen mode for the game container.
 * Enters fullscreen mode if it is inactive and exits it if active.
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.getElementById('gameContainer').requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


/**
 * Updates the fullscreen button icon depending on the current fullscreen state.
 */
function updateFullscreenIcon() {
    if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage =
            'url("../assets/img/icons/shrink.svg")';
    } else {
        fullscreenButton.style.backgroundImage =
            'url("../assets/img/icons/expand.svg")';
    }
}


/**
 * Opens the controls overlay.
 */
function openControls() {
    document.getElementById("overlay").style.display = "flex";
}


/**
 * Closes the controls overlay.
 */
function closeControls() {
    document.getElementById("overlay").style.display = "none";
}


/**
 * Opens the legal notice overlay.
 */
function openLegalNotice() {
    document.getElementById('legalNoticeOverlay').style.display = 'flex';
}


/**
 * Closes the legal notice overlay.
 */
function closeLegalNotice() {
    document.getElementById('legalNoticeOverlay').style.display = 'none';
}


/**
 * Listens for keyboard key presses and updates the corresponding
 * keyboard control states.
 */
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


/**
 * Listens for keyboard key releases and resets the corresponding
 * keyboard control states.
 */
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
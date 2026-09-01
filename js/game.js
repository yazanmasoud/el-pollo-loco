let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenButton;
let mobileFullscreenButton;
let audioManager;

function detectTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('is-touch-device');
    }
}

/**
 * Initializes the game.
 * Sets up the canvas, world, fullscreen functionality,
 * mobile controls, and required DOM elements.
 */
function init() {
    detectTouchDevice();
    fullscreenButton = document.getElementById('fullscreen');
    mobileFullscreenButton = document.querySelector('.mobileFullscreenButton');
    document.onfullscreenchange = updateFullscreenIcon;

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    audioManager = world.audioManager;

    initMobileControls();


    if (sessionStorage.getItem('restartGame') === 'true') {
        sessionStorage.removeItem('restartGame');
        startGame();
    }
}

/**
 * Starts the game and hides the start screen controls.
 */
function startGame() {
    world.character.idleStartTime = Date.now();
    world.gameStarted = true;

    audioManager.playGameMusic();

    document.getElementById('startButton').style.display = 'none';
    document.getElementById('controlsButton').style.display = 'none';
}

/**
 * Restarts the game immediately.
 */
function restartGame() {
    resetKeyboard();

    world.stopGame();
    world.audioManager.stopGameMusic();

    world = new World(canvas, keyboard);
    audioManager = world.audioManager;

    document.getElementById('endScreenOverlay').style.display = 'none';

    startGame();
}

/**
 * Returns to the start screen.
 */
function exitGame() {
    sessionStorage.removeItem('restartGame');
    location.reload();
}

function closeMobileMenu() {
    document.getElementById('mobileMenuOverlay').style.display = 'none';
}

/**
 * Resets all keyboard controls.
 */
function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.SPACE = false;
    keyboard.D = false;
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
    let icon;

    if (document.fullscreenElement) {
        icon = 'url("../assets/img/icons/shrink.svg")';
    } else {
        icon = 'url("../assets/img/icons/expand.svg")';
    }

    fullscreenButton.style.backgroundImage = icon;
    mobileFullscreenButton.style.backgroundImage = icon;
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
    if (!world.gameStarted || world.gameWon || world.gameLost) {
        return;
    }

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

/**
 * Initializes the mobile touch controls.
 */
function initMobileControls() {
    const moveLeft = document.getElementById('moveLeft');
    const moveRight = document.getElementById('moveRight');
    const jump = document.getElementById('jump');
    const throwButton = document.getElementById('throw');
    const mobileMenu = document.getElementById('mobileMenu');

    addTouchControl(moveLeft, 'LEFT');
    addTouchControl(moveRight, 'RIGHT');
    addTouchControl(jump, 'SPACE');
    addTouchControl(throwButton, 'D');

    mobileMenu.addEventListener('click', openMobileMenu);
}

function openMobileMenu() {
    document.getElementById('mobileMenuOverlay').style.display = 'flex';
}

/**
 * Connects a touch button to a keyboard control.
 *
 * @param {HTMLElement} button - The mobile control button.
 * @param {string} key - The keyboard property to control.
 */
function addTouchControl(button, key) {
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard[key] = true;
    });

    button.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard[key] = false;
    });

    button.addEventListener('touchcancel', () => {
        keyboard[key] = false;
    });

    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
}
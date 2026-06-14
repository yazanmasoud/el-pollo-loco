let canvas;
let ctx;
let character = new Character();
let chicken = new Chicken();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log("my character is" , character);
    console.log("my chicken is" , chicken);

}
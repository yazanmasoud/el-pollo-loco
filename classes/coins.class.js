class Coins extends DrawableObject {
    width = 90;
    height = 90;
    y = 365;

    constructor() {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x = Math.random() * 2000;
    }
}
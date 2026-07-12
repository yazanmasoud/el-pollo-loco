class Coins extends DrawableObject {
    width = 90;
    height = 90;
    y = 365;

    constructor(x, y) {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}
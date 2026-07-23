class Bottle extends DrawableObject {
width = 50;
height = 50;



constructor(x, y) {
    super();
    this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
}
}
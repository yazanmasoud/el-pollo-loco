class Bottle extends DrawableObject {
width = 50;
height = 50;
y = 380

constructor() {
    super();
    this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = Math.random() * 1000;
}
}
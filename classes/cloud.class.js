class Cloud extends MoveableObject {
    width = 300;
    height = 200;
    y = 70;

    constructor() {
        super();
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }



}
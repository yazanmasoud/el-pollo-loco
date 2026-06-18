class Cloud extends MoveableObject {

    constructor (){
        super();
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.y = 100;
        this.width = 300;
        this.height = 200;
    }

}
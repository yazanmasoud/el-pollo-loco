class MoveableObject {
    x = 120;
    y = 350;
    img;
    width= 100;
    height = 230;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
     moveRight() {  
        console.log("roger! moving right");
        
    }

     moveLeft() {  
        console.log("roger! moving left");
    }

     jump() {
        console.log("yoho am jumping...");
        
    }
}
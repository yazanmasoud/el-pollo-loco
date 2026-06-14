class MoveableObject {
    x;
    y;
    img;

    
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
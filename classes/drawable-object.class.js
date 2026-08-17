class DrawableObject {
    x = 120;
    y = 350;
    img;
    width = 100;
    height = 230;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}


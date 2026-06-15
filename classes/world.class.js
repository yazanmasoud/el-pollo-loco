class World {
    character = new Character();
    chicken = new Chicken();
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.ctx.drawImage(this.chicken.img, this.chicken.x, this.chicken.y, this.chicken.width, this.chicken.height);
    }
}
class World {
    character = new Character();
    chicken = new Chicken();
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.ctx.drawImage(this.chicken.img, this.chicken.x, this.chicken.y, this.chicken.width, this.chicken.height);

        requestAnimationFrame(() => {
            this.draw();
        });
    }
}
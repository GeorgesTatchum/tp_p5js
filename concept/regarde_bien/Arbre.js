class Tree {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        noStroke();
        fill(139, 69, 19);
        rect(this.x - this.width / 4, this.y, this.width / 2, this.height / 2);
        
        fill(this.color);
        // triangle(this.x, this.y - this.height / 2, this.x - this.width, this.y + this.height / 4, this.x + this.width, this.y + this.height / 4);
        ellipse(this.x, this.y - this.height/4, this.width*1.5, this.height*0.8)
    }
}
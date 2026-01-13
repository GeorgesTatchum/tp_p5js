class Flower {

  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  show() {
  
    noStroke();
    fill(color(random(255), random(255), random(255)));
    // Draw petals.
    ellipse(this.x, this.y, this.size / 2, this.size); 
    ellipse(this.x, this.y, this.size, this.size / 2);

    // Draw a yellow center.
    fill(255, 204, 0);
    circle(this.x, this.y, this.size / 2);
  }
  
  move() {
    this.x = this.x + random(-150, 150);
    this.y = this.y +random(-150,150);
  }
}

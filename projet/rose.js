class Rose {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  afficher() {
    push();
    translate(this.x, this.y);
    
    // Le bocal
    fill(200, 230, 255, 60);
    stroke(255, 100);
    strokeWeight(1);
    ellipse(0, -25, 50, 60); 

    // La Rose
    stroke(40, 100, 40);
    strokeWeight(3);
    line(0, 0, 0, -20);
    
    noStroke();
    fill(220, 30, 60);
    ellipse(0, -25, 15, 20); 
    ellipse(-7, -22, 12, 15);
    ellipse(7, -22, 12, 15);
    pop();
  }
}
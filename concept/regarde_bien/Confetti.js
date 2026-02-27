// Classe Confetti — animation de particules pour la victoire
class Confetti {
  constructor() {
    this.x = -1000;
    this.y = -1000;
    this.w = random(6, 10);
    this.h = random(4, 14);
    this.xspeed = 0;
    this.yspeed = 0;
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(2, 5);
    this.colors = ['#9A56FF', '#527AF2', '#F2B807', '#F28907', '#F2220F', '#22C55E'];
    this.col = random(this.colors);
  }

  // Lance le confetti depuis un point (mx, my)
  burst(mx, my) {
    this.x = mx + random(-30, 30);
    this.y = my + random(-30, 30);
    this.xspeed = random(-7, 7);
    this.yspeed = random(-12, -3);
    this.angle = random(TWO_PI);
    this.col = random(this.colors);
    this.w = random(6, 10);
    this.h = random(4, 14);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.yspeed += 0.13; // gravité
    this.xspeed *= 0.99;  // friction
    this.angle += radians(this.rotationSpeed);
  }

  show() {
    if (this.y > height + 50 || this.x < -100 || this.x > width + 100) return;
    push();
    fill(this.col);
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

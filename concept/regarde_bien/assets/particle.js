class Confetti {
  constructor() {
    this.x = -1000;
    this.y = -1000;
    this.w = 8;   // largeur du confetti
    this.h = random(4, 12); // taille du confetti
    this.xspeed = 0;
    this.yspeed = 0;
    this.angle = 0;
    this.rotationSpeed = 3;
    this.col = rainbowColors[int(random(rainbowColors.length))];
  }

  burst(mx, my) {
    this.x = mx;
    this.y = my;
    this.xspeed = random(-5, 5);
    this.yspeed = random(-5, 5);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.angle += radians(this.rotationSpeed);

    this.yspeed += 0.1;
  }

  show() {
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




let rainbowColors = ['#9A56FF', '#527AF2', '#F2B807', '#F28907', '#F2220F'];

let confetti = [];
let party = false;

function setup() {
  createCanvas(640, 360);

  for (let i = 0; i < 100; i++) {  // nombre de confetti 
    confetti[i] = new Confetti();
  }

}

function mousePressed() {   
  party = true;
  for (let c of confetti) {
    c.burst(mouseX, mouseY);  // actuellement c'est au clic de la souris, on peut adapter pour que ce soit à un autre type de déclenchement sur un point x,y précis
  }
}

function draw() {
  background(255);

  if (party) {
    for (let c of confetti) {
      c.show();
      c.update();
    }
  }

}

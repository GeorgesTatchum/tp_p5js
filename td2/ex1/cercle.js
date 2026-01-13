let r = 100;
let g = 0;
let b = 100;
let alpha = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  noStroke();
  fill(r,g,b,50);
  circle(mouseX, mouseY, alpha*50);
  
}

function mousePressed(){
  r = random(255);
  g = random(255);
  b = random(255);
  alpha = random(0,1);
}

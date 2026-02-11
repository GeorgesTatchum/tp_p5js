let colorCircle;
let diamCircle;
function setup() {
  createCanvas(400, 400);
  colorCircle = color(200, 150, 70);
  diamCircle = 80;
}

function draw() {
  background(220);
  
  fill(colorCircle);
  circle(200,200,diamCircle);
}

function mousePressed(){
  colorCircle = color(random(100,200), 150, random(150,250));
}

function touchStarted(){
  colorCircle = color(random(100,200), 150, random(150,250));
}

/*
function mouseDragged(){
  diamCircle = random(30,100);
}

function touchMouved(){
  diamCircle = random(30,100);
}
*/
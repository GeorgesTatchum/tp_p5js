let colorCircle;
let diamCircle;
let colorBack;
function setup() {
  createCanvas(400, 400);
  colorCircle = color(200, 150, 70);
  diamCircle = 80;
  colorBack = 255;
}

function draw() {
  background(colorBack);
  
  fill(colorCircle);
  circle(200,200,diamCircle);
}

function mousePressed(){
  colorCircle = color(random(100,200), 150, random(150,250));
}

function touchStarted(){
  colorCircle = color(random(100,200), 150, random(150,250));
}


function mouseDragged(){
  diamCircle = random(30,100);
}

function touchMouved(){
  diamCircle = random(30,100);
}

function mouseReleased(){
  colorBack = random(0,100);
}

function touchEnded(){
  colorBack = random(0,100);
}

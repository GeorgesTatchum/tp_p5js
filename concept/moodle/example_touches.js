//code adapted from https://www.youtube.com/watch?v=JPpmUPcmIKs 
let gray = 255;
let backColor = 255;
let value = 0;

function setup() {
  createCanvas(360, 500);
  textSize(36);
  rectMode(CENTER);
  textAlign(CENTER); 
}

function draw() {
  background(backColor);

  for (var i = 0; i < touches.length; i++) {
    //make a rectangle for each touch position
    fill(gray);
    rect(touches[i].x, touches[i].y - 50, 50, 120, 10);
    
    //label each touch position with its unique id
    fill(0);
    log(touches[i].id);
    text(touches[i].id, touches[i].x, touches[i].y - 75);
  }
  
  fill(value);
  ellipse(20,20,20)
}

//touchStarted() behaves as mousePressed()
function touchStarted(){
  if (value == 0) {
    value = 255;
  } else {
    value = 0;
  }
}

//touchEnded() behaves as mouseReleased()
function touchEnded(){
  backColor = random(0,255);
}

//touchMoved() behaves as mouseDragged()
function touchMoved(){
   gray = random(128, 255);
 }






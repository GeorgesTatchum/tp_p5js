// For more details watch tutorial video https://www.youtube.com/watch?v=eE65ody9MdI

function preload(){
  bird = loadImage("bird1.png")
  cat = loadImage("cat.png")
}


function setup() {
  createCanvas(400, 400);
  
}

let frameB = 0;
let frameC = 0;

function draw() {
  background(213,233,245);
  
  image(bird, 220, 0, bird.height+100, bird.height+100, (bird.height+14)*floor(frameB), 0, bird.height+14, bird.height)
    
    frameB += 0.1;
    
    if(frameB > 4){
      frameB = 0
    }
  
  image(cat, 20, 200, cat.height+100, cat.height+100, (cat.height+14)*floor(frameC), 0, cat.height+14, cat.height)
    
    frameC += 0.1;
    
    if(frameC > 3){
      frameC = 0
    }
  
}
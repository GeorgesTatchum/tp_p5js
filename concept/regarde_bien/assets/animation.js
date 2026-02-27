let herisson, lapin, racoon;
let frameB = 0;

function preload() {
  herisson = loadImage("herisson_animation.png");
  lapin = loadImage("lapin_animation.png");
  racoon = loadImage("racoon_animation.png");
}

function setup() {
  createCanvas(1000, 600); 
  imageMode(CENTER);
}

function draw() {
  background(213, 233, 245);

  // Vitesse commune
  frameB += 0.08; 
  if (frameB >= 3) frameB = 0;

  let currentFrame = floor(frameB);

 
  let hW = herisson.width / 3; 
  let hRatio = herisson.height / hW;
  let hDisplayW = 150; 
  image(herisson, 200, 300, hDisplayW, hDisplayW * hRatio, currentFrame * hW, 0, hW - 1, herisson.height);


  let lW = lapin.width / 3;
  let lRatio = lapin.height / lW;
  let lDisplayW = 180; 
  image(lapin, 500, 300, lDisplayW, lDisplayW * lRatio, currentFrame * lW, 0, lW - 1, lapin.height);


  let rW = racoon.width / 3;
  let rRatio = racoon.height / rW;
  let rDisplayW = 140; 
  image(racoon, 800, 300, rDisplayW, rDisplayW * rRatio, currentFrame * rW, 0, rW - 1, racoon.height);
}
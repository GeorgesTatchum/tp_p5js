// For more details watch tutorial video https://www.youtube.com/watch?v=eE65ody9MdI
catX = 20;
catY = 200;

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

    // Animation du chat (suit les variables catX et catY)
  // On centre l'image sur le curseur en soustrayant la moitié de la taille affichée
  let displaySize = cat.height + 100;
  image(cat, catX - displaySize/2, catY - displaySize/2, displaySize, displaySize, (cat.height + 14) * floor(frameC), 0, cat.height + 14, cat.height);
    
    frameC += 0.1;
    
    if(frameC > 3){
      frameC = 0
    }
  
}

// --- INTERACTIONS ---

// Au clic ou au premier toucher : le chat se téléporte à la position
function touchStarted() {
  updateCatPosition();
  return false; // Empêche le défilement par défaut sur mobile
}

// Au glissement (souris enfoncée ou doigt qui bouge) : le chat suit
function touchMoved() {
  updateCatPosition();
  return false; // Indispensable pour que le "drag" fonctionne bien sur mobile
}

function updateCatPosition() { 
  catX = mouseX;
  catY = mouseY;
}
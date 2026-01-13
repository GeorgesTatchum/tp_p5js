let bgLayer; // Canvas séparé pour l'arrière-plan
let index = 0;
let tmp = [];

function setup() {
  createCanvas(520, 520);
  
  // Création du canvas secondaire pour l'arrière-plan
  bgLayer = createGraphics(520, 520);
  
  for (let k = 0; k < 500; k++) {
    tmp[k] = k;
  }
}

function draw() {
  // ARRIÈRE-PLAN
  bgLayer.background(203, 79, 53);
  bgLayer.noStroke();
  bgLayer.fill(230, 231, 232);

  let posBas = constrain(520 - index, 260, 520); 
  bgLayer.rect(0, posBas, 520, 260);

  let posHaut = constrain(-260 + index, -260, 0);
  bgLayer.rect(0, posHaut, 520, 260);

  // AFFICHAGE DU BACKGROUND
  image(bgLayer, 0, 0);

  // Premier Plan
  
  // Calcul de l'ouverture de la bouche : 
  // Plus l'index augmente, plus la bouche devient plate
  let ouvertureBouche = map(index+2, 0, tmp.length, 25, 2); 

  // --- CHEVEUX ---
  noStroke();
  fill(20, 15, 10);
  arc(260, 255, 230, 290, PI, TWO_PI); 

  // --- OREILLES ---
  fill(90, 60, 50);
  ellipse(155, 265, 30, 50);
  ellipse(365, 265, 30, 50);

  // --- VISAGE ---
  ellipse(260, 255, 200, 260);

  // --- YEUX ---
  fill(255);
  ellipse(215, 260, 35, 20);
  ellipse(305, 260, 35, 20);
  fill(30, 20, 10);
  ellipse(215, 260, 18, 18);
  ellipse(305, 260, 18, 18);

  // --- NEZ ---
  fill(75, 45, 35);
  triangle(260, 270, 275, 305, 245, 305);

  // --- BOUCHE DYNAMIQUE ---
  fill(130, 70, 70);
  // L'arc utilise 'ouvertureBouche' pour changer de forme
  arc(260, 335, 50, ouvertureBouche, 0, PI);

  // --- HABITS ---
  fill(90, 60, 50);
  rectMode(CENTER);
  rect(260, 390, 60, 60);
  
  fill(107, 114, 74); // Kaki
  rect(260, 490, 300, 150, 40);
  
  fill(255, 255, 255, 50); // Col léger
  arc(260, 415, 70, 40, 0, PI);

  index = index + 2;
  if (index >= 520) {
    index = 0; // Recommence l'animation et le sourire
  }
}
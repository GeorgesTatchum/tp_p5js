let etoiles = []; // Tableau qui contiendra nos objets

function setup() {
  createCanvas(520, 520);
  background(10);

  for (let k = 0; k < 20; k++) {
    let x = random(width);
    let y = random(height);
    let nouvelleEtoile = new Etoile(x, y);
    etoiles.push(nouvelleEtoile);
  }
}

function draw() {

  background(203, 79, 53, 50); 

  // Boucle pour gérer tous les objets en même temps
  for (let i = 0; i < etoiles.length; i++) {
    etoiles[i].mouvement();
    etoiles[i].afficher();
    
    // dessiner une ligne si les étoiles sont proches
    for (let j = i + 1; j < etoiles.length; j++) {
      let d = dist(etoiles[i].x, etoiles[i].y, etoiles[j].x, etoiles[j].y);
      if (d < 100) {
        stroke(255, 100); // Lignes blanches discrètes
        strokeWeight(0.5);
        line(etoiles[i].x, etoiles[i].y, etoiles[j].x, etoiles[j].y);
      }
    }
  }

  // --- CHEVEUX ---
  noStroke();
  fill(20, 15, 10);
  arc(260, 255, 230, 290, PI, TWO_PI); 

  fill(90, 60, 50); // Couleur de peau foncée
  ellipse(155, 265, 30, 50);
  ellipse(365, 265, 30, 50);

  // --- VISAGE ---
  noStroke();
  fill(90, 60, 50);
  ellipse(260, 255, 200, 260);

  // --- SOURCILS ---
  stroke(10);
  strokeWeight(4);
  noFill();
  arc(215, 235, 40, 10, PI, TWO_PI);
  arc(305, 235, 40, 10, PI, TWO_PI);

  // --- YEUX ---
  noStroke();
  fill(255); // Blanc de l'oeil
  ellipse(215, 260, 35, 20);
  ellipse(305, 260, 35, 20);
  
  fill(30, 20, 10); // Iris foncé
  ellipse(215, 260, 18, 18);
  ellipse(305, 260, 18, 18);
  
  fill(255); // Reflet pupille
  ellipse(212, 257, 5, 5);
  ellipse(302, 257, 5, 5);

  // --- NEZ ---
  fill(75, 45, 35);
  triangle(260, 270, 275, 305, 245, 305);

  // --- BOUCHE ---
  fill(130, 70, 70);
  arc(260, 335, 50, 25, 0, PI);

  // --- COU ---
  fill(90, 60, 50);
  rectMode(CENTER);
  rect(260, 390, 60, 60);

  // --- T-SHIRT ---
  fill(212, 207, 199);
  rect(260, 490, 300, 150, 40);
  
  fill(255, 247, 235);
  arc(260, 415, 70, 40, 0, PI);
}

function mousePressed() {
  let nouvelleEtoile = new Etoile(mouseX, mouseY);
  etoiles.push(nouvelleEtoile);
}
let leftGuy = { color: '', mood: 0 };
let rightGuy = { color: '', mood: 0 };
let colors = ['#5D2E5A', '#D05A28', '#2E5D5A', '#A02E2E', '#5A7D2E'];
// 0: Sourire, 1: Neutre, 2: Triste
let moods = [0, 1, 2]; 

function setup() {
  // Crée un canvas qui prend toute la place disponible sur le téléphone
  createCanvas(windowWidth, windowHeight * 0.7); 
  randomizeGuy(leftGuy);
  randomizeGuy(rightGuy);
}

function windowResized() {
  // Réajuste la taille si on tourne le téléphone
  resizeCanvas(windowWidth, windowHeight * 0.7);
}

function draw() {
  background(240);

  // Message de victoire adapté à l'écran
  if (leftGuy.color === rightGuy.color && leftGuy.mood === rightGuy.mood) {
    textAlign(CENTER);
    fill(0);
    textSize(width * 0.05); // Taille de texte proportionnelle
    text(" BRAVO ! ILS SONT IDENTIQUES ! ", width / 2, height * 0.1);
  }

  // Calcul de la taille des visages selon la largeur de l'écran
  let size = width * 0.35; 

  // Dessiner les deux personnages côte à côte
  drawGuy(width * 0.28, height / 2, leftGuy, size);
  drawGuy(width * 0.72, height / 2, rightGuy, size);
}

function randomizeGuy(guy) {
  guy.color = random(colors);
  guy.mood = floor(random(moods));
}

function drawGuy(x, y, data, s) {
  push();
  translate(x, y);

  // Visage
  stroke(0);
  strokeWeight(2);
  fill(200, 235, 255);
  ellipse(0, 0, s, s);

  // Cheveux (Forme dynamique basée sur la taille 's')
  fill(data.color);
  noStroke();
  beginShape();
  let radius = s / 2;
  for (let a = PI + QUARTER_PI; a < TWO_PI - QUARTER_PI; a += 0.1) {
    let vx = cos(a) * radius;
    let vy = sin(a) * radius;
    vertex(vx, vy);
  }
  vertex(0, s * 0.1); // Pointe du milieu
  endShape(CLOSE);

  // Yeux (proportionnels)
  fill(0);
  let eyeSize = s * 0.1;
  ellipse(-s * 0.2, s * 0.05, eyeSize, eyeSize);
  ellipse(s * 0.2, s * 0.05, eyeSize, eyeSize);
  
  // Sourcils
  stroke(0);
  strokeWeight(s * 0.01);
  line(-s * 0.25, -s * 0.08, -s * 0.15, -s * 0.08);
  line(s * 0.15, -s * 0.08, s * 0.25, -s * 0.08);

  // Bouche (Épaisse pour être bien visible)
  noFill();
  strokeWeight(s * 0.02);
  if (data.mood === 0) { // Joyeux
    arc(0, s * 0.2, s * 0.2, s * 0.15, 0, PI);
  } else if (data.mood === 1) { // Neutre
    line(-s * 0.1, s * 0.25, s * 0.1, s * 0.25);
  } else if (data.mood === 2) { // Triste
    arc(0, s * 0.3, s * 0.2, s * 0.15, PI, TWO_PI);
  }
  pop();
}

// --- INTERACTIONS TACTILES ---

function touchStarted() {
  // Sur mobile, on vérifie si on touche la partie gauche ou droite de l'écran
  if (touches.length > 0) {
    if (touches[0].x < width / 2) {
      randomizeGuy(leftGuy);
    }
  }
  return false; 
}

function touchMoved() {
  // Change le gars de droite en glissant
  if (touches.length > 0 && touches[0].x > width / 2) {
    randomizeGuy(rightGuy);
  }
  return false;
}
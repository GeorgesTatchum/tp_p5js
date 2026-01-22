let avion;
let prince;
let baobabs = [];
let moutons = [];
let etoiles = [];
let lettre; 
let rose;
let offsetCamera = 0;

let etatJeu = "ARRIVEE"; // ARRIVEE, JEU, PERDU, VICTOIRE
let baobabsMangés = 0;
let objectifVictoire = 15; // Seuil pour gagner

function setup() {
  createCanvas(800, 600);
  
  // Initialisation des objets
  // Rose initialisée sans position fixe car gérée dynamiquement
  rose = new Rose(0, 0); 
  avion = new Avion(-100, 150);
  prince = new PetitPrince(-100, 150);
  lettre = new Lettre(0, 0); 
  
  for (let i = 0; i < 3; i++) {
    baobabs.push(new Baobab(random(150, 650)));
  }
  
  for (let i = 0; i < 50; i++) {
    etoiles.push({ x: random(width), y: random(height), s: random(1, 3) });
  }
}

function draw() {
  background(15, 25, 60);
  
  // --- LOGIQUE DE DÉFILEMENT (CAMÉRA) ---
  // On incrémente l'offset dès qu'on gagne pour faire défiler l'univers
  if (etatJeu === "VICTOIRE" && offsetCamera < 1100) {
    offsetCamera += 5; 
  }

  // --- RENDU ---
  
  // On dessine les étoiles en fond (fixes ou avec un léger parallaxe)
  dessinerEtoiles();

  push();
  // Applique le mouvement de caméra à tout ce qui est dans le monde
  translate(-offsetCamera, 0); 

  // --- SCÈNE 1 : PLANÈTE DU PRINCE ---
  dessinerPlanete(); 
  
  if (etatJeu === "ARRIVEE") {
    avion.voler();
    avion.afficher();
    prince.x = avion.x + 20;
    prince.y = avion.y - 10;
    prince.afficher();
    if (avion.pose) {
      prince.x = avion.x + 40;
      prince.y = obtenirSolY(prince.x);
      etatJeu = "JEU";
    }
  }

  if (etatJeu === "JEU" || etatJeu === "PERDU" || etatJeu === "VICTOIRE") {
    avion.afficher();
    
    // Baobabs (ne poussent que si on joue)
    for (let b of baobabs) {
      if (etatJeu === "JEU") b.pousser();
      b.afficher();
      if (b.estGeant()) etatJeu = "PERDU";
    }

    // Moutons
    for (let i = moutons.length - 1; i >= 0; i--) {
      let m = moutons[i];
      m.update();
      m.afficher();
      for (let b of baobabs) {
        if (dist(m.x, m.y, b.x, obtenirSolY(b.x)) < 40) {
          b.seFaireManger();
          baobabsMangés += 0.05;
        }
      }
      if (m.x < -50) moutons.splice(i, 1);
    }

    prince.afficher();

    // Condition de passage à la victoire
    if (etatJeu === "JEU" && baobabsMangés >= objectifVictoire) {
      etatJeu = "VICTOIRE";
      lettre.x = prince.x;
      lettre.y = prince.y - 20;
      lettre.lancer();
    }
  }

  // --- LA LETTRE (Voyage entre les deux scènes) ---
  if (lettre.active) {
    lettre.afficher();
  }

  // --- SCÈNE 2 : PLANÈTE DE LA ROSE ---
  // Placée loin à droite (1500px)
  let xBaseRose = 1500; 
  let yBaseRose = height + 300;

  // Dessin de la planète ocre
  fill(140, 70, 70);
  ellipse(xBaseRose, yBaseRose, 1000, 800);
  
  // Mise à jour de la position de la Rose pour que la lettre sache où descendre
  rose.x = xBaseRose;
  rose.y = yBaseRose - 400; 
  rose.afficher();

  pop(); // Fin du translate caméra

  // --- UI (FIXE SUR L'ÉCRAN) ---
  afficherUI();

  if (etatJeu === "VICTOIRE" && offsetCamera >= 1100 && lettre.y >= rose.y - 15) {
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text("Le message est arrivé. La Rose n'est plus seule.", width/2, height/2 - 100);
  }
}

// --- FONCTIONS SYSTÈME ---

function mousePressed() {
  if (etatJeu === "PERDU" || (etatJeu === "VICTOIRE" && offsetCamera >= 1100)) {
    // Reset complet
    offsetCamera = 0; 
    baobabs.forEach(b => { b.h = 20; b.f = 30; });
    moutons = [];
    baobabsMangés = 0;
    lettre.active = false;
    lettre.y = 0;
    avion.x = -100;
    avion.y = 150;
    avion.pose = false;
    etatJeu = "ARRIVEE";
  } else if (etatJeu === "JEU") {
    moutons.push(new Mouton(mouseX, mouseY));
  }
}

function dessinerPlanete() {
  fill(130, 110, 80);
  noStroke();
  ellipse(width / 2, height + 400, 1200, 1000);
}

function obtenirSolY(x) {
  let horizon = height + 400;
  let rayon = 500;
  let dx = x - width / 2;
  return horizon - sqrt(max(0, rayon * rayon - dx * dx));
}

function dessinerEtoiles() {
  fill(255, 255, 200);
  noStroke();
  for (let e of etoiles) {
    ellipse(e.x, e.y, e.s + sin(frameCount * 0.1));
    // Étoiles supplémentaires pour combler le vide du voyage
    ellipse(e.x + 800, e.y, e.s);
    ellipse(e.x + 1600, e.y, e.s);
  }
}

function afficherUI() {
  fill(255);
  textAlign(CENTER);
  textSize(16);
  if (etatJeu === "ARRIVEE") text("L'avion approche...", width / 2, 50);
  if (etatJeu === "JEU") {
    text("Protégez la planète des Baobabs !", width / 2, 50);
    fill(255, 50);
    rect(width / 2 - 50, 65, 100, 10);
    fill(100, 255, 100);
    rect(width / 2 - 50, 65, map(baobabsMangés, 0, objectifVictoire, 0, 100), 10);
  }
  if (etatJeu === "PERDU") {
    fill(255, 50, 50);
    textSize(20);
    text("LES BAOBABS ONT ENVAHI LA PLANÈTE...\nCliquez pour réessayer", width / 2, height / 2);
  }
}
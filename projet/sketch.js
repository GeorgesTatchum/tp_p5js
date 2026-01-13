let avion;
let prince;
let baobabs = [];
let moutons = [];
let etoiles = [];
let etatJeu = "ARRIVEE"; // ARRIVEE, JEU, PERDU

function setup() {
  createCanvas(800, 600);
  
  // Initialisation des objets
  avion = new Avion(-100, 150);
  prince = new PetitPrince(0, 0); // Position sera définie après l'atterrissage
  
  for (let i = 0; i < 3; i++) {
    baobabs.push(new Baobab(random(150, 650)));;
  }
  
  for (let i = 0; i < 50; i++) {
    etoiles.push({ x: random(width), y: random(height), s: random(1, 3) });
  }
}

function draw() {
  background(15, 25, 60);
  dessinerEtoiles();
  dessinerSol();

  if (etatJeu === "ARRIVEE") {
    avion.voler();
    avion.afficher();
    if (avion.pose) {
      prince.x = avion.x + 40;
      prince.y = obtenirSolY(prince.x);
      etatJeu = "JEU";
    }
  }

  if (etatJeu === "JEU" || etatJeu === "PERDU") {
    // 1. Afficher l'avion au sol (Arrière-plan)
    avion.afficher();

    // 2. Gérer les Baobabs (POO)
    for (let b of baobabs) {
      b.pousser();
      b.afficher();
      if (b.estGeant()) etatJeu = "PERDU";
    }

    // 3. Gérer les Moutons (Interaction & Mouvement)
    for (let i = moutons.length - 1; i >= 0; i--) {
      let m = moutons[i];
      m.update();
      m.afficher();

      // Nouvelle détection de collision adaptée à la courbe
      for (let b of baobabs) {
        // On définit une zone de contact autour du tronc et du feuillage
        // x : entre le bord gauche et droit du feuillage
        // y : entre le sol et le haut du feuillage
        let zoneContactX = b.f / 2 + 10; 
        let solYBaobab = obtenirSolY(b.x);

        // SI le mouton est horizontalement SUR l'arbre 
        // ET verticalement entre le sol et le haut de l'arbre
        if (abs(m.x - b.x) < zoneContactX && m.y < solYBaobab && m.y > solYBaobab - b.h - b.f) {
          b.seFaireManger();
        }
      }
      
      // Supprimer le mouton s'il sort de l'écran
      if (m.x < -50) moutons.splice(i, 1);
    }

    // 4. Le Petit Prince (Premier plan)
    prince.afficher();
  }

  afficherUI();
}


// --- FONCTIONS SYSTÈME ---
function mousePressed() {
  if (etatJeu === "PERDU") {
    // Recommencer (Consigne 4)
    baobabs.forEach(b => { b.h = 20; b.f = 30; });
    moutons = [];
    etatJeu = "JEU";
  } else if (etatJeu === "JEU") {
    // Ajouter élément au clic (Consigne 3b)
    moutons.push(new Mouton(mouseX, mouseY));
  }
}

function dessinerSol() {
  fill(130, 110, 80);
  ellipse(width/2, height + 400, 1200, 1000);
}

function dessinerEtoiles() {
  fill(255, 255, 200);
  for (let e of etoiles) {
    ellipse(e.x, e.y, e.s + sin(frameCount * 0.1));
  }
}

function afficherUI() {
  fill(255); textAlign(CENTER); textSize(16);
  if (etatJeu === "ARRIVEE") text("L'avion du narrateur approche...", width/2, 50);
  if (etatJeu === "JEU") text("Cliquez pour créer des moutons qui mangeront les Baobabs !", width/2, 50);
  if (etatJeu === "PERDU") {
    background(0, 150);
    fill(255, 50, 50); textSize(30);
    text("LES BAOBABS ONT GAGNÉ", width/2, height/2);
    textSize(18); text("Cliquez pour recommencer", width/2, height/2 + 40);
  }
}

function obtenirSolY(x) {
  // Le centre de notre planète est à width/2 et height + 400
  // On utilise Pythagore pour trouver le haut du cercle à la position x
  let rayonPlanete = 500; 
  let centreX = width / 2;
  let centreY = height + 400;
  
  // Calcul de la hauteur de l'arc
  let dy = sqrt(sq(rayonPlanete) - sq(x - centreX));
  return centreY - dy;
}
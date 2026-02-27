// ============================================
// Regarde bien ! — Jeu d'éveil interactif
// Cherche et Trouve en p5.js
// TATCHUM Georges & BLANCHON Marine
// Master 2 Informatique — CIM — 2026
// ============================================

// Images globales (chargées dans preload)
let images = {};

// Instance du jeu
let jeu;

// Protection contre le double-événement touch/mouse
let _lastTouchTime = 0;

// Préchargement de toutes les images
function preload() {
  let types = ['herisson', 'lapin', 'racoon'];
  for (let type of types) {
    images[type] = loadImage('assets/' + type + '.png');
    images[type + '_animation'] = loadImage('assets/' + type + '_animation.png');
    images[type + '_ombre'] = loadImage('assets/' + type + '_ombre.png');
  }
}

// Initialisation
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('game-container');

  // Empêche le scroll/bounce uniquement sur le canvas (pas le reste de la page)
  canvas.elt.addEventListener('touchstart', function(e) { e.preventDefault(); }, { passive: false });
  canvas.elt.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });

  // Initialise le jeu
  jeu = new Jeu();
  jeu.setupUI();

  // Ajuste l'échelle pour mobile dès le départ
  adjustGameScale();
}

// Boucle de dessin
function draw() {
  jeu.draw();
}

// Mise à l'échelle responsive du conteneur de jeu
function adjustGameScale() {
  let wrapper = document.getElementById('game-wrapper');
  let container = document.getElementById('game-container');
  if (!wrapper || !container) return;

  let availableWidth = wrapper.clientWidth;
  if (availableWidth < 800) {
    let scale = availableWidth / 800;
    container.style.transform = 'scale(' + scale + ')';
    // Le wrapper doit refléter la hauteur visuelle réelle
    wrapper.style.height = Math.ceil(600 * scale) + 'px';
  } else {
    container.style.transform = 'scale(1)';
    wrapper.style.height = '600px';
  }
}

function windowResized() {
  adjustGameScale();
}

// Calcule les coordonnées canvas correctes à partir d'un événement natif touch/mouse
// Nécessaire car le CSS transform: scale() sur le conteneur peut fausser mouseX/mouseY de p5
function getTrueCanvasCoords(clientX, clientY) {
  let cvs = document.querySelector('#game-container canvas');
  if (!cvs) return { x: mouseX, y: mouseY };
  let rect = cvs.getBoundingClientRect();
  let x = (clientX - rect.left) * (width / rect.width);
  let y = (clientY - rect.top) * (height / rect.height);
  return { x: x, y: y };
}

// Gestion des événements tactiles (mobile)
function touchStarted(event) {
  _lastTouchTime = millis();
  // Contrôle du nombre de touches : 1 seul toucher autorisé
  if (touches.length <= 1) {
    // Récupère les coordonnées depuis l'événement natif du navigateur
    let coords;
    if (event && event.changedTouches && event.changedTouches.length > 0) {
      let t = event.changedTouches[0];
      coords = getTrueCanvasCoords(t.clientX, t.clientY);
    } else {
      coords = { x: mouseX, y: mouseY };
    }
    // Ne traiter que si le toucher est dans le canvas
    if (coords.x >= 0 && coords.x <= width && coords.y >= 0 && coords.y <= height) {
      jeu.handleTouch(coords.x, coords.y);
    }
  }
  // NE PAS retourner false ici pour ne pas bloquer le scroll et les boutons DOM
}

// Gestion du clic souris (desktop)
function mousePressed(event) {
  // Évite le double déclenchement si touchStarted a déjà géré l'événement
  if (millis() - _lastTouchTime > 200) {
    let coords;
    if (event && event.clientX !== undefined) {
      coords = getTrueCanvasCoords(event.clientX, event.clientY);
    } else {
      coords = { x: mouseX, y: mouseY };
    }
    if (coords.x >= 0 && coords.x <= width && coords.y >= 0 && coords.y <= height) {
      jeu.handleTouch(coords.x, coords.y);
    }
  }
}

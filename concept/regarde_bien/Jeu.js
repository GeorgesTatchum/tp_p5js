// Classe Jeu — machine à états du jeu "Regarde bien !"
// États : MENU, PLAYING, VICTORY, GAMEOVER
class Jeu {
  constructor() {
    this.state = 'MENU';
    this.score = 0;
    this.totalAnimals = 3;

    // Animaux
    this.animals = [];
    this.animalTypes = ['herisson', 'lapin', 'racoon'];
    this.cibleActuelle = null; // type de l'animal à trouver
    this.indexCible = 0;
    this.ordreCibles = [];

    // Difficulté (0=débutant, 1=intermédiaire, 2=expert)
    this.difficulty = 0;

    // Chronomètre
    this.timerEnabled = false;
    this.timerDuration = 60;
    this.timeRemaining = 60;
    this.timerStart = 0;

    // Décor
    this.decor = null;

    // Confettis
    this.confettis = [];
    for (let i = 0; i < 100; i++) {
      this.confettis.push(new Confetti());
    }

    // Animation sprite
    this.spriteFrame = 0;

    // UI (DOM elements)
    this.sliderDiff = null;
    this.btnTimer = null;
    this.btnStart = null;
    this.btnReplay = null;
    this.uiElements = [];

    // Feedback visuel au toucher
    this.touchFeedback = null; // {x, y, timer, correct}
  }

  // Crée les éléments d'interface (appelé dans setup())
  setupUI() {
    // Slider de difficulté
    this.sliderDiff = createSlider(0, 2, 0, 1);
    this.sliderDiff.parent('game-container');
    this.sliderDiff.class('game-ui');
    this.sliderDiff.id('slider-diff');

    // Bouton chronomètre
    this.btnTimer = createButton('⏱ Chrono: OFF');
    this.btnTimer.parent('game-container');
    this.btnTimer.class('game-ui game-btn');
    this.btnTimer.id('btn-timer');
    this.btnTimer.mousePressed(() => {
      this.timerEnabled = !this.timerEnabled;
      this.btnTimer.html(this.timerEnabled ? '⏱ Chrono: ON' : '⏱ Chrono: OFF');
    });

    // Bouton démarrer
    this.btnStart = createButton('🎮 Jouer !');
    this.btnStart.parent('game-container');
    this.btnStart.class('game-ui game-btn');
    this.btnStart.id('btn-start');
    this.btnStart.mousePressed(() => this.startGame());

    // Bouton rejouer (caché au départ)
    this.btnReplay = createButton('🔄 Rejouer');
    this.btnReplay.parent('game-container');
    this.btnReplay.class('game-ui game-btn');
    this.btnReplay.id('btn-replay');
    this.btnReplay.mousePressed(() => this.backToMenu());
    this.btnReplay.hide();

    this.uiElements = [this.sliderDiff, this.btnTimer, this.btnStart, this.btnReplay];
  }

  showMenuUI() {
    this.sliderDiff.show();
    this.btnTimer.show();
    this.btnStart.show();
    this.btnReplay.hide();
  }

  hideAllUI() {
    for (let el of this.uiElements) {
      el.hide();
    }
  }

  // Démarre une partie
  startGame() {
    this.hideAllUI();
    this.state = 'PLAYING';
    this.score = 0;
    this.difficulty = this.sliderDiff.value();

    this.setupScene();

    if (this.timerEnabled) {
      this.timeRemaining = this.timerDuration;
      this.timerStart = millis();
    }
  }

  // Prépare la scène de jeu
  setupScene() {
    this.decor = new Decor();

    // Mélange aléatoire de l'ordre des cibles
    this.ordreCibles = [...this.animalTypes];
    for (let i = this.ordreCibles.length - 1; i > 0; i--) {
      let j = floor(random(i + 1));
      [this.ordreCibles[i], this.ordreCibles[j]] = [this.ordreCibles[j], this.ordreCibles[i]];
    }
    this.indexCible = 0;
    this.cibleActuelle = this.ordreCibles[0];

    // Placement des animaux
    this.animals = [];
    let positions = this.generatePositions();
    for (let i = 0; i < this.animalTypes.length; i++) {
      let pos = positions[i];
      let a = new Animal(pos.x, pos.y, pos.s, this.ordreCibles[i]);
      this.animals.push(a);
    }
  }

  // Génère des positions de placement variées
  generatePositions() {
    let solY = height * 0.7;
    // Spots proches des arbres / buissons pour un effet caché
    let spots = [
      { x: 185, y: solY + 8, s: 65 },
      { x: 350, y: solY + 12, s: 60 },
      { x: 510, y: solY + 5, s: 68 },
      { x: 85, y: solY + 6, s: 58 },
      { x: 700, y: solY + 10, s: 62 },
      { x: 420, y: solY + 18, s: 55 }
    ];
    // Mélange et sélection de 3
    for (let i = spots.length - 1; i > 0; i--) {
      let j = floor(random(i + 1));
      [spots[i], spots[j]] = [spots[j], spots[i]];
    }
    return spots.slice(0, 3);
  }

  // Gestion du toucher pendant le jeu
  handleTouch(tx, ty) {
    if (this.state !== 'PLAYING') return;

    // Contrôle du nombre de touches : un seul toucher à la fois
    if (touches.length > 1) return;

    for (let a of this.animals) {
      if (!a.found && a.isTouched(tx, ty)) {
        if (a.type === this.cibleActuelle) {
          // Bonne réponse !
          a.reveal();
          this.score++;

          // Explosion de confettis
          for (let c of this.confettis) {
            c.burst(a.x, a.y - a.s * 0.5);
          }

          this.touchFeedback = { x: a.x, y: a.y - a.s, timer: 45, correct: true };

          // Cible suivante
          this.indexCible++;
          if (this.indexCible >= this.ordreCibles.length) {
            // Victoire !
            this.state = 'VICTORY';
            this.btnReplay.show();
            // Grande explosion de confettis
            setTimeout(() => {
              for (let c of this.confettis) {
                c.burst(width / 2, height / 3);
              }
            }, 300);
          } else {
            this.cibleActuelle = this.ordreCibles[this.indexCible];
          }
        } else {
          // Mauvais animal
          a.shake();
          this.touchFeedback = { x: tx, y: ty, timer: 30, correct: false };
        }
        return;
      }
    }
  }

  // Mise à jour (appelée chaque frame)
  update() {
    // Animation sprite
    this.spriteFrame += 0.06;
    if (this.spriteFrame >= 3) this.spriteFrame = 0;

    // Chronomètre
    if (this.state === 'PLAYING' && this.timerEnabled) {
      this.timeRemaining = this.timerDuration - (millis() - this.timerStart) / 1000;
      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.state = 'GAMEOVER';
        this.btnReplay.show();
      }
    }

    // Confettis
    for (let c of this.confettis) {
      c.update();
    }

    // Feedback visuel
    if (this.touchFeedback) {
      this.touchFeedback.timer--;
      if (this.touchFeedback.timer <= 0) {
        this.touchFeedback = null;
      }
    }
  }

  // ========================
  //      DESSIN DU MENU
  // ========================
  drawMenu() {
    background(135, 206, 235);

    // Sol
    noStroke();
    fill(34, 139, 34);
    rect(0, height * 0.75, width, height * 0.25);
    fill(28, 120, 28);
    rect(0, height * 0.85, width, height * 0.15);

    // Soleil décoratif
    push();
    translate(680, 70);
    fill(255, 223, 0);
    noStroke();
    circle(0, 0, 50);
    stroke(255, 223, 0);
    strokeWeight(3);
    for (let i = 0; i < 8; i++) {
      let a = i * QUARTER_PI + frameCount * 0.005;
      line(cos(a) * 30, sin(a) * 30, cos(a) * 45, sin(a) * 45);
    }
    pop();

    // Nuages
    this.dessinerNuageMenu(150, 80, 50);
    this.dessinerNuageMenu(500, 60, 65);

    // Titre
    push();
    textAlign(CENTER, CENTER);

    // Ombre du titre
    textSize(48);
    fill(0, 0, 0, 40);
    noStroke();
    text('🔍 Regarde bien !', width / 2 + 3, 83);

    // Titre principal
    fill(50, 50, 120);
    stroke(255);
    strokeWeight(3);
    textSize(48);
    text('🔍 Regarde bien !', width / 2, 80);

    // Sous-titre
    noStroke();
    textSize(17);
    fill(80);
    text('Trouve les animaux cachés dans la forêt !', width / 2, 130);

    // Label difficulté
    let diffLabels = ['🟢 Débutant', '🟡 Intermédiaire', '🔴 Expert (Ombre)'];
    textSize(16);
    fill(60);
    text('Difficulté : ' + diffLabels[this.sliderDiff.value()], width / 2, 240);

    // Aperçu des animaux sur l'herbe
    imageMode(CENTER);
    let types = ['herisson', 'lapin', 'racoon'];
    let previewX = [width / 2 - 160, width / 2, width / 2 + 160];
    for (let i = 0; i < 3; i++) {
      let img = images[types[i]];
      if (img) {
        let ratio = img.height / img.width;
        // Petit rebond animé
        let bounce = sin(frameCount * 0.04 + i * 2) * 3;
        image(img, previewX[i], height * 0.75 - 25 + bounce, 65, 65 * ratio);
      }
    }
    pop();
  }

  dessinerNuageMenu(x, y, s) {
    push();
    translate(x, y);
    noStroke();
    fill(255, 255, 255, 200);
    circle(0, 0, s);
    circle(-s * 0.4, 0, s * 0.6);
    circle(s * 0.4, 0, s * 0.6);
    circle(0, -s * 0.25, s * 0.5);
    pop();
  }

  // ========================
  //      DESSIN DU JEU
  // ========================
  drawGame() {
    background(135, 206, 235);

    // Décor arrière
    this.decor.dessinerArriere();

    // Animaux NON trouvés dans la scène (derrière le décor avant)
    for (let a of this.animals) {
      if (!a.found) {
        a.drawInScene(this.spriteFrame);
      }
    }

    // Décor avant (feuillage, buissons → cache partiellement les animaux non trouvés)
    this.decor.dessinerAvant();

    // Animaux TROUVÉS (dessinés devant le décor pour être bien visibles)
    for (let a of this.animals) {
      if (a.found) {
        a.drawInScene(this.spriteFrame);
      }
    }

    // Confettis
    for (let c of this.confettis) {
      c.show();
    }

    // Feedback toucher
    if (this.touchFeedback) {
      push();
      let fb = this.touchFeedback;
      let alpha = map(fb.timer, 0, 45, 0, 255);
      if (fb.correct) {
        fill(0, 200, 0, alpha);
        textSize(30);
      } else {
        fill(255, 50, 50, alpha);
        textSize(26);
      }
      textAlign(CENTER, CENTER);
      noStroke();
      text(fb.correct ? '✓' : '✗', fb.x, fb.y);
      pop();
    }

    // Interface en jeu (HUD)
    this.drawHUD();

    // Panneau cible
    this.drawTargetPanel();
  }

  // Affiche le score et le chronomètre
  drawHUD() {
    push();
    // Fond du score
    fill(0, 0, 0, 120);
    noStroke();
    rect(8, 8, 180, 38, 10);

    textAlign(LEFT, CENTER);
    textSize(18);
    fill(255);
    noStroke();
    text('⭐ Score : ' + this.score + ' / ' + this.totalAnimals, 18, 27);

    // Chronomètre
    if (this.timerEnabled) {
      let t = max(0, ceil(this.timeRemaining));
      fill(0, 0, 0, 120);
      noStroke();
      rect(width / 2 - 65, 8, 130, 38, 10);

      textAlign(CENTER, CENTER);
      // Rouge si peu de temps
      fill(t <= 10 ? color(255, 80, 80) : color(255));
      textSize(18);
      text('⏱ ' + t + 's', width / 2, 27);
    }

    // Indicateur de progression (petits cercles)
    let dotY = 54;
    let dotStartX = 18;
    for (let i = 0; i < this.totalAnimals; i++) {
      if (i < this.score) {
        fill(0, 200, 0);
      } else if (i === this.indexCible && this.state === 'PLAYING') {
        fill(255, 200, 0);
      } else {
        fill(200, 200, 200);
      }
      noStroke();
      circle(dotStartX + i * 28, dotY, 18);
      if (i < this.score) {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(11);
        noStroke();
        text('✓', dotStartX + i * 28, dotY - 1);
      }
    }
    pop();
  }

  // Panneau montrant la cible à trouver
  drawTargetPanel() {
    if (this.state !== 'PLAYING') return;
    if (!this.cibleActuelle) return;

    let px = width - 135;
    let py = 8;
    let pw = 125;
    let ph = 150;

    push();
    // Fond du panneau
    fill(255, 255, 255, 225);
    stroke(100, 100, 200);
    strokeWeight(2);
    rect(px, py, pw, ph, 12);

    // Label "Trouve :"
    textAlign(CENTER, TOP);
    textSize(14);
    fill(80);
    noStroke();
    text('Trouve :', px + pw / 2, py + 8);

    // Image de la cible selon la difficulté
    imageMode(CENTER);
    let img;
    if (this.difficulty === 2) {
      // Expert : ombre / silhouette
      img = images[this.cibleActuelle + '_ombre'];
    } else {
      img = images[this.cibleActuelle];
    }

    if (img) {
      let ratio = img.height / img.width;
      let dispW = 75;
      let dispH = dispW * ratio;
      let centerX = px + pw / 2;
      let centerY = py + 35 + dispH / 2;

      if (this.difficulty === 1) {
        // Intermédiaire : taille réduite + rotation
        push();
        translate(centerX, centerY);
        rotate(0.25);
        dispW = 55;
        dispH = dispW * ratio;
        image(img, 0, 0, dispW, dispH);
        pop();
      } else {
        image(img, centerX, centerY, dispW, dispH);
      }
    }

    // Label du niveau
    let diffNames = ['Débutant', 'Intermédiaire', 'Expert'];
    textSize(10);
    fill(130);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text(diffNames[this.difficulty], px + pw / 2, py + ph - 5);

    pop();
  }

  // ========================
  //     ÉCRAN DE VICTOIRE
  // ========================
  drawVictory() {
    this.drawGame(); // Scène en fond

    // Overlay sombre
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, width, height);

    // Panneau de victoire
    push();
    fill(255, 255, 255, 235);
    stroke(255, 200, 0);
    strokeWeight(4);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 20, 380, 220, 20);

    textAlign(CENTER, CENTER);

    // Titre victoire
    textSize(42);
    fill(255, 180, 0);
    stroke(100, 80, 0);
    strokeWeight(2);
    text('🎉 Bravo ! 🎉', width / 2, height / 2 - 75);

    // Message
    noStroke();
    textSize(20);
    fill(60);
    text('Tu as trouvé tous les animaux !', width / 2, height / 2 - 25);

    // Score
    textSize(26);
    fill(50, 130, 50);
    text('Score : ' + this.score + ' / ' + this.totalAnimals, width / 2, height / 2 + 15);

    // Temps si chrono activé
    if (this.timerEnabled) {
      textSize(16);
      fill(100);
      let elapsed = ceil(this.timerDuration - this.timeRemaining);
      text('Temps : ' + elapsed + 's', width / 2, height / 2 + 50);
    }
    pop();

    // Confettis continus
    for (let c of this.confettis) {
      c.show();
    }
  }

  // ========================
  //     ÉCRAN GAME OVER
  // ========================
  drawGameOver() {
    this.drawGame();

    // Overlay
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, width, height);

    push();
    fill(255, 255, 255, 235);
    stroke(220, 60, 60);
    strokeWeight(4);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 20, 380, 200, 20);

    textAlign(CENTER, CENTER);

    textSize(36);
    fill(220, 60, 60);
    stroke(100, 30, 30);
    strokeWeight(2);
    text('⏱ Temps écoulé !', width / 2, height / 2 - 65);

    noStroke();
    textSize(22);
    fill(60);
    text('Score : ' + this.score + ' / ' + this.totalAnimals, width / 2, height / 2 - 15);

    textSize(16);
    fill(100);
    text('Essaie encore pour tous les trouver !', width / 2, height / 2 + 25);
    pop();
  }

  // Retour au menu
  backToMenu() {
    this.state = 'MENU';
    this.btnReplay.hide();
    this.showMenuUI();
  }

  // Boucle principale de dessin
  draw() {
    this.update();

    switch (this.state) {
      case 'MENU':
        this.drawMenu();
        break;
      case 'PLAYING':
        this.drawGame();
        break;
      case 'VICTORY':
        this.drawVictory();
        break;
      case 'GAMEOVER':
        this.drawGameOver();
        break;
    }
  }
}

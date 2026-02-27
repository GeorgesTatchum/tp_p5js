// Classe Animal — représente un animal caché dans la scène
class Animal {
  constructor(x, y, s, type) {
    this.x = x;
    this.y = y;
    this.s = s; // Largeur d'affichage
    this.type = type; // 'herisson', 'lapin', 'racoon'
    this.found = false;

    // Animation de tremblement (mauvais toucher)
    this.shakeTimer = 0;
    this.shakeOffset = 0;

    // Animation de célébration (bon toucher)
    this.celebrateTimer = 0;

    // Effet de halo lumineux
    this.glowAlpha = 0;
  }

  // Retourne la position
  getPosition() {
    return { x: this.x, y: this.y, s: this.s };
  }

  // Teste si un point (tx, ty) touche l'animal
  isTouched(tx, ty) {
    let img = images[this.type];
    if (!img) return false;
    let ratio = img.height / img.width;
    let h = this.s * ratio;
    let cx = this.x;
    let cy = this.y - h / 2;
    // Zone de collision généreuse pour le tactile (marge de 75% de la taille)
    return abs(tx - cx) < this.s * 0.75 && abs(ty - cy) < h * 0.75;
  }

  // Déclenche le tremblement (mauvaise réponse)
  shake() {
    this.shakeTimer = 30;
  }

  // Révèle l'animal (bonne réponse)
  reveal() {
    this.found = true;
    this.celebrateTimer = 90; // durée de l'animation sprite
    this.glowAlpha = 255;
  }

  // Mise à jour des animations
  update() {
    // Tremblement
    if (this.shakeTimer > 0) {
      this.shakeTimer--;
      this.shakeOffset = sin(this.shakeTimer * 0.8) * 6;
    } else {
      this.shakeOffset = 0;
    }
    // Célébration
    if (this.celebrateTimer > 0) {
      this.celebrateTimer--;
    }
    // Halo
    if (this.glowAlpha > 0) {
      this.glowAlpha = max(0, this.glowAlpha - 3);
    }
  }

  // Dessine l'animal dans la scène
  drawInScene(spriteFrame) {
    this.update();

    push();
    translate(this.x + this.shakeOffset, this.y);
    imageMode(CENTER);

    if (this.found && this.celebrateTimer > 0) {
      // Animation sprite (célébration)
      let animImg = images[this.type + '_animation'];
      if (animImg) {
        let fw = animImg.width / 3;
        let frame = floor(spriteFrame) % 3;
        let ratio = animImg.height / fw;
        let displayW = this.s * 1.2;
        let displayH = displayW * ratio;
        image(animImg, 0, -displayH / 2, displayW, displayH, frame * fw, 0, fw, animImg.height);
      }
    } else {
      // Image normale
      let img = images[this.type];
      if (img) {
        let ratio = img.height / img.width;
        let displayH = this.s * ratio;

        // Halo doré quand trouvé récemment
        if (this.glowAlpha > 0) {
          noStroke();
          fill(255, 223, 0, this.glowAlpha * 0.4);
          ellipse(0, -displayH / 2, this.s * 1.3, displayH * 1.2);
        }

        image(img, 0, -displayH / 2, this.s, displayH);

        // Coche verte si trouvé
        if (this.found) {
          fill(0, 180, 0, 200);
          noStroke();
          circle(this.s * 0.35, -displayH + 8, 22);
          fill(255);
          textAlign(CENTER, CENTER);
          textSize(14);
          noStroke();
          text('✓', this.s * 0.35, -displayH + 7);
        }
      }
    }

    // Flash rouge pour mauvais toucher
    if (this.shakeTimer > 15) {
      let img = images[this.type];
      if (img) {
        let ratio = img.height / img.width;
        let displayH = this.s * ratio;
        noStroke();
        fill(255, 0, 0, 80);
        ellipse(0, -displayH / 2, this.s, displayH);
      }
    }

    pop();
  }
}

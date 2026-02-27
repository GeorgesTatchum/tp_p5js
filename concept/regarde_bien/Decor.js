// Classe Decor — gère le décor de la scène (forêt)
// Primitives géométriques : arbres, nuages, soleil, sol, bûches, buissons, fleurs
class Decor {
  constructor() {
    this.solY = height * 0.7;
    this.arbresX = [120, 250, 450, 650];
    this.buches = [660, 100];
    this.nuages = [
      { x: 150, y: 100, s: 60 },
      { x: 550, y: 70, s: 80 },
      { x: 50, y: 40, s: 60 },
      { x: 350, y: 60, s: 80 },
      { x: 700, y: 120, s: 50 }
    ];

    // Buissons (dessinés devant les animaux pour les cacher)
    this.buissons = [
      { x: 330, y: this.solY + 5, w: 110, h: 50 },
      { x: 560, y: this.solY + 3, w: 90, h: 45 },
      { x: 80, y: this.solY + 8, w: 80, h: 40 }
    ];

    // Petites fleurs décoratives (sur le sol)
    this.fleurs = [];
    for (let i = 0; i < 12; i++) {
      this.fleurs.push({
        x: random(30, width - 30),
        y: random(this.solY + 15, height - 15),
        s: random(6, 12),
        col: random(['#FF6B6B', '#FF69B4', '#FFD700', '#FFA07A', '#DA70D6'])
      });
    }

    // Herbes hautes
    this.herbes = [];
    for (let i = 0; i < 20; i++) {
      this.herbes.push({
        x: random(20, width - 20),
        y: this.solY + random(-5, 5),
        h: random(15, 30)
      });
    }
  }

  // Dessine les éléments derrière les animaux
  dessinerArriere() {
    // Nuages
    for (let n of this.nuages) {
      this.dessinerNuage(n.x, n.y, n.s);
    }

    // Soleil
    this.dessinerSoleil(680, 70, 50);

    // Sol vert
    noStroke();
    fill(34, 139, 34);
    rect(0, this.solY, width, height - this.solY);

    // Dégradé du sol (plus foncé en bas)
    fill(28, 120, 28);
    rect(0, this.solY + 40, width, height - this.solY - 40);

    // Petites fleurs sur le sol
    for (let f of this.fleurs) {
      push();
      noStroke();
      fill(f.col);
      circle(f.x, f.y, f.s);
      fill(255, 223, 0);
      circle(f.x, f.y, f.s * 0.35);
      pop();
    }

    // Troncs d'arbres (derrière les animaux)
    fill(90, 55, 30);
    noStroke();
    for (let x of this.arbresX) {
      rect(x - 15, this.solY - 60, 30, 80);
    }

    // Bûches
    for (let x of this.buches) {
      this.dessinerBuche(x, this.solY + 50, 100);
    }
  }

  // Dessine les éléments devant les animaux (pour les cacher partiellement)
  dessinerAvant() {
    // Herbes hautes (semi-transparent)
    for (let h of this.herbes) {
      push();
      stroke(30, 110, 30);
      strokeWeight(2);
      noFill();
      let ctrl = h.h * 0.6;
      bezier(h.x, h.y, h.x - 5, h.y - ctrl, h.x + 3, h.y - ctrl * 1.2, h.x - 2, h.y - h.h);
      pop();
    }

    // Buissons
    for (let b of this.buissons) {
      noStroke();
      fill(30, 110, 40);
      ellipse(b.x, b.y, b.w, b.h);
      fill(40, 125, 45);
      ellipse(b.x - b.w * 0.22, b.y - 6, b.w * 0.5, b.h * 0.7);
      ellipse(b.x + b.w * 0.22, b.y - 6, b.w * 0.5, b.h * 0.7);
      // Petites baies
      fill(180, 40, 40);
      circle(b.x - 10, b.y - 5, 5);
      circle(b.x + 15, b.y - 8, 4);
      circle(b.x + 5, b.y - 12, 5);
    }

    // Feuillage des arbres (triangles)
    for (let x of this.arbresX) {
      // Feuillage foncé (ombre)
      noStroke();
      fill(20, 85, 45);
      triangle(x + 3, this.solY - 218, x - 68, this.solY - 38, x + 72, this.solY - 38);
      triangle(x + 3, this.solY - 178, x - 78, this.solY - 18, x + 82, this.solY - 18);

      // Feuillage principal
      fill(25, 100, 50);
      triangle(x, this.solY - 220, x - 70, this.solY - 40, x + 70, this.solY - 40);
      fill(30, 110, 55);
      triangle(x, this.solY - 180, x - 80, this.solY - 20, x + 80, this.solY - 20);
    }
  }

  // Dessine un nuage avec des cercles
  dessinerNuage(x, y, taille) {
    push();
    translate(x, y);
    noStroke();
    fill(255, 255, 255, 230);
    circle(0, 0, taille);
    circle(-taille * 0.5, 0, taille * 0.6);
    circle(taille * 0.5, 0, taille * 0.6);
    circle(-taille * 0.25, -taille * 0.3, taille * 0.5);
    circle(taille * 0.25, -taille * 0.3, taille * 0.5);
    pop();
  }

  // Dessine le soleil avec des rayons
  dessinerSoleil(x, y, d) {
    push();
    translate(x, y);
    fill(255, 223, 0);
    noStroke();
    circle(0, 0, d);
    // Rayons animés
    stroke(255, 223, 0);
    strokeWeight(3);
    let rotOffset = frameCount * 0.005;
    for (let i = 0; i < 8; i++) {
      let a = i * QUARTER_PI + rotOffset;
      let x1 = cos(a) * (d / 2 + 5);
      let y1 = sin(a) * (d / 2 + 5);
      let x2 = cos(a) * (d / 2 + 20);
      let y2 = sin(a) * (d / 2 + 20);
      line(x1, y1, x2, y2);
    }
    pop();
  }

  // Dessine une bûche
  dessinerBuche(x, y, w) {
    push();
    translate(x, y);
    let h = w * 0.35;
    noStroke();
    // Corps
    fill(101, 67, 33);
    rect(0, 0, w, h, 3);
    // Face droite
    fill(139, 69, 19);
    ellipse(w, h / 2, h * 0.6, h);
    // Face gauche (coupe)
    fill(196, 164, 132);
    ellipse(0, h / 2, h * 0.6, h);
    // Anneaux
    noFill();
    stroke(139, 69, 19);
    strokeWeight(1);
    ellipse(0, h / 2, h * 0.4, h * 0.7);
    ellipse(0, h / 2, h * 0.2, h * 0.3);
    pop();
  }
}

class Decor {
  constructor() {
    this.solY = height * 0.7;
    // Positions fixes pour nos arbres pour pouvoir cacher l'ours précisément
    this.arbresX = [120, 250, 450, 650];
  }

  dessinerArriere() {
    // Le sol
    noStroke();
    fill(34, 139, 34);
    rect(0, this.solY, width, height - this.solY);

    // Les troncs (derrière l'animal)
    fill(90, 55, 30);
    for (let x of this.arbresX) {
      rect(x - 15, this.solY - 60, 30, 80);
    }
  }

  dessinerAvant() {
    // Le feuillage (devant l'animal)
    fill(20, 90, 50);
    for (let x of this.arbresX) {
      // On dessine plusieurs triangles pour un feuillage dense
      triangle(x, this.solY - 220, x - 70, this.solY - 40, x + 70, this.solY - 40);
      triangle(x, this.solY - 180, x - 80, this.solY - 20, x + 80, this.solY - 20);
    }
  }
}
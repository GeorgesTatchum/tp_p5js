class Etoile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.taille = random(5, 15);
    this.couleur = color(random(100, 255), random(100, 200), 255, 150);
    // Vitesse de déplacement
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  // Mouvement des objets ensemble
  mouvement() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebondir sur les murs pour rester ensemble sur l'écran
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  afficher() {
    noStroke();
    fill(this.couleur);
    // Effet de halo (pointillisme stylisé)
    ellipse(this.x, this.y, this.taille, this.taille);
    fill(255, 200);
    ellipse(this.x, this.y, this.taille * 0.4, this.taille * 0.4); // Centre brillant
  }
}
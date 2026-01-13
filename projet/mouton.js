// --- CLASSE MOUTON ---
class Mouton {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    // On garde la consigne 3b : couleur selon position
    let r = map(x, 0, width, 220, 255);
    let g = map(y, 0, height, 220, 255);
    this.c = color(r, g, 255);
  }

  update() { 
    this.x -= 1.5; // Mouvement dirigé (3c)
    this.y = obtenirSolY(this.x) - 10;
  }

  afficher() {
    push();
    translate(this.x, this.y);
    
    // --- 1. LES PATTES (en noir) ---
    stroke(0);
    strokeWeight(6);
    line(-10, 5, -10, 15);
    line(-5, 8, -5, 18);
    line(5, 8, 5, 18);
    line(10, 5, 10, 15);

    // --- 2. LE CORPS (Style nuage/laine) ---
    noStroke();
    fill(this.c);
    // On dessine plusieurs cercles pour faire l'effet "frisé"
    circle(0, 0, 35);       // Centre
    circle(-12, -5, 25);    // Gauche
    circle(12, -5, 25);     // Droite
    circle(-8, 8, 22);      // Bas gauche
    circle(8, 8, 22);       // Bas droite
    circle(0, -10, 25);     // Haut

    // --- 3. LA TÊTE (Noire et ovale) ---
    fill(20);
    ellipse(-18, 2, 18, 22); // Tête
    
    // Oreilles
    ellipse(-25, -5, 10, 5); 
    
    // Yeux (Blancs pour contraster avec la tête noire)
    fill(255);
    circle(-22, 0, 3);
    pop();
  }
}
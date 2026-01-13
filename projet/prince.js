// --- CLASSE PETIT PRINCE ---
class PetitPrince {
  constructor(x, y) { this.x = x; this.y = y; }
  
  afficher() {
    this.angleEcharpe += 0.1; // Vitesse de flottement de l'écharpe
    
    push();
    translate(this.x, this.y);
    noStroke();

    // 1. LES JAMBES ET BOTTES
    fill(240); // Pantalon blanc/gris très clair
    rect(-8, 30, 6, 15); 
    rect(2, 30, 6, 15);
    fill(50); // Bottes noires
    rect(-9, 42, 8, 5, 2);
    rect(1, 42, 8, 5, 2);

    // 2. LE MANTEAU (Vert avec revers rouges)
    fill(40, 140, 70); // Vert du manteau
    rect(-12, 0, 24, 35, 2); // Corps principal
    
    // Revers du col (Rouge)
    fill(180, 30, 30);
    triangle(-12, 0, 0, 0, -12, 15);
    triangle(12, 0, 0, 0, 12, 15);
    
    // Ceinture jaune
    fill(255, 215, 0);
    rect(-12, 18, 24, 4);

    // 3. L'ÉCHARPE JAUNE (Animée)
    fill(255, 230, 0);
    // Noeud de l'écharpe
    rect(-5, -2, 10, 5, 2);
    // Pan de l'écharpe qui flotte au vent
    beginShape();
    vertex(5, 0);
    for (let i = 0; i < 30; i += 5) {
      let wave = sin(this.angleEcharpe + i * 0.2) * 8;
      vertex(5 + i, wave);
    }
    vertex(30, 10 + sin(this.angleEcharpe + 30 * 0.2) * 8);
    vertex(5, 5);
    endShape(CLOSE);

    // 4. LA TÊTE
    fill(255, 225, 200); // Couleur peau
    ellipse(0, -15, 28, 30);
    
    // Yeux (Points bleus)
    fill(50, 100, 200);
    circle(-5, -15, 2.5);
    circle(5, -15, 2.5);

    // 5. LES CHEVEUX (Blonds et ébouriffés)
    fill(255, 240, 50);
    // On dessine plusieurs triangles pour l'aspect "ébouriffé"
    triangle(-15, -20, 15, -20, 0, -35); // Touffe centrale
    triangle(-15, -20, -5, -20, -18, -28); // Mèche gauche
    triangle(5, -20, 15, -20, 18, -28); // Mèche droite
    arc(0, -18, 30, 15, PI, TWO_PI); // Base des cheveux
    
    pop();
  }
}
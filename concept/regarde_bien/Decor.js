class Decor {
  constructor() {
    this.solY = height * 0.7;
    this.arbresX = [120, 250, 450, 650];
    this.buches = [660, 100]
    this.nuages = [
      {x: 150, y: 100, s: 60},
      {x: 550, y: 70, s: 80},
      {x: 50, y: 40, s: 60},
      {x: 350, y: 60, s: 80},
      {x: 700, y: 120, s: 50}
    ];
  }

  dessinerArriere() {
    
    for (let n of this.nuages) {
      this.dessinerNuage(n.x, n.y, n.s);
    }
    
    this.dessinerSoleil(650, 80, 50);
    // Le sol
    noStroke();
    fill(34, 139, 34);
    rect(0, this.solY, width, height - this.solY);

    // Les troncs (derrière l'animal)
    fill(90, 55, 30);
    for (let x of this.arbresX) {
      rect(x - 15, this.solY - 60, 30, 80);
    }

    for (let x of this.buches) {
      this.dessinerBuche(x, 470, 100);
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

  dessinerNuage(x, y, taille) {
    push();
    translate(x, y);
    noStroke();
    fill(255); // Blanc pur (ou un blanc légèrement gris 245 pour plus de douceur)
    
    // On assemble le nuage avec plusieurs cercles
    // Un gros cercle au milieu
    circle(0, 0, taille); 
    
    // Des cercles plus petits sur les côtés pour donner l'aspect "nuage"
    circle(-taille * 0.5, 0, taille * 0.6);  // Gauche
    circle(taille * 0.5, 0, taille * 0.6);   // Droite
    circle(-taille * 0.25, -taille * 0.3, taille * 0.5); // Haut gauche
    circle(taille * 0.25, -taille * 0.3, taille * 0.5);  // Haut droite
    
    // Optionnel : un rectangle en bas pour aplatir la base du nuage
    // rect(-taille * 0.5, 0, taille, taille * 0.3); 
    
    pop();
}

  dessinerSoleil(x, y, d) {
    push();
    translate(x, y);
    fill(255, 223, 0); // Jaune soleil
    noStroke();
    circle(0, 0, d); // Centre du soleil
    
    // Rayons du soleil
    stroke(255, 223, 0);
    strokeWeight(4);
    for (let i = 0; i < 8; i++) {
      rotate(QUARTER_PI);
      line(d/2 + 5, 0, d/2 + 20, 0);
    }
    pop();
  }

  dessinerBuche(x, y, w) {
    push();
    translate(x, y);
    let h = w * 0.4; // Hauteur proportionnelle
    
    noStroke();
    // Corps de la bûche
    fill(101, 67, 33); // Marron foncé
    rect(0, 0, w, h);
    
    // Face droite (perspective)
    fill(139, 69, 19);
    ellipse(w, h/2, h*0.6, h);
    
    // Face gauche (coupe du bois)
    fill(196, 164, 132); // Marron clair
    ellipse(0, h/2, h*0.6, h);
    
    // Anneaux de croissance (cercles concentriques)
    noFill();
    stroke(139, 69, 19);
    strokeWeight(1);
    ellipse(0, h/2, h*0.4, h*0.7);
    ellipse(0, h/2, h*0.2, h*0.3);
    pop();
  }
}
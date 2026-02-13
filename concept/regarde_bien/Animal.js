class Animal {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s; // Taille de référence
  }

  draw() {
    push();
    translate(this.x, this.y);
    noStroke();

    // --- COULEURS ---
    let brunFonce = color(101, 67, 33);
    let brunClair = color(180, 130, 90);

    // --- PATTES ARRIÈRE ---
    fill(brunFonce);
    ellipse(-this.s * 0.25, this.s * 0.1, this.s * 0.3, this.s * 0.4);
    ellipse(this.s * 0.25, this.s * 0.1, this.s * 0.3, this.s * 0.4);

    // --- CORPS (GROS VENTRE ROND) ---
    fill(brunFonce);
    ellipse(0, -this.s * 0.15, this.s * 0.9, this.s * 0.85);

    // --- BRAS ---
    push();
    translate(-this.s * 0.45, -this.s * 0.2);
    rotate(PI / 4);
    fill(brunFonce);
    ellipse(0, 0, this.s * 0.2, this.s * 0.3);
    pop();
    push();
    translate(this.s * 0.45, -this.s * 0.2);
    rotate(-PI / 4); // Ajustez l'angle selon vos besoins
    ellipse(0, 0, this.s * 0.2, this.s * 0.3);
    pop();

    // --- OREILLES ---
    // Oreille externe
    ellipse(-this.s * 0.3, -this.s * 0.85, this.s * 0.25, this.s * 0.25);
    ellipse(this.s * 0.3, -this.s * 0.85, this.s * 0.25, this.s * 0.25);
    // Oreille interne
    fill(brunClair);
    ellipse(-this.s * 0.3, -this.s * 0.85, this.s * 0.15, this.s * 0.15);
    ellipse(this.s * 0.3, -this.s * 0.85, this.s * 0.15, this.s * 0.15);

    // --- TÊTE ---
    fill(brunFonce);
    ellipse(0, -this.s * 0.6, this.s * 0.75, this.s * 0.7);

    // --- MUSEAU ---
    fill(brunClair);
    ellipse(0, -this.s * 0.52, this.s * 0.35, this.s * 0.3);

    // --- YEUX ---
    fill(255); // Blanc
    ellipse(-this.s * 0.15, -this.s * 0.65, this.s * 0.1, this.s * 0.1);
    ellipse(this.s * 0.15, -this.s * 0.65, this.s * 0.1, this.s * 0.1);
    fill(0); // Pupille
    ellipse(-this.s * 0.15, -this.s * 0.65, this.s * 0.04, this.s * 0.04);
    ellipse(this.s * 0.15, -this.s * 0.65, this.s * 0.04, this.s * 0.04);

    // --- NEZ ET BOUCHE ---
    fill(0);
    // Petit nez arrondi (triangle avec bords arrondis simulés par une ellipse)
    ellipse(0, -this.s * 0.58, this.s * 0.08, this.s * 0.06);
    
    // Sourire
    stroke(0);
    strokeWeight(2);
    noFill();
    arc(0, -this.s * 0.52, this.s * 0.15, this.s * 0.1, 0.2, PI - 0.2);
    
    pop();
  }
}
// --- CLASSE AVION ---
class Avion {
  constructor(x, y) {
    this.x = x; this.y = y; this.pose = false;
  }
  voler() {
    if (this.x < 150) {
      this.x += 2;
      this.y += 1.5;
    } else { this.pose = true; }
  }
  afficher() {
    push();
    translate(this.x, this.y);
    
    // 1. GOUVERNAIL (Queue)
    fill(180, 40, 40);
    rect(-5, -5, 10, 15, 2);

    // 2. FUSELAGE (Corps de l'avion)
    fill(200, 50, 50);
    stroke(150, 30, 30);
    strokeWeight(1);
    // Corps principal
    ellipse(30, 10, 70, 25); 
    
    // Cockpit
    fill(50, 50, 80);
    arc(35, 2, 20, 15, PI, TWO_PI);

    // 3. AILES (Style Biplan)
    fill(210, 60, 60);
    // Aile inférieure
    rect(15, 12, 12, 25, 3); 
    // Aile supérieure (plus grande)
    rect(10, -5, 15, 45, 3);
    
    // Haubans (les petits fils entre les ailes)
    stroke(200);
    line(15, 5, 15, 15);
    line(25, 5, 25, 15);

    // 4. MOTEUR ET HÉLICE
    noStroke();
    fill(40);
    rect(60, 2, 8, 16, 2); // Nez de l'avion
    
    // Animation de l'hélice
    push();
    translate(65, 10);
    rotate(this.heliceAngle);
    fill(220);
    ellipse(0, 0, 4, 35); // Pales de l'hélice
    fill(80);
    circle(0, 0, 5); // Moyeu
    pop();

    // 5. ROUES (Train d'atterrissage)
    fill(30);
    circle(25, 22, 10);
    circle(45, 22, 10);
    
    pop();
  }
}
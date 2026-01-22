class Lettre {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.vitesseHoriz = 5; 
  }

  lancer() {
    this.active = true;
  }

  afficher() {
    if (!this.active) return;

    // --- LOGIQUE DE MOUVEMENT ---
    
    // 1. MONTÉE : Elle monte jusqu'à y=100 et s'y maintient pendant le voyage
    if (offsetCamera < 1100) {
      if (this.y > 100) {
        this.y -= 2;
      }
      // AVANCEMENT : Elle suit le rythme du décor
      if (this.x < 1485) {
        this.x += this.vitesseHoriz;
      }
    } 
    // 2. DESCENTE FINALE : Déclenchée quand la caméra s'arrête
    else {
      this.x = 1485; // On la plaque au dessus de la rose
      if (this.y < rose.y - 10) {
        this.y += 3; // Descente rapide vers la rose
      } else {
        this.y = rose.y - 10; // Position finale posée
      }
    }

    // --- DESSIN ---
    push();
    translate(this.x, this.y);
    rotate(sin(frameCount * 0.1) * 0.1);
    fill(255);
    stroke(0, 50);
    rectMode(CENTER);
    rect(0, 0, 25, 15, 2);
    stroke(200);
    line(-12, -7, 0, 0);
    line(12, -7, 0, 0);
    pop();
  }
}
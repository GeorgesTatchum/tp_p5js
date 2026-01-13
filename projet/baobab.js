// --- CLASSE BAOBAB ---
class Baobab {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.h = 20; // Hauteur tronc
    this.f = 30; // Taille feuillage
  }
  
  pousser() {
    if (etatJeu === "JEU") {
      this.h += 0.1;
      this.f += 0.15;
    }
  }
  
  seFaireManger() {
    if (this.h > 15) this.h -= 0.5;
    if (this.f > 25) this.f -= 0.8;
  }
  
  estGeant() { return this.f > 180; }
  
  afficher() {
    let solY = obtenirSolY(this.x); // On récupère le Y précis sur la courbe
    
    push();
    translate(this.x, solY);
    // Tronc
    fill(100, 65, 45);
    rect(-this.h/4, -this.h, this.h/2, this.h); 
    // Feuillage
    fill(34, 139, 34, 220);
    ellipse(0, -this.h, this.f, this.f * 0.8);
    pop();
  }
}
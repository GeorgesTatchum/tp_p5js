let monOurs;
let arbres = [];


function setup() {
  createCanvas(800, 600); // Crée un canvas de 800x600 pixels

  // Crée un ours à une position initiale
  monOurs = new Animal(width / 2, height * 0.7, 180);

  // Génère quelques arbres pour le décor
  for (let i = 0; i < 10; i++) {
    t = new Tree(
        random(width),
      random(height * 0.4, height * 0.9), // Placer les arbres plutôt dans la partie basse
      random(80, 200),
      random(30, 60),
      color(34, 139, 34) // Vert forêt
    )
    arbres.push(t);
  }
}


function draw() {
  // Fond du ciel (bleu clair)
  background(135, 206, 235);

  // Sol de la forêt (vert foncé)
  fill(0, 100, 0);
  rect(0, height * 0.7, width, height * 0.3); // Un rectangle vert pour le sol

  // Dessine les arbres (boucle pour chaque arbre du tableau)
  // for (let arbre of arbres) {
    // arbre.draw();
  // }

  // Dessine l'ours
  monOurs.draw();
}

class Tree {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        noStroke();
        fill(139, 69, 19);
        rect(this.x - this.width / 4, this.y, this.width / 2, this.height / 2);
        
        fill(this.color);
        // triangle(this.x, this.y - this.height / 2, this.x - this.width, this.y + this.height / 4, this.x + this.width, this.y + this.height / 4);
        ellipse(this.x, this.y - this.height/4, this.width*1.5, this.height*0.8)
    }
}
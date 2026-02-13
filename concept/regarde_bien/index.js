let monOurs;
let monLapin;
let arbres = [];
let maForet;


function setup() {
  createCanvas(800, 600); // Crée un canvas de 800x600 pixels

  maForet = new Decor();
  // Crée un ours à une position initiale
  monOurs = new Animal(width / 2 + 20, height * 0.7, 60, 'ours', null);
  monLapin = new Animal(width / 2, height * 0.7, 40, 'lapin', "assets/lapin.png");

}


function draw() {
  // Fond du ciel (bleu clair)
  background(135, 206, 235);

  maForet.dessinerArriere();
  
  // Dessine l'ours
  monOurs.draw();
  monLapin.draw();

  maForet.dessinerAvant();
}

function touchStarted() {
  console.log(`position du contact x : ${mouseX}, y : ${mouseY}`);

  console.log(`Position de l'ours : x = ${monOurs.getPosition().x}, y = ${monOurs.getPosition().y}`);

  console.log(`L'ours est touché : ${monOurs.isTouched(mouseX, mouseY) ? 'Oui' : 'Non'}`);

  if (monOurs.isTouched(mouseX, mouseY)) {
    // Si l'ours est touché, on le déplace à la position du contact
    monOurs.reveal();
  }
  
  
  
  return false; // Empêche le défilement par défaut sur mobile
}
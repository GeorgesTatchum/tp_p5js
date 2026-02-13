let monOurs;
let arbres = [];
let maForet;


function setup() {
  createCanvas(800, 600); // Crée un canvas de 800x600 pixels

  maForet = new Decor();
  // Crée un ours à une position initiale
  monOurs = new Animal(width / 2 - 20, height * 0.7, 60);

}


function draw() {
  // Fond du ciel (bleu clair)
  background(135, 206, 235);

  maForet.dessinerArriere();
  
  // Dessine l'ours
  monOurs.draw();

  maForet.dessinerAvant();
}

function touchStarted() {
  console.log(`position du contact x : ${mouseX}, y : ${mouseY}`);

  console.log(`Position de l'ours : x = ${monOurs.getPosition().x}, y = ${monOurs.getPosition().y}`);
  
  
  return false; // Empêche le défilement par défaut sur mobile
}
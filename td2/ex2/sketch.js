
let sunHeight = 600;

function setup() {
 // put setup code here
 createCanvas(400, 400);
}

function draw() {

  sunHeight = mouseY;

  //sun
  
  let horizon = 200;

  if(sunHeight < horizon){
    background("lightblue");
  } else {
    background(0);
  }

  if (sunHeight > 70) {
    sunHeight -=2;

  }


  if (sunHeight < horizon) {
    fill('yellow');
    circle(100, sunHeight, 50);
  }else {
    fill('orange');
    circle(100, horizon, 50);
  }


}

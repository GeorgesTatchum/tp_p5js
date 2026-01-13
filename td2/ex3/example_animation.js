let r = [100, 25, 46, 72];
let index = 0;
let tmp = [];

function setup() {
  createCanvas(500, 400);
  for (let k = 0; k < 400-35; k++) {
    tmp[k] = k;
  }
}

function draw() {
  background(127);
  
  for (let i = 0; i < 4; i++) {
    stroke(255);
    fill(106,10,86);
    ellipse(i * 100 + 100, r[i]+tmp[index], r[i]);
  }
  index = index + 1;
  if (index == tmp.length)
    index = 0;
}

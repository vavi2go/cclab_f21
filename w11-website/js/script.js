let img;

function preload() {
  img = loadImage("asset/xmastree.jpg");
}


function setup() {
  createCanvas(400, 500);
  background(220);
}

function draw() {
  //background(220);

  push();
  translate(mouseX, mouseY);
  rotate(frameCount * 0.05);
  imageMode(CENTER);
  image(img, 0, 0, 200, 250);
  pop();
}

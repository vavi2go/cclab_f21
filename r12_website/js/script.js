let img;
let cam;
let angle = 0.01;
let size;
let style1, style2, style3 = false;

function setup() {
  let canvas = createCanvas(640, 480);
 canvas.id("p5-canvas");

  //setUp camera capture video
  cam = createCapture(VIDEO);
  //hide cam
  cam.hide();
  //create image canvas
  img = createImage(width, height);
  noCursor();
}

function changeStyle1(){
  style1 = true;
  style2 = false;
  style3 = false;
}
function changeStyle2(){
  style2 = true;
  style1 = false;
  style3 = false;
}
function changeStyle3(){
  style3 = true;
  style1 = false;
  style2 = false;
}
function changeReset(){
  style3 = false;
  style1 = false;
  style2 = false;
}

function draw() {
  background(0);

  ///load pixels from camera and open channel for image canvas pixels
  cam.loadPixels();
  img.loadPixels();

  ///gridSize - "amount" of triangles
  let gridSize = 20;
  noStroke();

  //get pixel XY
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {

      //get pixel index
      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      //createSinwave effects for the image
      let avg = (r + g + b) / 3;
      let freq = 0.05;
      let ampSin = map(avg, 0, 255, gridSize, 1);
      let sinValue = sin(frameCount * freq) * ampSin;
      let ampCos = map(avg, 0, 255, 1, gridSize / 2);
      let cosValue = cos(frameCount * freq) * ampCos;

      if (style3 === true) {
      size =  map(mouseX, 200, width - 100, 0, 3);
      } else {
       size = map(avg, 0, 255, 1, 10);
      }
      let drag = gridSize*size;
      //draw triangles
      fill(r, g, b);
      push();
      translate(x,y);
      if (style1 === true) {
          rotate(mouseX / 100);
      }
      if (style3 === true){
        rotate(angle);
      }
      triangle(cosValue, sinValue, cosValue-drag/2, drag + sinValue, cosValue + drag / 2, drag + sinValue);
      pop();
    }
  }

  //update rotation angle
  if (key === "2") {
  angle = angle + 0.05;
  }
}

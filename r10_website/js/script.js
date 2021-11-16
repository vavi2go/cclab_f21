// Ugly Jellyfish: (Not) a Path to Salvation
//Inspired by Muccino, Gabriele. Seven Pounds. Columbia Pictures, 2008.
//Sources used for coding: https://p5js.org/reference/#/p5

let jelly = [];
let numberOfjelly = 1;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("jellycanvas");
  jelly.push(new jellybean(width / 2, height / 2));
}

function draw() {
  //change backgroung settings
  if (key == "w") {
    background(200, 0, 200, 10);
  } else if (key == "n") {
    background(50);
  } else {
    background(255);
  }

  // generate jelly & kill jell
  if (mouseIsPressed) {
    if (mouseButton === RIGHT && numberOfjelly <= 12) {
      jelly.push(new jellybean(random(0, width), random(height)));
      numberOfjelly = numberOfjelly + 1;
    }
    if (mouseButton === LEFT && jelly.length > 1) {
      jelly.splice(0, 1);
      numberOfjelly = numberOfjelly - 1;
    }
  }

  //sustain one jelly if none on canvas
  if (jelly.length == 0) {
    jelly.push(new jellybean(random(width), random(height)));
    numberOfjelly = numberOfjelly + 1;
  }

  // update & display
  for (let i = 0; i < jelly.length; i++) {
    let j = jelly[i];
    j.checkframe();
    j.update(i);
    j.display();
  }

  // remove & add if jelly left canvas
  for (let i = jelly.length - 1; i >= 0; i--) {
    let j = jelly[i];
    if (j.check == true) {
      jelly.splice(i, 1);
      numberOfjelly = numberOfjelly - 1;
    }
  }

  // limit displayed jelly to numberOfjelly
  while (jelly.length > numberOfjelly) {
    jelly.splice(0, 1);
  }
}

class jellybean {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.spX = random(-0.75, 0.75);
    this.spY = random(-0.75, 0.75);
    this.check = false;
    this.sin = 0;
    this.amp = 0;
    this.freq = 0;
    this.cos = 0;
    this.g = 0;
    this.b = 0;
    this.r = 0;
    this.e = 0;
    this.speed = 0;
    this.legs = 7;
    this.direction = 0;
    this.speedXY = 0;
    this.m = 0;
  }
  update(dir) {
    this.dir = dir;
    this.move();
    this.colour();
    this.rotation();
  }
  colour() {
    this.g = map(this.x, 0, windowWidth, 150, 220);
    this.r = map(this.x, 0, windowWidth, 10, 255);
    this.b = map(this.x, 0, windowWidth, 200, 255);
  }
  rotation() {
    this.direction = atan2(this.spY, this.spX);
  }
  move() {
    this.y += this.spY * this.speedXY;
    this.x += this.spX * this.speedXY;
    this.amp = map(this.dir, 0, 10, 5, 15);
    this.freq = map(this.dir, 0, 10, 0.03, 0.07);
    this.sin = sin(frameCount * this.freq) * this.amp;
    this.cos = cos(frameCount * this.freq);
    this.speed = map(this.cos, -1, 1, 0.5, 2);
    this.speedXY = map(this.cos, -1, 1, 0, 1);
  }
  checkframe() {
    if (this.x < -20 || this.x > width + 20) {
      this.check = true;
    }
    if (this.y < -20 || this.y > height + 20) {
      this.check = true;
    }
  }

  display() {
    push();
    scale(0.8);
    translate(this.x, this.y);
    rotate(this.direction);

    //jellyfish outer side
    push();
    beginShape();
    fill(this.r - 10, this.g - 10, this.b - 10, 8);
    stroke(this.r, this.g, this.b, 125);
    strokeWeight(1);
    curveVertex(100, 5 + this.sin * this.speed);
    curveVertex(100, 4 + this.sin * this.speed);
    curveVertex(90, 5 + this.sin * this.speed);
    curveVertex(85, 6 + this.sin * this.speed);
    curveVertex(75, 9 + this.sin * this.speed);
    curveVertex(65, 15 + this.sin * this.speed);
    curveVertex(55, 26 + this.sin * this.speed);
    curveVertex(44, 45 + this.sin * this.speed);
    curveVertex(38, 65 + this.sin * this.speed);
    curveVertex(38 + this.sin / 2, 80 + this.sin);
    for (let i = 0; i < 6; i++) {
      if (i == 3) {
        curveVertex(48 + i * 20 + this.sin / 5, 70 + this.sin);
        curveVertex(58 + i * 20 + this.sin / 5, 80 + this.sin);
      } else if (i > 3) {
        curveVertex(48 - this.sin / 2 + i * 20, 70 + this.sin);
        curveVertex(58 - this.sin / 2 + i * 20, 80 + this.sin);
      } else if (i < 3) {
        curveVertex(48 + this.sin / 2 + i * 20, 70 + this.sin);
        curveVertex(58 + this.sin / 2 + i * 20, 80 + this.sin);
      }
    }
    curveVertex(160, 65 + this.sin * this.speed);
    curveVertex(155, 45 + this.sin * this.speed);
    curveVertex(145, 26 + this.sin * this.speed);
    curveVertex(135, 15 + this.sin * this.speed);
    curveVertex(125, 9 + this.sin * this.speed);
    curveVertex(115, 6 + this.sin * this.speed);
    curveVertex(110, 5 + this.sin * this.speed);
    curveVertex(100, 4 + this.sin * this.speed);
    curveVertex(100, 5 + this.sin * this.speed);
    endShape();
    pop();

    //jellyfish inner side
    push();
    scale(0.55);
    translate(82, 34);
    beginShape();
    noFill();
    stroke(this.r, this.g, this.b);
    strokeWeight(0.75);
    curveVertex(100, 5 + this.sin * this.speed);
    curveVertex(100, 4 + this.sin * this.speed);
    curveVertex(90, 5 + this.sin * this.speed);
    curveVertex(85, 6 + this.sin * this.speed);
    curveVertex(75, 9 + this.sin * this.speed);
    curveVertex(65, 15 + this.sin * this.speed);
    curveVertex(55 + this.sin / 6, 26 + this.sin * this.speed);
    curveVertex(45 + this.sin / 3, 45 + this.sin * this.speed);
    curveVertex(40 + this.sin / 2, 65 + this.sin * this.speed);
    curveVertex(60 + this.sin, 75 + 1.25 * this.sin * this.speed);
    curveVertex(140 - this.sin, 75 + 1.25 * this.sin * this.speed);
    curveVertex(160 - this.sin / 2, 65 + this.sin * this.speed);
    curveVertex(155 - this.sin / 3, 45 + this.sin * this.speed);
    curveVertex(145 - this.sin / 6, 26 + this.sin * this.speed);
    curveVertex(135, 15 + this.sin * this.speed);
    curveVertex(125, 9 + this.sin * this.speed);
    curveVertex(115, 6 + this.sin * this.speed);
    curveVertex(110, 5 + this.sin * this.speed);
    curveVertex(100, 4 + this.sin * this.speed);
    curveVertex(100, 5 + this.sin * this.speed);
    endShape();
    pop();

    //legs thin outer side
    push();
    for (let i = 0; i < this.legs; i++) {
      beginShape();
      fill(this.r, this.g, this.b, 80);
      stroke(this.r, this.g, this.b);
      strokeWeight(0.1);
      if (i == 0) {
        curveVertex(38.5 + this.sin / 2, 80 + this.sin);
        curveVertex(38.5 + this.sin / 2, 80 + this.sin);
        curveVertex(37.7 - this.cos * 4, 120 + this.sin);
        curveVertex(37.4 - this.cos * 4, 160 + this.sin);
        curveVertex(37 + this.cos * 8, 200 + this.sin);
        curveVertex(37 + this.cos * 8, 200 + this.sin);
        curveVertex(37 - this.cos * 4, 160 + this.sin);
        curveVertex(37 - this.cos * 4, 120 + this.sin);
        curveVertex(36.5 + this.sin / 2, 80 + this.sin);
        curveVertex(36.5 + this.sin / 2, 80 + this.sin);
      } else if (i == 4) {
        curveVertex(39 + i * 20 + this.sin / 5, 80 + this.sin);
        curveVertex(39 + i * 20 + this.sin / 5, 80 + this.sin);
        curveVertex(38.7 + this.cos * 6 + i * 20, 120 + this.sin);
        curveVertex(38.4 + this.cos * 6 + i * 20, 160 + this.sin);
        curveVertex(38 - this.cos * 10 + i * 20, 200 + this.sin);
        curveVertex(38 - this.cos * 10 + i * 20, 200 + this.sin);
        curveVertex(38 + this.cos * 6 + i * 20, 160 + this.sin);
        curveVertex(38 + this.cos * 6 + i * 20, 120 + this.sin);
        curveVertex(37 + i * 20 + this.sin / 5, 80 + this.sin);
        curveVertex(37 + i * 20 + this.sin / 5, 80 + this.sin);
      } else if (i < 4 && i > 0) {
        curveVertex(39 + i * 20 + this.sin / 2, 80 + this.sin);
        curveVertex(39 + i * 20 + this.sin / 2, 80 + this.sin);
        curveVertex(40 - this.cos * 3 + i * 20, 120 - i * 8 + this.sin);
        curveVertex(41 - this.cos * 3 + i * 20, 160 - i * 8 + this.sin);
        curveVertex(42 + this.cos * 7 + i * 20, 220 - i * 8 + this.sin);
        curveVertex(42 + this.cos * 7 + i * 20, 220 - i * 8 + this.sin);
        curveVertex(40 - this.cos * 3 + i * 20, 160 - i * 8 + this.sin);
        curveVertex(39 - this.cos * 3 + i * 20, 120 - i * 8 + this.sin);
        curveVertex(37 + i * 20 + this.sin / 2, 80 + this.sin);
        curveVertex(37 + i * 20 + this.sin / 2, 80 + this.sin);
      } else if (i > 4) {
        curveVertex(39 + i * 20 - this.sin / 2, 80 + this.sin);
        curveVertex(39 + i * 20 - this.sin / 2, 80 + this.sin);
        curveVertex(
          37.7 + this.cos * 4 + i * 20,
          120 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(
          37.4 + this.cos * 4 + i * 20,
          160 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(
          36 - this.cos * 8 + i * 20,
          220 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(
          36 - this.cos * 8 + i * 20,
          220 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(
          36.4 + this.cos * 4 + i * 20,
          160 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(
          36.7 + this.cos * 4 + i * 20,
          120 + (i - this.legs) * 5 + this.sin
        );
        curveVertex(37 + i * 20 - this.sin / 2, 80 + this.sin);
        curveVertex(37 + i * 20 - this.sin / 2, 80 + this.sin);
      }
      endShape();
    }
    pop();

    //legs thin inner side
    push();
    scale(0.55);
    translate(82, 34);
    fill(this.r, this.g, this.b, 125);
    noStroke();
    strokeWeight(0.75);
    for (let i = 0; i < this.legs - 1; i++) {
      beginShape();
      if (i == 0) {
        curveVertex(46.5 + this.sin / 2, 70.5 + this.sin * this.speed);
        curveVertex(46.5 + this.sin / 2, 70.5 + this.sin * this.speed);
        curveVertex(46 - this.cos * 4, 150 + this.sin * this.speed);
        curveVertex(46 - this.cos * 8, 250 + this.sin * this.speed);
        curveVertex(46 + this.cos * 12, 450 + this.sin * this.speed);
        curveVertex(46 + this.cos * 12, 450 + this.sin * this.speed);
        curveVertex(45 - this.cos * 8, 250 + this.sin * this.speed);
        curveVertex(45 - this.cos * 4, 150 + this.sin * this.speed);
        curveVertex(44.5 + this.sin / 2, 70.5 + this.sin * this.speed);
        curveVertex(44.5 + this.sin / 2, 70.5 + this.sin * this.speed);
      } else if (i == 5) {
        curveVertex(46.5 - this.sin / 2 + i * 22, 70.5 + this.sin * this.speed);
        curveVertex(46.5 - this.sin / 2 + i * 22, 70.5 + this.sin * this.speed);
        curveVertex(46 + this.cos * 4 + i * 22, 150 + this.sin * this.speed);
        curveVertex(46 + this.cos * 8 + i * 22, 250 + this.sin * this.speed);
        curveVertex(46 - this.cos * 12 + i * 22, 450 + this.sin * this.speed);
        curveVertex(46 - this.cos * 12 + i * 22, 450 + this.sin * this.speed);
        curveVertex(45 + this.cos * 8 + i * 22, 250 + this.sin * this.speed);
        curveVertex(45 + this.cos * 4 + i * 22, 150 + this.sin * this.speed);
        curveVertex(44.5 + i * 22 - this.sin / 2, 70.5 + this.sin * this.speed);
        curveVertex(44.5 + i * 22 - this.sin / 2, 70.5 + this.sin * this.speed);
      } else if (i < 3) {
        curveVertex(46.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
        curveVertex(46.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
        curveVertex(46 - this.cos * 4 + i * 25, 150 + this.sin * this.speed);
        curveVertex(46 - this.cos * 8 + i * 25, 250 + this.sin * this.speed);
        curveVertex(46 + this.cos * 12 + i * 26, 550 + this.sin * this.speed);
        curveVertex(46 + this.cos * 12 + i * 26, 550 + this.sin * this.speed);
        curveVertex(45 - this.cos * 8 + i * 25, 250 + this.sin * this.speed);
        curveVertex(45 - this.cos * 4 + i * 25, 150 + this.sin * this.speed);
        curveVertex(44.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
        curveVertex(44.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
      } else if (i >= 3) {
        curveVertex(46.5 + i * 22, 75 + this.sin * this.speed);
        curveVertex(46.5 + i * 22, 75 + this.sin * this.speed);
        curveVertex(46 + this.cos * 4 + i * 20, 150 + this.sin * this.speed);
        curveVertex(46 + this.cos * 8 + i * 20, 250 + this.sin * this.speed);
        curveVertex(46 - this.cos * 12 + i * 19, 550 + this.sin * this.speed);
        curveVertex(46 - this.cos * 12 + i * 19, 550 + this.sin * this.speed);
        curveVertex(45 + this.cos * 8 + i * 20, 250 + this.sin * this.speed);
        curveVertex(45 + this.cos * 4 + i * 20, 150 + this.sin * this.speed);
        curveVertex(44.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
        curveVertex(44.5 + i * 22, 75 + 1.25 * this.sin * this.speed);
      }
      endShape();
    }
    pop();
    pop();
  }
}

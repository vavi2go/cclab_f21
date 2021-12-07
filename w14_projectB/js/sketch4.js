let groove = [];
let numberOfgroove = 1;
let soundLevel, fft, img, song, sound;
let armCheck1, mouthCheck1, mouthCheck2, lightCheck1, backgroundCheck1, backgroundCheck2 = false;

function preload() {
  img = loadImage("assets/image/light.png");
  img2 = loadImage("assets/image/light2.png");

    sound = loadSound("assets/audio/song4.mp3");
  
}

function songType() {
  song = document.getElementById("songs").value;
      console.log(song);
}

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.id("p5-canvas");

  //create groove boy
  groove.push(new grooveboy(width / 2, height / 2 - 100));

  //control sound by click
  cnv.mouseClicked(togglePlay);

  //setup FFT analyzer
  fft = new p5.FFT(0, 1024);
  soundLevel = new p5.Amplitude();

  //for P5 canvas no mouse
  noCursor();
}

function draw() {
  // update & display
  if (backgroundCheck2 === true) {
    //background(255,192,203);
  } else {
    background(255);
  }

  // draw floor
  push();
  fill(230);
  rect(-1, height - height / 4, width+10, height);
  pop();

  //analyze music
  let spectrum = fft.analyze();
  let level = soundLevel.getLevel();

  //draw dancer
  for (let i = 0; i < groove.length; i++) {
    let g = groove[i];
    //pass analyzed music data to class
    g.update(spectrum, armCheck1, mouthCheck1, mouthCheck2, lightCheck1, backgroundCheck1);
    g.display();
  }

  //light bulp left

  push();
  tint(255, 50);
  image(img, -50, 0, img.width / 10, img.height / 10);
  if (sound.isPlaying() && lightCheck1 === true) {
    noStroke();
    fill(255, 225, 0, 50);
    circle(45, 32, 50);
    fill(255, 225, 0, 100);
    circle(45, 32, 40);
    fill(255, 225, 0, 150);
    circle(45, 32, 33);
  }
  pop();
  //light bulp right
  push();
  tint(255, 50);
  image(img2, width - 75, 0, img2.width / 10, img2.height / 10);
  if (sound.isPlaying()&& lightCheck1 === true) {
    noStroke();
    fill(255, 225, 0, 50);
    circle(width - 40, 32, 50);
    fill(255, 225, 0, 100);
    circle(width - 40, 32, 40);
    fill(255, 225, 0, 150);
    circle(width - 40, 32, 33);
  }
  pop();
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    soundLevel = new p5.Amplitude();
    soundLevel.setInput(sound);
  }
}

//allow Mouth movement
  function changeStyle1(){
    mouthCheck1 = true;
    mouthCheck2 = false;
  }
//allow hands movement
  function changeStyle2(){
    mouthCheck2 = true;
    mouthCheck1 = false;
  }

//allow hands movement
  function changeStyle3(){
      armCheck1 = true;
  }

//turn on fancy background
  function changeStyle4(){
    mouthCheck1 = false;
    mouthCheck2 = false;
    armCheck1 = false;
    backgroundCheck1 = false;
    backgroundCheck2 = false;
  }

  //allow light
  function changeStyle5(){
    lightCheck1 = true;
  }

  //turn off light
  function changeStyle6(){
    lightCheck1 = false;
  }

  //allow background graphs
  function changeStyle7(){
      backgroundCheck1 = true;
  }

  //remove draw background
  function changeStyle8(){
      backgroundCheck2 = true;
  }



class grooveboy {
  constructor(startX, startY) {
    // for position
    this.x = startX;
    this.y = startY;
    // for move function
    this.tail = 0;
    this.ear = 0;
    this.amp = 0;
    this.freq = 0;
    this.spLow = 0;
    this.spLowTot = 0;
    this.spMid = 0;
    this.spMidTot = 0;
    this.spHigh = 0;
    this.spHighTot = 0;
    // arm effect
    this.armcheck1 = 0;
    // mouth effect
    this.mouth = 0
    this.mouthcheck1 = 0;
    this.mouthcheck2 = 0;
    // light effect
    this.lightning = 0;
    this.brightness = 0;
    this.lightcheck1 = 0;
    //tailcolourvalues
    this.r = 0;
    this.g = 0;
    this.b = 0;
    //taildepth
    this.depth = 0;
    //backgroundvisuals
    this.visX = 0;
    this.visY = 0;
    this.visX2 = 0;
    this.visY2 = 0;
    this.funcX = 0;
    this.funcY = 0;
    this.funcA = 0;
    this.funcPower = 0;
    this.backgroundcheck1 = 0;

  }
  update(spectrum, armCheck1, mouthCheck1, mouthCheck2, lightCheck1, backgroundCheck1) {
    //pass on bulean variables for mouthCheck
    this.mouthcheck1 = mouthCheck1;
    this.mouthcheck2 = mouthCheck2;
    this.light(lightCheck1);
    this.soundAnalysis(spectrum);
    this.background(backgroundCheck1);
    this.stage();
    this.move(armCheck1);
  }

  soundAnalysis(spectrum) {
    //get spectrum average for 3 different ranges
    for (let i = 0; i < spectrum.length; i++) {
      if (i < 342) {
        this.spLowTot += spectrum[i];
      } else if (i > 342 && i < 684) {
        this.spMidTot += spectrum[i];
      } else if (i > 684 && i < 1023) {
        this.spHighTot += spectrum[i];
      }
    }
    this.spLow = this.spLowTot / 342;
    this.spMid = this.spMidTot / 342;
    this.spHigh = this.spHighTot / 342;
    this.spLowTot = 0;
    this.spMidTot = 0;
    this.spHighTot = 0;
  }

  move() {
    //create movement along X & Y using FFT analyzers values
    this.amp = map(this.spLow, 0, 255, 100, 0);
    this.freq = map(this.spMid, 0, 255, 0, 255);

    //mouth singing movement
    this.mouth = sin(this.freq * 0.025) * this.amp * 0.1;

    //tail movement
    if (sound.isPlaying()) {
      this.tail = map(sin(this.freq*0.02), -1, 1, -0.5, 0.5)*2*sin(frameCount*0.025);
    } else {
      this.tail = 1;
    }

    //ear movement based on the High end frequencies (occasional)
     if (sound.isPlaying()) {
      this.ear = map(sin(frameCount * this.spHigh), -1, 1, -2, 2);
    } else {
      this.ear = 1;
    }

    //arm movement user defined
      if (sound.isPlaying()) {
    this.armcheck1 = armCheck1;
      } else {
        this.armcheck1 = false;
      }
    if (this.armcheck1 === true) {
      this.armX = map(mouseX, 0, width, -width/6, width/12);
      this.armY = map(mouseY, 0, height, -height/8, height/16);
    } else if (this.armcheck1 === false) {
      this.armX = 0;
      this.armY = 0;
    }
  }

background() {
  this.backgroundcheck1 = backgroundCheck1;
  push();
  if (sound.isPlaying() && this.backgroundcheck1 === true) {
  // general style
  translate(width / 2, height - height / 4);
  noFill();

  this.r = map(this.spLow, 0, 255, 0, 255);
  this.g = map(this.spMid, 0, 255, 0, 255);
  this.b = map(this.spHigh, 0, 255, 0, 255);

  stroke(255-this.r, 255-this.g, 255-this.b, 75);
  fill(this.r, this.g, this.b, 50);

  ///create graph effects behind Goovie
  this.funcX = 10;
  this.funcY = 5;
  this.funcA = map(this.spLow, 0, 255, 4000, 8000);
  this.funcPower = map(this.spMid, 0, 255, 0, 20);

 for (let a = -4; a < 4; a++) {
  //first graph
  push();
  beginShape();
  vertex(0,0);
  for (let i = 0; i < 50; i++) {

        this.visX = sqrt(((1/this.funcX)*this.funcA*i));
        this.visY = -((this.funcY)^this.funcPower*(i/8))*(i/8);

        vertex(80*a+this.visX, this.visY);
}
  endShape();
  pop();
  //second graph
  push();
  beginShape();
  vertex(0,0);
  for (let i = 0; i < 50; i++) {

        this.visX2 = sqrt(((1/this.funcX)*this.funcA*i));
        this.visY2 = -((this.funcY*i)^this.funcPower*(i/8))*(i/8);

        vertex(40*a+this.visX2, this.visY2);
  }
  endShape();
  pop();

  //first graph reverse
  push();
  beginShape();
  vertex(0,0);
  for (let i = 0; i < 50; i++) {

        this.visX = sqrt(((1/this.funcX)*this.funcA*i));
        this.visY = -((this.funcY)^this.funcPower*(i/8))*(i/8);

        vertex(-80*a-this.visX, this.visY);
}
  endShape();
  pop();
  //second graph reverse
  push();
  beginShape();
  vertex(0,0);
  for (let i = 0; i < 50; i++) {

        this.visX2 = sqrt(((1/this.funcX)*this.funcA*i));
        this.visY2 = -((this.funcY*i)^this.funcPower*(i/8))*(i/8);

        vertex(-40*a-this.visX2, this.visY2);
  }
  endShape();
  pop();
}
  pop();
}
}

  stage() {
    push();
    fill(250);
    translate(this.x, this.y);
    beginShape();
    vertex(-50, height / 2.5);
    vertex(-200, height / 1.75);
    vertex(200, height / 1.75);
    vertex(200, height / 1.60);
    vertex(-200, height / 1.60);
    vertex(-200, height / 1.75);
    vertex(200, height / 1.75);
    vertex(50, height/ 2.5);
    endShape();
    pop();
  }

  light() {
    this.lightcheck1 = lightCheck1;
    //map positionY of light line
    this.lightning = map(this.spMid, 0, 255, 0, height / 2);
    //map transparency of the colour
    this.brightness = map(this.spLow, 0, 300, 100, 1);
    //draw light from lamps only when music is on
    if (sound.isPlaying() && this.lightcheck1 === true) {
      push();
      strokeWeight(2);
      for (let i = 0; i < 15; i++) {
        stroke(255, 225, 0, this.brightness);
        line(45 - i, 20 + i, width / 2-200 + this.lightning, this.lightning + i * 20);
        line(
          width - 40 + i,
          25 + i,
          width / 2 + 200 - this.lightning,
          this.lightning + i * 20
        );
      }
      pop();
    }
  }
  display() {
    push();
    //center Groove boy to the middle of the canva
    translate(this.x, this.y);
    scale(0.9);
    //tail
    push();
    strokeJoin(ROUND);

    //tailVisualEffects
    if (sound.isPlaying()) {
    this.r = map(this.spLow, 0, 255, 0, 255);
    this.g = map(this.spMid, 0, 255, 0, 255);
    this.b = map(this.spHigh, 0, 255, 0, 255);

    stroke(this.r, this.g, this.b, this.brightness);
    fill(255 - this.r, 255 - this.g, 255 - this.b, 125);

    //3d effect

    this.depth = map(this.spMid, 0, 255, 0, 50);

    } else {
    stroke(0);
    fill(255);
    this.depth = 0;
    }

    //main tail
    beginShape();
    curveVertex(0, 200);
    curveVertex(0, 200);
    curveVertex(30, 200);
    curveVertex(70 * this.tail * 1.1, 180);
    curveVertex(130 * this.tail * 1.1, 120);
    curveVertex(180 * this.tail * 1.1, 20);
    curveVertex(200 * this.tail * 0.9, -80);
    curveVertex(180 * this.tail, -100);
    curveVertex(130 * this.tail, -60);
    curveVertex(70 * this.tail, 80);
    curveVertex(30, 170);
    curveVertex(0, 200);
    curveVertex(0, 200);
    endShape();

    //left tail
    beginShape();
    strokeJoin(ROUND);
    curveVertex(0, 200);
    curveVertex(0, 200);
    curveVertex(30, 200);
    curveVertex(70 * this.tail * 1.1 + this.depth, 180);
    curveVertex(130 * this.tail * 1.1 + this.depth, 120);
    curveVertex(180 * this.tail * 1.1 + this.depth, 20);
    curveVertex(200 * this.tail * 0.9 - this.depth, -80);
    curveVertex(180 * this.tail - this.depth, -100);
    curveVertex(130 * this.tail - this.depth, -60);
    curveVertex(70 * this.tail - this.depth, 80);
    curveVertex(30, 170);
    curveVertex(0, 200);
    curveVertex(0, 200);
    endShape();

    //right tail
    beginShape();
    curveVertex(0, 200);
    curveVertex(0, 200);
    curveVertex(30, 200);
    curveVertex(70 * this.tail * 1.1 - this.depth, 180);
    curveVertex(130 * this.tail * 1.1 - this.depth, 120);
    curveVertex(180 * this.tail * 1.1 - this.depth, 20);
    curveVertex(200 * this.tail * 0.9 + this.depth, -80);
    curveVertex(180 * this.tail + this.depth, -100);
    curveVertex(130 * this.tail + this.depth, -60);
    curveVertex(70 * this.tail + this.depth, 80);
    curveVertex(30, 170);
    curveVertex(0, 200);
    curveVertex(0, 200);
    endShape();
    pop();

    //GrooveBoy's body
    push();
    fill(255, 250);
    beginShape();
    curveVertex(-45, -8);
    curveVertex(-45, -8);
    curveVertex(-55, 2);
    curveVertex(-75, 30);
    curveVertex(-80, 55);
    curveVertex(-85, 75);
    curveVertex(-85, 100);
    curveVertex(-85, 150);
    curveVertex(-85, 200);
    curveVertex(-85, 225);
    curveVertex(-80, 245);
    curveVertex(-65, 270);
    curveVertex(-55, 296);
    curveVertex(-45, 300);
    //leg1
    curveVertex(-25, 296);
    curveVertex(-25, 270);
    curveVertex(-15, 247);
    //space between legs
    curveVertex(-10, 241);
    curveVertex(-5, 239);
    curveVertex(0, 238);
    curveVertex(5, 239);
    curveVertex(10, 241);
    //leg2
    curveVertex(15, 247);
    curveVertex(25, 270);
    curveVertex(25, 296);
    curveVertex(45, 300);
    curveVertex(55, 296);
    curveVertex(65, 270);
    curveVertex(80, 245);
    curveVertex(85, 225);
    curveVertex(85, 200);
    curveVertex(85, 150);
    curveVertex(85, 100);
    curveVertex(85, 75);
    curveVertex(80, 55);
    curveVertex(75, 30);
    //head
    curveVertex(55, 2);
    curveVertex(45, -8);
    curveVertex(35, -15);
    curveVertex(15, -21);
    curveVertex(0, -23);
    curveVertex(-15, -21);
    curveVertex(-35, -15);
    curveVertex(-45, -8);
    curveVertex(-45, -8);
    endShape();
    pop();

    //mouth
    push();
    beginShape();
    curveVertex(0, 60);
    curveVertex(10, 60);
    if (this.mouthcheck1 === true) {
      curveVertex(0, 60 + this.mouth);
      curveVertex(-10, 60);
      curveVertex(0, 60 - this.mouth);
    } else if (this.mouthcheck2 === true) {
      curveVertex(0, 50);
      curveVertex(-10, 60);
      curveVertex(0, 50);
    } else {
      curveVertex(0, 65);
      curveVertex(-10, 60);
      curveVertex(0, 65);
    }
    curveVertex(10, 60);
    curveVertex(0, 60);
    endShape();
    pop();

    //left arm
    push();
    fill(255);
    beginShape();
    curveVertex(-75, 100);
    curveVertex(-75, 100);
    curveVertex(-30+this.armX, 140+this.armY);
    curveVertex(-10+this.armX, 150+this.armY);
    curveVertex(-30+this.armX, 160+this.armY);
    curveVertex(-80, 140);
    curveVertex(-80, 140);
    endShape();
    pop();

    //right arm
    push();
    fill(255);
    beginShape();
    curveVertex(75, 100);
    curveVertex(75, 100);
    curveVertex(30-this.armX, 140+this.armY);
    curveVertex(10-this.armX, 150+this.armY);
    curveVertex(30-this.armX, 160+this.armY);
    curveVertex(80, 140);
    curveVertex(80, 140);
    endShape();
    pop();

    //left ear outer
    push();
    beginShape();
    curveVertex(-25, 0);
    curveVertex(-25, -5);
    curveVertex(-55+this.ear, -25+this.ear);
    curveVertex(-65, 25);
    curveVertex(-65, 0);
    endShape();
    pop();

    //left ear inner
    push();
    beginShape();
    curveVertex(-35, 0);
    curveVertex(-35, 0);
    curveVertex(-50+this.ear, -10+this.ear);
    curveVertex(-55, 10);
    curveVertex(-55, 0);
    endShape();
    pop();

    //right ear
    push();
    beginShape();
    curveVertex(25, 0);
    curveVertex(25, -5);
    curveVertex(55-this.ear, -25+this.ear);
    curveVertex(65, 25);
    curveVertex(65, 0);
    endShape();
    pop();

    //right ear inner
    push();
    beginShape();
    curveVertex(35, 0);
    curveVertex(35, 0);
    curveVertex(50-this.ear, -10+this.ear);
    curveVertex(55, 10);
    curveVertex(55, 0);
    endShape();
    pop();

    //left eye
    push();
    fill(255, 0, 255, 50);
    ellipse(30, 35, 20, 25);
    pop();
    push();
    fill(0);
    circle(30, 35, 10);
    pop();
    push();
    noStroke();
    ellipse(34, 30, 5, 7);
    pop();

    //right eye
    push();
    fill(255, 0, 255, 50);
    ellipse(-30, 35, 20, 25);
    pop();
    push();
    fill(0);
    circle(-30, 35, 10);
    pop();
    push();
    noStroke();
    ellipse(-26, 30, 5, 7);
    pop();

    pop();
  }
}

let sound;


function preload() {
  sound = loadSound("assets/beat.mp3");
  song = loadSound("assets/song.mp3");
}

function keyPressed() {
  if (key == "p") {
  if(song.isPlaying() == false) {
    song.play();
  }
} else if (key == "s") {
  song.stop();
}
}
function setup() {
  let  canvas = createCanvas(400, 500);
  canvas.mousePressed(userStartAudio);
  background(220);

  // amp = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220, 10);

  let volume = mic.getLevel();

  let dia = map(volume, 0, 1, 10, 200);
  noStroke();
  fill(0, 200, 255, 50);
  circle(width/2, height/2, dia);
  // let dia = map(volume, 0, 1, 10, 200);
  // noStroke();
  // fill(0, 200, 255, 50);
  // circle(width/2, height/2, dia);
  // let vol = map(mouseY, 0, height, 1.00, 0.00, true);
  // song.setVolume(vol);
  // let panning = map(mouseX, 0, width, -1.00, 1.00, true);
  // song.pan(panning);
}

// function mouseDragged() {
//   if (sound.isPlaying()== false) {
//     sound.play();
//   }
// }

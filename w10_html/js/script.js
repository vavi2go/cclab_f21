console.log("Loaded!");

// for (let i = 0; i <100; i++) {
//   let newDiv = document.createElement('div');
//   newDiv.style.backgroundColor = "gray";
//   newDiv.style.float = "left";
//   newDiv.style.margin = "30px";
//   newDiv.style.width = "50px";
//   newDiv.style.height = "50px";
// document.body.appendChild(newDiv);
// }



for (let i = 0; i <240; i++) {
let newBtn = document.createElement('button');
  newBtn.style.width = "50px";
  newBtn.style.height = "50px";
  newBtn.style.margin = "20px";

  newBtn.addEventListener("click", function(){
    let body = document.body;
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    body.style.backgroundColor = "rgb("+ r +"," + g +"," + b + ")";
  });

  document.body.appendChild(newBtn);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("pink");
}

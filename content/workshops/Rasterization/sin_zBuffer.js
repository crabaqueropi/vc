let W;
let H;

let x;


function setup() {
  W = 500;
  H = 500;
  createCanvas(W, H, WEBGL);

  stroke_on = createCheckbox('Stroke', true);
  stroke_on.changed(() => {
    if (stroke_on.checked()) {
        stroke();
    } else {
        noStroke();
    } 
  });
  stroke_on.position(10, 30);
}

function draw() {
  background(255);    

  fill(255, 0, 0)
  translate(-200, 0, 0);
  sphere(80);
  fill(0, 0, 255)
  translate(200, 0, 0);
  box(100);
  translate(0, 0, -200);
  sphere(100);
  translate(0, 150, 200);
  box(100);
  translate(0, -300, 0);
  box(100);
  fill(0, 255, 0)
  translate(200, 150, 0);
  sphere(80);
}
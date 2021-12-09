let W;
let H;

var near, far;

let myShader;

function preload() {
  myShader = loadShader("/vc/workshops/Rasterization/shaderOriginal.vert", "/vc/workshops/Rasterization/depthmap.frag");
}

function setup() {
  W = 500;
  H = 500;
  createCanvas(W, H, WEBGL);
  createEasyCam();

  shader(myShader);
  near = 1;
  far = 800;
  myShader.setUniform('near', near);
  myShader.setUniform('far', far);
}

function draw() {
  // projection
  perspective(60 * PI/180, width/height, near, far);

  // clear BG
  background(255);
  noStroke();

  fill(255, 0, 0)
  translate(-150, 150, 0);
  box(100)
  fill(0, 0, 255)
  translate(150, -150, 0);
  box(100)
  fill(0, 255, 0)
  translate(150, -150, 0);
  box(100)
 
}
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

  //Para la pixelación - falta mirar bien el .frag y e. .vert
  resolution = createSlider(10, 100, 30, 1);
  resolution.position(10, 50);
  resolution.style('width', '80px');
  resolution.input(() => myShader.setUniform('resolution', resolution.value()));
  myShader.setUniform('resolution', resolution.value());

}

function draw() {
  // projection
  perspective(60 * PI/180, width/height, near, far);

  // clear BG
  background(0);
  noStroke();

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
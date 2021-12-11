let image;
let video;
let om;
let mosaic;
let resolution;
let video_on;
let om_on;

function preload() {
  image = loadImage('/vc/sketches/mandrill.png');
  ///vc/workshops/Rasterization/shaderOriginal.vert
  //mosaic = loadShader('vc/workshops/Rasterization/shader.vert', '/sketches/shaders/om.frag');
  mosaic = loadShader('vc/workshops/Rasterization/shader.vert', '/vc/workshops/Rasterization/zBuffer.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('om', om);
  mosaic.setUniform('img', image);
  resolution = createSlider(10, 100, 30, 1);
  resolution.position(10, 50);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
}

function draw() {
  background(33);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  }
  else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}
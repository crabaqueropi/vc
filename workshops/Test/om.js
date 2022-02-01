let image_src;
let video_src;
let om;
let mosaic;
let resolution;
let video_on;
let plot;

function preload() {
  image_src = loadImage('/vc/images/loro.png');
  video_src = createVideo(['/vc/images/playa.webm']);
  video_src.hide(); 
  om = loadImage('/vc/images/omkara.png');
  mosaic = readShader('/vc/workshops/Test/om.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('img', image_src);
  mosaic.setUniform('om', om);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 10);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  video_on = createCheckbox('video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('img', video_src);
      video_src.loop();
    } else {
      mosaic.setUniform('img', image_src);
      video_src.pause();
    }
  });
  video_on.position(10, 30);
  plot = createSelect();
  plot.position(10, 50);
  plot.option('original');
  plot.option('pixelator');
  plot.option('ॐ');
  plot.selected('pixelator');
  plot.changed(() => {
    mosaic.setUniform('original', plot.value() === 'original');
    mosaic.setUniform('om_on', plot.value() === 'ॐ');
  });
}

function draw() {
  background(33);
  cover({ texture: true });
}
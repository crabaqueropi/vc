let imageCells;
let pg;
let shadersVersion2;
let video_src;
let debug;
let cols;
let resolution;
let sel;
let video_on;
let imageArray;
let imageArray1;
let imageArray2;
let metrica;

const SAMPLE_RES = 30;

function preload() {
  video_src = createVideo(['/vc/images/playa.webm']);
  video_src.hide(); 
  shadersVersion2 = readShader('/vc/workshops/Test/shadersVersion2.frag');
  
  imageArray1 = [];
  for (let i = 1; i <= 20; i++) {
    imageArray1.push(loadImage('/vc/images/Shaders/p'+i+'.jpg'));
  }

  imageArray2 = [];
  for (let i = 1; i <= 30; i++) {
    imageArray2.push(loadImage('/vc/images/Shaders/Image_'+i+'.jpg'));
  }
  
  imageArray = imageArray1;
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(imageArray);
  textureMode(NORMAL);
  noStroke();
  shader(shadersVersion2);
  sel = createSelect();
  sel.position(10, 125);
  sel.option('keys');
  sel.option('symbols');
  sel.selected('symbols');
  sel.changed(() => {
    shadersVersion2.setUniform('debug', sel.value() === 'keys');
    shadersVersion2.setUniform('color_on', false);
  });
  video_on = createCheckbox('video', false);
  video_on.style('color', 'magenta');
  video_on.changed(() => {
    if (video_on.checked()) {
      shadersVersion2.setUniform('source', video_src);
      video_src.loop();
    } else {
      shadersVersion2.setUniform('source', random(imageArray));
      video_src.pause();
    }
  });
  video_on.position(10, 80);
  shadersVersion2.setUniform('source', random(imageArray));
  resolution = createSlider(10, 200, 50, 1);
  resolution.position(10, 100);
  resolution.style('width', '80px');
  resolution.input(() => { shadersVersion2.setUniform('resolution', resolution.value()) });
  shadersVersion2.setUniform('resolution', resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  shadersVersion2.setUniform('cols', imageCells.width);

  plot = createSelect();
  plot.position(10, 150);
  plot.option('avg');
  plot.option('luma1');
  plot.option('luma2');
  plot.option('personalizada');
  plot.selected('avg');
  metrica = 1;
  plot.changed(() => {
    if(plot.value() === 'avg'){
      metrica = 1;
    }else{
        if(plot.value() === 'luma1'){
          metrica = 2;
        }else{
          if(plot.value() === 'luma2'){
            metrica = 3;
          }else{ 
            if(plot.value() === 'personalizada'){
              metrica = 4;
            }else{ 
              metrica = 1;
            }
          }
        }
    }
    shadersVersion2.setUniform('metr', metrica);
  });
  shadersVersion2.setUniform('metr', metrica);
  sample();
}

function keyPressed() {
  if (key === 'r' && !video_on.checked()) {
    shadersVersion2.setUniform('source', random(imageArray));
  }
}

function sample() {
  shadersVersion2.setUniform('metr', metrica);
  if (pg.width !== SAMPLE_RES * imageCells.width) {
    pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
    shadersVersion2.setUniform('cols', imageCells.width);
  }
  imageCells.sort({ ascending: true, cellLength: SAMPLE_RES });
  drawQuadrille(imageCells, { graphics: pg, cellLength: SAMPLE_RES, outlineWeight: 0 });
  shadersVersion2.setUniform('palette', pg);
}

function draw() {
  cover({ texture: true });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
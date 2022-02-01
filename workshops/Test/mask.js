let maskShader;
let img;
let mask;
let kernel;

function preload() {
  maskShader = readShader('/vc/workshops/Test/mask.frag');
  img = loadImage('/vc/images/loro.png');
}

function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  mask = createCheckbox('kernel', false);
  mask.position(10, 40);
  mask.style('color', 'white');

  plot = createSelect();
  plot.position(10, 10);
  plot.option('Detección de bordes');
  plot.option('Enfocar');
  plot.option('Desenfoque de cuadro');
  plot.option('Desenfoque gaussiano');
  plot.selected('Detección de bordes');
  kernel = 1;
  plot.changed(() => {
    if(plot.value() === 'Detección de bordes'){
        kernel = 1;
    }else{
        if(plot.value() === 'Enfocar'){
            kernel = 2;
        }else{
            if(plot.value() === 'Desenfoque de cuadro'){
                kernel = 3;
            }else{
                if(plot.value() === 'Desenfoque gaussiano'){
                    kernel = 4;
                }else{
                    kernel = 1;
                }
            }
        }
    }
  });

  shader(maskShader);
  maskShader.setUniform('texture', img);
  emitTexOffset(maskShader, img, 'texOffset');
}

function draw() {
  background(0);
  // /*
  if (mask.checked()) {
      if(kernel == 1){
        maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
      }else{
        if(kernel == 2){
            maskShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);
          }else{
            if(kernel == 3){
                maskShader.setUniform('mask', [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]);
              }else{
                maskShader.setUniform('mask', [1/16, 1/8, 1/16, 1/8, 1/4, 1/8, 1/16, 1/8, 1/16]);
              }
          }
      }
  }
  else {
    maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
  }

  // */
  cover({ texture: true });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
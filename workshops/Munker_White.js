
let value1 = 0;
let value2 = 1000;
let value3 = 0;
let posX = 10;
let posY = 10;


function setup() {
    createCanvas(680, 400);
}
  
function draw() {
    background(1000);
    stroke(1, 1, 1);
    
    let step = posY*2;

    //Lineas negras
    for (var x=step; x< height-20; x=x+step){
        noStroke();
        fill(1);
        rect(posX, x, 660, posY);
    }

    //Lineas verdes a la izquierda
    for (var x=step; x< height-20; x=x+step){
        noStroke();
        fill(value1,value2,value3);
        rect(10, x, 200, posY);
    }

    //Lineas verdes a la derecha
    for (var x=step+posY; x< height-20; x=x+step){
        noStroke();
        fill(value1,value2,value3);
        rect(400, x, 200, posY);
    }
}


function mouseDragged() {
    posX += mouseX - pmouseX;
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW){
        posY += 0.5;
    }
    if (keyCode === LEFT_ARROW){
        posY -= 0.5;
    }
}


function doubleClicked() {
    value1 = (Math.random()*500)+100;
    value2 = (Math.random()*500)+100;
    value3 = (Math.random()*500)+100;
    return false;
} 
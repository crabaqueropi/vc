function setup() {
    createCanvas(720, 500);
  }
  
  function draw() {
  
    background(220)
    for (let j = 0; j <1000; j += 7) {
    
      //linear grid
      stroke(0)
      strokeWeight(3)
      line(j + mouseX, 0, j + mouseX, height)
  
      //circular tube
      stroke('yellow')
      strokeWeight(3)
      noFill()
      ellipse(100, j, 100, 100)
      stroke('turquoise')
      ellipse(200, j, 100, 100)
      stroke('coral')
      ellipse(300, j, 100, 100)
      stroke('pink')
      ellipse(400, j, 100, 100)
      stroke(0,255,0)
      ellipse(500, j, 100, 100)
      stroke(255)
      ellipse(600, j, 100, 100)   
   
    }
  }
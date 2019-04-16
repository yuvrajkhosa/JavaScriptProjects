var pegs = [];
var ballArr = [];
var amountOfPegs = 150;
var rows = 15;
function setup(){
  createCanvas(1000,900);
  ballArr.push(new Ball(0,0, 40, 2));
  let offSet = 0;
  let verticalDistance = 0;
  let horizontalDistance = 50;
  for(var i = 0; i < amountOfPegs; i++){
    if(i % (amountOfPegs / rows) == 0){
      verticalDistance += 50;
      horizontalDistance = 0;
      if(offSet > 0){
        offSet = 0;
      }
      else{
        offSet = 50;
      }
    }
    pegs.push(new Peg(20 + horizontalDistance + offSet, verticalDistance , 15))
    horizontalDistance += 100;
  }
  frameRate(60);
}

function draw(){
  background(0);

  fill(255)
  textSize(24)
  text("  8000        5000        1000        LOSE        10 000        LOSE        1000        5000        8000", 0, height - 30);
  stroke(255, 0, 0)
  strokeWeight(15)
  line(0, height - 10, 80, height - 10)
  stroke(0, 255, 0)
  line(95, height - 10, 195, height - 10)
  stroke(0, 0, 255)
  line(215, height - 10, 300, height - 10)
  stroke(100, 100, 255)
  line(315, height - 10, 410, height - 10)
  stroke(255, 0,255)
  line(420, height - 10, 550, height - 10)
  stroke(100, 100, 255)
  line(560, height - 10, 670, height - 10)
  stroke(0, 0, 255)
  line(680, height - 10, 770, height - 10)
  stroke(0, 255, 0)
  line(785, height - 10, 875, height - 10)
  stroke(255, 0, 0)
  line(880, height - 10, 985, height - 10)
  strokeWeight(1)
  noStroke();
  if(ballArr[0].isReleased){
    ballArr[0].applyForce(createVector(0, 1));//Add gravtiy. Used to  be like ballArr[0].applyForce(createVector(0, 1).mult(ball[0].mass)) this removes the slowing down with alot of mass. But removed to simulate the ball dragging on the back of the board
  }
  else{
    if(mouseX > (ballArr[0].diameter / 1.5) && mouseX < width - (ballArr[0].diameter / 1.5)){
      ballArr[0].pos.x = mouseX;
    }
    ballArr[0].pos.y = 20;
  }
  ballArr[0].update();
  ballArr[0].bounce();
  
  for(var i in pegs){
    pegs[i].show();
    pegs[i].checkCollision(ballArr[0]);
  }
  ballArr[0].show();

}

function mousePressed(){
  ballArr[0].isReleased = true;
}

function keyPressed(){
  console.log(ball.vel)
  ballArr[0].doUpdates = false;
}

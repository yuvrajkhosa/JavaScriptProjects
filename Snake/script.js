var scl = 20;
var direction;
var ate = false;
var difficulty = undefined;
var hasSuper = false;
var add = 0;
var upTo = 0;

function setDif(dif){
  difficulty = dif
  document.getElementById("div").style.display = 'none'
}

function setup(){




  createCanvas(800,800)
  snake = new Snake()
  food = new Food()
  s = new Superfood()



}


function draw(){
if (difficulty == 0) frameRate(10)
if (difficulty == 1) frameRate(17)
if (difficulty == 2) frameRate(30)








if (!ate){

  food.pickLoc()
  ate = true
}

background(0)
fill(255)
snake.show(0)



if (hasSuper) {
  s.show(255)
  s.touchesFood()

}
if (add == 1){

  snake.total++
  upTo++;
  if (upTo == 10){
    add = 0;
    upTo = 0;
    s = null
    hasSuper = false;
  }

}



snake.touchesFood()







food.show(0)
snake.inside()
stroke(255,0,0)
snake.update()
snake.walls()


//document.getElementById("p").innerHTML ="snake length: " + snakeLen + " LastPos: " + snake.lastPos.length ;
}


function keyPressed(){
  if ((keyCode === UP_ARROW && parseInt(snake.vel.y) != scl) || keyCode === UP_ARROW && snake.total == 0 ){
    snake.vel = createVector(0,-scl)

  }
  else if ((keyCode === DOWN_ARROW && parseInt(snake.vel.y) != -scl) || keyCode === DOWN_ARROW && snake.total == 0){
    snake.vel = createVector(0, scl)
  }
  else if ((keyCode === RIGHT_ARROW && parseInt(snake.vel.x) != -scl) || keyCode === RIGHT_ARROW && snake.total == 0){
    snake.vel = createVector(scl, 0)
  }
  else if ((keyCode === LEFT_ARROW && parseInt(snake.vel.x) != scl) || keyCode === LEFT_ARROW && snake.total == 0){
    snake.vel = createVector(-scl, 0)
}
  else if (keyCode === 32){
  document.getElementById("start").style.display = 'none';
  snake.vel = createVector(scl, 0)
}
  else if (keyCode === BACKSPACE){
    add++
  }

  document.getElementById("length").innerHTML = snake.total


}

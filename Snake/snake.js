class Snake{

  constructor(){
    this.sideLen = scl
    let cols = width / scl
    let rows = height / scl
    this.pos = createVector(0,0)
    //this.pos.mult(scl)
    this.vel = createVector(0,0)
    this.total = 0;

    this.tail = []



  }


  update(){
    //this.vel.mult(scl)

    if (this.total === this.tail.length){
    for (var i = 0; i < this.tail.length - 1; i++){
      this.tail[i] = this.tail[i + 1]
    }

}
this.tail[this.total - 1] = createVector(this.pos.x, this.pos.y)


    //text(this.pos,this.pos.x, this.pos.y)
    this.pos.add(this.vel)
    // this.pos.x = constrain(this.pos.x, 0, width - scl)
    // this.pos.y = constrain(this.pos.y, 0, height - scl)



  }

  show(){
    for (var i = 0; i < this.tail.length;i++){
      stroke(0)
      strokeWeight(2)
      rect(this.tail[i].x, this.tail[i].y, scl,scl)
    }
    fill(160,160,160)
    strokeWeight(2)
    stroke(160,160,160)
    rect(this.pos.x, this.pos.y, this.sideLen, this.sideLen)
  }



inside(){

  for (var i = 0; i < this.tail.length; i++){
    if (this.pos.x == this.tail[i].x && this.pos.y == this.tail[i].y){
    this.gameOver()
    }
  }
}

walls(){
  if (this.pos.x > width || this.pos.y < 0 - scl || this.pos.x < 0 - scl || this.pos.y > height){
    this.gameOver()
    this.vel = null
  }
}



  touchesFood(){
    if (this.pos.x == food.pos.x && this.pos.y == food.pos.y){
      this.total++
      ate = true
      food.pickLoc()

      if(!hasSuper){

        if(floor(random(1,15)) == 2){
          s = new Superfood()
          s.pickLoc()

          hasSuper = true
        }
      }

    }

  }


gameOver(){
  document.getElementById("start").innerHTML = 'GAME OVER.\n Score: \n' + this.total + " \n | press F5 to restart"
  document.getElementById("start").style.left = '1%'
  document.getElementById("start").style.display = 'block'
	document.getElementById("start").style.fontSize = '30px'

  snake.pos = null
}


}

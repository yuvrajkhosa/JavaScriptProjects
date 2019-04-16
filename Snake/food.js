class Food{
constructor(){

}

  pickLoc(){
    this.rows = floor(width/scl)
    this.cols = floor(height/scl)
    this.pos = createVector(floor(random(this.cols)), floor(random(this.rows)));
    this.pos.mult(scl);
  }

  show(col){
    noStroke()
    // text(this.pos,this.pos.x, this.pos.y + 60)
    fill(0,255,col)
    rect(this.pos.x, this.pos.y, snake.sideLen, snake.sideLen)

  }
  hide(){
    fill(0)
    rect(this.pos.x, this.pos.y, snake.sideLen, snake.sideLen)
  }

}

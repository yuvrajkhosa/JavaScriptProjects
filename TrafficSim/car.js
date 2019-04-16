
class Car{
  constructor(_r,_a, _id){

    this.r = _r + random(-10,10)
    this.a = _a * 0.0174533

    this.len = 20
    this.amount = 0.01
    this.id = _id
    this.x;
    this.y;
    this.stop = false
    this.constMover = false
    this.col = [random(130,255),random(130,255),random(130,255)]


  }
  show(){

    this.x = this.r * Math.cos(this.a)
    this.y = this.r * Math.sin(this.a)
    stroke(0)



    fill(255)

    stroke(255)

    push()
    noStroke()


    translate(this.x,this.y)
    rotate(this.a / 0.0174533)
    fill(this.col)
    noStroke()
    rect(0,0,this.len,this.len * 2, 10)
    pop()
    textSize(25)

  }
  move(other){
        this.d = dist(this.x,this.y,other.x,other.y )




        if(this.constMover == true && this.d > 150){
          this.amount = 0.011
        }else{
          this.amount = map(this.d, 100, 50, 0.01, 0)
        }

        if (!this.stop){
        this.a += this.amount

        }

      }

  stopMoving(){

    this.stop = true

  }

  constMove(){
    this.constMover = true
  }




}

var cars = []
var amountOfCars = 40

function setup(){
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1600,900)
  for (let i = 0; i < amountOfCars; i++){
    cars[i] = new Car(435,i * (360 / amountOfCars), i)
  }
}

function draw(){
  translate(width / 2, height / 2)
  background(0)

  for (let i = 0; i < cars.length; i++){
    cars[i].show()
}

for (let j = 0; j <= cars.length - 2; j++){
  if (j !== cars.length - 1){
    cars[j].move(cars[j + 1])
  }

}

cars[cars.length-1].move(cars[0])

if (keyIsPressed){
  cars[cars.length-1].stop = true


}
else{
  cars[cars.length-1].stop = false
  cars[cars.length-1].constMover = true




}


}

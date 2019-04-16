const dingSound = new Audio('ding.mp3');
const clickSound = new Audio('click.mp3');
var counterArr = [];
var numbersUsed = [];
var cols = 10;
var rows = 9;
function setup(){
	createCanvas(1200,925)
}

function draw(){
  background('#B8F3FF')

  //background('#FFFFFF')

  /*for (let i = 1; i <= 90; i++){
    let x;
    if(i % 10 == 0){
      x = width - 100;
    }
    else{
      x = ((i % 10) * 100) - 100;
    }
    let y = Math.ceil(i / 9) * 100;
    fill(0)
    textSize(20)
    textAlign(CENTER)
    textFont('Arial Black')
    text(i, (x + (relativeNum) / 2), (y - relativeNum / 2))

  }*/
  stroke(1)
  strokeWeight(5)
  noFill()
  rect(0,0, width, height)
  var checkVar = 1;
  for(let i = 0; i < 90; i++){
    let x = (i % 10) * (width / cols) + (width / cols / 2);//This used to be width / cols
    let y = Math.floor(i / 10) * (height / rows) + (height / rows / 2);//This also used to be width / cols!!!

    //noStroke()
    //noStroke()
    if(i % 10 == 0){
      if(checkVar == 0){
        checkVar = 1;
      }
      else{
        checkVar = 0;
      }
    }
    if(i % 2 == checkVar){
      fill(250, 107, 179, 150)
      noStroke()
      rect(x - (width / cols / 2), y - (height / rows / 2), (width / cols) + 6, (height / rows) + 6, 10, 10)//Here six just is the right amount to add to amde the curves look better.

    }

    textSize(20)
    textAlign(CENTER, CENTER)
    textFont('Arial Black')
    fill(0,0,0,255)
    text(i + 1, x, y)
  }

  for (i of counterArr){
    fill(255, 0, 0, 100)
    i.draw();
  }

}

function mousePressed(){
  fullscreen(true);
  //console.log(Math.round(mouseX / 10))
  //console.log(Math.ceil(mouseX / 100) * 100)
  //counterArr[counterArr.length] = new Chip(mouseX, mouseY)
  if(mouseX > 0 && mouseX < width){
    addToTable(1, true);
  }
  console.log(`${mouseX} | ${mouseY}`)
}

function addToTable(n, m){//n == number. m == wether mouse is used
  //console.log(numbersUsed)
  m = m || false;
  if(m){//If input gotten from mouse;
    //console.log(`${mouseX} : ${mouseY}`)
    //let onesPos = Math.ceil(mouseX / (width / 10));
    let onesPos = (Math.floor(mouseX / (width / cols) + 1))
    //onesPos = onesPos % 10 == 0 ? 0 : onesPos;
    //let tensPos = Math.ceil(mouseY / (height / 9)) - 1;
    let tensPos = Math.floor(mouseY / (height / rows))
    console.log()//Make tens pos the value of the tens place.
    let fullNumber = (tensPos * 10) + onesPos * 1;
    // if(fullNumber.substring(fullNumber.length - 1) == '0'){
    //   fullNumber = (tensPos + 1) * 10;
    // }
    fullNumber = fullNumber
    var num = fullNumber

  }
  else{//If input gottem from michorphone;
    var num = n;
  }
  if(!numbersUsed.includes(num) && num > 0 && num < 91){//Good number.
    //numbersUsed.push(num);
    counterArr[counterArr.length] = new Chip(num);
    numbersUsed.push(num);

  }else if(numbersUsed.includes(num)){
    var find = numbersUsed.findIndex((elem) => {
      return(elem == num);
      })
      numbersUsed.splice(find, 1);
    for(let i = 0; i < counterArr.length; i++){
      if(counterArr[i].num == num){
        counterArr[i] = null;
        counterArr.splice(i, 1);
        break;
      }
    }
  }
}

class Chip{
  constructor(num){
    /*
    console.log(fullNumber)
    if(!numbersUsed.includes(parseInt(fullNumber))){
      numbersUsed.push(parseInt(fullNumber));
    }
    */
    //console.log(num)

    dingSound.play();
    this.num = num;
    let tensPos = Math.floor(this.num / 10);
    let onesPos = (this.num % 10);
    //console.log(tensPos + " " + onesPos)
    let n = (tensPos * 10) + onesPos - 1;

    /*let xPos = onesPos == 0 ? width - (relativeNum / 2) : (onesPos * 100) - (relativeNum / 2);
    let yPos = onesPos == 0 ? (tensPos * 100) - (relativeNum / 2) : (tensPos * 100) + (relativeNum / 2);
    console.log(`${xPos} | ${yPos}`)
    console.log(`${tensPos} | ${onesPos}`)*/
    let xPos = (n % 10) * (width / cols) + (width / cols / 2);
    let yPos = Math.floor(n / 10) * (height / rows) + (height / rows / 2);
    this.pos = createVector(xPos, yPos);
    //this.pos = createVector( (Math.ceil(x / relativeNum) * relativeNum) - (relativeNum / 2), (Math.ceil(y / relativeNum) * relativeNum) - (relativeNum / 2) )//Convert to the middle of the square LINK: https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517
  }
  draw(){
    ellipse(this.pos.x, this.pos.y, 50)
  }
}

function randInt(){
  let rand = Math.floor(Math.floor(Math.random() * (rows * cols)) + 1)
  if(!numbersUsed.includes(rand)){
    //addToTable(rand)
    console.log(rand)
    speak(rand)
    return;
  }
  else{
    randInt()
  }
}

function changeButton(button){
  clickSound.play();
  document.getElementById(button).classList.toggle("btn-danger");
  //speak("Somebody just got " + button.toString())
}

function cleanBoard(){
  if(confirm("Are you sure you would like to clean the board?")){
    for(i in counterArr){
      counterArr[i] = null;
    }
    counterArr = []
    numbersUsed = []
    setTimeout(() => synth.cancel(), 1500);

  }
}

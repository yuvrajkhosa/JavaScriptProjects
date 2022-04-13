const dingSound = new Audio('ding.mp3');
const clickSound = new Audio('click.mp3');
let counterArr = [];
let numbersUsed = [];
const cols = 10;
const rows = 9;
const latestChipColor = 'rgba(26, 229, 215, 0.5)';
const normalChipColor = 'rgba(229, 26, 40,0.5)';
const tileColor = 'rgba(0,0,0,0.1)';
let displayBigNumber = false;
const baseFSize = 350;
let fSize = baseFSize;


function setup(){
  
	createCanvas(1200,925)
}

function draw(){
  background('#fff9e3')
  stroke(1)
  strokeWeight(5)
  noFill()
  rect(0,0, width, height)
  let checkVar = 1;
  for(let i = 0; i < 90; i++){
    let x = (i % 10) * (width / cols) + (width / cols / 2);//This used to be width / cols
    let y = Math.floor(i / 10) * (height / rows) + (height / rows / 2);//This also used to be width / cols!!!
    if(i % 10 == 0){
      if(checkVar == 0){
        checkVar = 1;
      }
      else{
        checkVar = 0;
      }
    }
    if(i % 2 == checkVar){
      fill(tileColor);
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
    i.draw();
  }
  if(displayBigNumber){
    textSize(fSize);
    if(fSize < 900){
      fSize += 0.5;
    }
    fill(0,0,0);
    textFont('Helvetica');
    text(numbersUsed[numbersUsed.length - 1], width / 2, height /2);
  }
  
}

function mousePressed(){
  if(!fullscreen()){
    fullscreen(true);
  }
  if(mouseX > 0 && mouseX < width){
    addToTable(1, true);
  }
  console.log(`${mouseX} | ${mouseY}`)
}

function addToTable(n, m = false){//n == number. m == wether mouse is used
  let num;
  if(m){//If input gotten from mouse;
    let onesPos = (Math.floor(mouseX / (width / cols) + 1))
    let tensPos = Math.floor(mouseY / (height / rows))
    console.log()//Make tens pos the value of the tens place.
    let fullNumber = (tensPos * 10) + onesPos * 1;
    fullNumber = fullNumber
    num = fullNumber

  }
  else{//If input gottem from michorphone;
    num = n;
  }
  if(!numbersUsed.includes(num) && num > 0 && num < 91){//Good number.
    //numbersUsed.push(num);
    if(counterArr.length > 0){
      counterArr[counterArr.length - 1].isLatest = false;
    }
    counterArr.push(new Chip(num));
    numbersUsed.push(num);
    if(!displayBigNumber){
      displayBigNumber = true;
      setTimeout(()=>{
        displayBigNumber = false;
        fSize = baseFSize;
      }, 4000);
    }
    
  }else if(numbersUsed.includes(num)){
    let find = numbersUsed.findIndex((elem) => {
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
    dingSound.play();
    this.num = num;
    this.isLatest = true;
    let tensPos = Math.floor(this.num / 10);
    let onesPos = (this.num % 10);
    let n = (tensPos * 10) + onesPos - 1;
    let xPos = (n % 10) * (width / cols) + (width / cols / 2);
    let yPos = Math.floor(n / 10) * (height / rows) + (height / rows / 2);
    this.pos = createVector(xPos, yPos);
    //this.pos = createVector( (Math.ceil(x / relativeNum) * relativeNum) - (relativeNum / 2), (Math.ceil(y / relativeNum) * relativeNum) - (relativeNum / 2) )//Convert to the middle of the square LINK: https://stackoverflow.com/questions/11022488/javascript-using-round-to-the-nearest-10/11022517
  }
  draw(){
    fill(this.isLatest ? latestChipColor : normalChipColor);
    ellipse(this.pos.x, this.pos.y, 60)
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

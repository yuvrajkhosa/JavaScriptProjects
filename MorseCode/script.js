const fps = 30;
const dotTime = 0.2;//AFter what amount of time to stop the dot (In seconds)
const dashTime = 1;//AFter what amount of time to stop the dash
const coolDownTime = 0.7;//How long to wait before next symbol
const startAgainTime = 3;
var counter = 0;
var coolDown = true
var startVisual = false;
var startAgain = false;
var morseString = ""
var arr = [];
function setup(){
  frameRate(fps);
  createCanvas(600,600);
}
function draw(){
  if(startVisual){//When user clicks start
    var index = arr.length - 1;//Must update length everytime in order to keep it dynamic.
    if(!startAgain){//If the cycle is NOT finished
      if (arr[index] == "." && coolDown){//Check to see if current time is dash or dot.
        console.log(arr);
        background(255,0,0);//BLINK
        if(counter == (fps * dotTime)){//If time for dot is up
          counter = 0;
          coolDown = false;
          arr.pop();//Remove dot from array
        }
        counter++;//This goes up everytime if time is NOT up.
      }
      else if(arr[index] == "-" && coolDown){//Same for dot but in DASH.
        background(255,0,0)
        if (counter == (fps * dashTime)){
          counter = 0;
          coolDown = false;
          arr.pop();
        }
        counter++;
      }
      else{
        background(0);
      }
    }
    else{//Set to black at end of cycle
      background(0);
      counter++;
      if(counter == (fps * startAgainTime)){//Once coooldown restart time is met
        startAgain = false;//Allow for drawing again
        counter = 0;//Reset counter
      }
    }
    if (!coolDown){//If current dot or dash is finished. This will execute to wait before playing next dot or dash.
    //  counter = 0;
      if (counter == (fps * coolDownTime)){//To check if cooldown time is over.
        coolDown = true;
        counter = 0;
      }
      counter++;
    }//Could use coolDownCounter but this is easier. Takes up less memory.

    if(arr.length == 0){
      console.log("finsihed")
      setArrayToString();
      startAgain = true;
    }
  }
}


function addToString(isDot){//Functino to add to the string
  if(isDot == undefined){//If no parameters given that means remove one
    morseString = morseString.substring(0, morseString.length -  2);
  }
  else if(isDot){
    morseString += ".";
  }
  else{
    morseString += "-";
  }
  console.log(morseString);
  document.getElementById("morseStringHeader").innerHTML = morseString.split('').join(' ');
}

function setArrayToString(){
  arr = morseString.split('').reverse();//Must reverse array because it takes current dot or dash from the end. so reverse the reverse.
  startVisual = true;
}

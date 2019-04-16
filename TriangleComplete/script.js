
function recheckFields(){
  aAngle = parseFloat(document.getElementById("aAngleField").value) * (Math.PI / 180);//Convert to radians because Math function in JS work with Radians.
  bAngle = parseFloat(document.getElementById("bAngleField").value) * (Math.PI / 180);//First using parseInt(). Which caused many errors. Use parseFloat instead.
  cAngle = parseFloat(document.getElementById("cAngleField").value) * (Math.PI / 180);
  abLength = parseFloat(document.getElementById("abLengthField").value);
  acLength = parseFloat(document.getElementById("acLengthField").value);
  bcLength = parseFloat(document.getElementById("bcLengthField").value);

  arrOfAngleFields = ["aAngleField", "bAngleField", "cAngleField"];//Used to iterate through all boxes to see which have values
  arrOfLengthFields = ["abLengthField", "acLengthField", "bcLengthField"];
}

function solve(){


recheckFields();
let anglesGiven = 0;
let sideLengthsGiven = 0;
//FIND OUT HOW MANY OF EACH FIELDS IS NOT EMPTY;
for(field of arrOfAngleFields){
  if(document.getElementById(field).value != ""){
    anglesGiven++;
  }
}
for(field of arrOfLengthFields){
  if(document.getElementById(field).value != ""){
    sideLengthsGiven++;
  }
}
/*
if(anglesGiven < 1 || sideLengthsGiven < 1){
  alert("Not enough information")
  return;
}*/
//Get Sides. Check if hypotenuse is given. if not Then pythagorean theorum.

if(sideLengthsGiven == 2){//If given two sidelengths and have to solve for 1 more.
  solveSides()//Try solving
  recheckFields();
  if(anglesGiven == 1){
    document.getElementById("aAngleField").value = Math.atan(bcLength / abLength) * (180 / Math.PI)//Convert to degrees | Only need  to find one angle, since we have all three sides. Then just solve for rest.
    solveAngles();
  }
}
if(anglesGiven > 1){//If 2 angles given and one sidelength.
  solveAngles()
}


recheckFields()
if(document.getElementById("bcLengthField").value == ""){//Don't have BC
  console.log("Don't have BC")
  if(document.getElementById("abLengthField").value != ""){//Have AB
    document.getElementById("bcLengthField").value = Math.tan(aAngle) * abLength;//aAngle already converted from recheckFields()
  }
  else{//Have AC
    console.log("Have AC")
    document.getElementById("bcLengthField").value = Math.sin(aAngle) * acLength;
  }
}
else if(document.getElementById("abLengthField").value == ""){//Don't have AB
  console.log("Dont have AB")

  if(document.getElementById("bcLengthField").value != ""){//Have BC
    document.getElementById("abLengthField").value = bcLength / Math.tan(aAngle);
  }
  else{//Have AC
    document.getElementById("abLengthField").value = Math.cos(aAngle) * acLength;
  }
}

solveSides()










  //document.getElementById("bcLengthField").value = Math.round(Math.sin(aAngle) * acLength)
  function solveAngles(){
    let arrOfLengthValues = [];//Result is [AB, AC, BC]
    for(field of arrOfLengthFields){
      arrOfLengthValues.push(document.getElementById(field).value)
    }
    if(document.getElementById("aAngleField").value == ""){
      console.log("Solving A angle")
      document.getElementById("aAngleField").value = 180 - (parseFloat(document.getElementById("bAngleField").value) + parseFloat(document.getElementById("cAngleField").value))//Convert to degrees
    }
    else{
      console.log("Solving C angle")
      document.getElementById("cAngleField").value =  180 - (parseFloat(document.getElementById("bAngleField").value) + parseFloat(document.getElementById("aAngleField").value))
    }
    //All angles solved

  }
  function solveSides(){
    recheckFields();//Refresh variables
    if(document.getElementById("acLengthField").value == ""){//hypotenuse not given.
      document.getElementById("acLengthField").value = Math.sqrt( Math.pow(abLength, 2) + Math.pow(bcLength, 2) );
    }
    else{//If hypotenuse is given.
      if(document.getElementById("abLengthField").value == ""){//Executed if Hyp and BC given.
        console.log("ab")
        document.getElementById("abLengthField").value = Math.sqrt(Math.pow(acLength, 2) - Math.pow(bcLength, 2));//Solve missing angle
        console.log(parseFloat(document.getElementById("bcLengthField").value))
        console.log(bcLength)
      }
      else{//Executed if AB given
        console.log("BC")
        document.getElementById("bcLengthField").value = Math.sqrt( Math.pow(acLength, 2) - Math.pow(abLength, 2) );//Solve missing angle
      }
    }
  }
}

function degToRad(deg){
  return(deg * (Math.PI / 180))
}

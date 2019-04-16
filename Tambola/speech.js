var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var recognition = new SpeechRecognition();
var synth = window.speechSynthesis;
recognition.continuous = true;
recognition.lang = 'en-US'
recognition.interimResults = false;
recognition.maxAlternatives = 1;
document.getElementById("button").onclick = () => {
  recognition.start();
 
  console.log("Speech recognition started...");

  //recognition.continous = true;
}
recognition.onresult = (event) => {//No more iterimResult. So we will only fire this function when FINAL result is gotten.


  var transcript = event.results[event.resultIndex][0].transcript;//Gets the last result (most recent)
  console.log("I HEARD: " + transcript)
  var numArr = (transcript.split(' '))
  var number = parseInt(transcript.replace(/[^\d]/g, ''));//Get rid of all letters and NON-NUMBERS and convert to integer
  if((number < 91 && number > 0)){//Make sure number is valid in tambola
  //  console.log(number)
    speak(number);
  }
  else{
    if((number.toString().length == 4 || number.toString().length == 3) && !isNaN(number)){
      stringNum = number.toString()
      //console.log(number)
      stringNum = stringNum.substring(stringNum.length - 2, stringNum.length)
      //console.log(stringNum)
      speak(parseInt(stringNum));
    }
    switch(numArr[numArr.length - 1]){
      case("for"):
        speak(4);
        break;
      case("one"):
        speak(1);
        break;
    }
  }

}
function speak(word){

  addToTable(word);
  var utterance = new SpeechSynthesisUtterance(word);//Make the utterance object. Make it say the number
  utterance.lang = 'hi-IN';//In hindi
  utterance.rate = 0.7;//Slower
  synth.speak(utterance);//Talk
  var counter = 0;
  var repeatInterval = setInterval(() => {
      synth.speak(utterance)
      counter++;
      if(counter == 1){
        clearInterval(repeatInterval);
        counter = 0;
      }

  }, 2300);
}





/*
var finalTranscript = "";
recognition.onresult = (event) => {
  var iTranscript = "";//The grey text to show when confidence level is not high enough.
  for(var i = event.resultIndex; i < event.results.length; i++){//resultIndex is the index of the result JUST gotten
    var transcript = event.results[i][0].transcript;//Transcript is the key in the object for the string
    if(/[\d]/g.test(transcript) && event.results[i].isFinal){//Is final means the thing is not a iterimResult anymore but a real result
      console.log(transcript.split(' ').pop())//If number is found, convert string into array and get last 'word' or the number that wos just spoken.
      document.getElementById("header").innerHTML = "";//Clear the canvas
      finalTranscript = "";//Clear
      transcript = "";//clear what WOULD of been added ('clear all')
    }
    transcript.replace("\n", "<br>");//IDEK
    if (event.results[i].isFinal){//If the transcript is fully final add to the header
      finalTranscript += transcript
    }
    else{
      iTranscript += transcript;//Other wise add as grey text
    }
  }

  document.getElementById("header").innerHTML = finalTranscript + '<span style="color: #999;">' + iTranscript + '</span>';
//  console.log(iTranscript)
  //recognition.start();
}*/

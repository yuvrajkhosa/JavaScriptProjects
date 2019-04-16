var input = document.getElementById("inputBox");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  console.log("enter")
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("submitButton").click();
  }
});
var textField = document.getElementById("inputBox");
//const apiKey = '895e758a134696bde1f2f7d53736ca00';
const apiKey = '41ff355681b5a0c0590c2c6de7b992f7';
var sentenceArray = [];
var convertedWords = [];

async function changeWord(){//Wait for the array of converted words to come back because some take longer than others and we need them to be in the same order as before.
  sentenceArray = [];
  convertedWords = [];
  sentenceSplit(textField.value.toLowerCase());
  console.log(sentenceArray)

  var promise = new Promise((resolve, reject) => {
    console.log("Function")
    putInArray(sentenceArray)
    function putInArray(arr){

      if (arr.length == 0){
        resolve(convertedWords);
        return(convertedWords);//Recursion end.
        //return(Promise.resolve(convertedWords));
      }
      getPromise(arr[arr.length - 1])
        .then(result => {
          convertedWords.push(pickRandomWord(result));
          arr.pop()
          putInArray(arr);
        })
        .catch(err => {//Not a real words
          convertedWords.push(arr[arr.length - 1]);
          arr.pop()
          putInArray(arr)
        })
    }
  })
  var result = await promise;
  var finalSentence = "";
  for (i = 0; i < result.length; i++){
    //console.log(result[result.length - i - 1])
    finalSentence += result[result.length - i - 1] + " ";
  }
  console.log(finalSentence)
  document.getElementById("heading2").innerHTML = finalSentence;
}

function pickRandomWord(wordObject){
  var typeOfWord = Object.keys(wordObject);
  typeOfWord = Math.floor(Math.random() * typeOfWord.length);
  typeOfWord = Object.keys(wordObject)[typeOfWord];
  lengthOfSyns = Math.floor(Math.random() * (wordObject[typeOfWord]["syn"].length));
  return(wordObject[typeOfWord]["syn"][lengthOfSyns])
//  console.log(wordObject[Object.keys(wordObject)[typeOfWord]]);
}
//Cooler Way.
async function getPromise(word){
  const apiURL = (`http://words.bighugelabs.com/api/2/${apiKey}/${word}/json`);
  const result = await fetch(apiURL);//Will not exceed this line until fetch has retrieven promise.
  if(result.status != 200){
    return(Promise.reject("fakeWord"));
  }
  return(result.json());
}



/*function getPromise(word){
  const apiURL = (`http://words.bighugelabs.com/api/2/${apiKey}/${word}/json`);
  return(
    fetch(apiURL).then((response) =>{
      if (response.status != 200){//To make sure the API gave back a good response.
        console.log("Error in response!");
      }
      return(response.json())
    })
   .catch(err => console.log(err))
  )
}*/

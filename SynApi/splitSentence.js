//Completly useless. Use join and trim, to clear whitespace.
var endSub;

function sentenceSplit(s){
  var i = 0;

  if(s == ""){
    //sentenceArray.push(s);
    return(sentenceArray);
  }

  while(s.charAt(i) == ' '){
    i++;
  }
  endSub = i;

  while(endSub < s.length){
    if(s.charAt(endSub) == ' '){
      sentenceArray.push(s.substring(i, endSub));
      break;
    }
    if(endSub == s.length - 1){
      sentenceArray.push(s.substring(i, endSub + 1));
      return(sentenceArray);
    }
    endSub++;
  }
  s = s.substring(endSub, s.length);
  return(sentenceSplit(s));
}

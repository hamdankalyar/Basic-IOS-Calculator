//practice code 
//the total that is happening on screen or previous one 
let runningTotal = 0;
//buffer is that which is actually on screen 
//string is because there will be string on screen 
let buffer = "0";
//what is previous operator that is selected
let previousOperator;

let screen = document.querySelector(".screen");
function buttonClick(value) {
    if (isNaN(value)) {
        //not a number
        handleSymbol(value);
    }
    else{
        //is a number 
        handleNumber(value);
    }
    screen.innerText=buffer;
}
function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}
function handleSymbol(symbol){
   
  switch (symbol) {
    case 'C':
        buffer="0";
        runningTotal=0;
        break;
    case "←":
        buffer=buffer.toString();
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '=':
        handleMath();
        buffer=runningTotal;
        runningTotal=0;
        break;
    case '+':
    case '-':
    case '÷':
    case '×':   
    console.log("buffer , symbol , runningTotal ",buffer,symbol,runningTotal);
       previousOperator=symbol;
       runningTotal = parseInt(buffer);
       buffer = "0";
        break;
  }
    
}
function handleMath(){

    switch (previousOperator) {
        case '+':
            runningTotal += parseInt(buffer);
            break;
        case '-':
            console.log("runningTotal buffer operator",runningTotal,buffer,previousOperator);
            runningTotal -= parseInt(buffer);
            break;
        case '×':
            runningTotal *= parseInt(buffer);
            break;
        case '÷':
            runningTotal /= parseInt(buffer);
            break;
        default:
            break;
    }
}
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}
init();





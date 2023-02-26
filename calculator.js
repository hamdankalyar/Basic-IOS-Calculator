//actual code 
let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    console.log("6 - symbol called in buttonClick");
    handleSymbol(value);
  } else {
    console.log("2 - number of button click");
    handleNumber(value);
  }
  console.log("4 - rerender function in buttonClick calling");
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    console.log("3 - buffer == 0 is called");
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
    console.log(`9 - in handleMath() buffer = ${buffer} runningTotal = ${runningTotal}`);
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    console.log("10 - in handleMath for runningTotal == 0");
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  console.log("11 - out of if else of handleMath")
  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
    console.log("10 - in the flushOperation()");
  if (previousOperator === "+") {
    console.log("11 - previous symbol is + so in + if statement");
    console.log("running total and buffer",runningTotal,buffer);
    runningTotal += intBuffer;
    console.log("runningtotal = ",runningTotal);
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
    console.log("7 - here in handleSymbol()");
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
        console.log("8 - in handleSymbol case = ");
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      console.log("9 - flushOperation calling and giving them buffer = ",buffer);
      flushOperation(parseInt(buffer));
      console.log("12 - out of flushOperation");
      previousOperator = null;
      console.log("buffer and runningTotal",buffer,runningTotal);
      buffer = +runningTotal;
      console.log("buffer",buffer);
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
    console.log("8 - in switch and symbol is ",value);
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
  console.log("5 - rerender fucntion");
}

function init() {
    console.log("1 - init");
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

init();
"use strict";

const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const sendNumVal = (num) => {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = num;
    awaitingNextValue = false;
  } else {
    // If cur display val is 0, replace it, if not concat number
    const displayVal = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayVal === "0" ? num : displayVal + num;
  }
};

const addDecimal = () => {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;

  // If no decimal, add one
  calculatorDisplay.textContent = calculatorDisplay.textContent.includes(".")
    ? calculatorDisplay.textContent
    : calculatorDisplay.textContent + ".";
};

// Calculate first and second caludes depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Assign firstValue if no value

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumVal(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset all values, display
const resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = 0;
};

// Event Listener
clearBtn.addEventListener("click", resetAll);

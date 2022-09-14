"use strict";

const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

const sendNumVal = (num) => {
  // If cur display val is 0, replace it, if not concat number
  const displayVal = calculatorDisplay.textContent;
  calculatorDisplay.textContent = displayVal === "0" ? num : displayVal + num;
};

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumVal(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendNumVal(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => sendNumVal(inputBtn.value));
  }
});

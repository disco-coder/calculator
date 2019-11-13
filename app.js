// Variables for data
let displayValue = document.querySelector("#display-text");
let currentValue = "";
let currentOperator = "";

// Stores bool whether equals was pressed, helper for clearing display
let pressedEquals;

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => {
        
        // Operator onclick inset shadow
        operatorButtons.forEach((operator) => operator.style.boxShadow = "");
        operator.style.boxShadow = "inset 0 0 0 2px #000";

        if (currentOperator != "" && currentValue != "") {
            displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
            currentValue = "";
        }
        
        if (displayValue.textContent) currentOperator = `${operator.id}`;
    });
})

// Decimal button
let decimalButton = document.querySelector(".point");
decimalButton.addEventListener("click", () => {
    if (displayValue.textContent.slice(-1) != ".") {
        displayValue.textContent = displayValue.textContent + ".";
    }
})

// Plus-minus button
let plusMinusButton = document.querySelector(".plus-minus");
plusMinusButton.addEventListener("click", () => displayValue.textContent = -displayValue.textContent);

// Clickable number buttons
let numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (displayValue.textContent == "" && number.textContent == 0) {
            return;
        }

        if (currentOperator != "" && currentValue == "") {
            currentValue = displayValue.textContent;
            displayValue.textContent = "";
        }
        if (pressedEquals) {
            displayValue.textContent = "";
            pressedEquals = false;
        }
        displayValue.textContent = `${displayValue.textContent + number.textContent}`;
    });
});

// Equals button
let equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
    if (currentValue != "") {
        displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
        currentValue = "";
        currentOperator = "";
        pressedEquals = true;
    }
    operatorButtons.forEach((operator) => operator.style.boxShadow = "");
})

// Clear display
let clearButton = document.querySelector(".clear")
clearButton.addEventListener("click", () => {
    operatorButtons.forEach((operator) => operator.style.boxShadow = "");
    displayValue.textContent = "";
    currentOperator = "";
    currentValue = "";
});

// Percent function
let percentButton = document.querySelector(".percent");
percentButton.addEventListener("click", () => displayValue.textContent = `${parseInt(displayValue.textContent) * 0.01}`);

// Basic math operators
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate(operator, a, b) {
    if (operator === "add") return Math.round(add(a, b) * 1000) / 1000;
    if (operator === "subtract") return Math.round(subtract(a, b) * 1000) / 1000;
    if (operator === "multiply") return Math.round(multiply(a, b) * 1000) / 1000;
    if (operator === "divide") return Math.round(divide(a, b) * 1000) / 1000;
}
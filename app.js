// Variables for data
let displayValue = document.querySelector("#display-text");
let currentValue = "";
let currentOperator = "";
let pressedEquals;

// Operator buttons
const operatorButtons = document.querySelectorAll(".operator");
selectOperator();

// Decimal button
const decimalButton = document.querySelector(".point");
makeDecimal();

// Plus-minus button
const plusMinusButton = document.querySelector(".plus-minus");
plusMinusButton.addEventListener("click", () => displayValue.textContent = -displayValue.textContent);

// Clickable number buttons
const numbers = document.querySelectorAll(".number");
displayNumber();

// Equals button
const equalsButton = document.querySelector(".equals");
getResult();

// Clear display
const clearButton = document.querySelector(".clear")
clearDisplay();

// Percent function
const percentButton = document.querySelector(".percent");
getPercentage();

function operate(operator, a, b) {
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => a / b;
    if (operator === "add") return Math.round(add(a, b) * 1000) / 1000;
    if (operator === "subtract") return Math.round(subtract(a, b) * 1000) / 1000;
    if (operator === "multiply") return Math.round(multiply(a, b) * 1000) / 1000;
    if (operator === "divide") return Math.round(divide(a, b) * 1000) / 1000;
}

function removeBoxShadow() {
    operatorButtons.forEach((operator) => operator.style.boxShadow = "");
}

function getPercentage() {
    percentButton.addEventListener("click", () => displayValue.textContent = `${parseInt(displayValue.textContent) * 0.01}`);
}

function clearDisplay() {
    clearButton.addEventListener("click", () => {
        removeBoxShadow();
        displayValue.textContent = "";
        currentOperator = "";
        currentValue = "";
    });
}

function getResult() {
    equalsButton.addEventListener("click", () => {
        if (currentValue != "") {
            displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
            currentValue = "";
            currentOperator = "";
            pressedEquals = true;
        }
        removeBoxShadow();
    })
}

function displayNumber() {
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
}

function selectOperator() {
    operatorButtons.forEach((operator) => {
        operator.addEventListener("click", () => {
            
            // Operator onclick inset shadow
            removeBoxShadow();
            operator.style.boxShadow = "inset 0 0 0 2px #000";
    
            if (currentOperator != "" && currentValue != "") {
                displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
                currentValue = "";
            }
            
            if (displayValue.textContent) currentOperator = `${operator.id}`;
        });
    })
}

function makeDecimal() {
    decimalButton.addEventListener("click", () => {
        if (displayValue.textContent.slice(-1) != ".") {
            displayValue.textContent = displayValue.textContent + ".";
        }
    })
}
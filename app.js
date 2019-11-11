
// Basic math operators
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;


function operate(operator, a, b) {
    if (operator === "add") return add(a, b);
    if (operator === "subtract") return subtract(a, b);
    if (operator === "multiply") return multiply(a, b);
    if (operator === "divide") return divide(a, b);
}
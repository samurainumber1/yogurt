"use strict";

const currentDisplay = document.querySelector("#current");
const previousDisplay = document.querySelector("#previous");
const calculatorStatus = document.querySelector(".calculator-status");
const keypad = document.querySelector("#keypad");
const angleModeButton = document.querySelector("#angleMode");
const themePicker = document.querySelector("#themePicker");
const themeColor = document.querySelector('meta[name="theme-color"]');
let expression = "";
let angleMode = "DEG";
let justCalculated = false;
let unlockSequence = "";

function recordUnlockKey(value) {
    if (!/^\d$/.test(value)) {
        unlockSequence = "";
        return;
    }

    unlockSequence = `${unlockSequence}${value}`.slice(-4);
    if (unlockSequence === "2323") {
        sessionStorage.setItem("arcadeUnlocked", "1");
        window.location.assign("/scientific-calculator");
    }
}

function setTheme(color, rgb) {
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-rgb", rgb);
    themeColor.setAttribute("content", color);
    localStorage.setItem("calculatorTheme", color);
}

const savedTheme = localStorage.getItem("calculatorTheme");
if (savedTheme) {
    const savedOption = [...themePicker.options].find(option => option.value === savedTheme);
    if (savedOption) {
        themePicker.value = savedTheme;
        setTheme(savedOption.value, savedOption.dataset.rgb);
    }
}

themePicker.addEventListener("change", () => {
    const selected = themePicker.selectedOptions[0];
    setTheme(selected.value, selected.dataset.rgb);
});

function updateDisplay() {
    currentDisplay.textContent = expression || "0";
}

function append(value) {
    recordUnlockKey(value);
    if (justCalculated && (/^[0-9.]$/.test(value) || value === "π" || value === "(")) {
        expression = "";
        previousDisplay.textContent = "";
    }
    if (justCalculated && /[+−×÷]/.test(value)) justCalculated = false;
    else if (justCalculated) justCalculated = false;

    if (value === "." && /(?:^|[+−×÷(])(?:\d*\.\d*)$/.test(expression)) return;
    if (value === "." && (expression === "" || /[+−×÷(]$/.test(expression))) value = "0.";
    expression += value;
    calculatorStatus.lastChild.textContent = " EDITING";
    updateDisplay();
}

function clearCalculator() {
    unlockSequence = "";
    expression = "";
    justCalculated = false;
    previousDisplay.textContent = "";
    calculatorStatus.lastChild.textContent = " READY";
    updateDisplay();
}

function deleteLast() {
    unlockSequence = "";
    expression = expression.slice(0, -1);
    justCalculated = false;
    updateDisplay();
}

function evaluateExpression(source) {
    const normalized = source.replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    const tokens = normalized.match(/(?:\d+(?:\.\d*)?|\.\d+)|π|[()+\-*/^]/g) || [];
    if (tokens.join("") !== normalized || tokens.length === 0) throw new Error("Invalid expression");

    let position = 0;
    const peek = () => tokens[position];
    const take = () => tokens[position++];

    function parsePrimary() {
        const token = take();
        if (token === "(") {
            const value = parseSum();
            if (take() !== ")") throw new Error("Missing closing parenthesis");
            return value;
        }
        if (token === "π") return Math.PI;
        if (token && /^(\d+(?:\.\d*)?|\.\d+)$/.test(token)) return Number(token);
        throw new Error("Expected a number");
    }

    function parsePower() {
        const value = parsePrimary();
        if (peek() === "^") {
            take();
            return value ** parseUnary();
        }
        return value;
    }

    function parseUnary() {
        if (peek() === "+") {
            take();
            return parseUnary();
        }
        if (peek() === "-") {
            take();
            return -parseUnary();
        }
        return parsePower();
    }

    function parseProduct() {
        let value = parseUnary();
        while (peek() === "*" || peek() === "/") {
            const operator = take();
            const right = parseUnary();
            value = operator === "*" ? value * right : value / right;
        }
        return value;
    }

    function parseSum() {
        let value = parseProduct();
        while (peek() === "+" || peek() === "-") {
            const operator = take();
            const right = parseProduct();
            value = operator === "+" ? value + right : value - right;
        }
        return value;
    }

    const result = parseSum();
    if (position !== tokens.length || !Number.isFinite(result)) throw new Error("Invalid result");
    return result;
}

function showError() {
    expression = "";
    currentDisplay.textContent = "Error";
    calculatorStatus.lastChild.textContent = " ERROR";
    justCalculated = true;
}

function calculate() {
    if (!expression) return;
    try {
        const result = evaluateExpression(expression);
        previousDisplay.textContent = `${expression} =`;
        expression = String(result);
        currentDisplay.textContent = expression;
        calculatorStatus.lastChild.textContent = " RESULT";
        justCalculated = true;
    } catch {
        showError();
    }
}

function applyScientificFunction(name) {
    if (!expression) return;
    try {
        let value = evaluateExpression(expression);
        const radians = angleMode === "DEG" ? value * Math.PI / 180 : value;
        switch (name) {
            case "sin": value = Math.sin(radians); break;
            case "cos": value = Math.cos(radians); break;
            case "tan": value = Math.tan(radians); break;
            case "sqrt": value = Math.sqrt(value); break;
            case "log": value = Math.log10(value); break;
            case "ln": value = Math.log(value); break;
            case "square": value **= 2; break;
            default: throw new Error("Unknown function");
        }
        if (!Number.isFinite(value)) throw new Error("Invalid result");
        previousDisplay.textContent = `${name}(${expression})`;
        expression = String(value);
        currentDisplay.textContent = expression;
        calculatorStatus.lastChild.textContent = " RESULT";
        justCalculated = true;
    } catch {
        showError();
    }
}

keypad.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.append !== undefined) append(button.dataset.append);
    if (button.dataset.action === "clear") clearCalculator();
    if (button.dataset.action === "delete") deleteLast();
    if (button.dataset.action === "calculate") calculate();
    if (button.dataset.scientific) applyScientificFunction(button.dataset.scientific);
});

angleModeButton.addEventListener("click", () => {
    angleMode = angleMode === "DEG" ? "RAD" : "DEG";
    angleModeButton.textContent = angleMode;
});

document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (/^[0-9.]$/.test(event.key)) {
        event.preventDefault();
        append(event.key);
    } else if (["+", "-", "*", "/", "(", ")"].includes(event.key)) {
        event.preventDefault();
        append(event.key === "-" ? "−" : event.key === "*" ? "×" : event.key === "/" ? "÷" : event.key);
    } else if (event.key === "Backspace") {
        event.preventDefault();
        deleteLast();
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Escape") {
        clearCalculator();
    }
});

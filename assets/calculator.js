"use strict";

const currentDisplay = document.querySelector("#current");
const previousDisplay = document.querySelector("#previous");
const calculatorStatus = document.querySelector(".calculator-status");
const calculatorPanel = document.querySelector(".calculator");
const angleModeButton = document.querySelector("#angleMode");
const expandCalculatorButton = document.querySelector("#expandCalculator");
const advancedKeypad = document.querySelector("#advancedKeypad");
const hero = document.querySelector(".hero");
sessionStorage.removeItem("arcadeUnlocked");
let expression = "";
let angleMode = "DEG";
let lastAnswer = null;
let justCalculated = false;
let unlockSequence = "";
let unlockStarted = false;

function openAdminLogin() {
    if (unlockStarted) return;
    unlockStarted = true;
    window.location.assign("/admin/login");
}

function unlockCatalog() {
    if (unlockStarted) return;
    unlockStarted = true;
    sessionStorage.setItem("arcadeUnlocked", "1");
    sessionStorage.setItem("arcadeEntryStartedAt", String(Date.now()));
    window.location.assign("/scientific-calculator");
}

function recordUnlockKey(value) {
    if (!/^\d$/.test(value)) {
        unlockSequence = "";
        return false;
    }

    unlockSequence = `${unlockSequence}${value}`.slice(-10);
    if (unlockSequence === "6942024421") {
        openAdminLogin();
        return true;
    }
    if (unlockSequence === "2323") {
        unlockCatalog();
        return true;
    }
    return false;
}

function updateDisplay() {
    currentDisplay.textContent = expression || "0";
}

function append(value) {
    if (unlockStarted || recordUnlockKey(value)) return;
    if (justCalculated && (/^[0-9.]$/.test(value) || value === "π" || value === "e" || value === "ANS" || value === "(")) {
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
    const tokens = normalized.match(/ANS|(?:\d+(?:\.\d*)?|\.\d+)|π|e|[()+\-*/^]/g) || [];
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
        if (token === "e") return Math.E;
        if (token === "ANS") {
            if (lastAnswer === null) throw new Error("No previous answer");
            return lastAnswer;
        }
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

function approximateFraction(value) {
    if (!Number.isFinite(value) || Math.abs(value) > 1e12) throw new Error("Fraction conversion is limited to results up to 1 trillion");

    const magnitude = Math.abs(value);
    let remaining = magnitude;
    let previousNumerator = 0n;
    let numerator = 1n;
    let previousDenominator = 1n;
    let denominator = 0n;

    for (let iteration = 0; iteration < 32; iteration += 1) {
        const whole = Math.floor(remaining);
        if (!Number.isSafeInteger(whole)) break;
        const coefficient = BigInt(whole);
        const nextNumerator = coefficient * numerator + previousNumerator;
        const nextDenominator = coefficient * denominator + previousDenominator;
        if (nextDenominator > 10000n) break;

        previousNumerator = numerator;
        numerator = nextNumerator;
        previousDenominator = denominator;
        denominator = nextDenominator;

        const approximation = Number(numerator) / Number(denominator);
        if (Math.abs(approximation - magnitude) <= Number.EPSILON * Math.max(1, magnitude) * 4) break;

        const fractionalPart = remaining - whole;
        if (fractionalPart < Number.EPSILON) break;
        remaining = 1 / fractionalPart;
    }

    return [value < 0 ? -numerator : numerator, denominator];
}

function showFraction(value) {
    const source = expression;
    const [numerator, denominator] = approximateFraction(value);
    const approximation = Number(numerator) / Number(denominator);
    const isApproximate = Math.abs(approximation - value) > Number.EPSILON * Math.max(1, Math.abs(value)) * 4;

    previousDisplay.textContent = `${source} =`;
    currentDisplay.textContent = `${isApproximate ? "≈ " : ""}${numerator}/${denominator}`;
    expression = String(value);
    lastAnswer = value;
    calculatorStatus.lastChild.textContent = " RESULT";
    justCalculated = true;
}

function formatRecurringDecimal(numerator, denominator) {
    if (denominator === 0n) throw new Error("A fraction cannot have a zero denominator");

    const negative = (numerator < 0n) !== (denominator < 0n);
    let top = numerator < 0n ? -numerator : numerator;
    const bottom = denominator < 0n ? -denominator : denominator;
    const whole = top / bottom;
    let remainder = top % bottom;
    if (remainder === 0n) return `${negative ? "−" : ""}${whole}`;

    const positions = new Map();
    let digits = "";
    while (remainder !== 0n && !positions.has(remainder) && digits.length < 64) {
        positions.set(remainder, digits.length);
        remainder *= 10n;
        digits += String(remainder / bottom);
        remainder %= bottom;
    }

    const prefix = `${negative ? "−" : ""}${whole}.`;
    if (remainder === 0n) return `${prefix}${digits}`;

    const repeatStart = positions.get(remainder);
    if (repeatStart !== undefined) {
        const nonRepeating = digits.slice(0, repeatStart);
        const repeating = Array.from(digits.slice(repeatStart), digit => `${digit}\u0305`).join("");
        return `${prefix}${nonRepeating}${repeating}`;
    }
    return `≈ ${prefix}${digits}…`;
}

function showRecurringDecimal() {
    const source = expression;
    const normalized = source.replace(/−/g, "-");
    const match = normalized.match(/^([+-]?\d+)\s*(?:÷|\/)\s*([+-]?\d+)$/);
    if (!match) throw new Error("Enter a simple fraction such as 1 ÷ 3 first");

    const numerator = BigInt(match[1]);
    const denominator = BigInt(match[2]);
    const value = evaluateExpression(source);
    previousDisplay.textContent = `${source} =`;
    currentDisplay.textContent = formatRecurringDecimal(numerator, denominator);
    lastAnswer = value;
    calculatorStatus.lastChild.textContent = " RESULT";
    justCalculated = true;
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
        lastAnswer = result;
        calculatorStatus.lastChild.textContent = " RESULT";
        justCalculated = true;
    } catch {
        showError();
    }
}

function applyScientificFunction(name) {
    if (!expression) return;
    try {
        if (name === "recurring") {
            showRecurringDecimal();
            return;
        }
        let value = evaluateExpression(expression);
        if (name === "fraction") {
            showFraction(value);
            return;
        }
        const radians = angleMode === "DEG" ? value * Math.PI / 180 : value;
        switch (name) {
            case "sin": value = Math.sin(radians); break;
            case "cos": value = Math.cos(radians); break;
            case "tan": value = Math.tan(radians); break;
            case "sqrt": value = Math.sqrt(value); break;
            case "cbrt": value = Math.cbrt(value); break;
            case "log": value = Math.log10(value); break;
            case "ln": value = Math.log(value); break;
            case "square": value **= 2; break;
            case "reciprocal": value = 1 / value; break;
            case "absolute": value = Math.abs(value); break;
            case "percent": value /= 100; break;
            case "tenpower": value = 10 ** value; break;
            case "factorial": {
                if (!Number.isInteger(value) || value < 0 || value > 170) throw new Error("Factorial requires a whole number from 0 to 170");
                let result = 1;
                for (let factor = 2; factor <= value; factor += 1) result *= factor;
                value = result;
                break;
            }
            default: throw new Error("Unknown function");
        }
        if (!Number.isFinite(value)) throw new Error("Invalid result");
        previousDisplay.textContent = `${name}(${expression})`;
        expression = String(value);
        currentDisplay.textContent = expression;
        lastAnswer = value;
        calculatorStatus.lastChild.textContent = " RESULT";
        justCalculated = true;
    } catch {
        showError();
    }
}

calculatorPanel.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button === expandCalculatorButton) {
        const expanded = expandCalculatorButton.getAttribute("aria-expanded") !== "true";
        expandCalculatorButton.setAttribute("aria-expanded", String(expanded));
        expandCalculatorButton.setAttribute("aria-label", expanded ? "Collapse calculator and hide advanced functions" : "Expand calculator and show more functions");
        expandCalculatorButton.textContent = expanded ? "Less" : "More";
        advancedKeypad.hidden = !expanded;
        hero.classList.toggle("calculator-open", expanded);
        return;
    }
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
    if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (/^[0-9.]$/.test(event.key)) {
        event.preventDefault();
        append(event.key);
    } else if (["+", "-", "*", "/", "^", "(", ")"].includes(event.key)) {
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

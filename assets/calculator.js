"use strict";

const currentDisplay = document.querySelector("#current");
const previousDisplay = document.querySelector("#previous");
const calculatorStatus = document.querySelector(".calculator-status");
const keypad = document.querySelector("#keypad");
const angleModeButton = document.querySelector("#angleMode");
const themePicker = document.querySelector("#themePalette");
const themeTrigger = document.querySelector("#themeTrigger");
const themeColor = document.querySelector('meta[name="theme-color"]');
sessionStorage.removeItem("arcadeUnlocked");
let expression = "";
let angleMode = "DEG";
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
    const transition = document.querySelector("#unlockTransition");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
        const display = document.querySelector("#current");
        display.textContent = "2323";
        const bounds = display.getBoundingClientRect();
        const zoom = document.createElement("span");
        zoom.className = "unlock-zoom-value";
        zoom.textContent = "2323";
        zoom.style.left = `${bounds.left}px`;
        zoom.style.top = `${bounds.top}px`;
        zoom.style.width = `${bounds.width}px`;
        zoom.style.height = `${bounds.height}px`;
        zoom.style.fontSize = getComputedStyle(display).fontSize;
        transition.append(zoom);
        transition.classList.add("is-zooming");
        const dx = innerWidth / 2 - (bounds.left + bounds.width / 2);
        const dy = innerHeight / 2 - (bounds.top + bounds.height / 2);
        zoom.animate([
            { offset: 0, transform: "translate3d(0, 0, 0) scale(1)", opacity: 1, filter: "blur(0)" },
            { offset: .16, transform: "translate3d(0, 0, 0) scale(1.12)", opacity: 1, filter: "blur(0)" },
            { offset: .43, transform: `translate3d(${dx * .35}px, ${dy * .35}px, 0) scale(2.2)`, opacity: 1, filter: "blur(0)" },
            { offset: .76, transform: `translate3d(${dx}px, ${dy}px, 0) scale(9)`, opacity: .95, filter: "blur(1px)" },
            { offset: 1, transform: `translate3d(${dx}px, ${dy}px, 0) scale(34)`, opacity: 0, filter: "blur(10px)" }
        ], { duration: 3050, easing: "cubic-bezier(.58,0,.92,.42)", fill: "forwards" });
    }
    transition.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-unlocking");
    const transitionTime = reducedMotion ? 220 : 3300;
    window.setTimeout(() => window.location.assign("/scientific-calculator"), transitionTime);
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

function setTheme(themeId) {
    const preset = window.themePresets[themeId];
    if (!preset) return;
    document.documentElement.style.setProperty("--accent", preset.accent);
    document.documentElement.style.setProperty("--accent-rgb", preset.rgb);
    document.documentElement.style.setProperty("--accent-gradient", preset.gradient);
    themeColor.setAttribute("content", preset.accent);
    localStorage.setItem("calculatorTheme", themeId);
    themePicker.querySelectorAll(".theme-swatch").forEach(swatch => {
        swatch.setAttribute("aria-pressed", String(swatch.dataset.theme === themeId));
    });
}

setTheme(localStorage.getItem("calculatorTheme") || "default");

function toggleThemePicker(open) {
    const shouldOpen = open ?? themePicker.hidden;
    themePicker.hidden = !shouldOpen;
    themeTrigger.setAttribute("aria-expanded", String(shouldOpen));
    if (shouldOpen) themePicker.querySelector('[aria-pressed="true"]').focus();
}

themeTrigger.addEventListener("click", () => toggleThemePicker());
themePicker.addEventListener("click", event => {
    const swatch = event.target.closest(".theme-swatch");
    if (!swatch) return;
    setTheme(swatch.dataset.theme);
    toggleThemePicker(false);
    themeTrigger.focus();
});
document.addEventListener("click", event => {
    if (!event.target.closest(".theme-picker")) toggleThemePicker(false);
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !themePicker.hidden) {
        toggleThemePicker(false);
        themeTrigger.focus();
    }
});

function updateDisplay() {
    currentDisplay.textContent = expression || "0";
}

function append(value) {
    if (unlockStarted || recordUnlockKey(value)) return;
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

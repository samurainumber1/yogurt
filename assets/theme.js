"use strict";

const themeColors = {
    "#9500ff": "149, 0, 255",
    "#ff3b4f": "255, 59, 79",
    "#ff8a00": "255, 138, 0",
    "#ffd43b": "255, 212, 59",
    "#00c781": "0, 199, 129",
    "#1687ff": "22, 135, 255",
    "#7136f2": "113, 54, 242"
};
const persistedTheme = localStorage.getItem("calculatorTheme");
const activeTheme = themeColors[persistedTheme] ? persistedTheme : "#9500ff";

document.documentElement.style.setProperty("--accent", activeTheme);
document.documentElement.style.setProperty("--accent-rgb", themeColors[activeTheme]);
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", activeTheme);

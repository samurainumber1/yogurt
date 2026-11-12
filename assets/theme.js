"use strict";

const themeColors = {
    "#9500ff": "149, 0, 255",
    "#1687ff": "22, 135, 255",
    "#00b8d9": "0, 184, 217",
    "#00c781": "0, 199, 129",
    "#ff8a00": "255, 138, 0",
    "#ff3d71": "255, 61, 113"
};
const persistedTheme = localStorage.getItem("calculatorTheme");
const activeTheme = themeColors[persistedTheme] ? persistedTheme : "#9500ff";

document.documentElement.style.setProperty("--accent", activeTheme);
document.documentElement.style.setProperty("--accent-rgb", themeColors[activeTheme]);
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", activeTheme);

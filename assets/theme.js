"use strict";

window.themePresets = {
    default: { accent: "#9500ff", rgb: "149, 0, 255", gradient: "linear-gradient(135deg, #9500ff, #5b00d6)" },
    red: { accent: "#ff3b4f", rgb: "255, 59, 79", gradient: "linear-gradient(135deg, #ff3b4f, #a60038)" },
    orange: { accent: "#ff8a00", rgb: "255, 138, 0", gradient: "linear-gradient(135deg, #ff8a00, #ff3d3d)" },
    yellow: { accent: "#ffd43b", rgb: "255, 212, 59", gradient: "linear-gradient(135deg, #ffd43b, #ff8a00)" },
    lime: { accent: "#b8e629", rgb: "184, 230, 41", gradient: "linear-gradient(135deg, #d6f542, #69c92c)" },
    green: { accent: "#00c781", rgb: "0, 199, 129", gradient: "linear-gradient(135deg, #00e676, #00a878)" },
    mint: { accent: "#35e5ae", rgb: "53, 229, 174", gradient: "linear-gradient(135deg, #65f5c2, #00a88a)" },
    cyan: { accent: "#00d4e8", rgb: "0, 212, 232", gradient: "linear-gradient(135deg, #4cf4ed, #009bd8)" },
    blue: { accent: "#1687ff", rgb: "22, 135, 255", gradient: "linear-gradient(135deg, #37c8ff, #2456ff)" },
    ice: { accent: "#67bfff", rgb: "103, 191, 255", gradient: "linear-gradient(135deg, #a8f4ff, #4381ff)" },
    indigo: { accent: "#4b5bff", rgb: "75, 91, 255", gradient: "linear-gradient(135deg, #7a8cff, #4230cf)" },
    purple: { accent: "#7136f2", rgb: "113, 54, 242", gradient: "linear-gradient(135deg, #9b5cff, #5426d8)" },
    violet: { accent: "#b536ff", rgb: "181, 54, 255", gradient: "linear-gradient(135deg, #e34dff, #792cff)" },
    pink: { accent: "#ff4fa3", rgb: "255, 79, 163", gradient: "linear-gradient(135deg, #ff78c8, #e52d76)" },
    sunset: { accent: "#ff6b5e", rgb: "255, 107, 94", gradient: "linear-gradient(135deg, #ffcc70, #ff4d7d 55%, #8b5cf6)" },
    fire: { accent: "#ff5722", rgb: "255, 87, 34", gradient: "linear-gradient(135deg, #ffe259, #ff7b32 52%, #ff3158)" },
    aurora: { accent: "#46e6bd", rgb: "70, 230, 189", gradient: "linear-gradient(135deg, #45f2c7, #399cff 52%, #a34bff)" },
    candy: { accent: "#ff69b4", rgb: "255, 105, 180", gradient: "linear-gradient(135deg, #ff8bd1, #a879ff 55%, #54c9ff)" },
    galaxy: { accent: "#9b6bff", rgb: "155, 107, 255", gradient: "linear-gradient(135deg, #ff64c8, #9b6bff 52%, #4169ff)" }
};

const legacyThemes = {
    "#9500ff": "default",
    "#ff3b4f": "red",
    "#ff8a00": "orange",
    "#ffd43b": "yellow",
    "#00c781": "green",
    "#1687ff": "blue",
    "#7136f2": "purple"
};
const savedTheme = localStorage.getItem("calculatorTheme");
const activeTheme = window.themePresets[savedTheme]
    ? savedTheme
    : legacyThemes[savedTheme] || "default";
const activePreset = window.themePresets[activeTheme];

document.documentElement.style.setProperty("--accent", activePreset.accent);
document.documentElement.style.setProperty("--accent-rgb", activePreset.rgb);
document.documentElement.style.setProperty("--accent-gradient", activePreset.gradient);
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", activePreset.accent);
if (savedTheme !== activeTheme) localStorage.setItem("calculatorTheme", activeTheme);

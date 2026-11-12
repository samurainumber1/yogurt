"use strict";

const protectedPaths = new Set([
    "/scientific-calculator",
    "/graph-calculator",
    "/index.html",
    "/game.html"
]);

if (protectedPaths.has(window.location.pathname) && sessionStorage.getItem("arcadeUnlocked") !== "1") {
    document.documentElement.style.visibility = "hidden";
    window.location.replace("/calculator");
}

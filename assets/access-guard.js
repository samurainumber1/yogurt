"use strict";

const protectedPaths = new Set([
    "/scientific-calculator",
    "/graph-calculator",
    "/index.html",
    "/game.html"
]);

function enforceStashAccess() {
    if (!protectedPaths.has(window.location.pathname) || sessionStorage.getItem("arcadeUnlocked") === "1") return;
    document.documentElement.style.visibility = "hidden";
    window.location.replace("/calculator");
}

enforceStashAccess();
window.addEventListener("pageshow", enforceStashAccess);

"use strict";

const gameStage = document.querySelector("#gameStage");
const fullscreenButton = document.querySelector("#fullscreenButton");

fullscreenButton.addEventListener("click", async () => {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await gameStage.requestFullscreen();
        }
    } catch (error) {
        console.error("Could not change fullscreen mode:", error);
    }
});

document.addEventListener("fullscreenchange", () => {
    const active = document.fullscreenElement === gameStage;
    fullscreenButton.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
    fullscreenButton.querySelector("span").textContent = active ? "Exit fullscreen" : "Fullscreen";
});

window.addEventListener("load", () => {
    const container = document.querySelector("#game_frame");
    if (window.location.protocol === "file:") {
        container.innerHTML = '<div class="launch-error"><strong>Open this page through the website server</strong>Minecraft needs a web server to load its local game files. Return to the <a href="/scientific-calculator">game catalog</a> and open this page from there.</div>';
        return;
    }

    const relayIndex = Math.floor(Math.random() * 3);
    window.eaglercraftXOpts = {
        demoMode: false,
        container: "game_frame",
        assetsURI: "120.epw",
        worldsDB: "worlds",
        servers: [],
        relays: [
            { addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: relayIndex === 0 },
            { addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: relayIndex === 1 },
            { addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: relayIndex === 2 }
        ]
    };

    const server = new URLSearchParams(window.location.search).get("server");
    if (server) window.eaglercraftXOpts.joinServer = server;

    if (typeof window.main !== "function") {
        console.error("Minecraft launcher bootstrap did not load.");
        container.innerHTML = '<div class="launch-error"><strong>Game could not start</strong>The Minecraft launcher did not load. Check your connection and reload the page.</div>';
        return;
    }

    window.main();
});

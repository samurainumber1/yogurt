"use strict";

const games = [
    { title: "Drift Hunters", path: "games/⭐ALEX MODS - Drift Hunters.html", icon: "🏎️", category: "Racing", art: "racing", description: "Tune your ride and master the art of the drift." },
    { title: "Drift Simulator", path: "games/⭐ALEX MODS - Drift Hunters [2].html", icon: "🏁", category: "Racing", art: "racing-alt", description: "Slide through the corners and chase a cleaner line." },
    { title: "Among Us", path: "games/ALEX MODS - Among us.html", icon: "🚀", category: "Arcade", art: "sci-fi", description: "Find the impostor before the crew runs out of time." },
    { title: "Cookie Clicker", path: "games/ALEX MODS - Cookie Clicker.html", icon: "🍪", category: "Arcade", art: "idle", description: "Start with a cookie. See how far your bakery can grow." },
    { title: "Crossy Road", path: "games/ALEX MODS - Crossy Road.html", icon: "🐔", category: "Arcade", art: "road", description: "Hop across busy roads, rivers and railway tracks." },
    { title: "Five Nights at Freddy's 2", path: "games/ALEX MODS - Fight nights at Freddies [2].html", icon: "🐻", category: "Adventure", art: "horror", description: "Keep watch through another night at the pizzeria." },
    { title: "Fireboy & Watergirl", path: "games/ALEX MODS - Fire Boy and Water Girl.html", icon: "🔥", category: "Puzzle", art: "fire", description: "Work together to solve the temple's clever challenges." },
    { title: "Five Nights at Freddy's", path: "games/ALEX MODS - Five Nights at Freddies [1].html", icon: "🌙", category: "Adventure", art: "night", description: "Make it through the night shift and stay alert." },
    { title: "Fortzone", path: "games/ALEX MODS - Fortzone.html", icon: "⚡", category: "Adventure", art: "action", description: "Drop in, gear up and get ready for battle." },
    { title: "Fruit Ninja", path: "games/ALEX MODS - Fruit Ninja.html", icon: "🍉", category: "Arcade", art: "fruit", description: "Slice fruit, dodge the bombs and chase a new high score." },
    { title: "Geometry Dash", path: "games/ALEX MODS - Geometry Dash.html", icon: "🔺", category: "Arcade", art: "rhythm", description: "Jump to the beat and make it through the course." },
    { title: "Granny", path: "games/ALEX MODS - Granny [1].html", icon: "🏚️", category: "Adventure", art: "escape", description: "Find a way out quietly before time runs out." },
    { title: "Minecraft 1.12", path: "games/ALEX MODS - Minecraft 1.12.html", icon: "⛏️", category: "Adventure", art: "blocks", description: "Build, explore and survive in the classic block world." },
    { title: "Minecraft Motorcycle", path: "games/ALEX MODS - Minecraft Motorcycle.html", icon: "🏍️", category: "Racing", art: "moto", description: "Take a blocky bike for a ride through the course." },
    { title: "Plague Inc.", path: "games/ALEX MODS - Plague Inc.html", icon: "🧬", category: "Strategy", art: "bio", description: "Evolve a strategy and see how it changes the world." },
    { title: "Plants vs. Zombies", path: "games/ALEX MODS - Plants vs Zombies.html", icon: "🌻", category: "Strategy", art: "garden", description: "Build your garden defenses and stop the zombie invasion." },
    { title: "Slither.io", path: "games/ALEX MODS - Slither.io.html", icon: "🐍", category: "Arcade", art: "snake", description: "Grow your snake and outmaneuver the arena." },
    { title: "Drive Mad", path: "games/ALEX MODS - Drive Mad.html", icon: "🛻", category: "Racing", art: "crash", description: "Balance your vehicle across a wild obstacle course." },
    { title: "Basketball Stars", path: "games/ALEX MODS - Basketball Stars.html", icon: "🏀", category: "Sports", art: "court", description: "Take it to the court and shoot for the win." },
    { title: "GTA III", path: "games/ALEX MODS - GTA 3.html", icon: "🚕", category: "Adventure", art: "city", description: "Explore the city and take on an open-world adventure." },
    { title: "Slope", path: "games/ALEX MODS - Slope.html", icon: "🟩", category: "Arcade", art: "neon", description: "Race a ball down a neon track without falling off." },
    { title: "Subway Surfers", maps: true, icon: "🚇", category: "Arcade", art: "subway", description: "Choose from eight cities and dash through the streets." },
    { title: "2048", path: "games/2048/index.html", icon: "🔢", category: "Puzzle", art: "tiles", description: "Join matching tiles and work your way up to 2048." }
];

const subwayMaps = [
    ["Barcelona", "ALEXMODS - Subway Surfers - Barcelona.html"],
    ["Beijing", "ALEXMODS - Subway Surfers - Beijing.html"],
    ["Berlin", "ALEXMODS - Subway Surfers - Berlin.html"],
    ["Buenos Aires", "ALEXMODS - Subway Surfers - Buenos Aires.html"],
    ["Havana", "ALEXMODS - Subway Surfers - Havana.html"],
    ["Houston", "ALEXMODS - Subway Surfers - Houston.html"],
    ["Iceland", "ALEXMODS - Subway Surfers - Iceland.html"],
    ["London", "ALEXMODS - Subway Surfers - London.html"]
];

const gameGrid = document.querySelector("#gameGrid");
const gameSearch = document.querySelector("#gameSearch");
const emptyState = document.querySelector("#emptyState");
const categoryList = document.querySelector("#categoryList");
const gameViewer = document.querySelector("#gameViewer");
const gameFrame = document.querySelector("#gameFrame");
const playerStage = document.querySelector("#playerStage");
const mapDialog = document.querySelector("#mapDialog");
let activeCategory = "All";
let lastFocusedElement = null;

function createGameCard(game, index) {
    const card = document.createElement("article");
    card.className = "game-card";
    card.style.animationDelay = `${Math.min(index, 20) * 22}ms`;

    const art = document.createElement("div");
    art.className = `game-art art-${game.art}`;
    art.setAttribute("aria-hidden", "true");

    const artIndex = document.createElement("span");
    artIndex.className = "art-index";
    artIndex.textContent = `PICK ${String(index + 1).padStart(2, "0")}`;

    const icon = document.createElement("span");
    icon.className = "art-icon";
    icon.textContent = game.icon;

    const artCategory = document.createElement("span");
    artCategory.className = "art-category";
    artCategory.textContent = game.category;
    art.append(artIndex, icon, artCategory);

    const body = document.createElement("div");
    body.className = "card-body";

    const meta = document.createElement("div");
    meta.className = "card-meta";
    const metaType = document.createElement("span");
    metaType.textContent = game.maps ? "CITY COLLECTION" : "IN THE ARCADE";
    const metaCategory = document.createElement("span");
    metaCategory.textContent = game.category;
    meta.append(metaType, metaCategory);

    const title = document.createElement("h3");
    title.textContent = game.title;
    const description = document.createElement("p");
    description.textContent = game.description;
    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.type = "button";
    playButton.setAttribute("aria-label", `${game.maps ? "Choose a map for" : "Play"} ${game.title}`);
    const playLabel = document.createElement("span");
    playLabel.textContent = game.maps ? "CHOOSE A CITY" : "PLAY GAME";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    playButton.append(playLabel, arrow);
    playButton.addEventListener("click", () => game.maps ? openMapPicker(playButton) : openGame(game));

    body.append(meta, title, description, playButton);
    card.append(art, body);
    return card;
}

function renderGames() {
    const query = gameSearch.value.trim().toLocaleLowerCase();
    const filtered = games.filter(game => {
        const categoryMatches = activeCategory === "All" || game.category === activeCategory;
        const searchMatches = `${game.title} ${game.description} ${game.category}`.toLocaleLowerCase().includes(query);
        return categoryMatches && searchMatches;
    });

    gameGrid.replaceChildren(...filtered.map(createGameCard));
    emptyState.hidden = filtered.length !== 0;
}

function openMapPicker(trigger) {
    lastFocusedElement = trigger;
    const mapGrid = document.querySelector("#mapGrid");
    mapGrid.replaceChildren(...subwayMaps.map(([city, file], index) => {
        const button = document.createElement("button");
        button.className = "map-button";
        button.type = "button";
        button.innerHTML = `<span><strong>${city}</strong><small>MAP ${String(index + 1).padStart(2, "0")}</small></span><span aria-hidden="true">↗</span>`;
        button.addEventListener("click", () => {
            closeMapPicker();
            openGame({ title: `Subway Surfers: ${city}`, path: `games/Subway Surfers/${file}` });
        });
        return button;
    }));
    mapDialog.hidden = false;
    document.body.classList.add("is-playing");
    mapGrid.querySelector("button")?.focus();
}

function closeMapPicker() {
    mapDialog.hidden = true;
    if (!gameViewer.hidden) return;
    document.body.classList.remove("is-playing");
    lastFocusedElement?.focus();
}

function openGame(game) {
    lastFocusedElement = document.activeElement;
    document.querySelector("#playerTitle").textContent = game.title;
    gameFrame.title = `${game.title} game`;
    gameFrame.src = new URL(game.path, document.baseURI).href;
    gameViewer.hidden = false;
    document.body.classList.add("is-playing");
    document.querySelector("#closeGame").focus();
}

function closeGame() {
    gameFrame.src = "about:blank";
    gameViewer.hidden = true;
    document.body.classList.remove("is-playing");
    if (document.fullscreenElement) document.exitFullscreen();
    lastFocusedElement?.focus();
}

document.querySelector("#categoryList").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    categoryList.querySelectorAll("[data-category]").forEach(categoryButton => {
        const selected = categoryButton === button;
        categoryButton.classList.toggle("active", selected);
        categoryButton.setAttribute("aria-pressed", String(selected));
    });
    renderGames();
});

document.querySelector("#featuredPlay").addEventListener("click", () => openGame(games[0]));
gameSearch.addEventListener("input", renderGames);
document.querySelector("#backToLibrary").addEventListener("click", closeGame);
document.querySelector("#closeGame").addEventListener("click", closeGame);
document.querySelectorAll("[data-close-maps]").forEach(button => button.addEventListener("click", closeMapPicker));
document.querySelector("#fullscreenButton").addEventListener("click", async event => {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await playerStage.requestFullscreen();
        }
        event.currentTarget.setAttribute("aria-label", document.fullscreenElement ? "Exit fullscreen" : "Enter fullscreen");
    } catch (error) {
        console.error("Could not change fullscreen mode:", error);
    }
});

document.addEventListener("fullscreenchange", () => {
    const button = document.querySelector("#fullscreenButton");
    const isFullscreen = document.fullscreenElement === playerStage;
    button.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
    button.querySelector("span").textContent = isFullscreen ? "Exit fullscreen" : "Fullscreen";
});

document.addEventListener("keydown", event => {
    if (event.key === "/" && gameViewer.hidden && mapDialog.hidden && document.activeElement !== gameSearch) {
        event.preventDefault();
        gameSearch.focus();
    }
    if (event.key === "Escape" && !mapDialog.hidden) closeMapPicker();
    else if (event.key === "Escape" && !gameViewer.hidden && !document.fullscreenElement) closeGame();
});

document.querySelector("#gameCount").textContent = String(games.length);
renderGames();

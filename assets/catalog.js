"use strict";

const games = [
    { title: "Space Waves", path: "games/ALEX MODS - Space Waves.html", icon: "👾", category: "Arcade", art: "space", description: "Guide a triangle through a neon course. Release to dive down; hold to climb up." },
    { title: "Encrypted YouTube", path: "games/ALEX MODS - Encrypted YouTube.html", icon: "📺", category: "Arcade", art: "video", description: "Search and watch YouTube videos in the Alex Mods video stash." },
    { title: "Drift Hunters", path: "games/⭐ALEX MODS - Drift Hunters.html", icon: "🏎️", category: "Racing", art: "racing", description: "Tune your ride and master the art of the drift." },
    { title: "Drift Simulator", path: "games/⭐ALEX MODS - Drift Hunters [2].html", icon: "🏁", category: "Racing", art: "racing-alt", description: "Slide through the corners and chase a cleaner line." },
    { title: "Slow Roads", path: "games/ALEX MODS - Slowroads.io.html", icon: "🛣️", category: "Racing", art: "racing", description: "Take a quiet drive through an endless open road." },
    { title: "Among Us", path: "games/ALEX MODS - Among us.html", icon: "🚀", category: "Arcade", art: "sci-fi", description: "Find the impostor before the crew runs out of time." },
    { title: "Cookie Clicker", path: "games/reviewed/cookieclicker.html", icon: "🍪", category: "Arcade", art: "idle", description: "Start with a cookie. See how far your bakery can grow." },
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
    { title: "2048", path: "games/2048/index.html", icon: "🔢", category: "Puzzle", art: "tiles", description: "Join matching tiles and work your way up to 2048." },

    { title: "1v1.LOL", path: "games/reviewed/1v1.lol.html", icon: "\u{1F3AF}", category: "Arcade", art: "action", description: "Build, aim and outplay your opponent in a quick one-on-one battle." },
    { title: "3D Flight Simulator", path: "games/reviewed/3Dflightsimulator.html", icon: "\u2708\uFE0F", category: "Adventure", art: "sci-fi", description: "Take the controls and fly through an open 3D world." },
    { title: "Agar.io Lite", path: "games/reviewed/agariolite.html", icon: "\u{1F7E2}", category: "Arcade", art: "snake", description: "Grow your cell by collecting dots and outmaneuvering rivals." },
    { title: "Angry Birds", path: "games/reviewed/angrybirds.html", icon: "\u{1F426}", category: "Puzzle", art: "action", description: "Launch the birds and topple the pigs' wobbly fortresses." },
    { title: "Awesome Tanks", path: "games/reviewed/awesometanks.html", icon: "\u{1F4A5}", category: "Arcade", art: "action", description: "Blast through enemy tanks, collect upgrades and clear each arena." },
    { title: "Awesome Tanks 2", path: "games/reviewed/awesometanks2.html", icon: "\u{1F4A3}", category: "Arcade", art: "action", description: "Roll into tougher arenas with more weapons and bigger battles." },
    { title: "Bad Piggies", path: "games/reviewed/badpiggies.html", icon: "\u{1F437}", category: "Puzzle", art: "blocks", description: "Build a contraption from spare parts and get the pig to the goal." },
    { title: "Baldi's Basics", path: "games/reviewed/baldisbasics.html", icon: "\u{1F4DA}", category: "Adventure", art: "horror", description: "Explore the school, solve its problems and find a way out." },
    { title: "Baseball Bros", path: "games/reviewed/baseballbros.html", icon: "\u26BE", category: "Sports", art: "court", description: "Step up to the plate for fast, arcade-style baseball." },
    { title: "Bloxorz", path: "games/reviewed/bloxorz.html", icon: "\u{1F9CA}", category: "Puzzle", art: "tiles", description: "Carefully roll the block across each platform and into the hole." },
    { title: "Blumgi Racers", path: "games/reviewed/blumgiracers.html", icon: "\u{1F3C1}", category: "Racing", art: "racing-alt", description: "Race through colorful tracks packed with jumps and tricky turns." },
    { title: "Bubble Shooter", path: "games/reviewed/bubbleshooter.html", icon: "\u{1FAE7}", category: "Puzzle", art: "tiles", description: "Match bubbles by color and clear the board with careful shots." },
    { title: "Candy Crush", path: "games/reviewed/candycrush.html", icon: "\u{1F36C}", category: "Puzzle", art: "fruit", description: "Match sweets, make combos and work through the candy board." },
    { title: "Capybara Clicker", path: "games/reviewed/capybaraclicker.html", icon: "\u{1F9AB}", category: "Arcade", art: "idle", description: "Click to grow your capybara collection and unlock upgrades." },
    { title: "Car Drawing", path: "games/reviewed/cardrawing.html", icon: "\u{1F699}", category: "Puzzle", art: "racing", description: "Draw a set of wheels and see if your car can make the finish." },
    { title: "Car King Arena", path: "games/reviewed/carkingarena.html", icon: "\u{1F3CE}\uFE0F", category: "Racing", art: "racing", description: "Take your car into the arena and race for the lead." },
    { title: "Chess", path: "games/reviewed/chess.html", icon: "\u265F\uFE0F", category: "Strategy", art: "tiles", description: "Plan your moves, protect your king and take the win." },
    { title: "Cell Machine: Myst", path: "games/reviewed/clcellmachinemyst.html", icon: "\u{1F537}", category: "Puzzle", art: "bio", description: "Solve compact logic puzzles by arranging the cells just right." },
    { title: "Cleanup.io", path: "games/reviewed/cleanupio.html", icon: "\u{1F9F9}", category: "Arcade", art: "snake", description: "Sweep up objects, grow bigger and clear the arena." },
    { title: "Crazy Crash Landing", path: "games/reviewed/crazycrashlanding.html", icon: "\u{1F6EC}", category: "Racing", art: "crash", description: "Steer your landing through hazards and try to touch down in one piece." },
    { title: "Demolition Derby Crash Racing", path: "games/reviewed/demolitionderbycrashracing.html", icon: "\u{1F697}", category: "Racing", art: "crash", description: "Race hard, smash rivals and stay moving in the derby arena." },
    { title: "Eagle Ride", path: "games/reviewed/eagleride.html", icon: "\u{1F985}", category: "Arcade", art: "sci-fi", description: "Guide an eagle through a fast-moving course and dodge obstacles." },
    { title: "Eggy Car", path: "games/reviewed/eggycar.html", icon: "\u{1F95A}", category: "Racing", art: "racing-alt", description: "Balance a wobbly egg across hills without dropping it." },
    { title: "Elastic Face", path: "games/reviewed/elasticface.html", icon: "\u{1F635}", category: "Arcade", art: "sci-fi", description: "Stretch, pull and play with a face made of rubber." },
    { title: "Escaping the Prison", path: "games/reviewed/escapingtheprison.html", icon: "\u{1F513}", category: "Adventure", art: "escape", description: "Choose your escape plan and see where each decision leads." },
    { title: "Evil Glitch", path: "games/reviewed/evilglitch.html", icon: "\u{1F47E}", category: "Arcade", art: "neon", description: "Dodge the glitches and survive a sharp, fast arcade challenge." },
    { title: "Flappy Bird", path: "games/reviewed/flappybird.html", icon: "\u{1F424}", category: "Arcade", art: "road", description: "Tap to flap through the gaps and keep your run alive." },
    { title: "FNAE", path: "games/reviewed/FNAE.html", icon: "\u{1F319}", category: "Adventure", art: "horror", description: "Keep watch, manage your resources and make it through the night." },
    { title: "Google Dino", path: "games/reviewed/googledino.html", icon: "\u{1F996}", category: "Arcade", art: "road", description: "Jump over cacti and keep the little dinosaur running." },
    { title: "Helix Jump", path: "games/reviewed/helixjump.html", icon: "\u{1F300}", category: "Arcade", art: "neon", description: "Drop the ball through the tower while avoiding the colored platforms." },
    { title: "Highway Traffic", path: "games/reviewed/highwaytraffic.html", icon: "\u{1F697}", category: "Racing", art: "racing", description: "Thread through traffic, keep your speed up and avoid a collision." },
    { title: "Hover Racer Drive", path: "games/reviewed/hoverracerdrive.html", icon: "\u{1F6F8}", category: "Racing", art: "neon", description: "Pilot a hover car through a neon track at full speed." },
    { title: "Jetpack Joyride", path: "games/reviewed/jetpackjoyride.html", icon: "\u{1F680}", category: "Arcade", art: "action", description: "Fly through the lab, grab coins and dodge every obstacle." },
    { title: "Madalin Stunt Cars 2", path: "games/reviewed/madalinstuntcars2.html", icon: "\u{1F3CE}\uFE0F", category: "Racing", art: "racing-alt", description: "Take a supercar into a stunt arena and explore the open course." },
    { title: "Minesweeper", path: "games/reviewed/minesweeper.html", icon: "\u{1F4A3}", category: "Puzzle", art: "tiles", description: "Use the clues to find every mine without setting one off." },
    { title: "Mini Metro", path: "games/reviewed/mini_metro.html", icon: "\u{1F687}", category: "Strategy", art: "subway", description: "Design a subway map and keep the growing city moving." },
    { title: "Monster Tracks", path: "games/reviewed/monstertracks.html", icon: "\u{1F3C1}", category: "Racing", art: "crash", description: "Drive a monster truck across rough tracks and big jumps." },
    { title: "Moto X3M 2", path: "games/reviewed/motox3m2.html", icon: "\u{1F3CD}\uFE0F", category: "Racing", art: "racing", description: "Race a dirt bike through flips, traps and obstacle courses." },
    { title: "OvO", path: "games/reviewed/ovo.html", icon: "\u{1F3C3}", category: "Arcade", art: "rhythm", description: "Run, slide and leap through a precision platforming course." },
    { title: "OvO 3 Dimensions", path: "games/reviewed/ovo3dimensions.html", icon: "\u{1F3C3}", category: "Arcade", art: "neon", description: "Leap through a three-dimensional obstacle course." },
    { title: "Pac-Man", path: "games/reviewed/pacman.html", icon: "\u{1F7E1}", category: "Arcade", art: "neon", description: "Clear the maze, collect the dots and stay ahead of the ghosts." },
    { title: "Papa's Bakeria", path: "games/reviewed/papasbakeria.html", icon: "\u{1F967}", category: "Arcade", art: "fruit", description: "Take orders, bake pies and serve customers in the shop." },
    { title: "Paper.io 2", path: "games/reviewed/paperio2.html", icon: "\u{1F4DD}", category: "Arcade", art: "tiles", description: "Claim territory, expand your trail and protect your line." },
    { title: "Paper Minecraft 1.15.1", path: "games/reviewed/PaperMinecraft1.15.1.html", icon: "\u{1F9F1}", category: "Adventure", art: "blocks", description: "Explore, gather resources and build in a blocky open world." },
    { title: "Parking Fury", path: "games/reviewed/parkingfury.html", icon: "\u{1F697}", category: "Racing", art: "racing", description: "Thread through tight spaces and park without scraping the car." },
    { title: "Parking Fury 2", path: "games/reviewed/parkingfury2.html", icon: "\u{1F698}", category: "Racing", art: "racing-alt", description: "Take on trickier parking spots and carefully line up each turn." },
    { title: "Parking Fury 3", path: "games/reviewed/parkingfury3.html", icon: "\u{1F699}", category: "Racing", art: "crash", description: "Navigate busy lots and park each car without a bump." },
    { title: "Pico's School", path: "games/reviewed/picosschool.html", icon: "\u{1F3AE}", category: "Adventure", art: "action", description: "Explore the school and make your way through a story-driven adventure." },
    { title: "Poor Bunny", path: "games/reviewed/poorbunny.html", icon: "\u{1F430}", category: "Arcade", art: "road", description: "Hop around the arena, collect carrots and dodge the traps." }
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
const feedbackDialog = document.querySelector("#feedbackDialog");
const recentGrid = document.querySelector("#recentGrid");
const recentSection = document.querySelector("#recentSection");
const RECENTS_KEY = "alexmods-game-recents";
let activeCategory = "All";
let lastFocusedElement = null;

function createGameCard(game, index, isRecent = false) {
    const card = document.createElement("article");
    card.className = "game-card";
    card.style.animationDelay = `${Math.min(index, 20) * 22}ms`;

    const art = document.createElement("div");
    art.className = `game-art art-${game.art}`;
    art.setAttribute("aria-hidden", "true");

    const artIndex = document.createElement("span");
    artIndex.className = "art-index";
    artIndex.textContent = isRecent ? "RECENTLY PLAYED" : `PICK ${String(index + 1).padStart(2, "0")}`;

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
    metaType.textContent = game.maps ? "CITY COLLECTION" : "IN THE GAME STASH";
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

    gameGrid.replaceChildren(...filtered.map((game, index) => createGameCard(game, index)));
    emptyState.hidden = filtered.length !== 0;
}

function loadRecents() {
    try {
        const stored = JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
        if (!Array.isArray(stored)) return [];
        return stored.filter(item => item && typeof item.path === "string" && typeof item.title === "string").slice(0, 8);
    } catch {
        return [];
    }
}

function saveRecent(game) {
    if (!game.path) return;
    const recent = {
        title: game.title,
        path: game.path,
        icon: game.icon || "🎮",
        category: game.category || "Arcade",
        art: game.art || "sci-fi",
        description: game.description || "Jump back into this game."
    };
    const updated = [recent, ...loadRecents().filter(item => item.path !== game.path)].slice(0, 8);
    try {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
    } catch {
        // The game still opens when browser storage is unavailable.
    }
    renderRecents();
}

function renderRecents() {
    const mapFiles = new Set(subwayMaps.map(([, file]) => `games/Subway Surfers/${file}`));
    const recentGames = loadRecents().map(recent => {
        const catalogGame = games.find(game => game.path === recent.path);
        if (catalogGame) return catalogGame;
        if (mapFiles.has(recent.path)) {
            return { ...recent, category: "Arcade", art: "subway", icon: "🚇" };
        }
        return null;
    }).filter(Boolean);
    recentGrid.replaceChildren(...recentGames.map((game, index) => createGameCard(game, index, true)));
    recentSection.hidden = recentGames.length === 0;
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
    if (game.externalUrl) {
        window.location.assign(game.externalUrl);
        return;
    }

    saveRecent(game);
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
document.querySelector("#openFeedback").addEventListener("click", () => feedbackDialog.showModal());
document.querySelector("#closeFeedback").addEventListener("click", () => feedbackDialog.close());
feedbackDialog.addEventListener("click", event => {
    if (event.target === feedbackDialog) feedbackDialog.close();
});
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
renderRecents();

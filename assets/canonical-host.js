"use strict";

(() => {
    const canonicalHost = "yogurt-ws0r.onrender.com";
    if (window.location.hostname.toLowerCase() === canonicalHost) return;

    let path = window.location.pathname;
    if (window.location.hostname.toLowerCase() === "samurainumber1.github.io") {
        const projectPrefix = "/yogurt";
        if (path === projectPrefix || path === `${projectPrefix}/`) {
            path = "/";
        } else if (path.startsWith(`${projectPrefix}/`)) {
            path = path.slice(projectPrefix.length);
        }
    }

    const correctUrl = `https://${canonicalHost}${path}${window.location.search}${window.location.hash}`;
    const style = document.createElement("style");
    style.textContent = `
        .canonical-host-overlay, .canonical-host-overlay * { box-sizing: border-box; }
        .canonical-host-overlay {
            position: fixed;
            z-index: 2147483647;
            inset: 0;
            display: grid;
            place-items: center;
            overflow: auto;
            padding: 24px;
            color: #f8fafc;
            background: radial-gradient(ellipse at top, #25224c, #0b1020 65%);
            font: 16px/1.5 system-ui, sans-serif;
            visibility: visible;
        }
        .canonical-host-card {
            width: min(100%, 520px);
            padding: 36px;
            border: 1px solid rgba(255,255,255,.14);
            border-radius: 22px;
            background: rgba(17,24,39,.96);
            box-shadow: 0 24px 80px rgba(0,0,0,.4);
            text-align: center;
        }
        .canonical-host-card h1 { margin: 0 0 12px; font-size: clamp(26px, 6vw, 36px); }
        .canonical-host-card p { color: #cbd5e1; }
        .canonical-host-url {
            display: block;
            overflow-wrap: anywhere;
            margin: 22px 0;
            padding: 14px;
            border: 1px solid rgba(129,140,248,.4);
            border-radius: 12px;
            color: #a5f3fc;
            background: rgba(15,23,42,.8);
        }
        .canonical-host-continue {
            display: inline-block;
            padding: 13px 22px;
            border-radius: 999px;
            color: #07111c;
            background: #67efff;
            font-weight: 750;
            text-decoration: none;
        }
        .canonical-host-continue:focus-visible { outline: 3px solid white; outline-offset: 4px; }
    `;

    const overlay = document.createElement("div");
    overlay.className = "canonical-host-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const card = document.createElement("main");
    card.className = "canonical-host-card";
    const heading = document.createElement("h1");
    heading.textContent = "You’re on the wrong link";
    const message = document.createElement("p");
    message.textContent = "Please use the official Alex Mods link. Use it next time you visit, too.";

    const urlLink = document.createElement("a");
    urlLink.className = "canonical-host-url";
    urlLink.href = correctUrl;
    urlLink.textContent = correctUrl;

    const continueLink = document.createElement("a");
    continueLink.className = "canonical-host-continue";
    continueLink.href = correctUrl;
    continueLink.textContent = "Go to the correct link";

    const countdown = document.createElement("p");
    countdown.setAttribute("aria-live", "polite");
    countdown.textContent = "Taking you there in 7 seconds…";
    card.append(heading, message, urlLink, continueLink, countdown);
    overlay.append(card);

    document.documentElement.style.visibility = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.append(style, overlay);

    let seconds = 7;
    const timer = window.setInterval(() => {
        seconds -= 1;
        countdown.textContent = `Taking you there in ${seconds} second${seconds === 1 ? "" : "s"}…`;
        if (seconds <= 0) window.clearInterval(timer);
    }, 1000);
    window.setTimeout(() => continueLink.click(), 7000);
})();

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
    const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
    const escapedUrl = escapeHtml(correctUrl);

    document.open();
    document.write(`<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#111827">
    <title>Use the official Alex Mods link</title>
    <style>
        * { box-sizing: border-box; }
        body {
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            padding: 24px;
            color: #f8fafc;
            background: radial-gradient(ellipse at top, #25224c, #0b1020 65%);
            font: 16px/1.5 system-ui, sans-serif;
        }
        main {
            width: min(100%, 520px);
            padding: 36px;
            border: 1px solid rgba(255,255,255,.14);
            border-radius: 22px;
            background: rgba(17,24,39,.88);
            box-shadow: 0 24px 80px rgba(0,0,0,.4);
            text-align: center;
        }
        h1 { margin: 0 0 12px; font-size: clamp(26px, 6vw, 36px); }
        p { color: #cbd5e1; }
        .url {
            display: block;
            overflow-wrap: anywhere;
            margin: 22px 0;
            padding: 14px;
            border: 1px solid rgba(129,140,248,.4);
            border-radius: 12px;
            color: #a5f3fc;
            background: rgba(15,23,42,.8);
        }
        .continue {
            display: inline-block;
            padding: 13px 22px;
            border-radius: 999px;
            color: #07111c;
            background: #67efff;
            font-weight: 750;
            text-decoration: none;
        }
        .continue:focus-visible { outline: 3px solid white; outline-offset: 4px; }
    </style>
</head>
<body>
    <main>
        <h1>You’re on the wrong link</h1>
        <p>Please use the official Alex Mods link. Use it next time you visit, too.</p>
        <a class="url" href="${escapedUrl}">${escapedUrl}</a>
        <a class="continue" id="continue-link" href="${escapedUrl}">Go to the correct link</a>
        <p id="redirect-countdown" aria-live="polite">Taking you there in 7 seconds…</p>
    </main>
    <script>
        const countdown = document.querySelector("#redirect-countdown");
        const continueLink = document.querySelector("#continue-link");
        let seconds = 7;
        const timer = window.setInterval(() => {
            seconds -= 1;
            countdown.textContent = \`Taking you there in \${seconds} second\${seconds === 1 ? "" : "s"}…\`;
            if (seconds <= 0) window.clearInterval(timer);
        }, 1000);
        window.setTimeout(() => continueLink.click(), 7000);
    <\/script>
</body>
</html>`);
    document.close();
})();

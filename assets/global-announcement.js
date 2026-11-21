(() => {
    "use strict";
    let currentId = "";
    let host;

    function ensureHost() {
        if (host?.isConnected) return host;
        host = document.createElement("div");
        host.id = "siteAnnouncementHost";
        host.setAttribute("role", "status");
        host.setAttribute("aria-live", "polite");
        host.hidden = true;
        const pill = document.createElement("div");
        pill.className = "global-announcement";
        host.append(pill);
        document.body.append(host);
        return host;
    }

    function fitPill(pill, message) {
        const screenWidth = Math.max(240, window.innerWidth || 320);
        const usableWidth = Math.min(684, screenWidth - 62);
        const estimatedLines = Math.min(5, Math.max(1, Math.ceil(message.length * 8.2 / usableWidth)));
        const fontSize = Math.max(8, Math.min(16, 42 / estimatedLines));
        pill.style.fontSize = `${fontSize}px`;
        pill.style.maxWidth = `${Math.max(180, screenWidth - 24)}px`;
    }

    function show(data) {
        const message = typeof data.message === "string" ? data.message.trim() : "";
        const id = typeof data.id === "string" ? data.id : "";
        if (!message || !id) {
            if (host) {
                host.classList.remove("is-visible");
                window.setTimeout(() => { if (!host.classList.contains("is-visible")) host.hidden = true; }, 450);
            }
            currentId = "";
            return;
        }
        if (id === currentId) return;
        currentId = id;
        const element = ensureHost();
        const pill = element.firstElementChild;
        pill.textContent = message;
        fitPill(pill, message);
        element.hidden = false;
        requestAnimationFrame(() => element.classList.add("is-visible"));
    }

    async function refresh() {
        try {
            const response = await fetch("/api/announcement", { cache: "no-store", credentials: "same-origin" });
            if (response.ok) show(await response.json());
        } catch (_) { /* Announcements are optional while offline. */ }
    }

    function start() {
        refresh();
        window.setInterval(refresh, 10000);
        window.addEventListener("resize", () => {
            if (host && !host.hidden) fitPill(host.firstElementChild, host.firstElementChild.textContent);
        }, { passive: true });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
})();

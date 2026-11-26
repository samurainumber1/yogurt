"use strict";

const presenceStorageKey = "alexModsClientId";

function createClientId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map(value => value.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getClientId() {
    try {
        let clientId = sessionStorage.getItem(presenceStorageKey);
        if (!clientId) {
            clientId = createClientId();
            sessionStorage.setItem(presenceStorageKey, clientId);
        }
        return clientId;
    } catch {
        return createClientId();
    }
}

const presenceClientId = getClientId();
const presencePagePath = window.location.pathname.slice(0, 200);
window.sitePresenceClientId = presenceClientId;

async function sendPresence(path, keepalive = false) {
    try {
        const response = await fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientId: presenceClientId, pagePath: presencePagePath }),
            keepalive,
            credentials: "same-origin",
        });
        if (!response.ok && response.status !== 204) {
            throw new Error(`Presence request failed (${response.status}).`);
        }
    } catch (error) {
        console.warn("Could not update anonymous online presence.", error);
    }
}

if (window.self === window.top) {
    sendPresence("/api/presence");
    const presenceInterval = window.setInterval(() => {
        if (!document.hidden) sendPresence("/api/presence");
    }, 20000);

    window.addEventListener("pagehide", () => {
        window.clearInterval(presenceInterval);
        sendPresence("/api/presence/leave", true);
    }, { once: true });
}

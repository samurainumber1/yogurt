"use strict";

const lockScreen = document.querySelector("#catalogLockScreen");
const lockIcon = document.querySelector("#catalogLockIcon");
const lockTitle = document.querySelector("#catalogLockTitle");
const lockMessage = document.querySelector("#catalogLockMessage");
let catalogLocked = false;
let unlockTimers = [];
let lockRequestPending = false;

function showCatalogLock() {
    if (catalogLocked) return;
    unlockTimers.forEach(timer => window.clearTimeout(timer));
    unlockTimers = [];
    lockScreen.hidden = false;
    lockScreen.classList.remove("is-unlocking");
    lockScreen.classList.remove("is-fading");
    lockIcon.textContent = "🔒";
    lockTitle.textContent = "ALEX MODS was locked by an Administrator.";
    lockMessage.textContent = "It will be back shortly. Speak to an admin if it persists.";
    catalogLocked = true;
}

function showCatalogUnlock() {
    if (!catalogLocked) {
        lockScreen.hidden = true;
        return;
    }

    lockIcon.textContent = "🔓";
    lockTitle.textContent = "ALEX MODS is unlocked.";
    lockMessage.textContent = "Returning you to the arcade...";
    lockScreen.classList.add("is-unlocking");
    catalogLocked = false;
    unlockTimers = [
        window.setTimeout(() => lockScreen.classList.add("is-fading"), 650),
        window.setTimeout(() => {
            lockScreen.hidden = true;
            lockScreen.classList.remove("is-unlocking");
            lockScreen.classList.remove("is-fading");
        }, 1150),
    ];
}

async function refreshCatalogLock() {
    if (lockRequestPending) return;
    lockRequestPending = true;
    try {
        const response = await fetch("/api/catalog-lock", { credentials: "same-origin" });
        if (!response.ok) throw new Error(`Lock status request failed (${response.status}).`);
        const status = await response.json();
        if (status.locked) showCatalogLock();
        else showCatalogUnlock();
    } catch (error) {
        console.warn("Could not check the arcade lock status.", error);
    } finally {
        lockRequestPending = false;
        document.documentElement.classList.remove("catalog-lock-pending");
    }
}

refreshCatalogLock();
window.setInterval(refreshCatalogLock, 4000);

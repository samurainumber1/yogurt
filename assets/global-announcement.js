(() => {
    "use strict";
    const voterStorageKey = "alexModsPollVoterId";
    let voterId = "";
    let host;
    let announcementNode;
    let pollNode;
    let lastPollId = "";
    let pollRequestPending = false;

    function createVoterId() {
        try {
            const saved = localStorage.getItem(voterStorageKey);
            if (saved && /^[0-9a-f-]{36}$/i.test(saved)) return saved;
            const next = window.crypto?.randomUUID ? window.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
                const random = window.crypto?.getRandomValues ? window.crypto.getRandomValues(new Uint8Array(1))[0] % 16 : Math.random() * 16 | 0;
                return (char === "x" ? random : random & 3 | 8).toString(16);
            });
            localStorage.setItem(voterStorageKey, next);
            return next;
        } catch (_) {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
                const random = Math.random() * 16 | 0;
                return (char === "x" ? random : random & 3 | 8).toString(16);
            });
        }
    }

    function ensureHost() {
        if (host?.isConnected) return host;
        host = document.createElement("div");
        host.id = "siteAnnouncementHost";
        host.setAttribute("role", "region");
        host.setAttribute("aria-label", "Site announcement and poll");
        host.hidden = true;
        announcementNode = document.createElement("div");
        announcementNode.className = "global-announcement";
        pollNode = document.createElement("section");
        pollNode.className = "global-poll-card";
        pollNode.hidden = true;
        host.append(announcementNode, pollNode);
        document.body.append(host);
        return host;
    }

    function fitPill(message) {
        const screenWidth = Math.max(240, window.innerWidth || 320);
        const usableWidth = Math.min(684, screenWidth - 62);
        const estimatedLines = Math.min(5, Math.max(1, Math.ceil(message.length * 8.2 / usableWidth)));
        announcementNode.style.fontSize = `${Math.max(8, Math.min(16, 42 / estimatedLines))}px`;
        announcementNode.style.maxWidth = `${Math.max(180, screenWidth - 24)}px`;
    }

    function renderPoll(poll) {
        if (!poll.active) {
            lastPollId = "";
            pollNode.hidden = true;
            pollNode.replaceChildren();
            return;
        }
        if (lastPollId !== poll.id || !pollNode.childElementCount) {
            lastPollId = poll.id;
            pollNode.replaceChildren();
            const question = document.createElement("h2");
            question.className = "global-poll-question";
            question.textContent = poll.question;
            const options = document.createElement("div");
            options.className = "global-poll-options";
            poll.options.slice(0, 2).forEach((label, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "global-poll-option";
                button.dataset.option = String(index);
                button.addEventListener("click", () => castVote(poll.id, index));
                const text = document.createElement("span");
                text.className = "global-poll-option-label";
                text.textContent = label;
                const result = document.createElement("span");
                result.className = "global-poll-option-result";
                button.append(text, result);
                options.append(button);
            });
            const footer = document.createElement("div");
            footer.className = "global-poll-footer";
            footer.setAttribute("aria-live", "polite");
            pollNode.append(question, options, footer);
        }
        const buttons = [...pollNode.querySelectorAll(".global-poll-option")];
        const hasVoted = poll.myVote === 0 || poll.myVote === 1;
        buttons.forEach((button, index) => {
            const count = poll.counts[index] || 0;
            const percentage = poll.total ? Math.round(count * 100 / poll.total) : 0;
            button.disabled = hasVoted || pollRequestPending;
            button.classList.toggle("is-selected", poll.myVote === index);
            button.style.setProperty("--vote-percent", `${percentage}%`);
            button.querySelector(".global-poll-option-result").textContent = hasVoted
                ? `${percentage}% · ${count}`
                : "";
        });
        pollNode.querySelector(".global-poll-footer").textContent = hasVoted
            ? `${poll.total} ${poll.total === 1 ? "vote" : "votes"} · Thanks for voting!`
            : poll.total ? `${poll.total} ${poll.total === 1 ? "vote" : "votes"} so far` : "Choose one option to vote";
        pollNode.hidden = false;
    }

    async function castVote(pollId, optionIndex) {
        if (pollRequestPending) return;
        pollRequestPending = true;
        pollNode.querySelectorAll("button").forEach(button => { button.disabled = true; });
        try {
            const response = await fetch("/api/poll/vote", {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pollId, voterId, optionIndex }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Your vote could not be recorded.");
            renderPoll(data);
        } catch (_) {
            pollNode.querySelector(".global-poll-footer").textContent = "Vote could not be recorded. Try again.";
            pollNode.querySelectorAll("button").forEach(button => { button.disabled = false; });
        } finally {
            pollRequestPending = false;
        }
    }

    async function refresh() {
        try {
            const [announcementResponse, pollResponse] = await Promise.all([
                fetch("/api/announcement", { cache: "no-store", credentials: "same-origin" }),
                fetch(`/api/poll?voterId=${encodeURIComponent(voterId)}`, { cache: "no-store", credentials: "same-origin" }),
            ]);
            if (announcementResponse.ok) {
                const announcement = await announcementResponse.json();
                const message = typeof announcement.message === "string" ? announcement.message.trim() : "";
                announcementNode.textContent = message;
                announcementNode.hidden = !message;
                if (message) fitPill(message);
            }
            if (pollResponse.ok) renderPoll(await pollResponse.json());
            const visible = !announcementNode.hidden || !pollNode.hidden;
            host.hidden = !visible;
            if (visible) requestAnimationFrame(() => host.classList.add("is-visible"));
            else host.classList.remove("is-visible");
        } catch (_) { /* Site messages are optional while offline. */ }
    }

    function start() {
        if (window.self !== window.top) return;
        voterId = createVoterId();
        ensureHost();
        refresh();
        window.setInterval(refresh, 3000);
        window.addEventListener("resize", () => {
            if (announcementNode && !announcementNode.hidden) fitPill(announcementNode.textContent);
        }, { passive: true });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
})();

"use strict";

const onlineValue = document.querySelector("#onlineUsers");
const peakCount = document.querySelector("#peakCount");
const peakLabel = document.querySelector("#peakLabel");
const activePageCount = document.querySelector("#activePageCount");
const activePages = document.querySelector("#activePages");
const lastUpdated = document.querySelector("#lastUpdated");
const refreshDashboardButton = document.querySelector("#refreshDashboard");
const lockButton = document.querySelector("#catalogLockButton");
const lockStatus = document.querySelector("#catalogLockStatus");
const chart = document.querySelector("#trafficChart");
const context = chart.getContext("2d");
const dailyTrafficChart = document.querySelector("#dailyTrafficChart");
const dailyTrafficContext = dailyTrafficChart.getContext("2d");
const popularSections = document.querySelector("#popularSections");
const siteAlerts = document.querySelector("#siteAlerts");
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
const announcementInput = document.querySelector("#announcementInput");
const announcementTime = document.querySelector("#announcementTime");
const announcementPreview = document.querySelector("#announcementPreview");
const announcementLength = document.querySelector("#announcementLength");
const announcementWarning = document.querySelector("#announcementWarning");
const announcementSend = document.querySelector("#announcementSend");
const announcementClear = document.querySelector("#announcementClear");
const announcementStatus = document.querySelector("#announcementStatus");
const pollQuestion = document.querySelector("#pollQuestion");
const pollOptions = document.querySelector("#pollOptions");
const addPollOption = document.querySelector("#addPollOption");
const pollCloseTime = document.querySelector("#pollCloseTime");
const pollSend = document.querySelector("#pollSend");
const pollClear = document.querySelector("#pollClear");
const pollStatus = document.querySelector("#pollStatus");
const pollResults = document.querySelector("#pollResults");
const pollResultRows = document.querySelector("#pollResultRows");
const pollHistory = document.querySelector("#pollHistory");
let latestMetrics = null;
let currentPoll = null;
let currentAnnouncementSchedule = {};
let pollEditorTouched = false;

function updateAnnouncementPreview() {
    const message = announcementInput.value.trim();
    announcementPreview.textContent = message || "Your announcement preview will appear here";
    announcementLength.textContent = `${announcementInput.value.length} / 500 characters`;
    const width = Math.min(340, Math.max(180, window.innerWidth - 56));
    const fontSize = message ? Math.max(8, Math.min(15, width * 2.5 / Math.max(1, message.length * 0.54))) : 15;
    announcementPreview.style.fontSize = `${fontSize}px`;
    const isLong = Boolean(message) && fontSize <= 11;
    announcementWarning.hidden = !isLong;
    announcementWarning.textContent = isLong
        ? "Long message: it will use very small text on phone screens to fit the pill. Shorten it for easier reading."
        : "";
}

function localDateString(date) {
    const pad = value => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function localDateTimeString(date) {
    const pad = value => String(value).padStart(2, "0");
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
    const offsetMinutes = pad(Math.abs(offset) % 60);
    return `${localDateString(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:00${sign}${offsetHours}:${offsetMinutes}`;
}

function populateTodayTimes(select, emptyLabel) {
    const selected = select.value;
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = emptyLabel;
    select.replaceChildren(emptyOption);
    const now = new Date();
    const nextSlot = new Date(now);
    nextSlot.setSeconds(0, 0);
    nextSlot.setMinutes(nextSlot.getMinutes() + 15 - nextSlot.getMinutes() % 15);
    while (localDateString(nextSlot) === localDateString(now)) {
        const value = `${String(nextSlot.getHours()).padStart(2, "0")}:${String(nextSlot.getMinutes()).padStart(2, "0")}`;
        const option = document.createElement("option");
        option.value = value;
        option.textContent = nextSlot.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        select.append(option);
        nextSlot.setMinutes(nextSlot.getMinutes() + 15);
    }
    if ([...select.options].some(option => option.value === selected)) select.value = selected;
}

function createTodaySchedule(select) {
    if (!select.value) return null;
    const [hours, minutes] = select.value.split(":").map(Number);
    const now = new Date();
    const startsAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
    if (startsAt <= now) throw new Error("Choose a time later today.");
    const expiresAt = new Date(startsAt);
    expiresAt.setDate(expiresAt.getDate() + 1);
    expiresAt.setHours(0, 0, 0, 0);
    return {
        localDate: localDateString(now),
        timezoneOffset: now.getTimezoneOffset(),
        startsAt: localDateTimeString(startsAt),
        expiresAt: localDateTimeString(expiresAt),
    };
}

function formatLocalTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

async function saveAnnouncement(message) {
    announcementSend.disabled = true;
    announcementClear.disabled = true;
    try {
        const schedule = message.trim() ? createTodaySchedule(announcementTime) : null;
        const response = await fetch("/api/admin/announcement", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
            body: JSON.stringify({ message, schedule }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Announcement update failed (${response.status}).`);
        announcementInput.value = data.message;
        currentAnnouncementSchedule = data.schedule || {};
        updateAnnouncementPreview();
        announcementStatus.textContent = !data.message
            ? "Announcement cleared."
            : data.schedule?.startsAt
                ? `Announcement scheduled for ${formatLocalTime(data.schedule.startsAt)} today; it expires at local midnight.`
                : "Announcement is live across the site.";
        renderAlerts(latestMetrics);
    } catch (error) {
        announcementStatus.textContent = error.message || "Could not update announcement.";
        console.error(error);
    } finally {
        announcementSend.disabled = false;
        announcementClear.disabled = false;
    }
}

async function loadAnnouncement() {
    try {
        const response = await fetch("/api/admin/announcement", { cache: "no-store", credentials: "same-origin" });
        if (response.status === 401) {
            window.location.replace("/admin/login");
            return;
        }
        if (!response.ok) throw new Error(`Announcement settings request failed (${response.status}).`);
        const data = await response.json();
        announcementInput.value = data.message || "";
        currentAnnouncementSchedule = data.schedule || {};
        updateAnnouncementPreview();
        const startsAt = currentAnnouncementSchedule.startsAt;
        const expiresAt = currentAnnouncementSchedule.expiresAt;
        if (startsAt && startsAt > Date.now() / 1000) {
            const startTime = new Date(startsAt * 1000);
            const value = `${String(startTime.getHours()).padStart(2, "0")}:${String(startTime.getMinutes()).padStart(2, "0")}`;
            if ([...announcementTime.options].some(option => option.value === value)) announcementTime.value = value;
            announcementStatus.textContent = `Announcement scheduled for ${formatLocalTime(startsAt)} today.`;
        } else if (data.message && (!expiresAt || Date.now() / 1000 < expiresAt)) {
            announcementStatus.textContent = "This announcement is currently live.";
        } else {
            announcementStatus.textContent = "No announcement sent.";
        }
        renderAlerts(latestMetrics);
    } catch (error) {
        announcementStatus.textContent = error.message || "Could not load announcement settings.";
        console.error(error);
    }
}

function pollOptionInputs() {
    return [...pollOptions.querySelectorAll(".poll-option-input")];
}

function renderPollOptions(values) {
    const options = values.length >= 2 ? values.slice(0, 5) : ["", ""];
    pollOptions.replaceChildren(...options.map((value, index) => {
        const field = document.createElement("div");
        field.className = "poll-option-editor";
        const label = document.createElement("label");
        label.className = "poll-option-field";
        const labelText = document.createElement("span");
        labelText.className = "announcement-label";
        labelText.textContent = `Option ${index + 1}`;
        const input = document.createElement("input");
        input.className = "poll-input poll-option-input";
        input.maxLength = 80;
        input.placeholder = `Option ${index + 1}`;
        input.value = value;
        input.required = true;
        label.append(labelText, input);
        field.append(label);
        if (options.length > 2) {
            const remove = document.createElement("button");
            remove.className = "logout-button";
            remove.type = "button";
            remove.textContent = "Remove";
            remove.setAttribute("aria-label", `Remove option ${index + 1}`);
            remove.addEventListener("click", () => {
                const updated = pollOptionInputs().filter((_, inputIndex) => inputIndex !== index).map(option => option.value);
                renderPollOptions(updated);
                pollEditorTouched = true;
            });
            field.append(remove);
        }
        return field;
    }));
    addPollOption.disabled = options.length >= 5;
}

function renderPoll(poll) {
    currentPoll = poll.active ? poll : null;
    pollResults.hidden = !poll.active;
    if (!poll.active) {
        pollStatus.textContent = "No active poll.";
        renderAlerts(latestMetrics);
        return;
    }
    if (!pollEditorTouched) {
        pollQuestion.value = poll.question;
        renderPollOptions(poll.options);
        if (poll.closesAt) {
            const closeTime = new Date(poll.closesAt * 1000);
            const value = `${String(closeTime.getHours()).padStart(2, "0")}:${String(closeTime.getMinutes()).padStart(2, "0")}`;
            if ([...pollCloseTime.options].some(option => option.value === value)) pollCloseTime.value = value;
        }
    }
    pollResultRows.replaceChildren(...poll.options.map((option, index) => {
        const count = poll.counts[index] || 0;
        const percentage = poll.total ? Math.round(count * 100 / poll.total) : 0;
        const row = document.createElement("div");
        row.className = "poll-result-row";
        const heading = document.createElement("div");
        const label = document.createElement("span");
        label.textContent = option;
        const result = document.createElement("strong");
        result.textContent = `${count} · ${percentage}%`;
        heading.append(label, result);
        const track = document.createElement("div");
        track.className = "poll-result-track";
        const bar = document.createElement("span");
        bar.style.width = `${poll.total ? count * 100 / poll.total : 0}%`;
        track.append(bar);
        row.append(heading, track);
        return row;
    }));
    const closingLabel = poll.closesAt ? ` · closes at ${formatLocalTime(poll.closesAt)}` : "";
    pollStatus.textContent = `Poll is live · ${poll.total} ${poll.total === 1 ? "vote" : "votes"}${closingLabel}. Results update automatically.`;
    document.querySelector("#pollVoteTotal").textContent = `${poll.total} ${poll.total === 1 ? "vote" : "votes"}`;
    renderAlerts(latestMetrics);
}

async function refreshPoll() {
    try {
        const response = await fetch("/api/poll", { cache: "no-store", credentials: "same-origin" });
        if (response.ok) {
            const wasActive = Boolean(currentPoll);
            renderPoll(await response.json());
            if (wasActive && !currentPoll) await refreshPollHistory();
        }
    } catch (_) {
        pollStatus.textContent = "Could not refresh poll results.";
    }
}

async function refreshPollHistory() {
    try {
        const response = await fetch("/api/admin/poll-history", { cache: "no-store", credentials: "same-origin" });
        if (!response.ok) throw new Error(`Poll history request failed (${response.status}).`);
        const data = await response.json();
        pollHistory.replaceChildren();
        if (!data.history.length) {
            const empty = document.createElement("li");
            empty.className = "active-pages-empty";
            empty.textContent = "Ended polls will be saved here with their results.";
            pollHistory.append(empty);
            return;
        }
        data.history.forEach(item => {
            const entry = document.createElement("li");
            entry.className = "poll-history-item";
            const question = document.createElement("strong");
            question.textContent = item.question;
            const results = document.createElement("span");
            results.textContent = item.options.map((option, index) => `${option}: ${item.counts[index] || 0}`).join(" · ");
            const total = document.createElement("span");
            total.textContent = `${item.total} ${item.total === 1 ? "vote" : "votes"} · ended ${new Date(item.endedAt * 1000).toLocaleString()}`;
            entry.append(question, results, total);
            pollHistory.append(entry);
        });
    } catch (error) {
        pollHistory.replaceChildren();
        const failed = document.createElement("li");
        failed.className = "active-pages-empty";
        failed.textContent = "Could not load poll history.";
        pollHistory.append(failed);
        console.error(error);
    }
}

async function savePoll(question) {
    pollSend.disabled = true;
    pollClear.disabled = true;
    try {
        const closeTime = pollCloseTime.value ? createTodaySchedule(pollCloseTime) : null;
        const response = await fetch("/api/admin/poll", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
            body: JSON.stringify({
                question,
                options: pollOptionInputs().map(input => input.value),
                closesAt: closeTime ? closeTime.startsAt : null,
                localDate: closeTime ? closeTime.localDate : null,
                timezoneOffset: closeTime ? closeTime.timezoneOffset : null,
            }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Poll update failed (${response.status}).`);
        if (data.active) {
            pollQuestion.value = data.question;
            renderPollOptions(data.options);
            pollEditorTouched = false;
            pollCloseTime.value = "";
            pollStatus.textContent = "Poll is live · waiting for votes.";
            await refreshPoll();
        } else {
            pollQuestion.value = "";
            renderPollOptions(["", ""]);
            pollCloseTime.value = "";
            pollEditorTouched = false;
            renderPoll(data);
            pollStatus.textContent = "Poll ended.";
            await refreshPollHistory();
        }
    } catch (error) {
        pollStatus.textContent = error.message || "Could not update poll.";
        console.error(error);
    } finally {
        pollSend.disabled = false;
        pollClear.disabled = false;
    }
}

announcementInput.addEventListener("input", updateAnnouncementPreview);
announcementSend.addEventListener("click", () => saveAnnouncement(announcementInput.value));
announcementClear.addEventListener("click", () => saveAnnouncement(""));
populateTodayTimes(announcementTime, "Publish now");
populateTodayTimes(pollCloseTime, "No automatic close");
renderPollOptions(["", ""]);
updateAnnouncementPreview();
loadAnnouncement();
pollQuestion.addEventListener("input", () => { pollEditorTouched = true; });
pollOptions.addEventListener("input", () => { pollEditorTouched = true; });
addPollOption.addEventListener("click", () => {
    const values = pollOptionInputs().map(input => input.value);
    if (values.length < 5) renderPollOptions([...values, ""]);
    pollEditorTouched = true;
});
pollSend.addEventListener("click", () => savePoll(pollQuestion.value));
pollClear.addEventListener("click", () => savePoll(""));
refreshPoll();
refreshPollHistory();
window.setInterval(refreshPoll, 3000);

function drawDailyTrafficChart(daily) {
    const bounds = dailyTrafficChart.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const scale = window.devicePixelRatio || 1;
    dailyTrafficChart.width = Math.round(bounds.width * scale);
    dailyTrafficChart.height = Math.round(bounds.height * scale);
    dailyTrafficContext.setTransform(scale, 0, 0, scale, 0, 0);

    const width = bounds.width;
    const height = bounds.height;
    const padding = { top: 12, right: 8, bottom: 23, left: 34 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const maximum = Math.max(1, ...daily.map(day => day.visitors));
    dailyTrafficContext.clearRect(0, 0, width, height);
    dailyTrafficContext.font = "9px Segoe UI, sans-serif";
    dailyTrafficContext.textAlign = "right";
    for (let tick = 0; tick <= 2; tick += 1) {
        const y = padding.top + plotHeight * tick / 2;
        const value = Math.round(maximum * (2 - tick) / 2);
        dailyTrafficContext.strokeStyle = "rgba(212, 240, 224, .08)";
        dailyTrafficContext.beginPath();
        dailyTrafficContext.moveTo(padding.left, y);
        dailyTrafficContext.lineTo(width - padding.right, y);
        dailyTrafficContext.stroke();
        dailyTrafficContext.fillStyle = "#81948a";
        dailyTrafficContext.fillText(String(value), padding.left - 7, y + 3);
    }

    const slot = plotWidth / Math.max(1, daily.length);
    daily.forEach((day, index) => {
        const barHeight = day.visitors / maximum * plotHeight;
        const x = padding.left + index * slot + Math.max(1, slot * .16);
        const y = padding.top + plotHeight - barHeight;
        dailyTrafficContext.fillStyle = "rgba(67, 243, 155, .72)";
        dailyTrafficContext.fillRect(x, y, Math.max(1, slot * .68), barHeight);
    });

    dailyTrafficContext.fillStyle = "#81948a";
    dailyTrafficContext.textAlign = "left";
    if (daily.length) {
        dailyTrafficContext.fillText(daily[0].day.slice(5), padding.left, height - 5);
        dailyTrafficContext.textAlign = "center";
        dailyTrafficContext.fillText(daily[Math.floor(daily.length / 2)].day.slice(5), padding.left + plotWidth / 2, height - 5);
        dailyTrafficContext.textAlign = "right";
        dailyTrafficContext.fillText(daily[daily.length - 1].day.slice(5), width - padding.right, height - 5);
    }
}

function renderAnalytics(metrics) {
    const daily = Array.isArray(metrics.daily) ? metrics.daily : [];
    drawDailyTrafficChart(daily);
    const sections = Array.isArray(metrics.popularSections) ? metrics.popularSections : [];
    popularSections.replaceChildren();
    if (!sections.length) {
        const empty = document.createElement("li");
        empty.className = "active-pages-empty";
        empty.textContent = "Section trends will appear after visitors use the site.";
        popularSections.append(empty);
        return;
    }
    sections.forEach(section => {
        const row = document.createElement("li");
        const name = document.createElement("span");
        const count = document.createElement("strong");
        name.textContent = section.category;
        count.textContent = String(section.visits);
        row.append(name, count);
        popularSections.append(row);
    });
}

function renderAlerts(metrics) {
    if (!metrics) return;
    const alerts = [];
    const now = Date.now() / 1000;
    const samples = Array.isArray(metrics.samples) ? metrics.samples.slice(0, -1) : [];
    const activeSamples = samples.filter(sample => sample.count > 0);
    const baseline = activeSamples.length
        ? activeSamples.reduce((total, sample) => total + sample.count, 0) / activeSamples.length
        : 0;
    const threshold = Math.max(10, Math.ceil(baseline * 2));
    if (metrics.online >= threshold) {
        alerts.push({
            level: "warning",
            text: `Traffic spike: ${metrics.online} tabs are active, above the alert level of ${threshold}.`,
        });
    }
    if (metrics.locked) {
        alerts.push({
            level: "warning",
            text: "The games catalog is locked; visitors cannot open the game collection.",
        });
    }
    if (currentAnnouncementSchedule.startsAt > now && currentAnnouncementSchedule.expiresAt > now) {
        alerts.push({
            level: "info",
            text: `Announcement scheduled for ${formatLocalTime(currentAnnouncementSchedule.startsAt)} today.`,
        });
    }
    if (currentPoll?.closesAt && currentPoll.closesAt - now <= 60 * 60) {
        alerts.push({
            level: "info",
            text: `The active poll closes at ${formatLocalTime(currentPoll.closesAt)}.`,
        });
    }
    siteAlerts.replaceChildren();
    if (!alerts.length) {
        const clear = document.createElement("li");
        clear.className = "site-alert site-alert-clear";
        clear.textContent = "No unusual traffic or upcoming scheduled events.";
        siteAlerts.append(clear);
        return;
    }
    alerts.forEach(alert => {
        const item = document.createElement("li");
        item.className = `site-alert site-alert-${alert.level}`;
        item.textContent = alert.text;
        siteAlerts.append(item);
    });
}

function drawTrafficChart(samples, peak) {
    const bounds = chart.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const scale = window.devicePixelRatio || 1;
    chart.width = Math.round(bounds.width * scale);
    chart.height = Math.round(bounds.height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);

    const width = bounds.width;
    const height = bounds.height;
    const padding = { top: 20, right: 12, bottom: 12, left: 36 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const maxCount = Math.max(4, ...samples.map(sample => sample.count));
    const pointFor = (sample, index) => ({
        x: padding.left + index / Math.max(1, samples.length - 1) * plotWidth,
        y: padding.top + plotHeight - sample.count / maxCount * plotHeight,
    });

    context.clearRect(0, 0, width, height);
    context.font = "10px Segoe UI, sans-serif";
    context.textAlign = "right";
    for (let tick = 0; tick <= 3; tick += 1) {
        const y = padding.top + plotHeight * tick / 3;
        const label = Math.round(maxCount * (3 - tick) / 3);
        context.strokeStyle = "rgba(212, 240, 224, .08)";
        context.beginPath();
        context.moveTo(padding.left, y);
        context.lineTo(width - padding.right, y);
        context.stroke();
        context.fillStyle = "#81948a";
        context.fillText(String(label), padding.left - 9, y + 3);
    }

    const points = samples.map(pointFor);
    if (!points.length) return;
    const gradient = context.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, "rgba(53, 229, 142, .27)");
    gradient.addColorStop(1, "rgba(53, 229, 142, 0)");
    context.beginPath();
    context.moveTo(points[0].x, height - padding.bottom);
    points.forEach(point => context.lineTo(point.x, point.y));
    context.lineTo(points[points.length - 1].x, height - padding.bottom);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();

    context.beginPath();
    points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
    });
    context.lineWidth = 2.5;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = "#43f39b";
    context.shadowColor = "rgba(53, 229, 142, .5)";
    context.shadowBlur = 12;
    context.stroke();
    context.shadowBlur = 0;

    const peakIndex = samples.findIndex(sample => sample.time === peak.time);
    if (peakIndex >= 0) {
        const point = points[peakIndex];
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.fillStyle = "#d9ffea";
        context.shadowColor = "#35e58e";
        context.shadowBlur = 18;
        context.fill();
        context.shadowBlur = 0;
    }
}

function formatPeakTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function renderMetrics(metrics) {
    latestMetrics = metrics;
    const pages = Array.isArray(metrics.pages) ? metrics.pages : [];
    onlineValue.textContent = String(metrics.online);
    peakCount.textContent = String(metrics.peak.count);
    activePageCount.textContent = String(pages.length);
    activePages.replaceChildren();
    if (pages.length) {
        pages.forEach(page => {
            const row = document.createElement("li");
            const category = document.createElement("span");
            const count = document.createElement("strong");
            category.textContent = page.category;
            count.textContent = String(page.count);
            row.append(category, count);
            activePages.append(row);
        });
    } else {
        const empty = document.createElement("li");
        empty.className = "active-pages-empty";
        empty.textContent = "No active visitors right now.";
        activePages.append(empty);
    }
    lockButton.textContent = metrics.locked ? "Unlock games catalog" : "Lock games catalog";
    lockButton.classList.toggle("is-locked", metrics.locked);
    lockButton.setAttribute("aria-pressed", String(metrics.locked));
    lockStatus.textContent = metrics.locked ? "Catalog is currently locked." : "Catalog is open.";
    peakLabel.textContent = `Peak ${metrics.peak.count} · ${formatPeakTime(metrics.peak.time)}`;
    lastUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}`;
    drawTrafficChart(metrics.samples, metrics.peak);
    renderAnalytics(metrics);
    renderAlerts(metrics);
}

async function refreshMetrics() {
    refreshDashboardButton.disabled = true;
    try {
        const response = await fetch("/api/admin/metrics", { credentials: "same-origin" });
        if (response.status === 401) {
            window.location.replace("/admin/login");
            return;
        }
        if (!response.ok) throw new Error(`Dashboard refresh failed (${response.status}).`);
        renderMetrics(await response.json());
    } catch (error) {
        lastUpdated.textContent = "Refresh failed · retrying automatically";
        console.error(error);
    } finally {
        refreshDashboardButton.disabled = false;
    }
}

lockButton.addEventListener("click", async () => {
    lockButton.disabled = true;
    try {
        const response = await fetch("/api/admin/catalog-lock", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify({ locked: !latestMetrics?.locked }),
        });
        if (!response.ok) throw new Error(`Could not update catalog lock (${response.status}).`);
        await refreshMetrics();
    } catch (error) {
        lockStatus.textContent = "Could not update catalog lock. Please try again.";
        console.error(error);
    } finally {
        lockButton.disabled = false;
    }
});

window.addEventListener("resize", () => {
    if (latestMetrics) {
        drawTrafficChart(latestMetrics.samples, latestMetrics.peak);
        renderAnalytics(latestMetrics);
    }
});

refreshMetrics();
refreshDashboardButton.addEventListener("click", refreshMetrics);
window.setInterval(refreshMetrics, 15000);

"use strict";

const onlineValue = document.querySelector("#onlineUsers");
const peakCount = document.querySelector("#peakCount");
const peakLabel = document.querySelector("#peakLabel");
const lockButton = document.querySelector("#catalogLockButton");
const lockStatus = document.querySelector("#catalogLockStatus");
const chart = document.querySelector("#trafficChart");
const context = chart.getContext("2d");
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
const announcementInput = document.querySelector("#announcementInput");
const announcementPreview = document.querySelector("#announcementPreview");
const announcementLength = document.querySelector("#announcementLength");
const announcementWarning = document.querySelector("#announcementWarning");
const announcementSend = document.querySelector("#announcementSend");
const announcementClear = document.querySelector("#announcementClear");
const announcementStatus = document.querySelector("#announcementStatus");
let latestMetrics = null;

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

async function saveAnnouncement(message) {
    announcementSend.disabled = true;
    announcementClear.disabled = true;
    try {
        const response = await fetch("/api/admin/announcement", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Announcement update failed (${response.status}).`);
        announcementInput.value = data.message;
        updateAnnouncementPreview();
        announcementStatus.textContent = data.message ? "Announcement sent across the site." : "Announcement cleared.";
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
        const response = await fetch("/api/announcement", { cache: "no-store", credentials: "same-origin" });
        if (!response.ok) return;
        const data = await response.json();
        if (announcementInput.value) return;
        announcementInput.value = data.message || "";
        updateAnnouncementPreview();
        announcementStatus.textContent = data.message ? "This announcement is currently live." : "No announcement sent.";
    } catch (_) {
        announcementStatus.textContent = "Could not load the current announcement.";
    }
}

announcementInput.addEventListener("input", updateAnnouncementPreview);
announcementSend.addEventListener("click", () => saveAnnouncement(announcementInput.value));
announcementClear.addEventListener("click", () => saveAnnouncement(""));
updateAnnouncementPreview();
loadAnnouncement();

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
    onlineValue.textContent = String(metrics.online);
    peakCount.textContent = String(metrics.peak.count);
    lockButton.textContent = metrics.locked ? "Unlock games catalog" : "Lock games catalog";
    lockButton.classList.toggle("is-locked", metrics.locked);
    lockButton.setAttribute("aria-pressed", String(metrics.locked));
    lockStatus.textContent = metrics.locked ? "Catalog is currently locked." : "Catalog is open.";
    peakLabel.textContent = `Peak ${metrics.peak.count} · ${formatPeakTime(metrics.peak.time)}`;
    drawTrafficChart(metrics.samples, metrics.peak);
}

async function refreshMetrics() {
    try {
        const response = await fetch("/api/admin/metrics", { credentials: "same-origin" });
        if (response.status === 401) {
            window.location.replace("/admin/login");
            return;
        }
        if (!response.ok) throw new Error(`Dashboard refresh failed (${response.status}).`);
        renderMetrics(await response.json());
    } catch (error) {
        lockStatus.textContent = "Could not refresh dashboard data.";
        console.error(error);
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
    if (latestMetrics) drawTrafficChart(latestMetrics.samples, latestMetrics.peak);
});

refreshMetrics();
window.setInterval(refreshMetrics, 15000);

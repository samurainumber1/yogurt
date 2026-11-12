"use strict";

const onlineValue = document.querySelector("#onlineUsers");
const peakCount = document.querySelector("#peakCount");
const peakLabel = document.querySelector("#peakLabel");
const lockButton = document.querySelector("#catalogLockButton");
const lockStatus = document.querySelector("#catalogLockStatus");
const chart = document.querySelector("#trafficChart");
const context = chart.getContext("2d");
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
let latestMetrics = null;

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

(() => {
    const canvas = document.querySelector("#unity-canvas");
    const cover = document.querySelector("#loading-cover");
    const progressBar = document.querySelector("#progress-bar");
    const label = document.querySelector("#loading-label");
    const error = document.querySelector("#load-error");
    const container = document.querySelector("#unity-container");
    const buildUrl = "/games/Space%20Waves/VerifiedBuild";

    // Keep the publisher's ad bridge API available to Unity without loading
    // the remote SDK. Treat each requested ad as completed immediately.
    window.gameInstance = null;
    const notifyUnity = (method) => {
        if (!window.gameInstance) return;
        try {
            window.gameInstance.SendMessage("MSStartSDK", method);
        } catch (reason) {
            console.warn(`Local ad stub could not send ${method}:`, reason);
        }
    };
    window.loadAds = () => {};
    window.loadInterstitialAd = () => {};
    window.loadRewardedAd = () => {};

    let adSequence = Promise.resolve();
    const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    const showFakeAdHijack = async () => {
        const style = document.createElement("style");
        style.textContent = `
            #alex-ad-hijacker { position: fixed; inset: 0; z-index: 2147483647; display: grid; place-items: center; padding: clamp(12px, 3vw, 36px); color: #45ff72; background: radial-gradient(ellipse at center, #06170b 0%, #000 72%); font: 700 clamp(20px, 2.5vw, 34px)/1.45 Consolas, "Courier New", monospace; }
            #alex-ad-hijacker .terminal { position: relative; display: flex; flex-direction: column; width: min(1050px, 100%); height: min(680px, 92vh); overflow: hidden; border: 2px solid #27f35c; background: rgba(0, 5, 1, .97); box-shadow: 0 0 14px #13e849, inset 0 0 36px rgba(15, 240, 65, .12); }
            #alex-ad-hijacker .terminal::after { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(transparent 0 3px, rgba(48,255,90,.045) 4px); content: ""; }
            #alex-ad-hijacker .terminal-header { padding: 14px 20px; border-bottom: 1px solid #27f35c; color: #76ff92; background: rgba(14, 73, 28, .38); text-shadow: 0 0 12px #27f35c; }
            #alex-ad-hijacker .terminal-output { flex: 1; overflow: auto; padding: clamp(20px, 4vw, 44px); text-shadow: 0 0 10px rgba(69,255,114,.7); white-space: pre-wrap; overflow-wrap: anywhere; }
            #alex-ad-hijacker .terminal-line { min-height: 1.45em; }
            #alex-ad-hijacker .terminal-line.success { color: #a1ffb5; }
            #alex-ad-hijacker .terminal-cursor { display: inline-block; width: .62em; height: 1.05em; margin-left: .15em; vertical-align: -.12em; background: #45ff72; animation: alex-hijacker-blink .7s steps(1) infinite; }
            #alex-ad-hijacker .terminal.outro { animation: alex-hijacker-glitch .12s steps(2) 5; }
            @keyframes alex-hijacker-blink { 50% { opacity: 0; } }
            @keyframes alex-hijacker-glitch { 0% { transform: translateX(0); filter: none; } 25% { transform: translateX(-3px); filter: hue-rotate(55deg); } 75% { transform: translateX(3px); filter: brightness(1.5); } }
            @media (prefers-reduced-motion: reduce) { #alex-ad-hijacker .terminal-cursor, #alex-ad-hijacker .terminal.outro { animation: none; } }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement("div");
        overlay.id = "alex-ad-hijacker";
        overlay.setAttribute("role", "status");
        overlay.setAttribute("aria-live", "polite");
        const terminal = document.createElement("div");
        terminal.className = "terminal";
        const heading = document.createElement("div");
        heading.className = "terminal-header";
        heading.textContent = "ALEX MODS - Space Waves Ad HIJACKER";
        const output = document.createElement("div");
        output.className = "terminal-output";
        terminal.append(heading, output);
        overlay.appendChild(terminal);
        document.body.appendChild(overlay);

        const addLine = (text, className = "") => {
            const line = document.createElement("div");
            line.className = `terminal-line ${className}`.trim();
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            return line;
        };

        const loadingLine = addLine("Loading...");
        await delay(150);
        loadingLine.textContent = "Loading [50%]";
        await delay(100);
        loadingLine.textContent = "Loading [90%]";
        await delay(100);
        loadingLine.textContent = "Loading [99%]";
        loadingLine.textContent = "Done";

        const skipLine = addLine("ALEX AD HIJACKER - SKIPPING AD [10%]");
        for (let percent = 20; percent <= 100; percent += 10) {
            await delay(100);
            skipLine.textContent = `ALEX AD HIJACKER - SKIPPING AD [${percent}%]`;
            output.scrollTop = output.scrollHeight;
        }

        await delay(100);
        terminal.classList.add("outro");
        addLine("> ACCESS GRANTED", "success");
        await delay(130);
        addLine("> AD GATE OVERRIDDEN", "success");
        await delay(130);
        addLine("> AD PAYLOAD DELETED", "success");
        await delay(130);
        addLine("> GAME UNLOCKED — RETURNING CONTROL", "success");
        const cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        cursor.setAttribute("aria-hidden", "true");
        output.lastElementChild.appendChild(cursor);
        await delay(650);
        overlay.remove();
        style.remove();
    };

    const completeAd = (unityCallback) => {
        adSequence = adSequence
            .then(showFakeAdHijack)
            .catch((reason) => console.warn("Local ad animation failed:", reason))
            .then(() => notifyUnity(unityCallback));
        return adSequence;
    };
    window.showInterstitialAd = () => notifyUnity("OnInterstitialAdClose");
    window.showRewardedAd = () => completeAd("OnReward");

    // Unity's ad bridge calls this after an ad closes or fails to open.
    window.setFocus = () => {
        container.focus({ preventScroll: true });
        window.focus();
        canvas.focus({ preventScroll: true });
    };
    window.resizeCanvas = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        const width = Math.round(canvas.clientWidth * pixelRatio);
        const height = Math.round(canvas.clientHeight * pixelRatio);
        if (width > 0 && height > 0 && (canvas.width !== width || canvas.height !== height)) {
            canvas.width = width;
            canvas.height = height;
        }
    };

    const config = {
        dataUrl: `${buildUrl}/game.data.unityweb`,
        frameworkUrl: `${buildUrl}/framework.js.unityweb`,
        codeUrl: `${buildUrl}/game.wasm.unityweb`,
        streamingAssetsUrl: `${buildUrl}/StreamingAssets`,
        companyName: "do.Games",
        productName: "Space Waves",
        productVersion: "1.1.2-ms",
        matchWebGLToCanvasSize: true,
        showBanner(message, type) {
            if (type === "error") {
                error.textContent = message;
                label.textContent = "Space Waves could not start";
            } else if (type === "warning") {
                console.warn(message);
            }
        }
    };

    // The game build may ask the host page to open ad or publisher URLs.
    // Keep those requests on this site; CSP also blocks cross-origin fetches.
    const originalOpen = window.open.bind(window);
    window.open = (url, target, features) => {
        try {
            const destination = new URL(url, window.location.href);
            if (destination.origin !== window.location.origin) {
                console.warn("Blocked external game link:", destination.origin);
                return null;
            }
            return originalOpen(destination.href, target, features);
        } catch {
            return null;
        }
    };

    const loader = document.createElement("script");
    loader.src = `${buildUrl}/loader.js`;
    loader.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBar.style.width = `${Math.max(0, Math.min(100, progress * 100))}%`;
        }).then((instance) => {
            window.gameInstance = instance;
            window.resizeCanvas();
            cover.remove();
            window.setFocus();
            canvas.focus();
        }).catch((reason) => {
            label.textContent = "Space Waves could not start";
            error.textContent = String(reason?.message || reason || "Unknown Unity error");
        });
    };
    loader.onerror = () => {
        label.textContent = "Space Waves could not load";
        error.textContent = "The local Unity loader file could not be downloaded.";
    };
    container.addEventListener("pointerdown", window.setFocus);
    container.addEventListener("touchstart", window.setFocus, { passive: true });
    window.addEventListener("resize", () => {
        window.setFocus();
        window.resizeCanvas();
    });
    document.head.appendChild(loader);
})();

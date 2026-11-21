(() => {
    const canvas = document.querySelector("#unity-canvas");
    const cover = document.querySelector("#loading-cover");
    const progressBar = document.querySelector("#progress-bar");
    const label = document.querySelector("#loading-label");
    const error = document.querySelector("#load-error");
    const container = document.querySelector("#unity-container");
    const buildUrl = "/games/Space%20Waves/VerifiedBuild";

    // Keep the publisher's ad bridge API available to Unity without loading
    // the remote ad SDK. Report ads as unavailable so its scene can continue.
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
    window.showInterstitialAd = () => notifyUnity("OnInterstitialAdShowError");
    window.showRewardedAd = () => notifyUnity("OnRewardedAdShowError");

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

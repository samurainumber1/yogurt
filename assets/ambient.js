"use strict";

(() => {
    const root = document.documentElement;
    let frame = 0;
    let point = { x: innerWidth * .72, y: innerHeight * .24 };

    function paintPointer() {
        root.style.setProperty("--pointer-x", `${point.x}px`);
        root.style.setProperty("--pointer-y", `${point.y}px`);
        frame = 0;
    }

    window.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;
        point = { x: event.clientX, y: event.clientY };
        if (!frame) frame = requestAnimationFrame(paintPointer);

        const surface = event.target.closest(".game-card, .calculator, .hero-feature");
        if (!surface) return;
        const rect = surface.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        surface.style.setProperty("--tilt-x", `${(x - .5) * 7}deg`);
        surface.style.setProperty("--tilt-y", `${(.5 - y) * 7}deg`);
        surface.style.setProperty("--shine-x", `${x * 100}%`);
        surface.style.setProperty("--shine-y", `${y * 100}%`);
    }, { passive: true });

    window.addEventListener("pointerout", event => {
        const surface = event.target.closest?.(".game-card, .calculator, .hero-feature");
        if (surface && !surface.contains(event.relatedTarget)) {
            surface.style.removeProperty("--tilt-x");
            surface.style.removeProperty("--tilt-y");
        }
    }, { passive: true });

    paintPointer();
})();

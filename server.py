import os
import secrets
import time
from pathlib import Path

from flask import Flask, Response, abort, redirect, request, send_from_directory

from admin import admin as admin_blueprint

PROJECT_ROOT = Path(__file__).resolve().parent
SLOW_ROADS_ROOT = PROJECT_ROOT / "games" / "Slow Roads"
SLOW_ROADS_OMITTED_VIDEOS = {
    "letterbox-general.mp4",
    "letterbox-vehicles.mp4",
    "letterbox-customisation.mp4",
    "letterbox-cockpit.mp4",
}
SLOW_ROADS_CONTENT_SECURITY_POLICY = (
    "default-src 'self' data: blob:; "
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data: blob:; "
    "font-src 'self' data: blob:; "
    "media-src 'self' data: blob:; "
    "connect-src 'self' data: blob:; "
    "worker-src 'self' blob:; "
    "child-src 'self' blob:; "
    "frame-src 'self' blob:; "
    "manifest-src 'self'; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'none'; "
    "navigate-to 'self'"
)
app = Flask(__name__, static_folder=None)


def _load_secret_key():
    configured_secret = os.environ.get("FLASK_SECRET_KEY")
    if configured_secret:
        return configured_secret

    secret_path = Path(app.instance_path) / "flask-secret.key"
    secret_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with secret_path.open("x", encoding="utf-8") as secret_file:
            secret_file.write(secrets.token_hex(32))
    except FileExistsError:
        for _ in range(100):
            if secret_path.stat().st_size:
                break
            time.sleep(0.01)
    return secret_path.read_text(encoding="utf-8").strip()


app.secret_key = _load_secret_key()
app.config.update(
    ADMIN_PASSWORD=os.environ.get("ADMIN_PASSWORD", "admin44"),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)
app.register_blueprint(admin_blueprint)


@app.get("/")
def home():
    if request.args.get("localSlowRoads") == "1":
        response = send_from_directory(
            str(SLOW_ROADS_ROOT),
            "index.html",
            conditional=False,
            etag=False,
        )
        response.direct_passthrough = False
        document = response.get_data()
        marker = document.find(b"window.__CF$cv$params")
        if marker >= 0:
            script_start = document.rfind(b"<script>", 0, marker)
            script_end = document.find(b"</script>", marker)
            if script_start < 0 or script_end < 0:
                raise RuntimeError("Could not isolate the injected Cloudflare challenge script.")
            response.set_data(document[:script_start] + document[script_end + len(b"</script>"):])
        document = response.get_data()
        document = document.replace(b'\t\t<meta property="og:url" content="https://slowroads.io/">\n', b"")
        document = document.replace(b'\t\t<meta property="twitter:url" content="https://slowroads.io/">\n', b"")
        response.set_data(document)
        offline_guard = b"""<script>
(() => {
    function disableExternalLinks(root) {
        root.querySelectorAll("a[href]").forEach(link => {
            let destination;
            try {
                destination = new URL(link.getAttribute("href"), location.href);
            } catch {
                return;
            }
            if (destination.origin !== location.origin) {
                link.href = "#";
                link.removeAttribute("target");
                link.setAttribute("aria-disabled", "true");
                link.title = "Unavailable in offline mode.";
            }
        });
    }

    disableExternalLinks(document);
    new MutationObserver(records => {
        for (const record of records) {
            if (record.type === "attributes") {
                disableExternalLinks(record.target.parentElement || document);
            } else {
                for (const node of record.addedNodes) {
                    if (node instanceof Element) {
                        if (node.matches("a[href]")) disableExternalLinks(node.parentElement || document);
                        disableExternalLinks(node);
                    }
                }
            }
        }
    }).observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["href"],
    });

    document.addEventListener("click", event => {
        if (event.target.closest("a[aria-disabled='true']")) event.preventDefault();
    }, true);
    window.open = () => null;
})();
</script>"""
        document = response.get_data()
        if b"</head>" not in document:
            raise RuntimeError("Could not find the closing head tag in the local Slow Roads page.")
        local_presence = b'<script src="/assets/presence.js" defer></script>'
        response.set_data(
            document.replace(
                b"</head>",
                local_presence + offline_guard + b"</head>",
                1,
            )
        )
        response.headers["Cache-Control"] = "no-store"
        response.headers.pop("Last-Modified", None)
        return response
    return redirect("/calculator")


@app.get("/calculator")
@app.get("/calculator.html")
def calculator():
    return send_from_directory(str(PROJECT_ROOT), "calculator.html")


@app.get("/scientific-calculator")
def game_catalog():
    return send_from_directory(str(PROJECT_ROOT), "index.html")


@app.get("/graph-calculator")
def minecraft_launcher():
    return send_from_directory(str(PROJECT_ROOT), "game.html")


@app.get("/slowroads")
@app.get("/slowroads/")
def slow_roads_redirect():
    return redirect("/?localSlowRoads=1")


@app.get("/_app/<path:resource>")
def slow_roads_app_file(resource):
    return send_from_directory(str(SLOW_ROADS_ROOT / "_app"), resource)


@app.get("/alea.min.js")
def slow_roads_alea():
    return send_from_directory(str(SLOW_ROADS_ROOT), "alea.min.js")


@app.get("/service-worker.js")
def slow_roads_service_worker():
    # The upstream worker caches "/" and purges other caches on this shared origin.
    return Response("", mimetype="application/javascript")


@app.get("/favicon.svg")
@app.get("/icon.svg")
def slow_roads_favicon():
    return send_from_directory(str(SLOW_ROADS_ROOT), "favicon.svg")


@app.get("/apple-touch-icon.png")
def slow_roads_apple_touch_icon():
    return send_from_directory(str(SLOW_ROADS_ROOT), "apple-touch-icon.png")


@app.get("/fonts/<path:resource>")
def slow_roads_font(resource):
    return send_from_directory(str(SLOW_ROADS_ROOT / "fonts"), resource)


@app.get("/img/<path:resource>")
def slow_roads_image(resource):
    if resource in SLOW_ROADS_OMITTED_VIDEOS:
        app.logger.warning("Slow Roads preview video omitted from local mirror: %s", resource)
        return Response(status=204)
    return send_from_directory(str(SLOW_ROADS_ROOT / "img"), resource)


@app.get("/manifest.json")
def slow_roads_manifest():
    return send_from_directory(str(SLOW_ROADS_ROOT), "manifest.json")


@app.after_request
def set_slow_roads_headers(response):
    is_slow_roads_document = request.path == "/" and request.args.get("localSlowRoads") == "1"
    is_slow_roads_asset = request.path.startswith(("/_app/", "/fonts/", "/img/")) or request.path in {
        "/alea.min.js", "/apple-touch-icon.png", "/favicon.svg", "/icon.svg",
        "/manifest.json", "/service-worker.js",
    }
    if is_slow_roads_document or is_slow_roads_asset:
        response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        response.headers["Content-Security-Policy"] = SLOW_ROADS_CONTENT_SECURITY_POLICY
    return response


@app.get("/<path:resource>")
def public_file(resource):
    parts = Path(resource).parts
    if (
        any(part.startswith(".") for part in parts)
        or parts[0] in {"__pycache__", "instance", "templates"}
        or resource in {"admin.py", "server.py", "test_server.py", "requirements.txt"}
    ):
        abort(404)
    if resource == "index.html":
        return redirect("/scientific-calculator")
    if resource == "game.html":
        return redirect("/graph-calculator")
    return send_from_directory(str(PROJECT_ROOT), resource)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))

import os
import secrets
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import OrderedDict
from html import escape
from pathlib import Path

from flask import Flask, Response, abort, redirect, request, send_from_directory

from admin import admin as admin_blueprint

PROJECT_ROOT = Path(__file__).resolve().parent
CANONICAL_HOST = "yogurt-ws0r.onrender.com"
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
SPACE_WAVES_CONTENT_SECURITY_POLICY = (
    "default-src 'none'; "
    "script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' blob:; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data: blob:; "
    "connect-src 'self' data: blob:; "
    "worker-src 'self' blob:; "
    "font-src 'self' data:; "
    "media-src 'self' data: blob:; "
    "object-src 'none'; "
    "frame-src 'none'; "
    "manifest-src 'none'; "
    "base-uri 'self'; "
    "form-action 'none'"
)
app = Flask(__name__, static_folder=None)

YOUTUBE_API_ROOT = "https://www.googleapis.com/youtube/v3/"
YOUTUBE_VIDEO_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")
YOUTUBE_CHANNEL_ID = re.compile(r"^UC[A-Za-z0-9_-]{22}$")
YOUTUBE_CACHE = OrderedDict()
YOUTUBE_CACHE_TTL = 300


def youtube_api(endpoint, params):
    """Fetch a fixed YouTube Data API endpoint; callers cannot supply URLs."""
    api_key = os.environ.get("YOUTUBE_API_KEY", "").strip()
    if not api_key:
        return None, ("YouTube search is not configured on this server yet.", 503)
    cache_key = (endpoint, tuple(sorted((str(k), str(v)) for k, v in params.items())))
    now = time.time()
    cached = YOUTUBE_CACHE.get(cache_key)
    if cached and cached[0] > now:
        YOUTUBE_CACHE.move_to_end(cache_key)
        return cached[1], None
    query = urllib.parse.urlencode({**params, "key": api_key})
    req = urllib.request.Request(
        f"{YOUTUBE_API_ROOT}{endpoint}?{query}",
        headers={"Accept": "application/json", "User-Agent": "AlexModsYouTube/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            data = json.loads(response.read(1_000_000).decode("utf-8"))
    except urllib.error.HTTPError as error:
        if error.code == 403:
            return None, ("YouTube API quota or access limit reached. Try again later.", 503)
        if error.code == 404:
            return None, ("YouTube could not find that item.", 404)
        return None, ("YouTube is temporarily unavailable. Please try again.", 502)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError):
        return None, ("Could not reach YouTube right now. Please try again.", 502)
    YOUTUBE_CACHE[cache_key] = (now + YOUTUBE_CACHE_TTL, data)
    YOUTUBE_CACHE.move_to_end(cache_key)
    while len(YOUTUBE_CACHE) > 128:
        YOUTUBE_CACHE.popitem(last=False)
    return data, None


def youtube_error(message, code):
    response = app.response_class(
        response=json.dumps({"error": message}), status=code, mimetype="application/json"
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/api/youtube/search")
def youtube_search():
    query = request.args.get("q", "").strip()
    if len(query) < 2 or len(query) > 100:
        return youtube_error("Search must be between 2 and 100 characters.", 400)
    try:
        limit = max(1, min(int(request.args.get("limit", "24")), 24))
    except ValueError:
        return youtube_error("Invalid result limit.", 400)
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": query,
        "maxResults": limit, "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    items = []
    items_data = data.get("items") if isinstance(data, dict) else None
    for item in items_data or []:
        if not isinstance(item, dict):
            continue
        video_id_data = item.get("id")
        snippet = item.get("snippet")
        if not isinstance(video_id_data, dict) or not isinstance(snippet, dict):
            continue
        video_id = video_id_data.get("videoId", "")
        if not isinstance(video_id, str) or not YOUTUBE_VIDEO_ID.fullmatch(video_id):
            continue
        items.append({
            "id": video_id,
            "title": snippet.get("title", ""),
            "channel": snippet.get("channelTitle", ""),
            "channelId": snippet.get("channelId", ""),
            "publishedAt": snippet.get("publishedAt", ""),
            "description": snippet.get("description", ""),
        })
    return {"items": items}


@app.get("/api/youtube/shorts")
def youtube_shorts():
    query = request.args.get("q", "").strip()
    if len(query) > 100:
        return youtube_error("Search must be no longer than 100 characters.", 400)
    try:
        limit = max(1, min(int(request.args.get("limit", "20")), 24))
    except ValueError:
        return youtube_error("Invalid result limit.", 400)
    # YouTube Data API has no dedicated Shorts feed. This uses its supported video search.
    phrase = f"{query} #shorts".strip() or "#shorts"
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": phrase,
        "maxResults": limit, "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    items = []
    for item in data.get("items", []) or []:
        if not isinstance(item, dict):
            continue
        video_id_data = item.get("id")
        video_id = video_id_data.get("videoId", "") if isinstance(video_id_data, dict) else ""
        if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
            continue
        snippet = item.get("snippet") or {}
        items.append({
            "id": video_id,
            "title": snippet.get("title", ""),
            "channel": snippet.get("channelTitle", ""),
            "channelId": snippet.get("channelId", ""),
            "publishedAt": snippet.get("publishedAt", ""),
        })
    return {"items": items}


@app.get("/api/youtube/channel/<channel_id>")
def youtube_channel(channel_id):
    if not YOUTUBE_CHANNEL_ID.fullmatch(channel_id):
        return youtube_error("Invalid channel ID.", 400)
    data, error = youtube_api("channels", {"part": "snippet,statistics", "id": channel_id})
    if error:
        return youtube_error(*error)
    if not data or not data.get("items"):
        return youtube_error("This channel could not be found.", 404)
    channel = data["items"][0]
    snippet = channel.get("snippet", {})
    stats = channel.get("statistics", {})
    videos, video_error = youtube_api("search", {
        "part": "snippet", "type": "video", "channelId": channel_id,
        "order": "date", "maxResults": 24,
    })
    if video_error:
        return youtube_error(*video_error)
    items = [{
        "id": item.get("id", {}).get("videoId", ""),
        "title": item.get("snippet", {}).get("title", ""),
        "channel": item.get("snippet", {}).get("channelTitle", ""),
        "channelId": channel_id,
        "publishedAt": item.get("snippet", {}).get("publishedAt", ""),
    } for item in videos.get("items", []) if YOUTUBE_VIDEO_ID.fullmatch(item.get("id", {}).get("videoId", ""))]
    return {
        "id": channel_id, "title": snippet.get("title", ""),
        "description": snippet.get("description", ""),
        "subscriberCount": stats.get("subscriberCount"),
        "videoCount": stats.get("videoCount"),
        "avatar": f"/api/youtube/channel/{channel_id}/avatar",
        "items": items,
    }


@app.get("/api/youtube/channel/<channel_id>/avatar")
def youtube_channel_avatar(channel_id):
    if not YOUTUBE_CHANNEL_ID.fullmatch(channel_id):
        abort(400)
    data, error = youtube_api("channels", {"part": "snippet", "id": channel_id})
    if error:
        return youtube_error(*error)
    try:
        url = data["items"][0]["snippet"]["thumbnails"]["high"]["url"]
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme != "https" or parsed.hostname != "yt3.ggpht.com":
            abort(502)
        req = urllib.request.Request(url, headers={"User-Agent": "AlexModsYouTube/1.0"})
        with urllib.request.urlopen(req, timeout=5) as upstream:
            if urllib.parse.urlparse(upstream.geturl()).hostname != "yt3.ggpht.com":
                abort(502)
            content_type = upstream.headers.get_content_type()
            if content_type not in {"image/jpeg", "image/png", "image/webp"}:
                abort(404)
            image_data = upstream.read(1_000_000)
    except (KeyError, IndexError, urllib.error.URLError, TimeoutError, OSError):
        abort(404)
    response = app.response_class(image_data, mimetype=content_type)
    response.headers["Cache-Control"] = "public, max-age=86400"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@app.get("/api/youtube/video/<video_id>")
def youtube_video(video_id):
    if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
        return youtube_error("Invalid video ID.", 400)
    data, error = youtube_api("videos", {"part": "snippet,contentDetails,statistics,status", "id": video_id})
    if error:
        return youtube_error(*error)
    if not data.get("items"):
        return youtube_error("This video is unavailable or could not be found.", 404)
    item = data["items"][0]
    snippet = item.get("snippet", {})
    stats = item.get("statistics", {})
    return {
        "id": video_id, "title": snippet.get("title", ""),
        "description": snippet.get("description", ""),
        "channel": snippet.get("channelTitle", ""),
        "channelId": snippet.get("channelId", ""),
        "publishedAt": snippet.get("publishedAt", ""),
        "viewCount": stats.get("viewCount"),
        "duration": item.get("contentDetails", {}).get("duration", ""),
        "embeddable": item.get("status", {}).get("embeddable", True),
    }


@app.get("/api/youtube/suggestions")
def youtube_suggestions():
    query = request.args.get("q", "").strip()
    if len(query) < 2 or len(query) > 100:
        return {"items": []}
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": query, "maxResults": 5,
        "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    return {"items": list(dict.fromkeys(
        item.get("snippet", {}).get("title", "") for item in data.get("items", [])
        if item.get("snippet", {}).get("title")
    ))[:5]}


@app.get("/api/youtube/thumbnail/<video_id>")
def youtube_thumbnail(video_id):
    if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
        abort(400)
    # This fixed host and fixed path prevent arbitrary URL fetching; images are cached upstream.
    target = f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
    req = urllib.request.Request(target, headers={"User-Agent": "AlexModsYouTube/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as upstream:
            if urllib.parse.urlparse(upstream.geturl()).hostname != "i.ytimg.com":
                abort(502)
            content_type = upstream.headers.get_content_type()
            if content_type != "image/jpeg":
                abort(404)
            image_data = upstream.read(1_500_000)
    except (urllib.error.URLError, TimeoutError, OSError):
        abort(502)
    response = app.response_class(image_data, mimetype="image/jpeg")
    response.headers["Cache-Control"] = "public, max-age=86400"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


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


def _load_local_secrets():
    """Load private developer secrets from an ignored file, creating a strong local password."""
    secret_path = Path(app.instance_path) / "secrets.json"
    secret_path.parent.mkdir(parents=True, exist_ok=True)
    if not secret_path.exists():
        # Production credentials belong in the hosting provider's secret environment variables.
        if os.environ.get("RENDER"):
            return {}
        initial_secrets = {"admin_password": secrets.token_urlsafe(32)}
        try:
            with secret_path.open("x", encoding="utf-8") as secret_file:
                json.dump(initial_secrets, secret_file, indent=2)
                secret_file.write("\n")
        except FileExistsError:
            pass
    try:
        with secret_path.open(encoding="utf-8") as secret_file:
            local_secrets = json.load(secret_file)
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Could not read private secrets file at {secret_path}") from error
    if not isinstance(local_secrets, dict):
        raise RuntimeError(f"Private secrets file must contain a JSON object: {secret_path}")
    return local_secrets


LOCAL_SECRETS = _load_local_secrets()
app.secret_key = _load_secret_key()
app.config.update(
    ADMIN_PASSWORD=os.environ.get("ADMIN_PASSWORD", LOCAL_SECRETS.get("admin_password", "")),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=bool(os.environ.get("RENDER")) or os.environ.get("SESSION_COOKIE_SECURE", "").lower() == "true",
)
app.register_blueprint(admin_blueprint)


@app.before_request
def enforce_canonical_host():
    host = request.host.lower()
    hostname = host.partition("]")[0] + "]" if host.startswith("[") else host.partition(":")[0]
    if hostname == CANONICAL_HOST or hostname in {"localhost", "127.0.0.1", "[::1]"}:
        return None

    requested_path = request.full_path
    if requested_path.endswith("?"):
        requested_path = requested_path[:-1]
    correct_url = escape(f"https://{CANONICAL_HOST}{requested_path}", quote=True)
    return Response(
        f"""<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#111827">
    <title>Use the official Alex Mods link</title>
    <style>
        * {{ box-sizing: border-box; }}
        body {{
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            padding: 24px;
            color: #f8fafc;
            background: radial-gradient(ellipse at top, #25224c, #0b1020 65%);
            font: 16px/1.5 system-ui, sans-serif;
        }}
        main {{
            width: min(100%, 520px);
            padding: 36px;
            border: 1px solid rgba(255,255,255,.14);
            border-radius: 22px;
            background: rgba(17,24,39,.88);
            box-shadow: 0 24px 80px rgba(0,0,0,.4);
            text-align: center;
        }}
        h1 {{ margin: 0 0 12px; font-size: clamp(26px, 6vw, 36px); }}
        p {{ color: #cbd5e1; }}
        .url {{
            display: block;
            overflow-wrap: anywhere;
            margin: 22px 0;
            padding: 14px;
            border: 1px solid rgba(129,140,248,.4);
            border-radius: 12px;
            color: #a5f3fc;
            background: rgba(15,23,42,.8);
        }}
        .continue {{
            display: inline-block;
            padding: 13px 22px;
            border-radius: 999px;
            color: #07111c;
            background: #67efff;
            font-weight: 750;
            text-decoration: none;
        }}
        .continue:focus-visible {{ outline: 3px solid white; outline-offset: 4px; }}
    </style>
</head>
<body>
    <main>
        <h1>You’re on the wrong link</h1>
        <p>Please use the official Alex Mods link. Use it next time you visit, too.</p>
        <a class="url" href="{correct_url}">{correct_url}</a>
        <a class="continue" id="continue-link" href="{correct_url}">Go to the correct link</a>
        <p id="redirect-countdown" aria-live="polite">Taking you there in 7 seconds…</p>
    </main>
    <script>
        const countdown = document.querySelector("#redirect-countdown");
        const continueLink = document.querySelector("#continue-link");
        let seconds = 7;
        const timer = window.setInterval(() => {{
            seconds -= 1;
            countdown.textContent = `Taking you there in ${{seconds}} second${{seconds === 1 ? "" : "s"}}…`;
            if (seconds <= 0) window.clearInterval(timer);
        }}, 1000);
        window.setTimeout(() => continueLink.click(), 7000);
    </script>
</body>
</html>""",
        status=200,
        mimetype="text/html",
    )


def _slow_roads_document():
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


@app.get("/")
def home():
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


@app.get("/space-waves")
def space_waves_page():
    return send_from_directory(str(PROJECT_ROOT / "games"), "ALEX MODS - Space Waves.html")


@app.get("/games/ALEX MODS - Encrypted YouTube.html")
def encrypted_youtube():
    return send_from_directory(str(PROJECT_ROOT / "games"), "ALEX MODS - Encrypted YouTube.html")


@app.get("/slowroads")
def slow_roads_redirect():
    return redirect("/slowroads/", code=308)


@app.get("/slowroads/")
def slow_roads_page():
    return _slow_roads_document()


@app.get("/slowroads/_app/<path:resource>")
def slow_roads_app_file(resource):
    return send_from_directory(str(SLOW_ROADS_ROOT / "_app"), resource)


@app.get("/slowroads/alea.min.js")
def slow_roads_alea():
    return send_from_directory(str(SLOW_ROADS_ROOT), "alea.min.js")


@app.get("/slowroads/service-worker.js")
def slow_roads_service_worker():
    # Keep the upstream worker disabled; its cache logic targets the site root.
    return Response("", mimetype="application/javascript")


@app.get("/slowroads/favicon.svg")
@app.get("/slowroads/icon.svg")
def slow_roads_favicon():
    return send_from_directory(str(SLOW_ROADS_ROOT), "favicon.svg")


@app.get("/slowroads/apple-touch-icon.png")
def slow_roads_apple_touch_icon():
    return send_from_directory(str(SLOW_ROADS_ROOT), "apple-touch-icon.png")


@app.get("/slowroads/fonts/<path:resource>")
def slow_roads_font(resource):
    return send_from_directory(str(SLOW_ROADS_ROOT / "fonts"), resource)


@app.get("/slowroads/img/<path:resource>")
def slow_roads_image(resource):
    if resource in SLOW_ROADS_OMITTED_VIDEOS:
        app.logger.warning("Slow Roads preview video omitted from local mirror: %s", resource)
        return Response(status=204)
    return send_from_directory(str(SLOW_ROADS_ROOT / "img"), resource)


@app.get("/slowroads/manifest.json")
def slow_roads_manifest():
    return send_from_directory(str(SLOW_ROADS_ROOT), "manifest.json")


@app.after_request
def set_slow_roads_headers(response):
    is_space_waves_page = request.path in {
        "/space-waves", "/games/ALEX MODS - Space Waves.html",
    }
    if is_space_waves_page:
        response.headers["Permissions-Policy"] = (
            "camera=(), microphone=(), geolocation=(), local-network-access=(), "
            "usb=(), serial=(), hid=(), bluetooth=()"
        )
    if is_space_waves_page:
        response.headers["Content-Security-Policy"] = SPACE_WAVES_CONTENT_SECURITY_POLICY

    is_slow_roads_document = request.path in {"/slowroads", "/slowroads/"}
    is_slow_roads_asset = request.path.startswith(("/slowroads/_app/", "/slowroads/fonts/", "/slowroads/img/")) or request.path in {
        "/slowroads/alea.min.js", "/slowroads/apple-touch-icon.png",
        "/slowroads/favicon.svg", "/slowroads/icon.svg",
        "/slowroads/manifest.json", "/slowroads/service-worker.js",
    }
    if is_slow_roads_document or is_slow_roads_asset:
        response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        response.headers["Content-Security-Policy"] = SLOW_ROADS_CONTENT_SECURITY_POLICY
    if (
        response.status_code == 200
        and response.mimetype == "text/html"
        and not response.is_streamed
        and response.calculate_content_length() is not None
    ):
        page = response.get_data()
        additions = (
            b'<link rel="stylesheet" href="/assets/global-announcement.css">'
            b'<script defer src="/assets/global-announcement.js"></script>'
        )
        lowered = page.lower()
        head_end = lowered.find(b"</head>")
        if head_end >= 0:
            page = page[:head_end] + additions + page[head_end:]
            response.set_data(page)
            response.headers.pop("ETag", None)
        else:
            body_end = lowered.rfind(b"</body>")
            insert_at = body_end if body_end >= 0 else len(page)
            page = page[:insert_at] + additions + page[insert_at:]
            response.set_data(page)
            response.headers.pop("ETag", None)
    return response


@app.get("/game.txt")
def space_waves_game_config():
    return send_from_directory(str(PROJECT_ROOT / "games"), "game.txt")


@app.get("/setting.txt")
def space_waves_settings():
    return Response("", mimetype="text/plain")


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

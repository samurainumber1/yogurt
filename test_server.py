import re
import uuid
from pathlib import Path
from urllib.parse import quote

import pytest

from server import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as test_client:
        test_client.environ_base["HTTP_HOST"] = "yogurt-ws0r.onrender.com"
        yield test_client


def test_wrong_host_shows_canonical_link_and_preserves_requested_path():
    with app.test_client() as test_client:
        response = test_client.get(
            "/scientific-calculator?from=wrong-link",
            headers={"Host": "not-the-site.example"},
        )

    assert response.status_code == 200
    assert b"You\xe2\x80\x99re on the wrong link" in response.data
    assert b"https://yogurt-ws0r.onrender.com/scientific-calculator?from=wrong-link" in response.data
    assert b"Go to the correct link" in response.data
    assert b"setTimeout(() => continueLink.click(), 7000)" in response.data


def test_static_host_guard_is_served_and_included_in_site_pages(client):
    guard = client.get("/assets/canonical-host.js")

    assert guard.status_code == 200
    assert b"samurainumber1.github.io" in guard.data
    assert b'const projectPrefix = "/yogurt"' in guard.data
    assert b"continueLink.click(), 7000" in guard.data
    assert b"assets/canonical-host.js" in (Path(app.root_path) / "index.html").read_bytes()
    assert b"assets/canonical-host.js" in (
        Path(app.root_path) / "games" / "ALEX MODS - Space Waves.html"
    ).read_bytes()


def test_root_opens_calculator(client):
    response = client.get("/")

    assert response.status_code == 302
    assert response.headers["Location"] == "/calculator"


def test_calculator_is_the_only_default_page(client):
    response = client.get("/calculator")

    assert response.status_code == 200
    assert b"assets/calculator.js" in response.data
    assert b"assets/catalog.js" not in response.data
    assert b"id=\"themeTrigger\"" in response.data
    assert b"id=\"unlockTransition\"" in response.data
    assert b"Opening the game stash" in response.data
    calculator_js = (Path(app.root_path) / "assets" / "calculator.js").read_text(encoding="utf-8")
    assert '"6942024421"' in calculator_js
    assert 'sessionStorage.removeItem("arcadeUnlocked")' in calculator_js
    assert b"scientific-calculator" not in response.data
    swatches = re.findall(rb'data-theme="([^"]+)" data-tooltip="([^"]+)"', response.data)
    assert swatches == [
        (b"default", b"Default"),
        (b"red", b"Red"),
        (b"orange", b"Orange"),
        (b"yellow", b"Yellow"),
        (b"lime", b"Lime"),
        (b"green", b"Green"),
        (b"mint", b"Mint"),
        (b"cyan", b"Cyan"),
        (b"blue", b"Blue"),
        (b"ice", b"Ice"),
        (b"indigo", b"Indigo"),
        (b"purple", b"Purple"),
        (b"violet", b"Violet"),
        (b"pink", b"Pink"),
        (b"sunset", b"Sunset"),
        (b"fire", b"Fire"),
        (b"aurora", b"Aurora"),
        (b"candy", b"Candy"),
        (b"galaxy", b"Galaxy"),
    ]
    assert response.data.count(b"linear-gradient(") >= len(swatches)
    theme_js = (Path(app.root_path) / "assets" / "theme.js").read_text(encoding="utf-8")
    theme_ids = re.findall(r"^    (\w+): \{ accent:", theme_js, re.MULTILINE)
    assert [theme.decode() for theme, _ in swatches] == theme_ids


def test_catalog_and_minecraft_use_gated_routes(client):
    catalog = client.get("/scientific-calculator")
    minecraft = client.get("/graph-calculator")

    assert catalog.status_code == 200
    assert b"assets/access-guard.js" in catalog.data
    assert b"assets/catalog-lock.js" in catalog.data
    assert b"assets/presence.js" in catalog.data
    assert b"ALEX MODS was locked by an Administrator." in catalog.data
    assert b'href="/graph-calculator"' in catalog.data
    assert b'href="/calculator"' in catalog.data
    assert minecraft.status_code == 200
    assert b"assets/access-guard.js" in minecraft.data
    assert b'href="/scientific-calculator"' in minecraft.data
    assert b'href="/calculator"' in minecraft.data
    access_guard = (Path(app.root_path) / "assets" / "access-guard.js").read_text(encoding="utf-8")
    assert 'window.addEventListener("pageshow", enforceStashAccess)' in access_guard
    assert client.get("/index.html").headers["Location"] == "/scientific-calculator"
    assert client.get("/game.html").headers["Location"] == "/graph-calculator"
    assert client.get("/admin.py").status_code == 404
    assert client.get("/templates/admin_panel.html").status_code == 404


def test_admin_login_dashboard_and_catalog_lock(client):
    assert client.get("/admin").headers["Location"] == "/admin/login"
    assert client.get("/api/admin/metrics").status_code == 401
    assert client.post("/api/admin/catalog-lock", json={"locked": True}).status_code == 401
    assert client.get("/api/catalog-lock").json == {"locked": False}

    login_page = client.get("/admin/login")
    csrf_token = re.search(rb'name="csrf_token" value="([^"]+)"', login_page.data).group(1).decode()
    failed_login = client.post(
        "/admin/login",
        data={"csrf_token": csrf_token, "password": "wrong"},
    )
    assert failed_login.status_code == 200
    assert b"Incorrect password." in failed_login.data

    login = client.post(
        "/admin/login",
        data={"csrf_token": csrf_token, "password": "admin44"},
    )
    assert login.status_code == 302
    assert login.headers["Location"] == "/admin/panel"

    dashboard = client.get("/admin/panel")
    assert dashboard.status_code == 200
    assert b"id=\"trafficChart\"" in dashboard.data
    assert b"id=\"catalogLockButton\"" in dashboard.data
    csrf_token = re.search(rb'name="csrf-token" content="([^"]+)"', dashboard.data).group(1).decode()
    metrics = client.get("/api/admin/metrics")
    assert metrics.status_code == 200
    assert len(metrics.json["samples"]) == 72

    locked = client.post(
        "/api/admin/catalog-lock",
        json={"locked": True},
        headers={"X-CSRF-Token": csrf_token},
    )
    assert locked.status_code == 200
    assert locked.json == {"locked": True}
    assert client.get("/api/catalog-lock").json == {"locked": True}
    assert client.post("/api/admin/catalog-lock", json={"locked": False}).status_code == 400

    unlocked = client.post(
        "/api/admin/catalog-lock",
        json={"locked": False},
        headers={"X-CSRF-Token": csrf_token},
    )
    assert unlocked.status_code == 200
    assert client.get("/api/catalog-lock").json == {"locked": False}
    assert client.post("/admin/logout").status_code == 400
    logout = client.post("/admin/logout", data={"csrf_token": csrf_token})
    assert logout.status_code == 302
    assert client.get("/api/admin/metrics").status_code == 401


def test_presence_counts_are_anonymous_and_bucketed(client):
    first_client = str(uuid.uuid4())
    second_client = str(uuid.uuid4())
    first = client.post("/api/presence", json={"clientId": first_client})
    second = client.post("/api/presence", json={"clientId": second_client})

    assert first.status_code == 200
    assert first.json["online"] >= 1
    assert second.json["online"] >= 2
    assert client.post("/api/presence", json={"clientId": "invalid"}).status_code == 400

    client.post("/api/presence/leave", json={"clientId": first_client})
    client.post("/api/presence/leave", json={"clientId": second_client})


def test_game_assets_are_served(client):
    assert client.get("/assets/minecraft.js").status_code == 200
    assert client.get("/assets/theme.js").status_code == 200
    assert client.get("/games/ALEX%20MODS%20-%20Space%20Waves.html").status_code == 200
    assert client.get("/games/game.txt").status_code == 200
    space_waves = client.get("/games/ALEX%20MODS%20-%20Space%20Waves.html").data
    assert b"<iframe" not in space_waves
    assert b"101games.io" not in space_waves
    for build_file in (
        "space-waves-3d.loader.js",
        "space-waves-3d.data",
        "space-waves-3d.framework.js",
        "space-waves-3d.wasm",
    ):
        response = client.get(f"/games/Space%20Waves/Build/{build_file}")
        assert response.status_code == 200
    catalog = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    assert catalog.startswith('\"use strict\";\n\nconst games = [\n    { title: "Space Waves"')
    assert 'icon: "👾"' in catalog
    assert 'description: "Guide a triangle through a neon course.' in catalog
    assert '{ title: "Drift Hunters"' in catalog
    catalog_page = client.get("/scientific-calculator")
    assert b"<strong>Space Waves</strong>" in catalog_page.data
    assert b"<strong>Drift Hunters</strong>" not in catalog_page.data
    slowroads = client.get("/games/ALEX%20MODS%20-%20Slowroads.io.html")
    assert slowroads.status_code == 200
    assert b'href="/slowroads/"' in slowroads.data
    assert b"Play Slow Roads" in slowroads.data
    assert b"<iframe" not in slowroads.data
    catalog = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    assert '{ title: "Slow Roads", path: "games/ALEX MODS - Slowroads.io.html"' in catalog
    assert 'externalUrl: "https://slowroads.io/"' not in catalog
    assert client.get("/games/2048/index.html").status_code == 200
    assert client.head("/120.epw").status_code == 200


def test_encrypted_youtube_uses_same_origin_catalog_api_and_official_embed(client):
    response = client.get("/games/ALEX%20MODS%20-%20Encrypted%20YouTube.html")
    assert response.status_code == 200
    assert b"ALEX MODS" in response.data
    assert b"youtube.com/iframe_api" in response.data
    assert b"alexYoutubeVolume" in response.data
    assert b"alexYoutubeMuted" in response.data
    assert b"/api/youtube/search" in response.data
    assert b"/api/youtube/suggestions" in response.data
    assert b"/api/youtube/thumbnail/" in response.data
    assert b"/api/youtube/shorts" in response.data
    assert b"/api/youtube/channel/" in response.data
    assert b"scroll-snap-type:y mandatory" in response.data
    assert b"data-view=\"shorts\"" in response.data
    assert b"body.shorts-mode{height:100dvh;min-height:0;overflow:hidden;}" in response.data
    assert b"body.shorts-mode .shorts-feed{display:flex;flex:1" in response.data
    assert b"viewport-fit=cover" in response.data
    assert b"Catalog data is served through ALEX MODS" in response.data
    assert b"assets/canonical-host.js" in response.data
    assert b"assets/canonical-host.js" in (
        Path(app.root_path) / "games" / "ALEX MODS - Encrypted YouTube.html"
    ).read_bytes()


def test_youtube_api_validates_inputs_and_reports_missing_server_key(client, monkeypatch):
    monkeypatch.delenv("YOUTUBE_API_KEY", raising=False)
    assert client.get("/api/youtube/search?q=x").status_code == 400
    assert client.get("/api/youtube/search?q=music").status_code == 503
    assert client.get("/api/youtube/video/not-a-valid-id").status_code == 400
    assert client.get("/api/youtube/video/abcdefghijk").status_code == 503
    assert client.get("/api/youtube/shorts").status_code == 503
    assert client.get("/api/youtube/channel/not-a-channel").status_code == 400
    assert client.get("/api/youtube/channel/not-a-channel/avatar").status_code == 400
    assert client.get("/api/youtube/suggestions?q=a").json == {"items": []}
    assert client.get("/api/youtube/thumbnail/not-a-valid-id").status_code == 400


def test_slow_roads_runs_from_local_assets(client):
    page = client.get("/slowroads/")
    conditional_page = client.get(
        "/slowroads/",
        headers={"If-Modified-Since": "Wed, 21 Oct 2015 07:28:00 GMT"},
    )
    javascript = client.get("/slowroads/_app/immutable/entry/start.4593a708.js")
    game_assets = client.get("/slowroads/_app/immutable/nodes/3.da2ad8c8.js")
    font = client.get("/slowroads/fonts/Sono.ttf")
    image = client.get("/slowroads/img/icon_steam.svg")
    manifest = client.get("/slowroads/manifest.json")
    service_worker = client.get("/slowroads/service-worker.js")

    assert page.status_code == 200
    assert conditional_page.status_code == 200
    assert b"Slow Roads" in page.data
    assert b"https://slowroads.io/" not in page.data
    assert b"cdn-cgi" not in page.data
    assert b"disableExternalLinks" in page.data
    assert b"/assets/presence.js" in page.data
    assert "connect-src 'self' data: blob:" in page.headers["Content-Security-Policy"]
    assert "connect-src 'none'" not in page.headers["Content-Security-Policy"]
    assert "navigate-to 'self'" in page.headers["Content-Security-Policy"]
    assert javascript.status_code == 200
    assert "connect-src 'self' data: blob:" in javascript.headers["Content-Security-Policy"]
    assert game_assets.status_code == 200
    assert b"/slowroads/img/" in game_assets.data
    assert font.status_code == 200
    assert image.status_code == 200
    assert manifest.status_code == 200
    assert service_worker.status_code == 200
    assert service_worker.data == b""
    assert client.get("/slowroads/img/letterbox-general.mp4").status_code == 204
    assert page.headers["Cross-Origin-Embedder-Policy"] == "require-corp"
    assert b'href="/slowroads/manifest.json"' in page.data
    assert client.get("/slowroads").headers["Location"] == "/slowroads/"
    assert client.get("/manifest.json").status_code == 404
    assert client.get("/service-worker.js").status_code == 404


def test_catalog_game_and_city_paths_are_served(client):
    source = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    game_paths = re.findall(r'path: "([^"]+)"', source)
    map_paths = re.findall(r'\["[^"]+", "([^"]+\.html)"\]', source)
    paths = game_paths + [f"games/Subway Surfers/{path}" for path in map_paths]

    assert len(game_paths) == 25
    assert len(map_paths) == 8
    for path in paths:
        response = client.head("/" + quote(path, safe="/"))
        assert response.status_code == 200, path


def test_routes_are_static_only():
    rules = {rule.rule for rule in app.url_map.iter_rules()}

    assert rules == {
        "/",
        "/calculator",
        "/calculator.html",
        "/scientific-calculator",
        "/graph-calculator",
        "/games/ALEX MODS - Encrypted YouTube.html",
        "/api/youtube/search",
        "/api/youtube/shorts",
        "/api/youtube/channel/<channel_id>",
        "/api/youtube/channel/<channel_id>/avatar",
        "/api/youtube/video/<video_id>",
        "/api/youtube/suggestions",
        "/api/youtube/thumbnail/<video_id>",
        "/admin/login",
        "/admin",
        "/admin/panel",
        "/admin/logout",
        "/api/catalog-lock",
        "/api/presence",
        "/api/presence/leave",
        "/api/admin/metrics",
        "/api/admin/catalog-lock",
        "/slowroads",
        "/slowroads/",
        "/slowroads/_app/<path:resource>",
        "/slowroads/alea.min.js",
        "/slowroads/service-worker.js",
        "/slowroads/favicon.svg",
        "/slowroads/icon.svg",
        "/slowroads/apple-touch-icon.png",
        "/slowroads/fonts/<path:resource>",
        "/slowroads/img/<path:resource>",
        "/slowroads/manifest.json",
        "/<path:resource>",
    }

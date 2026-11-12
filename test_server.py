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
        yield test_client


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
    assert b"Entering the arcade" in response.data
    calculator_js = (Path(app.root_path) / "assets" / "calculator.js").read_text(encoding="utf-8")
    assert '"6942024421"' in calculator_js
    assert b"scientific-calculator" not in response.data
    swatches = re.findall(rb'data-theme="([^"]+)" data-rgb="[^"]+" data-tooltip="([^"]+)"', response.data)
    assert swatches == [
        (b"#9500ff", b"Default"),
        (b"#ff3b4f", b"Red"),
        (b"#ff8a00", b"Orange"),
        (b"#ffd43b", b"Yellow"),
        (b"#00c781", b"Green"),
        (b"#1687ff", b"Blue"),
        (b"#7136f2", b"Purple"),
    ]


def test_catalog_and_minecraft_use_gated_routes(client):
    catalog = client.get("/scientific-calculator")
    minecraft = client.get("/graph-calculator")

    assert catalog.status_code == 200
    assert b"assets/access-guard.js" in catalog.data
    assert b"assets/catalog-lock.js" in catalog.data
    assert b"assets/presence.js" in catalog.data
    assert b"ALEX MODS was locked by an Administrator." in catalog.data
    assert b'href="/graph-calculator"' in catalog.data
    assert minecraft.status_code == 200
    assert b"assets/access-guard.js" in minecraft.data
    assert b'href="/scientific-calculator"' in minecraft.data
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
    slowroads = client.get("/games/ALEX%20MODS%20-%20Slowroads.io.html")
    assert slowroads.status_code == 200
    assert b'href="/?localSlowRoads=1"' in slowroads.data
    assert b"Play Slow Roads" in slowroads.data
    assert b"<iframe" not in slowroads.data
    catalog = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    assert '{ title: "Slow Roads", path: "games/ALEX MODS - Slowroads.io.html"' in catalog
    assert 'externalUrl: "https://slowroads.io/"' not in catalog
    assert client.get("/games/2048/index.html").status_code == 200
    assert client.head("/120.epw").status_code == 200


def test_slow_roads_runs_from_local_assets(client):
    page = client.get("/?localSlowRoads=1")
    conditional_page = client.get(
        "/?localSlowRoads=1",
        headers={"If-Modified-Since": "Wed, 21 Oct 2015 07:28:00 GMT"},
    )
    javascript = client.get("/_app/immutable/entry/start.4593a708.js")
    font = client.get("/fonts/Sono.ttf")
    image = client.get("/img/icon_steam.svg")
    manifest = client.get("/manifest.json")
    service_worker = client.get("/service-worker.js")

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
    assert font.status_code == 200
    assert image.status_code == 200
    assert manifest.status_code == 200
    assert service_worker.status_code == 200
    assert service_worker.data == b""
    assert client.get("/img/letterbox-general.mp4").status_code == 204
    assert page.headers["Cross-Origin-Embedder-Policy"] == "require-corp"
    assert client.get("/slowroads").headers["Location"] == "/?localSlowRoads=1"
    assert client.get("/slowroads/").headers["Location"] == "/?localSlowRoads=1"


def test_catalog_game_and_city_paths_are_served(client):
    source = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    game_paths = re.findall(r'path: "([^"]+)"', source)
    map_paths = re.findall(r'\["[^"]+", "([^"]+\.html)"\]', source)
    paths = game_paths + [f"games/Subway Surfers/{path}" for path in map_paths]

    assert len(game_paths) == 23
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
        "/_app/<path:resource>",
        "/alea.min.js",
        "/service-worker.js",
        "/favicon.svg",
        "/icon.svg",
        "/apple-touch-icon.png",
        "/fonts/<path:resource>",
        "/img/<path:resource>",
        "/manifest.json",
        "/<path:resource>",
    }

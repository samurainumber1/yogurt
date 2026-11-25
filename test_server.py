import io
import re
import uuid
from datetime import datetime, timezone
from html import escape
from pathlib import Path
from urllib.parse import quote

import pytest

import server
from server import app


class FakeR2Body(io.BytesIO):
    def iter_chunks(self, chunk_size):
        while True:
            chunk = self.read(chunk_size)
            if not chunk:
                return
            yield chunk


class FakeR2Client:
    objects = {
        "games/ALEX MODS - Space Waves.html": (
            b"<!doctype html><html><head><title>Space Waves</title></head>"
            b"<body>Space Waves</body></html>"
        ),
        "games/ALEX MODS - Encrypted YouTube.html": (
            b"ALEX MODS youtube.com/iframe_api alexYoutubeVolume alexYoutubeMuted "
            b"/api/youtube/search /api/youtube/suggestions /api/youtube/thumbnail/ "
            b"/api/youtube/shorts /api/youtube/channel/ scroll-snap-type:y mandatory "
            b'data-view="shorts" body.shorts-mode{height:100dvh;min-height:0;overflow:hidden;} '
            b"body.shorts-mode .shorts-feed{display:flex;flex:1 viewport-fit=cover "
            b"Catalog data is served through ALEX MODS assets/canonical-host.js"
        ),
        "games/ALEX MODS - Slowroads.io.html": (
            b'<a href="/slowroads/">Play Slow Roads</a>'
        ),
        "games/Slow Roads/index.html": (
            b'<!doctype html><html><head><title>Slow Roads</title>'
            b'<link rel="manifest" href="/slowroads/manifest.json">'
            b"</head><body></body></html>"
        ),
        "games/Slow Roads/_app/immutable/nodes/3.da2ad8c8.js": b"/slowroads/img/",
        "games/Slow Roads/img/icon_steam.svg": b"<svg></svg>",
        "games/Slow Roads/manifest.json": b"{}",
        "games/game.txt": b"",
        "screenshots/Spacewaves.png": b"test screenshot",
    }

    def __init__(self):
        self.requested_keys = []

    def _object(self, key):
        return self.objects.get(key, b"test game asset")

    def head_object(self, Bucket, Key):
        self.requested_keys.append(Key)
        content = self._object(Key)
        return {
            "ContentLength": len(content),
            "ContentType": self._content_type(Key),
            "ETag": '"local-test-etag"',
            "LastModified": datetime.now(timezone.utc),
        }

    def get_object(self, Bucket, Key, Range=None):
        self.requested_keys.append(Key)
        content = self._object(Key)
        status = 200
        response = {}
        if Range:
            start_text, end_text = Range.removeprefix("bytes=").split("-", 1)
            start = int(start_text)
            end = int(end_text) if end_text else len(content) - 1
            content = content[start : end + 1]
            response["ContentRange"] = f"bytes {start}-{end}/{len(self._object(Key))}"
            status = 206
        return {
            "Body": FakeR2Body(content),
            "ContentLength": len(content),
            "ContentType": self._content_type(Key),
            "ETag": '"local-test-etag"',
            "LastModified": datetime.now(timezone.utc),
            "ResponseMetadata": {"HTTPStatusCode": status},
            **response,
        }

    @staticmethod
    def _content_type(key):
        if key.endswith(".html"):
            return "text/html"
        if key.endswith(".js"):
            return "application/javascript"
        if key.endswith(".json"):
            return "application/json"
        if key.endswith(".svg"):
            return "image/svg+xml"
        if key.endswith(".png"):
            return "image/png"
        return "application/octet-stream"


@pytest.fixture
def client(monkeypatch):
    app.config["TESTING"] = True
    app.config["ADMIN_PASSWORD"] = "test-only-admin-password"
    r2_client = FakeR2Client()
    monkeypatch.setattr(server, "_r2_client", lambda: r2_client)
    with app.test_client() as test_client:
        test_client.environ_base["HTTP_HOST"] = "yogurt-ws0r.onrender.com"
        test_client.r2_client = r2_client
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


def test_root_opens_calculator(client):
    response = client.get("/")

    assert response.status_code == 302
    assert response.headers["Location"] == "/calculator"


def test_calculator_is_the_only_default_page(client):
    response = client.get("/calculator")

    assert response.status_code == 200
    assert b"assets/calculator.js" in response.data
    assert b"assets/catalog.js" not in response.data
    assert b"id=\"themeTrigger\"" not in response.data
    assert b"id=\"unlockTransition\"" not in response.data
    assert b"Alex Mods" not in response.data
    assert len(server.STUDY_TOOLS) == 25
    assert len(server.STUDY_TOOLS) - 4 == 21
    assert b'id="toolForm"' not in response.data
    for slug, tool in server.STUDY_TOOLS.items():
        assert f'href="/tools/{slug}"'.encode() in response.data
        assert escape(tool["title"]).encode() in response.data
    assert b'id="study-tools"' in response.data
    assert b'id="about"' in response.data
    assert b"Open the calculator" in response.data
    assert b"class=\"quick-facts\"" in response.data
    calculator_css = (Path(app.root_path) / "assets" / "calculator.css").read_text(encoding="utf-8")
    assert "color-scheme: light" in calculator_css
    assert "transition:" not in calculator_css
    assert "animation:" not in calculator_css
    calculator_js = (Path(app.root_path) / "assets" / "calculator.js").read_text(encoding="utf-8")
    assert '"6942024421"' in calculator_js
    assert 'sessionStorage.removeItem("arcadeUnlocked")' in calculator_js
    assert 'window.location.assign("/scientific-calculator")' in calculator_js
    assert "setTimeout" not in calculator_js
    assert b"scientific-calculator" not in response.data


def test_study_tool_pages_open_from_homepage_links(client):
    for slug, tool in server.STUDY_TOOLS.items():
        response = client.get(f"/tools/{slug}")
        assert response.status_code == 200
        assert escape(tool["title"]).encode() in response.data
        assert b"assets/study-tools.js" in response.data
        assert f'data-tool="{tool["kind"]}"'.encode() in response.data
        assert response.data.count(b'data-field="') == len(tool["fields"])

    assert client.get("/tools/not-a-tool").status_code == 404


def test_catalog_is_gated_and_minecraft_1206_is_removed(client):
    catalog = client.get("/scientific-calculator")

    assert catalog.status_code == 200
    assert b"assets/access-guard.js" in catalog.data
    assert b"assets/catalog-lock.js" in catalog.data
    assert b"assets/presence.js" in catalog.data
    assert b"ALEX MODS was locked by an Administrator." in catalog.data
    assert b"graph-calculator" not in catalog.data
    assert b"Minecraft 1.20.6" not in catalog.data
    assert b'href="/calculator"' in catalog.data
    access_guard = (Path(app.root_path) / "assets" / "access-guard.js").read_text(encoding="utf-8")
    assert 'window.addEventListener("pageshow", enforceStashAccess)' in access_guard
    assert "/graph-calculator" not in access_guard
    assert "/game.html" not in access_guard
    assert client.get("/index.html").headers["Location"] == "/scientific-calculator"
    assert client.get("/graph-calculator").status_code == 404
    assert client.get("/game.html").status_code == 404
    assert client.head("/120.epw").status_code == 404
    assert client.get("/assets/minecraft.js").status_code == 404
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
        data={"csrf_token": csrf_token, "password": "test-only-admin-password"},
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
    assert catalog.startswith('\"use strict\";\n\nlet editableGameNames = {};')
    assert 'icon: "👾"' in catalog
    assert 'description: "Guide a triangle through a neon course.' in catalog
    assert '{ title: "Drift Hunters"' in catalog
    catalog_page = client.get("/scientific-calculator")
    assert b"assets/catalog.js" in catalog_page.data
    assert '{ title: "Space Waves"' in catalog
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


def test_game_files_and_screenshots_are_proxied_from_r2(client):
    response = client.get("/games/ALEX%20MODS%20-%20Space%20Waves.html")
    screenshot = client.get("/screenshots/Spacewaves.png")

    assert response.status_code == 200
    assert b"Space Waves" in response.data
    assert response.headers["Cache-Control"] == "public, max-age=3600"
    assert response.headers["Accept-Ranges"] == "bytes"
    assert screenshot.status_code == 200
    assert screenshot.data == b"test screenshot"

    range_response = client.get(
        "/games/ALEX%20MODS%20-%20Space%20Waves.html",
        headers={"Range": "bytes=0-9"},
    )
    assert range_response.status_code == 206
    assert len(range_response.data) == 10
    assert range_response.headers["Content-Range"].startswith("bytes 0-9/")


def test_calculator_and_catalog_stay_local_while_game_files_use_r2(client):
    assert client.get("/calculator").status_code == 200
    assert client.get("/scientific-calculator").status_code == 200
    assert client.r2_client.requested_keys == []

    assert client.get("/games/ALEX%20MODS%20-%20Space%20Waves.html").status_code == 200
    assert client.r2_client.requested_keys == ["games/ALEX MODS - Space Waves.html"]


def test_r2_game_route_fails_closed_without_server_credentials(client, monkeypatch):
    def missing_credentials():
        raise RuntimeError("R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be configured.")

    monkeypatch.setattr(server, "_r2_client", missing_credentials)

    response = client.get("/games/ALEX%20MODS%20-%20Space%20Waves.html")

    assert response.status_code == 503
    assert b"R2_ACCESS_KEY_ID" not in response.data


def test_r2_client_uses_server_environment_variables(monkeypatch):
    calls = []
    expected_client = object()

    def create_client(service, **options):
        calls.append((service, options))
        return expected_client

    monkeypatch.setenv("R2_ACCESS_KEY_ID", "test-access-key")
    monkeypatch.setenv("R2_SECRET_ACCESS_KEY", "test-secret-key")
    monkeypatch.setattr(server.boto3, "client", create_client)
    server._r2_client.cache_clear()

    try:
        assert server._r2_client() is expected_client
    finally:
        server._r2_client.cache_clear()

    assert calls == [
        (
            "s3",
            {
                "endpoint_url": server.R2_ENDPOINT_URL,
                "region_name": "auto",
                "aws_access_key_id": "test-access-key",
                "aws_secret_access_key": "test-secret-key",
            },
        )
    ]


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

    assert game_paths
    assert len(map_paths) == 8
    for path in paths:
        response = client.head("/" + quote(path, safe="/"))
        assert response.status_code == 200, path


def test_routes_are_explicit():
    rules = {rule.rule for rule in app.url_map.iter_rules()}

    assert rules == {
        "/",
        "/calculator",
        "/calculator.html",
        "/tools/<tool_slug>",
        "/scientific-calculator",
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
        "/api/admin/announcement",
        "/api/admin/poll",
        "/api/announcement",
        "/api/poll",
        "/api/poll/vote",
        "/game.txt",
        "/setting.txt",
        "/space-waves",
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

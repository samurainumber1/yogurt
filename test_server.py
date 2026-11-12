import re
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
    assert b"themePicker" in response.data
    assert b"scientific-calculator" not in response.data
    assert b'value="#9500ff"' in response.data


def test_catalog_and_minecraft_use_gated_routes(client):
    catalog = client.get("/scientific-calculator")
    minecraft = client.get("/graph-calculator")

    assert catalog.status_code == 200
    assert b"assets/access-guard.js" in catalog.data
    assert b'href="/graph-calculator"' in catalog.data
    assert minecraft.status_code == 200
    assert b"assets/access-guard.js" in minecraft.data
    assert b'href="/scientific-calculator"' in minecraft.data
    assert client.get("/index.html").headers["Location"] == "/scientific-calculator"
    assert client.get("/game.html").headers["Location"] == "/graph-calculator"


def test_game_assets_are_served(client):
    assert client.get("/assets/minecraft.js").status_code == 200
    assert client.get("/assets/theme.js").status_code == 200
    assert client.get("/games/2048/index.html").status_code == 200
    assert client.head("/120.epw").status_code == 200


def test_catalog_game_and_city_paths_are_served(client):
    source = (Path(app.root_path) / "assets" / "catalog.js").read_text(encoding="utf-8")
    game_paths = re.findall(r'path: "([^"]+)"', source)
    map_paths = re.findall(r'\["[^"]+", "([^"]+\.html)"\]', source)
    paths = game_paths + [f"games/Subway Surfers/{path}" for path in map_paths]

    assert len(game_paths) == 22
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
        "/<path:resource>",
    }

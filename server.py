import os
from pathlib import Path

from flask import Flask, abort, redirect, send_from_directory


PROJECT_ROOT = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=None)


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


@app.get("/<path:resource>")
def public_file(resource):
    parts = Path(resource).parts
    if any(part.startswith(".") for part in parts) or resource in {"server.py", "requirements.txt"}:
        abort(404)
    if resource == "index.html":
        return redirect("/scientific-calculator")
    if resource == "game.html":
        return redirect("/graph-calculator")
    return send_from_directory(str(PROJECT_ROOT), resource)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))

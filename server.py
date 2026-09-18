from __future__ import annotations

import json
import os
import uuid
from datetime import datetime, timedelta

import gspread
from flask import Flask, jsonify, request, send_from_directory, session
from google.oauth2 import service_account

app = Flask(__name__)
app.config["SECRET_KEY"] = "alex-mods-admin-session-key"
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)

SPREADSHEET_ID = os.environ.get(
    "GOOGLE_SHEET_ID",
    "1T4DciphsegofgX7ipoYAE0AHHCMzQC9luWFnHewcRGI",
)
SHEET_HEADERS = ["username", "password", "role", "created_at"]

USERS = {}
CONNECTED_CLIENTS = {}


def now_iso():
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def get_service_account_info():
    api_key = os.environ.get("API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if api_key:
        app.logger.info("Using host-provided API key environment variable for Google access.")
        return api_key

    candidate_names = [
        "GOOGLE_SERVICE_ACCOUNT_JSON",
        "GOOGLE_CREDENTIALS_JSON",
        "SERVICE_ACCOUNT_JSON",
        "GOOGLE_APPLICATION_CREDENTIALS",
    ]

    for name in candidate_names:
        raw = os.environ.get(name)
        if not raw:
            continue
        raw = raw.strip()
        if not raw:
            continue
        if raw.startswith("{"):
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                pass
        if os.path.exists(raw):
            try:
                with open(raw, "r", encoding="utf-8") as handle:
                    return json.load(handle)
            except OSError:
                pass
    return None


def get_sheet_worksheet():
    credentials_info = get_service_account_info()
    if not credentials_info:
        app.logger.warning("No Google Sheets credentials configured in the host environment. Using in-memory fallback only.")
        return None

    try:
        if isinstance(credentials_info, str):
            app.logger.warning("API key is set, but this app requires the service account JSON for Google Sheets access; local runtime will continue with fallback mode.")
            return None

        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=["https://www.googleapis.com/auth/spreadsheets"],
        )
        client = gspread.authorize(credentials)
        spreadsheet = client.open_by_key(SPREADSHEET_ID)
        return spreadsheet.get_worksheet(0)
    except Exception as exc:  # pragma: no cover - runtime integration path
        app.logger.warning("Google Sheets connection failed: %s", exc)
        return None


def save_users():
    sheet = get_sheet_worksheet()
    if sheet is None:
        return False

    rows = [SHEET_HEADERS]
    for username, user in sorted(USERS.items()):
        rows.append([
            user.get("username", username),
            user.get("password", ""),
            user.get("role", "user"),
            user.get("created_at", now_iso()),
        ])

    try:
        sheet.clear()
        sheet.append_rows(rows)
        return True
    except Exception as exc:  # pragma: no cover - runtime integration path
        app.logger.warning("Could not save users to Google Sheets: %s", exc)
        return False


def ensure_admin_account():
    if "Admin" not in USERS:
        USERS["Admin"] = {
            "username": "Admin",
            "password": "hRd9ZfES",
            "role": "admin",
            "created_at": now_iso(),
        }
    else:
        USERS["Admin"]["username"] = "Admin"
        USERS["Admin"]["password"] = "hRd9ZfES"
        USERS["Admin"]["role"] = "admin"
        USERS["Admin"]["created_at"] = USERS["Admin"].get("created_at", now_iso())
    save_users()


def load_users():
    global USERS
    USERS = {}

    sheet = get_sheet_worksheet()
    if sheet is None:
        ensure_admin_account()
        return

    try:
        values = sheet.get_all_values()
        if not values:
            ensure_admin_account()
            return

        header = [str(value).strip().lower() for value in values[0]]
        if header != [str(item).strip().lower() for item in SHEET_HEADERS]:
            sheet.clear()
            sheet.append_row(SHEET_HEADERS)
            values = [SHEET_HEADERS]

        for row in values[1:]:
            if not row or len(row) < 4:
                continue
            username = (row[0] or "").strip()
            password = row[1] if len(row) > 1 else ""
            role = row[2] if len(row) > 2 else "user"
            created_at = row[3] if len(row) > 3 else now_iso()
            if not username:
                continue
            USERS[username] = {
                "username": username,
                "password": password,
                "role": role,
                "created_at": created_at,
            }

        ensure_admin_account()
    except Exception as exc:  # pragma: no cover - runtime integration path
        app.logger.warning("Could not read users from Google Sheets: %s", exc)
        ensure_admin_account()


load_users()


def sanitize_user(user):
    return {
        "username": user["username"],
        "role": user.get("role", "user"),
        "created_at": user.get("created_at"),
    }


def current_username():
    return session.get("username")


def current_user():
    username = current_username()
    if not username:
        return None
    return USERS.get(username)


def ensure_client_record(username=None):
    client_id = session.get("client_id")
    if not client_id:
        client_id = uuid.uuid4().hex
        session["client_id"] = client_id

    record = CONNECTED_CLIENTS.setdefault(
        client_id,
        {
            "client_id": client_id,
            "username": username,
            "role": "user",
            "page": "unknown",
            "connected": True,
            "last_seen": now_iso(),
            "messages": [],
        },
    )

    if username:
        record["username"] = username
        record["role"] = USERS.get(username, {}).get("role", "user")

    record["connected"] = True
    record["last_seen"] = now_iso()
    return client_id, record


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/admin")
@app.route("/admin.html")
def admin_page():
    return send_from_directory(".", "admin.html")


@app.route("/<path:path>")
def files(path):
    return send_from_directory(".", path)


@app.route("/api/session", methods=["GET"])
def session_status():
    user = current_user()
    if not user:
        return jsonify({"authenticated": False, "guest": True})
    return jsonify({"authenticated": True, "guest": False, "user": sanitize_user(user)})


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    if len(username) < 3:
        return jsonify({"success": False, "message": "Username must be at least 3 characters."}), 400
    if len(password) < 6:
        return jsonify({"success": False, "message": "Password must be at least 6 characters."}), 400
    if username.lower() in {key.lower() for key in USERS}:
        return jsonify({"success": False, "message": "That username is already in use."}), 409

    user = {
        "username": username,
        "password": password,
        "role": "user",
        "created_at": now_iso(),
    }
    USERS[username] = user
    save_users()
    session["username"] = username
    session.permanent = True
    ensure_client_record(username)

    return jsonify({"success": True, "user": sanitize_user(user)})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    user = USERS.get(username)
    if not user or user["password"] != password:
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

    session["username"] = username
    session.permanent = True
    ensure_client_record(username)

    return jsonify({"success": True, "user": sanitize_user(user)})


@app.route("/api/logout", methods=["POST"])
def logout():
    username = current_username()
    if username:
        client_id = session.get("client_id")
        if client_id and client_id in CONNECTED_CLIENTS:
            CONNECTED_CLIENTS[client_id]["connected"] = False
            CONNECTED_CLIENTS[client_id]["status"] = "logged out"
    session.clear()
    return jsonify({"success": True})


@app.route("/api/client/heartbeat", methods=["POST"])
def client_heartbeat():
    user = current_user()
    if not user:
        return jsonify({"success": False, "message": "Not authenticated."}), 401

    data = request.get_json(silent=True) or {}
    page = (data.get("page") or "unknown").strip() or "unknown"
    client_id, record = ensure_client_record(user["username"])
    record["page"] = page
    record["role"] = user.get("role", "user")

    if not record.get("connected", True):
        return jsonify({"success": False, "message": "Your session has been disconnected by an admin.", "disconnected": True})

    pending_messages = record.get("messages", [])
    if pending_messages:
        record["messages"] = []

    return jsonify(
        {
            "success": True,
            "client": {
                "client_id": client_id,
                "username": record["username"],
                "role": record["role"],
                "page": record["page"],
                "connected": record["connected"],
                "last_seen": record["last_seen"],
            },
            "messages": pending_messages,
        }
    )


@app.route("/api/admin/clients", methods=["GET"])
def admin_clients():
    user = current_user()
    if not user or user.get("role") != "admin":
        return jsonify({"success": False, "message": "Admin access required."}), 403

    clients = []
    for client in CONNECTED_CLIENTS.values():
        clients.append(
            {
                "client_id": client["client_id"],
                "username": client.get("username", "unknown"),
                "role": client.get("role", "user"),
                "page": client.get("page", "unknown"),
                "connected": client.get("connected", True),
                "last_seen": client.get("last_seen"),
            }
        )

    return jsonify({"success": True, "clients": sorted(clients, key=lambda item: item["username"])})


@app.route("/api/admin/disconnect", methods=["POST"])
def admin_disconnect():
    user = current_user()
    if not user or user.get("role") != "admin":
        return jsonify({"success": False, "message": "Admin access required."}), 403

    data = request.get_json(silent=True) or {}
    client_id = data.get("client_id")
    if not client_id or client_id not in CONNECTED_CLIENTS:
        return jsonify({"success": False, "message": "Client not found."}), 404

    target = CONNECTED_CLIENTS[client_id]
    target["connected"] = False
    target["status"] = "disconnected_by_admin"
    target["messages"].append(
        {
            "from": "Admin",
            "text": "Your session has been disconnected by an administrator.",
            "type": "warning",
        }
    )

    return jsonify({"success": True, "message": f"Disconnected {target.get('username', 'client')}."})


@app.route("/api/admin/message", methods=["POST"])
def admin_message():
    user = current_user()
    if not user or user.get("role") != "admin":
        return jsonify({"success": False, "message": "Admin access required."}), 403

    data = request.get_json(silent=True) or {}
    client_id = data.get("client_id")
    message = (data.get("message") or "").strip()

    if not client_id or client_id not in CONNECTED_CLIENTS:
        return jsonify({"success": False, "message": "Client not found."}), 404
    if not message:
        return jsonify({"success": False, "message": "Message cannot be empty."}), 400

    record = CONNECTED_CLIENTS[client_id]
    record["messages"].append(
        {
            "from": "Admin",
            "text": message,
            "type": "info",
        }
    )

    return jsonify({"success": True, "message": f"Sent message to {record.get('username', 'client')}."})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)

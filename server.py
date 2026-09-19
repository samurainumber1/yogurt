from __future__ import annotations

import os
import uuid
from datetime import datetime, timedelta
from collections import defaultdict

import gspread
from flask import Flask, jsonify, request, send_from_directory, session
from google.oauth2 import service_account
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get(
    "FLASK_SECRET_KEY",
    "change-this-secret-key",
)

app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)


# ============================================================
# GOOGLE SHEETS
# ============================================================

SPREADSHEET_ID = os.environ.get(
    "GOOGLE_SHEET_ID",
    "1T4DciphsegofgX7ipoYAE0AHHCMzQC9luWFnHewcRGI",
)


USER_HEADERS = [
    "username",
    "password_hash",
    "role",
    "verified",
    "created_at",
]

SERVER_HEADERS = [
    "server_id",
    "name",
    "owner",
    "verified",
    "created_at",
]

CHANNEL_HEADERS = [
    "channel_id",
    "server_id",
    "name",
]

MESSAGE_HEADERS = [
    "message_id",
    "server_id",
    "channel",
    "sender",
    "text",
    "created_at",
]

DM_HEADERS = [
    "message_id",
    "sender",
    "recipient",
    "text",
    "created_at",
]


# ============================================================
# MEMORY STATE
# ============================================================

USERS = {}

CONNECTED_CLIENTS = {}

DISCORD_SERVERS = {}

DISCORD_MESSAGES = []

DISCORD_DMS = []


# ============================================================
# HELPERS
# ============================================================

def now_iso():
    return (
        datetime.utcnow()
        .replace(microsecond=0)
        .isoformat()
        + "Z"
    )


def get_service_account_info():
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
                import json

                return json.loads(raw)
            except Exception:
                continue

        if os.path.exists(raw):
            try:
                import json

                with open(
                    raw,
                    "r",
                    encoding="utf-8",
                ) as handle:
                    return json.load(handle)

            except Exception:
                continue

    return None


def get_spreadsheet():
    credentials_info = get_service_account_info()

    if not credentials_info:
        app.logger.warning(
            "Google credentials not configured. "
            "Using memory-only mode."
        )
        return None

    try:
        credentials = (
            service_account
            .Credentials
            .from_service_account_info(
                credentials_info,
                scopes=[
                    "https://www.googleapis.com/auth/spreadsheets"
                ],
            )
        )

        client = gspread.authorize(credentials)

        return client.open_by_key(
            SPREADSHEET_ID
        )

    except Exception as exc:
        app.logger.warning(
            "Google Sheets error: %s",
            exc,
        )

        return None


def get_or_create_sheet(
    name,
    headers,
):
    spreadsheet = get_spreadsheet()

    if spreadsheet is None:
        return None

    try:
        try:
            sheet = spreadsheet.worksheet(name)

        except gspread.WorksheetNotFound:
            sheet = spreadsheet.add_worksheet(
                title=name,
                rows=1000,
                cols=max(10, len(headers)),
            )

        values = sheet.get_all_values()

        if not values:
            sheet.append_row(headers)

        return sheet

    except Exception as exc:
        app.logger.warning(
            "Could not access sheet %s: %s",
            name,
            exc,
        )

        return None


# ============================================================
# USER SYSTEM
# ============================================================

def sanitize_user(user):
    return {
        "username": user["username"],
        "role": user.get(
            "role",
            "user",
        ),
        "verified": bool(
            user.get(
                "verified",
                False,
            )
        ),
        "created_at": user.get(
            "created_at"
        ),
    }


def save_users():
    sheet = get_or_create_sheet(
        "Users",
        USER_HEADERS,
    )

    if sheet is None:
        return False

    try:
        rows = [USER_HEADERS]

        for username, user in sorted(
            USERS.items(),
            key=lambda x: x[0].lower(),
        ):
            rows.append(
                [
                    username,
                    user.get(
                        "password_hash",
                        "",
                    ),
                    user.get(
                        "role",
                        "user",
                    ),
                    str(
                        bool(
                            user.get(
                                "verified",
                                False,
                            )
                        )
                    ).lower(),
                    user.get(
                        "created_at",
                        now_iso(),
                    ),
                ]
            )

        sheet.clear()
        sheet.append_rows(rows)

        return True

    except Exception as exc:
        app.logger.warning(
            "Could not save users: %s",
            exc,
        )

        return False


def ensure_admin():
    if "Admin" not in USERS:
        USERS["Admin"] = {
            "username": "Admin",
            "password_hash": generate_password_hash(
                "hRd9ZfES"
            ),
            "role": "admin",
            "verified": True,
            "created_at": now_iso(),
        }

        save_users()

        return

    USERS["Admin"]["role"] = "admin"
    USERS["Admin"]["verified"] = True


def load_users():
    global USERS

    USERS = {}

    sheet = get_or_create_sheet(
        "Users",
        USER_HEADERS,
    )

    if sheet is None:
        ensure_admin()
        return

    try:
        values = sheet.get_all_values()

        if len(values) <= 1:
            ensure_admin()
            save_users()
            return

        headers = [
            x.strip().lower()
            for x in values[0]
        ]

        # Support the old format too.
        old_format = headers[:4] == [
            "username",
            "password",
            "role",
            "created_at",
        ]

        for row in values[1:]:
            if not row:
                continue

            username = (
                row[0].strip()
                if len(row) > 0
                else ""
            )

            if not username:
                continue

            if old_format:
                password = (
                    row[1]
                    if len(row) > 1
                    else ""
                )

                # Upgrade plaintext passwords.
                password_hash = (
                    password
                    if password.startswith(
                        "scrypt:"
                    )
                    or password.startswith(
                        "pbkdf2:"
                    )
                    else generate_password_hash(
                        password
                    )
                )

                role = (
                    row[2]
                    if len(row) > 2
                    else "user"
                )

                created_at = (
                    row[3]
                    if len(row) > 3
                    else now_iso()
                )

                verified = role in {
                    "admin",
                    "dev",
                    "verified",
                }

            else:
                password_hash = (
                    row[1]
                    if len(row) > 1
                    else ""
                )

                role = (
                    row[2]
                    if len(row) > 2
                    else "user"
                )

                verified_value = (
                    row[3]
                    if len(row) > 3
                    else "false"
                )

                verified = (
                    verified_value.lower()
                    == "true"
                )

                created_at = (
                    row[4]
                    if len(row) > 4
                    else now_iso()
                )

            USERS[username] = {
                "username": username,
                "password_hash": password_hash,
                "role": role,
                "verified": verified,
                "created_at": created_at,
            }

        ensure_admin()
        save_users()

    except Exception as exc:
        app.logger.warning(
            "Could not load users: %s",
            exc,
        )

        ensure_admin()


# ============================================================
# AUTH
# ============================================================

def current_username():
    return session.get("username")


def current_user():
    username = current_username()

    if not username:
        return None

    return USERS.get(username)


def require_login():
    user = current_user()

    if not user:
        return None, (
            jsonify(
                {
                    "success": False,
                    "message": "You must be signed in.",
                }
            ),
            401,
        )

    return user, None


def require_admin():
    user = current_user()

    if not user:
        return None, (
            jsonify(
                {
                    "success": False,
                    "message": "You must be signed in.",
                }
            ),
            401,
        )

    if user.get("role") != "admin":
        return None, (
            jsonify(
                {
                    "success": False,
                    "message": "Admin access required.",
                }
            ),
            403,
        )

    return user, None


# ============================================================
# CLIENT PRESENCE
# ============================================================

def ensure_client_record(username=None):
    client_id = session.get(
        "client_id"
    )

    if not client_id:
        client_id = uuid.uuid4().hex

        session["client_id"] = client_id

    record = CONNECTED_CLIENTS.setdefault(
        client_id,
        {
            "client_id": client_id,
            "username": username,
            "role": "user",
            "connected": True,
            "last_seen": now_iso(),
            "page": "unknown",
            "messages": [],
        },
    )

    if username:
        record["username"] = username

        record["role"] = USERS.get(
            username,
            {},
        ).get(
            "role",
            "user",
        )

    record["connected"] = True
    record["last_seen"] = now_iso()

    return client_id, record


def is_online(username):
    cutoff = (
        datetime.utcnow()
        - timedelta(seconds=20)
    )

    for client in CONNECTED_CLIENTS.values():

        if (
            client.get("username")
            != username
        ):
            continue

        if not client.get(
            "connected",
            True,
        ):
            continue

        try:
            stamp = client.get(
                "last_seen",
                "",
            ).replace(
                "Z",
                "",
            )

            timestamp = datetime.fromisoformat(
                stamp
            )

            if timestamp >= cutoff:
                return True

        except Exception:
            return True

    return False


# ============================================================
# DISCORD PERSISTENCE
# ============================================================

def save_discord_servers():
    sheet = get_or_create_sheet(
        "Servers",
        SERVER_HEADERS,
    )

    if sheet is None:
        return False

    try:
        rows = [SERVER_HEADERS]

        for server in DISCORD_SERVERS.values():
            rows.append(
                [
                    server["id"],
                    server["name"],
                    server["owner"],
                    str(
                        bool(
                            server.get(
                                "verified",
                                False,
                            )
                        )
                    ).lower(),
                    server.get(
                        "created_at",
                        now_iso(),
                    ),
                ]
            )

        sheet.clear()
        sheet.append_rows(rows)

        return True

    except Exception as exc:
        app.logger.warning(
            "Could not save servers: %s",
            exc,
        )

        return False


def save_discord_channels():
    sheet = get_or_create_sheet(
        "Channels",
        CHANNEL_HEADERS,
    )

    if sheet is None:
        return False

    try:
        rows = [CHANNEL_HEADERS]

        for server in DISCORD_SERVERS.values():

            for channel in server.get(
                "channels",
                [],
            ):
                rows.append(
                    [
                        channel["id"],
                        server["id"],
                        channel["name"],
                    ]
                )

        sheet.clear()
        sheet.append_rows(rows)

        return True

    except Exception as exc:
        app.logger.warning(
            "Could not save channels: %s",
            exc,
        )

        return False


def save_discord_messages():
    sheet = get_or_create_sheet(
        "Messages",
        MESSAGE_HEADERS,
    )

    if sheet is None:
        return False

    try:
        rows = [MESSAGE_HEADERS]

        for message in DISCORD_MESSAGES:
            rows.append(
                [
                    message["id"],
                    message["server_id"],
                    message["channel"],
                    message["from"],
                    message["text"],
                    message["created_at"],
                ]
            )

        sheet.clear()
        sheet.append_rows(rows)

        return True

    except Exception as exc:
        app.logger.warning(
            "Could not save messages: %s",
            exc,
        )

        return False


def save_discord_dms():
    sheet = get_or_create_sheet(
        "DMs",
        DM_HEADERS,
    )

    if sheet is None:
        return False

    try:
        rows = [DM_HEADERS]

        for message in DISCORD_DMS:
            rows.append(
                [
                    message["id"],
                    message["from"],
                    message["to"],
                    message["text"],
                    message["created_at"],
                ]
            )

        sheet.clear()
        sheet.append_rows(rows)

        return True

    except Exception as exc:
        app.logger.warning(
            "Could not save DMs: %s",
            exc,
        )

        return False


def load_discord_data():
    global DISCORD_SERVERS
    global DISCORD_MESSAGES
    global DISCORD_DMS

    DISCORD_SERVERS = {}
    DISCORD_MESSAGES = []
    DISCORD_DMS = []

    servers = get_or_create_sheet(
        "Servers",
        SERVER_HEADERS,
    )

    channels = get_or_create_sheet(
        "Channels",
        CHANNEL_HEADERS,
    )

    messages = get_or_create_sheet(
        "Messages",
        MESSAGE_HEADERS,
    )

    dms = get_or_create_sheet(
        "DMs",
        DM_HEADERS,
    )

    if servers:
        try:
            for row in servers.get_all_values()[1:]:

                if len(row) < 5:
                    continue

                server_id = row[0].strip()

                if not server_id:
                    continue

                DISCORD_SERVERS[
                    server_id
                ] = {
                    "id": server_id,
                    "name": row[1],
                    "owner": row[2],
                    "verified": (
                        row[3].lower()
                        == "true"
                    ),
                    "created_at": row[4],
                    "channels": [],
                }

        except Exception as exc:
            app.logger.warning(
                "Could not load servers: %s",
                exc,
            )

    if channels:
        try:
            for row in channels.get_all_values()[1:]:

                if len(row) < 3:
                    continue

                channel_id = row[0]
                server_id = row[1]
                name = row[2]

                if server_id not in DISCORD_SERVERS:
                    continue

                DISCORD_SERVERS[
                    server_id
                ]["channels"].append(
                    {
                        "id": channel_id,
                        "name": name,
                    }
                )

        except Exception as exc:
            app.logger.warning(
                "Could not load channels: %s",
                exc,
            )

    if messages:
        try:
            for row in messages.get_all_values()[1:]:

                if len(row) < 6:
                    continue

                DISCORD_MESSAGES.append(
                    {
                        "id": row[0],
                        "server_id": row[1],
                        "channel": row[2],
                        "from": row[3],
                        "text": row[4],
                        "created_at": row[5],
                    }
                )

        except Exception as exc:
            app.logger.warning(
                "Could not load messages: %s",
                exc,
            )

    if dms:
        try:
            for row in dms.get_all_values()[1:]:

                if len(row) < 5:
                    continue

                DISCORD_DMS.append(
                    {
                        "id": row[0],
                        "from": row[1],
                        "to": row[2],
                        "text": row[3],
                        "created_at": row[4],
                    }
                )

        except Exception as exc:
            app.logger.warning(
                "Could not load DMs: %s",
                exc,
            )

    if "home" not in DISCORD_SERVERS:

        DISCORD_SERVERS["home"] = {
            "id": "home",
            "name": "Nova",
            "owner": "Admin",
            "verified": True,
            "created_at": now_iso(),
            "channels": [
                {
                    "id": "general",
                    "name": "general",
                }
            ],
        }

        save_discord_servers()
        save_discord_channels()


def make_message(
    sender,
    text,
    server_id=None,
    channel=None,
    recipient=None,
):
    user = USERS.get(
        sender,
        {},
    )

    message = {
        "id": uuid.uuid4().hex,
        "from": sender,
        "text": text,
        "role": user.get(
            "role",
            "user",
        ),
        "verified": bool(
            user.get(
                "verified",
                False,
            )
        ),
        "created_at": now_iso(),
    }

    if server_id is not None:
        message["server_id"] = server_id

    if channel is not None:
        message["channel"] = channel

    if recipient is not None:
        message["to"] = recipient

    return message


# ============================================================
# NORMAL PAGES
# ============================================================

@app.route("/")
def home():
    return send_from_directory(
        ".",
        "index.html",
    )


@app.route("/discord")
@app.route("/discord.html")
def discord():
    return send_from_directory(
        ".",
        "discord.html",
    )


@app.route("/admin")
@app.route("/admin.html")
def admin_page():
    return send_from_directory(
        ".",
        "admin.html",
    )


@app.route("/<path:path>")
def files(path):
    return send_from_directory(
        ".",
        path,
    )


# ============================================================
# AUTH API
# ============================================================

@app.route(
    "/api/session",
    methods=["GET"],
)
def session_status():
    user = current_user()

    if not user:
        return jsonify(
            {
                "authenticated": False,
                "guest": True,
            }
        )

    return jsonify(
        {
            "authenticated": True,
            "guest": False,
            "user": sanitize_user(user),
        }
    )


@app.route(
    "/api/register",
    methods=["POST"],
)
def register():
    data = request.get_json(
        silent=True
    ) or {}

    username = (
        data.get("username")
        or ""
    ).strip()

    password = (
        data.get("password")
        or ""
    ).strip()

    if len(username) < 3:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Username must be "
                    "at least 3 characters."
                ),
            }
        ), 400

    if len(password) < 6:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Password must be "
                    "at least 6 characters."
                ),
            }
        ), 400

    if username.lower() in {
        x.lower()
        for x in USERS
    }:
        return jsonify(
            {
                "success": False,
                "message": (
                    "That username "
                    "already exists."
                ),
            }
        ), 409

    user = {
        "username": username,
        "password_hash": generate_password_hash(
            password
        ),
        "role": "user",
        "verified": False,
        "created_at": now_iso(),
    }

    USERS[username] = user

    save_users()

    session["username"] = username
    session.permanent = True

    ensure_client_record(
        username
    )

    return jsonify(
        {
            "success": True,
            "user": sanitize_user(
                user
            ),
        }
    )


@app.route(
    "/api/login",
    methods=["POST"],
)
def login():
    data = request.get_json(
        silent=True
    ) or {}

    username = (
        data.get("username")
        or ""
    ).strip()

    password = (
        data.get("password")
        or ""
    ).strip()

    user = USERS.get(username)

    if not user:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Invalid username "
                    "or password."
                ),
            }
        ), 401

    password_hash = user.get(
        "password_hash",
        "",
    )

    valid = False

    try:
        valid = check_password_hash(
            password_hash,
            password,
        )
    except Exception:
        # Compatibility with old plaintext
        # accounts from your original server.
        valid = (
            password_hash
            == password
        )

        if valid:
            user["password_hash"] = (
                generate_password_hash(
                    password
                )
            )
            save_users()

    if not valid:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Invalid username "
                    "or password."
                ),
            }
        ), 401

    session["username"] = username
    session.permanent = True

    ensure_client_record(
        username
    )

    return jsonify(
        {
            "success": True,
            "user": sanitize_user(
                user
            ),
        }
    )


@app.route(
    "/api/logout",
    methods=["POST"],
)
def logout():
    client_id = session.get(
        "client_id"
    )

    if (
        client_id
        and client_id in CONNECTED_CLIENTS
    ):
        CONNECTED_CLIENTS[
            client_id
        ]["connected"] = False

    session.clear()

    return jsonify(
        {
            "success": True
        }
    )


# ============================================================
# HEARTBEAT
# ============================================================

@app.route(
    "/api/client/heartbeat",
    methods=["POST"],
)
def heartbeat():
    user, error = require_login()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    page = (
        data.get("page")
        or "unknown"
    )

    client_id, record = (
        ensure_client_record(
            user["username"]
        )
    )

    record["page"] = page

    pending = record.get(
        "messages",
        [],
    )

    record["messages"] = []

    return jsonify(
        {
            "success": True,
            "client": {
                "client_id": client_id,
                "username": record[
                    "username"
                ],
                "role": record["role"],
                "page": record["page"],
                "connected": record[
                    "connected"
                ],
                "last_seen": record[
                    "last_seen"
                ],
            },
            "messages": pending,
        }
    )


# ============================================================
# DISCORD SERVERS
# ============================================================

@app.route(
    "/api/discord/servers",
    methods=["GET", "POST"],
)
def discord_servers():
    user, error = require_login()

    if error:
        return error

    if request.method == "GET":
        return jsonify(
            {
                "success": True,
                "servers": list(
                    DISCORD_SERVERS.values()
                ),
            }
        )

    data = request.get_json(
        silent=True
    ) or {}

    name = (
        data.get("name")
        or ""
    ).strip()

    channel_name = (
        data.get("channel")
        or "general"
    ).strip()

    if len(name) < 2:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Server name is too short."
                ),
            }
        ), 400

    if len(name) > 40:
        return jsonify(
            {
                "success": False,
                "message": (
                    "Server name is too long."
                ),
            }
        ), 400

    server_id = uuid.uuid4().hex

    server = {
        "id": server_id,
        "name": name,
        "owner": user["username"],
        "verified": False,
        "created_at": now_iso(),
        "channels": [
            {
                "id": uuid.uuid4().hex,
                "name": channel_name,
            }
        ],
    }

    DISCORD_SERVERS[
        server_id
    ] = server

    save_discord_servers()
    save_discord_channels()

    return jsonify(
        {
            "success": True,
            "server": server,
        }
    )


@app.route(
    "/api/discord/servers/<server_id>",
    methods=["GET"],
)
def get_server(server_id):
    user, error = require_login()

    if error:
        return error

    server = DISCORD_SERVERS.get(
        server_id
    )

    if not server:
        return jsonify(
            {
                "success": False,
                "message": "Server not found.",
            }
        ), 404

    return jsonify(
        {
            "success": True,
            "server": server,
        }
    )


# ============================================================
# CHANNELS
# ============================================================

@app.route(
    "/api/discord/channels",
    methods=["POST"],
)
def create_channel():
    user, error = require_login()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    server_id = data.get(
        "server_id"
    )

    name = (
        data.get("name")
        or ""
    ).strip()

    server = DISCORD_SERVERS.get(
        server_id
    )

    if not server:
        return jsonify(
            {
                "success": False,
                "message": "Server not found.",
            }
        ), 404

    if len(name) < 1:
        return jsonify(
            {
                "success": False,
                "message": "Channel name required.",
            }
        ), 400

    channel = {
        "id": uuid.uuid4().hex,
        "name": name,
    }

    server["channels"].append(
        channel
    )

    save_discord_channels()

    return jsonify(
        {
            "success": True,
            "channel": channel,
        }
    )


# ============================================================
# SERVER MESSAGES
# ============================================================

@app.route(
    "/api/discord/messages",
    methods=["GET", "POST"],
)
def discord_messages():
    user, error = require_login()

    if error:
        return error

    if request.method == "GET":

        server_id = request.args.get(
            "server_id",
            "home",
        )

        channel = request.args.get(
            "channel",
            "general",
        )

        messages = [
            x
            for x in DISCORD_MESSAGES
            if x.get("server_id")
            == server_id
            and x.get("channel")
            == channel
        ]

        return jsonify(
            {
                "success": True,
                "messages": messages[-200:],
            }
        )

    data = request.get_json(
        silent=True
    ) or {}

    server_id = data.get(
        "server_id",
        "home",
    )

    channel = (
        data.get("channel")
        or "general"
    ).strip()

    text = (
        data.get("text")
        or ""
    ).strip()

    if server_id not in DISCORD_SERVERS:
        return jsonify(
            {
                "success": False,
                "message": "Server not found.",
            }
        ), 404

    if not text:
        return jsonify(
            {
                "success": False,
                "message": "Message cannot be empty.",
            }
        ), 400

    if len(text) > 4000:
        return jsonify(
            {
                "success": False,
                "message": "Message too long.",
            }
        ), 400

    message = make_message(
        user["username"],
        text,
        server_id,
        channel,
    )

    DISCORD_MESSAGES.append(
        message
    )

    save_discord_messages()

    return jsonify(
        {
            "success": True,
            "message": message,
        }
    )


# ============================================================
# ONLINE USERS
# ============================================================

@app.route(
    "/api/discord/online",
    methods=["GET"],
)
def online_users():
    user, error = require_login()

    if error:
        return error

    online = []

    for username in USERS:

        if is_online(username):

            online.append(
                sanitize_user(
                    USERS[username]
                )
            )

    online.sort(
        key=lambda x:
        x["username"].lower()
    )

    return jsonify(
        {
            "success": True,
            "users": online,
        }
    )


# ============================================================
# DIRECT MESSAGES
# ============================================================

@app.route(
    "/api/discord/dm",
    methods=["POST"],
)
def send_dm():
    user, error = require_login()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    target = (
        data.get("to")
        or ""
    ).strip()

    text = (
        data.get("text")
        or ""
    ).strip()

    if target not in USERS:
        return jsonify(
            {
                "success": False,
                "message": "Account not found.",
            }
        ), 404

    if target == user["username"]:
        return jsonify(
            {
                "success": False,
                "message": "You cannot DM yourself.",
            }
        ), 400

    if not is_online(target):
        return jsonify(
            {
                "success": False,
                "message": (
                    "That account is offline."
                ),
            }
        ), 409

    if not text:
        return jsonify(
            {
                "success": False,
                "message": "Message cannot be empty.",
            }
        ), 400

    message = make_message(
        user["username"],
        text,
        recipient=target,
    )

    DISCORD_DMS.append(
        message
    )

    save_discord_dms()

    return jsonify(
        {
            "success": True,
            "message": message,
        }
    )


@app.route(
    "/api/discord/dm/<username>",
    methods=["GET"],
)
def get_dm(username):
    user, error = require_login()

    if error:
        return error

    if username not in USERS:
        return jsonify(
            {
                "success": False,
                "message": "Account not found.",
            }
        ), 404

    messages = [
        x
        for x in DISCORD_DMS
        if (
            x["from"]
            == user["username"]
            and x["to"]
            == username
        )
        or (
            x["from"]
            == username
            and x["to"]
            == user["username"]
        )
    ]

    return jsonify(
        {
            "success": True,
            "messages": messages[-200:],
        }
    )


# ============================================================
# ADMIN
# ============================================================

@app.route(
    "/api/admin/users",
    methods=["GET"],
)
def admin_users():
    user, error = require_admin()

    if error:
        return error

    return jsonify(
        {
            "success": True,
            "users": [
                sanitize_user(x)
                for x in sorted(
                    USERS.values(),
                    key=lambda x:
                    x["username"].lower(),
                )
            ],
        }
    )


@app.route(
    "/api/admin/users/role",
    methods=["POST"],
)
def admin_set_role():
    user, error = require_admin()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    username = (
        data.get("username")
        or ""
    ).strip()

    role = (
        data.get("role")
        or "user"
    ).strip().lower()

    allowed_roles = {
        "user",
        "verified",
        "dev",
        "admin",
    }

    if username not in USERS:
        return jsonify(
            {
                "success": False,
                "message": "User not found.",
            }
        ), 404

    if role not in allowed_roles:
        return jsonify(
            {
                "success": False,
                "message": "Invalid role.",
            }
        ), 400

    USERS[username]["role"] = role

    USERS[username]["verified"] = (
        role
        in {
            "verified",
            "dev",
            "admin",
        }
    )

    save_users()

    return jsonify(
        {
            "success": True,
            "user": sanitize_user(
                USERS[username]
            ),
        }
    )


@app.route(
    "/api/admin/servers",
    methods=["GET"],
)
def admin_servers():
    user, error = require_admin()

    if error:
        return error

    return jsonify(
        {
            "success": True,
            "servers": list(
                DISCORD_SERVERS.values()
            ),
        }
    )


@app.route(
    "/api/admin/servers/verify",
    methods=["POST"],
)
def verify_server():
    user, error = require_admin()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    server_id = data.get(
        "server_id"
    )

    verified = bool(
        data.get(
            "verified",
            True,
        )
    )

    server = DISCORD_SERVERS.get(
        server_id
    )

    if not server:
        return jsonify(
            {
                "success": False,
                "message": "Server not found.",
            }
        ), 404

    server["verified"] = verified

    save_discord_servers()

    return jsonify(
        {
            "success": True,
            "server": server,
        }
    )


# ============================================================
# ADMIN CLIENT CONTROL
# ============================================================

@app.route(
    "/api/admin/clients",
    methods=["GET"],
)
def admin_clients():
    user, error = require_admin()

    if error:
        return error

    clients = []

    for client in CONNECTED_CLIENTS.values():

        clients.append(
            {
                "client_id": client[
                    "client_id"
                ],
                "username": client.get(
                    "username",
                    "unknown",
                ),
                "role": client.get(
                    "role",
                    "user",
                ),
                "page": client.get(
                    "page",
                    "unknown",
                ),
                "connected": client.get(
                    "connected",
                    True,
                ),
                "last_seen": client.get(
                    "last_seen"
                ),
            }
        )

    return jsonify(
        {
            "success": True,
            "clients": clients,
        }
    )


@app.route(
    "/api/admin/disconnect",
    methods=["POST"],
)
def admin_disconnect():
    user, error = require_admin()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    client_id = data.get(
        "client_id"
    )

    client = CONNECTED_CLIENTS.get(
        client_id
    )

    if not client:
        return jsonify(
            {
                "success": False,
                "message": "Client not found.",
            }
        ), 404

    client["connected"] = False

    client.setdefault(
        "messages",
        [],
    ).append(
        {
            "from": "Admin",
            "text": (
                "Your session was "
                "disconnected by an administrator."
            ),
            "type": "warning",
        }
    )

    return jsonify(
        {
            "success": True
        }
    )


@app.route(
    "/api/admin/message",
    methods=["POST"],
)
def admin_message():
    user, error = require_admin()

    if error:
        return error

    data = request.get_json(
        silent=True
    ) or {}

    client_id = data.get(
        "client_id"
    )

    text = (
        data.get("message")
        or ""
    ).strip()

    client = CONNECTED_CLIENTS.get(
        client_id
    )

    if not client:
        return jsonify(
            {
                "success": False,
                "message": "Client not found.",
            }
        ), 404

    if not text:
        return jsonify(
            {
                "success": False,
                "message": "Message cannot be empty.",
            }
        ), 400

    client.setdefault(
        "messages",
        [],
    ).append(
        {
            "from": "Admin",
            "text": text,
            "type": "info",
        }
    )

    return jsonify(
        {
            "success": True
        }
    )


# ============================================================
# STARTUP
# ============================================================

load_users()

load_discord_data()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=10000,
        debug=True,
    )
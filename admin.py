import hashlib
import hmac
import secrets
import sqlite3
import time
from contextlib import contextmanager
from functools import wraps
from pathlib import Path

from flask import Blueprint, current_app, jsonify, redirect, render_template, request, session, url_for


admin = Blueprint("admin", __name__)
PRESENCE_TIMEOUT_SECONDS = 90
BUCKET_SECONDS = 10 * 60
HISTORY_BUCKETS = 72
LOGIN_WINDOW_SECONDS = 15 * 60
LOGIN_MAX_ATTEMPTS = 5


def _database_path():
    return Path(current_app.instance_path) / "site-state.sqlite3"


@contextmanager
def _connect():
    connection = sqlite3.connect(_database_path(), timeout=10)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def _initialize_database():
    _database_path().parent.mkdir(parents=True, exist_ok=True)
    with _connect() as connection:
        connection.execute("PRAGMA journal_mode=WAL")
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS presence (
                client_id TEXT PRIMARY KEY,
                last_seen REAL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS traffic_bins (
                bucket_start INTEGER PRIMARY KEY,
                peak_count INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS site_settings (
                name TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS login_attempts (
                address_hash TEXT PRIMARY KEY,
                window_start REAL NOT NULL,
                attempts INTEGER NOT NULL
            );
            INSERT OR IGNORE INTO site_settings (name, value)
                VALUES ('catalog_locked', '0');
            INSERT OR IGNORE INTO site_settings (name, value)
                VALUES ('global_announcement', '');
            INSERT OR IGNORE INTO site_settings (name, value)
                VALUES ('global_announcement_id', '');
            """
        )


@admin.before_request
def _prepare_database():
    _initialize_database()


@admin.after_request
def _disable_admin_response_caching(response):
    response.headers["Cache-Control"] = "no-store"
    return response


def _csrf_token():
    token = session.get("csrf_token")
    if not token:
        token = secrets.token_urlsafe(32)
        session["csrf_token"] = token
    return token


def _valid_csrf_token(token):
    expected = session.get("csrf_token", "")
    return bool(expected and token and hmac.compare_digest(expected, token))


def _require_csrf_token():
    token = request.headers.get("X-CSRF-Token") or request.form.get("csrf_token")
    if not _valid_csrf_token(token):
        return jsonify(error="Invalid or missing CSRF token."), 400
    return None


def _admin_required(function):
    @wraps(function)
    def wrapped(*args, **kwargs):
        if session.get("admin_authenticated") is not True:
            if request.path.startswith("/api/"):
                return jsonify(error="Authentication required."), 401
            return redirect(url_for("admin.admin_login"))
        return function(*args, **kwargs)

    return wrapped


def _catalog_is_locked(connection):
    setting = connection.execute(
        "SELECT value FROM site_settings WHERE name = 'catalog_locked'"
    ).fetchone()
    return bool(setting and setting["value"] == "1")


def _online_count(connection, now):
    connection.execute(
        "DELETE FROM presence WHERE last_seen < ?",
        (now - PRESENCE_TIMEOUT_SECONDS,),
    )
    return connection.execute(
        "SELECT COUNT(*) FROM presence WHERE last_seen >= ?",
        (now - PRESENCE_TIMEOUT_SECONDS,),
    ).fetchone()[0]


def _address_hash():
    address = request.remote_addr or "unknown"
    key = str(current_app.secret_key).encode("utf-8")
    return hmac.new(key, address.encode("utf-8"), hashlib.sha256).hexdigest()


def _login_is_limited(connection, now):
    attempt = connection.execute(
        "SELECT window_start, attempts FROM login_attempts WHERE address_hash = ?",
        (_address_hash(),),
    ).fetchone()
    return bool(
        attempt
        and now - attempt["window_start"] < LOGIN_WINDOW_SECONDS
        and attempt["attempts"] >= LOGIN_MAX_ATTEMPTS
    )


def _record_login_attempt(connection, now):
    connection.execute(
        "DELETE FROM login_attempts WHERE window_start < ?",
        (now - LOGIN_WINDOW_SECONDS,),
    )
    address_hash = _address_hash()
    attempt = connection.execute(
        "SELECT window_start, attempts FROM login_attempts WHERE address_hash = ?",
        (address_hash,),
    ).fetchone()
    if not attempt or now - attempt["window_start"] >= LOGIN_WINDOW_SECONDS:
        connection.execute(
            """
            INSERT INTO login_attempts (address_hash, window_start, attempts)
            VALUES (?, ?, 1)
            ON CONFLICT(address_hash) DO UPDATE SET window_start = excluded.window_start,
                attempts = excluded.attempts
            """,
            (address_hash, now),
        )
        return
    connection.execute(
        "UPDATE login_attempts SET attempts = attempts + 1 WHERE address_hash = ?",
        (address_hash,),
    )


@admin.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    error = None
    csrf_token = _csrf_token()

    if request.method == "POST":
        if not _valid_csrf_token(request.form.get("csrf_token")):
            error = "Your sign-in form expired. Reload and try again."
        else:
            now = time.time()
            with _connect() as connection:
                if _login_is_limited(connection, now):
                    return render_template(
                        "admin_login.html",
                        csrf_token=csrf_token,
                        error="Too many attempts. Please wait 15 minutes before trying again.",
                    ), 429
                _record_login_attempt(connection, now)

                supplied = request.form.get("password", "")
                expected = current_app.config["ADMIN_PASSWORD"]
                if expected and hmac.compare_digest(supplied.encode("utf-8"), expected.encode("utf-8")):
                    connection.execute(
                        "DELETE FROM login_attempts WHERE address_hash = ?",
                        (_address_hash(),),
                    )
                    session.clear()
                    session["admin_authenticated"] = True
                    session["csrf_token"] = secrets.token_urlsafe(32)
                    return redirect(url_for("admin.admin_panel"))
            error = "Admin sign-in is not configured." if not current_app.config["ADMIN_PASSWORD"] else "Incorrect password."

    return render_template("admin_login.html", csrf_token=csrf_token, error=error)


@admin.get("/admin")
@admin.get("/admin/panel")
@_admin_required
def admin_panel():
    return render_template("admin_panel.html", csrf_token=_csrf_token())


@admin.post("/admin/logout")
@_admin_required
def admin_logout():
    csrf_error = _require_csrf_token()
    if csrf_error:
        return csrf_error
    session.clear()
    return redirect(url_for("admin.admin_login"))


@admin.get("/api/catalog-lock")
def catalog_lock_status():
    with _connect() as connection:
        locked = _catalog_is_locked(connection)
    return jsonify(locked=locked)


@admin.get("/api/announcement")
def announcement_status():
    with _connect() as connection:
        rows = connection.execute(
            "SELECT name, value FROM site_settings WHERE name IN ('global_announcement', 'global_announcement_id')"
        ).fetchall()
    settings = {row["name"]: row["value"] for row in rows}
    return jsonify(message=settings.get("global_announcement", ""), id=settings.get("global_announcement_id", ""))


@admin.post("/api/presence")
def record_presence():
    payload = request.get_json(silent=True) or {}
    client_id = payload.get("clientId")
    if not isinstance(client_id, str) or len(client_id) != 36:
        return jsonify(error="A valid client ID is required."), 400
    try:
        if len(client_id.replace("-", "")) != 32:
            raise ValueError
        int(client_id.replace("-", ""), 16)
    except ValueError:
        return jsonify(error="A valid client ID is required."), 400

    now = time.time()
    bucket_start = int(now // BUCKET_SECONDS) * BUCKET_SECONDS
    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO presence (client_id, last_seen) VALUES (?, ?)
            ON CONFLICT(client_id) DO UPDATE SET last_seen = excluded.last_seen
            """,
            (client_id, now),
        )
        connection.execute(
            "DELETE FROM presence WHERE last_seen < ?",
            (now - PRESENCE_TIMEOUT_SECONDS,),
        )
        online = _online_count(connection, now)
        connection.execute(
            """
            INSERT INTO traffic_bins (bucket_start, peak_count) VALUES (?, ?)
            ON CONFLICT(bucket_start) DO UPDATE SET peak_count =
                MAX(traffic_bins.peak_count, excluded.peak_count)
            """,
            (bucket_start, online),
        )
        connection.execute(
            "DELETE FROM traffic_bins WHERE bucket_start < ?",
            (bucket_start - (HISTORY_BUCKETS - 1) * BUCKET_SECONDS,),
        )
        locked = _catalog_is_locked(connection)
    return jsonify(online=online, locked=locked)


@admin.post("/api/presence/leave")
def remove_presence():
    payload = request.get_json(silent=True) or {}
    client_id = payload.get("clientId")
    if not isinstance(client_id, str) or len(client_id) != 36:
        return "", 204
    with _connect() as connection:
        connection.execute("DELETE FROM presence WHERE client_id = ?", (client_id,))
    return "", 204


@admin.get("/api/admin/metrics")
@_admin_required
def admin_metrics():
    now = time.time()
    current_bucket = int(now // BUCKET_SECONDS) * BUCKET_SECONDS
    first_bucket = current_bucket - (HISTORY_BUCKETS - 1) * BUCKET_SECONDS
    with _connect() as connection:
        online = _online_count(connection, now)
        connection.execute("DELETE FROM traffic_bins WHERE bucket_start < ?", (first_bucket,))
        locked = _catalog_is_locked(connection)
        rows = connection.execute(
            """
            SELECT bucket_start, peak_count FROM traffic_bins
            WHERE bucket_start BETWEEN ? AND ?
            """,
            (first_bucket, current_bucket),
        ).fetchall()
    counts = {row["bucket_start"]: row["peak_count"] for row in rows}
    samples = [
        {"time": bucket, "count": counts.get(bucket, 0)}
        for bucket in range(first_bucket, current_bucket + 1, BUCKET_SECONDS)
    ]
    peak = max(samples, key=lambda sample: (sample["count"], sample["time"]))
    return jsonify(
        online=online,
        locked=locked,
        samples=samples,
        peak={"time": peak["time"], "count": peak["count"]},
    )


@admin.post("/api/admin/catalog-lock")
@_admin_required
def set_catalog_lock():
    csrf_error = _require_csrf_token()
    if csrf_error:
        return csrf_error
    payload = request.get_json(silent=True) or {}
    locked = payload.get("locked")
    if not isinstance(locked, bool):
        return jsonify(error="The locked value must be true or false."), 400
    with _connect() as connection:
        connection.execute(
            "UPDATE site_settings SET value = ? WHERE name = 'catalog_locked'",
            ("1" if locked else "0",),
        )
    return jsonify(locked=locked)


@admin.post("/api/admin/announcement")
@_admin_required
def set_announcement():
    csrf_error = _require_csrf_token()
    if csrf_error:
        return csrf_error
    payload = request.get_json(silent=True) or {}
    message = payload.get("message")
    if not isinstance(message, str):
        return jsonify(error="The announcement must be text."), 400
    message = message.strip()
    if len(message) > 500:
        return jsonify(error="Announcements must be 500 characters or fewer."), 400
    announcement_id = secrets.token_urlsafe(12) if message else ""
    with _connect() as connection:
        connection.execute(
            "UPDATE site_settings SET value = ? WHERE name = 'global_announcement'",
            (message,),
        )
        connection.execute(
            "UPDATE site_settings SET value = ? WHERE name = 'global_announcement_id'",
            (announcement_id,),
        )
    return jsonify(message=message, id=announcement_id)

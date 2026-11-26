import hashlib
import hmac
import json
import re
import secrets
import sqlite3
import time
from contextlib import contextmanager
from datetime import date, datetime, time as datetime_time, timedelta, timezone
from functools import lru_cache, wraps
from pathlib import Path
from urllib.parse import unquote

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
                last_seen REAL NOT NULL,
                page_category TEXT NOT NULL DEFAULT 'Other pages'
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
            INSERT OR IGNORE INTO site_settings (name, value)
                VALUES ('global_announcement_schedule', '{}');
            INSERT OR IGNORE INTO site_settings (name, value)
                VALUES ('global_poll', '{}');
            CREATE TABLE IF NOT EXISTS poll_votes (
                poll_id TEXT NOT NULL,
                voter_id TEXT NOT NULL,
                option_index INTEGER NOT NULL CHECK (option_index BETWEEN 0 AND 4),
                created_at REAL NOT NULL,
                PRIMARY KEY (poll_id, voter_id)
            );
            CREATE TABLE IF NOT EXISTS poll_history (
                poll_id TEXT PRIMARY KEY,
                question TEXT NOT NULL,
                options_json TEXT NOT NULL,
                counts_json TEXT NOT NULL,
                total INTEGER NOT NULL,
                started_at REAL NOT NULL,
                ended_at REAL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS daily_visits (
                visit_day TEXT NOT NULL,
                client_id TEXT NOT NULL,
                category TEXT NOT NULL,
                game_path TEXT NOT NULL DEFAULT '',
                PRIMARY KEY (visit_day, client_id, category, game_path)
            );
            """
        )
        presence_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(presence)")
        }
        if "page_category" not in presence_columns:
            connection.execute(
                "ALTER TABLE presence ADD COLUMN page_category TEXT NOT NULL DEFAULT 'Other pages'"
            )
        vote_schema = connection.execute(
            "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'poll_votes'"
        ).fetchone()["sql"]
        if "BETWEEN 0 AND 4" not in vote_schema:
            connection.executescript(
                """
                CREATE TABLE poll_votes_updated (
                    poll_id TEXT NOT NULL,
                    voter_id TEXT NOT NULL,
                    option_index INTEGER NOT NULL CHECK (option_index BETWEEN 0 AND 4),
                    created_at REAL NOT NULL,
                    PRIMARY KEY (poll_id, voter_id)
                );
                INSERT INTO poll_votes_updated (poll_id, voter_id, option_index, created_at)
                    SELECT poll_id, voter_id, option_index, created_at FROM poll_votes;
                DROP TABLE poll_votes;
                ALTER TABLE poll_votes_updated RENAME TO poll_votes;
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


def _presence_page_category(page_path):
    if page_path in {"/calculator", "/calculator.html"}:
        return "Calculator"
    if page_path == "/scientific-calculator":
        return "Games catalog"
    if page_path.startswith("/tools/"):
        return "Math tools"
    if page_path.startswith(("/games/", "/slowroads", "/space-waves")):
        return "Games"
    if page_path.startswith("/admin"):
        return "Admin"
    return "Other pages"


def _utc_day(timestamp):
    return datetime.fromtimestamp(timestamp, timezone.utc).date()


def _record_daily_visit(connection, client_id, category, timestamp, game_path=""):
    today = _utc_day(timestamp)
    connection.execute(
        """
        INSERT OR IGNORE INTO daily_visits (visit_day, client_id, category, game_path)
        VALUES (?, ?, ?, ?)
        """,
        (today.isoformat(), client_id, category, game_path),
    )
    connection.execute(
        "DELETE FROM daily_visits WHERE visit_day < ?",
        ((today - timedelta(days=30)).isoformat(),),
    )


@lru_cache(maxsize=1)
def _catalog_game_paths():
    catalog_path = Path(current_app.root_path) / "assets" / "catalog.js"
    source = catalog_path.read_text(encoding="utf-8")
    return set(re.findall(r'\bpath:\s*"([^"]+)"', source)) | {"games/Subway Surfers"}


def _validated_client_id(value):
    if not isinstance(value, str) or len(value) != 36:
        return False
    try:
        return len(value.replace("-", "")) == 32 and int(value.replace("-", ""), 16) >= 0
    except ValueError:
        return False


def _local_day(payload, now):
    local_date = payload.get("localDate")
    offset = payload.get("timezoneOffset")
    if not isinstance(local_date, str) or isinstance(offset, bool) or not isinstance(offset, int):
        raise ValueError("Choose a time for today.")
    if abs(offset) > 14 * 60:
        raise ValueError("The selected timezone is invalid.")
    try:
        selected_day = date.fromisoformat(local_date)
    except ValueError as error:
        raise ValueError("Choose a time for today.") from error
    current_local_day = (
        datetime.fromtimestamp(now, timezone.utc) - timedelta(minutes=offset)
    ).date()
    if selected_day != current_local_day:
        raise ValueError("Times can only be scheduled for today.")
    return selected_day


def _parse_local_timestamp(value, selected_day, now, next_day=False):
    if not isinstance(value, str):
        raise ValueError("Choose a valid time.")
    try:
        selected = datetime.fromisoformat(value)
    except ValueError as error:
        raise ValueError("Choose a valid time.") from error
    if selected.tzinfo is None:
        raise ValueError("A timezone is required for scheduled times.")
    expected_day = selected_day + timedelta(days=1) if next_day else selected_day
    if selected.date() != expected_day:
        raise ValueError("Times can only be scheduled for today.")
    if next_day and selected.timetz().replace(tzinfo=None) != datetime_time.min:
        raise ValueError("A scheduled announcement must expire at local midnight.")
    timestamp = selected.timestamp()
    if timestamp <= now:
        raise ValueError("Choose a time later than now.")
    return timestamp


def _online_page_counts(connection, now):
    rows = connection.execute(
        """
        SELECT page_category, COUNT(*) AS visitors
        FROM presence
        WHERE last_seen >= ?
        GROUP BY page_category
        ORDER BY visitors DESC, page_category
        """,
        (now - PRESENCE_TIMEOUT_SECONDS,),
    ).fetchall()
    return [{"category": row["page_category"], "count": row["visitors"]} for row in rows]


def _daily_analytics(connection, now):
    today = _utc_day(now)
    first_day = today - timedelta(days=29)
    day_counts = {
        row["visit_day"]: row["visitors"]
        for row in connection.execute(
            """
            SELECT visit_day, COUNT(DISTINCT client_id) AS visitors
            FROM daily_visits
            WHERE visit_day >= ? AND game_path = ''
            GROUP BY visit_day
            """,
            (first_day.isoformat(),),
        ).fetchall()
    }
    popular_sections = connection.execute(
        """
        SELECT category, COUNT(*) AS visits
        FROM daily_visits
        WHERE visit_day >= ? AND game_path = ''
        GROUP BY category
        ORDER BY visits DESC, category
        LIMIT 5
        """,
        ((today - timedelta(days=6)).isoformat(),),
    ).fetchall()
    return {
        "daily": [
            {
                "day": (first_day + timedelta(days=offset)).isoformat(),
                "visitors": day_counts.get((first_day + timedelta(days=offset)).isoformat(), 0),
            }
            for offset in range(30)
        ],
        "popularSections": [
            {"category": row["category"], "visits": row["visits"]}
            for row in popular_sections
        ],
    }


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
    now = time.time()
    with _connect() as connection:
        state = _announcement_state(connection, now)
    return jsonify(message=state["message"], id=state["id"])


def _announcement_state(connection, now, admin_view=False):
    rows = connection.execute(
        """
        SELECT name, value FROM site_settings
        WHERE name IN ('global_announcement', 'global_announcement_id', 'global_announcement_schedule')
        """
    ).fetchall()
    settings = {row["name"]: row["value"] for row in rows}
    try:
        schedule = json.loads(settings.get("global_announcement_schedule", "{}"))
    except (TypeError, ValueError):
        schedule = {}
    if not isinstance(schedule, dict):
        schedule = {}

    message = settings.get("global_announcement", "")
    announcement_id = settings.get("global_announcement_id", "")
    starts_at = schedule.get("startsAt")
    expires_at = schedule.get("expiresAt")
    if isinstance(starts_at, (int, float)) and isinstance(expires_at, (int, float)):
        if now >= expires_at:
            message = ""
            announcement_id = ""
            schedule = {}
            connection.execute(
                "UPDATE site_settings SET value = '' WHERE name IN ('global_announcement', 'global_announcement_id')"
            )
            connection.execute(
                "UPDATE site_settings SET value = '{}' WHERE name = 'global_announcement_schedule'"
            )
        elif now >= starts_at:
            message = schedule.get("message", "")
            announcement_id = schedule.get("id", "")
        elif admin_view:
            message = schedule.get("message", message)
            announcement_id = schedule.get("id", announcement_id)
    return {"message": message, "id": announcement_id, "schedule": schedule}


@admin.get("/api/admin/announcement")
@_admin_required
def admin_announcement_status():
    with _connect() as connection:
        state = _announcement_state(connection, time.time(), admin_view=True)
    return jsonify(
        message=state["message"],
        id=state["id"],
        schedule=state["schedule"],
    )


def _poll_snapshot(connection, voter_id=""):
    row = connection.execute(
        "SELECT value FROM site_settings WHERE name = 'global_poll'"
    ).fetchone()
    try:
        poll = json.loads(row["value"] if row else "{}")
    except (TypeError, ValueError):
        poll = {}
    poll_id = poll.get("id", "") if isinstance(poll, dict) else ""
    if not poll_id:
        return {"active": False, "id": "", "question": "", "options": [], "counts": [], "total": 0, "myVote": None, "closesAt": None}
    closes_at = poll.get("closesAt")
    now = time.time()
    if isinstance(closes_at, (int, float)) and now >= closes_at:
        _archive_current_poll(connection, poll, closes_at)
        connection.execute("UPDATE site_settings SET value = '{}' WHERE name = 'global_poll'")
        return {"active": False, "id": "", "question": "", "options": [], "counts": [], "total": 0, "myVote": None, "closesAt": None}
    options = poll.get("options", [])
    if not isinstance(options, list):
        options = []
    counts = [0] * len(options)
    rows = connection.execute(
        "SELECT option_index, COUNT(*) AS votes FROM poll_votes WHERE poll_id = ? GROUP BY option_index",
        (poll_id,),
    ).fetchall()
    for count_row in rows:
        counts[count_row["option_index"]] = count_row["votes"]
    vote = None
    if voter_id:
        vote_row = connection.execute(
            "SELECT option_index FROM poll_votes WHERE poll_id = ? AND voter_id = ?",
            (poll_id, voter_id),
        ).fetchone()
        if vote_row:
            vote = vote_row["option_index"]
    return {
        "active": True,
        "id": poll_id,
        "question": poll.get("question", ""),
        "options": poll.get("options", []),
        "counts": counts,
        "total": sum(counts),
        "myVote": vote,
        "closesAt": closes_at,
    }


def _archive_current_poll(connection, poll, ended_at):
    poll_id = poll.get("id")
    question = poll.get("question")
    options = poll.get("options")
    if not isinstance(poll_id, str) or not poll_id or not isinstance(question, str) or not isinstance(options, list):
        return
    counts = [0] * len(options)
    rows = connection.execute(
        "SELECT option_index, COUNT(*) AS votes FROM poll_votes WHERE poll_id = ? GROUP BY option_index",
        (poll_id,),
    ).fetchall()
    for row in rows:
        if 0 <= row["option_index"] < len(counts):
            counts[row["option_index"]] = row["votes"]
    connection.execute(
        """
        INSERT OR IGNORE INTO poll_history
            (poll_id, question, options_json, counts_json, total, started_at, ended_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            poll_id,
            question,
            json.dumps(options, ensure_ascii=False),
            json.dumps(counts),
            sum(counts),
            poll.get("startedAt", ended_at),
            ended_at,
        ),
    )
    connection.execute("DELETE FROM poll_votes WHERE poll_id = ?", (poll_id,))
    connection.execute(
        """
        DELETE FROM poll_history WHERE poll_id NOT IN (
            SELECT poll_id FROM poll_history ORDER BY ended_at DESC LIMIT 50
        )
        """
    )


@admin.get("/api/poll")
def poll_status():
    voter_id = request.args.get("voterId", "")
    if voter_id:
        try:
            if len(voter_id) != 36 or len(voter_id.replace("-", "")) != 32:
                raise ValueError
            int(voter_id.replace("-", ""), 16)
        except ValueError:
            voter_id = ""
    with _connect() as connection:
        poll = _poll_snapshot(connection, voter_id)
    return jsonify(poll)


@admin.post("/api/poll/vote")
def submit_poll_vote():
    payload = request.get_json(silent=True) or {}
    poll_id = payload.get("pollId")
    voter_id = payload.get("voterId")
    option_index = payload.get("optionIndex")
    if not isinstance(poll_id, str) or len(poll_id) > 64:
        return jsonify(error="A valid poll is required."), 400
    if not isinstance(voter_id, str) or len(voter_id) != 36:
        return jsonify(error="A valid voter ID is required."), 400
    try:
        if len(voter_id.replace("-", "")) != 32:
            raise ValueError
        int(voter_id.replace("-", ""), 16)
    except ValueError:
        return jsonify(error="A valid voter ID is required."), 400
    if isinstance(option_index, bool) or not isinstance(option_index, int):
        return jsonify(error="Choose one of the poll options."), 400
    with _connect() as connection:
        poll = _poll_snapshot(connection)
        if not poll["active"] or poll["id"] != poll_id:
            return jsonify(error="This poll has ended or changed."), 409
        if not 0 <= option_index < len(poll["options"]):
            return jsonify(error="Choose one of the poll options."), 400
        try:
            connection.execute(
                "INSERT INTO poll_votes (poll_id, voter_id, option_index, created_at) VALUES (?, ?, ?, ?)",
                (poll_id, voter_id, option_index, time.time()),
            )
        except sqlite3.IntegrityError:
            return jsonify(error="You have already voted in this poll.", poll=_poll_snapshot(connection, voter_id)), 409
        poll = _poll_snapshot(connection, voter_id)
    return jsonify(poll)


@admin.post("/api/presence")
def record_presence():
    payload = request.get_json(silent=True) or {}
    client_id = payload.get("clientId")
    page_path = payload.get("pagePath", "")
    if not isinstance(client_id, str) or len(client_id) != 36:
        return jsonify(error="A valid client ID is required."), 400
    if (
        not isinstance(page_path, str)
        or len(page_path) > 200
        or (page_path and (not page_path.startswith("/") or "?" in page_path or "#" in page_path))
    ):
        return jsonify(error="A valid page path is required."), 400
    try:
        if len(client_id.replace("-", "")) != 32:
            raise ValueError
        int(client_id.replace("-", ""), 16)
    except ValueError:
        return jsonify(error="A valid client ID is required."), 400

    now = time.time()
    category = _presence_page_category(page_path)
    game_path = unquote(page_path.lstrip("/")) if page_path.startswith("/games/") else ""
    if game_path not in _catalog_game_paths():
        game_path = ""
    bucket_start = int(now // BUCKET_SECONDS) * BUCKET_SECONDS
    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO presence (client_id, last_seen, page_category) VALUES (?, ?, ?)
            ON CONFLICT(client_id) DO UPDATE SET last_seen = excluded.last_seen,
                page_category = excluded.page_category
            """,
            (client_id, now, _presence_page_category(page_path)),
        )
        _record_daily_visit(connection, client_id, category, now)
        if game_path:
            _record_daily_visit(connection, client_id, "Games", now, game_path)
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


@admin.post("/api/game-view")
def record_game_view():
    payload = request.get_json(silent=True) or {}
    client_id = payload.get("clientId")
    game_path = payload.get("gamePath")
    if not _validated_client_id(client_id):
        return jsonify(error="A valid client ID is required."), 400
    if not isinstance(game_path, str) or game_path not in _catalog_game_paths():
        return jsonify(error="Choose a game in the catalog."), 400
    with _connect() as connection:
        _record_daily_visit(connection, client_id, "Games", time.time(), game_path)
    return jsonify(recorded=True)


@admin.get("/api/trending-games")
def trending_games():
    today = _utc_day(time.time())
    with _connect() as connection:
        rows = connection.execute(
            """
            SELECT game_path, COUNT(*) AS plays
            FROM daily_visits
            WHERE game_path != '' AND visit_day >= ?
            GROUP BY game_path
            ORDER BY plays DESC, game_path
            LIMIT 5
            """,
            ((today - timedelta(days=6)).isoformat(),),
        ).fetchall()
    return jsonify(games=[{"path": row["game_path"], "plays": row["plays"]} for row in rows])


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
        pages = _online_page_counts(connection, now)
        analytics = _daily_analytics(connection, now)
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
        pages=pages,
        daily=analytics["daily"],
        popularSections=analytics["popularSections"],
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
    schedule = {}
    if message and payload.get("schedule"):
        schedule_payload = payload["schedule"]
        if not isinstance(schedule_payload, dict):
            return jsonify(error="Choose a valid announcement time."), 400
        now = time.time()
        try:
            local_date = _local_day(schedule_payload, now)
            starts_at = _parse_local_timestamp(schedule_payload.get("startsAt"), local_date, now)
            expires_at = _parse_local_timestamp(
                schedule_payload.get("expiresAt"), local_date, now, next_day=True
            )
        except ValueError as error:
            return jsonify(error=str(error)), 400
        if expires_at <= starts_at:
            return jsonify(error="The announcement must expire after it starts."), 400
        schedule = {
            "startsAt": starts_at,
            "expiresAt": expires_at,
            "localDate": local_date.isoformat(),
        }
    announcement_id = secrets.token_urlsafe(12) if message else ""
    if schedule:
        schedule["message"] = message
        schedule["id"] = announcement_id
    with _connect() as connection:
        if not schedule:
            connection.execute(
                "UPDATE site_settings SET value = ? WHERE name = 'global_announcement'",
                (message,),
            )
            connection.execute(
                "UPDATE site_settings SET value = ? WHERE name = 'global_announcement_id'",
                (announcement_id,),
            )
        connection.execute(
            "UPDATE site_settings SET value = ? WHERE name = 'global_announcement_schedule'",
            (json.dumps(schedule),),
        )
    return jsonify(message=message, id=announcement_id, schedule=schedule)


@admin.post("/api/admin/poll")
@_admin_required
def set_global_poll():
    csrf_error = _require_csrf_token()
    if csrf_error:
        return csrf_error
    payload = request.get_json(silent=True) or {}
    question = payload.get("question")
    options = payload.get("options")
    if not isinstance(question, str):
        return jsonify(error="The poll question must be text."), 400
    question = question.strip()
    if not question:
        with _connect() as connection:
            _poll_snapshot(connection)
            current = connection.execute(
                "SELECT value FROM site_settings WHERE name = 'global_poll'"
            ).fetchone()
            try:
                active_poll = json.loads(current["value"]) if current else {}
            except (TypeError, ValueError):
                active_poll = {}
            if isinstance(active_poll, dict) and active_poll.get("id"):
                _archive_current_poll(connection, active_poll, time.time())
            connection.execute("UPDATE site_settings SET value = '{}' WHERE name = 'global_poll'")
        return jsonify(active=False, id="", question="", options=[], counts=[], total=0, myVote=None)
    if len(question) > 180:
        return jsonify(error="Poll questions must be 180 characters or fewer."), 400
    if not isinstance(options, list) or not 2 <= len(options) <= 5 or any(not isinstance(option, str) for option in options):
        return jsonify(error="Provide between two and five poll options."), 400
    options = [option.strip() for option in options]
    if any(not option for option in options):
        return jsonify(error="Every poll option is required."), 400
    if any(len(option) > 80 for option in options):
        return jsonify(error="Poll options must be 80 characters or fewer."), 400
    closes_at = None
    if payload.get("closesAt"):
        now = time.time()
        try:
            local_date = _local_day(payload, now)
            closes_at = _parse_local_timestamp(payload["closesAt"], local_date, now)
        except ValueError as error:
            return jsonify(error=str(error)), 400
    poll = {
        "id": secrets.token_urlsafe(12),
        "question": question,
        "options": options,
        "startedAt": time.time(),
        "closesAt": closes_at,
    }
    with _connect() as connection:
        _poll_snapshot(connection)
        current = connection.execute(
            "SELECT value FROM site_settings WHERE name = 'global_poll'"
        ).fetchone()
        try:
            active_poll = json.loads(current["value"]) if current else {}
        except (TypeError, ValueError):
            active_poll = {}
        if isinstance(active_poll, dict) and active_poll.get("id"):
            _archive_current_poll(connection, active_poll, time.time())
        connection.execute(
            "UPDATE site_settings SET value = ? WHERE name = 'global_poll'",
            (json.dumps(poll, ensure_ascii=False),),
        )
    return jsonify(active=True, **poll)


@admin.get("/api/admin/poll-history")
@_admin_required
def poll_history_status():
    with _connect() as connection:
        rows = connection.execute(
            """
            SELECT poll_id, question, options_json, counts_json, total, started_at, ended_at
            FROM poll_history ORDER BY ended_at DESC LIMIT 20
            """
        ).fetchall()
    history = []
    for row in rows:
        history.append(
            {
                "id": row["poll_id"],
                "question": row["question"],
                "options": json.loads(row["options_json"]),
                "counts": json.loads(row["counts_json"]),
                "total": row["total"],
                "startedAt": row["started_at"],
                "endedAt": row["ended_at"],
            }
        )
    return jsonify(history=history)

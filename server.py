import json
import mimetypes
import os
import secrets
import time
from functools import lru_cache
from html import escape
from pathlib import Path, PurePosixPath

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from flask import Flask, Response, abort, redirect, render_template, request, send_from_directory

from admin import admin as admin_blueprint
from youtube import youtube as youtube_blueprint

PROJECT_ROOT = Path(__file__).resolve().parent
CANONICAL_HOST = "yogurt-ws0r.onrender.com"
R2_ENDPOINT_URL = "https://08325ed3ec32b9235e703950da233f53.r2.cloudflarestorage.com"
R2_BUCKET_NAME = "alexmods"
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
app.register_blueprint(youtube_blueprint)


@lru_cache(maxsize=1)
def _r2_client():
    access_key_id = os.environ.get("R2_ACCESS_KEY_ID", "").strip()
    secret_access_key = os.environ.get("R2_SECRET_ACCESS_KEY", "").strip()
    if not access_key_id or not secret_access_key:
        raise RuntimeError("R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be configured.")
    return boto3.client(
        "s3",
        endpoint_url=R2_ENDPOINT_URL,
        region_name="auto",
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
    )


def _serve_r2_object(key):
    normalized_key = PurePosixPath(key)
    if (
        "\\" in key
        or normalized_key.is_absolute()
        or not normalized_key.parts
        or any(part.startswith(".") for part in normalized_key.parts)
        or any(part in {"", ".", ".."} for part in normalized_key.parts)
        or normalized_key.parts[0] not in {"games", "screenshots"}
    ):
        abort(404)

    try:
        client = _r2_client()
        if request.method == "HEAD":
            metadata = client.head_object(Bucket=R2_BUCKET_NAME, Key=key)
            body = None
            status = 200
        else:
            request_options = {"Bucket": R2_BUCKET_NAME, "Key": key}
            range_header = request.headers.get("Range")
            if range_header:
                request_options["Range"] = range_header
            metadata = client.get_object(**request_options)
            body = metadata["Body"]
            status = metadata.get("ResponseMetadata", {}).get("HTTPStatusCode", 200)
    except RuntimeError as error:
        app.logger.error("R2 game-file service is not configured: %s", error)
        return Response("Game files are temporarily unavailable.\n", status=503, mimetype="text/plain")
    except ClientError as error:
        error_code = error.response.get("Error", {}).get("Code", "")
        if error_code in {"NoSuchKey", "NoSuchBucket", "404", "NotFound"}:
            abort(404)
        app.logger.error("R2 request failed for %s: %s", key, error_code)
        return Response("Game files are temporarily unavailable.\n", status=502, mimetype="text/plain")
    except BotoCoreError:
        app.logger.exception("R2 request failed for %s", key)
        return Response("Game files are temporarily unavailable.\n", status=502, mimetype="text/plain")

    etag = metadata.get("ETag")
    if etag and request.if_none_match.contains(etag.strip('"')):
        if body is not None:
            body.close()
        return Response(status=304, headers={"ETag": etag})

    headers = {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
    }
    if metadata.get("ContentLength") is not None:
        headers["Content-Length"] = str(metadata["ContentLength"])
    if etag:
        headers["ETag"] = etag
    for metadata_name, header_name in (
        ("ContentRange", "Content-Range"),
        ("ContentEncoding", "Content-Encoding"),
        ("LastModified", "Last-Modified"),
    ):
        if metadata.get(metadata_name):
            value = metadata[metadata_name]
            headers[header_name] = (
                value.strftime("%a, %d %b %Y %H:%M:%S GMT")
                if metadata_name == "LastModified"
                else value
            )

    content_type = metadata.get("ContentType") or mimetypes.guess_type(key)[0] or "application/octet-stream"
    if body is None:
        return Response(status=status, headers=headers, content_type=content_type)

    def stream_body():
        try:
            yield from body.iter_chunks(chunk_size=64 * 1024)
        finally:
            body.close()

    return Response(stream_body(), status=status, headers=headers, content_type=content_type)


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
        response = _serve_r2_object("games/Slow Roads/index.html")
        if response.status_code != 200:
            return response
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
    return render_template("calculator.html", tools=list(STUDY_TOOLS.values()))


def _number_field(name, label, placeholder="Enter a value", step="any"):
    return {"name": name, "label": label, "type": "number", "placeholder": placeholder, "step": step}


def _text_field(name, label, placeholder="Enter values", rows=3):
    return {"name": name, "label": label, "type": "textarea", "placeholder": placeholder, "rows": rows}


def _select_field(name, label, options, default=None):
    return {"name": name, "label": label, "type": "select", "options": options, "default": default}


def _tool(slug, kind, title, description, symbol, category, style, fields):
    return slug, {
        "slug": slug,
        "kind": kind,
        "title": title,
        "description": description,
        "symbol": symbol,
        "category": category,
        "style": style,
        "fields": fields,
    }


LENGTH_OPTIONS = [("mm", "Millimeters (mm)"), ("cm", "Centimeters (cm)"), ("m", "Meters (m)"), ("km", "Kilometers (km)"), ("in", "Inches (in)"), ("ft", "Feet (ft)"), ("yd", "Yards (yd)"), ("mi", "Miles (mi)")]
TEMPERATURE_OPTIONS = [("c", "Celsius (°C)"), ("f", "Fahrenheit (°F)"), ("k", "Kelvin (K)")]
MASS_OPTIONS = [("mg", "Milligrams (mg)"), ("g", "Grams (g)"), ("kg", "Kilograms (kg)"), ("oz", "Ounces (oz)"), ("lb", "Pounds (lb)"), ("ton", "US tons")]
FRACTION_OPERATIONS = [("+", "Add (+)"), ("-", "Subtract (−)"), ("*", "Multiply (×)"), ("/", "Divide (÷)")]

STUDY_TOOLS = dict([
    _tool("percentage", "percentage", "Percentage calculator", "Find a percentage of a number, compare amounts, or check a discount.", "%", "QUICK MATH", "tool-blue", [
        _number_field("percent", "Percentage", "e.g. 15"),
        _number_field("amount", "Number", "e.g. 80"),
    ]),
    _tool("grades", "grades", "Grade average", "Average quiz, test, and assignment scores from 0 to 100.", "x̄", "SCHOOL", "tool-teal", [
        _text_field("scores", "Scores", "e.g. 85, 92, 78"),
    ]),
    _tool("fractions", "fractions", "Fraction simplifier", "Reduce a fraction to its simplest form and see the decimal value.", "a⁄b", "FRACTIONS", "tool-purple", [
        _number_field("numerator", "Numerator", "e.g. 18", "1"),
        _number_field("denominator", "Denominator", "e.g. 24", "1"),
    ]),
    _tool("length", "length", "Length converter", "Convert common metric and imperial measurements.", "↔", "CONVERSIONS", "tool-orange", [
        _number_field("value", "Value"),
        _select_field("from", "From", LENGTH_OPTIONS, "m"),
        _select_field("to", "To", LENGTH_OPTIONS, "ft"),
    ]),
    _tool("ratio", "ratio", "Ratio solver", "Solve a missing value in an equivalent proportion a:b = c:x.", "a:b", "RATIOS", "tool-blue", [
        _number_field("a", "First value (a)"),
        _number_field("b", "Second value (b)"),
        _number_field("c", "Third value (c)"),
    ]),
    _tool("gcf-lcm", "gcf-lcm", "GCF & LCM finder", "Find the greatest common factor and least common multiple of two integers.", "G", "NUMBER SENSE", "tool-teal", [
        _number_field("a", "First integer", "e.g. 18", "1"),
        _number_field("b", "Second integer", "e.g. 24", "1"),
    ]),
    _tool("statistics", "statistics", "Mean, median & mode", "Summarize a list of numbers with three common averages.", "x̄", "DATA", "tool-purple", [
        _text_field("data", "Numbers", "e.g. 4, 7, 7, 10"),
    ]),
    _tool("prime-factors", "prime-factors", "Prime & factor checker", "Check whether a whole number is prime and see its prime factorization.", "p", "NUMBER SENSE", "tool-orange", [
        _number_field("number", "Whole number (2 to 1 trillion)", "e.g. 84", "1"),
    ]),
    _tool("powers", "powers", "Powers calculator", "Raise a number to any power and get the result.", "xⁿ", "EXPONENTS", "tool-teal", [
        _number_field("base", "Base", "e.g. 2"),
        _number_field("exponent", "Exponent", "e.g. 8"),
    ]),
    _tool("linear-equation", "linear-equation", "Linear equation solver", "Solve an equation in the form ax + b = c.", "ax", "ALGEBRA", "tool-purple", [
        _number_field("a", "Coefficient (a)"),
        _number_field("b", "Constant (b)"),
        _number_field("c", "Right side (c)"),
    ]),
    _tool("quadratic-equation", "quadratic-equation", "Quadratic equation solver", "Find the real solutions to ax² + bx + c = 0.", "x²", "ALGEBRA", "tool-orange", [
        _number_field("a", "Coefficient (a)"),
        _number_field("b", "Coefficient (b)"),
        _number_field("c", "Constant (c)"),
    ]),
    _tool("pythagorean", "pythagorean", "Right triangle solver", "Find the hypotenuse from the lengths of the two shorter sides.", "√", "GEOMETRY", "tool-blue", [
        _number_field("sideA", "Side a"),
        _number_field("sideB", "Side b"),
    ]),
    _tool("circle", "circle", "Circle calculator", "Calculate a circle’s area and circumference from its radius.", "πr²", "GEOMETRY", "tool-teal", [
        _number_field("radius", "Radius"),
    ]),
    _tool("rectangle", "rectangle", "Rectangle calculator", "Calculate the area, perimeter, and diagonal of a rectangle.", "▱", "GEOMETRY", "tool-purple", [
        _number_field("length", "Length"),
        _number_field("width", "Width"),
    ]),
    _tool("temperature", "temperature", "Temperature converter", "Convert between Celsius, Fahrenheit, and Kelvin.", "°", "CONVERSIONS", "tool-orange", [
        _number_field("value", "Temperature"),
        _select_field("from", "From", TEMPERATURE_OPTIONS, "c"),
        _select_field("to", "To", TEMPERATURE_OPTIONS, "f"),
    ]),
    _tool("mass", "mass", "Mass converter", "Convert metric mass units, ounces, pounds, and US tons.", "kg", "CONVERSIONS", "tool-teal", [
        _number_field("value", "Value"),
        _select_field("from", "From", MASS_OPTIONS, "kg"),
        _select_field("to", "To", MASS_OPTIONS, "lb"),
    ]),
    _tool("number-base", "number-base", "Number base converter", "Convert a decimal integer to binary, octal, and hexadecimal.", "2ⁿ", "NUMBER SENSE", "tool-purple", [
        _number_field("number", "Decimal integer", "e.g. 255", "1"),
    ]),
    _tool("roman-numerals", "roman-numerals", "Roman numeral converter", "Convert a whole number from 1 to 3,999 into Roman numerals.", "I", "NUMBER SENSE", "tool-orange", [
        _number_field("number", "Whole number (1 to 3,999)", "e.g. 2025", "1"),
    ]),
    _tool("multiplication-table", "multiplication-table", "Multiplication table", "Build a multiplication table for any number, up to 20 rows.", "×", "SCHOOL", "tool-blue", [
        _number_field("number", "Number", "e.g. 7"),
        _number_field("limit", "Number of rows (1 to 20)", "12", "1"),
    ]),
    _tool("scientific-notation", "scientific-notation", "Scientific notation converter", "Express a number in scientific notation and standard form.", "10ⁿ", "NUMBER SENSE", "tool-teal", [
        _number_field("number", "Number", "e.g. 6020000"),
    ]),
    _tool("decimal-converter", "decimal-converter", "Decimal, fraction & percent", "Convert a decimal into its simplest fraction and percentage.", "½", "FRACTIONS", "tool-purple", [
        _number_field("decimal", "Decimal number", "e.g. 0.375"),
    ]),
    _tool("fraction-arithmetic", "fraction-arithmetic", "Fraction calculator", "Add, subtract, multiply, or divide two fractions.", "a/b", "FRACTIONS", "tool-orange", [
        _number_field("numeratorA", "First numerator", "e.g. 1", "1"),
        _number_field("denominatorA", "First denominator", "e.g. 2", "1"),
        _select_field("operation", "Operation", FRACTION_OPERATIONS, "+"),
        _number_field("numeratorB", "Second numerator", "e.g. 1", "1"),
        _number_field("denominatorB", "Second denominator", "e.g. 3", "1"),
    ]),
    _tool("probability", "probability", "Probability calculator", "Find the chance of an event from favorable and total outcomes.", "P", "DATA", "tool-blue", [
        _number_field("favorable", "Favorable outcomes", "e.g. 1", "1"),
        _number_field("total", "Total possible outcomes", "e.g. 6", "1"),
    ]),
    _tool("slope", "slope", "Slope calculator", "Find the slope between two points on a coordinate plane.", "m", "ALGEBRA", "tool-teal", [
        _number_field("x1", "x₁"),
        _number_field("y1", "y₁"),
        _number_field("x2", "x₂"),
        _number_field("y2", "y₂"),
    ]),
    _tool("coordinate-distance", "coordinate-distance", "Coordinate distance & midpoint", "Find the distance and midpoint between two points.", "↔", "GEOMETRY", "tool-purple", [
        _number_field("x1", "x₁"),
        _number_field("y1", "y₁"),
        _number_field("x2", "x₂"),
        _number_field("y2", "y₂"),
    ]),
])


@app.get("/tools/<tool_slug>")
def study_tool(tool_slug):
    tool = STUDY_TOOLS.get(tool_slug)
    if tool is None:
        abort(404)
    return render_template("study_tool.html", tool=tool)


@app.get("/scientific-calculator")
def game_catalog():
    return send_from_directory(str(PROJECT_ROOT), "index.html")

@app.get("/space-waves")
def space_waves_page():
    return _serve_r2_object("games/ALEX MODS - Space Waves.html")


@app.get("/slowroads")
def slow_roads_redirect():
    return redirect("/slowroads/", code=308)


@app.get("/slowroads/")
def slow_roads_page():
    return _slow_roads_document()


@app.get("/slowroads/_app/<path:resource>")
def slow_roads_app_file(resource):
    return _serve_r2_object(f"games/Slow Roads/_app/{resource}")


@app.get("/slowroads/alea.min.js")
def slow_roads_alea():
    return _serve_r2_object("games/Slow Roads/alea.min.js")


@app.get("/slowroads/service-worker.js")
def slow_roads_service_worker():
    # Keep the upstream worker disabled; its cache logic targets the site root.
    return Response("", mimetype="application/javascript")


@app.get("/slowroads/favicon.svg")
@app.get("/slowroads/icon.svg")
def slow_roads_favicon():
    return _serve_r2_object("games/Slow Roads/favicon.svg")


@app.get("/slowroads/apple-touch-icon.png")
def slow_roads_apple_touch_icon():
    return _serve_r2_object("games/Slow Roads/apple-touch-icon.png")


@app.get("/slowroads/fonts/<path:resource>")
def slow_roads_font(resource):
    return _serve_r2_object(f"games/Slow Roads/fonts/{resource}")


@app.get("/slowroads/img/<path:resource>")
def slow_roads_image(resource):
    if resource in SLOW_ROADS_OMITTED_VIDEOS:
        app.logger.warning("Slow Roads preview video omitted from local mirror: %s", resource)
        return Response(status=204)
    return _serve_r2_object(f"games/Slow Roads/img/{resource}")


@app.get("/slowroads/manifest.json")
def slow_roads_manifest():
    return _serve_r2_object("games/Slow Roads/manifest.json")


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
    return _serve_r2_object("games/game.txt")


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
    if resource.startswith(("games/", "screenshots/")):
        return _serve_r2_object(resource)
    return send_from_directory(str(PROJECT_ROOT), resource)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))

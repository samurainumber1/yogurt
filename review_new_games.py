"""Local playtest deck for the games in ./new games."""

from __future__ import annotations

import json
import re
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
GAMES_DIR = ROOT / "new games"
PROGRESS_FILE = GAMES_DIR / ".review-progress.json"
UI_HOST = "127.0.0.1"
UI_PORT = 8765
GAME_HOST = "127.0.0.1"
GAME_PORT = 8766
UI_ORIGIN = f"http://{UI_HOST}:{UI_PORT}"
GAME_ORIGIN = f"http://{GAME_HOST}:{GAME_PORT}"
STATE_LOCK = threading.RLock()
BROKEN_NAME = re.compile(r"\s\(BROKEN: .+\)\.html$", re.IGNORECASE)


PAGE = r'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#080a12">
  <title>New Games · Playtest Deck</title>
  <style>
    :root{color-scheme:dark;--bg:#080a12;--panel:#111522;--line:#ffffff1b;--muted:#9ba5ba;--text:#f6f7ff;--violet:#a17bff;--cyan:#72edff;--red:#ff6d91;font:14px/1.4 "Segoe UI",Arial,sans-serif}
    *{box-sizing:border-box}html,body{width:100%;height:100%;margin:0;overflow:hidden;background:var(--bg);color:var(--text)}
    body{display:grid;grid-template-rows:auto minmax(0,1fr);background:radial-gradient(ellipse at 50% -25%,#5036a744,transparent 52%),radial-gradient(ellipse at 0 100%,#0babc31c,transparent 42%),var(--bg)}
    .topbar{position:relative;z-index:2;min-height:91px;display:grid;grid-template-columns:minmax(165px,.9fr) minmax(180px,1.15fr) auto;align-items:center;gap:24px;padding:13px clamp(14px,2.4vw,38px);border-bottom:1px solid var(--line);background:linear-gradient(180deg,#ffffff08,#ffffff02);box-shadow:0 12px 42px #0003}
    .brand{min-width:0;display:flex;align-items:center;gap:12px}.brand-mark{width:42px;height:42px;flex:0 0 auto;display:grid;place-items:center;border:1px solid #c3a8ff66;border-radius:14px;color:#fff;background:linear-gradient(145deg,#a17bff,#542de1 75%);box-shadow:0 0 32px #825aff55,inset 0 1px #ffffff65;font-weight:900;font-size:16px;letter-spacing:-.08em}.brand-copy{min-width:0;display:grid;gap:4px}.brand-copy strong{font-size:11px;letter-spacing:.14em}.brand-copy small{color:var(--muted);font-size:9px;letter-spacing:.12em}
    .now-playing{min-width:0;text-align:center}.progress{color:var(--cyan);font-size:9px;font-weight:800;letter-spacing:.2em;text-transform:uppercase}.progress::before{content:"";display:inline-block;width:6px;height:6px;margin:0 7px 1px 0;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan)}.now-playing h1{overflow:hidden;margin:3px auto 0;font-size:clamp(16px,2vw,22px);font-weight:650;letter-spacing:-.035em;text-overflow:ellipsis;white-space:nowrap}.filename{display:block;overflow:hidden;margin-top:2px;color:#7e899e;font-size:10px;text-overflow:ellipsis;white-space:nowrap}
    .actions{display:flex;align-items:center;justify-content:flex-end;gap:8px}.button{min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 15px;border:1px solid var(--line);border-radius:12px;color:#e7e9f5;background:linear-gradient(150deg,#ffffff12,#ffffff05);box-shadow:inset 0 1px #ffffff0b;cursor:pointer;font:inherit;font-size:11px;font-weight:700;line-height:1;letter-spacing:.035em;transition:transform .16s,border-color .16s,background .16s,box-shadow .16s}.button:hover{transform:translateY(-1px);border-color:#ffffff44;background:#ffffff12}.button:active{transform:translateY(0)}.button:focus-visible,textarea:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}.button:disabled{opacity:.5;cursor:wait;transform:none}.button .icon{font-size:15px;line-height:1}.keep{border-color:#9e81ff8a;background:linear-gradient(125deg,#875cff,#5632d2);box-shadow:0 5px 22px #7044ee44,inset 0 1px #ffffff5c}.keep:hover{border-color:#d7caff;background:linear-gradient(125deg,#a47cff,#6946e3);box-shadow:0 8px 28px #7044ee66,inset 0 1px #ffffff66}.broken:hover{border-color:#ffc66480;color:#ffdf9b;background:#ffbb2914}.delete{color:#ffb1c3}.delete:hover{border-color:#ff6d9180;color:#ffd2dc;background:#ff416d18}.history{color:#d7ccff}.history:hover{border-color:#9e81ff80;color:#fff;background:#8259ff1b}.reload:hover{border-color:#72edff88;color:#baf8ff;background:#36c6e31a}
    main{min-width:0;min-height:0;position:relative;padding:13px clamp(8px,1.4vw,22px) clamp(8px,1.3vw,18px)}.stage{width:100%;height:100%;overflow:hidden;position:relative;border:1px solid #b7a5ff44;border-radius:18px;background:#020308;box-shadow:0 28px 90px #0008,0 0 55px #7552ff1e,inset 0 1px #ffffff24}.stage::after{content:"";position:absolute;inset:0;border:1px solid #ffffff09;border-radius:inherit;pointer-events:none;background:linear-gradient(180deg,#ffffff0a,transparent 12%)}iframe{width:100%;height:100%;display:block;border:0;background:#03040a}.empty{position:absolute;inset:13px clamp(8px,1.4vw,22px) clamp(8px,1.3vw,18px);display:none;place-items:center;text-align:center}.empty.visible{display:grid}.empty-card{max-width:500px;padding:36px;border:1px solid var(--line);border-radius:24px;background:linear-gradient(145deg,#ffffff0c,#ffffff03);box-shadow:0 30px 90px #0008}.empty-mark{font-size:38px}.empty h2{margin:12px 0 7px;font-size:28px;letter-spacing:-.04em}.empty p{margin:0;color:var(--muted);line-height:1.7}
    dialog{width:min(520px,calc(100% - 28px));padding:0;border:1px solid #ffffff26;border-radius:20px;color:var(--text);background:#121522;box-shadow:0 34px 100px #000b}dialog::backdrop{background:#02030acc;backdrop-filter:blur(7px)}.dialog-card{position:relative;padding:25px}.dialog-card h2{margin:0 40px 8px 0;font-size:23px;letter-spacing:-.04em}.dialog-card p{margin:0 0 18px;color:var(--muted);line-height:1.6}.dialog-close{position:absolute;top:16px;right:16px;width:34px;height:34px;padding:0;border-radius:10px;font-size:20px}.dialog-card textarea{width:100%;min-height:110px;resize:vertical;padding:12px;border:1px solid var(--line);border-radius:11px;color:var(--text);background:#090c14;font:inherit;font-size:13px;line-height:1.5}.dialog-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:15px}.confirm-delete h2{color:#ffb1c3}.toast{position:fixed;z-index:5;left:50%;bottom:22px;max-width:calc(100% - 24px);padding:11px 15px;border:1px solid #ffffff25;border-radius:12px;color:#f4f5fb;background:#181c2b;box-shadow:0 12px 38px #0008;opacity:0;pointer-events:none;transform:translate(-50%,10px);transition:.18s}.toast.show{opacity:1;transform:translate(-50%,0)}
    @media(max-width:820px){.topbar{grid-template-columns:auto minmax(120px,1fr);gap:10px;padding:10px 12px}.brand{gap:8px}.brand-mark{width:36px;height:36px;border-radius:12px}.brand-copy small{font-size:8px}.now-playing{text-align:right}.actions{grid-column:1/-1;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}.button{min-height:38px;padding-inline:8px;font-size:10px}.topbar{row-gap:9px}}
    @media(max-width:430px){.brand-copy strong{font-size:9px}.now-playing h1{font-size:15px}.filename{max-width:44vw;margin-left:auto}.button{gap:5px;padding-inline:3px;font-size:8px}.button .icon{font-size:12px}main{padding:7px}.stage{border-radius:12px}.empty{inset:7px}}
  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand"><span class="brand-mark" aria-hidden="true">AM</span><div class="brand-copy"><strong>PLAYTEST DECK</strong><small>LOCAL GAME REVIEW</small></div></div>
    <div class="now-playing"><div class="progress" id="progress">CONNECTING</div><h1 id="gameTitle">Loading your review queue…</h1><span class="filename" id="fileName"></span></div>
    <nav class="actions" aria-label="Review this game">
      <button class="button history" id="previousButton" type="button" disabled><span class="icon" aria-hidden="true">←</span> Previous</button>
      <button class="button reload" id="reloadButton" type="button" disabled><span class="icon" aria-hidden="true">↻</span> Reload game</button>
      <button class="button keep" id="keepButton" type="button" disabled><span class="icon" aria-hidden="true">✓</span> Keep · Next</button>
      <button class="button broken" id="brokenButton" type="button" disabled><span class="icon" aria-hidden="true">⚑</span> Mark broken</button>
      <button class="button delete" id="deleteButton" type="button" disabled><span class="icon" aria-hidden="true">×</span> Delete</button>
    </nav>
  </header>
  <main>
    <section class="stage" id="stage"><iframe id="gameFrame" title="Game under review" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-modals allow-downloads allow-presentation" allow="fullscreen; autoplay; gamepad" referrerpolicy="no-referrer"></iframe></section>
    <section class="empty" id="emptyState"><div class="empty-card"><div class="empty-mark" aria-hidden="true">✦</div><h2>Review queue complete</h2><p>Every game has been kept, marked broken, or deleted. Your decisions are saved locally.</p></div></section>
  </main>
  <dialog id="brokenDialog"><form class="dialog-card" id="brokenForm"><button class="button dialog-close" id="closeBroken" type="button" aria-label="Close">×</button><h2>Mark this game broken</h2><p>Tell Alex what failed. The reason will be added to the filename so it’s easy to find and fix.</p><textarea id="brokenReason" maxlength="300" required placeholder="Example: stays on a black screen after loading"></textarea><div class="dialog-actions"><button class="button" id="cancelBroken" type="button">Cancel</button><button class="button broken" type="submit">Mark broken · Next</button></div></form></dialog>
  <dialog id="deleteDialog"><div class="dialog-card confirm-delete"><button class="button dialog-close" id="closeDelete" type="button" aria-label="Close">×</button><h2>Delete this game?</h2><p id="deleteMessage">This permanently removes the file from the review folder.</p><div class="dialog-actions"><button class="button" id="cancelDelete" type="button">Keep it</button><button class="button delete" id="confirmDelete" type="button">Delete · Next</button></div></div></dialog>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script>
    "use strict";
    const frame = document.querySelector("#gameFrame");
    const title = document.querySelector("#gameTitle");
    const fileName = document.querySelector("#fileName");
    const progress = document.querySelector("#progress");
    const controls = [...document.querySelectorAll(".actions button")];
    const brokenDialog = document.querySelector("#brokenDialog");
    const deleteDialog = document.querySelector("#deleteDialog");
    let queueCurrent = null;
    let displayName = null;
    let revisitOffset = 0;
    let currentState = null;
    let toastTimer;

    function showToast(message) {
      const toast = document.querySelector("#toast");
      toast.textContent = message;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
    }
    function titleFromFile(name) { return name.replace(/\.html$/i, "").replace(/[_-]+/g, " "); }
    function gameUrl(name) { return `${currentState.gameOrigin}/${encodeURIComponent(name)}`; }
    function renderCurrent() {
      const revisiting = revisitOffset > 0;
      const empty = !displayName;
      document.querySelector("#emptyState").classList.toggle("visible", empty);
      document.querySelector("#stage").style.visibility = empty ? "hidden" : "visible";
      document.querySelector("#reloadButton").disabled = empty;
      document.querySelector("#previousButton").disabled = !currentState.history.length || revisitOffset >= currentState.history.length;
      document.querySelector("#keepButton").disabled = empty;
      document.querySelector("#brokenButton").disabled = empty || revisiting;
      document.querySelector("#deleteButton").disabled = empty || revisiting;
      document.querySelector("#keepButton").innerHTML = revisiting
        ? '<span class="icon" aria-hidden="true">↩</span> Return to current'
        : '<span class="icon" aria-hidden="true">✓</span> Keep · Next';
      if (empty) {
        title.textContent = "All games reviewed";
        fileName.textContent = "Your review queue is complete";
        progress.textContent = `${currentState.processed} / ${currentState.total} COMPLETE`;
        frame.src = "about:blank";
        return;
      }
      title.textContent = titleFromFile(displayName);
      fileName.textContent = displayName;
      progress.textContent = revisiting
        ? `REVISIT · ${currentState.processed} / ${currentState.total}`
        : `${String(currentState.processed + 1).padStart(2, "0")} / ${currentState.total} · ${currentState.remaining} LEFT`;
      frame.src = gameUrl(displayName);
    }
    async function refresh() {
      const response = await fetch("/api/state", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load the review queue");
      currentState = await response.json();
      queueCurrent = currentState.current;
      revisitOffset = 0;
      displayName = queueCurrent ? queueCurrent.name : null;
      renderCurrent();
    }
    async function act(action, reason = "") {
      if (!queueCurrent || revisitOffset > 0) return;
      controls.forEach(button => button.disabled = true);
      try {
        const response = await fetch("/api/action", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, name: queueCurrent.name, reason })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not update the game");
        if (action === "keep") showToast("Kept · moving to the next game");
        if (action === "broken") showToast(`Marked broken: ${result.newName}`);
        if (action === "delete") showToast("Game deleted · moving to the next one");
        await refresh();
      } catch (error) {
        showToast(error.message);
        renderCurrent();
      }
    }
    function returnToCurrent() {
      revisitOffset = 0;
      displayName = queueCurrent ? queueCurrent.name : null;
      renderCurrent();
    }
    document.querySelector("#previousButton").addEventListener("click", () => {
      if (revisitOffset >= currentState.history.length) return;
      revisitOffset++;
      displayName = currentState.history[currentState.history.length - revisitOffset];
      renderCurrent();
    });
    document.querySelector("#reloadButton").addEventListener("click", () => {
      if (!displayName) return;
      const url = gameUrl(displayName);
      frame.src = "about:blank";
      requestAnimationFrame(() => { frame.src = url; });
    });
    document.querySelector("#keepButton").addEventListener("click", () => revisitOffset > 0 ? returnToCurrent() : act("keep"));
    document.querySelector("#brokenButton").addEventListener("click", () => {
      document.querySelector("#brokenReason").value = "";
      brokenDialog.showModal();
      document.querySelector("#brokenReason").focus();
    });
    document.querySelector("#brokenForm").addEventListener("submit", event => {
      event.preventDefault();
      const reason = document.querySelector("#brokenReason").value.trim();
      if (!reason) return;
      brokenDialog.close();
      act("broken", reason);
    });
    document.querySelector("#deleteButton").addEventListener("click", () => {
      document.querySelector("#deleteMessage").textContent = `“${queueCurrent.name}” will be permanently removed from the review folder.`;
      deleteDialog.showModal();
    });
    document.querySelector("#confirmDelete").addEventListener("click", () => { deleteDialog.close(); act("delete"); });
    for (const [id, dialog] of [["closeBroken", brokenDialog], ["cancelBroken", brokenDialog], ["closeDelete", deleteDialog], ["cancelDelete", deleteDialog]]) {
      document.querySelector(`#${id}`).addEventListener("click", () => dialog.close());
    }
    document.addEventListener("keydown", event => {
      if (event.target.closest("input,textarea,select") || brokenDialog.open || deleteDialog.open) return;
      if ((event.key === "ArrowRight" || event.key.toLowerCase() === "k") && displayName) revisitOffset > 0 ? returnToCurrent() : act("keep");
      if (event.key === "ArrowLeft" && !document.querySelector("#previousButton").disabled) document.querySelector("#previousButton").click();
      if (event.key.toLowerCase() === "r" && displayName) document.querySelector("#reloadButton").click();
      if (event.key.toLowerCase() === "b" && displayName && revisitOffset === 0) document.querySelector("#brokenButton").click();
      if (event.key.toLowerCase() === "d" && displayName && revisitOffset === 0) document.querySelector("#deleteButton").click();
    });
    refresh().catch(error => { title.textContent = "Could not start the review server"; fileName.textContent = error.message; });
  </script>
</body>
</html>'''


def games_on_disk() -> list[Path]:
    return sorted(
        (path for path in GAMES_DIR.iterdir()
         if path.is_file() and path.suffix.lower() == ".html" and not BROKEN_NAME.search(path.name)),
        key=lambda path: path.name.casefold(),
    )


def load_state() -> dict:
    try:
        data = json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("Progress data must be an object")
        kept = data.get("kept", [])
        if not isinstance(kept, list) or any(not isinstance(name, str) for name in kept):
            kept = []
        history = data.get("history", [])
        if not isinstance(history, list) or any(not isinstance(name, str) for name in history):
            history = []
        return {
            "total": max(0, int(data.get("total", 0))),
            "processed": max(0, int(data.get("processed", 0))),
            "kept": set(kept),
            "history": history,
        }
    except (OSError, ValueError, TypeError, json.JSONDecodeError):
        return {"total": 0, "processed": 0, "kept": set(), "history": []}


def save_state(state: dict) -> None:
    payload = {
        "total": state["total"],
        "processed": state["processed"],
        "kept": sorted(state["kept"], key=str.casefold),
        "history": state["history"],
    }
    temporary = PROGRESS_FILE.with_suffix(".tmp")
    temporary.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    temporary.replace(PROGRESS_FILE)


def snapshot() -> dict:
    with STATE_LOCK:
        state = load_state()
        candidates = games_on_disk()
        if state["total"] == 0 and state["processed"] == 0 and not state["kept"]:
            state["total"] = len(candidates)
            save_state(state)
        pending = [path for path in candidates if path.name not in state["kept"]]
        history = [
            name for name in state["history"]
            if Path(name).name == name
            and Path(name).suffix.lower() == ".html"
            and (GAMES_DIR / name).is_file()
        ]
        return {
            "current": {"name": pending[0].name} if pending else None,
            "total": state["total"],
            "processed": state["processed"],
            "remaining": len(pending),
            "history": history,
            "gameOrigin": GAME_ORIGIN,
        }


def sanitize_reason(reason: str, stem: str) -> str:
    reason = re.sub(r"[<>:\"/\\|?*\x00-\x1f]", "-", reason)
    reason = re.sub(r"\s+", " ", reason).strip(" .-")
    max_reason = max(24, 170 - len(stem) - len(" (BROKEN: ).html"))
    return (reason[:max_reason].rstrip(" .-") or "Unspecified problem")


class ReviewHandler(BaseHTTPRequestHandler):
    server_version = "LocalGameReview/1.0"

    def log_message(self, fmt: str, *args) -> None:
        print(f"[review] {self.address_string()} {fmt % args}")

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Cache-Control", "no-store")
        if urlsplit(self.path).path == "/":
            self.send_header(
                "Content-Security-Policy",
                f"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; "
                f"connect-src 'self'; frame-src {GAME_ORIGIN}; img-src 'self' data:; object-src 'none'; "
                f"base-uri 'none'; form-action 'none'",
            )
        super().end_headers()

    def send_json(self, data: dict, status: int = 200) -> None:
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/":
            body = PAGE.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif path == "/api/state":
            self.send_json(snapshot())
        else:
            self.send_json({"error": "Not found"}, 404)

    def do_POST(self) -> None:
        if self.headers.get("Origin") != UI_ORIGIN:
            self.send_json({"error": "Rejected request from another origin"}, 403)
            return
        if urlsplit(self.path).path != "/api/action":
            self.send_json({"error": "Not found"}, 404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 1 or length > 4096:
                raise ValueError("Invalid request size")
            data = json.loads(self.rfile.read(length))
            action = data.get("action")
            name = data.get("name")
            if action not in {"keep", "broken", "delete"} or not isinstance(name, str):
                raise ValueError("Invalid action")
            if Path(name).name != name or Path(name).suffix.lower() != ".html":
                raise ValueError("Invalid game filename")
            with STATE_LOCK:
                state = load_state()
                candidates = games_on_disk()
                pending = [path for path in candidates if path.name not in state["kept"]]
                if not pending or pending[0].name != name:
                    self.send_json({"error": "The review queue changed; refresh and try again"}, 409)
                    return
                source = pending[0]
                result = {}
                if action == "keep":
                    state["kept"].add(name)
                    state["history"].append(name)
                elif action == "delete":
                    source.unlink()
                else:
                    reason = data.get("reason")
                    if not isinstance(reason, str) or not reason.strip():
                        raise ValueError("Enter a reason for marking the game broken")
                    stem = source.stem
                    reason = sanitize_reason(reason.strip(), stem)
                    new_name = f"{stem} (BROKEN: {reason}).html"
                    destination = source.with_name(new_name)
                    suffix = 2
                    while destination.exists():
                        new_name = f"{stem} (BROKEN: {reason} {suffix}).html"
                        destination = source.with_name(new_name)
                        suffix += 1
                    source.rename(destination)
                    result["newName"] = new_name
                    state["history"].append(new_name)
                state["processed"] += 1
                if state["total"] == 0:
                    state["total"] = len(candidates)
                save_state(state)
            self.send_json({"ok": True, **result})
        except (ValueError, TypeError, json.JSONDecodeError) as error:
            self.send_json({"error": str(error)}, 400)
        except OSError as error:
            self.send_json({"error": f"Could not update the game file: {error}"}, 500)


class GameHandler(BaseHTTPRequestHandler):
    server_version = "LocalGameContent/1.0"

    GAME_CSP = (
        "default-src 'self' data: blob:; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:; "
        "style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; "
        "font-src 'self' data: blob:; media-src 'self' data: blob:; "
        "connect-src 'self' data: blob:; worker-src 'self' blob:; "
        "child-src 'self' blob:; frame-src 'self' data: blob:; object-src 'none'; "
        "base-uri 'self'; form-action 'none'; "
        f"frame-ancestors {UI_ORIGIN}; navigate-to 'self'"
    )

    def log_message(self, fmt: str, *args) -> None:
        print(f"[game] {self.address_string()} {fmt % args}")

    def do_GET(self) -> None:
        relative = unquote(urlsplit(self.path).path).lstrip("/")
        candidate = (GAMES_DIR / relative).resolve()
        try:
            candidate.relative_to(GAMES_DIR.resolve())
        except ValueError:
            self.send_error(404)
            return
        if not candidate.is_file() or candidate.suffix.lower() != ".html" or candidate.name.startswith("."):
            self.send_error(404)
            return
        try:
            size = candidate.stat().st_size
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(size))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Security-Policy", self.GAME_CSP)
            self.end_headers()
            with candidate.open("rb") as game_file:
                while chunk := game_file.read(1024 * 1024):
                    self.wfile.write(chunk)
        except (OSError, ConnectionError):
            return


def main() -> None:
    if not GAMES_DIR.is_dir():
        raise SystemExit(f"Game folder not found: {GAMES_DIR}")
    ui_server = ThreadingHTTPServer((UI_HOST, UI_PORT), ReviewHandler)
    try:
        game_server = ThreadingHTTPServer((GAME_HOST, GAME_PORT), GameHandler)
    except OSError:
        ui_server.server_close()
        raise
    threading.Thread(target=game_server.serve_forever, daemon=True).start()
    url = f"{UI_ORIGIN}/"
    print(f"Review deck: {url}")
    print(f"Games: {len(games_on_disk())} HTML files · loopback only")
    print("Game iframe uses a separate local origin and a restrictive CSP.")
    print("Press Ctrl+C to stop both local servers.")
    try:
        webbrowser.open(url)
        ui_server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping review servers.")
    finally:
        ui_server.shutdown()
        game_server.shutdown()
        ui_server.server_close()
        game_server.server_close()


if __name__ == "__main__":
    main()

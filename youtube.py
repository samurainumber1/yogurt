import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import OrderedDict
from pathlib import Path

from flask import Blueprint, abort, current_app, request, send_from_directory


youtube = Blueprint("youtube", __name__)
PROJECT_ROOT = Path(__file__).resolve().parent
YOUTUBE_API_ROOT = "https://www.googleapis.com/youtube/v3/"
YOUTUBE_VIDEO_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")
YOUTUBE_CHANNEL_ID = re.compile(r"^UC[A-Za-z0-9_-]{22}$")
YOUTUBE_CACHE = OrderedDict()
YOUTUBE_CACHE_TTL = 300


def youtube_api(endpoint, params):
    """Fetch a fixed YouTube Data API endpoint; callers cannot supply URLs."""
    api_key = os.environ.get("YOUTUBE_API_KEY", "").strip()
    if not api_key:
        return None, ("YouTube search is not configured on this server yet.", 503)
    cache_key = (endpoint, tuple(sorted((str(k), str(v)) for k, v in params.items())))
    now = time.time()
    cached = YOUTUBE_CACHE.get(cache_key)
    if cached and cached[0] > now:
        YOUTUBE_CACHE.move_to_end(cache_key)
        return cached[1], None
    query = urllib.parse.urlencode({**params, "key": api_key})
    req = urllib.request.Request(
        f"{YOUTUBE_API_ROOT}{endpoint}?{query}",
        headers={"Accept": "application/json", "User-Agent": "AlexModsYouTube/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            data = json.loads(response.read(1_000_000).decode("utf-8"))
    except urllib.error.HTTPError as error:
        if error.code == 403:
            return None, ("YouTube API quota or access limit reached. Try again later.", 503)
        if error.code == 404:
            return None, ("YouTube could not find that item.", 404)
        return None, ("YouTube is temporarily unavailable. Please try again.", 502)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError):
        return None, ("Could not reach YouTube right now. Please try again.", 502)
    YOUTUBE_CACHE[cache_key] = (now + YOUTUBE_CACHE_TTL, data)
    YOUTUBE_CACHE.move_to_end(cache_key)
    while len(YOUTUBE_CACHE) > 128:
        YOUTUBE_CACHE.popitem(last=False)
    return data, None


def youtube_error(message, code):
    response = current_app.response_class(
        response=json.dumps({"error": message}), status=code, mimetype="application/json"
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@youtube.get("/api/youtube/search")
def youtube_search():
    query = request.args.get("q", "").strip()
    if len(query) < 2 or len(query) > 100:
        return youtube_error("Search must be between 2 and 100 characters.", 400)
    try:
        limit = max(1, min(int(request.args.get("limit", "24")), 24))
    except ValueError:
        return youtube_error("Invalid result limit.", 400)
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": query,
        "maxResults": limit, "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    items = []
    items_data = data.get("items") if isinstance(data, dict) else None
    for item in items_data or []:
        if not isinstance(item, dict):
            continue
        video_id_data = item.get("id")
        snippet = item.get("snippet")
        if not isinstance(video_id_data, dict) or not isinstance(snippet, dict):
            continue
        video_id = video_id_data.get("videoId", "")
        if not isinstance(video_id, str) or not YOUTUBE_VIDEO_ID.fullmatch(video_id):
            continue
        items.append({
            "id": video_id,
            "title": snippet.get("title", ""),
            "channel": snippet.get("channelTitle", ""),
            "channelId": snippet.get("channelId", ""),
            "publishedAt": snippet.get("publishedAt", ""),
            "description": snippet.get("description", ""),
        })
    return {"items": items}


@youtube.get("/api/youtube/shorts")
def youtube_shorts():
    query = request.args.get("q", "").strip()
    if len(query) > 100:
        return youtube_error("Search must be no longer than 100 characters.", 400)
    try:
        limit = max(1, min(int(request.args.get("limit", "20")), 24))
    except ValueError:
        return youtube_error("Invalid result limit.", 400)
    # YouTube Data API has no dedicated Shorts feed. This uses its supported video search.
    phrase = f"{query} #shorts".strip() or "#shorts"
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": phrase,
        "maxResults": limit, "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    items = []
    for item in data.get("items", []) or []:
        if not isinstance(item, dict):
            continue
        video_id_data = item.get("id")
        video_id = video_id_data.get("videoId", "") if isinstance(video_id_data, dict) else ""
        if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
            continue
        snippet = item.get("snippet") or {}
        items.append({
            "id": video_id,
            "title": snippet.get("title", ""),
            "channel": snippet.get("channelTitle", ""),
            "channelId": snippet.get("channelId", ""),
            "publishedAt": snippet.get("publishedAt", ""),
        })
    return {"items": items}


@youtube.get("/api/youtube/channel/<channel_id>")
def youtube_channel(channel_id):
    if not YOUTUBE_CHANNEL_ID.fullmatch(channel_id):
        return youtube_error("Invalid channel ID.", 400)
    data, error = youtube_api("channels", {"part": "snippet,statistics", "id": channel_id})
    if error:
        return youtube_error(*error)
    if not data or not data.get("items"):
        return youtube_error("This channel could not be found.", 404)
    channel = data["items"][0]
    snippet = channel.get("snippet", {})
    stats = channel.get("statistics", {})
    videos, video_error = youtube_api("search", {
        "part": "snippet", "type": "video", "channelId": channel_id,
        "order": "date", "maxResults": 24,
    })
    if video_error:
        return youtube_error(*video_error)
    items = [{
        "id": item.get("id", {}).get("videoId", ""),
        "title": item.get("snippet", {}).get("title", ""),
        "channel": item.get("snippet", {}).get("channelTitle", ""),
        "channelId": channel_id,
        "publishedAt": item.get("snippet", {}).get("publishedAt", ""),
    } for item in videos.get("items", []) if YOUTUBE_VIDEO_ID.fullmatch(item.get("id", {}).get("videoId", ""))]
    return {
        "id": channel_id, "title": snippet.get("title", ""),
        "description": snippet.get("description", ""),
        "subscriberCount": stats.get("subscriberCount"),
        "videoCount": stats.get("videoCount"),
        "avatar": f"/api/youtube/channel/{channel_id}/avatar",
        "items": items,
    }


@youtube.get("/api/youtube/channel/<channel_id>/avatar")
def youtube_channel_avatar(channel_id):
    if not YOUTUBE_CHANNEL_ID.fullmatch(channel_id):
        abort(400)
    data, error = youtube_api("channels", {"part": "snippet", "id": channel_id})
    if error:
        return youtube_error(*error)
    try:
        url = data["items"][0]["snippet"]["thumbnails"]["high"]["url"]
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme != "https" or parsed.hostname != "yt3.ggpht.com":
            abort(502)
        req = urllib.request.Request(url, headers={"User-Agent": "AlexModsYouTube/1.0"})
        with urllib.request.urlopen(req, timeout=5) as upstream:
            if urllib.parse.urlparse(upstream.geturl()).hostname != "yt3.ggpht.com":
                abort(502)
            content_type = upstream.headers.get_content_type()
            if content_type not in {"image/jpeg", "image/png", "image/webp"}:
                abort(404)
            image_data = upstream.read(1_000_000)
    except (KeyError, IndexError, urllib.error.URLError, TimeoutError, OSError):
        abort(404)
    response = current_app.response_class(image_data, mimetype=content_type)
    response.headers["Cache-Control"] = "public, max-age=86400"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@youtube.get("/api/youtube/video/<video_id>")
def youtube_video(video_id):
    if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
        return youtube_error("Invalid video ID.", 400)
    data, error = youtube_api("videos", {"part": "snippet,contentDetails,statistics,status", "id": video_id})
    if error:
        return youtube_error(*error)
    if not data.get("items"):
        return youtube_error("This video is unavailable or could not be found.", 404)
    item = data["items"][0]
    snippet = item.get("snippet", {})
    stats = item.get("statistics", {})
    return {
        "id": video_id, "title": snippet.get("title", ""),
        "description": snippet.get("description", ""),
        "channel": snippet.get("channelTitle", ""),
        "channelId": snippet.get("channelId", ""),
        "publishedAt": snippet.get("publishedAt", ""),
        "viewCount": stats.get("viewCount"),
        "duration": item.get("contentDetails", {}).get("duration", ""),
        "embeddable": item.get("status", {}).get("embeddable", True),
    }


@youtube.get("/api/youtube/suggestions")
def youtube_suggestions():
    query = request.args.get("q", "").strip()
    if len(query) < 2 or len(query) > 100:
        return {"items": []}
    data, error = youtube_api("search", {
        "part": "snippet", "type": "video", "q": query, "maxResults": 5,
        "safeSearch": "moderate",
    })
    if error:
        return youtube_error(*error)
    return {"items": list(dict.fromkeys(
        item.get("snippet", {}).get("title", "") for item in data.get("items", [])
        if item.get("snippet", {}).get("title")
    ))[:5]}


@youtube.get("/api/youtube/thumbnail/<video_id>")
def youtube_thumbnail(video_id):
    if not YOUTUBE_VIDEO_ID.fullmatch(video_id):
        abort(400)
    # This fixed host and fixed path prevent arbitrary URL fetching; images are cached upstream.
    target = f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
    req = urllib.request.Request(target, headers={"User-Agent": "AlexModsYouTube/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as upstream:
            if urllib.parse.urlparse(upstream.geturl()).hostname != "i.ytimg.com":
                abort(502)
            content_type = upstream.headers.get_content_type()
            if content_type != "image/jpeg":
                abort(404)
            image_data = upstream.read(1_500_000)
    except (urllib.error.URLError, TimeoutError, OSError):
        abort(502)
    response = current_app.response_class(image_data, mimetype="image/jpeg")
    response.headers["Cache-Control"] = "public, max-age=86400"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@youtube.get("/games/ALEX MODS - Encrypted YouTube.html")
def encrypted_youtube():
    return send_from_directory(str(PROJECT_ROOT / "games"), "ALEX MODS - Encrypted YouTube.html")

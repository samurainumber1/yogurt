# ALEX MODS YouTube frontend

The frontend is served at `/games/ALEX%20MODS%20-%20Encrypted%20YouTube.html` by the existing Flask app.

## Start it

1. Create a YouTube Data API v3 key in Google Cloud and enable the YouTube Data API v3 for that project.
2. Set `YOUTUBE_API_KEY` in the server environment. Keep it server-side; never put it in the HTML or browser JavaScript.
3. Install the project requirements if needed, then start the existing Flask app with `python server.py`. The default local address is `http://127.0.0.1:5000/games/ALEX%20MODS%20-%20Encrypted%20YouTube.html`.

The current deployment can set the same environment variable in its service configuration. Search and metadata features return a setup error when the key is absent. Responses are cached in memory for five minutes (thumbnail responses for one day).

## Network behavior

- Search, search suggestions, video metadata, and thumbnails are requested by the browser from the same-origin `/api/youtube/*` Flask routes. Flask calls the official YouTube Data API v3 for metadata and relays thumbnails from the fixed `i.ytimg.com` host. The backend accepts video IDs and search terms, never caller-supplied URLs.
- Video playback uses YouTube's official `youtube-nocookie.com` embedded player. The browser must connect to YouTube's player and video delivery services for playback; those media requests are not proxied. Playback remains subject to YouTube availability, regional restrictions, and the video's embedding permissions.
- The site does not request YouTube sign-in credentials, bypass access controls, or extract media streams.

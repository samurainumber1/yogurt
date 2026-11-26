# alex mods
this is the code for alex mods

alex mods was infact created by alex king

## Private server settings

Local development creates `instance/secrets.json` with a random admin password. That file is excluded from Git; keep it private and use the value of `admin_password` to sign in locally. You can set `ADMIN_PASSWORD` and `FLASK_SECRET_KEY` as environment variables to override local settings.

On Render, configure `ADMIN_PASSWORD` and `FLASK_SECRET_KEY` as secret environment variables in the service dashboard. The app does not use a built-in admin password in production, and disables admin sign-in if no password is configured. Secure session cookies are enabled on Render.

## Admin dashboard

Sign in at `/admin` to manage announcements, polls, and catalog access. Announcement and poll time menus use the administrator's local time and only offer times later today; scheduled announcements expire at local midnight. Polls support two to five choices, optional same-day closing, and archived aggregate results.

The dashboard shows 30 days of daily anonymous-tab counts and seven-day section trends. The catalog's trending list ranks the five most played games from the last seven UTC days. These analytics begin accumulating after deployment and retain daily records for 30 days; they do not store visitor names or addresses.

## Space Waves production page

Open <https://yogurt-ws0r.onrender.com/space-waves>. The game assets and connections are restricted to the production site origin.

## Cloudflare R2 game-file staging

The desktop folder `Alex Mods R2 Upload` is a local copy of the `games` and `screenshots` directories for R2 upload. Keep the directory structure intact at the bucket root so game and screenshot paths remain unchanged. Local copies stay on this PC, but `/games/` and `/screenshots/` are ignored and excluded from subsequent Git commits.

The app serves game pages, game assets, and catalog screenshots through the same-origin Flask server, which reads them from the private R2 bucket. Calculator and catalog pages remain local. The R2 access keys are read only by the server from `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`; they are never sent to browsers. Configure both variables as private environment variables in the production hosting service as well as locally. The machine-local uploader script remains Git-ignored.




# ALEX MODS IS NOT AFFILIATED, ENDORSED OR ASSOCIATED WITH COLAISTE BHALIE CHLAIR.

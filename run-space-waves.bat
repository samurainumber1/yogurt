@echo off
cd /d "%~dp0"
set PYTHONDONTWRITEBYTECODE=1
set ALEXMODS_SPACE_WAVES_LOCAL=1
python -c "import server; server.app.run(host='::1', port=5000)"

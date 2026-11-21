@echo off
cd /d "%~dp0"
python "%~dp0review_new_games.py"
if errorlevel 1 pause

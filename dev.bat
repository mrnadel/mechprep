@echo off
echo Stopping existing dev servers on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo Starting dev server...
cd /d "%~dp0"
npx next dev --turbopack

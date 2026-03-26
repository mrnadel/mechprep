@echo off
cd /d "%~dp0"
npx dotenv-cli -e .env.local -- npx tsx scripts/seed-content.ts
if %ERRORLEVEL% EQU 0 (
  echo.
  echo ✓ Content seeded successfully!
  powershell -c "[console]::beep(800,300); [console]::beep(1000,300); [console]::beep(1200,300)"
) else (
  echo.
  echo ✗ Seed failed!
  powershell -c "[console]::beep(400,500)"
)
pause

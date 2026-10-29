@echo off
echo Starting Starlight SOA Application...

echo Starting Backend Services...
cd /d "%~dp0starlight-backend"
start "STARLIGHT-BACKEND" cmd /k "build_and_run.bat"
cd /d "%~dp0"

echo Starting Frontend Website...
cd /d "%~dp0starlight-frontend"
start "STARLIGHT-FRONTEND" cmd /k "npm run dev"
cd /d "%~dp0"

echo.
echo ========================================================
echo ✅ All services are starting up!
echo.
echo 🌐 Website: http://localhost:5173
echo 📝 Swagger API Docs: http://localhost:8765
echo ⚙️ Eureka Dashboard: http://localhost:8761
echo ========================================================
pause

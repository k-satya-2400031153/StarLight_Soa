@echo off
echo Starting Starlight SOA Application...

echo Starting Backend Services...
cd starlight-backend
start cmd /k "build_and_run.bat"
cd ..

echo Starting Frontend Website...
cd starlight-frontend
start cmd /k "npm install && npm run dev"
cd ..

echo.
echo ========================================================
echo ✅ All services are starting up!
echo.
echo 🌐 Website: http://localhost:5173
echo 📝 Swagger API Docs: http://localhost:8765
echo ⚙️ Eureka Dashboard: http://localhost:8761
echo ========================================================
pause

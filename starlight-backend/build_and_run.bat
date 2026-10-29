@echo off
REM =====================================================
REM  STARLIGHT STAYS — Build & Run All Microservices
REM  Order: Eureka → Gateway → UserService → RoomService → BookingService
REM =====================================================

echo.
echo =====================================================
echo   STARLIGHT STAYS - Microservices Build Script
echo =====================================================
echo.

REM --- Step 0: Create PostgreSQL database ---
echo [STEP 0] Creating PostgreSQL database (if not exist)...
psql -U postgres -c "CREATE DATABASE starlight;" 2>nul
echo Database ready!
echo.

REM --- Step 1: Start Eureka Server ---
echo [STEP 1] Starting Eureka Server (:8761)...
cd /d "%~dp0eurekaserver"
start "EUREKA-SERVER" cmd /k "mvnw.cmd spring-boot:run"
timeout /t 20 /nobreak > nul
echo Eureka Server starting...
echo.

REM --- Step 2: Start API Gateway ---
echo [STEP 2] Starting API Gateway (:8765)...
cd /d "%~dp0gateway"
start "GATEWAY" cmd /k "mvnw.cmd spring-boot:run"
timeout /t 15 /nobreak > nul
echo Gateway starting...
echo.

REM --- Step 3: Start User Service ---
echo [STEP 3] Starting User Service (:8081)...
cd /d "%~dp0userservice"
start "USER-SERVICE" cmd /k "mvnw.cmd spring-boot:run"
timeout /t 10 /nobreak > nul
echo User Service starting...
echo.

REM --- Step 4: Start Room Service ---
echo [STEP 4] Starting Room Service (:8082)...
cd /d "%~dp0roomservice"
start "ROOM-SERVICE" cmd /k "mvnw.cmd spring-boot:run"
timeout /t 10 /nobreak > nul
echo Room Service starting...
echo.

REM --- Step 5: Start Booking Service ---
echo [STEP 5] Starting Booking Service (:8083)...
cd /d "%~dp0bookingservice"
start "BOOKING-SERVICE" cmd /k "mvnw.cmd spring-boot:run"
echo Booking Service starting...
echo.

echo =====================================================
echo   ALL SERVICES STARTED!
echo =====================================================
echo.
echo   Eureka Dashboard:  http://localhost:8761
echo   API Gateway:       http://localhost:8765
echo   User Service:      http://localhost:8081
echo   Room Service:      http://localhost:8082
echo   Booking Service:   http://localhost:8083
echo   React Frontend:    http://localhost:5173
echo.
echo   Wait ~60 seconds for all services to register.
echo =====================================================
pause

@echo off
REM ==============================================================================
REM STARLIGHT STAYS — Review 2 Automated Test Runner (Batch Launcher)
REM ==============================================================================

echo.
echo ======================================================================
echo       STARLIGHT STAYS - REVIEW 2 AUTOMATED TEST SUITE LAUNCHER
echo ======================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run_review2_tests.ps1"

echo.
pause

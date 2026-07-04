@echo off
echo ================================
echo   FIXING EXPO ERROR AND STARTING APP
echo ================================
echo.

echo [1/3] Clearing Expo cache...
if exist .expo rmdir /s /q .expo
echo      Cache cleared!
echo.

echo [2/3] Clearing npm cache...
call npm cache clean --force
echo      npm cache cleared!
echo.

echo [3/3] Starting Expo with clear cache...
echo.
echo ================================
echo   APP STARTING - SCAN QR CODE
echo ================================
echo.
call npm start -- --clear

pause

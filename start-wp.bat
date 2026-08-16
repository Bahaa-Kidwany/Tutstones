@echo off
set PATH=%PATH%;C:\Program Files\nodejs;C:\Users\AMIT\AppData\Roaming\npm;C:\Users\AMIT\AppData\Local\Programs\DockerDesktop\resources\bin
echo ===================================================
echo   Starting WordPress Environment (Port 8888)...
echo ===================================================
echo.
echo Make sure Docker Desktop is open and running!
echo.
call wp-env start
echo.
echo WordPress Admin Dashboard is available at:
echo http://localhost:8888/wp-admin
echo.
echo Username: admin
echo Password: password
echo ===================================================
pause

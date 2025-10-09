@echo off
echo Checking Git installation...
echo.

git --version
if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Git is installed and working!
    echo.
    echo You can now run: deploy.bat
    echo.
) else (
    echo.
    echo [ERROR] Git is not recognized.
    echo.
    echo Please:
    echo 1. Close this terminal completely
    echo 2. Open a NEW PowerShell or Command Prompt
    echo 3. Navigate back to this folder
    echo 4. Run this script again
    echo.
    echo If still not working, restart your computer.
)

pause

@echo off
echo ========================================
echo CareerHub Deployment Script
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Go to: https://git-scm.com/download/win
    echo 2. Download and install Git for Windows
    echo 3. Restart this terminal and run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Initialize Git repository
if not exist .git (
    echo Initializing Git repository...
    git init
    echo [OK] Git initialized
) else (
    echo [OK] Git already initialized
)
echo.

REM Add all files
echo Adding files to Git...
git add .
echo [OK] Files added
echo.

REM Commit
echo Creating commit...
git commit -m "Ready for Render deployment - CareerHub with auth"
if %errorlevel% equ 0 (
    echo [OK] Commit created
) else (
    echo [INFO] No changes to commit or already committed
)
echo.

REM Check for remote
git remote -v | findstr origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ========================================
    echo NEXT STEPS - GitHub Setup Required
    echo ========================================
    echo.
    echo 1. Go to: https://github.com/new
    echo 2. Create a new repository (name: career-mapper or any name)
    echo 3. DO NOT initialize with README, .gitignore, or license
    echo 4. Copy the repository URL (should look like: https://github.com/USERNAME/REPO.git)
    echo.
    set /p REPO_URL="Paste your GitHub repository URL here: "
    
    if not "!REPO_URL!"=="" (
        git remote add origin !REPO_URL!
        git branch -M main
        echo.
        echo Pushing to GitHub...
        git push -u origin main
        
        if %errorlevel% equ 0 (
            echo.
            echo [SUCCESS] Code pushed to GitHub!
        ) else (
            echo.
            echo [ERROR] Push failed. You may need to authenticate with GitHub.
            echo Try running: git push -u origin main
        )
    )
) else (
    echo Remote already configured. Pushing updates...
    git branch -M main
    git push -u origin main
    if %errorlevel% equ 0 (
        echo [OK] Pushed to GitHub
    )
)

echo.
echo ========================================
echo FINAL STEP - Deploy on Render
echo ========================================
echo.
echo 1. Go to: https://dashboard.render.com/
echo 2. Sign up or log in
echo 3. Click "New +" button (top right)
echo 4. Select "Blueprint"
echo 5. Connect your GitHub account
echo 6. Select your repository
echo 7. Click "Apply" - Render will auto-configure from render.yaml
echo 8. Wait for deployment to complete (2-3 minutes)
echo 9. Click "Shell" and run: node seed.js
echo 10. Visit your live URL!
echo.
echo Your app will be live at: https://career-mapper-XXXX.onrender.com
echo.
pause

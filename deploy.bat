@echo off
REM Script deploy nhanh lên Vercel cho Windows
REM Sử dụng: deploy.bat

echo 🚀 Starting deployment process...
echo.

REM Kiểm tra xem có thay đổi chưa commit không
git status --short > temp.txt
set /p CHANGES=<temp.txt
del temp.txt

if not "%CHANGES%"=="" (
    echo ⚠️  You have uncommitted changes. Please commit them first.
    echo.
    echo Run these commands:
    echo   git add .
    echo   git commit -m "Your commit message"
    echo   git push origin main
    exit /b 1
)

REM Lấy branch hiện tại
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo 📍 Current branch: %CURRENT_BRANCH%
echo.

REM Build test
echo 🔨 Testing build...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed! Please fix errors before deploying.
    exit /b 1
)

echo ✅ Build successful!
echo.

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push origin %CURRENT_BRANCH%

if errorlevel 1 (
    echo ❌ Push failed!
    exit /b 1
)

echo ✅ Pushed to GitHub successfully!
echo.
echo 🎉 Deployment initiated!
echo Vercel will automatically build and deploy your changes.
echo Check your deployment status at: https://vercel.com/dashboard
echo.
echo Your site will be available at:
echo   Production: https://your-project.vercel.app
echo   Preview: https://your-project-git-%CURRENT_BRANCH%.vercel.app
echo.
pause

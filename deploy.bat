@echo off
echo 🚀 Starting manual deployment to GitHub Pages...

REM Navigate to frontend directory
cd frontend

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the frontend
echo 🔨 Building frontend...
call npm run build

REM Deploy to GitHub Pages
echo 📤 Deploying to GitHub Pages...
call npm run deploy

echo ✅ Deployment complete!
echo 🌐 Your site should be available at: https://SaheelYadav.github.io/ai-market-sentinel
echo ⏳ Please wait a few minutes for GitHub Pages to update.
pause

#!/bin/bash

# Railway Deployment Helper Script
echo "🚀 AI Market Sentinel - Railway Deployment Helper"
echo "================================================"

echo ""
echo "📋 After you complete these steps in Railway:"
echo "1. Sign up at railway.app with GitHub"
echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
echo "3. Select 'ai-market-sentinel' repository"
echo "4. Set Root Directory to: backend"
echo "5. Click 'Deploy'"
echo ""
echo "⚙️  Configuration will be automatically applied from railway.json"
echo ""
echo "🔧 Environment Variables to add in Railway:"
echo "   GEMINI_API_KEY=your_gemini_api_key"
echo "   PORT=5000"
echo "   NODE_ENV=production"
echo ""
echo "📝 Get your Gemini API Key from: https://makersuite.google.com/app/apikey"
echo ""
echo "✅ Once deployed, your backend will be available at:"
echo "   https://your-app-name.railway.app"
echo ""
echo "🔄 Then run: npm run update-frontend (to update API URL)"
echo ""

# Create update script for later
cat > update-frontend.sh << 'EOF'
#!/bin/bash
echo "🔄 Updating frontend API URL..."
echo "Please enter your Railway URL (e.g., https://your-app.railway.app):"
read railway_url

# Update the API configuration
sed -i "s|https://your-backend-url.railway.app/api|${railway_url}/api|g" frontend/src/api/marketApi.ts

echo "✅ API URL updated!"
echo "🏗️  Building frontend..."
cd frontend
npm run build

echo "📤 Deploying to GitHub Pages..."
cd ..
git subtree push --prefix frontend/build origin gh-pages

echo "🎉 Frontend updated! Visit: https://saheelyadav.github.io/ai-market-sentinel"
EOF

chmod +x update-frontend.sh
echo "📝 Created update-frontend.sh script for later use"

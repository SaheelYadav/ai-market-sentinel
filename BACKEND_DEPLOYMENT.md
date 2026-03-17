# 🚀 Backend Deployment Guide

## 📋 Current Status

✅ **Frontend**: Deployed to GitHub Pages  
✅ **Backend**: Ready for deployment (has health check endpoint)  
⏳ **Next Step**: Deploy backend to Railway

## 🛠️ Backend Deployment Options

### Option 1: Railway (Recommended - Free)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "Deploy from GitHub repo"
   - Select: `SaheelYadav/ai-market-sentinel`
   - Choose `backend` folder as root
   - Click "Deploy"

3. **Get Backend URL**
   - Railway will provide URL like: `https://your-app-name.railway.app`
   - Copy this URL

4. **Update Frontend API**
   - Edit: `frontend/src/api/marketApi.ts`
   - Replace: `https://your-backend-url.railway.app/api`
   - With your actual Railway URL

### Option 2: Render (Alternative - Free)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect GitHub repo
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Select Node.js version 18

3. **Update Frontend**
   - Same as Railway, update the API URL

### Option 3: Vercel (Alternative - Free)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Update Frontend**
   - Same as above

## 🔄 After Backend Deployment

### Update Frontend API URL

1. **Edit API Configuration**
   ```typescript
   // frontend/src/api/marketApi.ts
   const backendUrl = isDevelopment 
     ? 'http://localhost:5000/api'
     : 'https://your-actual-backend-url.railway.app/api'; // Update this
   ```

2. **Rebuild Frontend**
   ```bash
   cd frontend
   npm run build
   git subtree push --prefix frontend/build origin gh-pages
   ```

## 🌐 Environment Variables

Your backend needs these environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=production
```

### Setting on Railway
- Go to your Railway project
- Click "Variables"
- Add the environment variables

### Setting on Render
- Go to your Render service
- Click "Environment"
- Add the environment variables

## 📊 Testing

### Test Backend Health
```bash
curl https://your-backend-url.railway.app/api/health
```

### Test Frontend Integration
1. Visit: https://saheelyadav.github.io/ai-market-sentinel
2. Search for a stock ticker (e.g., AAPL)
3. Should show real data from your deployed backend

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Backend needs CORS enabled (already done)
   - Frontend URL must be allowed

2. **API Timeouts**
   - Free services have startup delays
   - Add health check endpoint

3. **Environment Variables**
   - Ensure GEMINI_API_KEY is set
   - Check NODE_ENV is production

4. **Build Failures**
   - Check package.json scripts
   - Verify Node.js version compatibility

## 📱 Final Result

Once deployed:
- **Frontend**: https://saheelyadav.github.io/ai-market-sentinel
- **Backend**: https://your-app-name.railway.app
- **Full Stack**: Working AI Market Sentinel! 🎉

## 🎯 Quick Start

1. Deploy backend to Railway
2. Update frontend API URL
3. Rebuild and deploy frontend
4. Test the full application

**Your AI Market Sentinel will be fully functional!** 🚀

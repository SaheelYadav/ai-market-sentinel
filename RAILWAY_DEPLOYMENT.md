# Railway Deployment Guide

## 🚀 Deploy Your Market Analyzer to Railway

### Prerequisites
- Railway account (free tier available)
- GitHub account
- Your project pushed to GitHub

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

2. **Ensure your `.env` file has the required variables**:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=production
```

### Step 2: Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)** and login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. **Configure Backend Service**:
   - Root directory: `backend`
   - Build command: `npm install && npm run build`
   - Start command: `node dist/index.js`
   - Environment variables: Add your `GEMINI_API_KEY`

5. **Click "Deploy"**

### Step 3: Deploy Frontend to Railway

1. **Add a new service** to your Railway project
2. **Configure Frontend Service**:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist -l 3000`
   - Port: 3000

3. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: Your backend Railway URL (get from step 2)

### Step 4: Update Frontend API Configuration

After your backend is deployed, get its Railway URL and update the frontend:

1. In `frontend/src/api/marketApi.ts`, replace:
```typescript
baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.railway.app/api'  // Replace with actual URL
    : '/api',
```

2. Redeploy the frontend service.

### Step 5: Verify Deployment

1. **Backend**: Visit `https://your-backend-url.railway.app/api/stock/AAPL`
2. **Frontend**: Visit your frontend Railway URL
3. Test the application with a stock ticker (e.g., AAPL, GOOGL)

## 🛠️ Troubleshooting

### Common Issues:

**Build Failures**:
- Check that all dependencies are in `package.json`
- Ensure TypeScript builds without errors locally

**Environment Variables**:
- Make sure `GEMINI_API_KEY` is set in backend service
- Check that `NODE_ENV=production` is set in frontend

**API Connection Issues**:
- Verify backend URL in frontend configuration
- Check CORS settings in backend

**Database Issues**:
- SQLite should work out-of-the-box
- Ensure file permissions are correct

### Railway Features Used:
- ✅ Docker deployment support
- ✅ Environment variable management
- ✅ Automatic HTTPS
- ✅ CI/CD from GitHub
- ✅ Health checks

## 📊 Monitoring

Railway provides:
- Real-time logs
- Metrics dashboard
- Error tracking
- Performance monitoring

## 💡 Pro Tips

1. **Custom Domain**: Add a custom domain in Railway settings
2. **Scaling**: Enable auto-scaling for production traffic
3. **Backups**: Railway automatically handles database backups
4. **Preview Deployments**: Enable preview deployments for pull requests

## 🎯 Next Steps

After successful deployment:
- Monitor performance in Railway dashboard
- Set up alerts for errors
- Consider adding a custom domain
- Set up automated testing in your CI/CD pipeline

---

**Deployment Time**: ~5-10 minutes
**Cost**: Free tier covers most development needs
**Scaling**: Pay-as-you-go for production traffic

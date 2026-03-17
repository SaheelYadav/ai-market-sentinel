# 🚀 Railway Quick Reference

## 📋 What You Need to Do (5 minutes)

1. **Sign up at [railway.app](https://railway.app) with GitHub** ✅
2. **Click "New Project" → "Deploy from GitHub repo"** ✅
3. **Select "ai-market-sentinel" repository** ✅
4. **Set Root Directory to: `backend`** ✅
5. **Click "Deploy"** ✅

## ⚙️ What I've Prepared for You

### ✅ Railway Configuration
- **File**: `backend/railway.json`
- **Auto-configured**: Build command, health check, restart policy
- **Optimized**: For Railway's deployment system

### ✅ Backend Ready
- **Health endpoint**: `/api/health`
- **CORS enabled**: For frontend access
- **Environment ready**: Accepts Railway env vars

### ✅ Scripts Added
- **Build**: Automatically compiles TypeScript
- **Start**: Production-ready server
- **Health check**: Railway monitoring

## 🔧 Environment Variables (Add in Railway)

Go to your Railway service → Variables tab → Add:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=production
```

### Get Gemini API Key:
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Paste in Railway variables

## 📊 Deployment Timeline

- **Build**: 1-2 minutes
- **Start**: 30-60 seconds (cold start)
- **Health check**: Automatic
- **URL**: Railway provides unique URL

## 🔄 After Deployment (I'll handle)

Once you give me the Railway URL, I'll:

1. **Update frontend API** configuration
2. **Rebuild frontend** with new backend URL
3. **Deploy to GitHub Pages**
4. **Test full integration**

## 🌐 Expected URLs

- **Backend**: `https://your-app-name.railway.app`
- **Health**: `https://your-app-name.railway.app/api/health`
- **Frontend**: `https://saheelyadav.github.io/ai-market-sentinel`

## 🎯 Success Indicators

✅ **Green status** in Railway dashboard  
✅ **Health check passes**  
✅ **Frontend connects** to backend  
✅ **Stock analysis works**  

## 🚨 Quick Troubleshooting

**Build fails?**
- Check Railway build logs
- Verify Node.js version (should be 18)

**API fails?**
- Check environment variables
- Verify GEMINI_API_KEY is set

**Frontend can't connect?**
- I'll update API URL once you provide Railway URL
- Check CORS (already configured)

---

**🚀 Ready to deploy! Complete the 5 steps above, then share your Railway URL!**

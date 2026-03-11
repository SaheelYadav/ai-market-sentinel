# 🚀 GitHub Pages Deployment Guide

## 📋 Overview

This repository is configured for automatic deployment of the React frontend to GitHub Pages using GitHub Actions.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite (Deployed to GitHub Pages)
- **Backend**: Node.js + Express (Deployed separately)
- **Deployment**: GitHub Actions CI/CD Pipeline

## 🌐 Deployment URLs

- **Frontend**: https://SaheelYadav.github.io/ai-market-sentinel
- **Backend**: https://ai-market-sentinel-backend.onrender.com (Update this URL in production)

## ⚙️ Configuration Details

### Frontend Configuration

#### 1. Package.json Updates
```json
{
  "homepage": "https://SaheelYadav.github.io/ai-market-sentinel",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### 2. Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/ai-market-sentinel/',
  build: {
    outDir: 'build'
  }
})
```

#### 3. API Configuration
The frontend automatically detects environment:
- **Development**: Uses `/api` proxy to localhost:5000
- **Production**: Uses deployed backend URL

### GitHub Actions Workflow

#### File: `.github/workflows/deploy.yml`

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json

    - name: Install dependencies
      run: |
        cd frontend
        npm ci

    - name: Build frontend
      run: |
        cd frontend
        npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

## 🔄 Deployment Process

### Automatic Deployment
1. **Push to main branch** → Triggers GitHub Actions
2. **Build Process** → Installs dependencies and builds frontend
3. **Deploy** → Pushes build files to `gh-pages` branch
4. **Live** → Site becomes available at GitHub Pages URL

### Manual Deployment (Optional)
```bash
# From frontend directory
npm run deploy
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Clone repository
git clone https://github.com/SaheelYadav/ai-market-sentinel.git
cd ai-market-sentinel

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Environment Variables
Create `.env` file in backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
```

## 📊 Build Configuration

### Build Output
- **Directory**: `frontend/build/`
- **Assets**: Optimized CSS, JS, and static files
- **Base Path**: `/ai-market-sentinel/`

### Optimization Features
- **Code Splitting**: Automatic chunk optimization
- **Asset Optimization**: Minified CSS and JS
- **Tree Shaking**: Removes unused code

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Deployment Fails
- Check GitHub Actions logs
- Verify build directory exists
- Ensure `gh-pages` package is installed

#### 3. API Calls Fail in Production
- Update backend URL in `frontend/src/api/marketApi.ts`
- Check CORS configuration on backend
- Verify backend is deployed and accessible

#### 4. 404 Errors on GitHub Pages
- Ensure `base` path in Vite config matches repository name
- Check that `homepage` field in package.json is correct
- Verify GitHub Pages settings point to `gh-pages` branch

### Debug Steps

1. **Check Build**: `npm run build` locally
2. **Test Locally**: `npm run preview`
3. **Check Logs**: GitHub Actions tab in repository
4. **Verify URLs**: Ensure all paths are correct

## 📝 Maintenance

### Regular Updates
- Update dependencies: `npm update`
- Check GitHub Actions for new versions
- Monitor backend deployment status

### Performance Monitoring
- GitHub Pages provides basic analytics
- Monitor build times in GitHub Actions
- Check bundle size optimization

## 🔐 Security

### Best Practices
- Environment variables are not exposed in frontend build
- API keys are stored in backend environment
- GitHub Actions uses built-in secrets

### GitHub Pages Limitations
- No server-side processing
- Static file hosting only
- Custom domain requires DNS configuration

## 📚 Resources

### Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/build.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Tools Used
- **gh-pages**: Package for deploying to GitHub Pages
- **peaceiris/actions-gh-pages**: GitHub Action for deployment
- **Vite**: Build tool and development server

## 🚀 Next Steps

1. **Deploy Backend**: Set up backend deployment (Render, Railway, etc.)
2. **Update API URL**: Change production backend URL in frontend
3. **Custom Domain**: Configure custom domain if needed
4. **Monitoring**: Set up analytics and monitoring

---

**🎉 Your frontend is now configured for automatic deployment to GitHub Pages!**

Push to the `main` branch to trigger deployment.

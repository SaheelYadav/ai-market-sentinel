# 🤖 AI Market Sentinel

**Real-time stock market analysis powered by Google Gemini 2.0 Flash AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232E?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-404D59?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

## 📋 Overview

AI Market Sentinel is an enterprise-grade financial analysis platform that combines real-time market data with advanced AI sentiment analysis. It provides traders and investors with actionable insights by analyzing technical indicators, news sentiment, and market trends using Google's cutting-edge Gemini AI model.

### 🎯 Key Features

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

### Backend (Node.js + Express)
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **AI Integration**: Google Gemini 2.0 Flash
- **Data Source**: Yahoo Finance API
- **Deployment**: Render

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- Google Gemini API Key

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/SaheelYadav/ai-market-sentinel.git
   cd ai-market-sentinel
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set Environment Variables**
   ```bash
   # In backend/.env
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## � API Documentation

### Analysis Endpoint
```bash
GET /api/analysis/{ticker}
```
Returns comprehensive stock analysis including:
- Price data and technical indicators
- AI sentiment analysis
- Historical data
- Latest news
- Investment recommendations

### Health Check
```bash
GET /api/health
```
Returns service status and timestamp.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for sentiment analysis | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

### API Keys

1. **Get Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Add to environment variables

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js 18** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **SQLite** - Database
- **Google Gemini** - AI analysis
- **Yahoo Finance** - Market data
- **CORS** - Cross-origin requests

## 📱 Production URLs

- **Live Site**: https://saheelyadav.github.io/ai-market-sentinel
- **Backend API**: https://ai-market-sentinel.onrender.com/api
- **Health Check**: https://ai-market-sentinel.onrender.com/api/health

## 🔄 Deployment

### Frontend (GitHub Pages)
- Automated deployment from `main` branch
- Built with Vite and deployed to `gh-pages` branch
- Served via GitHub Pages CDN

### Backend (Render)
- Deployed from `backend` folder
- Automatic builds and deployments
- Free tier with custom domain support

## 🎯 Usage

1. **Enter Stock Ticker** (e.g., AAPL, GOOGL, TSLA)
2. **View Analysis Results**:
   - Current price and technical indicators
   - AI sentiment analysis and reasoning
   - Historical price charts
   - Latest news and market data
3. **Get Recommendations**:
   - Buy/Sell/Hold signals
   - Risk assessment
   - Confidence scores

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ using React, Node.js, and Google Gemini AI** technology

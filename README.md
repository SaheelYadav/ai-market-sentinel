
# AI-Driven Real-Time Market Sentiment Analyzer

A complete, production-ready AI stock analysis system integrating **Google Gemini** for sentiment analysis with real-time market data.

## 🚀 Features

- **Live Data**: Real-time stock prices & volume.
- **AI Analysis**: Google Gemini 2.0 Flash sentiment engine analyzing news.
- **Technical Indicators**: RSI, SMA, EMA, Volume Anomaly detection.
- **Production Grade**: Dockerized, Nginx Proxy, SQLite for history.
- **Interactive Dashboard**: React + Recharts + Tailwind CSS.

## 🛠 Quick Start

### 1. Prerequisites
- Docker & Docker Compose installed.
- Value Google Gemini API Key. [Get one here](https://aistudio.google.com/app/apikey).

### 2. Configuration
The project includes a `.env` template in the root directory.

1. Updates the `.env` file with your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   NODE_ENV=production
   ```

### 3. Run with Docker (One Command)
Build and start the services:

```bash
docker-compose up --build
```

- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 4. Stop
To stop the services:
```bash
docker-compose down
```

## 🏗 Architecture

- **Frontend**: Nginx serving React/Vite build (Internal Port 80 -> Host 3000).
- **Backend**: Node.js Express API (Internal Port 5000 -> Host 5000).
- **Database**: SQLite (file-based, mounted in container if volume persisted, currently ephemeral or local if bound).

## ⚠️ Troubleshooting

- **Gemini Key not found**: Ensure `.env` is in the ROOT directory where `docker-compose.yml` is.
- **Port Conflicts**: Ensure ports 3000 and 5000 are free on your host.

## 📄 API Docs
- `GET /api/analysis/:ticker` - Complete analysis
- `GET /api/stock/:ticker` - Raw data

---
**Author**: Antigravity

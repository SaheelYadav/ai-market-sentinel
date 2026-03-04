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

- **🤖 AI-Powered Analysis**: Leverages Google Gemini 2.0 Flash for intelligent market sentiment analysis
- **📊 Real-Time Data**: Live stock prices, volume, and market indicators via Yahoo Finance API
- **📈 Technical Analysis**: RSI, SMA, EMA calculations with trend detection
- **🎯 Smart Recommendations**: AI-generated Buy/Hold/Sell signals with confidence scores
- **📰 News Integration**: Latest financial news with sentiment impact assessment
- **📱 Responsive Design**: Modern, mobile-first interface built with React and Tailwind CSS
- **⚡ Real-Time Updates**: WebSocket support for live market data streaming

## 🏗️ Architecture

### Backend (Node.js + TypeScript)
- **Framework**: Express.js with TypeScript for type safety
- **AI Integration**: Google Generative AI SDK (Gemini 2.0 Flash)
- **Data Sources**: Yahoo Finance API for real-time market data
- **Database**: SQLite for caching and historical data storage
- **Technical Analysis**: Custom algorithms for RSI, SMA, EMA calculations
- **API Design**: RESTful endpoints with CORS support

### Frontend (React + TypeScript)
- **Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first, responsive design
- **Charts**: Custom components with Recharts for data visualization
- **State Management**: React hooks for local state management
- **Icons**: Lucide React for consistent iconography

### DevOps & Deployment
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for development and production
- **Version Control**: Git with semantic versioning
- **Environment**: Environment variable configuration for security

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaheelYadav/ai-market-sentinel.git
   cd ai-market-sentinel
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Add your Google Gemini API key
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start development environment**
   ```bash
   # Option 1: Docker Compose (Recommended)
   docker-compose up --build

   # Option 2: Manual setup
   # Backend
   cd backend && npm install && npm run dev
   
   # Frontend (new terminal)
   cd frontend && npm install && npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

#### Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|------------|
| `GET` | `/stock/:ticker` | Fetch real-time stock data and technical indicators |
| `GET` | `/analysis/:ticker` | Complete analysis including AI sentiment and recommendations |
| `GET` | `/news/:ticker` | Latest financial news for specified ticker |
| `POST` | `/sentiment` | Custom sentiment analysis for provided text |

#### Example Response

```json
{
  "price": 178.45,
  "rsi": 65.2,
  "sma20": 175.8,
  "sma50": 172.3,
  "ema20": 176.9,
  "volumeAnomaly": false,
  "trend": "Uptrend",
  "overall_sentiment_score": 0.35,
  "sentiment_label": "Bullish",
  "confidence_score": 78,
  "positive_factors": ["Strong volume", "Technical breakout"],
  "negative_factors": ["Overbought conditions"],
  "reasoning_summary": "Stock shows bullish momentum with strong volume support...",
  "recommendation": "Buy",
  "risk_level": "Medium",
  "market_data": {
    "open": 177.20,
    "high": 179.80,
    "low": 176.50,
    "volume": 45678900,
    "marketCap": 2850000000000
  },
  "history": [...],
  "news": [...]
}
```

## 🧩 Technical Indicators

### RSI (Relative Strength Index)
- **Period**: 14 days
- **Range**: 0-100
- **Interpretation**: 
  - > 70: Overbought
  - < 30: Oversold
  - 30-70: Neutral

### SMA (Simple Moving Average)
- **Periods**: 20-day and 50-day
- **Usage**: Trend identification and support/resistance levels

### EMA (Exponential Moving Average)
- **Period**: 20-day
- **Feature**: More responsive to recent price changes

### Volume Analysis
- **Anomaly Detection**: Identifies unusual volume spikes
- **Benchmark**: 20-day average with 1.5x threshold

## 🎨 Frontend Components

### Dashboard
Main application container with:
- Stock search functionality
- Real-time data updates
- Responsive grid layout

### StockChart
Interactive price chart featuring:
- 6-month historical data
- Technical indicator overlays
- Zoom and pan capabilities
- Responsive design

### SentimentPanel
AI analysis display showing:
- Sentiment meter with visual indicators
- Investment recommendation
- Risk assessment
- Bullish/Bearish factors
- Confidence scores

## 🔧 Development

### Project Structure
```
ai-market-sentinel/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── config/          # Environment and database config
│   │   ├── controllers/     # API route handlers
│   │   ├── services/        # Business logic (AI, market data)
│   │   ├── utils/           # Technical indicator calculations
│   │   └── types/           # TypeScript type definitions
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── api/            # API integration layer
│   │   └── types/          # TypeScript interfaces
│   ├── public/
│   └── package.json
├── docker-compose.yml      # Multi-service orchestration
└── README.md
```

### Scripts

```bash
# Backend
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server

# Frontend
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up --build
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key (required)
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Test Coverage
- Unit tests for technical indicators
- Integration tests for API endpoints
- Component tests for UI elements
- E2E tests for user workflows

## 📊 Performance

### Optimization Features
- **Data Caching**: 30-second cache for API responses
- **Lazy Loading**: Components load data on demand
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Compressed static assets

### Monitoring
- Real-time error tracking
- Performance metrics collection
- API response time monitoring
- Database query optimization

## 🔒 Security

### Implementation
- **Environment Variables**: Sensitive data in .env files
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: API parameter sanitization
- **Rate Limiting**: API abuse prevention
- **SQL Injection Protection**: Parameterized queries

## 🌐 Deployment Options

### Railway
1. Connect GitHub repository
2. Configure environment variables
3. Deploy with automatic builds

### AWS
1. Build Docker images
2. Push to ECR
3. Deploy to ECS/Elastic Beanstalk

### DigitalOcean
1. Use App Platform
2. Connect GitHub repository
3. Configure environment variables

## 🤝 Contributing

We welcome contributions! Please follow our guidelines:

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Issue Reporting
- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include environment details
- Add relevant screenshots

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google**: Gemini 2.0 Flash AI model
- **Yahoo Finance**: Real-time market data
- **React**: Frontend framework
- **Express.js**: Backend framework
- **Chart.js**: Data visualization

## 📞 Support

- **Documentation**: [Wiki](https://github.com/SaheelYadav/ai-market-sentinel/wiki)
- **Issues**: [GitHub Issues](https://github.com/SaheelYadav/ai-market-sentinel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SaheelYadav/ai-market-sentinel/discussions)

---

**⚠️ Disclaimer**: This tool is for educational and informational purposes only. Not financial advice. Always consult with qualified financial professionals before making investment decisions.

**🚀 Built with ❤️ using cutting-edge AI technology**

# 📈 AI-Driven Real-Time Market Sentiment Analyzer

An enterprise-grade, full-stack application that leverages **Google Gemini 2.0 Flash** to provide real-time stock market sentiment analysis, technical indicators, and interactive visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docker](https://img.shields.io/badge/docker-containers-blue.svg)
![React](https://img.shields.io/badge/frontend-React%20%7C%20Vite%20%7C%20Tailwind-blueviolet)
![Node.js](https://img.shields.io/badge/backend-Node.js%20%7C%20Express%20%7C%20TypeScript-green)

---

## 🚀 Overview

The **Market Analyzer** is designed to give traders and analysts a competitive edge by combining quantitative data with qualitative AI analysis. It fetches real-time market data, calculates key technical indicators (RSI, SMA, EMA), and uses Generative AI to analyze news headlines and market sentiment, providing a comprehensive "Buy/Hold/Sell" recommendation.

### ✨ Key Features

*   **🤖 AI-Powered Sentiment Analysis**: Utilizes **Google Gemini 2.0 Flash** to analyze market news and sentiment in real-time.
*   **📊 Real-Time Market Data**: Live stock prices, volume, and percent changes via **Yahoo Finance**.
*   **📉 Technical Indicators**: Automatic calculation of **RSI** (Relative Strength Index), **SMA** (Simple Moving Average), **EMA** (Exponential Moving Average), and Volume Anomalies.
*   **🖥️ Interactive Dashboard**: A responsive implementation using **React**, **Recharts**, and **Tailwind CSS**.
*   **⚡ High Performance**: Built with **Vite** for the frontend and **Recharts** for visualizations.
*   **🐳 Dockerized**: Fully containerized setup for easy deployment and scalability.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 18 + Vite
*   **Styling**: Tailwind CSS
*   **Visualization**: Recharts
*   **Icons**: Lucide React
*   **Language**: TypeScript

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **AI Integration**: Google Generative AI SDK (Gemini)
*   **Data Source**: Yahoo Finance API (`yahoo-finance2`)
*   **Analysis**: `technicalindicators` library
*   **Database**: Better-SQLite3 (for caching/history)
*   **Real-time**: WebSockets (`ws`)

### DevOps & Tools
*   **Containerization**: Docker & Docker Compose
*   **Linting**: ESLint
*   **Version Control**: Git

---

## 📂 Project Structure

```bash
Market-Analyzer/
├── backend/                 # Node.js + TypeScript Backend
│   ├── src/
│   │   ├── config/          # Configuration (env, db)
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes definition
│   │   ├── services/        # Business logic (Gemini, Market data)
│   │   └── index.ts         # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components (Dashboard, Charts)
│   │   ├── api/             # API integration
│   │   └── App.tsx          # Main application component
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml       # Docker orchestration
└── README.md                # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites

*   [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose installed on your machine.
*   A **Google Gemini API Key**. You can get one for free from [Google AI Studio](https://aistudio.google.com/).

### 📦 Installation (Docker Method - Recommended)

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Market-Analyzer
    ```

2.  **Configure Environment Variables**:
    Create a `.env` file in the **root** directory and add your API credentials:
    ```env
    # Required
    GEMINI_API_KEY=your_actual_api_key_here
    
    # Optional
    PORT=5000
    NODE_ENV=production
    ```

3.  **Build and Run**:
    ```bash
    docker-compose up --build
    ```

4.  **Access the Application**:
    *   **Frontend**: Open [http://localhost:3000](http://localhost:3000)
    *   **Backend API**: Running on [http://localhost:5000](http://localhost:5000)

### 🔧 Manual Installation (Local Dev)

If you prefer running without Docker:

**1. Backend Setup**
```bash
cd backend
npm install
# Create .env file in backend/ with your keys
npm run dev
```

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/stock/:ticker` | Fetch raw market data for a stock (e.g., `AAPL`). |
| `GET` | `/news/:ticker` | get the latest news for a specific stock ticker. |
| `GET` | `/analysis/:ticker` | Get full AI analysis, market data, and indicators for a specific stock. |
| `POST` | `/sentiment` | Analyze sentiment for a custom text input. |

---

## 🧩 Components Overview

1.  **Dashboard**: The main container that layouts the grid.
2.  **StockChart**: Renders the price history and technical indicators using `recharts`.
3.  **SentimentPanel**: Displays the AI-generated analysis, sentiment score, and "Buy/Sell" recommendation.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---



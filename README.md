# 🤖 AI-Driven Real-Time Market Sentiment Analyzer

An enterprise-grade AI application that leverages **Google Gemini 2.0 Flash** to provide real-time stock market sentiment analysis, technical indicators, and interactive visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Hugging Face](https://img.shields.io/badge/platform-Hugging%20Face-yellow.svg)
![Gradio](https://img.shields.io/badge/interface-Gradio%20%7C%20Plotly-orange)
![Python](https://img.shields.io/badge/language-Python%20%7C%20Flask-blue)

---

## 🚀 Overview

The **AI Market Analyzer** is designed to give traders and analysts a competitive edge by combining quantitative data with qualitative AI analysis. It fetches real-time market data, calculates key technical indicators (RSI, SMA, EMA), and uses Generative AI to analyze market sentiment, providing comprehensive "Buy/Hold/Sell" recommendations.

### ✨ Key Features

*   **🤖 AI-Powered Sentiment Analysis**: Utilizes **Google Gemini 2.0 Flash** to analyze market sentiment in real-time.
*   **📊 Real-Time Market Data**: Live stock prices, volume, and percent changes via **Yahoo Finance**.
*   **📉 Technical Indicators**: Automatic calculation of **RSI** (Relative Strength Index), **SMA** (Simple Moving Average), **EMA** (Exponential Moving Average).
*   **🖥️ Interactive Dashboard**: Beautiful interface using **Gradio** and **Plotly**.
*   **⚡ High Performance**: Optimized Python backend with Flask.
*   **🤗 Hugging Face Ready**: Deploy instantly on Hugging Face Spaces.

---

## 🛠️ Technology Stack

### Backend
*   **Runtime**: Python 3.9+
*   **Framework**: Flask
*   **AI Integration**: Google Generative AI SDK (Gemini)
*   **Data Source**: Yahoo Finance (`yfinance`)
*   **Analysis**: Pandas & NumPy for calculations
*   **API**: RESTful endpoints with CORS support

### Frontend
*   **Interface**: Gradio 4.7+
*   **Visualization**: Plotly for interactive charts
*   **Styling**: Gradio Soft theme
*   **Real-time**: Live data updates

### Deployment
*   **Platform**: Hugging Face Spaces
*   **Hardware**: CPU Basic (free) or GPU T4
*   **Environment**: Python with pip dependencies

---

## 📂 Project Structure

```bash
Market-Analyzer/
├── backend.py              # Flask backend with Gemini integration
├── gradio_app.py          # Gradio frontend interface
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (gitignored)
└── README.md             # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites

*   Python 3.9 or higher
*   A **Google Gemini API Key**. Get one free from [Google AI Studio](https://aistudio.google.com/).

### 📦 Local Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/SaheelYadav/ai-market-sentinel.git
    cd ai-market-sentinel
    ```

2.  **Create virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables**:
    Create a `.env` file and add:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

5.  **Run the application**:
    ```bash
    python gradio_app.py
    ```

6.  **Access the Application**:
    Open [http://localhost:7860](http://localhost:7860)

---

## 🤗 Hugging Face Deployment

### One-Click Deployment

1. **Open in Hugging Face Spaces**:
   [![Hugging Face Spaces](https://huggingface.co/datasets/huggingface/badges/raw/main/open-in-hf-spaces-sm.svg)](https://huggingface.co/spaces)

2. **Create new Space**:
   - SDK: **Gradio**
   - Hardware: **CPU Basic** (free) or **GPU T4**
   - Repository: Your GitHub repo

3. **Set Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key

4. **Deploy** - Takes ~3 minutes!

### Manual Deployment

See [HF_SPACES.md](./HF_SPACES.md) for detailed instructions.

---

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/stock/:ticker` | Fetch raw market data for a stock |
| `GET` | `/analysis/:ticker` | Get full AI analysis and indicators |
| `POST` | `/sentiment` | Analyze sentiment for custom text |

---

## 🧩 Features Overview

1.  **AI Analysis**: Gemini-powered sentiment and recommendations
2.  **Technical Indicators**: RSI, SMA, EMA calculations
3.  **Interactive Charts**: 30-day price history with Plotly
4.  **Real-time Data**: Live market data from Yahoo Finance
5.  **Beautiful UI**: Modern Gradio interface with emojis

---

## 🎯 Usage Examples

### Analyze a Stock
```python
import requests

# Get Apple analysis
response = requests.get('http://localhost:5000/api/analysis/AAPL')
data = response.json()

print(f"Recommendation: {data['sentiment']['recommendation']}")
print(f"Sentiment: {data['sentiment']['sentiment']}")
print(f"Price: ${data['price']}")
```

### Custom Sentiment Analysis
```python
response = requests.post('http://localhost:5000/api/sentiment', 
                        json={'text': 'Apple stock is looking strong today'})
data = response.json()
```

---

## 🤝 Contributing

Contributions welcome! Please fork and submit a pull request.

1.  Fork the Project
2.  Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit Changes (`git commit -m 'Add AmazingFeature'`)
4.  Push to Branch (`git push origin feature/AmazingFeature`)
5.  Open Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ⚠️ Disclaimer

**This tool is for educational purposes only and should not be considered financial advice. Always consult with a qualified financial advisor before making investment decisions.**

---

## 🔗 Links

- **Live Demo**: [Hugging Face Spaces](https://huggingface.co/spaces)
- **API Documentation**: [Google Gemini](https://ai.google.dev/)
- **Data Source**: [Yahoo Finance](https://finance.yahoo.com/)

---

**Made with ❤️ using Google Gemini 2.0 Flash**

import gradio as gr
import requests
import json
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, timedelta
import threading
import time
from backend import app

# Start Flask backend in a separate thread
def run_backend():
    app.run(host='0.0.0.0', port=5000, debug=False)

backend_thread = threading.Thread(target=run_backend, daemon=True)
backend_thread.start()

# Wait for backend to start
time.sleep(3)

def get_stock_analysis(ticker):
    try:
        # Get analysis from our backend
        response = requests.get(f"http://localhost:5000/api/analysis/{ticker}")
        if response.status_code == 200:
            data = response.json()
            return format_analysis(data)
        else:
            return f"Error: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Error connecting to backend: {str(e)}"

def format_analysis(data):
    if 'error' in data:
        return data['error']
    
    # Format the analysis result
    sentiment_emoji = {
        'bullish': '🟢',
        'bearish': '🔴', 
        'neutral': '🟡'
    }
    
    rec_emoji = {
        'Buy': '📈',
        'Sell': '📉',
        'Hold': '⏸️'
    }
    
    sentiment = data.get('sentiment', {})
    indicators = data.get('indicators', {})
    
    result = f"""
## 📊 {data.get('ticker', ticker.upper())} Analysis
    
### 🎯 AI Recommendation: {rec_emoji.get(sentiment.get('recommendation', 'Hold'), '⏸️')} {sentiment.get('recommendation', 'Hold')}
    
### 🤖 Market Sentiment: {sentiment_emoji.get(sentiment.get('sentiment', 'neutral'), '🟡')} {sentiment.get('sentiment', 'Neutral').title()}
**Score**: {sentiment.get('score', '0')}/100

**Analysis**: {sentiment.get('analysis', 'No analysis available')}

### 📈 Market Data
- **Price**: ${data.get('price', 'N/A')}
- **Change**: {data.get('change', 'N/A')}%
- **Volume**: {data.get('volume', 'N/A'):,}

### 📉 Technical Indicators
- **RSI**: {indicators.get('rsi', 'N/A')} {'(Overbought)' if indicators.get('rsi', 50) > 70 else '(Oversold)' if indicators.get('rsi', 50) < 30 else '(Neutral)'}
- **SMA**: ${indicators.get('sma', 'N/A')}
- **EMA**: ${indicators.get('ema', 'N/A')}

### 🔍 Key Factors
{chr(10).join([f"• {factor}" for factor in sentiment.get('factors', ['No factors identified'])])}
    """
    
    return result

def create_chart(ticker):
    try:
        # Get stock data for chart
        response = requests.get(f"http://localhost:5000/api/stock/{ticker}")
        if response.status_code == 200:
            data = response.json()
            return create_price_chart(data)
        else:
            return None
    except:
        return None

def create_price_chart(data):
    if 'history' not in data or not data['history']:
        return None
    
    # Create dates for the last 30 days
    dates = pd.date_range(end=datetime.now(), periods=len(data['history']), freq='D')
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=dates, 
        y=data['history'],
        mode='lines',
        name='Price',
        line=dict(color='#1f77b4', width=2)
    ))
    
    # Add current price marker
    fig.add_trace(go.Scatter(
        x=[dates[-1]], 
        y=[data['history'][-1]],
        mode='markers',
        name='Current',
        marker=dict(color='red', size=8)
    ))
    
    fig.update_layout(
        title=f"📈 {data.get('ticker', 'Stock')} Price Chart (Last 30 Days)",
        xaxis_title="Date",
        yaxis_title="Price ($)",
        hovermode='x unified',
        template='plotly_white',
        height=400
    )
    
    return fig

# Create Gradio interface
with gr.Blocks(title="🤖 AI Market Analyzer", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🤖 AI-Driven Real-Time Market Sentiment Analyzer
    
    Get AI-powered stock market analysis using Google Gemini 2.0 Flash
    
    **Features**:
    - 🤖 AI sentiment analysis with buy/sell recommendations
    - 📊 Real-time market data and technical indicators  
    - 📈 Interactive price charts
    - 📉 RSI, SMA, EMA calculations
    """)
    
    with gr.Row():
        ticker_input = gr.Textbox(
            label="Stock Ticker", 
            placeholder="Enter stock symbol (e.g., AAPL, GOOGL, TSLA)",
            value="AAPL"
        )
        analyze_btn = gr.Button("🚀 Analyze", variant="primary", size="lg")
    
    with gr.Row():
        with gr.Column(scale=1):
            analysis_output = gr.Markdown(
                label="📊 Analysis Results", 
                elem_id="analysis"
            )
        
        with gr.Column(scale=2):
            chart_output = gr.Plot(label="📈 Price Chart")
    
    # Event handlers
    analyze_btn.click(
        fn=get_stock_analysis,
        inputs=ticker_input,
        outputs=analysis_output,
        show_progress=True
    ).then(
        fn=create_chart,
        inputs=ticker_input,
        outputs=chart_output
    )
    
    # Examples
    gr.Examples(
        examples=[
            ["AAPL"],
            ["GOOGL"], 
            ["TSLA"],
            ["MSFT"],
            ["AMZN"],
            ["NVDA"]
        ],
        inputs=ticker_input,
        cache_examples=True
    )
    
    # Footer
    gr.Markdown("""
    ---
    **⚠️ Disclaimer**: This tool is for educational purposes only. Not financial advice.
    
    **🔧 Technology**: Google Gemini 2.0 Flash | Yahoo Finance | Gradio
    """)

if __name__ == "__main__":
    demo.launch(
        share=True, 
        server_name="0.0.0.0", 
        server_port=7860,
        show_error=True
    )

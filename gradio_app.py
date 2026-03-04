import gradio as gr
import requests
import json
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, timedelta

def get_stock_analysis(ticker):
    try:
        # Get analysis from your backend
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
    result = f"""
## 📊 {data.get('ticker', ticker.upper())} Analysis
    
### 🎯 AI Recommendation: {data.get('recommendation', 'N/A')}
    
### 📈 Market Data
- **Price**: ${data.get('price', 'N/A')}
- **Change**: {data.get('change', 'N/A')}%
- **Volume**: {data.get('volume', 'N/A')}
    
### 🤖 Sentiment Analysis
- **Score**: {data.get('sentiment', {}).get('score', 'N/A')}
- **Analysis**: {data.get('sentiment', {}).get('analysis', 'N/A')}
    
### 📉 Technical Indicators
- **RSI**: {data.get('indicators', {}).get('rsi', 'N/A')}
- **SMA**: ${data.get('indicators', {}).get('sma', 'N/A')}
- **EMA**: ${data.get('indicators', {}).get('ema', 'N/A')}
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
    if 'history' not in data:
        return None
    
    df = pd.DataFrame(data['history'])
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=df.index, 
        y=df['close'],
        mode='lines',
        name='Price',
        line=dict(color='blue')
    ))
    
    fig.update_layout(
        title=f"{data.get('ticker', 'Stock')} Price Chart",
        xaxis_title="Time",
        yaxis_title="Price ($)",
        hovermode='x unified'
    )
    
    return fig

# Create Gradio interface
with gr.Blocks(title="🤖 AI Market Analyzer", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🤖 AI-Driven Real-Time Market Sentiment Analyzer
    
    Get AI-powered stock market analysis using Google Gemini 2.0 Flash
    """)
    
    with gr.Row():
        ticker_input = gr.Textbox(
            label="Stock Ticker", 
            placeholder="Enter stock symbol (e.g., AAPL, GOOGL, TSLA)",
            value="AAPL"
        )
        analyze_btn = gr.Button("Analyze", variant="primary")
    
    with gr.Row():
        with gr.Column(scale=1):
            analysis_output = gr.Markdown(label="Analysis Results")
        
        with gr.Column(scale=2):
            chart_output = gr.Plot(label="Price Chart")
    
    # Event handlers
    analyze_btn.click(
        fn=get_stock_analysis,
        inputs=ticker_input,
        outputs=analysis_output
    ).then(
        fn=create_chart,
        inputs=ticker_input,
        outputs=chart_output
    )
    
    # Examples
    gr.Examples(
        examples=["AAPL", "GOOGL", "TSLA", "MSFT", "AMZN"],
        inputs=ticker_input
    )

if __name__ == "__main__":
    demo.launch(share=True, server_name="0.0.0.0", server_port=7860)

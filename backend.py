import os
import requests
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.generativeai import GenerativeModel
import google.generativeai as genai
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = GenerativeModel('gemini-2.0-flash')

def calculate_rsi(data, period=14):
    delta = data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi.iloc[-1] if not rsi.empty else 50

def calculate_sma(data, period=20):
    return data['Close'].rolling(window=period).mean().iloc[-1]

def calculate_ema(data, period=20):
    return data['Close'].ewm(span=period).mean().iloc[-1]

def get_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1mo")
        info = stock.info
        
        if data.empty:
            return None
            
        latest = data.iloc[-1]
        previous = data.iloc[-2] if len(data) > 1 else latest
        
        return {
            'ticker': ticker.upper(),
            'price': round(latest['Close'], 2),
            'change': round(((latest['Close'] - previous['Close']) / previous['Close']) * 100, 2),
            'volume': int(latest['Volume']),
            'history': data['Close'].tolist()[-30:],
            'indicators': {
                'rsi': round(calculate_rsi(data), 2),
                'sma': round(calculate_sma(data), 2),
                'ema': round(calculate_ema(data), 2)
            }
        }
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None

def get_sentiment_analysis(ticker, data):
    try:
        # Create a simple news summary for analysis
        prompt = f"""
        Analyze the market sentiment for {ticker} stock based on the following data:
        
        Current Price: ${data['price']}
        Change: {data['change']}%
        Volume: {data['volume']}
        RSI: {data['indicators']['rsi']}
        SMA: ${data['indicators']['sma']}
        EMA: ${data['indicators']['ema']}
        
        Provide a sentiment analysis with:
        1. Overall sentiment (bullish/bearish/neutral)
        2. Sentiment score (-100 to 100)
        3. Key factors influencing the sentiment
        4. Buy/Hold/Sell recommendation
        
        Format as JSON:
        {{
            "sentiment": "bullish/bearish/neutral",
            "score": -100 to 100,
            "factors": ["factor1", "factor2", "factor3"],
            "recommendation": "Buy/Hold/Sell",
            "analysis": "Detailed analysis text"
        }}
        """
        
        response = model.generate_content(prompt)
        text = response.text
        
        # Try to extract JSON from response
        try:
            json_start = text.find('{')
            json_end = text.rfind('}') + 1
            if json_start != -1 and json_end != -1:
                json_str = text[json_start:json_end]
                return json.loads(json_str)
        except:
            pass
            
        # Fallback if JSON parsing fails
        return {
            'sentiment': 'neutral',
            'score': 0,
            'factors': ['Limited data available'],
            'recommendation': 'Hold',
            'analysis': text
        }
        
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return {
            'sentiment': 'neutral',
            'score': 0,
            'factors': ['Analysis error'],
            'recommendation': 'Hold',
            'analysis': f"Unable to perform sentiment analysis: {str(e)}"
        }

@app.route('/')
def home():
    return jsonify({
        "message": "🤖 AI Market Analyzer Backend",
        "version": "1.0.0",
        "status": "running"
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/stock/<ticker>')
def get_stock(ticker):
    data = get_stock_data(ticker)
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": f"Could not fetch data for {ticker}"}), 404

@app.route('/api/analysis/<ticker>')
def get_analysis(ticker):
    stock_data = get_stock_data(ticker)
    if not stock_data:
        return jsonify({"error": f"Could not fetch data for {ticker}"}), 404
    
    sentiment = get_sentiment_analysis(ticker, stock_data)
    
    return jsonify({
        **stock_data,
        'sentiment': sentiment,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        prompt = f"""
        Analyze the market sentiment of the following text:
        
        "{text}"
        
        Provide sentiment analysis with:
        1. Overall sentiment (bullish/bearish/neutral)
        2. Sentiment score (-100 to 100)
        3. Key factors
        
        Format as JSON:
        {{
            "sentiment": "bullish/bearish/neutral",
            "score": -100 to 100,
            "factors": ["factor1", "factor2"],
            "analysis": "Detailed analysis"
        }}
        """
        
        response = model.generate_content(prompt)
        text_response = response.text
        
        try:
            json_start = text_response.find('{')
            json_end = text_response.rfind('}') + 1
            if json_start != -1 and json_end != -1:
                json_str = text_response[json_start:json_end]
                return jsonify(json.loads(json_str))
        except:
            pass
            
        return jsonify({
            'sentiment': 'neutral',
            'score': 0,
            'factors': ['Analysis completed'],
            'analysis': text_response
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

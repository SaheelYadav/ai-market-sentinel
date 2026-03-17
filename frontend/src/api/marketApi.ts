import axios from 'axios';
import { AnalysisResult } from '../types';

// Determine if we're in development or production
const isDevelopment = import.meta.env.DEV;
const backendUrl = isDevelopment 
  ? 'http://localhost:5000/api'  // Development backend
  : 'https://ai-market-sentinel.onrender.com/api'; // Production backend on Render

const api = axios.create({
    baseURL: isDevelopment ? '/api' : backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 second timeout
});

// Add request interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - please try again');
        }
        if (error.response?.status === 429) {
            throw new Error('Too many requests - please wait a moment');
        }
        if (error.response?.status >= 500) {
            throw new Error('Server error - please try again later');
        }
        throw error;
    }
);

export const getMarketAnalysis = async (ticker: string) => {
    try {
        const response = await api.get<AnalysisResult>(`/analysis/${ticker}`);
        return response.data;
    } catch (error: any) {
        console.error('Market Analysis API Error:', error);
        throw error;
    }
};

export const getStockData = async (ticker: string) => {
    try {
        const response = await api.get(`/stock/${ticker}`);
        return response.data;
    } catch (error: any) {
        console.error('Stock Data API Error:', error);
        throw error;
    }
};

export const getStockNews = async (ticker: string) => {
    try {
        const response = await api.get(`/news/${ticker}`);
        return response.data;
    } catch (error: any) {
        console.error('Stock News API Error:', error);
        throw error;
    }
};

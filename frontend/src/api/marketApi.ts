import axios from 'axios';
import { AnalysisResult } from '../types';

// Determine if we're in development or production
const isDevelopment = import.meta.env.DEV;
const backendUrl = isDevelopment 
  ? 'http://localhost:5000/api'  // Development backend
  : 'https://ai-market-sentinel-backend.onrender.com/api'; // Production backend (update this URL)

const api = axios.create({
    baseURL: isDevelopment ? '/api' : backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMarketAnalysis = async (ticker: string) => {
    const response = await api.get<AnalysisResult>(`/analysis/${ticker}`);
    return response.data;
};

export const getStockData = async (ticker: string) => {
    const response = await api.get(`/stock/${ticker}`);
    return response.data;
};

export const getStockNews = async (ticker: string) => {
    const response = await api.get(`/news/${ticker}`);
    return response.data;
};

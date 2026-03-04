import axios from 'axios';
import { AnalysisResult } from '../types';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-url.railway.app/api' 
        : '/api', // Local development proxy
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

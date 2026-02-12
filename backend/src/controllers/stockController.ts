import { Request, Response } from 'express';
import * as marketService from '../services/marketService';

export const getStockData = async (req: Request, res: Response): Promise<void> => {
    try {
        const ticker = String(req.params.ticker);

        if (!ticker) {
            res.status(400).json({ error: 'Ticker symbol is required' });
            return;
        }

        const data = await marketService.getStockQuote(ticker);
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
};

export const getStockNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const ticker = String(req.params.ticker);

        if (!ticker) {
            res.status(400).json({ error: 'Ticker symbol is required' });
            return;
        }

        const news = await marketService.getStockNews(ticker);
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};

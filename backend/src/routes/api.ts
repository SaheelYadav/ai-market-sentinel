import { Router } from 'express';
import { getStockData, getStockNews } from '../controllers/stockController';
import { analyzeStock, analyzeSentiment } from '../controllers/analysisController';

const router = Router();

// Test Routes
router.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API routes are working',
        timestamp: new Date().toISOString()
    });
});

// Stock Data Routes
router.get('/stock/:ticker', getStockData);
router.get('/news/:ticker', getStockNews);

// Analysis Routes
router.get('/analysis/:ticker', analyzeStock);
router.post('/sentiment', analyzeSentiment);

export default router;

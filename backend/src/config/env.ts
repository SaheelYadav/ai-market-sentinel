import dotenv from 'dotenv';
import path from 'path';

// Attempt to load .env from different possible locations
// 1. Root of the project (for local development)
// 2. Default location if running inside Docker (environment variables already injected)

// Try loading from project root if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
}

interface EnvConfig {
    PORT: number;
    GEMINI_API_KEY: string;
    NODE_ENV: string;
}

// Validate critical environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error('CRITICAL ERROR: GEMINI_API_KEY is missing from environment variables.');
    console.error('Please ensure .env file exists in the project root or GEMINI_API_KEY is set.');
    process.exit(1); // Exit process if key is missing
}

const config: EnvConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;

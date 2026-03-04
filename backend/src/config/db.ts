import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../sentiments.db');
const db = new Database(dbPath/*, { verbose: console.log }*/); // Verbose optional
db.pragma('journal_mode = WAL');

// Define table schema
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sentiment_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    sentiment_score REAL,
    sentiment_label TEXT,
    confidence REAL,
    positive_factors TEXT,
    negative_factors TEXT,
    reasoning_summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(createTableQuery);

console.log('Database initialized successfully at', dbPath);

export default db;

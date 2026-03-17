#!/bin/bash

# Manual GitHub Pages Deployment Script
# Use this if GitHub Actions fails

echo "🚀 Starting manual deployment to GitHub Pages..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the frontend
echo "🔨 Building frontend..."
npm run build

# Deploy to GitHub Pages
echo "📤 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://SaheelYadav.github.io/ai-market-sentinel"
echo "⏳ Please wait a few minutes for GitHub Pages to update."

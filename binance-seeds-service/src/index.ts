import express from 'express';
import { Scheduler } from './scheduler';
import { SeedManager } from './seeds/seedManager';
import { BinanceAPI } from './binance/api';
import { Trading } from './binance/trading';
import { config } from './config';

const app = express();
const port = process.env.PORT || 3000;

const seedManager = new SeedManager(config.numberOfSeeds, config.initialSeedValue);
const binanceAPI = new BinanceAPI();
const trading = new Trading(binanceAPI, seedManager);

// Initialize the service
const initializeService = async () => {
    await seedManager.initializeSeeds();
    await trading.loadAccountAssets();
    Scheduler.start(binanceAPI, seedManager, trading);
};

// Start the application
app.listen(port, () => {
    console.log(`Binance Seeds Service running on port ${port}`);
    initializeService().catch(err => {
        console.error('Error initializing service:', err);
    });
});
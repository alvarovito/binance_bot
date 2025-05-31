import { setInterval } from 'timers';
import { getCurrentPrices } from './binance/api';
import { SeedManager } from './seeds/seedManager';
import { Trading } from './binance/trading';
import { calculateWeights } from './strategy/pidFormula';
import { config } from './config';

const seedManager = new SeedManager();
const trading = new Trading();

const fetchAndTrade = async () => {
    try {
        const prices = await getCurrentPrices();
        const weights = calculateWeights(prices);

        for (const [asset, weight] of Object.entries(weights)) {
            if (weight > config.weightThreshold) {
                const seed = seedManager.getAvailableSeed();
                if (seed) {
                    seedManager.occupySeed(seed, asset);
                    await trading.createOrder(asset, seed.value);
                    console.log(`Order created for ${asset} with weight ${weight}`);
                    break; // Only occupy one seed per interaction
                }
            }
        }
    } catch (error) {
        console.error('Error in fetchAndTrade:', error);
    }
};

const startScheduler = () => {
    setInterval(fetchAndTrade, config.apiCallInterval);
};

export { startScheduler };
import Binance from 'binance-api-node';
import { CONFIG } from './config.js';
import { SeedManager } from './seeds.js';

const client = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

const seeds = new SeedManager();

// Store price history to compute derivative and integral
const priceHistory = new Map();

async function initialize() {
  try {
    const account = await client.accountInfo();
    seeds.initializeFromBalances(account.balances);
  } catch (err) {
    console.error('Failed to fetch account info:', err.message);
  }
}

// Compute PID-based weight for each symbol
function computeWeight(symbol, price) {
  let history = priceHistory.get(symbol);
  if (!history) {
    history = [];
    priceHistory.set(symbol, history);
  }
  history.push(price);
  if (history.length > 10) history.shift();

  // derivative: last price - previous price
  const derivative = history.length >= 2 ? price - history[history.length - 2] : 0;
  const derivativeIntegral = history.slice(-10).reduce((acc, p, i, arr) => {
    if (i === 0) return acc;
    return acc + (p - arr[i - 1]);
  }, 0);
  const integral = history.reduce((acc, p, i, arr) => {
    if (i === 0) return acc;
    return acc + (p - arr[i - 1]);
  }, 0);
  const weight = CONFIG.integralWeight * integral +
                 CONFIG.derivativeWeight * derivative +
                 CONFIG.derivativeIntegralWeight * derivativeIntegral;
  return weight;
}

async function fetchAndTrade() {
  try {
    const ticker = await client.prices();
    let bestSymbol = null;
    let bestWeight = -Infinity;
    for (const [symbol, priceString] of Object.entries(ticker)) {
      // filter assets with little volume or history
      if (!priceHistory.has(symbol) && priceHistory.size < 5) continue;
      const price = parseFloat(priceString);
      const weight = computeWeight(symbol, price);
      if (weight > bestWeight) {
        bestWeight = weight;
        bestSymbol = symbol;
      }
    }

    if (bestSymbol && bestWeight > CONFIG.weightThreshold) {
      const seed = seeds.getAvailableSeed();
      if (seed) {
        console.log(`Using seed ${seed.id} for ${bestSymbol} with weight ${bestWeight.toFixed(4)}`);
        seeds.occupySeed(seed, bestSymbol);
        await placeOrder(bestSymbol, seed);
      }
    }
  } catch (err) {
    console.error('Error during fetchAndTrade:', err.message);
  }
}

async function placeOrder(symbol, seed) {
  // convert EUR to USDT for simplicity
  const quantity = seed.valueEUR; // placeholder conversion
  let targetProfit = 0.01; // initial desired profit
  while (targetProfit > CONFIG.minProfit) {
    try {
      await client.order({
        symbol,
        side: 'BUY',
        type: 'MARKET',
        quantity,
      });
      await client.order({
        symbol,
        side: 'SELL',
        type: 'LIMIT',
        quantity,
        price: (1 + targetProfit) * priceHistory.get(symbol).at(-1),
        timeInForce: 'GTC',
      });
      break; // order placed
    } catch (err) {
      console.error('Error placing order, reducing profit:', err.message);
      targetProfit -= CONFIG.profitDecrement;
    }
  }
}

initialize().then(() => {
  setInterval(fetchAndTrade, 60 * 1000); // run every minute
});

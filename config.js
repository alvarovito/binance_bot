export const CONFIG = {
  weightThreshold: 1.0, // Minimal weight for an asset to be traded
  integralWeight: 0.4,
  derivativeWeight: 0.3,
  derivativeIntegralWeight: 0.3,
  seedCount: 25,
  seedValueEUR: 1,
  profitDecrement: 0.0005, // Decrease target profit by this amount when adjusting order
  minProfit: 0.002, // Minimal acceptable profit
  priceInterval: '1m' // Smallest timeframe for Binance
};

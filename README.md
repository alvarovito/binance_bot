# Binance Bot

Simple node service to trade automatically on Binance. It uses a PID-like formula to find promising assets and allocate "seeds" for trading.

## Setup

1. Install dependencies (requires network access):
   ```bash
   npm install
   ```

2. Set your Binance credentials in environment variables:
   - `BINANCE_API_KEY`
   - `BINANCE_API_SECRET`

3. Run the bot:
   ```bash
   npm start
   ```

The bot will create 25 seeds with 1€ value by default and try to trade assets with a positive weight every minute.

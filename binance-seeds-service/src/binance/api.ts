import axios from 'axios';
import { Spot } from 'binance-api-node';
import { AssetPrice } from '../types';

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;

const client = Spot(API_KEY, API_SECRET);

export const getSpotPrices = async (): Promise<AssetPrice[]> => {
    try {
        const response = await client.prices();
        return Object.entries(response).map(([symbol, price]) => ({
            symbol,
            price: parseFloat(price),
        }));
    } catch (error) {
        console.error('Error fetching spot prices:', error);
        throw error;
    }
};

export const getAccountAssets = async () => {
    try {
        const accountInfo = await client.accountInfo();
        return accountInfo.balances.filter(asset => parseFloat(asset.free) > 0);
    } catch (error) {
        console.error('Error fetching account assets:', error);
        throw error;
    }
};
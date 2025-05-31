export interface Seed {
    id: number;
    asset: string;
    value: number;
    isOccupied: boolean;
}

export interface BinanceAsset {
    symbol: string;
    price: number;
    time: number;
}

export interface ApiResponse<T> {
    data: T;
    status: string;
    code?: number;
    message?: string;
}

export interface TradingOrder {
    symbol: string;
    side: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    profitThreshold: number;
}
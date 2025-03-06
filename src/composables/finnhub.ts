/* eslint-disable @typescript-eslint/no-explicit-any */
interface Stock {
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'adr' | 'reit';
  market: string;
  currency: string;
}

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
}


export const getStocksList = async (type: string): Promise<Stock[]> => {
  const typeValue = type

  if(typeValue === 'asdsad') return []

  return []
};

// Get real-time quote for a symbol
export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  return {
    symbol,
    price: 100,
    change: 5,
    changePercent: 0.5,
    high: 105,
    low: 95,
    volume: 100000,
    previousClose: 99.5
  }
};

export const getStockCandles = async (symbol: string, timeframe: string) => {
  return {
    symbol,
    timeframe,
    candles: [] // Replace with actual candle data
  }
};

export const getCompanyInfo = (symbol: string): any => {
  return symbol
}

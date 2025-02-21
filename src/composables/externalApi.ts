/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';


const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Accept': 'application/json',
  },
  timeout: 10000,
});

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1100; // 1.1 seconds between requests
const MAX_RETRIES = 3;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async (requestFn: () => Promise<any>) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      // Rate limiting
      const now = Date.now();
      const timeToWait = Math.max(0, MIN_REQUEST_INTERVAL - (now - lastRequestTime));
      if (timeToWait > 0) {
        await sleep(timeToWait);
      }

      lastRequestTime = Date.now();
      return await requestFn();
    } catch (error) {
      retries++;
      const isNetworkError = (error as AxiosError).message === 'Network Error';
      const isRateLimit = (error as AxiosError).response?.status === 429;

      if (retries === MAX_RETRIES || (!isNetworkError && !isRateLimit)) {
        throw error;
      }

      // Exponential backoff
      const backoffTime = Math.min(1000 * Math.pow(2, retries), 10000);
      await sleep(backoffTime);
    }
  }
};

// API methods with retry logic
export const getMarkets = (params = {}) => {
  return makeRequestWithRetry(() =>
    api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        ...params
      }
    })
  );
};

export const searchCoins = (query: string) => {
  return makeRequestWithRetry(() =>
    api.get('/search', {
      params: { query }
    })
  );
};

export const getCoinData = (id: string) => {
  return makeRequestWithRetry(() =>
    api.get(`/coins/${id}`)
  );
};

export const getMarketChart = (id: string, days: number) => {
  return makeRequestWithRetry(() =>
    api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days
      }
    })
  );
};

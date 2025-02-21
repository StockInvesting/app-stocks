import type { Bot } from "~/models/Marketplace"

export const initialBots: Array<Bot> = [
  {
    id: '1',
    name: 'STX Trader',
    trader: 'Brenen',
    exchange: 'BINANCE FUTURES (USDT-M)',
    mode: 'Hedge Mode',
    roi: 86.39,
    price: 'Free',
    followers: 0,
    avatar: 'https://images.unsplash.com/photo-1636716642701-01a9df2fc5e1?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'ETH Master',
    trader: 'ncomehmet',
    exchange: 'BINANCE FUTURES (USDT-M)',
    mode: 'Hedge Mode',
    roi: 63.79,
    price: '$250.00/month',
    followers: 0,
    avatar: 'https://images.unsplash.com/photo-1644018335954-ab54c83e007f?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'JUP-4-saatlik',
    trader: 'Darkbluestazy',
    exchange: 'BINANCE FUTURES (USDT-M)',
    mode: 'One-Way Mode',
    roi: 57.51,
    price: 'Free',
    followers: 0,
    avatar: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=150&h=150&fit=crop',
  },
]

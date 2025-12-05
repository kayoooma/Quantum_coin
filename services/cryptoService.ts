import { CoinData } from '../types';

// Using CoinGecko Free API
const API_URL = "https://api.coingecko.com/api/v3/simple/price";
const COIN_IDS = "bitcoin,ethereum,binancecoin,solana,ripple,cardano,polkadot";

export const fetchCryptoPrices = async (): Promise<CoinData[]> => {
  try {
    const response = await fetch(
      `${API_URL}?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();
    
    // Transform object to array
    const coins: CoinData[] = Object.keys(data).map(key => {
      let symbol = '';
      switch(key) {
        case 'bitcoin': symbol = 'BTC'; break;
        case 'ethereum': symbol = 'ETH'; break;
        case 'binancecoin': symbol = 'BNB'; break;
        case 'solana': symbol = 'SOL'; break;
        case 'ripple': symbol = 'XRP'; break;
        case 'cardano': symbol = 'ADA'; break;
        case 'polkadot': symbol = 'DOT'; break;
        default: symbol = key.toUpperCase();
      }

      return {
        id: key,
        symbol: symbol,
        current_price: data[key].usd,
        price_change_percentage_24h: data[key].usd_24h_change
      };
    });

    return coins;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    // Return fallback data if API limit reached or fails
    return [
      { id: 'bitcoin', symbol: 'BTC', current_price: 64230, price_change_percentage_24h: 1.2 },
      { id: 'ethereum', symbol: 'ETH', current_price: 3450, price_change_percentage_24h: -0.5 },
      { id: 'binancecoin', symbol: 'BNB', current_price: 590, price_change_percentage_24h: 0.8 },
      { id: 'solana', symbol: 'SOL', current_price: 145, price_change_percentage_24h: 4.5 },
    ];
  }
};
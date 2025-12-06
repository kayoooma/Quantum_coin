export interface CoinData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
}

// Extend Window interface for Ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (params: any) => void) => void;
    };
  }
}
import React, { useEffect, useState } from 'react';
import { fetchCryptoPrices } from '../services/cryptoService';
import { CoinData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Ticker: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoPrices();
      // Add QuantumCoin manually as it's not on API yet
      const qcCoin: CoinData = {
        id: 'quantumcoin',
        symbol: 'QC',
        current_price: 0.025,
        price_change_percentage_24h: 12.5
      };
      setCoins([qcCoin, ...data]);
    };
    getData();
    // Refresh every 60s
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 w-full h-[40px] bg-slate-950/90 backdrop-blur-sm z-[60] border-b border-white/10 flex items-center overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for seamless loop */}
        {[...coins, ...coins, ...coins].map((coin, idx) => (
          <div key={`${coin.id}-${idx}`} className="flex items-center gap-2 mx-6 text-xs font-mono">
            <span className="font-bold text-slate-200">{coin.symbol}</span>
            <span className="text-slate-400">${coin.current_price.toLocaleString()}</span>
            <span className={`flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
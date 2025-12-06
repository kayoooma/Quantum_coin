import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Copy } from 'lucide-react';
import { WalletState } from '../types';
import { fetchCryptoPrices } from '../services/cryptoService';

interface HeroProps {
  wallet: WalletState;
  connectWallet: () => void;
}

const Hero: React.FC<HeroProps> = ({ wallet, connectWallet }) => {
  const [currency, setCurrency] = useState<'ETH' | 'BNB' | 'USDT'>('ETH');
  const [amount, setAmount] = useState<string>('');
  const [prices, setPrices] = useState<{ [key: string]: number }>({ ETH: 2800, BNB: 600, USDT: 1 });
  const [qcAmount, setQcAmount] = useState<string>('0');
  
  const TOKEN_PRICE = 0.025; // $0.025 per QC

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 35, s: 12 });

  useEffect(() => {
    // Initial fetch of real conversion rates
    const loadPrices = async () => {
      const data = await fetchCryptoPrices();
      const newPrices: any = { USDT: 1 };
      data.forEach(c => {
        if(c.symbol === 'ETH') newPrices.ETH = c.current_price;
        if(c.symbol === 'BNB') newPrices.BNB = c.current_price;
      });
      setPrices(prev => ({...prev, ...newPrices}));
    };
    loadPrices();

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) return { d: 0, h: 0, m: 0, s: 0 };
        return { d, h, m, s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmount(val);
    if (!val || parseFloat(val) < 0) {
      setQcAmount('0');
      return;
    }
    const usdValue = parseFloat(val) * prices[currency];
    const tokens = Math.floor(usdValue / TOKEN_PRICE);
    setQcAmount(tokens.toLocaleString());
  };

  const handleBuy = () => {
    if (!wallet.address) {
      connectWallet();
    } else {
      // Simulation of a transaction
      if (!amount || parseFloat(amount) <= 0) return;
      alert(`Initiating transaction: Buying QC with ${amount} ${currency}...\n\n(This is a demo. In a real app, this triggers web3.sendTransaction)`);
    }
  };

  return (
    <section className="pt-32 pb-20 relative" id="about">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Presale Stage 2 Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Decentralized AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            QuantumCoin is the first Layer-1 blockchain secured by post-quantum cryptography, designed specifically for high-throughput AI model training.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Read Whitepaper
            </button>
            <button className="px-8 py-4 glass-panel text-white rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center gap-2 border border-green-500/30 text-green-400">
              <ShieldCheck size={20} />
              Audited by Certik
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm font-mono text-slate-500">
            <span>Verified Contract:</span>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900 px-3 py-1 rounded">
              0x71C...9A21 <Copy size={14} className="cursor-pointer hover:text-white"/>
            </div>
          </div>
        </div>

        {/* Right Content - Presale Card */}
        <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-30"></div>
            <div className="relative glass-panel rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Presale Ends In</h3>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {[
                    { l: 'Days', v: timeLeft.d },
                    { l: 'Hrs', v: timeLeft.h },
                    { l: 'Mins', v: timeLeft.m },
                    { l: 'Secs', v: timeLeft.s }
                  ].map((t, i) => (
                    <div key={i} className="bg-slate-950/50 rounded-lg p-2 border border-white/5">
                      <div className="text-2xl font-mono font-bold text-white">{String(t.v).padStart(2, '0')}</div>
                      <div className="text-xs text-slate-400 uppercase">{t.l}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Raised: <span className="text-white font-bold">$4,250,000</span></span>
                    <span className="text-slate-400">Target: $5,000,000</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 w-[85%] shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                  </div>
                </div>
              </div>

              {/* Calculator UI */}
              <div className="space-y-4">
                <div className="flex gap-2 p-1 bg-slate-950/50 rounded-xl border border-white/5">
                  {(['ETH', 'BNB', 'USDT'] as const).map(c => (
                    <button 
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        currency === c 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>Pay Amount</span>
                    <span>Max: ---</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="0.0"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 text-xl font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <img src={`https://cryptologos.cc/logos/${currency === 'ETH' ? 'ethereum-eth-logo' : currency === 'BNB' ? 'bnb-bnb-logo' : 'tether-usdt-logo'}.png?v=025`} alt={currency} className="w-6 h-6"/>
                      <span className="font-bold">{currency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-2 relative z-10">
                   <div className="bg-slate-800 p-2 rounded-full border border-slate-700">
                     <ArrowRight className="rotate-90 text-slate-400" size={16}/>
                   </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>Receive QC</span>
                    <span>1 QC = ${TOKEN_PRICE}</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={qcAmount}
                      readOnly
                      className="w-full bg-purple-900/10 border border-purple-500/30 rounded-xl py-4 px-4 text-xl font-mono text-purple-300 focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                       <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"></div>
                       <span className="font-bold text-purple-200">QC</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBuy}
                  disabled={wallet.isConnecting}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-lg shadow-xl shadow-purple-900/20 hover:shadow-purple-600/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {wallet.isConnecting ? 'Connecting...' : wallet.address ? 'Buy Tokens Now' : 'Connect Wallet to Buy'}
                  {!wallet.isConnecting && <Zap size={20} className="fill-white"/>}
                </button>
                
                {wallet.error && (
                  <p className="text-center text-red-400 text-sm mt-2">{wallet.error}</p>
                )}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
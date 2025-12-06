import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';
import { WalletState } from './types';

const App: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = async () => {
    setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWallet({
            address: accounts[0],
            isConnecting: false,
            error: null
          });
        } else {
          setWallet(prev => ({ ...prev, isConnecting: false, error: "No accounts found" }));
        }
      } catch (error: any) {
        setWallet({
          address: null,
          isConnecting: false,
          error: error.message || "User rejected connection"
        });
      }
    } else {
      setWallet({
        address: null,
        isConnecting: false,
        error: "MetaMask not installed"
      });
      // Fallback: Open metamask site if on desktop
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-slate-950 selection:bg-purple-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Ticker />
        <Navbar wallet={wallet} connectWallet={connectWallet} />
        <Hero wallet={wallet} connectWallet={connectWallet} />
        <TrustBar />
        <Features />
        <Tokenomics />
        <Footer />
      </div>
    </div>
  );
};

export default App;
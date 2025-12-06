import React, { useState, useEffect } from 'react';
import { Box, Wallet, Menu, X, ExternalLink } from 'lucide-react';
import { WalletState } from '../types';

interface NavbarProps {
  wallet: WalletState;
  connectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ wallet, connectWallet }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className={`fixed top-[40px] left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-slate-950/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Box size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Quantum<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Coin</span></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Features', 'Tokenomics', 'Roadmap'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1">
            Whitepaper <ExternalLink size={12} />
          </a>
        </div>

        <div className="hidden md:block">
          <button 
            onClick={connectWallet}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg ${
              wallet.address 
                ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                : 'bg-white text-slate-900 hover:bg-purple-50 hover:scale-105'
            }`}
          >
            <Wallet size={16} />
            {wallet.address ? formatAddress(wallet.address) : 'Connect Wallet'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
           {['About', 'Features', 'Tokenomics', 'Roadmap'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button 
            onClick={() => { connectWallet(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 font-bold"
          >
            <Wallet size={18} />
             {wallet.address ? formatAddress(wallet.address) : 'Connect Wallet'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
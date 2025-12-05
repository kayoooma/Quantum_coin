import React from 'react';
import { Twitter, Send, Github, Box } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <Box size={20} strokeWidth={2.5} />
               </div>
               <span className="text-xl font-bold">QuantumCoin</span>
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              The world's first decentralized quantum-resistant ecosystem building the infrastructure for the next generation of AI agents.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Presale</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Audit Report</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} QuantumCoin Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
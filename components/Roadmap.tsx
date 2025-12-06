import React from 'react';
import { CheckCircle2, Circle, Rocket } from 'lucide-react';

const Roadmap: React.FC = () => {
  const phases = [
    {
      title: "Phase 1: Foundation",
      date: "Q3 2024",
      status: "completed",
      items: ["Website Launch", "Smart Contract Audit", "Seed Sale Round", "Community Building", "Whitepaper V1"]
    },
    {
      title: "Phase 2: Expansion",
      date: "Current",
      status: "active",
      items: ["Public Presale (Stage 2)", "Influencer Marketing Campaign", "CoinGecko & CMC Listing App", "Staking dApp Beta"]
    },
    {
      title: "Phase 3: Launch",
      date: "Q1 2025",
      status: "upcoming",
      items: ["DEX Listing (Uniswap/Pancake)", "CEX Listing (Gate.io/Mexc)", "Mainnet Beta Release", "Strategic Partnerships"]
    },
    {
      title: "Phase 4: Ecosystem",
      date: "Q3 2025",
      status: "upcoming",
      items: ["Quantum DEX Launch", "AI Model Marketplace", "Cross-chain Bridge", "DAO Governance"]
    }
  ];

  return (
    <section className="py-24 relative" id="roadmap">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-pink-500 font-mono tracking-widest text-sm uppercase">The Path Forward</span>
          <h2 className="text-4xl font-bold mt-2">Roadmap</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-slate-800 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              const isActive = phase.status === 'active';
              const isCompleted = phase.status === 'completed';

              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-[20px] md:left-1/2 -translate-x-[10px] md:-translate-x-1/2 w-5 h-5 rounded-full border-4 z-10 
                    ${isActive 
                      ? 'bg-purple-500 border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse' 
                      : isCompleted ? 'bg-green-500 border-green-900' : 'bg-slate-900 border-slate-700'}`}
                  ></div>

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] p-1 ${isActive ? 'relative' : ''}`}>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                    )}
                    <div className={`relative glass-panel p-6 rounded-2xl border ${isActive ? 'border-purple-500/50' : 'border-white/5'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className={`text-xl font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{phase.title}</h3>
                          <span className="text-xs font-mono text-purple-400">{phase.date}</span>
                        </div>
                        {isActive ? <Rocket className="text-cyan-400" size={20} /> : isCompleted ? <CheckCircle2 className="text-green-500" size={20} /> : <Circle className="text-slate-600" size={20} />}
                      </div>
                      
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                             <div className={`w-1.5 h-1.5 rounded-full ${isCompleted || i < 2 && isActive ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                             {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for layout balance */}
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
import React from 'react';
import { Cpu, Globe, Lock, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Lock className="w-8 h-8 text-purple-400" />,
      title: "Post-Quantum Security",
      desc: "Utilizing NIST-approved lattice-based cryptography to protect assets against future quantum computer attacks."
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "100k+ TPS",
      desc: "Advanced dynamic sharding allows the network to process over 100,000 transactions per second with sub-second finality."
    },
    {
      icon: <Cpu className="w-8 h-8 text-pink-400" />,
      title: "AI Integration",
      desc: "Native on-chain AI models for automated smart contract auditing and gas fee optimization."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Eco-Friendly",
      desc: "Proof-of-Useful-Work mechanism ensures computing power is used for AI training, not wasteful hashing."
    }
  ];

  return (
    <section className="py-24 relative" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-purple-500 font-mono tracking-widest text-sm uppercase">Why QuantumCoin</span>
          <h2 className="text-4xl font-bold mt-2">Technological Superiority</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 bg-slate-800/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:border-white/20">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
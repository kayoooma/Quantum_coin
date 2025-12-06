import React from 'react';

const TrustBar: React.FC = () => {
  // Using text placeholders styled to look like logos for this demo, 
  // in production use standard SVGs
  const brands = [
    { name: "CoinGecko", color: "text-green-500" },
    { name: "CoinMarketCap", color: "text-blue-400" },
    { name: "PancakeSwap", color: "text-cyan-400" },
    { name: "Binance Smart Chain", color: "text-yellow-400" },
    { name: "Certik", color: "text-slate-200" }
  ];

  return (
    <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">Featured On & Integrated With</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
            {brands.map((brand, idx) => (
                <div key={idx} className="flex items-center gap-2 text-2xl font-bold font-mono">
                    <span className={`${brand.color} text-3xl`}>●</span> {brand.name}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
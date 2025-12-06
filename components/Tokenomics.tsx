import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Tokenomics: React.FC = () => {
  const data = [
    { name: 'Presale', value: 40, color: '#A855F7' }, // Purple
    { name: 'Liquidity', value: 25, color: '#06B6D4' }, // Cyan
    { name: 'Marketing', value: 15, color: '#EC4899' }, // Pink
    { name: 'Team (Locked)', value: 10, color: '#22C55E' }, // Green
    { name: 'Development', value: 10, color: '#F59E0B' }, // Amber
  ];

  return (
    <section className="py-24 bg-slate-900/50" id="tokenomics">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-500 font-mono tracking-widest text-sm uppercase">Allocation</span>
          <h2 className="text-4xl font-bold mt-2">Tokenomics</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div className="h-[400px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
             </ResponsiveContainer>
             {/* Center Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-white">1B</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Total Supply</div>
             </div>
          </div>

          {/* Legend */}
          <div className="space-y-6">
             <h3 className="text-2xl font-bold mb-6">Distribution Breakdown</h3>
             {data.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <span className="font-medium text-lg">{item.name}</span>
                 </div>
                 <span className="font-mono font-bold text-xl">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
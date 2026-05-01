import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ActivityDay {
  date: string;
  count: number;
}

export const HackerRankActivityHorizon = ({ data }: { data: ActivityDay[] }) => {
  if (!data || data.length === 0) return <div className="text-[var(--t3)] text-center py-10 text-sm tracking-widest uppercase font-mono">No activity trajectory data established</div>;

  // Filter out long periods of zero activity at the very beginning of the year 
  // to make the graph more focused on the active periods.
  const chartData = useMemo(() => {
    let firstActiveIdx = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].count > 0) {
            firstActiveIdx = Math.max(0, i - 14); // Keep 2 weeks of zero before first activity for padding
            break;
        }
    }
    // If the entire dataset has no activity, just return the last 90 days.
    if (firstActiveIdx === 0 && data[data.length-1].count === 0) {
        return data.slice(-90);
    }
    return data.slice(firstActiveIdx);
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#050A05]/95 border border-[var(--green)]/30 backdrop-blur-md p-4 rounded-xl shadow-[0_0_20px_rgba(30,215,96,0.15)] z-50 relative">
          <p className="text-[var(--t2)] text-xs font-bold uppercase tracking-widest mb-1 max-w-[200px] truncate" style={{fontFamily: 'var(--fs)'}}>Activity Volume</p>
          <p className="text-[var(--green)] text-3xl font-mono leading-none mb-1" style={{textShadow: '0 0 15px rgba(30,215,96,0.4)'}}>{payload[0].value}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[var(--t4)] text-[10px] tracking-widest uppercase font-mono">{payload[0].payload.date}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px] relative mt-4">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,215,96,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--green)" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="var(--green)" stopOpacity={0}/>
            </linearGradient>
            <filter id="glowLine">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.1)" 
            tick={{ fill: 'var(--t4)', fontSize: 10, fontFamily: 'var(--fs)' }} 
            tickFormatter={(val) => {
              const d = new Date(val);
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }} 
            tickMargin={12}
            minTickGap={40}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.1)" 
            tick={{ fill: 'var(--t4)', fontSize: 10, fontFamily: 'var(--fs)' }}
            domain={[0, 'auto']}
            tickCount={5}
            axisLine={false}
            tickLine={false}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(30,215,96,0.3)', strokeWidth: 1, strokeDasharray: '3 3' }} />
          
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="var(--green)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorActivity)" 
            activeDot={{ r: 6, fill: '#050A05', stroke: 'var(--green)', strokeWidth: 3, style: { filter: 'drop-shadow(0 0 10px rgba(30,215,96,0.9))' } }}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

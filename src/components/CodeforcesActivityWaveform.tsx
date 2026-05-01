import React, { useMemo } from 'react';
import { BarChart, Bar, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface HeatmapDay {
  date: string;
  count: number;
}

interface WaveformProps {
  data: HeatmapDay[];
  rankColor?: string;
}

export const CodeforcesActivityWaveform = ({ data, rankColor = "var(--green)" }: WaveformProps) => {
  if (!data || data.length === 0) return null;

  // Filter out the dead space at the start of the year so the waveform focuses on active periods
  const chartData = useMemo(() => {
    let firstActiveIdx = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].count > 0) {
            firstActiveIdx = Math.max(0, i - 10);
            break;
        }
    }
    const sliced = data.slice(firstActiveIdx);
    // Codeforces can have isolated spikes, so we want the graph to look like a pulse equalizer
    return sliced;
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { date, count } = payload[0].payload;
      return (
        <div className="bg-[#0A0A0F]/95 backdrop-blur-md p-3 rounded-lg border z-50 mb-10" style={{borderColor: rankColor, boxShadow: `0 0 15px ${rankColor}40`}}>
          <div className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{color: rankColor}}>Volume Phase</div>
          <div className="text-2xl font-mono leading-none font-bold" style={{color: '#fff', textShadow: `0 0 10px ${rankColor}`}}>{count} <span className="text-xs text-[var(--t3)] font-sans font-normal">Submissions</span></div>
          <div className="text-[var(--t4)] text-[9px] uppercase tracking-widest mt-2">{date}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full relative bg-[#050A0A] border border-[var(--border1)] rounded-xl pt-6 overflow-hidden" style={{boxShadow: `0 20px 40px rgba(0,0,0,0.8)`}}>
      
      {/* Top Border Glow synchronized to Rank Color */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)`, boxShadow: `0 0 20px ${rankColor}`}} />
      
      <div className="absolute top-4 left-6 text-[10px] sm:text-xs font-mono tracking-[0.2em] font-bold opacity-80 uppercase z-10" style={{color: rankColor, textShadow: `0 0 10px ${rankColor}80`}}>PULSE_ARRAY // SYNCHRONIZED</div>
      
      {/* Background ambient glow matching Rank */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none" style={{background: `linear-gradient(0deg, ${rankColor}15 0%, transparent 100%)`}} />

      <div className="w-full h-[250px] sm:h-[300px] mt-6 px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barGap={0} barCategoryGap={1}>
            <Tooltip content={<CustomTooltip />} cursor={{fill: `${rankColor}10`}} />
            
            <Bar 
              dataKey="count" 
              radius={[3, 3, 0, 0]}
              animationDuration={2500}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => {
                // Dim the bars slightly if they have low count so high counts pop more
                const opacity = entry.count > 0 ? Math.min(0.4 + (entry.count * 0.1), 1) : 0;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={rankColor} 
                    fillOpacity={opacity} 
                    style={{filter: `drop-shadow(0 0 ${opacity * 10}px ${rankColor})`}}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="absolute bottom-3 right-6 text-[var(--t3)] text-[8px] font-mono tracking-widest opacity-40 uppercase z-10">
        Trace Data Confirmed
      </div>
    </div>
  );
};

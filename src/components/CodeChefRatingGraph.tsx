import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RatingData {
  name: string;
  rating: number;
  date: string;
  rank: number;
}

export const CodeChefRatingGraph = ({ data }: { data: RatingData[] }) => {
  if (!data || data.length === 0) return <div className="text-[var(--t3)] text-center py-10 text-sm tracking-widest uppercase" style={{fontFamily: 'var(--fs)'}}>No rating trajectory data established</div>;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A0814]/95 border border-white/10 backdrop-blur-md p-4 rounded-xl shadow-[0_0_20px_rgba(204,187,138,0.15)] z-50 relative">
          <p className="text-[var(--t2)] text-xs font-bold uppercase tracking-widest mb-1 max-w-[200px] truncate" style={{fontFamily: 'var(--fs)'}}>{payload[0].payload.name}</p>
          <p className="text-[var(--pale)] text-3xl font-mono leading-none mb-1" style={{textShadow: '0 0 15px rgba(204,187,138,0.4)'}}>{payload[0].value}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[var(--t4)] text-[10px] tracking-widest uppercase" style={{fontFamily: 'var(--fs)'}}>{payload[0].payload.date.split(' ')[0]}</span>
            <span className="text-[var(--t4)] text-[10px] tracking-widest uppercase" style={{fontFamily: 'var(--fs)'}}>Rank #{payload[0].payload.rank}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px] relative mt-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,187,138,0.06)_0%,transparent_70%)] pointer-events-none" />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--pale)" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="var(--pale)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.1)" 
            tick={{ fill: 'var(--t4)', fontSize: 10, fontFamily: 'var(--fs)' }} 
            tickFormatter={(val) => val.split(' ')[0].substring(0, 10)} 
            tickMargin={12}
            minTickGap={40}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.1)" 
            tick={{ fill: 'var(--t4)', fontSize: 10, fontFamily: 'var(--fs)' }}
            domain={['dataMin - 150', 'dataMax + 100']}
            tickCount={6}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(204,187,138,0.2)', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Area 
            type="monotone" 
            dataKey="rating" 
            stroke="var(--pale)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRating)" 
            activeDot={{ r: 6, fill: '#0A0814', stroke: 'var(--pale)', strokeWidth: 3, style: { filter: 'drop-shadow(0 0 8px rgba(204,187,138,0.8))' } }}
            animationDuration={2500}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

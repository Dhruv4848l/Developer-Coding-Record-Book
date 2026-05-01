import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface DifficultyData {
  school: number;
  basic: number;
  easy: number;
  medium: number;
  hard: number;
}

export const GFGSkillCrystal = ({ data }: { data: DifficultyData }) => {
  if (!data || Object.values(data).reduce((a, b) => a + b, 0) === 0) {
    return <div className="text-[var(--t3)] text-center py-10 text-sm tracking-widest uppercase" style={{fontFamily: 'var(--fs)'}}>No skill data established</div>;
  }

  // Format data for Recharts Radar
  const radarData = [
    { subject: 'School', A: data.school, fullMark: 100 },
    { subject: 'Basic', A: data.basic, fullMark: 100 },
    { subject: 'Easy', A: data.easy, fullMark: 100 },
    { subject: 'Medium', A: data.medium, fullMark: 100 },
    { subject: 'Hard', A: data.hard, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#050A05]/95 border border-[var(--green)]/20 backdrop-blur-md p-4 rounded-xl shadow-[0_0_20px_rgba(42,186,110,0.15)] z-50">
          <p className="text-[var(--t2)] text-xs font-bold uppercase tracking-widest mb-1" style={{fontFamily: 'var(--fs)'}}>{payload[0].payload.subject} LEVEL</p>
          <p className="text-[var(--green)] text-3xl font-mono leading-none mb-1" style={{textShadow: '0 0 15px rgba(42,186,110,0.4)'}}>{payload[0].value}</p>
          <p className="text-[var(--t4)] text-[10px] tracking-widest uppercase mt-2" style={{fontFamily: 'var(--fs)'}}>Problems Solved</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] relative mt-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,186,110,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <defs>
            <radialGradient id="colorGFG" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="var(--green)" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="var(--green)" stopOpacity={0.2}/>
            </radialGradient>
          </defs>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'var(--t2)', fontSize: 12, fontFamily: 'var(--fs)', fontWeight: 700, letterSpacing: '0.1em' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Core"
            dataKey="A"
            stroke="var(--green)"
            strokeWidth={3}
            fill="url(#colorGFG)"
            fillOpacity={0.6}
            style={{ filter: 'drop-shadow(0 0 10px rgba(42,186,110,0.5))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

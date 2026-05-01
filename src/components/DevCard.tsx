import { Shield } from "lucide-react";

export function DevCard({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div 
      id="dev-card-export" 
      className="absolute -left-[9999px] top-0 w-[800px] h-[450px] bg-[#050505] text-white flex flex-col justify-between overflow-hidden font-sans"
      style={{ boxSizing: 'border-box', border: '2px solid rgba(6,182,212,0.4)', borderRadius: '24px' }}
    >
      {/* Background aesthetics */}
      <div 
        className="absolute inset-0 opacity-80" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(8,145,178,0.2) 0%, rgba(0,0,0,1) 50%, rgba(88,28,135,0.2) 100%)' 
        }} 
      />

      {/* Header */}
      <div className="relative z-10 px-10 pt-10 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.4em] text-cyan-400 uppercase mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Void Rank
          </span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 m-0 p-0" style={{ lineHeight: '1.2' }}>
            {data.rankTitle}
          </h1>
          <span className="text-gray-400 font-mono tracking-widest mt-1 text-lg">MASTERY LEVEL: {data.rankProgress?.prevRankMax || 0}</span>
        </div>
        
        {/* CodeVault Branding */}
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black tracking-widest uppercase text-white/90">CODE <span className="text-cyan-400">VAULT</span></span>
          <span className="text-sm text-white/40 font-mono tracking-widest mt-1">codolio.tech</span>
        </div>
      </div>

      {/* Core Power Level */}
      <div className="relative z-10 px-10 flex flex-col justify-center items-center w-full my-auto mt-4">
        <h2 className="text-[110px] font-black tracking-tighter text-white m-0 p-0" style={{ textShadow: '0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(147,51,234,0.4)', lineHeight: '1' }}>
            {data.powerLevel?.toLocaleString()}
        </h2>
        <span className="text-base font-bold tracking-[0.6em] text-white/50 uppercase mt-4">
            Total Void Power Level
        </span>
      </div>

      {/* Grid Stats Footer */}
      <div className="relative z-10 px-10 pb-10 w-full mt-auto">
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="bg-[#111111] border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-semibold">Total Solved</span>
                <span className="text-3xl font-bold text-white font-mono">{data.totalSolved || 0}</span>
            </div>
            <div className="bg-[#111111] border border-yellow-500/40 p-5 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-semibold">LeetCode</span>
                <span className="text-3xl font-bold text-yellow-500 font-mono">{data.ratings?.leetcode || 0}</span>
            </div>
            <div className="bg-[#111111] border border-purple-500/40 p-5 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-semibold">Codeforces</span>
                <span className="text-3xl font-bold text-purple-400 font-mono">{data.ratings?.codeforces || 0}</span>
            </div>
            <div className="bg-[#111111] border border-blue-500/40 p-5 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-semibold">CodeChef</span>
                <span className="text-3xl font-bold text-blue-400 font-mono">{data.ratings?.codechef || 0}</span>
            </div>
        </div>
      </div>

    </div>
  );
}

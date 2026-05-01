import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeatmapDay {
  date: string;
  count: number;
}

export const HackerRankMatrixGrid = ({ data }: { data: HeatmapDay[] }) => {
  
  // Cut the data array into columns/weeks of 7 days
  const weeks = useMemo(() => {
    if (!data || data.length === 0) return [];
    let result = [];
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7));
    }
    return result;
  }, [data]);

  if (weeks.length === 0) return null;

  return (
    <div className="relative w-full max-w-full mx-auto bg-[#0A0F0A]/90 border border-[rgba(30,215,96,0.3)] rounded-xl p-6 sm:p-8 overflow-hidden" style={{boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(30,215,96,0.05)'}}>
      
      {/* Technical UI Decals */}
      <div className="absolute top-3 left-4 text-[var(--green)] text-[8px] sm:text-[10px] font-mono tracking-[0.2em] opacity-60">SERVER_NODE_GRID_52W // OMEGA</div>
      <div className="absolute top-3 right-4 flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] pulse shadow-[0_0_5px_var(--green)]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] opacity-50"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] opacity-20"></div>
      </div>
      
      {/* Infinite Scanning Laser Effect */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[40px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(30,215,96,0.2) 50%, transparent 100%)',
          boxShadow: '0 0 20px rgba(30,215,96,0.4)'
        }}
        animate={{ left: ['-10%', '110%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* The Scrollable Matrix Core */}
      <div className="mt-6 w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-1.5 sm:gap-2" style={{ width: 'max-content' }}>
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5 sm:gap-2">
              {week.map((day, dayIdx) => {
                const isActive = day.count > 0;
                // Calculate an intensity level (1-4) based on submission count
                const intensity = isActive ? Math.min(Math.ceil(day.count / 2), 4) : 0;
                
                // Color scaling based on intensity
                let bgColor = "rgba(255,255,255,0.02)";
                let shadow = "none";
                let borderColor = "rgba(255,255,255,0.05)";
                
                if (intensity === 1) { bgColor = "rgba(30,215,96,0.2)"; borderColor = "rgba(30,215,96,0.4)"; shadow = "0 0 5px rgba(30,215,96,0.2)"; }
                else if (intensity === 2) { bgColor = "rgba(30,215,96,0.4)"; borderColor = "rgba(30,215,96,0.6)"; shadow = "0 0 8px rgba(30,215,96,0.4)"; }
                else if (intensity === 3) { bgColor = "rgba(30,215,96,0.7)"; borderColor = "rgba(30,215,96,0.9)"; shadow = "0 0 12px rgba(30,215,96,0.6)"; }
                else if (intensity === 4) { bgColor = "rgba(30,215,96,1)"; borderColor = "#fff"; shadow = "0 0 16px rgba(30,215,96,0.9)"; }

                return (
                  <motion.div
                    key={`${weekIdx}-${dayIdx}`}
                    title={`${day.date}: ${day.count} submissions`}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-[2px]"
                    style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, boxShadow: shadow }}
                    initial={false}
                    animate={isActive ? { 
                      opacity: [0.8, 1, 0.85, 1],
                      boxShadow: [shadow, `0 0 ${20 + intensity*5}px rgba(30,215,96,0.8)`, shadow]
                    } : {}}
                    transition={isActive ? {
                      duration: Math.random() * 2 + 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: Math.random()
                    } : {}}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Decals */}
      <div className="absolute bottom-3 right-4 text-[var(--t3)] text-[8px] font-mono tracking-widest opacity-40 uppercase">
        Matrix Core Active // {data.filter(d=>d.count>0).length} Operating Nodes
      </div>
    </div>
  );
};

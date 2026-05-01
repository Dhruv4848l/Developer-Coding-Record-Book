import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeatmapDay {
  date: string;
  count: number;
}

interface HexGridProps {
  data: HeatmapDay[];
  rankColor?: string;
}

export const CodeforcesActivityHexGrid = ({ data, rankColor = "var(--green)" }: HexGridProps) => {
  // We use pure SVG to render the honeycomb lattice beautifully, avoiding HTML/CSS box-model jaggies.
  
  const R = 8; // Size radius of hexagon
  const H = Math.sqrt(3) * R; // Height of flat-topped hexagon
  const W = 2 * R; // Width of flat-topped hexagon
  
  const colSpacing = 1.5 * R; 
  const rowSpacing = H;

  // Generate SVG polygon points for a flat-topped hexagon centered at 0,0
  const hexPoints = [
    [R, 0],
    [R / 2, H / 2],
    [-R / 2, H / 2],
    [-R, 0],
    [-R / 2, -H / 2],
    [R / 2, -H / 2]
  ].map(p => `${p[0]},${p[1]}`).join(' ');

  const weeks = useMemo(() => {
    if (!data || data.length === 0) return [];
    let result = [];
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7));
    }
    return result;
  }, [data]);

  if (weeks.length === 0) return null;

  const totalWidth = (weeks.length * colSpacing) + (R * 2);
  const totalHeight = (7 * rowSpacing) + (H / 2) + H; // 7 days Max

  return (
    <div className="relative w-full max-w-full mx-auto bg-[#050A0A] border border-[var(--border1)] p-6 sm:p-8 overflow-hidden rounded-xl" style={{boxShadow: `0 20px 40px rgba(0,0,0,0.8)`}}>
      
      {/* Top Border Glow synchronized to Rank Color */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)`, boxShadow: `0 0 20px ${rankColor}`}} />
      
      <div className="absolute top-3 left-4 text-[10px] sm:text-xs font-mono tracking-[0.2em] opacity-80 uppercase" style={{color: rankColor, textShadow: `0 0 10px ${rankColor}80`}}>CODEFORCES_HONEYCOMB // LATTICE</div>
      
      {/* The Scrollable Honeycomb Core */}
      <div className="mt-8 w-full overflow-x-auto pb-4 custom-scrollbar">
        <div style={{ width: `${totalWidth}px`, height: `${totalHeight}px`, position: 'relative' }}>
          <svg width={totalWidth} height={totalHeight} style={{ overflow: 'visible' }}>
            <defs>
              <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {weeks.map((week, colIdx) => {
              return week.map((day, rowIdx) => {
                const isActive = day.count > 0;
                const intensityVal = isActive ? Math.min(Math.ceil(day.count / 2), 4) : 0;
                
                const cx = (colIdx * colSpacing) + R;
                const cy = (rowIdx * rowSpacing) + (colIdx % 2 === 1 ? H / 2 : 0) + (H / 2);

                let fill = "rgba(42, 42, 50, 0.4)";
                let opacity = 1;
                let stroke = "rgba(255, 255, 255, 0.05)";
                let filter = "none";

                if (isActive) {
                  fill = rankColor;
                  stroke = rankColor;
                  opacity = 0.5 + (intensityVal * 0.15); // brightness scales with volume
                  filter = "url(#hexGlow)";
                }

                return (
                  <g key={`${colIdx}-${rowIdx}`} transform={`translate(${cx}, ${cy})`} style={{ cursor: 'crosshair' }} className="group">
                    <motion.polygon
                      points={hexPoints}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={1}
                      filter={filter}
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={isActive ? {
                          scale: [1, 1.1 + (intensityVal * 0.05), 1],
                          opacity: [opacity, 1, opacity]
                      } : { scale: 1, opacity: 0.8 }}
                      transition={isActive ? {
                          duration: Math.random() * 2 + 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                      } : {}}
                    />
                    
                    {/* Invisible hit area to make hovering easier */}
                    <circle r={R} fill="transparent">
                      <title>{`${day.date}: ${day.count} Submissions`}</title>
                    </circle>
                  </g>
                );
              });
            })}
          </svg>
        </div>
      </div>
      
    </div>
  );
};

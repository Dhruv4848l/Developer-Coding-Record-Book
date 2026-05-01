import React from 'react';
import { motion } from 'framer-motion';

interface GFGArcReactorProps {
  currentStreak: number;
  maxStreak: number;
}

export const GFGArcReactor = ({ currentStreak, maxStreak }: GFGArcReactorProps) => {
  const percentage = maxStreak > 0 ? (currentStreak / maxStreak) * 100 : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDasharray = 283; // 2 * pi * r (approx 45)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * clampedPercentage) / 100;
  
  // Dynamic glow based on streak power
  const glowIntensity = currentStreak > 0 ? 10 + (clampedPercentage / 100) * 30 : 5;

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto" style={{ filter: `drop-shadow(0 0 ${glowIntensity}px rgba(42, 186, 110, 0.4))` }}>
      
      {/* Background ambient pulse */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(42,186,110,0.15) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg width="240" height="240" viewBox="0 0 120 120" className="absolute z-10">
        <defs>
          <linearGradient id="reactorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2aba6e" />
            <stop offset="100%" stopColor="#1e9655" />
          </linearGradient>
          <filter id="blurGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring (Static, dark) */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />

        {/* Outer Rotating Gear (Dashed) */}
        <motion.circle 
          cx="60" cy="60" r="54" 
          fill="none" 
          stroke="rgba(42,186,110,0.3)" 
          strokeWidth="2" 
          strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50%', originY: '50%' }}
        />

        {/* Inner Counter-Rotating Gear (Dashed) */}
        <motion.circle 
          cx="60" cy="60" r="40" 
          fill="none" 
          stroke="rgba(42,186,110,0.4)" 
          strokeWidth="8" 
          strokeDasharray="10 6"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50%', originY: '50%' }}
        />

        {/* Track for the Power Meter */}
        <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="6" />

        {/* Power Meter Arc (The Streak representation) */}
        <motion.circle 
          cx="60" cy="60" r="45" 
          fill="none" 
          stroke="url(#reactorGlow)" 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: strokeDasharray }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          filter="url(#blurGlow)"
          style={{ originX: '50%', originY: '50%', rotate: '-90deg' }}
        />

        {/* Core Frame */}
        <circle cx="60" cy="60" r="28" fill="rgba(10,8,20,0.8)" stroke="rgba(42,186,110,0.2)" strokeWidth="2" />
        
        {/* Pulsing Core Center */}
        <motion.circle 
          cx="60" cy="60" r="22" 
          fill="url(#reactorGlow)" 
          opacity={0.8}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#blurGlow)"
        />
        
        {/* Center Void */}
        <circle cx="60" cy="60" r="14" fill="#050A05" />
      </svg>

      {/* Embedded Text overlaying the core */}
      <div className="absolute z-20 flex flex-col items-center justify-center text-center bg-[#050A05]/80 backdrop-blur-md px-6 py-5 rounded-full border border-[rgba(42,186,110,0.3)] shadow-[0_0_20px_rgba(0,0,0,0.9)]">
        <div className="text-[10px] text-[var(--t3)] tracking-widest uppercase mb-1" style={{fontFamily: 'var(--fs)'}}>Streak</div>
        <div className="text-4xl font-mono text-[var(--green)] leading-none" style={{textShadow: '0 0 15px rgba(42,186,110,0.5)'}}>{currentStreak}</div>
        <div className="text-[9px] text-[var(--t4)] font-bold tracking-widest uppercase mt-2" style={{fontFamily: 'var(--fs)'}}>Max {maxStreak}</div>
      </div>
    </div>
  );
};

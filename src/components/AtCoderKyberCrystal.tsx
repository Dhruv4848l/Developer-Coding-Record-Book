import React from 'react';
import { motion } from 'framer-motion';

interface AtCoderKyberCrystalProps {
  color: string;
}

export const AtCoderKyberCrystal = ({ color }: AtCoderKyberCrystalProps) => {
  const crystalColor = color || '#00C0C0'; // Default Cyan

  return (
    <div className="relative w-[180px] h-[240px] flex items-center justify-center mx-auto perspective-1000">
      {/* Background ambient aura */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-3xl opacity-40 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${crystalColor} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Levitation wrapper */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        animate={{ y: [-10, 10, -10], rotateY: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Core SVG Crystal Geometry */}
        <svg viewBox="0 0 100 160" className="w-[120px] h-[180px] drop-shadow-2xl" style={{ filter: `drop-shadow(0 0 25px ${crystalColor})` }}>
          <defs>
            <linearGradient id="crystalTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor={crystalColor} stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="crystalLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={crystalColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="crystalRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={crystalColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Top Pyramid */}
          <polygon points="50,10 20,50 80,50" fill="url(#crystalTop)" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinejoin="bevel" />
          <polygon points="50,10 50,50 20,50" fill="rgba(255,255,255,0.4)" />
          
          {/* Bottom Left Facet */}
          <polygon points="20,50 50,50 50,140" fill="url(#crystalLeft)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeLinejoin="bevel" />
          
          {/* Bottom Right Facet */}
          <polygon points="80,50 50,50 50,140" fill="url(#crystalRight)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinejoin="bevel" />
          
          {/* Central Highlight line */}
          <line x1="50" y1="10" x2="50" y2="140" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
          
          {/* Horizontal cut line */}
          <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Floating particles (sparks) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full blur-[1px]"
          style={{ backgroundColor: crystalColor, boxShadow: `0 0 8px ${crystalColor}` }}
          initial={{ 
            x: (Math.random() - 0.5) * 100, 
            y: (Math.random() - 0.5) * 150 + 50,
            opacity: 0
          }}
          animate={{ 
            y: "-150%", 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 2 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeOut" 
          }}
        />
      ))}
    </div>
  );
};

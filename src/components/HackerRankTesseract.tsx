import React from 'react';
import { motion } from 'framer-motion';

interface TesseractProps {
  problemsSolved: number;
  globalRank: number | string;
  activeDays: number;
  longestStreak: number;
}

export const HackerRankTesseract = ({ problemsSolved, globalRank, activeDays, longestStreak }: TesseractProps) => {
  
  // Base glass panel styling for face faces
  const faceBaseCSS = "absolute w-[200px] h-[200px] bg-[#0A0F0A]/80 backdrop-blur-md border border-[var(--green)] flex flex-col items-center justify-center p-4 shadow-[inset_0_0_20px_rgba(30,215,96,0.2)]";

  // Framer-motion 3D rotation settings
  const spinTransition = {
    duration: 30,
    repeat: Infinity,
    ease: "linear"
  };

  const line1 = "[ SYSTEMS ONLINE ]";
  const line2 = "[ RUNTIME ACTIVE ]";
  const line3 = "[ DATA SYNC OK ]";

  const LineDecal = ({ text }: { text: string }) => (
    <div className="w-full text-center text-[var(--green)] font-mono text-xs sm:text-sm font-bold tracking-widest opacity-80" style={{textShadow: '0 0 10px rgba(30,215,96,0.6)'}}>
      {text}
    </div>
  );

  return (
    <div className="relative w-[300px] h-[300px] mx-auto flex items-center justify-center" style={{ perspective: '1200px' }}>
      
      {/* Background ambient glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[60px] mix-blend-screen pointer-events-none"
        style={{ background: `radial-gradient(circle, var(--green) 0%, transparent 60%)` }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="w-[200px] h-[200px] relative pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
        transition={spinTransition}
      >
        
        {/* Core Power Source (Floating ball inside the cube) */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--green)] rounded-full blur-[5px]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(0px)', boxShadow: '0 0 50px var(--green)' }}
        />

        {/* FRONT FACE */}
        <div className={faceBaseCSS} style={{ transform: 'translateZ(100px)' }}>
           <LineDecal text={line1} />
        </div>

        {/* BACK FACE */}
        <div className={faceBaseCSS} style={{ transform: 'rotateY(180deg) translateZ(100px)' }}>
           <LineDecal text={line1} />
        </div>

        {/* RIGHT FACE */}
        <div className={faceBaseCSS} style={{ transform: 'rotateY(90deg) translateZ(100px)' }}>
           <LineDecal text={line2} />
        </div>

        {/* LEFT FACE */}
        <div className={faceBaseCSS} style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}>
           <LineDecal text={line2} />
        </div>

        {/* TOP FACE */}
        <div className={faceBaseCSS} style={{ transform: 'rotateX(90deg) translateZ(100px)' }}>
           <LineDecal text={line3} />
        </div>

        {/* BOTTOM FACE */}
        <div className={faceBaseCSS} style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}>
           <LineDecal text={line3} />
        </div>

      </motion.div>
    </div>
  );
};

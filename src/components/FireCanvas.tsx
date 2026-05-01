import React, { useEffect, useRef } from "react";

const FireCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let pts: {x: number, y: number, vx: number, vy: number, life: number, decay: number, size: number, col: string, wb: number, ws: number}[] = [];
    const COLS=['#991818','#C8281C','#E04A08','#F06020','#CC5010'];

    const rsz = () => {
      cvs.width = window.innerWidth;
      cvs.height = 310;
    };
    rsz();
    window.addEventListener('resize', rsz);

    const spwn = () => {
      const x = Math.random() * cvs.width;
      pts.push({
        x, 
        y: cvs.height, 
        vx: (Math.random() - .5) * 1.6, 
        vy: -(Math.random() * 3 + 1.8), 
        life: 1, 
        decay: Math.random() * .009 + .005, 
        size: Math.random() * 3.5 + 1.2, 
        col: COLS[Math.floor(Math.random() * COLS.length)], 
        wb: Math.random() * Math.PI * 2, 
        ws: Math.random() * .07 + .02
      });
    };

    const drawF = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for(let i=0; i<3; i++) spwn();
      
      for(let i=pts.length-1; i>=0; i--) {
        const p = pts[i];
        p.wb += p.ws;
        p.x += p.vx + Math.sin(p.wb) * .45;
        p.y += p.vy;
        p.vy *= .987;
        p.life -= p.decay;
        
        if(p.life <= 0) {
          pts.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.life * .35;
        ctx.fillStyle = p.col;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.col;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size * p.life * .75, p.size * p.life * 1.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animFrameId = requestAnimationFrame(drawF);
    };

    drawF();

    return () => {
      window.removeEventListener('resize', rsz);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '310px',
        pointerEvents: 'none',
        zIndex: 2,
        mixBlendMode: 'screen',
        opacity: 0.42
      }} 
    />
  );
};

export default FireCanvas;

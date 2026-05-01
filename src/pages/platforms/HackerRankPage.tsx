import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCodolioStats } from "@/hooks/useCodolioStats";
import PlatformLoader from "@/components/PlatformLoader";
import FireCanvas from "@/components/FireCanvas";
import { HackerRankActivityHorizon } from "@/components/HackerRankActivityHorizon";
import { HackerRankTesseract } from "@/components/HackerRankTesseract";
import "./PlatformsCommon.css";

const HackerRankPage = () => {
  const { data: stats, isLoading, error } = useCodolioStats("dhruvmajiever191");
  const profileUrl = "https://www.hackerrank.com/profile/dhruvmajiever191";

  const badges = stats?.badges || [];
  const certificates = [{ name: "Problem Solving (Basic)", date: "2024" }];

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <div id="hackerrank" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
      {loading && <PlatformLoader onFinish={handleFinish} text="Loading" />}
      
      <FireCanvas />

      {/* Top Nav (Cyber style) */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(3,2,10,0.97)', borderBottom: '1px solid var(--border1)', padding: '0 2.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: '1rem'}}>
           <Link to="/dashboard">
             <Button variant="ghost" className="hover:bg-white/10" style={{fontFamily: 'var(--fs)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--t3)', textTransform: 'uppercase'}}><ArrowLeft className="w-4 h-4 mr-2" /> Dashboard</Button>
           </Link>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on HackerRank</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--green)'}}>HackerRank</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        {error && (
            <div className="text-center py-12" style={{color: "hsl(0,84%,60%)", fontFamily: 'var(--fs)'}}>
              Failed to load HackerRank stats. Please try again.
            </div>
        )}

        {!error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em style={{color: 'var(--green)'}}>HackerRank</em> Profile</div>
            <div className="pf-subtitle">@dhruvmajiever191</div>
          </div>

          <div className="pf-contest-section" style={{ borderTop: 'none', paddingTop: '1rem', paddingBottom: '5rem' }}>
             <div className="pf-contest-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Data Core Tesseract</div>
             <div className="h-[300px] sm:h-[350px] w-full flex items-center justify-center">
               <HackerRankTesseract 
                 problemsSolved={stats?.profile?.problemsSolved || 0}
                 globalRank={stats?.profile?.globalRank || 'N/A'}
                 activeDays={stats?.profile?.activeDays || 0}
                 longestStreak={stats?.profile?.longestStreak || 0}
               />
             </div>
          </div>

          <div className="pf-contest-section">
            <div className="pf-c-cols">
              <div>
                <div className="pf-c-col-title"><span className="dot8 d-am" style={{background: 'hsl(38,92%,50%)'}}></span> Security Badges</div>
                <div className="space-y-4 mt-4">
                  {badges.map((badge, index) => (
                    <motion.div key={index} className="relative overflow-hidden bg-[#0A0F0A]/60 border border-[rgba(30,215,96,0.15)] rounded-xl p-4 flex justify-between items-center group">
                      {/* Laser Scanner Line */}
                      <motion.div 
                        className="absolute top-0 bottom-0 w-[4px] bg-[var(--green)] blur-[2px] opacity-60 mix-blend-screen"
                        animate={{ left: ['-10%', '110%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: index * 0.7 }}
                        style={{ background: 'linear-gradient(to right, transparent, var(--green), transparent)' }}
                      />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(30,215,96,0.1)] border border-[rgba(30,215,96,0.3)] shadow-[0_0_15px_rgba(30,215,96,0.2)]" style={{ fontSize: '1.2rem'}}>⭐</div>
                        <div>
                          <div className="text-[var(--green)] font-mono text-sm tracking-widest font-bold uppercase" style={{textShadow: '0 0 10px rgba(30,215,96,0.4)'}}>{badge.name}</div>
                          <div className="text-[var(--t4)] text-[9px] font-mono tracking-widest uppercase mt-1">{badge.category}</div>
                        </div>
                      </div>
                      <div className="relative z-10 text-right">
                        <div className="text-[var(--t1)] font-mono font-bold text-lg">{badge.stars} Star</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pf-c-col-title"><span className="dot8 d-bl" style={{background: 'var(--cyan)'}}></span> Mainframe Certificates</div>
                <div className="space-y-4 mt-4">
                  {certificates.map((cert, index) => (
                    <motion.div key={index} className="relative overflow-hidden bg-[#0A0F14]/60 border border-[rgba(0,184,217,0.15)] rounded-xl p-4 flex justify-between items-center group">
                      {/* Laser Scanner Line */}
                      <motion.div 
                        className="absolute top-0 bottom-0 w-[4px] bg-[var(--cyan)] blur-[2px] opacity-60 mix-blend-screen"
                        animate={{ left: ['-10%', '110%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.5 + 1 }}
                        style={{ background: 'linear-gradient(to right, transparent, var(--cyan), transparent)' }}
                      />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(0,184,217,0.1)] border border-[rgba(0,184,217,0.3)] shadow-[0_0_15px_rgba(0,184,217,0.2)]" style={{ fontSize: '1.2rem'}}>📜</div>
                        <div>
                          <div className="text-[var(--cyan)] font-mono text-sm tracking-widest font-bold uppercase" style={{textShadow: '0 0 10px rgba(0,184,217,0.4)'}}>{cert.name}</div>
                        </div>
                      </div>
                      <div className="relative z-10 text-right">
                        <div className="text-[var(--t3)] font-mono tracking-widest text-[10px]">{cert.date}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 mt-16 w-full max-w-[1020px] mx-auto px-4">
             <div className="pf-contest-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Activity Horizon</div>
             {stats?.heatmap && stats.heatmap.length > 0 && <HackerRankActivityHorizon data={stats.heatmap} />}
          </div>
        </motion.div>
        )}
      </section>
    </div>
  );
};

export default HackerRankPage;

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useCallback } from "react";
import { useGFGStats } from "@/hooks/useGFGStats";
import PlatformLoader from "@/components/PlatformLoader";
import { GFG160Tracker } from "@/components/GFG160Tracker";
import FireCanvas from "@/components/FireCanvas";
import { GFGSkillCrystal } from "@/components/GFGSkillCrystal";
import { GFGArcReactor } from "@/components/GFGArcReactor";
import "./PlatformsCommon.css";

const GFG_USERNAME = "dhruvmaji8b4b";

const GFGPage = () => {
  const { data: stats, isLoading, error } = useGFGStats(GFG_USERNAME);
  const profileUrl = stats?.profileUrl || `https://www.geeksforgeeks.org/user/${GFG_USERNAME}`;

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <div id="gfg" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
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
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on GeeksforGeeks</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--ember)', filter: 'hue-rotate(60deg)'}}>GeeksforGeeks</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        {error && (
            <div className="text-center py-12" style={{color: "hsl(0,84%,60%)", fontFamily: 'var(--fs)'}}>
              Failed to load GeeksforGeeks stats. Please try again.
            </div>
        )}

        {!error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em style={{filter: 'hue-rotate(60deg)'}}>GeeksforGeeks</em> Profile</div>
            <div className="pf-subtitle">@{stats?.username || GFG_USERNAME} {stats?.instituteName && stats.instituteName !== 'N/A' && `• ${stats.instituteName}`}</div>
          </div>

          <div className="pf-stats-row">
            <div className="pf-stat">
              <span className="pf-stat-ico">🏆</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : stats?.problemsSolved ?? 0}</div>
              <div className="pf-stat-lbl">Problems Solved</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: 'var(--cyan)'}}>📖</span>
              <div className="pf-stat-val blue">{isLoading ? '-' : stats?.codingScore ?? 0}</div>
              <div className="pf-stat-lbl">Coding Score</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: 'var(--ember)'}}>🔥</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : stats?.currentStreak ?? 0}</div>
              <div className="pf-stat-lbl">Current Streak</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">⚡</span>
              <div className="pf-stat-val pale">{isLoading ? '-' : stats?.maxStreak ?? 0}</div>
              <div className="pf-stat-lbl">Max Streak</div>
            </div>
          </div>

          <div className="pf-contest-section">
            <div className="pf-contest-title" style={{textAlign: 'center', marginBottom: '1.5rem'}}>Rankings & Highlights</div>
            <div className="pf-c-summary" style={{gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '600px', margin: '0 auto'}}>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val green">{isLoading ? '-' : stats?.instituteRank ?? 'N/A'}</div>
                <div className="pf-cs-lbl">Institute Rank</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val cyan" style={{color: 'var(--cyan)'}}>{isLoading ? '-' : stats?.monthlyCodingScore ?? 0}</div>
                <div className="pf-cs-lbl">Monthly Coding Score</div>
              </div>
            </div>
          </div>

          <div className="hm-section" style={{borderTop: '1px solid rgba(42, 37, 64, 0.5)', padding: '2.5rem 3rem'}}>
            <GFG160Tracker />
          </div>

          {stats?.languages && stats.languages.length > 0 && (
            <div className="pf-contest-section" style={{borderTop: '1px solid rgba(42, 37, 64, 0.5)'}}>
              <div className="pf-contest-title">Languages Used</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.8rem'}}>
                {stats.languages.map((lang, index) => (
                  <span key={index} style={{
                    padding: '8px 16px', 
                    borderRadius: '2px', 
                    background: 'rgba(45, 133, 50, 0.1)', 
                    border: '1px solid rgba(45, 133, 50, 0.2)',
                    color: 'hsl(142,76%,45%)',
                    fontFamily: 'var(--fs)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {stats?.solvedByDifficulty && (
            <div className="pf-contest-section" style={{borderTop: '1px solid rgba(42, 37, 64, 0.5)', paddingBottom: '4rem'}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="pf-contest-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Streak Engine Reactor</div>
                  <GFGArcReactor currentStreak={stats.currentStreak || 0} maxStreak={stats.maxStreak || 1} />
                </div>
                <div>
                  <div className="pf-contest-title" style={{ textAlign: 'center' }}>Difficulty Mastery Core</div>
                  <GFGSkillCrystal data={stats.solvedByDifficulty} />
                </div>
              </div>
            </div>
          )}

        </motion.div>
        )}
      </section>
    </div>
  );
};

export default GFGPage;

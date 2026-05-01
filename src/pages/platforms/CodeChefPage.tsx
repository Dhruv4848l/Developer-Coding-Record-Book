import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PlatformLoader from "@/components/PlatformLoader";
import FireCanvas from "@/components/FireCanvas";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import { CodeChefRatingGraph } from "@/components/CodeChefRatingGraph";
import "./PlatformsCommon.css";

const CodeChefPage = () => {
  const { data: stats, isLoading, error } = useCodeChefStats();
  const profile = stats?.profile;
  const profileUrl = `https://www.codechef.com/users/${profile?.username || 'cooking_coder'}`;
  
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <div id="codechef" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
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
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on CodeChef</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--ember)'}}>CodeChef</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        {error && (
            <div className="text-center py-12" style={{color: "hsl(0,84%,60%)", fontFamily: 'var(--fs)'}}>
              Failed to load CodeChef stats. Please try again.
            </div>
        )}

        {!error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em>CodeChef</em> Profile</div>
            <div className="pf-subtitle">@{profile?.username || 'cooking_coder'}</div>
          </div>

          <div className="pf-stats-row">
            <div className="pf-stat">
              <span className="pf-stat-ico">🏆</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : profile?.problemsSolved ?? 0}</div>
              <div className="pf-stat-lbl">Problems Solved</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: 'hsl(38,92%,50%)'}}>★</span>
              <div className="pf-stat-val" style={{color: 'hsl(38,92%,50%)'}}>{isLoading ? '-' : profile?.stars ? `${profile.stars}` : '0'}</div>
              <div className="pf-stat-lbl">Star Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🏅</span>
              <div className="pf-stat-val blue">{isLoading ? '-' : profile?.rating || 0}</div>
              <div className="pf-stat-lbl">Current Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🏅</span>
              <div className="pf-stat-val teal">{isLoading ? '-' : profile?.highestRating || 0}</div>
              <div className="pf-stat-lbl">Highest Rating</div>
            </div>
          </div>

          {(profile?.globalRank > 0 || profile?.countryRank > 0) && (
          <div className="pf-contest-section" style={{borderTop: 'none'}}>
            <div className="pf-contest-title" style={{textAlign: 'center', marginBottom: '1.5rem'}}>Rankings</div>
            <div className="pf-c-summary" style={{gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '600px', margin: '0 auto'}}>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val orange">{isLoading ? '-' : `#${profile?.globalRank?.toLocaleString() || 0}`}</div>
                <div className="pf-cs-lbl">Global Rank</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val blue">{isLoading ? '-' : `#${profile?.countryRank?.toLocaleString() || 0}`}</div>
                <div className="pf-cs-lbl">Country Rank</div>
              </div>
            </div>
          </div>
          )}

          <div className="hm-section" style={{borderTop: '1px solid rgba(42, 37, 64, 0.5)'}}>
            <div className="hm-top-row" style={{justifyContent: 'center', textAlign: 'center'}}>
              <div>
                <div className="hm-count-big" style={{textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '13px'}}>Division</div>
                <div style={{fontFamily: 'var(--fn)', fontSize: '3rem', color: 'var(--ember)', lineHeight: 1.2}}>
                    {isLoading ? '-' : profile?.division || 'Unrated'}
                </div>
                <div className="hm-stat-item" style={{marginTop: '0.4rem', textTransform: 'uppercase'}}>{isLoading ? '-' : profile?.country || 'N/A'}</div>
              </div>
            </div>
          </div>

          {stats?.ratingHistory && stats.ratingHistory.length > 0 && (
            <div className="pf-contest-section" style={{ borderTop: '1px solid rgba(42, 37, 64, 0.5)', marginTop: '2rem', paddingTop: '2rem' }}>
              <div className="pf-contest-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Rating Trajectory Matrix</div>
              
              <div className="mb-12 w-full mx-auto px-4">
                 <CodeChefRatingGraph data={stats.ratingHistory} />
              </div>
              
              <div className="pf-contest-title" style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '12px', letterSpacing: '0.3em' }}>Recent Contests</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {[...stats.ratingHistory].reverse().slice(0, 10).map((contest, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border2)', borderRadius: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--t1)', fontWeight: 600, fontSize: '14px', marginBottom: '0.2rem', fontFamily: 'var(--fs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{contest.name || contest.code}</div>
                      <div style={{ color: 'var(--t3)', fontSize: '11px', fontFamily: 'var(--fn)' }}>{contest.date}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', textAlign: 'right' }}>
                      <div>
                        <div style={{ color: 'var(--t3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rank</div>
                        <div style={{ color: 'var(--t1)', fontWeight: 600, fontFamily: 'var(--fn)', fontSize: '16px' }}>#{contest.rank}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--t3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rating</div>
                        <div style={{ color: 'var(--blood)', fontWeight: 600, fontFamily: 'var(--fn)', fontSize: '16px' }}>{contest.rating}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
        )}
      </section>
    </div>
  );
};

export default CodeChefPage;

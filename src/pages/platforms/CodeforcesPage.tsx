import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PlatformLoader from "@/components/PlatformLoader";
import FireCanvas from "@/components/FireCanvas";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { CodeforcesActivityWaveform } from "@/components/CodeforcesActivityWaveform";
import "./PlatformsCommon.css";

const CODEFORCES_HANDLE = "Ordinary_Coder_420";

const CodeforcesPage = () => {
  const { data: stats, isLoading, error } = useCodeforcesStats(CODEFORCES_HANDLE);
  const profile = stats?.profile;
  const profileUrl = `https://codeforces.com/profile/${CODEFORCES_HANDLE}`;

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <div id="codeforces" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
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
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on Codeforces</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--ember)'}}>Codeforces</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        {error && (
            <div className="text-center py-12" style={{color: "hsl(0,84%,60%)", fontFamily: 'var(--fs)'}}>
              Failed to load Codeforces stats. Please try again.
            </div>
        )}

        {!error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em>Codeforces</em> Profile</div>
            <div className="pf-subtitle" style={{textTransform: 'capitalize'}}>@{profile?.handle || CODEFORCES_HANDLE} {profile?.rank ? `• ${profile.rank}` : ''}</div>
          </div>

          <div className="pf-stats-row">
            <div className="pf-stat">
              <span className="pf-stat-ico">🏆</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : profile?.problemsSolved ?? 0}</div>
              <div className="pf-stat-lbl">Problems Solved</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: profile?.rankColor || 'inherit'}}>⚡</span>
              <div className="pf-stat-val" style={{color: profile?.rankColor || 'inherit'}}>{isLoading ? '-' : profile?.rating ?? 0}</div>
              <div className="pf-stat-lbl">Current Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: profile?.maxRankColor || 'inherit'}}>🎯</span>
              <div className="pf-stat-val" style={{color: profile?.maxRankColor || 'inherit'}}>{isLoading ? '-' : profile?.maxRating ?? 0}</div>
              <div className="pf-stat-lbl">Max Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🏅</span>
              <div className="pf-stat-val pale">{isLoading ? '-' : profile?.contestsParticipated ?? 0}</div>
              <div className="pf-stat-lbl">Contests</div>
            </div>
          </div>

          <div className="pf-contest-section">
            <div className="pf-contest-title">Performance Summary</div>

            <div className="pf-c-summary">
              <div className="pf-c-sum-card">
                <div className="pf-cs-val teal">{isLoading ? '-' : profile?.totalSubmissions ?? 0}</div>
                <div className="pf-cs-lbl">Submissions</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val blue">{isLoading ? '-' : profile?.friendOfCount ?? 0}</div>
                <div className="pf-cs-lbl">Friends</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val pale">{isLoading ? '-' : `+${profile?.contribution ?? 0}`}</div>
                <div className="pf-cs-lbl">Contribution</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val orange" style={{color: profile?.maxRankColor || 'inherit', textTransform: 'capitalize'}}>{isLoading ? '-' : profile?.maxRank ?? 'N/A'}</div>
                <div className="pf-cs-lbl">Max Rank</div>
              </div>
            </div>

            <div className="pf-c-cols" style={{gridTemplateColumns: '1fr'}}>
              <div>
                <div className="pf-c-col-title"><span className="dot8 d-am"></span> Recent Contests</div>
                {isLoading ? (
                   [...Array(3)].map((_,i) => <Skeleton key={i} className="h-16 w-full mb-2 bg-[var(--dark2)]" />)
                ) : stats?.recentContests && stats.recentContests.length > 0 ? (
                  stats.recentContests.slice(0, 10).map((c, i) => (
                    <div key={i} className="pf-c-row">
                      <div className="pf-c-row-left">
                        <div className="pf-c-trophy">🏅</div>
                        <div><div className="pf-c-name">{c.name}</div><div className="pf-c-date">Rank: #{c.rank.toLocaleString()}</div></div>
                      </div>
                      <div className="pf-c-right">
                        <div className="pf-c-rating" style={{color: c.ratingChange >= 0 ? 'var(--green)' : 'var(--blood)'}}>
                          {c.ratingChange >= 0 ? '+' : ''}{c.ratingChange}
                        </div>
                        <div className="pf-c-rank">{c.newRating} · Rating</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-[var(--t3)] py-4">No recent contests</div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-12 mt-16 w-full max-w-[1050px] mx-auto px-4">
             {stats?.heatmap && stats.heatmap.length > 0 && <CodeforcesActivityWaveform data={stats.heatmap} rankColor={profile?.rankColor || 'var(--green)'} />}
          </div>

        </motion.div>
        )}
      </section>
    </div>
  );
};

export default CodeforcesPage;

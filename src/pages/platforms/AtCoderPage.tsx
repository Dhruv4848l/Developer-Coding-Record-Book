import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useAtCoderStats, AtCoderHeatmapDay } from "@/hooks/useAtCoderStats";
import { useMemo, useState, useCallback } from "react";
import PlatformLoader from "@/components/PlatformLoader";
import FireCanvas from "@/components/FireCanvas";
import { GalaxyHeatmap } from "@/components/GalaxyHeatmap";
import { AtCoderKyberCrystal } from "@/components/AtCoderKyberCrystal";
import "./PlatformsCommon.css";

const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-[hsl(190,95%,20%)]";
  if (count >= 2 && count <= 3) return "bg-[hsl(190,95%,30%)]";
  if (count >= 4 && count <= 6) return "bg-[hsl(190,95%,40%)]";
  return "bg-[hsl(190,95%,50%)]";
};

interface MonthData {
  month: string;
  year: number;
  weeks: {date: Date;count: number;}[][];
}

const processHeatmapDataByMonth = (data: AtCoderHeatmapDay[]): MonthData[] => {
  if (!data || data.length === 0) return [];
  const months: MonthData[] = [];
  let currentMonthKey = '';
  let currentMonthWeeks: {date: Date;count: number;}[][] = [];
  let currentWeek: {date: Date;count: number;}[] = [];
  data.forEach((day) => {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (monthKey !== currentMonthKey) {
      if (currentMonthKey !== '') {
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) currentWeek.push({ date: new Date(0), count: -1 });
          currentMonthWeeks.push(currentWeek);
        }
        const [prevYear, prevMonth] = currentMonthKey.split('-').map(Number);
        months.push({ month: new Date(prevYear, prevMonth).toLocaleDateString('en-US', { month: 'short' }), year: prevYear, weeks: currentMonthWeeks });
      }
      currentMonthKey = monthKey;
      currentMonthWeeks = [];
      currentWeek = [];
      const dayOfWeek = date.getDay();
      for (let i = 0; i < dayOfWeek; i++) currentWeek.push({ date: new Date(0), count: -1 });
    }
    currentWeek.push({ date, count: day.count });
    if (date.getDay() === 6) {currentMonthWeeks.push(currentWeek);currentWeek = [];}
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push({ date: new Date(0), count: -1 });
    currentMonthWeeks.push(currentWeek);
  }
  if (currentMonthKey !== '') {
    const [year, month] = currentMonthKey.split('-').map(Number);
    months.push({ month: new Date(year, month).toLocaleDateString('en-US', { month: 'short' }), year, weeks: currentMonthWeeks });
  }
  return months;
};

const ATCODER_USERNAME = "MrCoder420";

const AtCoderPage = () => {
  const { data: stats, isLoading, error } = useAtCoderStats(ATCODER_USERNAME);
  const profile = stats?.profile;
  const profileUrl = `https://atcoder.jp/users/${ATCODER_USERNAME}`;
  const monthsData = useMemo(() => {
    if (!stats?.heatmap) return [];
    return processHeatmapDataByMonth(stats.heatmap);
  }, [stats?.heatmap]);

  const totalActiveDays = stats?.heatmap?.filter((d) => d.count > 0).length ?? 0;
  let currentStreak = 0;
  if (stats?.heatmap) {
    for (let i = stats.heatmap.length - 1; i >= 0; i--) {
      if (stats.heatmap[i].count > 0) currentStreak++;else
      break;
    }
  }
  let maxStreak = 0;
  let tempStreak = 0;
  if (stats?.heatmap) {
    for (const day of stats.heatmap) {
      if (day.count > 0) {tempStreak++;maxStreak = Math.max(maxStreak, tempStreak);} else
      tempStreak = 0;
    }
  }
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <div id="atcoder" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
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
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on AtCoder</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--cyan)'}}>AtCoder</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        {error && (
            <div className="text-center py-12" style={{color: "hsl(0,84%,60%)", fontFamily: 'var(--fs)'}}>
              Failed to load AtCoder stats. Please try again.
            </div>
        )}

        {!error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em style={{color: 'var(--cyan)'}}>AtCoder</em> Profile</div>
            <div className="pf-subtitle">@{profile?.username || ATCODER_USERNAME} {profile?.rank && `• ${profile.rank}`}</div>
          </div>

          <div className="pf-stats-row">
            <div className="pf-stat">
              <span className="pf-stat-ico">🏆</span>
              <div className="pf-stat-val cyan">{isLoading ? '-' : profile?.problemsSolved ?? 0}</div>
              <div className="pf-stat-lbl">Problems Solved</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico" style={{color: profile?.rankColor || 'var(--cyan)'}}>⚡</span>
              <div className="pf-stat-val" style={{color: profile?.rankColor || 'var(--cyan)'}}>{isLoading ? '-' : profile?.rating ?? 0}</div>
              <div className="pf-stat-lbl">Current Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🎯</span>
              <div className="pf-stat-val pale">{isLoading ? '-' : profile?.highestRating ?? 0}</div>
              <div className="pf-stat-lbl">Highest Rating</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🏅</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : profile?.contestsParticipated ?? 0}</div>
              <div className="pf-stat-lbl">Contests</div>
            </div>
          </div>

          <div className="pf-contest-section">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,280px] gap-8">
              <div>
                <div className="pf-contest-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>Performance Timeline</div>
                
                <div className="pf-c-summary" style={{gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '100%', margin: '0 0 2rem 0'}}>
                  <div className="pf-c-sum-card" style={{padding: '1rem'}}>
                    <div className="pf-cs-val teal" style={{color: 'var(--cyan)'}}>{isLoading ? '-' : profile?.acceptedSubmissions ?? 0}</div>
                    <div className="pf-cs-lbl">AC Submissions</div>
                  </div>
                  <div className="pf-c-sum-card" style={{padding: '1rem'}}>
                    <div className="pf-cs-val blue">{isLoading ? '-' : profile?.globalRank ? `#${profile.globalRank.toLocaleString()}` : 'N/A'}</div>
                    <div className="pf-cs-lbl">Global Rank</div>
                  </div>
                </div>

                <div className="pf-c-cols" style={{gridTemplateColumns: '1fr', marginTop: '1rem'}}>
                  <div>
                    {isLoading ? (
                       [...Array(3)].map((_,i) => <Skeleton key={i} className="h-16 w-full mb-2 bg-[var(--dark2)]" />)
                    ) : stats?.contestHistory && stats.contestHistory.length > 0 ? (
                      <div className="relative pl-6 before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-[var(--border2)]">
                        {stats.contestHistory.slice(0, 10).map((c, i) => {
                          const isUp = c.ratingChange > 0;
                          const isDown = c.ratingChange < 0;
                          const nodeColor = isUp ? 'var(--green)' : isDown ? 'var(--blood)' : 'var(--t4)';
                          return (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="relative mb-4 last:mb-0"
                            >
                              {/* Animated Node */}
                              <motion.div 
                                className="absolute -left-[30px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full z-10"
                                style={{ backgroundColor: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                              
                              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-4 flex justify-between items-center group hover:border-[rgba(255,255,255,0.1)] transition-colors">
                                <div>
                                  <div className="text-[var(--t1)] font-semibold text-sm mb-1 font-mono tracking-wider">{c.contestName}</div>
                                  <div className="text-[var(--t4)] text-xs font-mono">{c.date}</div>
                                </div>
                                <div className="text-right flex flex-col justify-center">
                                  <div className="text-lg font-bold font-mono" style={{color: nodeColor, textShadow: `0 0 10px ${nodeColor}`}}>
                                    {c.ratingChange > 0 ? '+' : ''}{c.ratingChange}
                                  </div>
                                  <div className="text-[var(--t3)] text-[9px] uppercase tracking-widest mt-1">Perf: {c.performance}</div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-[var(--t3)] py-4">No recent contests</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-start border-l border-[rgba(255,255,255,0.05)] pl-8 lg:sticky lg:top-[100px] h-fit">
                 <div className="pf-contest-title" style={{textAlign: 'center', marginBottom: '2rem'}}>Core Rank</div>
                 <AtCoderKyberCrystal color={profile?.rankColor || 'var(--cyan)'} />
                 <div className="text-2xl mt-8 font-bold uppercase tracking-widest text-shadow-sm font-mono" style={{color: profile?.rankColor || 'var(--cyan)', textShadow: `0 0 20px ${profile?.rankColor || 'var(--cyan)'}`}}>{profile?.rank || 'Unrated'}</div>
                 <div className="text-[var(--t3)] text-xs uppercase tracking-widest mt-2">{profile?.rating || 0} RTG</div>
              </div>
            </div>
          </div>

          <div className="hm-section">
            <div className="hm-top-row">
              <div>
                <div className="hm-count-big"><strong>{profile?.acceptedSubmissions || 0}</strong> AC submissions in the past one year</div>
              </div>
              <div className="hm-stats-col">
                <div className="hm-stat-item">Total active days: <b>{totalActiveDays || 0}</b></div>
                <div className="hm-stat-item">Max streak: <b>{maxStreak || 0}</b></div>
                <div className="hm-current">Current: <b>{currentStreak || 0}</b></div>
              </div>
            </div>
            <div className="mb-8 mt-12 w-full max-w-[900px] mx-auto">
               {stats?.heatmap && stats.heatmap.length > 0 && <GalaxyHeatmap data={stats.heatmap} />}
            </div>
          </div>

        </motion.div>
        )}
      </section>
    </div>
  );
};

export default AtCoderPage;
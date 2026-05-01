import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PlatformLoader from "@/components/PlatformLoader";
import { useLeetCodeStats, LeetCodeHeatmapDay } from "@/hooks/useLeetCodeStats";
import { GalaxyHeatmap } from "@/components/GalaxyHeatmap";
import "./PlatformsCommon.css";
import FireCanvas from "@/components/FireCanvas";

const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-[hsl(142,76%,22%)]";
  if (count >= 2 && count <= 3) return "bg-[hsl(142,76%,32%)]";
  if (count >= 4 && count <= 6) return "bg-[hsl(142,76%,42%)]";
  return "bg-[hsl(142,76%,52%)]";
};

interface MonthData {
  month: string;
  year: number;
  weeks: { date: Date; count: number }[][];
}

const processHeatmapDataByMonth = (data: LeetCodeHeatmapDay[]): MonthData[] => {
  if (!data || data.length === 0) return [];
  const months: MonthData[] = [];
  let currentMonthKey = '';
  let currentMonthWeeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];
  
  data.forEach((day, index) => {
    const date = new Date(day.date);
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    if (monthKey !== currentMonthKey) {
      if (currentMonthKey !== '') {
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) currentWeek.push({ date: new Date(0), count: -1 });
          currentMonthWeeks.push(currentWeek);
        }
        const [prevYear, prevMonth] = currentMonthKey.split('-').map(Number);
        // Using local string to get short month name is fine since we construct it with local midnight
        months.push({ month: new Date(prevYear, prevMonth).toLocaleDateString('en-US', { month: 'short' }), year: prevYear, weeks: currentMonthWeeks });
      }
      currentMonthKey = monthKey;
      currentMonthWeeks = [];
      currentWeek = [];
      const dayOfWeek = date.getUTCDay();
      for (let i = 0; i < dayOfWeek; i++) currentWeek.push({ date: new Date(0), count: -1 });
    }
    currentWeek.push({ date, count: day.count });
    if (date.getUTCDay() === 6) { currentMonthWeeks.push(currentWeek); currentWeek = []; }
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

const LeetCodePage = () => {
  const { data: leetcodeStats, isLoading } = useLeetCodeStats('Ordinary_Coder_Here');
  const profile = leetcodeStats?.profile;
  const profileUrl = "https://leetcode.com/u/Ordinary_Coder_Here";
  
  const monthsData = useMemo(() => {
    if (!leetcodeStats?.heatmap) return [];
    return processHeatmapDataByMonth(leetcodeStats.heatmap);
  }, [leetcodeStats?.heatmap]);

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  const weeklyContests = leetcodeStats?.contestHistory.filter(c => c.contestName.includes('Weekly') && !c.contestName.includes('Biweekly')).slice(0, 5) || [];
  const biweeklyContests = leetcodeStats?.contestHistory.filter(c => c.contestName.includes('Biweekly')).slice(0, 5) || [];

  return (
    <div id="leetcode" className="cyber-theme min-h-screen pb-12 relative overflow-hidden">
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
           <button className="nav-cta" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><ExternalLink className="w-3 h-3"/> View on LeetCode</button>
        </a>
      </nav>

      <section className="sec" style={{padding: '4rem 2.5rem', maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 10}}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div style={{fontFamily: 'var(--fs)', fontSize: '9px', letterSpacing: '0.65em', color: 'var(--blood)', textTransform: 'uppercase', marginBottom: '0.6rem'}}>⬥ platform chronicle ⬥</div>
          <h2 style={{fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700, color: 'var(--t1)', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(200,40,28,.15)'}}>Dhruv's <em style={{fontStyle: 'normal', color: 'var(--ember)'}}>LeetCode</em> Profile</h2>
          <div style={{width: '200px', height: '1px', margin: '0.6rem auto', background: 'linear-gradient(90deg,transparent,var(--border2),var(--blood),var(--border2),transparent)'}}></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-box">
          
          <div className="pf-hero">
            <div className="pf-title-main">Dhruv's <em>LeetCode</em> Profile</div>
            <div className="pf-subtitle">@{profile?.username || 'Ordinary_Coder_Here'}</div>
          </div>

          <div className="pf-stats-row">
            <div className="pf-stat">
              <span className="pf-stat-ico">🏆</span>
              <div className="pf-stat-val orange">{isLoading ? '-' : profile?.totalSolved ?? 0}</div>
              <div className="pf-stat-lbl">Problems Solved</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">⚡</span>
              <div className="pf-stat-val blue">{isLoading ? '-' : profile?.totalSubmissions ?? 0}</div>
              <div className="pf-stat-lbl">Submissions</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🎯</span>
              <div className="pf-stat-val teal">{isLoading ? '-' : profile?.acceptanceRate ?? '0%'}</div>
              <div className="pf-stat-lbl">Acceptance Rate</div>
            </div>
            <div className="pf-stat">
              <span className="pf-stat-ico">🏅</span>
              <div className="pf-stat-val pale">{isLoading ? '-' : `#${profile?.ranking?.toLocaleString() ?? 0}`}</div>
              <div className="pf-stat-lbl">Global Ranking</div>
            </div>
          </div>

          <div className="pf-diff-section">
            <div className="pf-diff-title">Difficulty Breakdown</div>
            <div className="pf-diff-grid">
              {(['easy', 'med', 'hard'] as const).map(diff => {
                const isEasy = diff === 'easy';
                const isMed = diff === 'med';
                const count = isEasy ? profile?.easySolved : isMed ? profile?.mediumSolved : profile?.hardSolved;
                const total = (profile?.easySolved || 0) + (profile?.mediumSolved || 0) + (profile?.hardSolved || 0);
                const pct = total === 0 ? 0 : ((count || 0) / total) * 100;
                
                return (
                  <div key={diff} className={`pf-diff-card ${diff}`}>
                    <div className="pf-diff-num">{isLoading ? '-' : count ?? 0}</div>
                    <div className="pf-diff-lbl">{isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard'}</div>
                    <div className="pf-diff-bar">
                        <div className="pf-diff-bar-fill" style={{width: `${isLoading ? 0 : pct}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pf-contest-section">
            <div className="pf-contest-title">Contest Performance</div>

            <div className="pf-c-summary">
              <div className="pf-c-sum-card">
                <div className="pf-cs-val orange">{isLoading ? '-' : Math.round(profile?.contestRating || 0)}</div>
                <div className="pf-cs-lbl">Contest Rating</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val blue">{isLoading ? '-' : `#${profile?.contestGlobalRanking?.toLocaleString() || 0}`}</div>
                <div className="pf-cs-lbl">Global Rank</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val pale">{isLoading ? '-' : `Top ${profile?.contestTopPercentage || 0}%`}</div>
                <div className="pf-cs-lbl">Percentile</div>
              </div>
              <div className="pf-c-sum-card">
                <div className="pf-cs-val green">{isLoading ? '-' : profile?.attendedContestsCount || 0}</div>
                <div className="pf-cs-lbl">Contests Attended</div>
              </div>
            </div>

            <div className="pf-c-cols">
              <div>
                <div className="pf-c-col-title"><span className="dot8 d-am"></span> Weekly Contests (Last 5)</div>
                {isLoading ? (
                   [...Array(5)].map((_,i) => <Skeleton key={i} className="h-16 w-full mb-2 bg-[var(--dark2)]" />)
                ) : weeklyContests.length === 0 ? (
                   <div className="text-sm text-[var(--t3)] py-4">No recent weekly contests</div>
                ) : weeklyContests.map((c, i) => (
                  <div key={i} className="pf-c-row">
                    <div className="pf-c-row-left">
                      <div className="pf-c-trophy">🏆</div>
                      <div><div className="pf-c-name">{c.contestName}</div><div className="pf-c-date">{new Date(c.startTime * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</div></div>
                    </div>
                    <div className="pf-c-right"><div className="pf-c-rating">{Math.round(c.rating || 0)}</div><div className="pf-c-rank">#{c.ranking.toLocaleString()} · Rank</div></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="pf-c-col-title"><span className="dot8 d-bl"></span> Biweekly Contests (Last 5)</div>
                {isLoading ? (
                   [...Array(5)].map((_,i) => <Skeleton key={i} className="h-16 w-full mb-2 bg-[var(--dark2)]" />)
                ) : biweeklyContests.length === 0 ? (
                   <div className="text-sm text-[var(--t3)] py-4">No recent biweekly contests</div>
                ) : biweeklyContests.map((c, i) => (
                  <div key={i} className="pf-c-row">
                    <div className="pf-c-row-left">
                      <div className="pf-c-trophy" style={{background: 'rgba(74,158,204,.1)', borderColor: 'rgba(74,158,204,.2)'}}>🏅</div>
                      <div><div className="pf-c-name">{c.contestName}</div><div className="pf-c-date">{new Date(c.startTime * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</div></div>
                    </div>
                    <div className="pf-c-right"><div className="pf-c-rating" style={{color: 'var(--cyan)'}}>{Math.round(c.rating || 0)}</div><div className="pf-c-rank">#{c.ranking.toLocaleString()} · Rank</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
             {leetcodeStats?.heatmap && <GalaxyHeatmap data={leetcodeStats.heatmap.map((d: any) => ({ date: d.date, count: d.count }))} />}
          </div>

          <div className="hm-section">
            <div className="hm-top-row">
              <div>
                <div className="hm-count-big"><strong>{profile?.totalSubmissions || 0}</strong> submissions in the past one year</div>
              </div>
              <div className="hm-stats-col">
                <div className="hm-stat-item">Total active days: <b>{profile?.activeDays || 0}</b></div>
                <div className="hm-stat-item">Max streak: <b>{profile?.longestStreak || 0}</b></div>
                <div className="hm-current">Current: <b>{profile?.currentStreak || 0}</b></div>
              </div>
            </div>
            
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-max items-start">
                {monthsData.map((monthData, monthIndex) => (
                  <div key={`${monthData.month}-${monthData.year}`} className="flex flex-col">
                    <div className="text-xs text-white/40 mb-2 text-center font-medium" style={{fontFamily: 'var(--fs)'}}>{monthData.month}</div>
                    <div className="flex gap-[2px]">
                      {monthData.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px]">
                          {week.map((day, dayIndex) => (
                            <motion.div
                              key={`${monthIndex}-${weekIndex}-${dayIndex}`}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.02, delay: (monthIndex * 5 + weekIndex) * 0.002 }}
                              whileHover={day.count !== -1 ? { scale: 1.3, zIndex: 10 } : undefined}
                              className={`w-[11px] h-[11px] rounded-[2px] ${day.count === -1 ? "bg-transparent" : getHeatmapColor(day.count)} ${day.count !== -1 ? "hover:ring-1 hover:ring-[#39d353]/60 cursor-pointer" : ""} transition-all relative`}
                              title={day.count === -1 ? undefined : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-xs text-white/40 font-medium mr-1">Less</span>
              {[0, 1, 2, 5, 8].map((count, index) => (
                <div key={index} className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(count)}`} />
              ))}
              <span className="text-xs text-white/40 font-medium ml-1">More</span>
            </div>
          </div>

        </motion.div>
      </section>
    </div>
  );
};

export default LeetCodePage;

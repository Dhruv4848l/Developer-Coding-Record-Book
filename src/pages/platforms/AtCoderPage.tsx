import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, TrendingUp, Target, Award, Zap, Code2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAtCoderStats, AtCoderHeatmapDay } from "@/hooks/useAtCoderStats";
import { useMemo } from "react";

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
  weeks: { date: Date; count: number }[][];
}

const processHeatmapDataByMonth = (data: AtCoderHeatmapDay[]): MonthData[] => {
  if (!data || data.length === 0) return [];
  const months: MonthData[] = [];
  let currentMonthKey = '';
  let currentMonthWeeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];
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
    if (date.getDay() === 6) { currentMonthWeeks.push(currentWeek); currentWeek = []; }
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

const glassStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
};

const headerStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
};

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
      if (stats.heatmap[i].count > 0) currentStreak++;
      else break;
    }
  }
  let maxStreak = 0;
  let tempStreak = 0;
  if (stats?.heatmap) {
    for (const day of stats.heatmap) {
      if (day.count > 0) { tempStreak++; maxStreak = Math.max(maxStreak, tempStreak); }
      else tempStreak = 0;
    }
  }
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190, 95%, 45%) 0%, transparent 70%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(260, 80%, 55%) 0%, transparent 70%)" }} />
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="sticky top-0 z-50" style={headerStyle}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/"><Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"><User className="w-4 h-4" /></Button></Link>
              <Link to="/dashboard"><Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/10"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Button></Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-atcoder/30 text-atcoder hover:bg-atcoder/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-atcoder">AtCoder</span> Profile</h1>
          <p className="text-white/50 text-lg">@{profile?.username || ATCODER_USERNAME}</p>
          {profile?.rank && <p className="text-lg font-semibold mt-2" style={{ color: profile.rankColor }}>{profile.rank}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2,3,4].map(i => <Skeleton key={i} className="h-24 sm:h-28 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-atcoder mx-auto mb-2 sm:mb-3" /><div className="text-2xl sm:text-3xl font-bold text-atcoder">{profile?.problemsSolved ?? 0}</div><div className="text-sm text-white/40">Problems Solved</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.rankColor }}>{profile?.rating ?? 0}</div><div className="text-sm text-white/40">Current Rating</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(142,76%,45%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(142,76%,45%)" }}>{profile?.highestRating ?? 0}</div><div className="text-sm text-white/40">Highest Rating</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(38,92%,50%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(38,92%,50%)" }}>{profile?.contestsParticipated ?? 0}</div><div className="text-sm text-white/40">Contests</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 text-center" style={glassStyle}><Zap className="w-5 h-5 mx-auto mb-2" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-xl font-bold text-white">{profile?.acceptedSubmissions ?? 0}</div><div className="text-xs text-white/40">AC Submissions</div></div>
              <div className="rounded-xl p-4 text-center" style={glassStyle}><Code2 className="w-5 h-5 text-atcoder mx-auto mb-2" /><div className="text-xl font-bold text-white">{profile?.globalRank ? `#${profile.globalRank.toLocaleString()}` : 'N/A'}</div><div className="text-xs text-white/40">Global Rank</div></div>
            </>
          )}
        </motion.div>

        {monthsData.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-4 sm:p-8 mb-12" style={glassStyle}>
            {isLoading ? (
              <div className="space-y-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-32 w-full" /></div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-white">{profile?.acceptedSubmissions ?? 0}</span>
                    <span className="text-white/40 text-sm sm:text-base">submissions in the past one year</span>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-4 min-w-max pb-2 items-start">
                    {monthsData.map((monthData, monthIndex) => (
                      <div key={`${monthData.month}-${monthData.year}`} className="flex flex-col">
                        <div className="text-xs text-white/40 mb-2 text-center font-medium">{monthData.month}</div>
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
                                  className={`w-[11px] h-[11px] rounded-[2px] ${day.count === -1 ? "bg-transparent" : getHeatmapColor(day.count)} ${day.count !== -1 ? "hover:ring-1 hover:ring-atcoder/60 cursor-pointer" : ""} transition-all relative`}
                                  title={day.count === -1 ? undefined : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col gap-3 ml-6 pt-5">
                      <div className="text-sm"><span className="text-white/40">Total active days: </span><span className="font-bold text-white">{totalActiveDays}</span></div>
                      <div className="text-sm"><span className="text-white/40">Max streak: </span><span className="font-bold text-white">{maxStreak}</span></div>
                      <div className="text-sm px-3 py-1.5 rounded-md text-white" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <span className="text-white/40">Current: </span><span className="font-bold">{currentStreak}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <span className="text-xs text-white/40">Less</span>
                    {[0, 1, 2, 5, 8].map((count, index) => (
                      <div key={index} className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(count)}`} />
                    ))}
                    <span className="text-xs text-white/40">More</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-8" style={glassStyle}>
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Contests</h2>
          {isLoading ? (
            <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}</div>
          ) : stats?.contestHistory && stats.contestHistory.length > 0 ? (
            <div className="space-y-4">
              {stats.contestHistory.slice(0, 10).map((contest, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg transition-colors gap-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-atcoder hidden sm:block" />
                    <div><span className="font-medium text-sm sm:text-base line-clamp-1 text-white/80">{contest.contestName}</span><div className="text-xs text-white/40">{contest.date}</div></div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <span className="text-white/40">Rank: <span className="text-white font-medium">{contest.rank}</span></span>
                    <span className="text-white/40">Perf: <span className="text-white font-medium">{contest.performance}</span></span>
                    <span style={{ color: contest.ratingChange >= 0 ? "hsl(142,76%,45%)" : "hsl(0,84%,60%)" }} className="font-medium">{contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-white/40 text-center py-8">No contest history available</p>}
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-12 text-center mt-12" style={glassStyle}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(0,84%,60%)" }}>Error Loading Profile</h2>
            <p className="text-white/50 max-w-md mx-auto">Unable to fetch data from AtCoder. Please try again later.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AtCoderPage;

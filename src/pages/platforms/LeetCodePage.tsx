import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Zap, Target, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useLeetCodeStats, LeetCodeHeatmapDay } from "@/hooks/useLeetCodeStats";
import { LeetCodeContestSection } from "@/components/LeetCodeContestSection";

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

const LeetCodePage = () => {
  const { data: leetcodeStats, isLoading, error } = useLeetCodeStats('Ydp5K7DIfv');
  const profile = leetcodeStats?.profile;
  const profileUrl = "https://leetcode.com/u/Ydp5K7DIfv";
  const monthsData = useMemo(() => {
    if (!leetcodeStats?.heatmap) return [];
    return processHeatmapDataByMonth(leetcodeStats.heatmap);
  }, [leetcodeStats?.heatmap]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      {/* Animated orbs */}
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(33, 100%, 50%) 0%, transparent 70%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(142, 76%, 36%) 0%, transparent 70%)" }} />
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Header */}
      <div className="sticky top-0 z-50" style={headerStyle}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/"><Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"><User className="w-4 h-4" /></Button></Link>
              <Link to="/dashboard"><Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/10"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Button></Link>
            </div>
            <div className="flex items-center gap-2">
              
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-leetcode/30 text-leetcode hover:bg-leetcode/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-leetcode">LeetCode</span> Profile</h1>
          <p className="text-white/50 text-lg">@{profile?.username || 'Ydp5K7DIfv'}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {isLoading ? (
            <>{[1,2,3,4].map(i => <Skeleton key={i} className="h-24 sm:h-28 w-full rounded-xl" />)}</>
          ) : (
            <>
              {[
                { icon: Trophy, value: profile?.totalSolved ?? 0, label: "Problems Solved", color: "text-leetcode" },
                { icon: Zap, value: profile?.totalSubmissions ?? 0, label: "Submissions", color: "text-[hsl(190,95%,60%)]" },
                { icon: Target, value: profile?.acceptanceRate ?? '0%', label: "Acceptance Rate", color: "text-[hsl(142,76%,45%)]" },
                { icon: Trophy, value: `#${profile?.ranking?.toLocaleString() ?? 0}`, label: "Global Ranking", color: "text-[hsl(38,92%,50%)]" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}>
                  <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mx-auto mb-2 sm:mb-3`} />
                  <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </>
          )}
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-8 mb-12" style={glassStyle}>
          <h2 className="text-3xl font-bold mb-8 text-white">Difficulty Breakdown</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { value: profile?.easySolved ?? 0, label: "Easy", color: "hsl(142, 76%, 45%)" },
                { value: profile?.mediumSolved ?? 0, label: "Medium", color: "hsl(38, 92%, 50%)" },
                { value: profile?.hardSolved ?? 0, label: "Hard", color: "hsl(0, 84%, 60%)" },
              ].map((d, i) => (
                <div key={i} className="text-center p-6 sm:p-8 rounded-xl" style={{
                  background: `${d.color}15`, border: `1px solid ${d.color}40`,
                }}>
                  <div className="text-5xl sm:text-6xl font-bold mb-2 sm:mb-3" style={{ color: d.color }}>{d.value}</div>
                  <div className="text-lg font-semibold" style={{ color: d.color }}>{d.label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contest Section */}
        {!isLoading && (
          <LeetCodeContestSection
            contestRating={profile?.contestRating || 0}
            contestGlobalRanking={profile?.contestGlobalRanking || 0}
            contestTopPercentage={profile?.contestTopPercentage || "0"}
            attendedContestsCount={profile?.attendedContestsCount || 0}
            contestHistory={leetcodeStats?.contestHistory || []}
          />
        )}

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-4 sm:p-8" style={glassStyle}>
          {isLoading ? (
            <div className="space-y-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-32 w-full" /></div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold text-white">{profile?.totalSubmissions ?? 0}</span>
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
                                className={`w-[11px] h-[11px] rounded-[2px] ${day.count === -1 ? "bg-transparent" : getHeatmapColor(day.count)} ${day.count !== -1 ? "hover:ring-1 hover:ring-[#39d353]/60 cursor-pointer" : ""} transition-all relative`}
                                title={day.count === -1 ? undefined : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-3 ml-6 pt-5">
                    <div className="text-sm"><span className="text-white/40">Total active days: </span><span className="font-bold text-white">{profile?.activeDays ?? 0}</span></div>
                    <div className="text-sm"><span className="text-white/40">Max streak: </span><span className="font-bold text-white">{profile?.longestStreak ?? 0}</span></div>
                    <div className="text-sm px-3 py-1.5 rounded-md text-white" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <span className="text-white/40">Current: </span><span className="font-bold">{profile?.currentStreak ?? 0}</span>
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
      </div>
    </div>
  );
};

export default LeetCodePage;

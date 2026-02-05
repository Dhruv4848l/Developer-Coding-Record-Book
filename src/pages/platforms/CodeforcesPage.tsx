import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, Zap, Target, TrendingUp, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useCodeforcesStats, CodeforcesHeatmapDay } from "@/hooks/useCodeforcesStats";

const CODEFORCES_HANDLE = "Dhruv_Maji"; // Replace with actual handle

const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-[#161b22]";
  if (count === 1) return "bg-[#0a3069]";
  if (count >= 2 && count <= 3) return "bg-[#0969da]";
  if (count >= 4 && count <= 6) return "bg-[#54aeff]";
  return "bg-[#79c0ff]";
};

interface MonthData {
  month: string;
  year: number;
  weeks: { date: Date; count: number }[][];
}

const processHeatmapDataByMonth = (data: CodeforcesHeatmapDay[]): MonthData[] => {
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
          while (currentWeek.length < 7) {
            currentWeek.push({ date: new Date(0), count: -1 });
          }
          currentMonthWeeks.push(currentWeek);
        }
        
        const [prevYear, prevMonth] = currentMonthKey.split('-').map(Number);
        months.push({
          month: new Date(prevYear, prevMonth).toLocaleDateString('en-US', { month: 'short' }),
          year: prevYear,
          weeks: currentMonthWeeks,
        });
      }
      
      currentMonthKey = monthKey;
      currentMonthWeeks = [];
      currentWeek = [];
      
      const dayOfWeek = date.getDay();
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: new Date(0), count: -1 });
      }
    }
    
    currentWeek.push({ date, count: day.count });
    
    if (date.getDay() === 6) {
      currentMonthWeeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: new Date(0), count: -1 });
    }
    currentMonthWeeks.push(currentWeek);
  }
  
  if (currentMonthKey !== '') {
    const [year, month] = currentMonthKey.split('-').map(Number);
    months.push({
      month: new Date(year, month).toLocaleDateString('en-US', { month: 'short' }),
      year: year,
      weeks: currentMonthWeeks,
    });
  }
  
  return months;
};

const CodeforcesPage = () => {
  const { data: stats, isLoading, error } = useCodeforcesStats(CODEFORCES_HANDLE);
  
  const profile = stats?.profile;
  const profileUrl = `https://codeforces.com/profile/${CODEFORCES_HANDLE}`;

  const monthsData = useMemo(() => {
    if (!stats?.heatmap) return [];
    return processHeatmapDataByMonth(stats.heatmap);
  }, [stats?.heatmap]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-codeforces/30 text-codeforces hover:bg-codeforces/10">
                <ExternalLink className="w-4 h-4" />
                View Profile
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dhruv's <span className="text-codeforces">Codeforces</span> Profile
          </h1>
          <p className="text-muted-foreground text-lg">@{profile?.handle || CODEFORCES_HANDLE}</p>
          {profile?.rank && (
            <p 
              className="text-lg font-semibold mt-2 capitalize"
              style={{ color: profile.rankColor }}
            >
              {profile.rank}
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-codeforces mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-codeforces">{profile?.problemsSolved ?? 0}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.rankColor }}>{profile?.rating ?? 0}</div>
                <div className="text-sm text-muted-foreground">Current Rating</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-success" style={{ color: profile?.maxRankColor }}>{profile?.maxRating ?? 0}</div>
                <div className="text-sm text-muted-foreground">Max Rating</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-warning mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-warning">{profile?.contestsParticipated ?? 0}</div>
                <div className="text-sm text-muted-foreground">Contests</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold">{profile?.totalSubmissions ?? 0}</div>
                <div className="text-xs text-muted-foreground">Submissions</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Users className="w-5 h-5 text-codeforces mx-auto mb-2" />
                <div className="text-xl font-bold">{profile?.friendOfCount ?? 0}</div>
                <div className="text-xs text-muted-foreground">Friends</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
                <div className="text-xl font-bold text-success">+{profile?.contribution ?? 0}</div>
                <div className="text-xs text-muted-foreground">Contribution</div>
              </div>
              <div className="glass rounded-xl p-4 text-center capitalize">
                <Award className="w-5 h-5 mx-auto mb-2" style={{ color: profile?.maxRankColor }} />
                <div className="text-lg font-bold" style={{ color: profile?.maxRankColor }}>{profile?.maxRank ?? 'N/A'}</div>
                <div className="text-xs text-muted-foreground">Max Rank</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Recent Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Contests</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : stats?.recentContests && stats.recentContests.length > 0 ? (
            <div className="space-y-4">
              {stats.recentContests.slice(0, 5).map((contest, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors gap-2"
                >
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-codeforces hidden sm:block" />
                    <span className="font-medium text-sm sm:text-base line-clamp-1">{contest.name}</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <span className="text-muted-foreground">Rank: <span className="text-foreground font-medium">{contest.rank}</span></span>
                    <span className={contest.ratingChange >= 0 ? "text-success font-medium" : "text-destructive font-medium"}>
                      {contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}
                    </span>
                    <span className="text-muted-foreground">{contest.newRating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No contest history available</p>
          )}
        </motion.div>

        {/* Submission Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4 sm:p-8"
        >
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <>
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold text-foreground">{profile?.totalSubmissions ?? 0}</span>
                  <span className="text-muted-foreground text-sm sm:text-base">submissions in the past one year</span>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="w-full overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-2 items-start">
                  {monthsData.map((monthData, monthIndex) => (
                    <div key={`${monthData.month}-${monthData.year}`} className="flex flex-col">
                      {/* Month Label */}
                      <div className="text-xs text-muted-foreground mb-2 text-center font-medium">
                        {monthData.month}
                      </div>
                      {/* Weeks Grid */}
                      <div className="flex gap-[2px]">
                        {monthData.weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-[2px]">
                            {week.map((day, dayIndex) => (
                              <motion.div
                                key={`${monthIndex}-${weekIndex}-${dayIndex}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.02,
                                  delay: (monthIndex * 5 + weekIndex) * 0.002,
                                }}
                                whileHover={day.count !== -1 ? { scale: 1.3, zIndex: 10 } : undefined}
                                className={`w-[11px] h-[11px] rounded-[2px] ${
                                  day.count === -1 
                                    ? "bg-transparent" 
                                    : getHeatmapColor(day.count)
                                } ${day.count !== -1 ? "hover:ring-1 hover:ring-[#54aeff]/60 cursor-pointer" : ""} transition-all relative`}
                                title={
                                  day.count === -1 
                                    ? undefined 
                                    : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`
                                }
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Stats on the right side */}
                  <div className="flex flex-col gap-3 ml-6 pt-5">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total active days: </span>
                      <span className="font-bold text-foreground">{profile?.activeDays ?? 0}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Max streak: </span>
                      <span className="font-bold text-foreground">{profile?.longestStreak ?? 0}</span>
                    </div>
                    <div className="text-sm px-3 py-1.5 rounded-md bg-secondary/60 text-foreground">
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-bold">{profile?.currentStreak ?? 0}</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-xs text-muted-foreground">Less</span>
                  {[0, 1, 2, 5, 8].map((count, index) => (
                    <div
                      key={index}
                      className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(count)}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground">More</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CodeforcesPage;

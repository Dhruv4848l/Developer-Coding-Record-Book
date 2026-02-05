 import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Zap, Target, Info } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useLeetCodeStats, LeetCodeHeatmapDay } from "@/hooks/useLeetCodeStats";

const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-secondary/40";
  if (count === 1) return "bg-[hsl(45,90%,25%)]";
  if (count >= 2 && count <= 3) return "bg-[hsl(45,90%,35%)]";
  if (count >= 4 && count <= 6) return "bg-[hsl(45,90%,45%)]";
  return "bg-[hsl(45,90%,55%)]";
};

const processHeatmapData = (data: LeetCodeHeatmapDay[]) => {
  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];
  
  data.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();
    
    if (index === 0 && dayOfWeek !== 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: new Date(0), count: -1 });
      }
    }
    
    currentWeek.push({ date, count: day.count });
    
    if (dayOfWeek === 6 || index === data.length - 1) {
      if (index === data.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: new Date(0), count: -1 });
        }
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  return weeks;
};

const getMonthLabels = (weeks: { date: Date; count: number }[][]) => {
  const labels: { month: string; position: number }[] = [];
  let currentMonth = -1;
  let monthStartWeek = 0;
  
  weeks.forEach((week, weekIndex) => {
    const validDay = week.find(d => d.count !== -1);
    if (validDay) {
      const month = validDay.date.getMonth();
      if (month !== currentMonth) {
        if (currentMonth !== -1) {
          // Calculate center position for the previous month
          const prevLabel = labels[labels.length - 1];
          if (prevLabel) {
            prevLabel.position = Math.floor((monthStartWeek + weekIndex - 1) / 2);
          }
        }
        monthStartWeek = weekIndex;
        labels.push({
          month: validDay.date.toLocaleDateString('en-US', { month: 'short' }),
          position: weekIndex,
        });
        currentMonth = month;
      }
    }
  });

  // Center the last month label
  if (labels.length > 0) {
    const lastLabel = labels[labels.length - 1];
    lastLabel.position = Math.floor((monthStartWeek + weeks.length - 1) / 2);
  }
  
  return labels;
};

const getWeekMonthBoundaries = (weeks: { date: Date; count: number }[][]) => {
  const boundaries: Set<number> = new Set();
  let currentMonth = -1;
  
  weeks.forEach((week, weekIndex) => {
    const validDay = week.find(d => d.count !== -1);
    if (validDay) {
      const month = validDay.date.getMonth();
      if (month !== currentMonth && weekIndex > 0) {
        boundaries.add(weekIndex);
      }
      currentMonth = month;
    }
  });
  
  return boundaries;
};
 
 const LeetCodePage = () => {
  const { data: leetcodeStats, isLoading, error } = useLeetCodeStats('Ydp5K7DIfv');
  
  const profile = leetcodeStats?.profile;
  const profileUrl = "https://leetcode.com/u/Ydp5K7DIfv";
 
  const weeks = useMemo(() => {
    if (!leetcodeStats?.heatmap) return [];
    return processHeatmapData(leetcodeStats.heatmap);
  }, [leetcodeStats?.heatmap]);
  
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  const monthBoundaries = useMemo(() => getWeekMonthBoundaries(weeks), [weeks]);
 
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
               <Button variant="outline" className="gap-2 border-leetcode/30 text-leetcode hover:bg-leetcode/10">
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
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-leetcode/10 border border-leetcode/30 mb-6">
             <Code2 className="w-5 h-5 text-leetcode" />
             <span className="text-leetcode font-medium">LeetCode</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold mb-4">
             Dhruv's <span className="text-leetcode">LeetCode</span> Profile
           </h1>
            <p className="text-muted-foreground text-lg">@{profile?.username || 'Ydp5K7DIfv'}</p>
         </motion.div>
 
         {/* Stats Grid */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
         >
            {isLoading ? (
              <>
                <Skeleton className="h-28 w-full rounded-xl" />
                <Skeleton className="h-28 w-full rounded-xl" />
                <Skeleton className="h-28 w-full rounded-xl" />
                <Skeleton className="h-28 w-full rounded-xl" />
              </>
            ) : (
              <>
                <div className="glass rounded-xl p-6 text-center">
                  <Trophy className="w-8 h-8 text-leetcode mx-auto mb-3" />
                  <div className="text-3xl font-bold text-leetcode">{profile?.totalSolved ?? 0}</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold">{profile?.totalSubmissions ?? 0}</div>
                  <div className="text-sm text-muted-foreground">Submissions</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Target className="w-8 h-8 text-success mx-auto mb-3" />
                  <div className="text-3xl font-bold text-success">{profile?.acceptanceRate ?? '0%'}</div>
                  <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <Trophy className="w-8 h-8 text-warning mx-auto mb-3" />
                  <div className="text-3xl font-bold text-warning">#{profile?.ranking?.toLocaleString() ?? 0}</div>
                  <div className="text-sm text-muted-foreground">Global Ranking</div>
                </div>
              </>
            )}
         </motion.div>
 
         {/* Difficulty Breakdown */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass rounded-2xl p-8 mb-12"
         >
           <h2 className="text-2xl font-bold mb-6">Difficulty Breakdown</h2>
            {isLoading ? (
              <div className="grid grid-cols-3 gap-6">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-success/10 border border-success/30">
                  <div className="text-4xl font-bold text-success mb-2">{profile?.easySolved ?? 0}</div>
                  <div className="text-success font-medium">Easy</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-warning/10 border border-warning/30">
                  <div className="text-4xl font-bold text-warning mb-2">{profile?.mediumSolved ?? 0}</div>
                  <div className="text-warning font-medium">Medium</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-destructive/10 border border-destructive/30">
                  <div className="text-4xl font-bold text-destructive mb-2">{profile?.hardSolved ?? 0}</div>
                  <div className="text-destructive font-medium">Hard</div>
                </div>
              </div>
            )}
         </motion.div>
 
          {/* LeetCode Submission Heatmap */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass rounded-2xl p-8"
         >
            {isLoading ? (
              <div className="space-y-4">
                 <Skeleton className="h-6 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : (
              <>
                 {/* Header Row */}
                 <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                   <div className="flex items-center gap-2">
                     <span className="text-lg font-bold text-foreground">{profile?.totalSubmissions ?? 0}</span>
                     <span className="text-muted-foreground">submissions in the past one year</span>
                     <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </div>
                   <div className="flex items-center gap-6 text-sm">
                     <div>
                       <span className="text-muted-foreground">Total active days: </span>
                       <span className="font-semibold text-foreground">{profile?.activeDays ?? 0}</span>
                     </div>
                     <div>
                       <span className="text-muted-foreground">Max streak: </span>
                       <span className="font-semibold text-foreground">{profile?.longestStreak ?? 0}</span>
                     </div>
                     <div className="px-3 py-1 rounded bg-secondary/60 text-foreground text-sm">
                       Current: {profile?.currentStreak ?? 0}
                     </div>
                  </div>
                </div>

                {/* Heatmap Grid */}
                 <div className="w-full">
                  <div className="w-full">
                     {/* Heatmap Cells */}
                     <div className="flex w-full">
                       {weeks.map((week, weekIndex) => (
                         <div 
                           key={weekIndex} 
                           className={`flex flex-col gap-[1px] ${monthBoundaries.has(weekIndex) ? 'ml-3' : 'ml-[1px]'}`}
                         >
                           {week.map((day, dayIndex) => (
                             <motion.div
                               key={`${weekIndex}-${dayIndex}`}
                               initial={{ opacity: 0, scale: 0 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{
                                 duration: 0.02,
                                 delay: weekIndex * 0.002,
                               }}
                               whileHover={day.count !== -1 ? { scale: 1.3, zIndex: 10 } : undefined}
                               className={`w-[10px] h-[10px] rounded-sm ${
                                 day.count === -1 
                                   ? "bg-transparent" 
                                   : getHeatmapColor(day.count)
                               } ${day.count !== -1 ? "hover:ring-1 hover:ring-foreground/40 cursor-pointer" : ""} transition-all relative`}
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

                     {/* Month Labels at Bottom */}
                     <div className="flex justify-between w-full mt-2 px-1">
                       {monthLabels.map((label, index) => (
                         <div
                           key={`${label.month}-${index}`}
                           className="text-xs text-muted-foreground text-center flex-1"
                         >
                           {label.month}
                         </div>
                       ))}
                     </div>

                    {/* Legend */}
                    <div className="flex items-center justify-end gap-2 mt-3">
                      <span className="text-xs text-muted-foreground">Less</span>
                      {[0, 1, 2, 5, 8].map((count, index) => (
                        <div
                          key={index}
                           className={`w-[10px] h-[10px] rounded-sm ${getHeatmapColor(count)}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">More</span>
                    </div>
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
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useCodolioStats, HeatmapDay } from "@/hooks/useCodolioStats";
import { Skeleton } from "@/components/ui/skeleton";

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

// Get color based on submission count (LeetCode style - darker = more submissions)
const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-secondary/40";
  if (count === 1) return "bg-[hsl(142,76%,65%)] dark:bg-[hsl(142,76%,22%)]";
  if (count >= 2 && count <= 4) return "bg-[hsl(142,76%,55%)] dark:bg-[hsl(142,76%,32%)]";
  if (count >= 5 && count <= 8) return "bg-[hsl(142,76%,45%)] dark:bg-[hsl(142,76%,42%)]";
  return "bg-[hsl(142,76%,36%)] dark:bg-[hsl(142,76%,52%)]";
};

// Get month labels with correct positions
const getMonthLabels = (weeks: { date: Date; count: number }[][]) => {
  const labels: { month: string; position: number }[] = [];
  let currentMonth = -1;
  
  weeks.forEach((week, weekIndex) => {
    const validDay = week.find(d => d.count !== -1);
    if (validDay) {
      const month = validDay.date.getMonth();
      if (month !== currentMonth) {
        labels.push({
          month: validDay.date.toLocaleDateString('en-US', { month: 'short' }),
          position: weekIndex,
        });
        currentMonth = month;
      }
    }
  });
  
  return labels;
};

// Process heatmap data into weeks (columns)
const processHeatmapData = (data: HeatmapDay[]) => {
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

export const Heatmap = () => {
  const { data: codolioStats, isLoading, error } = useCodolioStats();
  
  const weeks = useMemo(() => {
    if (!codolioStats?.heatmap) return [];
    return processHeatmapData(codolioStats.heatmap);
  }, [codolioStats?.heatmap]);
  
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  
  const stats = useMemo(() => {
    if (!codolioStats?.profile) {
      return { totalSubmissions: 0, currentStreak: 0, longestStreak: 0, activeDays: 0 };
    }
    return {
      totalSubmissions: codolioStats.profile.totalSubmissions,
      currentStreak: codolioStats.profile.currentStreak,
      longestStreak: codolioStats.profile.longestStreak,
      activeDays: codolioStats.profile.activeDays,
    };
  }, [codolioStats?.profile]);

  if (isLoading) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="text-gradient">Consistency</span> Streak
            </h2>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-destructive">Failed to load heatmap data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your <span className="text-gradient">Consistency</span> Streak
          </h2>
          <p className="text-muted-foreground text-lg">
            Track your daily coding activity across all platforms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 text-center">
            <div className="p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalSubmissions}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Total Submissions</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl md:text-3xl font-bold text-accent">{stats.activeDays}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active Days</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl md:text-3xl font-bold text-success">{stats.currentStreak}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Current Streak</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl md:text-3xl font-bold text-warning">{stats.longestStreak}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Longest Streak</div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-block min-w-max">
              {/* Month Labels */}
              <div className="flex mb-2 ml-9 relative h-5">
                {monthLabels.map((label, index) => (
                  <div
                    key={`${label.month}-${index}`}
                    className="text-xs text-muted-foreground absolute font-medium"
                    style={{ left: `${label.position * 15}px` }}
                  >
                    {label.month}
                  </div>
                ))}
              </div>

              <div className="flex gap-[3px]">
                {/* Day Labels */}
                <div className="flex flex-col gap-[3px] pr-2">
                  {dayLabels.map((day, i) => (
                    <div
                      key={`day-${i}`}
                      className="h-[11px] text-[10px] text-muted-foreground flex items-center justify-end w-6"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Heatmap Cells */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.02,
                            delay: weekIndex * 0.002,
                          }}
                          whileHover={day.count !== -1 ? { scale: 1.4, zIndex: 10 } : undefined}
                          className={`w-[11px] h-[11px] rounded-[2px] ${
                            day.count === -1 
                              ? "bg-transparent" 
                              : getHeatmapColor(day.count)
                          } ${day.count !== -1 ? "hover:ring-2 hover:ring-primary/60 cursor-pointer" : ""} transition-all relative`}
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

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-xs text-muted-foreground">Less</span>
                {[0, 1, 3, 6, 10].map((count, index) => (
                  <div
                    key={index}
                    className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(count)}`}
                    title={
                      count === 0 
                        ? "No submissions" 
                        : count === 1 
                          ? "1 submission" 
                          : count <= 4 
                            ? "2-4 submissions" 
                            : count <= 8 
                              ? "5-8 submissions" 
                              : "9+ submissions"
                    }
                  />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>

              {/* Last updated info */}
              {codolioStats?.lastUpdated && (
                <div className="text-xs text-muted-foreground text-right mt-2">
                  Last updated: {new Date(codolioStats.lastUpdated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
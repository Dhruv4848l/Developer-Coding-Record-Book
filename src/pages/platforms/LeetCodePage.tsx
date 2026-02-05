 import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Zap, Target, Flame } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
import { useMemo } from "react";

// Generate LeetCode heatmap data for last 12 months
const generateHeatmapData = () => {
  const data: { date: Date; count: number }[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 365);
  
  // Align to Sunday
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash = hash & hash;
    }
    const normalized = Math.abs(hash % 100);
    
    let count = 0;
    if (normalized >= 40) count = 1;
    if (normalized >= 55) count = 2 + (hash % 2);
    if (normalized >= 75) count = 4 + (hash % 3);
    if (normalized >= 90) count = 7 + (hash % 4);
    
    data.push({ date: new Date(currentDate), count });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

const getHeatmapColor = (count: number): string => {
  if (count === 0) return "bg-secondary/40";
  if (count === 1) return "bg-[hsl(45,90%,25%)]";
  if (count >= 2 && count <= 3) return "bg-[hsl(45,90%,35%)]";
  if (count >= 4 && count <= 6) return "bg-[hsl(45,90%,45%)]";
  return "bg-[hsl(45,90%,55%)]";
};

const processHeatmapData = (data: { date: Date; count: number }[]) => {
  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];
  
  data.forEach((day, index) => {
    const dayOfWeek = day.date.getDay();
    
    if (index === 0 && dayOfWeek !== 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: new Date(0), count: -1 });
      }
    }
    
    currentWeek.push(day);
    
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
 
 const LeetCodePage = () => {
   const stats = {
     username: "@Ydp5K7DIfv",
     solved: 113,
     easy: 60,
     medium: 47,
     hard: 6,
     submissions: 180,
     acceptance: "62.8%",
     ranking: "#385,921",
     profileUrl: "https://leetcode.com/u/Ydp5K7DIfv",
   };
 
  const heatmapData = useMemo(() => generateHeatmapData(), []);
  const weeks = useMemo(() => processHeatmapData(heatmapData), [heatmapData]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  
  const totalSubmissions = heatmapData.reduce((sum, day) => sum + day.count, 0);
  const activeDays = heatmapData.filter(day => day.count > 0).length;
  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      if (heatmapData[i].count > 0) streak++;
      else break;
    }
    return streak;
  }, [heatmapData]);

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
 
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
             <a href={stats.profileUrl} target="_blank" rel="noopener noreferrer">
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
           <p className="text-muted-foreground text-lg">{stats.username}</p>
         </motion.div>
 
         {/* Stats Grid */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
         >
           <div className="glass rounded-xl p-6 text-center">
             <Trophy className="w-8 h-8 text-leetcode mx-auto mb-3" />
             <div className="text-3xl font-bold text-leetcode">{stats.solved}</div>
             <div className="text-sm text-muted-foreground">Problems Solved</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
             <div className="text-3xl font-bold">{stats.submissions}</div>
             <div className="text-sm text-muted-foreground">Submissions</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Target className="w-8 h-8 text-success mx-auto mb-3" />
             <div className="text-3xl font-bold text-success">{stats.acceptance}</div>
             <div className="text-sm text-muted-foreground">Acceptance Rate</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Trophy className="w-8 h-8 text-warning mx-auto mb-3" />
             <div className="text-3xl font-bold text-warning">{stats.ranking}</div>
             <div className="text-sm text-muted-foreground">Global Ranking</div>
           </div>
         </motion.div>
 
         {/* Difficulty Breakdown */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass rounded-2xl p-8 mb-12"
         >
           <h2 className="text-2xl font-bold mb-6">Difficulty Breakdown</h2>
           <div className="grid grid-cols-3 gap-6">
             <div className="text-center p-6 rounded-xl bg-success/10 border border-success/30">
               <div className="text-4xl font-bold text-success mb-2">{stats.easy}</div>
               <div className="text-success font-medium">Easy</div>
             </div>
             <div className="text-center p-6 rounded-xl bg-warning/10 border border-warning/30">
               <div className="text-4xl font-bold text-warning mb-2">{stats.medium}</div>
               <div className="text-warning font-medium">Medium</div>
             </div>
             <div className="text-center p-6 rounded-xl bg-destructive/10 border border-destructive/30">
               <div className="text-4xl font-bold text-destructive mb-2">{stats.hard}</div>
               <div className="text-destructive font-medium">Hard</div>
             </div>
           </div>
         </motion.div>
 
          {/* LeetCode Heatmap */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass rounded-2xl p-8"
         >
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-leetcode" />
              <h2 className="text-2xl font-bold">Submission Activity</h2>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-xl bg-leetcode/10">
                <div className="text-2xl font-bold text-leetcode">{totalSubmissions}</div>
                <div className="text-xs text-muted-foreground">Total Submissions</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-success/10">
                <div className="text-2xl font-bold text-success">{activeDays}</div>
                <div className="text-xs text-muted-foreground">Active Days</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-warning/10">
                <div className="text-2xl font-bold text-warning">{currentStreak}</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
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
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.02,
                              delay: weekIndex * 0.002,
                            }}
                            whileHover={day.count !== -1 ? { scale: 1.4, zIndex: 10 } : undefined}
                            className={`w-[11px] h-[11px] rounded-[2px] ${
                              day.count === -1 
                                ? "bg-transparent" 
                                : getHeatmapColor(day.count)
                            } ${day.count !== -1 ? "hover:ring-2 hover:ring-leetcode/60 cursor-pointer" : ""} transition-all relative`}
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
                  {[0, 1, 2, 5, 8].map((count, index) => (
                    <div
                      key={index}
                      className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(count)}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground">More</span>
                </div>
              </div>
           </div>
         </motion.div>
       </div>
     </div>
   );
 };
 
 export default LeetCodePage;
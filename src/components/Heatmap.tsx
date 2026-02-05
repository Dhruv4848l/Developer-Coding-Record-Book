 import { motion } from "framer-motion";
 import { useMemo } from "react";
 
 // Generate heatmap data for the last 52 weeks with realistic submission counts
 const generateHeatmapData = () => {
   const data: { count: number; date: Date }[] = [];
   const today = new Date();
   const startDate = new Date(today);
   startDate.setDate(startDate.getDate() - 52 * 7);
 
   for (let i = 0; i < 52 * 7; i++) {
     const date = new Date(startDate);
     date.setDate(date.getDate() + i);
     
     // Generate realistic submission counts (0-15)
     const rand = Math.random();
     let count = 0;
     if (rand < 0.35) count = 0;
     else if (rand < 0.55) count = Math.floor(Math.random() * 1) + 1; // 1
     else if (rand < 0.75) count = Math.floor(Math.random() * 3) + 2; // 2-4
     else if (rand < 0.90) count = Math.floor(Math.random() * 4) + 5; // 5-8
     else count = Math.floor(Math.random() * 7) + 9; // 9-15
     
     data.push({ count, date });
   }
   return data;
 };
 
 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const days = ["Mon", "", "Wed", "", "Fri", "", ""];
 
 // Get color class based on submission count
 // 1 submission = darkest, 2-4 = dark, 5-8 = lighter, 9+ = lightest but visible
 const getHeatmapColor = (count: number): string => {
   if (count === 0) return "bg-[hsl(222,47%,12%)]";
   if (count === 1) return "bg-[hsl(190,95%,45%)]"; // Darkest cyan - 1 submission
   if (count >= 2 && count <= 4) return "bg-[hsl(190,90%,55%)]"; // Dark cyan - 2-4
   if (count >= 5 && count <= 8) return "bg-[hsl(190,85%,65%)]"; // Lighter cyan - 5-8
   return "bg-[hsl(190,80%,75%)]"; // Lightest cyan (but still visible) - 9+
 };
 
 export const Heatmap = () => {
   const heatmapData = useMemo(() => generateHeatmapData(), []);
 
   // Group data into weeks (columns)
   const weeks = useMemo(() => {
     const result: { count: number; date: Date }[][] = [];
     for (let i = 0; i < 52; i++) {
       result.push(heatmapData.slice(i * 7, (i + 1) * 7));
     }
     return result;
   }, [heatmapData]);
 
   const totalContributions = heatmapData.reduce((a, b) => a + b.count, 0);
   const currentStreak = 10;
   const longestStreak = 23;
 
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
           className="glass rounded-2xl p-8"
         >
           {/* Stats Row */}
           <div className="grid grid-cols-3 gap-8 mb-8 text-center">
             <div>
               <div className="text-3xl font-bold text-primary">{totalContributions}</div>
               <div className="text-sm text-muted-foreground">Total Submissions</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-success">{currentStreak}</div>
               <div className="text-sm text-muted-foreground">Current Streak</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-warning">{longestStreak}</div>
               <div className="text-sm text-muted-foreground">Longest Streak</div>
             </div>
           </div>
 
           {/* Heatmap Grid */}
           <div className="overflow-x-auto">
             <div className="min-w-[800px]">
               {/* Month Labels */}
               <div className="flex mb-2 pl-10">
                 {months.map((month, i) => (
                   <div
                     key={month + i}
                     className="text-xs text-muted-foreground"
                     style={{ width: `${100 / 12}%` }}
                   >
                     {month}
                   </div>
                 ))}
               </div>
 
               <div className="flex gap-1">
                 {/* Day Labels */}
                 <div className="flex flex-col gap-1 pr-2">
                   {days.map((day, i) => (
                     <div
                       key={i}
                       className="h-3 text-xs text-muted-foreground flex items-center justify-end"
                       style={{ width: "30px" }}
                     >
                       {day}
                     </div>
                   ))}
                 </div>
 
                 {/* Heatmap Cells */}
                 <div className="flex gap-1 flex-1">
                   {weeks.map((week, weekIndex) => (
                     <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                         <motion.div
                           key={`${weekIndex}-${dayIndex}`}
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{
                             duration: 0.1,
                             delay: weekIndex * 0.01 + dayIndex * 0.005,
                           }}
                            whileHover={{ scale: 1.3 }}
                            className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.count)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                            title={`${day.count} submissions on ${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
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
                      className={`w-3 h-3 rounded-sm ${getHeatmapColor(count)}`}
                      title={count === 0 ? "No submissions" : count === 1 ? "1 submission" : count <= 4 ? "2-4 submissions" : count <= 8 ? "5-8 submissions" : "9+ submissions"}
                   />
                 ))}
                 <span className="text-xs text-muted-foreground">More</span>
               </div>
             </div>
           </div>
         </motion.div>
       </div>
     </section>
   );
 };
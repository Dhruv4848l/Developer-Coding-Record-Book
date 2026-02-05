 import { motion } from "framer-motion";
 import { useMemo } from "react";
 
 // Generate random heatmap data for the last 52 weeks
 const generateHeatmapData = () => {
   const data: number[] = [];
   for (let i = 0; i < 52 * 7; i++) {
     // Weight towards lower values with occasional high values
     const rand = Math.random();
     if (rand < 0.3) data.push(0);
     else if (rand < 0.5) data.push(1);
     else if (rand < 0.7) data.push(2);
     else if (rand < 0.9) data.push(3);
     else data.push(4);
   }
   return data;
 };
 
 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const days = ["Mon", "", "Wed", "", "Fri", "", ""];
 
 export const Heatmap = () => {
   const heatmapData = useMemo(() => generateHeatmapData(), []);
 
   const getHeatmapClass = (value: number) => {
     return `heatmap-${value}`;
   };
 
   // Group data into weeks (columns)
   const weeks = useMemo(() => {
     const result: number[][] = [];
     for (let i = 0; i < 52; i++) {
       result.push(heatmapData.slice(i * 7, (i + 1) * 7));
     }
     return result;
   }, [heatmapData]);
 
   const totalContributions = heatmapData.reduce((a, b) => a + b, 0);
   const currentStreak = Math.floor(Math.random() * 30) + 15; // Random streak
   const longestStreak = currentStreak + Math.floor(Math.random() * 20);
 
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
                       {week.map((value, dayIndex) => (
                         <motion.div
                           key={`${weekIndex}-${dayIndex}`}
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{
                             duration: 0.1,
                             delay: weekIndex * 0.01 + dayIndex * 0.005,
                           }}
                           className={`w-3 h-3 rounded-sm ${getHeatmapClass(value)} hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer`}
                           title={`${value} submissions`}
                         />
                       ))}
                     </div>
                   ))}
                 </div>
               </div>
 
               {/* Legend */}
               <div className="flex items-center justify-end gap-2 mt-4">
                 <span className="text-xs text-muted-foreground">Less</span>
                 {[0, 1, 2, 3, 4].map((level) => (
                   <div
                     key={level}
                     className={`w-3 h-3 rounded-sm ${getHeatmapClass(level)}`}
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
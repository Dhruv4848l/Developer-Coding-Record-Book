 import { motion } from "framer-motion";
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
 
 const ratingData = [
   { contest: "Jan W1", leetcode: 1650, codeforces: 1420, codechef: 1580 },
   { contest: "Jan W2", leetcode: 1680, codeforces: 1480, codechef: 1610 },
   { contest: "Jan W3", leetcode: 1720, codeforces: 1520, codechef: 1650 },
   { contest: "Jan W4", leetcode: 1690, codeforces: 1550, codechef: 1680 },
   { contest: "Feb W1", leetcode: 1780, codeforces: 1580, codechef: 1720 },
   { contest: "Feb W2", leetcode: 1820, codeforces: 1620, codechef: 1780 },
   { contest: "Feb W3", leetcode: 1856, codeforces: 1642, codechef: 1823 },
 ];
 
 export const RatingChart = () => {
   return (
     <section className="py-24 relative">
       <div className="container mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Contest <span className="text-gradient">Ratings</span> Over Time
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Monitor your performance and growth in competitive programming
           </p>
         </motion.div>
 
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="glass rounded-2xl p-8"
         >
           {/* Legend */}
           <div className="flex flex-wrap justify-center gap-6 mb-8">
             <div className="flex items-center gap-2">
               <div className="w-4 h-1 rounded-full bg-leetcode" />
               <span className="text-sm">LeetCode</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-4 h-1 rounded-full bg-codeforces" />
               <span className="text-sm">Codeforces</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-4 h-1 rounded-full bg-codechef" />
               <span className="text-sm">CodeChef</span>
             </div>
           </div>
 
           <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={ratingData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                 <XAxis
                   dataKey="contest"
                   stroke="hsl(215 20% 55%)"
                   tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }}
                 />
                 <YAxis
                   stroke="hsl(215 20% 55%)"
                   tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }}
                   domain={[1300, 2000]}
                 />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: "hsl(222 47% 10%)",
                     border: "1px solid hsl(222 30% 20%)",
                     borderRadius: "8px",
                     color: "hsl(210 40% 98%)",
                   }}
                 />
                 <Line
                   type="monotone"
                   dataKey="leetcode"
                   stroke="hsl(33 100% 50%)"
                   strokeWidth={3}
                   dot={{ r: 4, fill: "hsl(33 100% 50%)" }}
                   activeDot={{ r: 6 }}
                 />
                 <Line
                   type="monotone"
                   dataKey="codeforces"
                   stroke="hsl(204 70% 53%)"
                   strokeWidth={3}
                   dot={{ r: 4, fill: "hsl(204 70% 53%)" }}
                   activeDot={{ r: 6 }}
                 />
                 <Line
                   type="monotone"
                   dataKey="codechef"
                   stroke="hsl(25 65% 50%)"
                   strokeWidth={3}
                   dot={{ r: 4, fill: "hsl(25 65% 50%)" }}
                   activeDot={{ r: 6 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </motion.div>
       </div>
     </section>
   );
 };
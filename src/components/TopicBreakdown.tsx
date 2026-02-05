 import { motion } from "framer-motion";
 
 const topics = [
   { name: "Arrays", solved: 156, total: 200, color: "hsl(190 95% 50%)" },
   { name: "Dynamic Programming", solved: 89, total: 150, color: "hsl(260 80% 60%)" },
   { name: "Trees", solved: 78, total: 100, color: "hsl(142 76% 45%)" },
   { name: "Graphs", solved: 65, total: 120, color: "hsl(38 92% 50%)" },
   { name: "Strings", solved: 112, total: 130, color: "hsl(330 80% 55%)" },
   { name: "Binary Search", solved: 45, total: 60, color: "hsl(175 80% 45%)" },
   { name: "Linked Lists", solved: 34, total: 50, color: "hsl(204 70% 53%)" },
   { name: "Backtracking", solved: 28, total: 70, color: "hsl(25 65% 50%)" },
 ];
 
 export const TopicBreakdown = () => {
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
             Topic-wise <span className="text-gradient">Breakdown</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Identify your strengths and areas of improvement
           </p>
         </motion.div>
 
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
           {topics.map((topic, index) => {
             const percentage = Math.round((topic.solved / topic.total) * 100);
             return (
               <motion.div
                 key={topic.name}
                 initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="glass rounded-xl p-6"
               >
                 <div className="flex justify-between items-center mb-3">
                   <span className="font-medium">{topic.name}</span>
                   <span className="text-sm text-muted-foreground">
                     {topic.solved}/{topic.total}
                   </span>
                 </div>
                 <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: `${percentage}%` }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                     className="absolute h-full rounded-full"
                     style={{ background: topic.color }}
                   />
                 </div>
                 <div className="mt-2 text-right">
                   <span className="text-sm font-semibold" style={{ color: topic.color }}>
                     {percentage}%
                   </span>
                 </div>
               </motion.div>
             );
           })}
         </div>
       </div>
     </section>
   );
 };
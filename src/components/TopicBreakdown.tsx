 import { motion } from "framer-motion";
 
 const topics = [
  { name: "Arrays", solved: 56, total: 100, color: "hsl(190 95% 50%)" },
  { name: "Math", solved: 44, total: 80, color: "hsl(260 80% 60%)" },
  { name: "String", solved: 22, total: 50, color: "hsl(142 76% 45%)" },
  { name: "Bit Manipulation", solved: 22, total: 40, color: "hsl(38 92% 50%)" },
  { name: "HashMap and Set", solved: 19, total: 40, color: "hsl(330 80% 55%)" },
  { name: "Two Pointers", solved: 15, total: 30, color: "hsl(175 80% 45%)" },
  { name: "Binary Search", solved: 14, total: 30, color: "hsl(204 70% 53%)" },
  { name: "Dynamic Programming", solved: 12, total: 50, color: "hsl(25 65% 50%)" },
  { name: "Sorting", solved: 12, total: 25, color: "hsl(280 70% 55%)" },
  { name: "Backtracking", solved: 11, total: 30, color: "hsl(350 80% 55%)" },
 ];
 
const difficultyBreakdown = [
  { level: "Easy", count: 60, color: "hsl(142 76% 45%)" },
  { level: "Medium", count: 47, color: "hsl(38 92% 50%)" },
  { level: "Hard", count: 6, color: "hsl(0 84% 60%)" },
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
            DSA Topic <span className="text-gradient">Analysis</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            113 DSA problems solved across various topics
           </p>
         </motion.div>
 
        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 mb-12 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center mb-6">Difficulty Distribution</h3>
          <div className="flex justify-center gap-8">
            {difficultyBreakdown.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-4xl font-bold mb-1" 
                  style={{ color: item.color }}
                >
                  {item.count}
                </div>
                <div className="text-sm text-muted-foreground">{item.level}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
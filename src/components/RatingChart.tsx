 import { motion } from "framer-motion";
import { Award } from "lucide-react";

const awards = [
  { name: "Java", badge: "https://hrcdn.net/fcore/assets/badges/java-9d05b1f559.svg" },
];

const problemCategories = [
  { category: "DSA", count: 113, description: "Data Structures & Algorithms" },
  { category: "Fundamentals", count: 4, description: "Programming Basics" },
  { category: "Competitive Programming", count: 48, description: "Contest Problems" },
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
            Awards & <span className="text-gradient">Achievements</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Certifications and accomplishments across platforms
           </p>
         </motion.div>
 
        {/* Awards Section */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 mb-12 max-w-md mx-auto"
         >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">HackerRank Badges</h3>
           </div>
          <div className="flex justify-center">
            {awards.map((award) => (
              <div key={award.name} className="flex flex-col items-center gap-2">
                <img src={award.badge} alt={award.name} className="w-16 h-16" />
                <span className="text-sm font-medium">{award.name}</span>
              </div>
            ))}
           </div>
         </motion.div>

        {/* Problem Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {problemCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{cat.count}</div>
              <div className="font-semibold mb-1">{cat.category}</div>
              <div className="text-sm text-muted-foreground">{cat.description}</div>
            </motion.div>
          ))}
        </div>
       </div>
     </section>
   );
 };
 import { motion } from "framer-motion";
 import { ExternalLink } from "lucide-react";
 
 const platforms = [
   {
     name: "LeetCode",
     username: "@dhruv_coder",
     solved: 487,
     rating: 1856,
     colorClass: "text-leetcode",
     bgClass: "bg-leetcode/10",
     borderClass: "border-leetcode/30",
   },
   {
     name: "GeeksforGeeks",
     username: "@dhruv_gfg",
     solved: 312,
     score: 2400,
     colorClass: "text-gfg",
     bgClass: "bg-gfg/10",
     borderClass: "border-gfg/30",
   },
   {
     name: "Codeforces",
     username: "@dhruv_cf",
     solved: 198,
     rating: 1642,
     rank: "Expert",
     colorClass: "text-codeforces",
     bgClass: "bg-codeforces/10",
     borderClass: "border-codeforces/30",
   },
   {
     name: "CodeChef",
     username: "@dhruv_cc",
     solved: 145,
     rating: 1823,
     stars: 4,
     colorClass: "text-codechef",
     bgClass: "bg-codechef/10",
     borderClass: "border-codechef/30",
   },
 ];
 
 export const PlatformStats = () => {
   return (
     <section id="stats" className="py-24 relative">
       <div className="container mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Your Favourite <span className="text-gradient">Coding Platforms</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             All your progress streamlined in one place to simplify your coding journey
           </p>
         </motion.div>
 
         {/* Total Stats */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="glass rounded-2xl p-8 mb-12 text-center"
         >
           <div className="text-6xl md:text-8xl font-bold text-gradient mb-2">
             1,142
           </div>
           <p className="text-muted-foreground text-lg">
             Total Problems Solved Across All Platforms
           </p>
         </motion.div>
 
         {/* Platform Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {platforms.map((platform, index) => (
             <motion.div
               key={platform.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               whileHover={{ y: -5, scale: 1.02 }}
               className={`rounded-2xl p-6 border bg-gradient-card ${platform.borderClass} hover:shadow-lg transition-all duration-300`}
             >
               <div className="flex items-center justify-between mb-6">
                 <div className={`px-3 py-1 rounded-full text-sm font-medium ${platform.bgClass} ${platform.colorClass}`}>
                   {platform.name}
                 </div>
                 <ExternalLink className="w-4 h-4 text-muted-foreground" />
               </div>
 
               <div className="space-y-4">
                 <div>
                   <div className="text-sm text-muted-foreground mb-1">Problems Solved</div>
                   <div className={`text-3xl font-bold ${platform.colorClass}`}>
                     {platform.solved}
                   </div>
                 </div>
 
                 <div className="pt-4 border-t border-border">
                   <div className="flex justify-between items-center">
                     <span className="text-sm text-muted-foreground">
                       {platform.rating ? "Rating" : "Score"}
                     </span>
                     <span className="font-semibold">
                       {platform.rating || platform.score}
                       {platform.stars && " ⭐".repeat(platform.stars)}
                     </span>
                   </div>
                   {platform.rank && (
                     <div className="flex justify-between items-center mt-2">
                       <span className="text-sm text-muted-foreground">Rank</span>
                       <span className={`font-semibold ${platform.colorClass}`}>
                         {platform.rank}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
 
               <div className="mt-4 text-xs text-muted-foreground">
                 {platform.username}
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
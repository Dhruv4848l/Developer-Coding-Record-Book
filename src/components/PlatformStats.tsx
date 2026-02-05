 import { motion } from "framer-motion";
 import { ExternalLink, ChevronRight } from "lucide-react";
 import { Link } from "react-router-dom";
 
 const platforms = [
   {
     name: "LeetCode",
    username: "@Ydp5K7DIfv",
    solved: 113,
    profileUrl: "https://leetcode.com/u/Ydp5K7DIfv",
    route: "/platform/leetcode",
     colorClass: "text-leetcode",
     bgClass: "bg-leetcode/10",
     borderClass: "border-leetcode/30",
   },
   {
     name: "GeeksforGeeks",
    username: "@dhruvmaji8b4b",
    solved: 0,
    profileUrl: "https://www.geeksforgeeks.org/user/dhruvmaji8b4b",
    route: "/platform/gfg",
     colorClass: "text-gfg",
     bgClass: "bg-gfg/10",
     borderClass: "border-gfg/30",
   },
   {
    name: "CodeChef",
    username: "@cooking_coder",
    solved: 48,
    profileUrl: "https://www.codechef.com/users/cooking_coder",
    route: "/platform/codechef",
    colorClass: "text-codechef",
    bgClass: "bg-codechef/10",
    borderClass: "border-codechef/30",
   },
   {
    name: "HackerRank",
    username: "@dhruvmajiever191",
    solved: 4,
    profileUrl: "https://www.hackerrank.com/profile/dhruvmajiever191",
    route: "/platform/hackerrank",
    colorClass: "text-hackerrank",
    bgClass: "bg-hackerrank/10",
    borderClass: "border-hackerrank/30",
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
            Dhruv's <span className="text-gradient">Coding Platforms</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Verified profiles across multiple competitive programming platforms
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
            165
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
                <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </a>
               </div>
 
               <div className="space-y-4">
                 <div>
                   <div className="text-sm text-muted-foreground mb-1">Problems Solved</div>
                   <div className={`text-3xl font-bold ${platform.colorClass}`}>
                     {platform.solved}
                   </div>
                 </div>
 
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Verified</span>
                 </div>
               </div>
 
               <div className="mt-4 text-xs text-muted-foreground">
                 {platform.username}
               </div>

                <Link to={platform.route} className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors group">
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
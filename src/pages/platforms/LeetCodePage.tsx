 import { motion } from "framer-motion";
 import { ArrowLeft, ExternalLink, Code2, Trophy, Zap, Target } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 
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
 
   const recentProblems = [
    { name: "Merge Intervals", difficulty: "Medium", date: "2026-02-05" },
    { name: "Binary Tree Level Order Traversal", difficulty: "Medium", date: "2026-02-04" },
    { name: "Climbing Stairs", difficulty: "Easy", date: "2026-02-03" },
    { name: "Trapping Rain Water", difficulty: "Hard", date: "2026-02-02" },
    { name: "Best Time to Buy and Sell Stock", difficulty: "Easy", date: "2026-02-01" },
    { name: "Longest Palindromic Substring", difficulty: "Medium", date: "2026-01-31" },
    { name: "Container With Most Water", difficulty: "Medium", date: "2026-01-30" },
    { name: "3Sum", difficulty: "Medium", date: "2026-01-29" },
   ];
 
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
 
         {/* Recent Problems */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass rounded-2xl p-8"
         >
           <h2 className="text-2xl font-bold mb-6">Recent Submissions</h2>
           <div className="space-y-4">
             {recentProblems.map((problem, index) => (
               <div
                 key={index}
                 className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
               >
                 <div className="flex items-center gap-4">
                   <Code2 className="w-5 h-5 text-leetcode" />
                   <span className="font-medium">{problem.name}</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <span
                     className={`px-3 py-1 rounded-full text-xs font-medium ${
                       problem.difficulty === "Easy"
                         ? "bg-success/20 text-success"
                         : problem.difficulty === "Medium"
                         ? "bg-warning/20 text-warning"
                         : "bg-destructive/20 text-destructive"
                     }`}
                   >
                     {problem.difficulty}
                   </span>
                   <span className="text-sm text-muted-foreground">{problem.date}</span>
                 </div>
               </div>
             ))}
           </div>
         </motion.div>
       </div>
     </div>
   );
 };
 
 export default LeetCodePage;
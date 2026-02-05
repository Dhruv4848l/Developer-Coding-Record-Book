 import { motion } from "framer-motion";
 import { ArrowLeft, ExternalLink, Code2, Trophy, BookOpen, Flame } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 
 const GFGPage = () => {
   const stats = {
     username: "@dhruvmaji8b4b",
     solved: 0,
     score: 0,
     streak: 0,
     instituteRank: "N/A",
     profileUrl: "https://www.geeksforgeeks.org/user/dhruvmaji8b4b",
   };
 
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
               <Button variant="outline" className="gap-2 border-gfg/30 text-gfg hover:bg-gfg/10">
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
           <h1 className="text-4xl md:text-5xl font-bold mb-4">
             Dhruv's <span className="text-gfg">GeeksforGeeks</span> Profile
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
             <Trophy className="w-8 h-8 text-gfg mx-auto mb-3" />
             <div className="text-3xl font-bold text-gfg">{stats.solved}</div>
             <div className="text-sm text-muted-foreground">Problems Solved</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
             <div className="text-3xl font-bold">{stats.score}</div>
             <div className="text-sm text-muted-foreground">Coding Score</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Flame className="w-8 h-8 text-warning mx-auto mb-3" />
             <div className="text-3xl font-bold text-warning">{stats.streak}</div>
             <div className="text-sm text-muted-foreground">Current Streak</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Trophy className="w-8 h-8 text-accent mx-auto mb-3" />
             <div className="text-3xl font-bold text-accent">{stats.instituteRank}</div>
             <div className="text-sm text-muted-foreground">Institute Rank</div>
           </div>
         </motion.div>
 
         {/* Coming Soon */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass rounded-2xl p-12 text-center"
         >
           <h2 className="text-2xl font-bold mb-4">Profile Not Yet Active</h2>
           <p className="text-muted-foreground max-w-md mx-auto">
             Start solving problems on GeeksforGeeks to see your progress here!
           </p>
         </motion.div>
       </div>
     </div>
   );
 };
 
 export default GFGPage;
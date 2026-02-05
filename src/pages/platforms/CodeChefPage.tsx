 import { motion } from "framer-motion";
 import { ArrowLeft, ExternalLink, Code2, Trophy, Star, Award } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 
 const CodeChefPage = () => {
   const stats = {
     username: "@cooking_coder",
     solved: 48,
     rating: 1200,
     stars: 1,
     contests: 5,
     globalRank: "#150,000",
     countryRank: "#25,000",
     profileUrl: "https://www.codechef.com/users/cooking_coder",
   };
 
   const recentContests = [
     { name: "Starters 115", rank: 2500, rating: "+15", date: "2024-01-10" },
     { name: "Starters 114", rank: 3200, rating: "+8", date: "2024-01-03" },
     { name: "Starters 113", rank: 2800, rating: "+12", date: "2023-12-27" },
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
               <Button variant="outline" className="gap-2 border-codechef/30 text-codechef hover:bg-codechef/10">
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
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-codechef/10 border border-codechef/30 mb-6">
             <Code2 className="w-5 h-5 text-codechef" />
             <span className="text-codechef font-medium">CodeChef</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold mb-4">
             Dhruv's <span className="text-codechef">CodeChef</span> Profile
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
             <Trophy className="w-8 h-8 text-codechef mx-auto mb-3" />
             <div className="text-3xl font-bold text-codechef">{stats.solved}</div>
             <div className="text-sm text-muted-foreground">Problems Solved</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Star className="w-8 h-8 text-warning mx-auto mb-3" />
             <div className="text-3xl font-bold text-warning">{stats.stars}★</div>
             <div className="text-sm text-muted-foreground">Star Rating</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Award className="w-8 h-8 text-primary mx-auto mb-3" />
             <div className="text-3xl font-bold">{stats.rating}</div>
             <div className="text-sm text-muted-foreground">Current Rating</div>
           </div>
           <div className="glass rounded-xl p-6 text-center">
             <Trophy className="w-8 h-8 text-success mx-auto mb-3" />
             <div className="text-3xl font-bold text-success">{stats.contests}</div>
             <div className="text-sm text-muted-foreground">Contests</div>
           </div>
         </motion.div>
 
         {/* Rankings */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="grid grid-cols-2 gap-6 mb-12"
         >
           <div className="glass rounded-2xl p-8 text-center">
             <h3 className="text-lg text-muted-foreground mb-2">Global Rank</h3>
             <div className="text-4xl font-bold text-codechef">{stats.globalRank}</div>
           </div>
           <div className="glass rounded-2xl p-8 text-center">
             <h3 className="text-lg text-muted-foreground mb-2">Country Rank</h3>
             <div className="text-4xl font-bold text-primary">{stats.countryRank}</div>
           </div>
         </motion.div>
 
         {/* Recent Contests */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass rounded-2xl p-8"
         >
           <h2 className="text-2xl font-bold mb-6">Recent Contests</h2>
           <div className="space-y-4">
             {recentContests.map((contest, index) => (
               <div
                 key={index}
                 className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
               >
                 <div className="flex items-center gap-4">
                   <Award className="w-5 h-5 text-codechef" />
                   <span className="font-medium">{contest.name}</span>
                 </div>
                 <div className="flex items-center gap-6">
                   <span className="text-muted-foreground">Rank: {contest.rank}</span>
                   <span className="text-success font-medium">{contest.rating}</span>
                   <span className="text-sm text-muted-foreground">{contest.date}</span>
                 </div>
               </div>
             ))}
           </div>
         </motion.div>
       </div>
     </div>
   );
 };
 
 export default CodeChefPage;
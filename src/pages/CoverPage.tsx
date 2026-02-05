 import { motion } from "framer-motion";
 import { useNavigate } from "react-router-dom";
 import { Code2, ChevronRight, Trophy, Zap, MapPin, GraduationCap, Github, Mail } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { useCodolioStats } from "@/hooks/useCodolioStats";
 
 const CoverPage = () => {
   const navigate = useNavigate();
   const { data: codolioStats } = useCodolioStats();
   
   const profile = codolioStats?.profile ?? {
     globalRank: 22122,
     problemsSolved: 165,
     totalSubmissions: 211,
     longestStreak: 23,
   };
 
   return (
     <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-glow opacity-50" />
       <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
 
       <div className="container mx-auto px-6 relative z-10">
         <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
           {/* Logo/Brand */}
           {/* Profile Avatar */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="mb-8"
           >
             <Avatar className="w-40 h-40 border-4 border-primary/30 shadow-glow">
               <AvatarImage src="https://codolio.com/user-1.png" alt="Dhruv Maji" />
               <AvatarFallback className="text-4xl bg-primary/20">DM</AvatarFallback>
             </Avatar>
           </motion.div>
 
           {/* Name and Title */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
           >
             Dhruv Maji
           </motion.h1>
 
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="mb-6"
           >
             <span className="text-gradient text-2xl md:text-3xl lg:text-4xl font-semibold">
               @KingKong_Coder
             </span>
           </motion.div>
 
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
             className="text-muted-foreground text-xl md:text-2xl max-w-2xl mb-8"
           >
             Competitive Programmer & Problem Solver passionate about Data Structures, Algorithms, and Building Scalable Solutions
           </motion.p>
 
           {/* Info Tags */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.55 }}
             className="flex flex-wrap justify-center gap-3 mb-10"
           >
             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm">
               <MapPin className="w-4 h-4 text-primary" />
               <span className="text-foreground">India</span>
             </div>
             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm">
               <GraduationCap className="w-4 h-4 text-primary" />
               <span className="text-foreground">Parul Institute of Engineering and Technology</span>
             </div>
           </motion.div>
 
           {/* Quick Stats Preview */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-2xl"
           >
             <div className="glass rounded-xl p-4 text-center">
               <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
               <div className="text-2xl font-bold">#{profile.globalRank.toLocaleString()}</div>
               <div className="text-xs text-muted-foreground">Global Rank</div>
             </div>
             <div className="glass rounded-xl p-4 text-center">
               <Code2 className="w-6 h-6 text-leetcode mx-auto mb-2" />
               <div className="text-2xl font-bold">{profile.problemsSolved}</div>
               <div className="text-xs text-muted-foreground">Problems Solved</div>
             </div>
             <div className="glass rounded-xl p-4 text-center">
               <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
               <div className="text-2xl font-bold">{profile.totalSubmissions}</div>
               <div className="text-xs text-muted-foreground">Submissions</div>
             </div>
             <div className="glass rounded-xl p-4 text-center">
               <Trophy className="w-6 h-6 text-gfg mx-auto mb-2" />
               <div className="text-2xl font-bold">{profile.longestStreak}</div>
               <div className="text-xs text-muted-foreground">Max Streak</div>
             </div>
           </motion.div>
 
           {/* Social Links */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.65 }}
             className="flex gap-4 mb-12"
           >
             <a
               href="mailto:dhruvmajiever1920@gmail.com"
               className="p-4 rounded-full glass hover:bg-primary/20 hover:border-primary/30 transition-all"
             >
               <Mail className="w-6 h-6 text-muted-foreground hover:text-primary" />
             </a>
             <a
               href="https://github.com/Dhruv4848l"
               target="_blank"
               rel="noopener noreferrer"
               className="p-4 rounded-full glass hover:bg-primary/20 hover:border-primary/30 transition-all"
             >
               <Github className="w-6 h-6 text-muted-foreground hover:text-primary" />
             </a>
             <a
               href="https://codolio.com/profile/KingKong_Coder"
               target="_blank"
               rel="noopener noreferrer"
               className="p-4 rounded-full glass hover:bg-primary/20 hover:border-primary/30 transition-all"
             >
               <Code2 className="w-6 h-6 text-muted-foreground hover:text-primary" />
             </a>
           </motion.div>
 
           {/* CTA Button */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.7 }}
           >
             <Button
               onClick={() => navigate("/dashboard")}
               size="lg"
               className="bg-gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-glow hover:shadow-lg hover:scale-105 transition-all duration-300 group"
             >
               More Details
               <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </motion.div>
 
           {/* Scroll indicator */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 1 }}
             className="absolute bottom-8 left-1/2 -translate-x-1/2"
           >
             <div className="text-muted-foreground text-sm">Click to explore my coding journey</div>
           </motion.div>
         </div>
       </div>
     </div>
   );
 };
 
 export default CoverPage;
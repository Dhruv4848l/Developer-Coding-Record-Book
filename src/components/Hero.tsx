 import { motion } from "framer-motion";
import { Code2, Zap, Trophy, MapPin, GraduationCap, Mail, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
 export const Hero = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-glow opacity-50" />
       <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
 
       <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Profile Avatar */}
           <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
            className="mb-8"
           >
            <Avatar className="w-32 h-32 border-4 border-primary/30">
              <AvatarImage src="https://codolio.com/user-1.png" alt="Dhruv Maji" />
              <AvatarFallback className="text-3xl bg-primary/20">DM</AvatarFallback>
            </Avatar>
           </motion.div>
          
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
           >
            Dhruv Maji
            <span className="block text-gradient text-3xl md:text-4xl lg:text-5xl mt-2">@KingKong_Coder</span>
           </motion.h1>
          
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-6"
           >
            Competitive Programmer & Problem Solver
           </motion.p>
          
          {/* Info Tags */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
           >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">India</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Parul Institute of Engineering and Technology</span>
            </div>
           </motion.div>
 
          {/* Quick Links */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex gap-4 mb-10"
          >
            <a 
              href="mailto:dhruvmajiever1920@gmail.com" 
              className="p-3 rounded-full bg-secondary/50 border border-border hover:bg-primary/20 hover:border-primary/30 transition-all"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
            </a>
            <a 
              href="https://github.com/Dhruv4848l" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 border border-border hover:bg-primary/20 hover:border-primary/30 transition-all"
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </a>
          </motion.div>

          {/* Global Rank & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
           >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold">#22,122</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Code2 className="w-6 h-6 text-leetcode" />
              </div>
              <div className="text-2xl md:text-3xl font-bold">165</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold">211</div>
              <div className="text-sm text-muted-foreground">Submissions</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-gfg" />
              </div>
              <div className="text-2xl md:text-3xl font-bold">23</div>
              <div className="text-sm text-muted-foreground">Max Streak</div>
            </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code2, ChevronRight, Trophy, Zap, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { useGFGStats } from "@/hooks/useGFGStats";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import { useCodolioStats } from "@/hooks/useCodolioStats";
import { useAtCoderStats } from "@/hooks/useAtCoderStats";
import { ContactBalloons } from "@/components/ContactBalloons";

const CoverPage = () => {
  const navigate = useNavigate();
  
  // Fetch all platform stats for accurate total
  const { data: leetcodeStats } = useLeetCodeStats("Ydp5K7DIfv");
  const { data: codeforcesStats } = useCodeforcesStats("dhruvmaji");
  const { data: gfgStats } = useGFGStats("dhruvmaji8b4b");
  const { data: codechefStats } = useCodeChefStats("cooking_coder");
  const { data: hackerrankStats } = useCodolioStats("dhruvmajiever191");
  const { data: atcoderStats } = useAtCoderStats("MrCoder420");

  // Calculate totals from actual API data
  const totalProblemsSolved = 
    (leetcodeStats?.profile?.totalSolved || 0) +
    (codeforcesStats?.profile?.problemsSolved || 0) +
    (gfgStats?.problemsSolved || 0) +
    (codechefStats?.profile?.problemsSolved || 0) +
    (hackerrankStats?.profile?.problemsSolved || 0) +
    (atcoderStats?.profile?.problemsSolved || 0);

  const totalSubmissions = 
    (leetcodeStats?.profile?.totalSubmissions || 0) +
    (codeforcesStats?.profile?.totalSubmissions || 0) +
    (atcoderStats?.profile?.acceptedSubmissions || 0);

  const maxStreak = Math.max(
    leetcodeStats?.profile?.longestStreak || 0,
    codeforcesStats?.profile?.longestStreak || 0,
    hackerrankStats?.profile?.longestStreak || 0
  );

  // Use codolio for global rank
  const globalRank = hackerrankStats?.profile?.globalRank || 22122;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-glow opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
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
              <div className="text-2xl font-bold">#{globalRank.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Global Rank</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Code2 className="w-6 h-6 text-leetcode mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalProblemsSolved}</div>
              <div className="text-xs text-muted-foreground">Problems Solved</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalSubmissions}</div>
              <div className="text-xs text-muted-foreground">Submissions</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 text-gfg mx-auto mb-2" />
              <div className="text-2xl font-bold">{maxStreak}</div>
              <div className="text-xs text-muted-foreground">Max Streak</div>
            </div>
          </motion.div>

          {/* Contact Balloons Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mb-12 relative z-20"
          >
            <ContactBalloons />
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
        </div>
      </div>
    </div>
  );
};

export default CoverPage;

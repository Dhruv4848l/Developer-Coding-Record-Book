import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Award, Star, Loader2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useCodolioStats } from "@/hooks/useCodolioStats";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
};

const headerStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
};

const HackerRankPage = () => {
  const { data: stats, isLoading, error } = useCodolioStats("dhruvmajiever191");
  const profileUrl = "https://www.hackerrank.com/profile/dhruvmajiever191";

  const badges = [{ name: "Java", level: "3 Star", category: "Language Proficiency" }];
  const certificates = [{ name: "Problem Solving (Basic)", date: "2024" }];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(152, 69%, 31%) 0%, transparent 70%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190, 95%, 50%) 0%, transparent 70%)" }} />
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="sticky top-0 z-50" style={headerStyle}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/"><Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"><User className="w-4 h-4" /></Button></Link>
              <Link to="/dashboard"><Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/10"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Button></Link>
            </div>
            <div className="flex items-center gap-2">
              
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-hackerrank/30 text-hackerrank hover:bg-hackerrank/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-hackerrank">HackerRank</span> Profile</h1>
          <p className="text-white/50 text-lg">@dhruvmajiever191</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {isLoading ? <>{[1,2,3].map(i => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-6 text-center" style={glassStyle}><Trophy className="w-8 h-8 text-hackerrank mx-auto mb-3" /><div className="text-3xl font-bold text-hackerrank">{stats?.profile?.problemsSolved ?? 4}</div><div className="text-sm text-white/40">Problems Solved</div></div>
              <div className="rounded-xl p-6 text-center" style={glassStyle}><Award className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(38,92%,50%)" }} /><div className="text-3xl font-bold" style={{ color: "hsl(38,92%,50%)" }}>1</div><div className="text-sm text-white/40">Badges Earned</div></div>
              <div className="rounded-xl p-6 text-center" style={glassStyle}><Star className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-3xl font-bold text-white">1</div><div className="text-sm text-white/40">Certificates</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-8 mb-12" style={glassStyle}>
          <h2 className="text-2xl font-bold mb-6 text-white">Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(30, 130, 76, 0.2)" }}><Star className="w-6 h-6 text-hackerrank" /></div>
                <div><div className="font-medium text-white/80">{badge.name}</div><div className="text-sm text-white/40">{badge.level} • {badge.category}</div></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-8" style={glassStyle}>
          <h2 className="text-2xl font-bold mb-6 text-white">Certificates</h2>
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-4"><Award className="w-6 h-6 text-hackerrank" /><span className="font-medium text-white/80">{cert.name}</span></div>
                <span className="text-sm text-white/40">{cert.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HackerRankPage;

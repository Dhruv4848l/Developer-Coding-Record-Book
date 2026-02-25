import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, BookOpen, Flame, Award, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useCallback } from "react";
import { useGFGStats } from "@/hooks/useGFGStats";
import PlatformLoader from "@/components/PlatformLoader";
import { GFG160Tracker } from "@/components/GFG160Tracker";

const GFG_USERNAME = "dhruvmaji8b4b";

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

const GFGPage = () => {
  const { data: stats, isLoading, error } = useGFGStats(GFG_USERNAME);
  const profileUrl = stats?.profileUrl || `https://www.geeksforgeeks.org/user/${GFG_USERNAME}`;

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
    {loading && <PlatformLoader onFinish={handleFinish} text="Loading" />}
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(120, 61%, 34%) 0%, transparent 70%)" }} />
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
                <Button variant="outline" className="gap-2 border-gfg/30 text-gfg hover:bg-gfg/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-gfg">GeeksforGeeks</span> Profile</h1>
          <p className="text-white/50 text-lg">@{stats?.username || GFG_USERNAME}</p>
          {stats?.instituteName && stats.instituteName !== 'N/A' && <p className="text-sm text-white/40 mt-2">{stats.instituteName}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2,3,4].map(i => <Skeleton key={i} className="h-24 sm:h-28 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gfg mx-auto mb-2 sm:mb-3" /><div className="text-2xl sm:text-3xl font-bold text-gfg">{stats?.problemsSolved ?? 0}</div><div className="text-sm text-white/40">Problems Solved</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-2xl sm:text-3xl font-bold text-white">{stats?.codingScore ?? 0}</div><div className="text-sm text-white/40">Coding Score</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Flame className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(38,92%,50%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(38,92%,50%)" }}>{stats?.currentStreak ?? 0}</div><div className="text-sm text-white/40">Current Streak</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(142,76%,45%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(142,76%,45%)" }}>{stats?.instituteRank ?? 'N/A'}</div><div className="text-sm text-white/40">Institute Rank</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-2xl sm:text-3xl font-bold text-white">{stats?.monthlyCodingScore ?? 0}</div><div className="text-sm text-white/40">Monthly Coding Score</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Flame className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(0,84%,60%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(0,84%,60%)" }}>{stats?.maxStreak ?? 0}</div><div className="text-sm text-white/40">Max Streak</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 sm:p-8 mb-12" style={glassStyle}>
          <GFG160Tracker />
        </motion.div>

        {stats?.languages && stats.languages.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-8" style={glassStyle}>
            <h2 className="text-2xl font-bold mb-6 text-white">Languages Used</h2>
            <div className="flex flex-wrap gap-3">
              {stats.languages.map((lang, index) => (
                <span key={index} className="px-4 py-2 rounded-full text-gfg text-sm font-medium" style={{ background: "rgba(45, 133, 50, 0.15)", border: "1px solid rgba(45, 133, 50, 0.3)" }}>{lang}</span>
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-12 text-center" style={glassStyle}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(0,84%,60%)" }}>Error Loading Profile</h2>
            <p className="text-white/50 max-w-md mx-auto">Unable to fetch data from GeeksforGeeks. Please try again later or check if the username is correct.</p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default GFGPage;

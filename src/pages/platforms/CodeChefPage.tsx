import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Star, Award, Globe, MapPin, Loader2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import PlatformLoader from "@/components/PlatformLoader";

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

const CodeChefPage = () => {
  const { data: stats, isLoading, error } = useCodeChefStats();
  const profileUrl = `https://www.codechef.com/users/cooking_coder`;
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-codechef animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading CodeChef stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
        <div className="text-center">
          <p className="mb-4" style={{ color: "hsl(0,84%,60%)" }}>Failed to load CodeChef stats</p>
          <Link to="/dashboard"><Button variant="outline" className="text-white/70 border-white/20">Back to Dashboard</Button></Link>
        </div>
      </div>
    );
  }

  const profile = stats?.profile;

  return (
    <>
    {loading && <PlatformLoader onFinish={handleFinish} text="Loading" />}
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(25, 65%, 40%) 0%, transparent 70%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(38, 92%, 50%) 0%, transparent 70%)" }} />
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
                <Button variant="outline" className="gap-2 border-codechef/30 text-codechef hover:bg-codechef/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-codechef">CodeChef</span> Profile</h1>
          <p className="text-white/50 text-lg">@{profile?.username || 'cooking_coder'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-xl p-6 text-center" style={glassStyle}><Trophy className="w-8 h-8 text-codechef mx-auto mb-3" /><div className="text-3xl font-bold text-codechef">{profile?.problemsSolved || 0}</div><div className="text-sm text-white/40">Problems Solved</div></div>
          <div className="rounded-xl p-6 text-center" style={glassStyle}><Star className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(38,92%,50%)" }} /><div className="text-3xl font-bold" style={{ color: "hsl(38,92%,50%)" }}>{profile?.stars ? `${profile.stars}★` : 'Unrated'}</div><div className="text-sm text-white/40">Star Rating</div></div>
          <div className="rounded-xl p-6 text-center" style={glassStyle}><Award className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-3xl font-bold text-white">{profile?.rating || 'N/A'}</div><div className="text-sm text-white/40">Current Rating</div></div>
          <div className="rounded-xl p-6 text-center" style={glassStyle}><Code2 className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(142,76%,45%)" }} /><div className="text-3xl font-bold" style={{ color: "hsl(142,76%,45%)" }}>{profile?.highestRating || 'N/A'}</div><div className="text-sm text-white/40">Highest Rating</div></div>
        </motion.div>

        {(profile?.globalRank > 0 || profile?.countryRank > 0) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl p-8 text-center" style={glassStyle}><Globe className="w-8 h-8 text-codechef mx-auto mb-3" /><h3 className="text-lg text-white/40 mb-2">Global Rank</h3><div className="text-4xl font-bold text-codechef">#{profile?.globalRank?.toLocaleString() || 'N/A'}</div></div>
            <div className="rounded-2xl p-8 text-center" style={glassStyle}><MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(190,95%,60%)" }} /><h3 className="text-lg text-white/40 mb-2">Country Rank</h3><div className="text-4xl font-bold" style={{ color: "hsl(190,95%,60%)" }}>#{profile?.countryRank?.toLocaleString() || 'N/A'}</div></div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-8 text-center" style={glassStyle}>
          <h2 className="text-2xl font-bold mb-4 text-white">Division</h2>
          <div className="flex items-center justify-center gap-4">
            <Code2 className="w-10 h-10 text-codechef" />
            <div><div className="text-3xl font-bold text-codechef">{profile?.division || 'Unrated'}</div><div className="text-white/40">{profile?.country || 'India'}</div></div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default CodeChefPage;

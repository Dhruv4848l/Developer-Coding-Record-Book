import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, TrendingUp, Target, Users, Award, Zap, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import PlatformLoader from "@/components/PlatformLoader";

const CODEFORCES_HANDLE = "Ordinary_Coder_420";

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

const CodeforcesPage = () => {
  const { data: stats, isLoading, error } = useCodeforcesStats(CODEFORCES_HANDLE);
  const profile = stats?.profile;
  const profileUrl = `https://codeforces.com/profile/${CODEFORCES_HANDLE}`;

  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
    {loading && <PlatformLoader onFinish={handleFinish} text="Loading" />}
    <div className="min-h-screen relative bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(204, 70%, 53%) 0%, transparent 70%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(260, 80%, 55%) 0%, transparent 70%)" }} />
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
                <Button variant="outline" className="gap-2 border-codeforces/30 text-codeforces hover:bg-codeforces/10"><ExternalLink className="w-4 h-4" />View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dhruv's <span className="text-codeforces">Codeforces</span> Profile</h1>
          <p className="text-white/50 text-lg">@{profile?.handle || CODEFORCES_HANDLE}</p>
          {profile?.rank && <p className="text-lg font-semibold mt-2 capitalize" style={{ color: profile.rankColor }}>{profile.rank}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2,3,4].map(i => <Skeleton key={i} className="h-24 sm:h-28 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-codeforces mx-auto mb-2 sm:mb-3" /><div className="text-2xl sm:text-3xl font-bold text-codeforces">{profile?.problemsSolved ?? 0}</div><div className="text-sm text-white/40">Problems Solved</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.rankColor }}>{profile?.rating ?? 0}</div><div className="text-sm text-white/40">Current Rating</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(142,76%,45%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.maxRankColor }}>{profile?.maxRating ?? 0}</div><div className="text-sm text-white/40">Max Rating</div></div>
              <div className="rounded-xl p-4 sm:p-6 text-center" style={glassStyle}><Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: "hsl(38,92%,50%)" }} /><div className="text-2xl sm:text-3xl font-bold" style={{ color: "hsl(38,92%,50%)" }}>{profile?.contestsParticipated ?? 0}</div><div className="text-sm text-white/40">Contests</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {isLoading ? <>{[1,2,3,4].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</> : (
            <>
              <div className="rounded-xl p-4 text-center" style={glassStyle}><Zap className="w-5 h-5 mx-auto mb-2" style={{ color: "hsl(190,95%,60%)" }} /><div className="text-xl font-bold text-white">{profile?.totalSubmissions ?? 0}</div><div className="text-xs text-white/40">Submissions</div></div>
              <div className="rounded-xl p-4 text-center" style={glassStyle}><Users className="w-5 h-5 text-codeforces mx-auto mb-2" /><div className="text-xl font-bold text-white">{profile?.friendOfCount ?? 0}</div><div className="text-xs text-white/40">Friends</div></div>
              <div className="rounded-xl p-4 text-center" style={glassStyle}><TrendingUp className="w-5 h-5 mx-auto mb-2" style={{ color: "hsl(142,76%,45%)" }} /><div className="text-xl font-bold" style={{ color: "hsl(142,76%,45%)" }}>+{profile?.contribution ?? 0}</div><div className="text-xs text-white/40">Contribution</div></div>
              <div className="rounded-xl p-4 text-center capitalize" style={glassStyle}><Award className="w-5 h-5 mx-auto mb-2" style={{ color: profile?.maxRankColor }} /><div className="text-lg font-bold" style={{ color: profile?.maxRankColor }}>{profile?.maxRank ?? 'N/A'}</div><div className="text-xs text-white/40">Max Rank</div></div>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-8" style={glassStyle}>
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Contests</h2>
          {isLoading ? (
            <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}</div>
          ) : stats?.recentContests && stats.recentContests.length > 0 ? (
            <div className="space-y-4">
              {stats.recentContests.slice(0, 10).map((contest, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg transition-colors gap-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-4"><Award className="w-5 h-5 text-codeforces hidden sm:block" /><span className="font-medium text-sm sm:text-base line-clamp-1 text-white/80">{contest.name}</span></div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <span className="text-white/40">Rank: <span className="text-white font-medium">{contest.rank}</span></span>
                    <span className={contest.ratingChange >= 0 ? "font-medium" : "font-medium"} style={{ color: contest.ratingChange >= 0 ? "hsl(142,76%,45%)" : "hsl(0,84%,60%)" }}>{contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}</span>
                    <span className="text-white/40">{contest.newRating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-white/40 text-center py-8">No contest history available</p>}
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default CodeforcesPage;

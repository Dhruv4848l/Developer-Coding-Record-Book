import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Target, ChevronDown, ChevronUp, Award } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContestHistoryItem } from "@/hooks/useLeetCodeStats";

interface ContestSectionProps {
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: string;
  attendedContestsCount: number;
  contestHistory: ContestHistoryItem[];
}

const formatTime = (seconds: number): string => {
  if (!seconds) return "N/A";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
};

const formatDate = (timestamp: number): string => {
  if (!timestamp) return "Unknown";
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getContestType = (name: string): "weekly" | "biweekly" => {
  return name.toLowerCase().includes("biweekly") ? "biweekly" : "weekly";
};

interface ContestCardProps {
  contest: ContestHistoryItem;
  index: number;
}

const ContestCard = ({ contest, index }: ContestCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const contestType = getContestType(contest.contestName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              contestType === "biweekly"
                ? "bg-primary/20 text-primary"
                : "bg-leetcode/20 text-leetcode"
            }`}
          >
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base">{contest.contestName}</h4>
            <p className="text-xs text-muted-foreground">{formatDate(contest.startTime)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap justify-end w-full sm:w-auto">
          <div className="flex flex-col items-end justify-center mr-0 sm:mr-2">
            <div className="text-[10px] sm:text-xs font-bold text-green-400 mb-1 tracking-wider whitespace-nowrap">
              {contest.problemsSolved}/{contest.totalProblems || 4} SOLVED
            </div>
            <div className="flex gap-1">
              {[...Array(Math.max(4, contest.totalProblems || 4))].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 sm:w-4 h-1.5 rounded-sm transition-all ${
                    i < contest.problemsSolved 
                      ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' 
                      : 'bg-white/10'
                  }`} 
                />
              ))}
            </div>
          </div>
          
          <div className="text-right hidden sm:block w-16">
            <div className="font-bold text-leetcode">{contest.rating}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{fontSize: '9px'}}>Rating</div>
          </div>
          <div className="text-right hidden sm:block w-16">
            <div className="font-bold">#{contest.ranking.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{fontSize: '9px'}}>Rank</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border/50 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Target className="w-4 h-4 mx-auto mb-1 text-success" />
                  <div className="font-bold text-success">
                    {contest.problemsSolved}/{contest.totalProblems}
                  </div>
                  <div className="text-xs text-muted-foreground">Solved</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="font-bold text-primary text-sm">
                    {formatTime(contest.finishTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">Finish Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50 sm:block">
                  <Trophy className="w-4 h-4 mx-auto mb-1 text-warning" />
                  <div className="font-bold text-warning">
                    #{contest.ranking.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Rank</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50 sm:block">
                  <Award className="w-4 h-4 mx-auto mb-1 text-leetcode" />
                  <div className="font-bold text-leetcode">{contest.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LeetCodeContestSection = ({
  contestRating,
  contestGlobalRanking,
  contestTopPercentage,
  attendedContestsCount,
  contestHistory,
}: ContestSectionProps) => {
  // Separate contests by type
  const weeklyContests = contestHistory
    .filter((c) => getContestType(c.contestName) === "weekly")
    .slice(0, 5);
  const biweeklyContests = contestHistory
    .filter((c) => getContestType(c.contestName) === "biweekly")
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-6 sm:p-8 mb-12"
    >
      <h2 className="text-2xl font-bold mb-6">Contest Performance</h2>

      {/* Contest Rating Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
             style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderColor: "rgba(255, 161, 22, 0.4)", boxShadow: "0 0 20px rgba(255, 161, 22, 0.1)" }}>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#FFB84D] mb-1 drop-shadow-md">{contestRating || "N/A"}</div>
          <div className="text-sm font-medium text-white/80">Contest Rating</div>
        </div>
        <div className="text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
             style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#60A5FA] mb-1 drop-shadow-md">
            {contestGlobalRanking ? `#${contestGlobalRanking.toLocaleString()}` : "N/A"}
          </div>
          <div className="text-sm font-medium text-white/80">Global Rank</div>
        </div>
        <div className="text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
             style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderColor: "rgba(245, 158, 11, 0.4)", boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)" }}>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#FBBF24] mb-1 drop-shadow-md">
            {contestTopPercentage !== "0" ? `Top ${contestTopPercentage}%` : "N/A"}
          </div>
          <div className="text-sm font-medium text-white/80">Percentile</div>
        </div>
        <div className="text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
             style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", borderColor: "rgba(34, 197, 94, 0.4)", boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)" }}>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#4ADE80] mb-1 drop-shadow-md">{attendedContestsCount}</div>
          <div className="text-sm font-medium text-white/80">Contests Attended</div>
        </div>
      </div>

      {contestHistory.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No contest history available yet. Participate in LeetCode contests to see your results here!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Contests */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-leetcode"></div>
              Weekly Contests
              <span className="text-sm font-normal text-muted-foreground">
                (Last {weeklyContests.length})
              </span>
            </h3>
            {weeklyContests.length > 0 ? (
              <div className="space-y-3">
                {weeklyContests.map((contest, index) => (
                  <ContestCard key={contest.startTime} contest={contest} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No weekly contests attended yet
              </div>
            )}
          </div>

          {/* Biweekly Contests */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              Biweekly Contests
              <span className="text-sm font-normal text-muted-foreground">
                (Last {biweeklyContests.length})
              </span>
            </h3>
            {biweeklyContests.length > 0 ? (
              <div className="space-y-3">
                {biweeklyContests.map((contest, index) => (
                  <ContestCard key={contest.startTime} contest={contest} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No biweekly contests attended yet
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LeetCodeContestSection;

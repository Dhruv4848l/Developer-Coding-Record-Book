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
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="font-bold text-leetcode">{contest.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-bold">#{contest.ranking.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 rounded-xl bg-leetcode/10 border border-leetcode/30">
          <div className="text-2xl sm:text-3xl font-bold text-leetcode">{contestRating || "N/A"}</div>
          <div className="text-sm text-muted-foreground">Contest Rating</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/30">
          <div className="text-2xl sm:text-3xl font-bold text-primary">
            {contestGlobalRanking ? `#${contestGlobalRanking.toLocaleString()}` : "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Global Rank</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/30">
          <div className="text-2xl sm:text-3xl font-bold text-warning">
            {contestTopPercentage !== "0" ? `Top ${contestTopPercentage}%` : "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Percentile</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-success/10 border border-success/30">
          <div className="text-2xl sm:text-3xl font-bold text-success">{attendedContestsCount}</div>
          <div className="text-sm text-muted-foreground">Contests Attended</div>
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

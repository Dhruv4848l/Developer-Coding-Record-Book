import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, TrendingUp, Target, Award, Zap, Code2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAtCoderStats } from "@/hooks/useAtCoderStats";
import { ContributionHeatmap } from "@/components/ContributionHeatmap";

const ATCODER_USERNAME = "MrCoder420";

const AtCoderPage = () => {
  const { data: stats, isLoading, error } = useAtCoderStats(ATCODER_USERNAME);

  const profile = stats?.profile;
  const profileUrl = `https://atcoder.jp/users/${ATCODER_USERNAME}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9" title="Return to Profile">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-atcoder/30 text-atcoder hover:bg-atcoder/10">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dhruv's <span className="text-atcoder">AtCoder</span> Profile
          </h1>
          <p className="text-muted-foreground text-lg">@{profile?.username || ATCODER_USERNAME}</p>
          {profile?.rank && (
            <p
              className="text-lg font-semibold mt-2"
              style={{ color: profile.rankColor }}
            >
              {profile.rank}
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
              <Skeleton className="h-24 sm:h-28 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-atcoder mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-atcoder">{profile?.problemsSolved ?? 0}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.rankColor }}>
                  {profile?.rating ?? 0}
                </div>
                <div className="text-sm text-muted-foreground">Current Rating</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-success">{profile?.highestRating ?? 0}</div>
                <div className="text-sm text-muted-foreground">Highest Rating</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-warning mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-warning">{profile?.contestsParticipated ?? 0}</div>
                <div className="text-sm text-muted-foreground">Contests</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold">{profile?.acceptedSubmissions ?? 0}</div>
                <div className="text-xs text-muted-foreground">AC Submissions</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Code2 className="w-5 h-5 text-atcoder mx-auto mb-2" />
                <div className="text-xl font-bold">
                  {profile?.globalRank ? `#${profile.globalRank.toLocaleString()}` : 'N/A'}
                </div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Heatmap */}
        {stats?.heatmap && stats.heatmap.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 sm:p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Submission Activity</h2>
            <ContributionHeatmap data={stats.heatmap} platform="atcoder" />
          </motion.div>
        )}

        {/* Recent Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Contests</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : stats?.contestHistory && stats.contestHistory.length > 0 ? (
            <div className="space-y-4">
              {stats.contestHistory.slice(0, 10).map((contest, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors gap-2"
                >
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-atcoder hidden sm:block" />
                    <div>
                      <span className="font-medium text-sm sm:text-base line-clamp-1">{contest.contestName}</span>
                      <div className="text-xs text-muted-foreground">{contest.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <span className="text-muted-foreground">
                      Rank: <span className="text-foreground font-medium">{contest.rank}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Perf: <span className="text-foreground font-medium">{contest.performance}</span>
                    </span>
                    <span className={contest.ratingChange >= 0 ? "text-success font-medium" : "text-destructive font-medium"}>
                      {contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No contest history available</p>
          )}
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-12 text-center mt-12"
          >
            <h2 className="text-2xl font-bold mb-4 text-destructive">Error Loading Profile</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Unable to fetch data from AtCoder. Please try again later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AtCoderPage;

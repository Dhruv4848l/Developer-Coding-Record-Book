import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, TrendingUp, Target, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";

const CODEFORCES_HANDLE = "dhruvmaji";

const CodeforcesPage = () => {
  const { data: stats, isLoading, error } = useCodeforcesStats(CODEFORCES_HANDLE);
  
  const profile = stats?.profile;
  const profileUrl = `https://codeforces.com/profile/${CODEFORCES_HANDLE}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-codeforces/30 text-codeforces hover:bg-codeforces/10">
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
            Dhruv's <span className="text-codeforces">Codeforces</span> Profile
          </h1>
          <p className="text-muted-foreground text-lg">@{profile?.handle || CODEFORCES_HANDLE}</p>
          {profile?.rank && (
            <p 
              className="text-lg font-semibold mt-2 capitalize"
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
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-codeforces mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-codeforces">{profile?.problemsSolved ?? 0}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.rankColor }}>{profile?.rating ?? 0}</div>
                <div className="text-sm text-muted-foreground">Current Rating</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: profile?.maxRankColor }}>{profile?.maxRating ?? 0}</div>
                <div className="text-sm text-muted-foreground">Max Rating</div>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold">{profile?.totalSubmissions ?? 0}</div>
                <div className="text-xs text-muted-foreground">Submissions</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Users className="w-5 h-5 text-codeforces mx-auto mb-2" />
                <div className="text-xl font-bold">{profile?.friendOfCount ?? 0}</div>
                <div className="text-xs text-muted-foreground">Friends</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
                <div className="text-xl font-bold text-success">+{profile?.contribution ?? 0}</div>
                <div className="text-xs text-muted-foreground">Contribution</div>
              </div>
              <div className="glass rounded-xl p-4 text-center capitalize">
                <Award className="w-5 h-5 mx-auto mb-2" style={{ color: profile?.maxRankColor }} />
                <div className="text-lg font-bold" style={{ color: profile?.maxRankColor }}>{profile?.maxRank ?? 'N/A'}</div>
                <div className="text-xs text-muted-foreground">Max Rank</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Recent Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Contests</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : stats?.recentContests && stats.recentContests.length > 0 ? (
            <div className="space-y-4">
              {stats.recentContests.slice(0, 10).map((contest, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors gap-2"
                >
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-codeforces hidden sm:block" />
                    <span className="font-medium text-sm sm:text-base line-clamp-1">{contest.name}</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <span className="text-muted-foreground">Rank: <span className="text-foreground font-medium">{contest.rank}</span></span>
                    <span className={contest.ratingChange >= 0 ? "text-success font-medium" : "text-destructive font-medium"}>
                      {contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}
                    </span>
                    <span className="text-muted-foreground">{contest.newRating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No contest history available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CodeforcesPage;

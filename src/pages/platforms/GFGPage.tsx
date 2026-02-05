import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Trophy, BookOpen, Flame, Target, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGFGStats } from "@/hooks/useGFGStats";

const GFG_USERNAME = "dhruvmaji8b4b";

const GFGPage = () => {
  const { data: stats, isLoading, error } = useGFGStats(GFG_USERNAME);

  const profileUrl = stats?.profileUrl || `https://www.geeksforgeeks.org/user/${GFG_USERNAME}`;

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
              <Button variant="outline" className="gap-2 border-gfg/30 text-gfg hover:bg-gfg/10">
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
            Dhruv's <span className="text-gfg">GeeksforGeeks</span> Profile
          </h1>
          <p className="text-muted-foreground text-lg">@{stats?.username || GFG_USERNAME}</p>
          {stats?.instituteName && stats.instituteName !== 'N/A' && (
            <p className="text-sm text-muted-foreground mt-2">{stats.instituteName}</p>
          )}
        </motion.div>

        {/* Main Stats Grid */}
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
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gfg mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-gfg">{stats?.problemsSolved ?? 0}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold">{stats?.codingScore ?? 0}</div>
                <div className="text-sm text-muted-foreground">Coding Score</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-warning mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-warning">{stats?.currentStreak ?? 0}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-success">{stats?.instituteRank ?? 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Institute Rank</div>
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
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold">{stats?.monthlyCodingScore ?? 0}</div>
                <div className="text-sm text-muted-foreground">Monthly Coding Score</div>
              </div>
              <div className="glass rounded-xl p-4 sm:p-6 text-center">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-destructive mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-destructive">{stats?.maxStreak ?? 0}</div>
                <div className="text-sm text-muted-foreground">Max Streak</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Difficulty Breakdown</h2>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">{stats?.solvedByDifficulty?.school ?? 0}</div>
                <div className="text-blue-500 font-medium text-sm">School</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-1">{stats?.solvedByDifficulty?.basic ?? 0}</div>
                <div className="text-cyan-500 font-medium text-sm">Basic</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-success/10 border border-success/30">
                <div className="text-2xl sm:text-3xl font-bold text-success mb-1">{stats?.solvedByDifficulty?.easy ?? 0}</div>
                <div className="text-success font-medium text-sm">Easy</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/30">
                <div className="text-2xl sm:text-3xl font-bold text-warning mb-1">{stats?.solvedByDifficulty?.medium ?? 0}</div>
                <div className="text-warning font-medium text-sm">Medium</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <div className="text-2xl sm:text-3xl font-bold text-destructive mb-1">{stats?.solvedByDifficulty?.hard ?? 0}</div>
                <div className="text-destructive font-medium text-sm">Hard</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Languages Used */}
        {stats?.languages && stats.languages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Languages Used</h2>
            <div className="flex flex-wrap gap-3">
              {stats.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gfg/10 text-gfg border border-gfg/30 text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-destructive">Error Loading Profile</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Unable to fetch data from GeeksforGeeks. Please try again later or check if the username is correct.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GFGPage;

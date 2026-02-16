import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Trophy, Award, Star, Loader2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useCodolioStats } from "@/hooks/useCodolioStats";

const HackerRankPage = () => {
  const { data: stats, isLoading, error } = useCodolioStats("dhruvmajiever191");

  const profileUrl = "https://www.hackerrank.com/profile/dhruvmajiever191";

  const badges = [
    { name: "Java", level: "3 Star", category: "Language Proficiency" },
  ];

  const certificates = [
    { name: "Problem Solving (Basic)", date: "2024" },
  ];

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
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-hackerrank/30 text-hackerrank hover:bg-hackerrank/10">
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </Button>
              </a>
            </div>
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
            Dhruv's <span className="text-hackerrank">HackerRank</span> Profile
          </h1>
          <p className="text-muted-foreground text-lg">@dhruvmajiever191</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </>
          ) : (
            <>
              <div className="glass rounded-xl p-6 text-center">
                <Trophy className="w-8 h-8 text-hackerrank mx-auto mb-3" />
                <div className="text-3xl font-bold text-hackerrank">{stats?.profile?.problemsSolved ?? 4}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <Award className="w-8 h-8 text-warning mx-auto mb-3" />
                <div className="text-3xl font-bold text-warning">1</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </div>
            </>
          )}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30"
              >
                <div className="w-12 h-12 rounded-full bg-hackerrank/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-hackerrank" />
                </div>
                <div>
                  <div className="font-medium">{badge.name}</div>
                  <div className="text-sm text-muted-foreground">{badge.level} • {badge.category}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Certificates</h2>
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-hackerrank" />
                  <span className="font-medium">{cert.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{cert.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HackerRankPage;

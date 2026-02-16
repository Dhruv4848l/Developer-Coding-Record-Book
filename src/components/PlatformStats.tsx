import { motion } from "framer-motion";
import { ExternalLink, ChevronRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { useGFGStats } from "@/hooks/useGFGStats";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import { useCodolioStats } from "@/hooks/useCodolioStats";
import { useAtCoderStats } from "@/hooks/useAtCoderStats";
import { Skeleton } from "@/components/ui/skeleton";

const platformConfigs = [
  {
    name: "LeetCode",
    username: "@Ydp5K7DIfv",
    profileUrl: "https://leetcode.com/u/Ydp5K7DIfv",
    route: "/platform/leetcode",
    colorClass: "text-leetcode",
    bgClass: "bg-leetcode/10",
    borderClass: "border-leetcode/30",
  },
  {
    name: "Codeforces",
    username: "@Ordinary_Coder_420",
    profileUrl: "https://codeforces.com/profile/Ordinary_Coder_420",
    route: "/platform/codeforces",
    colorClass: "text-codeforces",
    bgClass: "bg-codeforces/10",
    borderClass: "border-codeforces/30",
  },
  {
    name: "GeeksforGeeks",
    username: "@dhruvmaji8b4b",
    profileUrl: "https://www.geeksforgeeks.org/user/dhruvmaji8b4b",
    route: "/platform/gfg",
    colorClass: "text-gfg",
    bgClass: "bg-gfg/10",
    borderClass: "border-gfg/30",
  },
  {
    name: "CodeChef",
    username: "@cooking_coder",
    profileUrl: "https://www.codechef.com/users/cooking_coder",
    route: "/platform/codechef",
    colorClass: "text-codechef",
    bgClass: "bg-codechef/10",
    borderClass: "border-codechef/30",
  },
  {
    name: "HackerRank",
    username: "@dhruvmajiever191",
    profileUrl: "https://www.hackerrank.com/profile/dhruvmajiever191",
    route: "/platform/hackerrank",
    colorClass: "text-hackerrank",
    bgClass: "bg-hackerrank/10",
    borderClass: "border-hackerrank/30",
  },
  {
    name: "AtCoder",
    username: "@MrCoder420",
    profileUrl: "https://atcoder.jp/users/MrCoder420",
    route: "/platform/atcoder",
    colorClass: "text-atcoder",
    bgClass: "bg-atcoder/10",
    borderClass: "border-atcoder/30",
  },
];

export const PlatformStats = () => {
  // Fetch stats from all platforms
  const { data: leetcodeStats, isLoading: leetcodeLoading } = useLeetCodeStats("Ydp5K7DIfv");
  const { data: codeforcesStats, isLoading: codeforcesLoading } = useCodeforcesStats("Ordinary_Coder_420");
  const { data: gfgStats, isLoading: gfgLoading } = useGFGStats("dhruvmaji8b4b");
  const { data: codechefStats, isLoading: codechefLoading } = useCodeChefStats("cooking_coder");
  const { data: hackerrankStats, isLoading: hackerrankLoading } = useCodolioStats("dhruvmajiever191");
  const { data: atcoderStats, isLoading: atcoderLoading } = useAtCoderStats("MrCoder420");

  // Build platforms array with dynamic solved counts
  const platforms = platformConfigs.map((config) => {
    let solved = 0;
    let isLoading = false;

    switch (config.name) {
      case "LeetCode":
        solved = leetcodeStats?.profile?.totalSolved || 0;
        isLoading = leetcodeLoading;
        break;
      case "Codeforces":
        solved = codeforcesStats?.profile?.problemsSolved || 0;
        isLoading = codeforcesLoading;
        break;
      case "GeeksforGeeks":
        solved = gfgStats?.problemsSolved || 0;
        isLoading = gfgLoading;
        break;
      case "CodeChef":
        solved = codechefStats?.profile?.problemsSolved || 0;
        isLoading = codechefLoading;
        break;
      case "HackerRank":
        solved = hackerrankStats?.profile?.problemsSolved || 0;
        isLoading = hackerrankLoading;
        break;
      case "AtCoder":
        solved = atcoderStats?.profile?.problemsSolved || 0;
        isLoading = atcoderLoading;
        break;
    }

    return { ...config, solved, isLoading };
  });

  // Calculate total problems solved
  const totalSolved = platforms.reduce((sum, p) => sum + p.solved, 0);
  const isAnyLoading = platforms.some((p) => p.isLoading);

  return (
    <section id="stats" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dhruv's <span className="text-gradient">Coding Platforms</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Verified profiles across multiple competitive programming platforms
          </p>
        </motion.div>

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 mb-12 text-center relative"
        >
          {isAnyLoading ? (
            <Skeleton className="h-20 w-48 mx-auto mb-2" />
          ) : (
            <div className="text-6xl md:text-8xl font-bold text-gradient mb-2">
              {totalSolved}
            </div>
          )}
          <p className="text-muted-foreground text-lg">
            Total Problems Solved Across All Platforms
          </p>
          {isAnyLoading && (
            <div className="absolute top-4 right-4">
              <RefreshCw className="w-5 h-5 text-muted-foreground animate-spin" />
            </div>
          )}
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "tween", duration: 0.08 }}
              whileHover={{ y: -5, scale: 1.02, transition: { type: "tween", duration: 0.12 } }}
              className={`glass-card rounded-2xl p-6 border ${platform.borderClass} hover:shadow-lg transition-all duration-[50ms]`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${platform.bgClass} ${platform.colorClass}`}>
                  {platform.name}
                </div>
                <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Problems Solved</div>
                  {platform.isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <div className={`text-3xl font-bold ${platform.colorClass}`}>
                      {platform.solved}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Verified</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                {platform.username}
              </div>

              <Link to={platform.route} className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors group">
                View Details
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

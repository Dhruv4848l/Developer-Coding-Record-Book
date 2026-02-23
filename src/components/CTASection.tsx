import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Github, Mail } from "lucide-react";

const socialLinks = [
  { name: "LeetCode", url: "https://leetcode.com/u/Ydp5K7DIfv", icon: "🏆" },
  { name: "CodeChef", url: "https://www.codechef.com/users/cooking_coder", icon: "👨‍🍳" },
  { name: "Codeforces", url: "https://codeforces.com/profile/Ordinary_Coder_420", icon: "⚡" },
  { name: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/user/dhruvmaji8b4b", icon: "📚" },
  { name: "HackerRank", url: "https://www.hackerrank.com/profile/dhruvmajiever191", icon: "💻" },
  { name: "AtCoder", url: "https://atcoder.jp/users/MrCoder420", icon: "🎯" },
];

export const CTASection = () => {
  return (
    <section id="leaderboard" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "hsl(190, 95%, 60%)" }} />
            <span className="text-sm text-white/60">Connect with Dhruv</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            All <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(190, 95%, 60%), hsl(260, 80%, 65%))" }}>Platform Profiles</span>
          </h2>

          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Connect with me on any of these competitive programming platforms or reach out directly.
          </p>

          {/* Platform Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-sm text-white/90">{link.name}</div>
                  <div className="text-xs text-white/40 flex items-center gap-1">
                    Visit Profile <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

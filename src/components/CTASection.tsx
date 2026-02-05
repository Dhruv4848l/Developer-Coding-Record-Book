 import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Github, Mail } from "lucide-react";

const socialLinks = [
  { 
    name: "LeetCode", 
    url: "https://leetcode.com/u/Ydp5K7DIfv",
    icon: "🏆"
  },
  { 
    name: "CodeChef", 
    url: "https://www.codechef.com/users/cooking_coder",
    icon: "👨‍🍳"
  },
  { 
    name: "Codeforces", 
    url: "https://codeforces.com/profile/Ordinary_Coder_420",
    icon: "⚡"
  },
  { 
    name: "GeeksForGeeks", 
    url: "https://www.geeksforgeeks.org/user/dhruvmaji8b4b",
    icon: "📚"
  },
  { 
    name: "HackerRank", 
    url: "https://www.hackerrank.com/profile/dhruvmajiever191",
    icon: "💻"
  },
  { 
    name: "AtCoder", 
    url: "https://atcoder.jp/users/MrCoder420",
    icon: "🎯"
  },
];
 
 export const CTASection = () => {
   return (
    <section id="leaderboard" className="py-24 relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-glow opacity-30" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
       <div className="container mx-auto px-6 relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="max-w-3xl mx-auto text-center"
         >
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
             <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Connect with Dhruv</span>
           </div>
          
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
            All <span className="text-gradient">Platform Profiles</span>
           </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
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
                className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-all"
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-sm">{link.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    Visit Profile <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Direct Contact */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:dhruvmajiever1920@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all font-medium"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a 
              href="https://github.com/Dhruv4848l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-border hover:bg-secondary/80 transition-all font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
         </motion.div>
       </div>
     </section>
   );
 };
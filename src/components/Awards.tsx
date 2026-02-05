import { motion } from "framer-motion";
import { Trophy, Star, Award, Medal, Target, Flame } from "lucide-react";

const achievements = [
  {
    title: "100 Days Streak",
    description: "Maintained a 100-day coding streak",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Problem Solver",
    description: "Solved 100+ problems across platforms",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "LeetCode Knight",
    description: "Achieved Knight badge on LeetCode",
    icon: Trophy,
    color: "text-leetcode",
    bgColor: "bg-leetcode/10",
  },
  {
    title: "CodeChef 3 Star",
    description: "Reached 3-star rating on CodeChef",
    icon: Star,
    color: "text-codechef",
    bgColor: "bg-codechef/10",
  },
  {
    title: "Contest Participant",
    description: "Participated in 50+ coding contests",
    icon: Medal,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "DSA Master",
    description: "Completed advanced DSA curriculum",
    icon: Award,
    color: "text-gfg",
    bgColor: "bg-gfg/10",
  },
];

export const Awards = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Awards & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Milestones and badges earned through consistent practice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all"
            >
              <div className={`w-14 h-14 rounded-xl ${achievement.bgColor} flex items-center justify-center mb-4`}>
                <achievement.icon className={`w-7 h-7 ${achievement.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
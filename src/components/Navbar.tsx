import { motion } from "framer-motion";
import { BarChart3, Calendar, Trophy, ExternalLink, User } from "lucide-react";

import { Link } from "react-router-dom";

const navItems = [
  { label: "Stats", icon: BarChart3, href: "#stats" },
  { label: "Events", icon: Calendar, href: "#events" },
  { label: "Leaderboard", icon: Trophy, href: "#leaderboard" },
];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1500; // Slower scroll duration (1.5 seconds)
  let start: number | null = null;

  // Custom ease-in-out cubic easing function
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };

  requestAnimationFrame(animation);
};

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Return to Profile */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Profile</span>
              </motion.div>
            </Link>
            <motion.a
              href="#"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  Dhruv<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(190, 95%, 60%), hsl(260, 80%, 65%))" }}>'s</span>
                </span>
                <span className="text-xs text-white/40 -mt-1 tracking-wider">
                  CODE VAULT
                </span>
              </div>
            </motion.a>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="https://codolio.com/profile/KingKong_Coder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: "rgba(0, 210, 255, 0.1)",
                  border: "1px solid rgba(0, 210, 255, 0.25)",
                  color: "hsl(190, 95%, 60%)",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View on Codolio</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

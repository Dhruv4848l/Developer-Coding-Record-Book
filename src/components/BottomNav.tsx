import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Code2, Terminal, Hexagon, Keyboard } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/") return null;

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
    { path: "/platform/leetcode", icon: Code2, label: "LeetCode" },
    { path: "/platform/codeforces", icon: Terminal, label: "Codeforces" },
    { path: "/platform/codechef", icon: Hexagon, label: "CodeChef" },
    { path: "/platform/hackerrank", icon: Keyboard, label: "Codolio" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden">
      {/* Intense Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      {/* Fog Background */}
      <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"></div>

      <nav className="relative z-10 flex justify-around items-center px-2 py-3" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path} className="relative flex flex-col items-center justify-center w-14 h-12 group select-none">
                <motion.div
                    animate={{
                        scale: isActive ? 1.15 : 1,
                        y: isActive ? -4 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative z-10 flex flex-col items-center gap-1.5"
                >
                   <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-white/40 group-hover:text-white/70'}`} />
                   
                   {/* Ghost Label */}
                   {isActive && (
                      <span className="text-[8px] font-bold tracking-wider uppercase text-cyan-100">
                         {item.label}
                      </span>
                   )}
                </motion.div>

                {/* Cyber Glow Dot Indicator */}
                {isActive && (
                    <motion.div
                       layoutId="bottom-nav-glow"
                       className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)]"
                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

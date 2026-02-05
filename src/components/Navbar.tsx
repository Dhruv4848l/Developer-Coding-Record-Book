 import { motion } from "framer-motion";
import { Code2, BarChart3, Calendar, Trophy, ExternalLink } from "lucide-react";
 
 const navItems = [
   { label: "Stats", icon: BarChart3, href: "#stats" },
   { label: "Events", icon: Calendar, href: "#events" },
   { label: "Leaderboard", icon: Trophy, href: "#leaderboard" },
 ];
 
 export const Navbar = () => {
   return (
     <motion.nav
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="fixed top-0 left-0 right-0 z-50 glass"
     >
       <div className="container mx-auto px-6 py-4">
         <div className="flex items-center justify-between">
           {/* Logo */}
           <motion.a
             href="#"
             className="flex items-center gap-3 group"
             whileHover={{ scale: 1.02 }}
           >
             <div className="flex flex-col">
               <span className="text-lg font-bold text-foreground">
                 Dhruv<span className="text-gradient">'s</span>
               </span>
               <span className="text-xs text-muted-foreground -mt-1 tracking-wider">
                 CODE VAULT
               </span>
             </div>
           </motion.a>
 
           {/* Nav Links */}
           <div className="hidden md:flex items-center gap-1">
             {navItems.map((item, index) => (
               <motion.a
                 key={item.label}
                 href={item.href}
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 * index }}
                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
               >
                 <item.icon className="w-4 h-4" />
                 <span className="text-sm font-medium">{item.label}</span>
               </motion.a>
             ))}
           </div>
 
          {/* Codolio Link */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
           >
            <a 
              href="https://codolio.com/profile/KingKong_Coder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View on Codolio</span>
            </a>
           </motion.div>
         </div>
       </div>
     </motion.nav>
   );
 };
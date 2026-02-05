 import { motion } from "framer-motion";
 import { Code2, Github, Linkedin, Twitter } from "lucide-react";
 
 export const Footer = () => {
   return (
     <footer className="py-16 border-t border-border">
       <div className="container mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="flex flex-col md:flex-row items-center justify-between gap-8"
         >
           {/* Logo */}
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
               <Code2 className="w-5 h-5 text-primary-foreground" />
             </div>
             <div className="flex flex-col">
               <span className="text-lg font-bold">
                 Dhruv<span className="text-gradient">'s</span>
               </span>
               <span className="text-xs text-muted-foreground -mt-1 tracking-wider">
                 CODE VAULT
               </span>
             </div>
           </div>
 
           {/* Copyright */}
           <p className="text-sm text-muted-foreground">
             © 2026 Dhruv's CodeVault. Track your coding journey.
           </p>
 
           {/* Social Links */}
           <div className="flex items-center gap-4">
             <a
               href="#"
               className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
             >
               <Github className="w-5 h-5" />
             </a>
             <a
               href="#"
               className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
             >
               <Linkedin className="w-5 h-5" />
             </a>
             <a
               href="#"
               className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
             >
               <Twitter className="w-5 h-5" />
             </a>
           </div>
         </motion.div>
       </div>
     </footer>
   );
 };
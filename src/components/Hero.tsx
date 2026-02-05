 import { motion } from "framer-motion";
 import { ArrowRight, Zap, TrendingUp, Target } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const features = [
   { icon: Zap, label: "Real-time Sync" },
   { icon: TrendingUp, label: "Progress Analytics" },
   { icon: Target, label: "Goal Tracking" },
 ];
 
 export const Hero = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-glow opacity-50" />
       <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
 
       <div className="container mx-auto px-6 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           {/* Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
           >
             <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
             <span className="text-sm text-muted-foreground">
               Track your coding journey
             </span>
           </motion.div>
 
           {/* Heading */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
           >
             Track, Analyze &{" "}
             <span className="text-gradient">Share</span>
           </motion.h1>
 
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
           >
             Your personal coding portfolio tracker. Navigate and track your
             coding journey to success with{" "}
             <span className="text-foreground font-medium">Dhruv's CodeVault</span>
           </motion.p>
 
           {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
           >
             <Button variant="glow" size="lg" className="group">
               Explore Dashboard
               <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
             <Button variant="glass" size="lg">
               View Demo Profile
             </Button>
           </motion.div>
 
           {/* Feature Pills */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="flex flex-wrap gap-4 justify-center"
           >
             {features.map((feature, index) => (
               <motion.div
                 key={feature.label}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5 + index * 0.1 }}
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
               >
                 <feature.icon className="w-4 h-4 text-primary" />
                 <span className="text-sm font-medium">{feature.label}</span>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </div>
 
       {/* Scroll Indicator */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2"
       >
         <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2"
         >
           <div className="w-1.5 h-2.5 rounded-full bg-primary" />
         </motion.div>
       </motion.div>
     </section>
   );
 };
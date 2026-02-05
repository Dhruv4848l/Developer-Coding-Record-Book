 import { motion } from "framer-motion";
 import { ArrowRight, Sparkles } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 export const CTASection = () => {
   return (
     <section className="py-24 relative overflow-hidden">
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
             <span className="text-sm">Start tracking today</span>
           </div>
 
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
             Ready to <span className="text-gradient">unlock</span>
             <br />
             your Coding Portfolio?
           </h2>
 
           <p className="text-xl text-muted-foreground mb-10">
             Join thousands of developers tracking their coding journey with Dhruv's CodeVault
           </p>
 
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             <Button variant="glow" size="lg" className="group text-lg px-10">
               Get Started Free
               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </motion.div>
         </motion.div>
       </div>
     </section>
   );
 };
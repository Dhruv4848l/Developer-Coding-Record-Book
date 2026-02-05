 import { motion } from "framer-motion";
 
 export const Hero = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-glow opacity-50" />
       <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
     </section>
   );
 };
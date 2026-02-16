import { motion } from "framer-motion";

interface GlassBackgroundProps {
  variant?: "default" | "hero" | "subtle";
}

export const GlassBackground = ({ variant = "default" }: GlassBackgroundProps) => {
  if (variant === "hero") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 right-0 h-full bg-glow opacity-60" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(260,80%,65%)]/15 dark:bg-[hsl(260,80%,60%)]/10 rounded-full blur-[120px]"
        />
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 dark:bg-accent/5 rounded-full blur-[100px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-full bg-glow opacity-40" />
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-primary/15 dark:bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-accent/15 dark:bg-accent/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[hsl(260,80%,65%)]/10 dark:bg-[hsl(260,80%,60%)]/5 rounded-full blur-[80px]" />
    </div>
  );
};

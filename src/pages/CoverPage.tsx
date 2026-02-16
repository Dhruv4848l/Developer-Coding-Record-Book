import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MapPin, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlassBackground } from "@/components/GlassBackground";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContactBalloons } from "@/components/ContactBalloons";

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <GlassBackground variant="hero" />
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Profile Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Avatar className="w-40 h-40 border-4 border-primary/30 shadow-glow">
              <AvatarImage src="https://codolio.com/user-1.png" alt="Dhruv Maji" />
              <AvatarFallback className="text-4xl bg-primary/20">DM</AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            Dhruv Maji
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-gradient text-2xl md:text-3xl lg:text-4xl font-semibold">
              @KingKong_Coder
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground text-xl md:text-2xl max-w-2xl mb-8"
          >
            Competitive Programmer & Problem Solver passionate about Data Structures, Algorithms, and Building Scalable Solutions
          </motion.p>

          {/* Info Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-foreground">India</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-foreground">Parul Institute of Engineering and Technology</span>
            </div>
          </motion.div>

          {/* CTA + Contact row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-4 relative z-20"
          >
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-glow hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              More Details
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <ContactBalloons />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;

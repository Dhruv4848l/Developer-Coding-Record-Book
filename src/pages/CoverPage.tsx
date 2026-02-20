import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MapPin, GraduationCap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContactBalloons } from "@/components/ContactBalloons";

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[hsl(222,47%,5%)] via-[hsl(230,40%,8%)] to-[hsl(240,35%,4%)]">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-40"
        style={{ background: "radial-gradient(circle, hsl(190, 95%, 50%) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-35"
        style={{ background: "radial-gradient(circle, hsl(260, 80%, 55%) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(330, 80%, 50%) 0%, transparent 70%)" }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />


      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Glassmorphic profile card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-3xl p-10 md:p-14"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Backdrop glow behind card */}
            <div className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-20 -z-10"
              style={{ background: "linear-gradient(135deg, hsl(190, 95%, 50%), hsl(260, 80%, 55%))" }}
            />

            {/* Profile Avatar with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full blur-lg opacity-50"
                  style={{ background: "linear-gradient(135deg, hsl(190, 95%, 50%), hsl(260, 80%, 55%))" }}
                />
                <Avatar className="w-36 h-36 md:w-40 md:h-40 relative ring-2 ring-white/20 shadow-2xl"
                  style={{ boxShadow: "0 0 40px rgba(0, 210, 255, 0.3)" }}
                >
                  <AvatarImage src="https://codolio.com/user-1.png" alt="Dhruv Maji" />
                  <AvatarFallback className="text-4xl bg-white/10 text-white">DM</AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            {/* Name with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-3 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 50%, #e0e0e0 100%)",
              }}
            >
              Dhruv Maji
            </motion.h1>

            {/* Username with cyan-purple gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <span className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(190, 95%, 60%) 0%, hsl(260, 80%, 65%) 100%)",
                }}
              >
                @KingKong_Coder
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Competitive Programmer & Problem Solver passionate about Data Structures, Algorithms, and Building Scalable Solutions
            </motion.p>

            {/* Glassmorphic info tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MapPin className="w-4 h-4" style={{ color: "hsl(190, 95%, 60%)" }} />
                <span className="text-white/85">India</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                <GraduationCap className="w-4 h-4" style={{ color: "hsl(190, 95%, 60%)" }} />
                <span className="text-white/85">Parul Institute of Engineering and Technology</span>
              </div>
            </motion.div>

            {/* CTA + Contact row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col items-center gap-5"
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="group relative px-9 py-4 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 overflow-hidden hover:-translate-y-[3px]"
                style={{
                  background: "rgba(0, 212, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  color: "#00d4ff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 212, 255, 0.25)";
                  e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.5)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 212, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0, 212, 255, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  More Details
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <ContactBalloons />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;

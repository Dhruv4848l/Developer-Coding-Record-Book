import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, MessageCircle, Mail, Instagram, Send } from "lucide-react";

interface SocialPlatform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
  bgColor: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/mr-dhruv-maji",
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.2)",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/918141910049?text=Hi%20Dhruv!",
    color: "#25D366",
    bgColor: "rgba(37, 211, 102, 0.2)",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:dhruvmajiever1920@gmail.com",
    color: "#EA4335",
    bgColor: "rgba(234, 67, 53, 0.2)",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/ordinary_boy_here/",
    color: "#E4405F",
    bgColor: "rgba(228, 64, 95, 0.2)",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/Ordinary_Boy_Here",
    color: "#0088CC",
    bgColor: "rgba(0, 136, 204, 0.2)",
  },
];

// Positions for balloons when expanded (relative to button center)
const balloonPositions = [
  { x: -120, y: -160 }, // LinkedIn - top left
  { x: 120, y: -160 },  // WhatsApp - top right
  { x: -180, y: -80 },  // Email - left
  { x: 180, y: -80 },   // Instagram - right
  { x: 0, y: -200 },    // Telegram - top center
];

export const ContactBalloons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!isPopping) {
      setIsExpanded(true);
    }
  }, [isPopping]);

  const handleMouseLeave = useCallback(() => {
    setIsPopping(true);
    // Wait for pop animation then close
    setTimeout(() => {
      setIsExpanded(false);
      setIsPopping(false);
    }, 500);
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contact Me Button */}
      <motion.button
        className="relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, hsl(190 95% 50%) 0%, hsl(260 80% 60%) 50%, hsl(330 80% 55%) 100%)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 text-white">Contact Me</span>
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, hsl(330 80% 55%) 0%, hsl(190 95% 50%) 50%, hsl(260 80% 60%) 100%)",
          }}
        />
      </motion.button>

      {/* Balloon Container */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute left-1/2 top-0 pointer-events-none">
            {socialPlatforms.map((platform, index) => {
              const position = balloonPositions[index];
              const Icon = platform.icon;

              return (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute pointer-events-auto"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={isPopping ? {
                    scale: [1, 1.3, 0],
                    opacity: [1, 1, 0],
                    transition: { 
                      duration: 0.4,
                      delay: index * 0.05,
                    }
                  } : { 
                    x: position.x, 
                    y: position.y, 
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.08,
                    }
                  }}
                  exit={{
                    scale: [1, 1.3, 0],
                    opacity: [1, 1, 0],
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    left: "-28px",
                    top: "-28px",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  {/* Balloon */}
                  <div className="relative">
                    {/* String connecting to button */}
                    <motion.div
                      className="absolute left-1/2 top-full w-[2px] origin-top"
                      style={{
                        height: Math.sqrt(position.x ** 2 + position.y ** 2) - 28,
                        background: `linear-gradient(to bottom, ${platform.color}88, transparent)`,
                        transform: `translateX(-50%) rotate(${Math.atan2(-position.x, -position.y) * (180 / Math.PI)}deg)`,
                        transformOrigin: "top center",
                      }}
                      initial={{ scaleY: 0 }}
                      animate={isPopping ? { scaleY: 0 } : { scaleY: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                    />
                    
                    {/* Balloon shape */}
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer relative"
                      style={{
                        background: platform.bgColor,
                        border: `2px solid ${platform.color}`,
                        boxShadow: `0 4px 20px ${platform.color}40`,
                      }}
                      animate={!isPopping ? {
                        y: [0, -8, 0],
                      } : {}}
                      transition={{
                        y: {
                          duration: 2 + index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      }}
                    >
                      <div style={{ color: platform.color }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      {/* Balloon shine */}
                      <div 
                        className="absolute top-2 left-2 w-3 h-3 rounded-full opacity-50"
                        style={{ background: `${platform.color}` }}
                      />

                      {/* Balloon tie */}
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: "4px solid transparent",
                          borderRight: "4px solid transparent",
                          borderTop: `6px solid ${platform.color}`,
                        }}
                      />
                    </motion.div>

                    {/* Platform label */}
                    <motion.div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: platform.bgColor,
                        color: platform.color,
                      }}
                      initial={{ opacity: 0 }}
                      animate={isPopping ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                    >
                      {platform.name}
                    </motion.div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactBalloons;

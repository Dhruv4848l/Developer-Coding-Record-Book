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

// Arc positions for balloons - positioned above the button in an arc
const balloonPositions = [
  { x: -100, y: -90 },  // LinkedIn - left
  { x: -50, y: -130 },  // WhatsApp - upper left
  { x: 0, y: -150 },    // Email - top center
  { x: 50, y: -130 },   // Instagram - upper right
  { x: 100, y: -90 },   // Telegram - right
];

export const ContactBalloons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = useCallback(() => {
    if (isPopping) return;
    
    if (isExpanded) {
      // Pop the balloons
      setIsPopping(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsPopping(false);
      }, 600);
    } else {
      setIsExpanded(true);
    }
  }, [isExpanded, isPopping]);

  const handleBalloonClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleClose = useCallback(() => {
    if (!isExpanded || isPopping) return;
    setIsPopping(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsPopping(false);
    }, 600);
  }, [isExpanded, isPopping]);

  return (
    <div className="relative inline-block">
      {/* Backdrop to close balloons when clicking outside */}
      <AnimatePresence>
        {isExpanded && !isPopping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Contact Me Button */}
      <motion.button
        className="relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden group z-20"
        style={{
          background: "linear-gradient(135deg, hsl(190 95% 50%) 0%, hsl(260 80% 60%) 50%, hsl(330 80% 55%) 100%)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <span className="relative z-10 text-white">Contact Me</span>
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, hsl(330 80% 55%) 0%, hsl(190 95% 50%) 50%, hsl(260 80% 60%) 100%)",
          }}
        />
      </motion.button>

      {/* Balloon Container - positioned absolutely above the button */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute left-1/2 bottom-full mb-4 z-30 pointer-events-none">
            {socialPlatforms.map((platform, index) => {
              const position = balloonPositions[index];
              const Icon = platform.icon;

              return (
                <motion.div
                  key={platform.name}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: position.x,
                    top: position.y,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ 
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={isPopping ? {
                    scale: [1, 1.5, 0],
                    opacity: [1, 0.8, 0],
                    rotate: [0, 15, -15, 0],
                  } : { 
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: [1, 1.5, 0],
                    opacity: [1, 0.8, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={isPopping ? {
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: "easeOut",
                  } : {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  onClick={(e) => handleBalloonClick(e, platform.url)}
                >
                  {/* Balloon */}
                  <div className="relative group/balloon">
                    {/* String connecting to button */}
                    <motion.div
                      className="absolute left-1/2 top-full w-[2px] origin-top"
                      style={{
                        height: Math.abs(position.y) - 20,
                        background: `linear-gradient(to bottom, ${platform.color}88, ${platform.color}22)`,
                        transform: "translateX(-50%)",
                      }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={isPopping ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    />
                    
                    {/* Balloon shape with pop particles */}
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
                      style={{
                        background: platform.bgColor,
                        border: `2px solid ${platform.color}`,
                        boxShadow: `0 4px 20px ${platform.color}40`,
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        boxShadow: `0 6px 30px ${platform.color}60`,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div style={{ color: platform.color }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      {/* Balloon shine */}
                      <div 
                        className="absolute top-2 left-2 w-3 h-3 rounded-full opacity-40"
                        style={{ background: `${platform.color}` }}
                      />

                      {/* Balloon tie */}
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: `8px solid ${platform.color}`,
                        }}
                      />

                      {/* Pop particles - visible during popping */}
                      {isPopping && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ background: platform.color }}
                              initial={{ x: 0, y: 0, opacity: 1 }}
                              animate={{
                                x: Math.cos((i * 60 * Math.PI) / 180) * 40,
                                y: Math.sin((i * 60 * Math.PI) / 180) * 40,
                                opacity: 0,
                                scale: 0,
                              }}
                              transition={{ duration: 0.4, delay: index * 0.08 }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>

                    {/* Platform label */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        background: platform.bgColor,
                        color: platform.color,
                        border: `1px solid ${platform.color}40`,
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={isPopping ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {platform.name}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactBalloons;

import { useState, useCallback, useRef, useEffect } from "react";
import { Linkedin, MessageCircle, Mail, Instagram, Send } from "lucide-react";

interface SocialPlatform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

const socialPlatforms: SocialPlatform[] = [
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/mr-dhruv-maji", color: "#0A66C2" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/918141910049?text=Hi%20Dhruv!", color: "#25D366" },
  { name: "Email", icon: Mail, url: "mailto:dhruvmajiever1920@gmail.com", color: "#EA4335" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/ordinary_boy_here/", color: "#E4405F" },
  { name: "Telegram", icon: Send, url: "https://t.me/Ordinary_Boy_Here", color: "#0088CC" },
];

const EXPANDED_WIDTH = 280;
const COLLAPSED_HEIGHT = 56;

export const ContactBalloons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const handleItemClick = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    /* Fixed-height container so layout doesn't shift */
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ height: COLLAPSED_HEIGHT, minWidth: EXPANDED_WIDTH }}
    >
      {/* Collapsed: the button */}
      <button
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          height: COLLAPSED_HEIGHT,
          paddingLeft: isOpen ? 0 : 36,
          paddingRight: isOpen ? 0 : 36,
          borderRadius: 50,
          background: isHovered && !isOpen
            ? "linear-gradient(135deg, #7b2ff7, #f107a3)"
            : "linear-gradient(135deg, rgba(123, 47, 247, 0.3), rgba(241, 7, 163, 0.3))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          width: isOpen ? 0 : "auto",
          opacity: isOpen ? 0 : 1,
          transform: isOpen
            ? "scale(0.8)"
            : isHovered
              ? "translateY(-3px) scale(1)"
              : "scale(1)",
          pointerEvents: isOpen ? "none" : "auto",
          boxShadow: isHovered && !isOpen
            ? "0 10px 30px rgba(123, 47, 247, 0.4)"
            : "none",
          transition: "all 0.3s ease",
        }}
        aria-label="Connect with me"
      >
        <span className="relative z-10">Connect with me!!</span>
      </button>

      {/* Expanded: social icons row */}
      <div
        className="flex items-center justify-center gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          height: COLLAPSED_HEIGHT,
          borderRadius: 50,
          background: isOpen
            ? "linear-gradient(135deg, rgba(123, 47, 247, 0.25), rgba(241, 7, 163, 0.25))"
            : "transparent",
          backdropFilter: isOpen ? "blur(10px)" : "none",
          border: isOpen ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid transparent",
          width: isOpen ? EXPANDED_WIDTH : 0,
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "0 16px" : "0",
          position: isOpen ? "relative" : "absolute",
        }}
      >
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleItemClick(platform.url)}
              className="flex-shrink-0 flex items-center justify-center text-white rounded-full hover:scale-110 transition-all duration-200"
              style={{
                width: 40,
                height: 40,
                background: platform.color,
                border: "none",
                cursor: "pointer",
                transform: isOpen ? "scale(1) translateX(0)" : "scale(0) translateX(-20px)",
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? index * 60 + 150 : 0}ms, opacity 0.25s ease ${isOpen ? index * 60 + 150 : 0}ms`,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              aria-label={platform.name}
              title={platform.name}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContactBalloons;

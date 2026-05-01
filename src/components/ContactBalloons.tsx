import { useState, useCallback, useRef, useEffect } from "react";
import { Linkedin, MessageCircle, Mail, Instagram, Github } from "lucide-react";

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
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/Ordinary_Boy_Here/", color: "#E4405F" },
  { name: "GitHub", icon: Github, url: "https://github.com/Dhruv4848l", color: "#181717" },
];

const EXPANDED_WIDTH = 260;
const COLLAPSED_HEIGHT = 44;

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
        className="relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          fontFamily: "var(--fs, 'Cinzel', serif)",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          height: COLLAPSED_HEIGHT,
          paddingLeft: isOpen ? 0 : 30,
          paddingRight: isOpen ? 0 : 30,
          borderRadius: 0,
          clipPath: isOpen ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          background: isHovered && !isOpen
            ? "rgba(200, 40, 28, 0.08)"
            : "transparent",
          backdropFilter: "blur(10px)",
          border: isHovered && !isOpen ? "1px solid var(--blood, #C8281C)" : "1px solid var(--border2, #3A3558)",
          color: isHovered && !isOpen ? "var(--t1, #F0EBF8)" : "var(--t2, #C8C0DC)",
          width: isOpen ? 0 : "auto",
          opacity: isOpen ? 0 : 1,
          transform: isOpen
            ? "scale(0.8)"
            : "scale(1)",
          pointerEvents: isOpen ? "none" : "auto",
          transition: isOpen
            ? "all 0.25s ease"
            : isHovered
              ? "all 50ms ease"
              : "all 80ms ease 0.35s",
        }}
        aria-label="Connect with me"
      >
        <span className="relative z-10 whitespace-nowrap overflow-hidden leading-none flex items-center justify-center pt-px">⚔ Connect with me</span>
      </button>

      {/* Expanded: social icons row */}
      <div
        className="flex items-center justify-center gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          height: COLLAPSED_HEIGHT,
          borderRadius: 0,
          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          background: "rgba(14, 12, 24, 0.6)",
          backdropFilter: "blur(10px)",
          border: isOpen ? "1px solid var(--blood, #C8281C)" : "1px solid var(--border2, #3A3558)",
          width: isOpen ? EXPANDED_WIDTH : 0,
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "0 12px" : "0",
          position: isOpen ? "relative" : "absolute",
          transition: isOpen
            ? "width 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.05s, padding 0.45s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s ease"
            : "width 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, opacity 0.25s ease, padding 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, border 0.3s ease",
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
                width: 32,
                height: 32,
                background: platform.color,
                border: "none",
                cursor: "pointer",
                transform: isOpen ? "scale(1) translateX(0)" : "scale(0) translateX(-20px)",
                opacity: isOpen ? 1 : 0,
                transition: isOpen
                  ? `transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 60 + 150}ms, opacity 0.25s ease ${index * 60 + 150}ms`
                  : `transform 0.2s ease ${(socialPlatforms.length - 1 - index) * 40}ms, opacity 0.15s ease ${(socialPlatforms.length - 1 - index) * 40}ms`,
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

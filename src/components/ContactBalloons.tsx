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

export const ContactBalloons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const handleItemClick = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="flex flex-col items-center gap-3">
      {/* Social icons row - appears above button when open */}
      <div
        className="flex items-center justify-center gap-3 overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isOpen ? 60 : 0,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.8)",
          transition: "max-height 0.35s ease, opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleItemClick(platform.url)}
              className="flex items-center justify-center text-white rounded-full hover:brightness-125 hover:scale-110 transition-all duration-200"
              style={{
                width: 44,
                height: 44,
                background: platform.color,
                border: "none",
                cursor: "pointer",
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                transform: isOpen ? "scale(1)" : "scale(0)",
                opacity: isOpen ? 1 : 0,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
              aria-label={platform.name}
              title={platform.name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* Main toggle button */}
      <button
        onClick={toggle}
        className="gooey-btn relative cursor-pointer font-semibold text-white whitespace-nowrap transition-all duration-300 overflow-hidden hover:-translate-y-[3px]"
        style={{
          height: 56,
          paddingLeft: 36,
          paddingRight: 36,
          borderRadius: 50,
          background: "linear-gradient(135deg, rgba(123, 47, 247, 0.3), rgba(241, 7, 163, 0.3))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
        aria-label="Connect with me"
      >
        <span className="relative z-10">Connect with me!!</span>
      </button>

      {/* Hover animation styles */}
      <style>{`
        .gooey-btn {
          position: relative;
        }
        .gooey-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(135deg, #7b2ff7, #f107a3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gooey-btn:hover::before {
          opacity: 1;
        }
        .gooey-btn:hover {
          box-shadow: 0 10px 30px rgba(123, 47, 247, 0.4);
        }
      `}</style>
    </div>
  );
};

export default ContactBalloons;

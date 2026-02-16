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
    <>
      {/* SVG goo filter for connected blob effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite in2="shadow" in="goo" result="goo" />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <div
        ref={menuRef}
        className="relative inline-block"
        style={{
          filter: "url('#shadowed-goo')",
        }}
      >
        {/* Main toggle pill */}
        <button
          onClick={toggle}
          className="gooey-btn relative z-20 cursor-pointer font-semibold text-white dark:text-white whitespace-nowrap"
          style={{
            height: 56,
            paddingLeft: 28,
            paddingRight: 28,
            borderRadius: 28,
            background: "linear-gradient(135deg, hsl(190 95% 50%) 0%, hsl(260 80% 60%) 50%, hsl(330 80% 55%) 100%)",
            backgroundSize: "200% 200%",
            border: "none",
            transform: isOpen ? "scale(0.92)" : "scale(1)",
            transition: isOpen
              ? "transform 200ms linear, box-shadow 0.25s, translateY 0.25s"
              : "transform 400ms cubic-bezier(0.175, 0.885, 0.320, 1.275), box-shadow 0.25s",
          }}
          aria-label="Connect with me"
        >
          Connect with me!!
        </button>

        {/* Items that slide out to the right, staying connected via goo */}
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          // Items slide from behind the button to the right
          const xOffset = isOpen ? 180 + index * 62 : 20;
          return (
            <button
              key={platform.name}
              onClick={() => handleItemClick(platform.url)}
              className="absolute top-0 flex items-center justify-center text-white hover:brightness-125 hover:scale-110 transition-all duration-200"
              style={{
                width: 56,
                height: 56,
                borderRadius: "100%",
                background: platform.color,
                border: "none",
                cursor: isOpen ? "pointer" : "default",
                left: 0,
                transform: `translate3d(${xOffset}px, 0, 0) scale(${isOpen ? 1 : 0.4})`,
                transitionProperty: "transform, opacity",
                transitionTimingFunction: isOpen
                  ? "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
                  : "ease-in",
                transitionDuration: isOpen
                  ? `${90 + 80 * (index + 1)}ms`
                  : "180ms",
                zIndex: 10 - index,
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              aria-label={platform.name}
              title={platform.name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* Hover animation styles */}
      <style>{`
        .gooey-btn {
          position: relative;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .gooey-btn:hover {
          box-shadow: 0 0.5em 0.5em -0.4em hsl(190 95% 50% / 0.7);
          transform: translateY(-0.25em) !important;
        }
      `}</style>
    </>
  );
};

export default ContactBalloons;

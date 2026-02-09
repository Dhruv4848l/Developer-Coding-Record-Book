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

const ITEM_COUNT = 5;
const OPEN_DISTANCE = 70;

function getItemTransform(index: number, isOpen: boolean) {
  if (!isOpen) return "translate3d(0,0,0) scale(0)";
  const x = (index + 1) * OPEN_DISTANCE;
  return `translate3d(${x}px, 0, 0) scale(1)`;
}

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
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <div
        ref={menuRef}
        className="relative inline-flex items-center"
        style={{ filter: "url('#shadowed-goo')" }}
      >
        {/* Toggle button */}
        <button
          onClick={toggle}
          className="relative z-20 cursor-pointer flex items-center justify-center font-semibold text-white whitespace-nowrap"
          style={{
            height: 52,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 26,
            background: "linear-gradient(135deg, hsl(190 95% 50%) 0%, hsl(260 80% 60%) 50%, hsl(330 80% 55%) 100%)",
            border: "none",
            transform: isOpen ? "scale(0.92)" : "scale(1)",
            transition: isOpen ? "transform 200ms linear" : "transform 400ms cubic-bezier(0.175, 0.885, 0.320, 1.275)",
          }}
          aria-label="Connect with me"
        >
          Connect with me!!
        </button>

        {/* Menu items expanding to the right */}
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleItemClick(platform.url)}
              className="absolute left-[50%] top-1/2 -translate-y-1/2 flex items-center justify-center text-white"
              style={{
                width: 48,
                height: 48,
                borderRadius: "100%",
                background: isOpen ? platform.color : "hsl(190 95% 50%)",
                border: "none",
                cursor: "pointer",
                transform: getItemTransform(index, isOpen),
                transitionProperty: "transform, background",
                transitionTimingFunction: isOpen
                  ? "cubic-bezier(0.935, 0, 0.34, 1.33)"
                  : "ease-out",
                transitionDuration: isOpen
                  ? `${80 + 80 * (index + 1)}ms`
                  : `${10 + 60 * (index + 1)}ms`,
                zIndex: 10 - index,
              }}
              aria-label={platform.name}
              title={platform.name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ContactBalloons;

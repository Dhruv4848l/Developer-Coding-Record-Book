import { useState, useCallback, useRef, useEffect } from "react";
import { Linkedin, MessageCircle, Mail, Instagram, Send } from "lucide-react";

interface SocialPlatform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/mr-dhruv-maji",
    color: "#0A66C2",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/918141910049?text=Hi%20Dhruv!",
    color: "#25D366",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:dhruvmajiever1920@gmail.com",
    color: "#EA4335",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/ordinary_boy_here/",
    color: "#E4405F",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/Ordinary_Boy_Here",
    color: "#0088CC",
  },
];

const MENU_ITEMS = 5;
const OPEN_DISTANCE = 105;
const OPENING_ANGLE = Math.PI - 0.2;

function getItemTransform(index: number, isOpen: boolean) {
  if (!isOpen) return "translate3d(0,0,0)";
  const angle =
    (Math.PI - OPENING_ANGLE) / 2 +
    (OPENING_ANGLE / (MENU_ITEMS - 1)) * index;
  const x = Math.cos(angle) * OPEN_DISTANCE;
  const y = Math.sin(angle) * OPEN_DISTANCE;
  return `translate3d(${x}px, ${y}px, 0)`;
}

export const ContactBalloons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const handleItemClick = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  // Close on outside click
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
      {/* SVG goo filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute w-0 h-0"
        aria-hidden="true"
      >
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <div
        ref={menuRef}
        className="gooey-menu relative"
        style={{
          width: 340,
          height: 220,
          filter: "url('#shadowed-goo')",
        }}
      >
        {/* Main toggle button */}
        <button
          onClick={toggle}
          className="gooey-toggle absolute left-1/2 top-[20px] z-20 cursor-pointer"
          style={{
            width: 80,
            height: 80,
            marginLeft: -40,
            borderRadius: "100%",
            background:
              "linear-gradient(135deg, hsl(190 95% 50%) 0%, hsl(260 80% 60%) 50%, hsl(330 80% 55%) 100%)",
            border: "none",
            color: "white",
            transform: isOpen
              ? "scale(0.8) translate3d(0,0,0)"
              : "scale(1.1) translate3d(0,0,0)",
            transition: isOpen
              ? "transform 200ms linear"
              : "transform 400ms cubic-bezier(0.175, 0.885, 0.320, 1.275)",
          }}
          aria-label="Contact Me"
        >
          {/* Hamburger lines */}
          <span
            className="absolute block bg-white"
            style={{
              width: 25,
              height: 3,
              top: "50%",
              left: "50%",
              marginLeft: -12.5,
              marginTop: -1.5,
              transition: "transform 200ms",
              transform: isOpen
                ? "translate3d(0,0,0) rotate(45deg)"
                : "translate3d(0,-8px,0)",
            }}
          />
          <span
            className="absolute block bg-white"
            style={{
              width: 25,
              height: 3,
              top: "50%",
              left: "50%",
              marginLeft: -12.5,
              marginTop: -1.5,
              transition: "transform 200ms",
              transform: isOpen
                ? "translate3d(0,0,0) scale(0.1,1)"
                : "translate3d(0,0,0)",
            }}
          />
          <span
            className="absolute block bg-white"
            style={{
              width: 25,
              height: 3,
              top: "50%",
              left: "50%",
              marginLeft: -12.5,
              marginTop: -1.5,
              transition: "transform 200ms",
              transform: isOpen
                ? "translate3d(0,0,0) rotate(-45deg)"
                : "translate3d(0,8px,0)",
            }}
          />
        </button>

        {/* Menu items */}
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleItemClick(platform.url)}
              className="absolute left-1/2 top-[20px] text-white flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                marginLeft: -40,
                borderRadius: "100%",
                background: isOpen ? platform.color : "hsl(190 95% 50%)",
                border: "none",
                cursor: "pointer",
                lineHeight: "80px",
                textAlign: "center",
                transform: getItemTransform(index, isOpen),
                transitionProperty: "transform, background",
                transitionTimingFunction: isOpen
                  ? "cubic-bezier(0.935, 0, 0.34, 1.33)"
                  : "ease-out",
                transitionDuration: isOpen
                  ? `${80 + 80 * (index + 1)}ms`
                  : `${10 + 60 * (index + 1)}ms`,
              }}
              aria-label={platform.name}
              title={platform.name}
            >
              <Icon className="w-7 h-7" />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ContactBalloons;

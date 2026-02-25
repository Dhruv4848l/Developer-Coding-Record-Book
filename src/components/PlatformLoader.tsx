import { useState, useEffect, useCallback } from "react";
import "./PlatformLoader.css";

interface PlatformLoaderProps {
  onFinish: () => void;
  text?: string;
  duration?: number;
}

const PlatformLoader = ({ onFinish, text = "Loading", duration = 2000 }: PlatformLoaderProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), duration);
    const removeTimer = setTimeout(onFinish, duration + 600);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [onFinish, duration]);

  const texts = Array.from({ length: 9 }, (_, i) => (
    <div key={i} className="pl-text"><span>{text}</span></div>
  ));

  return (
    <div className={`platform-loader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="pl-loader">
        {texts}
        <div className="pl-line"></div>
      </div>
    </div>
  );
};

export default PlatformLoader;

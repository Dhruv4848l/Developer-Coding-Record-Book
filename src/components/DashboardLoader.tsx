import { useState, useEffect, useCallback } from "react";
import "./DashboardLoader.css";

interface DashboardLoaderProps {
  onFinish: () => void;
  duration?: number;
}

export const DashboardLoader = ({ onFinish, duration = 2500 }: DashboardLoaderProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), duration);
    const removeTimer = setTimeout(onFinish, duration + 600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onFinish]);

  return (
    <div className={`dashboard-loader-screen ${fadeOut ? "dashboard-loader--fade-out" : ""}`}>
      <div className="yin-yang-loader">
        <div className="yin-yang">
          <div className="dot white"></div>
          <div className="dot black"></div>
        </div>
      </div>
    </div>
  );
};

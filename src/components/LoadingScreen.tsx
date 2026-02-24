import { useState, useEffect } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onFinish: () => void;
  duration?: number;
}

export const LoadingScreen = ({ onFinish, duration = 3000 }: LoadingScreenProps) => {
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
    <div
      className={`loading-screen ${fadeOut ? "loading-screen--fade-out" : ""}`}
    >
      <div className="loader">
        <div className="ph1">
          <div className="record"></div>
          <div className="record-text">Hello from Dhruv</div>
        </div>
        <div className="ph2">
          <div className="laptop-b"></div>
          <svg
            className="laptop-t"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 30"
          >
            <path
              d="M21 1H5C2.78 1 1 2.78 1 5V25a4 4 90 004 4H37a4 4 90 004-4V5c0-2.22-1.8-4-4-4H21"
              pathLength="100"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            ></path>
          </svg>
        </div>
        <div className="icon"></div>
      </div>
    </div>
  );
};

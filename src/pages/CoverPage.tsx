import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import FireCanvas from "@/components/FireCanvas";
import ContactBalloons from "@/components/ContactBalloons";
import "./CoverPage.css";

const CoverPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isDpExpanded, setIsDpExpanded] = useState(false);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onFinish={handleFinish} duration={3000} />}
      <div className="cyber-theme">
        <FireCanvas />
        <nav>
          <div className="nav-brand">
            <div className="nb1">Dhruv'<em>s</em></div>
            <div className="nb2">Code Vault</div>
          </div>
          <button onClick={() => navigate("/dashboard")} className="nav-cta">
            ⬥ View Platform Grid
          </button>
        </nav>

        <section className="hero" id="profile">
          <div className="hero-bg"></div>
          <div className="hero-topline"></div>
          <div className="hero-scene">
            <svg width="100%" height="100%" viewBox="0 0 1400 380" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="fg1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#991818"/><stop offset="55%" stopColor="#C8281C"/><stop offset="100%" stopColor="#E04A08" stopOpacity="0"/></linearGradient>
                  <filter id="sf"><feGaussianBlur stdDeviation="3"/></filter>
                  <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#03020A" stopOpacity="1"/><stop offset="100%" stopColor="#03020A" stopOpacity="0"/></linearGradient>
                </defs>
                <polygon points="0,320 80,190 160,260 260,140 380,210 480,120 580,190 680,100 780,180 880,90 980,170 1080,80 1180,150 1280,70 1400,160 1400,380 0,380" fill="#080610" opacity=".9"/>
                <polygon points="0,350 100,250 200,300 340,220 460,260 560,190 660,240 760,160 860,220 960,150 1060,210 1160,130 1260,190 1400,210 1400,380 0,380" fill="#0A0815" opacity=".95"/>
                <rect x="500" y="260" width="400" height="120" fill="#07050E"/>
                <rect x="500" y="248" width="22" height="16" fill="#07050E"/><rect x="534" y="248" width="22" height="16" fill="#07050E"/><rect x="568" y="248" width="22" height="16" fill="#07050E"/><rect x="602" y="248" width="22" height="16" fill="#07050E"/><rect x="636" y="248" width="22" height="16" fill="#07050E"/><rect x="670" y="248" width="22" height="16" fill="#07050E"/><rect x="704" y="248" width="22" height="16" fill="#07050E"/><rect x="738" y="248" width="22" height="16" fill="#07050E"/><rect x="772" y="248" width="22" height="16" fill="#07050E"/><rect x="806" y="248" width="22" height="16" fill="#07050E"/><rect x="840" y="248" width="22" height="16" fill="#07050E"/><rect x="874" y="248" width="22" height="16" fill="#07050E"/>
                <rect x="460" y="192" width="58" height="190" fill="#05040C"/><rect x="448" y="180" width="82" height="18" fill="#05040C"/>
                <rect x="882" y="192" width="58" height="190" fill="#05040C"/><rect x="870" y="180" width="82" height="18" fill="#05040C"/>
                <rect x="660" y="280" width="80" height="100" fill="#030209" rx="38" ry="0"/>
                <ellipse cx="700" cy="280" rx="40" ry="20" fill="#030209"/>
                <ellipse cx="655" cy="258" rx="5" ry="16" fill="url(#fg1)" filter="url(#sf)" opacity=".9"/>
                <ellipse cx="745" cy="258" rx="5" ry="16" fill="url(#fg1)" filter="url(#sf)" opacity=".9"/>
                <ellipse cx="700" cy="378" rx="300" ry="25" fill="#991818" opacity=".2" filter="url(#sf)"/>
                <rect x="0" y="0" width="1400" height="180" fill="url(#skyFade)"/>
              </svg>
          </div>
          
          <div className="hero-content" style={{ animation: "fadeUp 0.7s ease" }}>
            <div 
              className="avatar-ring-wrap" 
              onClick={() => setIsDpExpanded(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="ring-glow"></div>
              <div className="ring-spin1"></div>
              <div className="ring-spin2"></div>
              <div className="ring-spin3"></div>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spinR 25s linear infinite' }} viewBox="0 0 200 200">
                <defs><linearGradient id="tRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#991818"/><stop offset="33%" stopColor="#C8281C"/><stop offset="66%" stopColor="#CCBB8A"/><stop offset="100%" stopColor="#991818"/></linearGradient></defs>
                <g stroke="#2A2540" strokeWidth="1" opacity=".8">
                  <line x1="100" y1="4" x2="100" y2="12"/><line x1="100" y1="188" x2="100" y2="196"/>
                  <line x1="4" y1="100" x2="12" y2="100"/><line x1="188" y1="100" x2="196" y2="100"/>
                  <line x1="62" y1="5" x2="64" y2="13"/><line x1="138" y1="5" x2="136" y2="13"/>
                  <line x1="62" y1="195" x2="64" y2="187"/><line x1="138" y1="195" x2="136" y2="187"/>
                  <line x1="5" y1="62" x2="13" y2="64"/><line x1="5" y1="138" x2="13" y2="136"/>
                  <line x1="195" y1="62" x2="187" y2="64"/><line x1="195" y1="138" x2="187" y2="136"/>
                </g>
                <line x1="100" y1="3" x2="100" y2="14" stroke="#C8281C" strokeWidth="2.5"/>
                <circle cx="100" cy="100" r="95" fill="none" stroke="url(#tRing)" strokeWidth="1.5" strokeDasharray="80 220" opacity=".9"/>
                <circle cx="100" cy="100" r="97" fill="none" stroke="#991818" strokeWidth=".5" opacity=".3"/>
              </svg>
              <svg style={{ position: 'absolute', inset: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', animation: 'spinR 12s linear infinite reverse' }} viewBox="0 0 180 180">
                <polygon points="90,12 78,42 46,42 72,62 62,94 90,74 118,94 108,62 134,42 102,42" fill="none" stroke="#CCBB8A" strokeWidth="1" opacity=".25" strokeLinejoin="round"/>
              </svg>
              <div className="avatar-inner">
                <img src="/profile.png" alt="Dhruv Maji" />
              </div>
              <div className="ring-corner"></div>
            </div>

            <div className="hero-eyebrow">⬥ Warrior of the Void ⬥</div>
            <h1 className="hero-name">Dhruv <em>Maji</em></h1>
            <div className="hero-handle">@KingKong_Coder</div>
            <div className="hero-quote">
              "Jo darr gaya, samjho mar gaya.<br/>
              Yahan sirf woh jeeta hai, jo roz apni seema todhta hai."
            </div>
            <div className="hero-tags">
              <div className="hero-tag">◈ India</div>
              <div className="hero-tag">◈ Parul Institute of Engineering &amp; Technology</div>
            </div>
            <div className="hero-btns">
              <button onClick={() => navigate("/dashboard")} className="btn-blood">More Details ›</button>
              <ContactBalloons />
            </div>
          </div>
        </section>

        <AnimatePresence>
          {isDpExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(5px)",
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-out"
              }}
              onClick={() => setIsDpExpanded(false)}
            >
              <motion.img
                src="/profile.png"
                alt="Dhruv Maji expanded"
                layoutId="profile-dp"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  borderRadius: "50%",
                  boxShadow: "0 0 60px rgba(200, 40, 28, 0.4)",
                  objectFit: "contain",
                  cursor: "default"
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CoverPage;

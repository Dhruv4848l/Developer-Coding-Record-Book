import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { DevCard } from "./DevCard";

export function PowerLevelBar() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    async function fetchPowerLevel() {
      try {
        const response = await fetch("http://localhost:5000/api/powerlevel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leetcode: "Ordinary_Coder_Here",
            codeforces: "Ordinary_Coder_420",
            codechef: "cooking_coder",
            hackerrank: "dhruvmajiever191"
          })
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch power level", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPowerLevel();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mb-6 px-4 mt-2">
        <div className="h-32 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 animate-pulse" />
      </div>
    );
  }

  if (!data || !data.powerLevel) return null;

  const exportCard = async () => {
    setIsExporting(true);
    try {
      // Small pause to ensure React renders everything cleanly
      await new Promise((r) => setTimeout(r, 100));
      
      const element = document.getElementById("dev-card-export");
      if (!element) return;
      
      const canvas = await html2canvas(element, { 
        backgroundColor: '#050505', 
        scale: 2, 
        useCORS: true 
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Code_Vault_${data.rankTitle.replace(/\s+/g, '_')}_Card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate dev card", error);
    } finally {
      setIsExporting(false);
    }
  };

  const progressPercentage = Math.min(100, Math.max(0, (data.rankProgress.current / data.rankProgress.total) * 100));

  return (
    <>
    <DevCard data={data} />
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
      <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 overflow-hidden shadow-[0_0_50px_rgba(30,144,255,0.05)] hover:shadow-[0_0_50px_rgba(30,144,255,0.15)] transition-shadow duration-500 group">
        
        {/* Animated Cyber Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.5fr_3fr_1fr] gap-6 items-center">
          
          {/* Rank Section */}
          <div className="flex flex-col items-center xl:items-start space-y-1">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 font-semibold inline-flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              Void Rank
            </span>
            <div className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              {data.rankTitle}
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="flex flex-col w-full space-y-3">
             <div className="flex justify-between items-end text-sm">
                <span className="text-white/40 font-mono tracking-wider">LVL {data.rankProgress.prevRankMax}</span>
                <span className="text-3xl font-black tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {data.powerLevel.toLocaleString()} <span className="text-xs text-white/30 tracking-widest font-bold ml-1 uppercase">Power</span>
                </span>
                <span className="text-white/40 font-mono tracking-wider">LVL {data.rankProgress.nextRankMax}</span>
             </div>
             
             {/* The Bar */}
             <div className="h-4 w-full bg-black/60 rounded-full border border-white/5 overflow-hidden relative shadow-inner">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 w-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progressPercentage / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
                {/* Glow Overlay */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                />
             </div>
          </div>

          {/* Attr Section */}
          <div className="flex justify-center xl:justify-end gap-6 text-right pr-4">
             <div className="flex flex-col items-center xl:items-end">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Base Rating</span>
                <span className="text-xl font-bold text-white/90 font-mono">{data.baseScore}</span>
             </div>
             <div className="w-[1px] h-10 bg-white/10 hidden xl:block"></div>
             <div className="flex flex-col items-center xl:items-end">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Multiplier</span>
                <span className="text-xl font-bold text-purple-400 font-mono">x{data.multiplier.toFixed(2)}</span>
             </div>
             <div className="w-[1px] h-10 bg-white/10 hidden xl:block"></div>
             
             {/* Export Button */}
             <div className="flex items-center justify-center h-full">
                <motion.button
                  onClick={exportCard}
                  disabled={isExporting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-cyan-900/40 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-50"
                  title="Export Dev Card"
                >
                  {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                </motion.button>
             </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

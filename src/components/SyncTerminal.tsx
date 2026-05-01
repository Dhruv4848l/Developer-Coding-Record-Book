import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Terminal, X, CheckCircle2, Loader2 } from "lucide-react";

export function SyncTerminal({ onSyncComplete }: { onSyncComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const startSync = async () => {
    setIsSyncing(true);
    setLogs(["[SYS] Initializing global sync protocol..."]);
    
    // Wait for cinematic feel
    await new Promise((r) => setTimeout(r, 800));

    const platforms = [
      { name: "LeetCode", url: "http://localhost:5000/api/leetcode?force=true", body: { username: "Ordinary_Coder_Here" } },
      { name: "Codeforces", url: "http://localhost:5000/api/codeforces?force=true", body: { handle: "Ordinary_Coder_420" } },
      { name: "CodeChef", url: "http://localhost:5000/api/codechef?force=true", body: { username: "cooking_coder" } },
      { name: "Codolio", url: "http://localhost:5000/api/codolio?force=true", body: { username: "dhruvmajiever191" } },
    ];

    for (const p of platforms) {
      setLogs((prev) => [...prev, `[${p.name.toUpperCase()}] Scraping active matrix for ${p.body.username || p.body.handle}...`]);
      const startTime = Date.now();
      try {
        const res = await fetch(p.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p.body)
        });
        const duration = Date.now() - startTime;
        if (res.ok) {
           setLogs((prev) => [...prev, `[${p.name.toUpperCase()}] Bypass successful. Cached updated stats. (${duration}ms)`]);
        } else {
           setLogs((prev) => [...prev, `[${p.name.toUpperCase()}] ERR: Connection refused. (${res.status})`]);
        }
      } catch (err) {
        setLogs((prev) => [...prev, `[${p.name.toUpperCase()}] ERR: Fatal exception during scrape.`]);
      }
      
      // Artificial short delay for cinematic effect
      await new Promise((r) => setTimeout(r, 600));
    }
    
    setLogs((prev) => [...prev, "[SYS] Triggering aggregated Void Power Level recalculation..."]);
    
    // Trigger powerlevel sync
    try {
        const startTime = Date.now();
        await fetch("http://localhost:5000/api/powerlevel?force=true", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leetcode: "Ordinary_Coder_Here", codeforces: "Ordinary_Coder_420", codechef: "cooking_coder", hackerrank: "dhruvmajiever191" })
        });
        const duration = Date.now() - startTime;
        setLogs((prev) => [...prev, `[POWERLEVEL] Recalibration complete. (${duration}ms)`]);
    } catch(err) {
        setLogs((prev) => [...prev, `[POWERLEVEL] Recalibration failed.`]);
    }

    setLogs((prev) => [...prev, "[SYS] All systems nominal. Global sync sequence finished."]);
    setIsSyncing(false);

    // Give user time to read, then refresh
    setTimeout(() => {
        setIsOpen(false);
        onSyncComplete();
    }, 2500);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center justify-center p-3 md:p-4 rounded-full bg-cyan-600/20 backdrop-blur-md border border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:bg-cyan-500/20 transition-all duration-300 group"
      >
        <RefreshCw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-[#0a0a0a] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-mono tracking-wider">SYSTEM_SYNC_UTILITY_V1.X</span>
                </div>
                {!isSyncing && (
                  <button onClick={() => { setIsOpen(false); setLogs([]); }} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Terminal Body */}
              <div ref={scrollRef} className="p-6 font-mono text-sm leading-relaxed h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-white/50">
                    <Terminal className="w-12 h-12 opacity-20 mb-2" />
                    <p>Current cached connection matrix is persistent in the background.</p>
                    <p>Do you wish to force a manual override and execute a deep matrix scrape?</p>
                    <button
                      onClick={startSync}
                      className="px-6 py-2 mt-6 text-cyan-400 border border-cyan-500/50 rounded hover:bg-cyan-950/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all uppercase tracking-widest font-bold"
                    >
                      Execute Override
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log, i) => {
                        let colorClass = "text-white/80";
                        if (log.includes('ERR')) colorClass = "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]";
                        else if (log.includes('SYS')) colorClass = "text-cyan-400/80";
                        else if (log.includes('OK') || log.includes('successful') || log.includes('nominal')) colorClass = "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]";
                        else if (log.includes('POWERLEVEL')) colorClass = "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]";

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={colorClass}
                          >
                            <span className="opacity-50 mr-2 text-xs">{new Date().toISOString().split('T')[1].slice(0,8)}</span>
                            {log}
                          </motion.div>
                        );
                    })}
                    {isSyncing && (
                      <div className="flex items-center gap-2 text-cyan-500 mt-4 animate-pulse">
                        <span className="w-2 h-4 bg-cyan-400 animate-ping"></span>
                      </div>
                    )}
                    {!isSyncing && logs.length > 0 && (
                      <div className="flex items-center gap-2 text-green-400 mt-6 pt-4 border-t border-green-500/20">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-bold tracking-widest uppercase">Routing to Dashboard Payload...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

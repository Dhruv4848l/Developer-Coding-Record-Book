import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { useGFGStats } from "@/hooks/useGFGStats";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import { useCodolioStats } from "@/hooks/useCodolioStats";
import { useAtCoderStats } from "@/hooks/useAtCoderStats";

export const PlatformStats = () => {
  const { data: leetcodeStats } = useLeetCodeStats("Ordinary_Coder_Here");
  const { data: codeforcesStats } = useCodeforcesStats("Ordinary_Coder_420");
  const { data: gfgStats } = useGFGStats("dhruvmaji8b4b");
  const { data: codechefStats } = useCodeChefStats("cooking_coder");
  const { data: hackerrankStats } = useCodolioStats("dhruvmajiever191");
  const { data: atcoderStats } = useAtCoderStats("MrCoder420");

  const lcSolved = leetcodeStats?.profile?.totalSolved || 0;
  const cfSolved = codeforcesStats?.profile?.problemsSolved || 0;
  const gfgSolved = gfgStats?.problemsSolved || 0;
  const ccSolved = codechefStats?.profile?.problemsSolved || 0;
  const hrSolved = hackerrankStats?.profile?.problemsSolved || 0;
  const acSolved = atcoderStats?.profile?.problemsSolved || 0;

  const totalSolved = lcSolved + cfSolved + gfgSolved + ccSolved + hrSolved + acSolved;
  const verifyCount = 6;

  // Power Level Algorithm
  const lcRating = leetcodeStats?.profile?.contestRating || 0;
  const cfRating = codeforcesStats?.profile?.rating || 0;
  const ccRating = codechefStats?.profile?.rating || 0;

  const basePower = (lcRating * 1.5) + cfRating + (ccRating * 0.8);
  const powerMultiplier = 1 + (totalSolved / 5000);
  const voidPowerLevel = Math.floor(basePower * powerMultiplier);

  let rankTitle = "Novice Gladiator";
  let ptColor = "var(--t4)"; 
  if (voidPowerLevel > 10000) { rankTitle = "Grandmaster of the Void"; ptColor = "var(--blood)"; }
  else if (voidPowerLevel > 7000) { rankTitle = "Cybertronian Overlord"; ptColor = "var(--ember)"; }
  else if (voidPowerLevel > 4000) { rankTitle = "Warrior of the Void"; ptColor = "var(--pale)"; }
  else if (voidPowerLevel > 1500) { rankTitle = "Elite Mercenary"; ptColor = "var(--cyan)"; }

  const maxPower = 12000;
  const powerPercentage = Math.min(100, Math.max(0, (voidPowerLevel / maxPower) * 100));

  return (
    <div id="stats" className="cyber-theme relative">
      <section className="sec pt-24">
        <div className="text-center mb-10">
          <div className="hero-eyebrow" style={{marginBottom: "0.4rem"}}>⬥ The Six Gates of Code ⬥</div>
          <h2 style={{fontFamily: "var(--fq)", fontSize: "2rem", letterSpacing: "0.1em", color: "var(--t1)", marginBottom: "0.2rem"}}>Dhruv's <em>Coding</em> Platforms</h2>
          <p style={{fontSize: "11px", letterSpacing: "0.2em", color: "var(--t4)", textTransform: "uppercase"}}>Verified profiles across multiple competitive programming platforms</p>
        </div>

        <div className="w-[95%] max-w-[1600px] mx-auto">
          {/* POWER LEVEL BAR */}
          <div className="tf-hud-wrap mb-10" style={{ background: "rgba(3,2,10,0.7)", padding: "2.5rem 3rem", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="tf-scanline"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 relative z-10 gap-4">
              <div>
                <div style={{fontSize: "11px", fontWeight: "700", letterSpacing: "0.4em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "0.6rem"}}>Aggregated Core Status</div>
                <div style={{fontFamily: "var(--fq)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: ptColor, textTransform: "uppercase", letterSpacing: "0.1em", textShadow: `0 0 15px ${ptColor}40`}}>{rankTitle}</div>
              </div>
              <div className="text-left sm:text-right">
                <div style={{fontSize: "10px", fontWeight: "700", letterSpacing: "0.3em", color: "var(--t4)", marginBottom: "0.4rem", textTransform: "uppercase"}}>Void Power Level</div>
                <div style={{fontFamily: "var(--fn)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--t1)", lineHeight: 1, textShadow: `0 0 25px ${ptColor}60`}}>
                  {voidPowerLevel.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="relative z-10" style={{ width: "100%", height: "12px", background: "rgba(0,0,0,0.5)", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" }}>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${powerPercentage}%` }}
                 transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
                 style={{ height: "100%", background: `linear-gradient(90deg, transparent, ${ptColor})`, boxShadow: `0 0 20px ${ptColor}` }}
               />
               <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)" }}></div>
            </div>
          </div>
          <div className="tf-hud-wrap mb-4">
            <div className="tf-scanline"></div>
            <div className="tf-corner-br-wrap tl"></div>
            <div className="tf-corner-br-wrap tr"></div>
            <div className="tf-corner-br-wrap bl"></div>
            <div className="tf-corner-br-wrap br"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10" style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid var(--border1)", background: "rgba(10,8,20,0.4)" }}>
              <div className="text-left">
                <div style={{fontSize: "11px", fontWeight: "700", letterSpacing: "0.3em", color: "var(--blood)", textTransform: "uppercase", marginBottom: "0.3rem"}}>♦ Cybertronian Battle Station ♦</div>
                <h3 style={{fontFamily: "var(--fq)", fontSize: "2.4rem", fontWeight: "700", color: "var(--t1)", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0}}>Platform <span style={{fontFamily: "var(--fd)", fontStyle: "normal", color: "var(--pale)", fontWeight: "400", textTransform: "none"}}>Intelligence</span> Grid</h3>
              </div>
              <div className="flex gap-12 items-end mt-4 md:mt-0">
                  <div className="text-center block">
                    <div className="tf-pod-num" style={{fontSize: "2.8rem", lineHeight: 1}}>{totalSolved}</div>
                    <div style={{fontSize: "10px", fontWeight:"700", letterSpacing: "0.2em", color: "var(--t4)", marginTop: "0.4rem"}}>CONQUERED</div>
                  </div>
                  <div className="text-center block">
                    <div className="tf-pod-num" style={{fontSize: "2.8rem", color: "var(--cyan)", lineHeight: 1}}>{verifyCount}</div>
                    <div style={{fontSize: "10px", fontWeight:"700", letterSpacing: "0.2em", color: "var(--t4)", marginTop: "0.4rem"}}>PLATFORMS</div>
                  </div>
                  <div className="text-center block">
                    <div style={{fontSize: "2.8rem", color: "var(--green)", lineHeight: 1}}>✓</div>
                    <div style={{fontSize: "10px", fontWeight:"700", letterSpacing: "0.2em", color: "var(--t4)", marginTop: "0.4rem"}}>VERIFIED</div>
                  </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row tf-hud-grid items-center relative" style={{ padding: "1.5rem 1.5rem 2.5rem", minHeight: "360px" }}>

              
              <div className="w-full md:w-1/3 tf-hud-left flex flex-col gap-3" style={{ paddingRight: "2rem", borderRight: "1px solid var(--border1)", zIndex: 10 }}>
                <Link to="/platform/leetcode" className="tf-pod-card tp-lc flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.432 5.432 0 0 0 .349 1.017 5.322 5.322 0 0 0 1.027 1.513l4.662 4.988a1.375 1.375 0 0 0 2.012-.024l.175-.188a1.375 1.375 0 0 0-.024-2.012l-4.662-4.988a2.572 2.572 0 0 1-.3-.342 2.573 2.573 0 0 1-.3-.713 2.667 2.667 0 0 1-.04-1.158c.036-.206.097-.4.183-.581a2.539 2.539 0 0 1 .564-.944l3.854-4.126 5.406-5.788a1.375 1.375 0 0 0-.038-1.96l-.175-.187A1.374 1.374 0 0 0 13.483 0z" fill="#FFA116"/><path d="M20.891 12.68h-9.063a1.374 1.374 0 0 0-1.375 1.375v.25c0 .76.616 1.375 1.375 1.375h9.063a1.374 1.374 0 0 0 1.375-1.375v-.25a1.374 1.374 0 0 0-1.375-1.375z" fill="#B3B1B0"/><path d="M14.028 24.012a1.374 1.374 0 0 1-.961-.438l-4.662-4.988a1.375 1.375 0 0 1 .024-2.012l.175-.188a1.375 1.375 0 0 1 2.012.024l4.662 4.988a1.375 1.375 0 0 1-.024 2.012l-.175.188a1.374 1.374 0 0 1-1.051.414z" fill="#FFA116"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "var(--ember)"}}>LeetCode</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{lcSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@Ordinary_Coder_Here</span>
                  </div>
                </Link>

                <Link to="/platform/codechef" className="tf-pod-card tp-cc flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M11.257.004C10.478.12 9.86.614 9.463 1.333c-.291.52-.321.54-.58.438-.327-.13-.79-.126-1.098.009-.522.229-.77.762-.627 1.35.054.225.03.27-.15.293-.302.038-.52.17-.73.438-.22.28-.287.515-.247.872.04.356.16.564.5.865.234.206.277.28.277.487 0 .251-.135.448-.533.78-.16.133-.187.185-.187.36 0 .169.029.228.164.336.335.265.473.461.473.672 0 .19-.021.205-.326.244-.375.048-.55.2-.66.572-.053.18-.064.31-.033.38.077.176.42.52.722.723a9.7 9.7 0 0 0 .695.435c.05.023.064.077.05.19-.014.124-.05.182-.187.3-.215.188-.298.422-.214.607.048.105.14.177.42.326l.376.2.042.338c.033.258.073.374.172.502.162.208.263.245.72.263.308.013.393.033.52.123.316.226.468.226.815.001.12-.078.198-.094.442-.094.337 0 .436-.035.583-.207.1-.117.144-.244.188-.542l.033-.227.312-.16c.425-.217.54-.338.54-.568 0-.159-.075-.257-.32-.419-.167-.109-.227-.187-.227-.293 0-.101.06-.14.342-.224.247-.074.388-.155.586-.34.227-.211.273-.355.174-.54-.06-.114-.287-.337-.586-.573a2.33 2.33 0 0 1-.357-.365c-.044-.088-.044-.119.004-.189.103-.15.223-.449.223-.556 0-.106-.15-.309-.36-.487-.225-.192-.243-.254-.104-.362.322-.25.542-.598.576-.915.024-.216-.026-.44-.15-.677-.153-.29-.313-.42-.623-.504a.663.663 0 0 1-.244-.11c-.048-.054.013-.218.19-.514.212-.354.247-.465.247-.78 0-.309-.066-.47-.28-.688a1.244 1.244 0 0 0-.56-.302c-.222-.064-.247-.084-.349-.271C13.027.66 12.38.054 11.635.002 11.525-.005 11.36-.003 11.257.004z" fill="#5B4638"/><path d="M12 24c-4.571 0-7.714-2.571-8.571-4.286C2.571 17.857 3.429 14 3.429 14s1.714 3.857 4.285 5.143C10.286 20.429 12 20.571 12 20.571s1.714-.142 4.286-1.428c2.571-1.286 4.285-5.143 4.285-5.143s.858 3.857 0 5.714C19.714 21.429 16.571 24 12 24z" fill="#5B4638"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "var(--pale)"}}>CodeChef</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{ccSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@cooking_coder</span>
                  </div>
                </Link>

                <Link to="/platform/gfg" className="tf-pod-card tp-gfg flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.16-.759h1.516c0 .097.013.194.04.29a2.273 2.273 0 0 0 1.335 1.415c.39.157.82.227 1.245.203.388-.009.764-.09 1.11-.24a1.727 1.727 0 0 0 .657-.518c.168-.22.258-.487.258-.76a1.105 1.105 0 0 0-.117-.485 1.191 1.191 0 0 0-.356-.407 1.671 1.671 0 0 0-1.098-.39l-1.754-.017v-1.456l1.754-.017c.174.001.347-.03.51-.091a1.671 1.671 0 0 0 .588-.3c.168-.135.3-.308.386-.508a1.105 1.105 0 0 0 .117-.485c0-.273-.09-.54-.258-.76a1.727 1.727 0 0 0-.657-.518 3.257 3.257 0 0 0-1.11-.24 3.37 3.37 0 0 0-1.245.204 2.273 2.273 0 0 0-1.335 1.414 1.652 1.652 0 0 0-.04.29H14.37c.016-.262.063-.52.16-.758a3.79 3.79 0 0 1 2.135-2.078 4.51 4.51 0 0 1 3.116-.016 3.691 3.691 0 0 1 1.104.695c.23.213.422.465.565.745.143.28.214.59.214.905 0 .462-.152.91-.441 1.283-.288.37-.679.64-1.124.773v.026c.445.133.836.403 1.124.773.289.373.441.82.441 1.283 0 .315-.07.625-.214.905z" fill="#2F8D46"/><path d="M2.329 14.315c.143.28.334.532.565.745.23.213.502.39.806.52a4.51 4.51 0 0 0 3.127-.073c.5-.205.96-.51 1.34-.898.399-.414.692-.934.838-1.505a3.57 3.57 0 0 0 .061-.684h-1.516a1.652 1.652 0 0 1-.04.29 2.273 2.273 0 0 1-1.335 1.414 3.37 3.37 0 0 1-1.245.204 3.257 3.257 0 0 1-1.11-.24 1.727 1.727 0 0 1-.657-.518 1.29 1.29 0 0 1-.258-.76 1.105 1.105 0 0 1 .117-.485c.087-.2.218-.374.386-.508a1.671 1.671 0 0 1 1.098-.39l1.754-.017v-1.456l-1.754-.017c-.174.001-.347-.03-.51-.091a1.671 1.671 0 0 1-.588-.3 1.296 1.296 0 0 1-.386-.508 1.105 1.105 0 0 1-.117-.485c0-.273.09-.54.258-.76.168-.22.39-.39.657-.518.346-.15.722-.23 1.11-.24.425-.024.855.046 1.245.204a2.273 2.273 0 0 1 1.335 1.414c.027.096.04.193.04.29h1.516a3.57 3.57 0 0 0-.06-.684 3.943 3.943 0 0 0-.84-1.505 3.79 3.79 0 0 0-1.339-.898 4.51 4.51 0 0 0-3.127-.073 3.691 3.691 0 0 0-.806.52 2.915 2.915 0 0 0-.565.745 2.532 2.532 0 0 0-.214.905c0 .462.152.91.441 1.283.288.37.679.64 1.124.773v.026c-.445.133-.836.403-1.124.773a2.307 2.307 0 0 0-.441 1.283c0 .315.07.625.214.905z" fill="#2F8D46"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "var(--green)"}}>GeeksforGeeks</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{gfgSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@dhruvmaji8b4b</span>
                  </div>
                </Link>
                <div style={{fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", color: "var(--t2)", textTransform: "uppercase", textAlign: "center", marginTop: "1rem"}}>◀ LEFT ARM</div>
              </div>

              <div className="w-full md:w-1/3 tf-hud-center flex flex-col justify-center items-center" style={{ minHeight: "360px", paddingBottom: "1.5rem" }}>
                <div className="tf-reactor-shell" style={{ position: "relative", top: "auto", left: "auto", transform: "none", width: "240px", height: "240px", marginBottom: "2rem", zIndex: 10 }}>
                  <div className="tf-r-ring r1"></div>
                  <div className="tf-r-ring r2"></div>
                  <div className="tf-r-ring r3"></div>
                  <div className="tf-r-core" style={{inset: "15px"}}>
                    <div className="tf-r-num" style={{fontFamily: "var(--fn)", fontSize: "4.5rem", lineHeight: 1, textShadow: "0 0 25px rgba(255,255,255,0.2)"}}>{totalSolved}</div>
                    <div className="tf-r-lbl" style={{fontFamily: "var(--fq)", fontSize: "11px", color: "var(--t3)", letterSpacing: "0.15em", marginTop: "12px", lineHeight: "1.2"}}>PROBLEMS<br/>CONQUERED</div>
                  </div>
                </div>
                
                <div style={{fontFamily: "var(--fq)", fontSize: "14px", fontWeight:"600", letterSpacing: "0.3em", color: "var(--t3)", textTransform: "uppercase"}}>INTEL CORE</div>
                <div style={{fontFamily: "var(--fn)", fontSize: "2.4rem", color: "var(--pale)", letterSpacing: "0.05em", marginTop: "0.2rem"}}>{verifyCount} PLATFORMS</div>
                
                <div className="flex gap-4 mt-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#e05a10", boxShadow: "0 0 8px rgba(224,90,16,0.5)"}}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#e3d3a1", boxShadow: "0 0 8px rgba(227,211,161,0.5)"}}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#2ee081", boxShadow: "0 0 8px rgba(46,224,129,0.5)"}}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#4cc3ff", boxShadow: "0 0 8px rgba(76,195,255,0.5)"}}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#2ee081", boxShadow: "0 0 8px rgba(46,224,129,0.5)"}}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background: "#ff596f", boxShadow: "0 0 8px rgba(255,89,111,0.5)"}}></div>
                </div>
              </div>

              <div className="w-full md:w-1/3 tf-hud-right flex flex-col gap-3" style={{ paddingLeft: "2rem", borderLeft: "1px solid var(--border1)", zIndex: 10 }}>
                <Link to="/platform/codeforces" className="tf-pod-card tp-cf flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="12" width="5" height="10" rx="1" fill="#F44336"/><rect x="9.5" y="6" width="5" height="16" rx="1" fill="#2196F3"/><rect x="17" y="2" width="5" height="20" rx="1" fill="#FFEB3B"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "var(--cyan)"}}>Codeforces</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{cfSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@Ordinary_Coder_420</span>
                  </div>
                </Link>

                <Link to="/platform/hackerrank" className="tf-pod-card tp-hr flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701a.257.257 0 0 0 .183-.442L9.311 4.93a.258.258 0 0 0-.366 0L7.41 6.466a.257.257 0 0 0 .183.442h.699v10.085a.258.258 0 0 0 .258.258h1.26c.07.002.138-.025.186-.078l1.023-1.144h2.907v3.87c0 .143.115.258.258.258h1.26a.258.258 0 0 0 .257-.258V6.908h.699a.257.257 0 0 0 .184-.442l-1.537-1.536a.258.258 0 0 0-.366 0l-1.535 1.536a.257.257 0 0 0 .183.442h.699v4.134h-2.656a.258.258 0 0 0-.186.078l-1.023 1.144H9.963v-5.63a.258.258 0 0 0-.258-.258H8.445" fill="#00EA64"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "#2ECC71"}}>HackerRank</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{hrSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@dhruvmajiever191</span>
                  </div>
                </Link>

                <Link to="/platform/atcoder" className="tf-pod-card tp-ac flex gap-4 items-center">
                  <span className="tf-pod-ico" style={{display: 'flex', alignItems: 'center'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#E87870" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fill="#E87870" fontSize="10" fontWeight="bold" fontFamily="monospace">A</text></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="tf-pod-name" style={{color: "#E87870"}}>AtCoder</span>
                    <div className="flex items-baseline gap-2"><span className="tf-pod-num">{acSolved}</span><span style={{fontSize: "12px", fontWeight:"700", color: "var(--t2)"}}>SOLVED</span></div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="tf-pod-ok">Verified</span>
                    <span className="tf-pod-handle">@MrCoder420</span>
                  </div>
                </Link>
                <div style={{fontSize: "12px", fontWeight:"700", letterSpacing: "0.2em", color: "var(--t2)", textTransform: "uppercase", textAlign: "center", marginTop: "1rem"}}>RIGHT ARM ▶</div>
              </div>
            </div>

            <div className="tf-sbar">
              <div className="flex gap-4">
                <span className="tf-si" style={{color: "var(--t4)"}}>PLATFORM INTELLIGENCE GRID : SYS : ACTIVE</span>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full tp-lc-g"></div>
                <div className="w-2 h-2 rounded-full tp-cf-g"></div>
                <div className="w-2 h-2 rounded-full tp-gfg-g"></div>
                <div className="w-2 h-2 rounded-full tp-cc-g"></div>
                <div className="w-2 h-2 rounded-full tp-hr-g"></div>
                <div className="w-2 h-2 rounded-full tp-ac-g"></div>
              </div>
              <span className="tf-si" style={{color: "var(--t4)"}}>DHRUV MAJI - @KINGKONG_CODER</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

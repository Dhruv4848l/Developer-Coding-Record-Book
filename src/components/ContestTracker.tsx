import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useContests } from "@/hooks/useContests";
import { toast } from "sonner";
import { CalendarPlus, ExternalLink } from "lucide-react";

const REMINDERS_KEY = "contest-reminders";

const getReminders = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(REMINDERS_KEY) || "{}");
  } catch {
    return {};
  }
};

const setReminders = (reminders: Record<string, boolean>) => {
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
};

const parseDuration = (duration: string): number => {
  const hourMatch = duration.match(/(\d+)\s*h/i);
  const minMatch = duration.match(/(\d+)\s*m/i);
  let minutes = 0;
  if (hourMatch) minutes += parseInt(hourMatch[1]) * 60;
  if (minMatch) minutes += parseInt(minMatch[1]);
  return minutes || 120;
};

const buildGoogleCalendarUrl = (contest: { name: string; platform: string; startTime: string; duration: string; url: string }) => {
  const start = new Date(contest.startTime);
  const durationMinutes = parseDuration(contest.duration);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${contest.platform}: ${contest.name}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Contest: ${contest.name}\nPlatform: ${contest.platform}\nLink: ${contest.url}`,
    location: contest.url,
    sprop: "name:CodeVault",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const formatContestDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatContestTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const getBadgeClass = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("leetcode")) return "eb-lc";
  if (p.includes("codeforces")) return "eb-cf";
  if (p.includes("geeksforgeeks")) return "eb-gfg";
  if (p.includes("codechef")) return "eb-cc";
  if (p.includes("hackerrank")) return "eb-hr";
  if (p.includes("atcoder")) return "eb-ac";
  return "eb-def";
};

// Official SVG Logos for each platform
const PlatformLogo = ({ platform, size = 28 }: { platform: string; size?: number }) => {
  const p = platform.toLowerCase();

  if (p.includes("leetcode")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.432 5.432 0 0 0 .349 1.017 5.322 5.322 0 0 0 1.027 1.513l4.662 4.988a1.375 1.375 0 0 0 2.012-.024l.175-.188a1.375 1.375 0 0 0-.024-2.012l-4.662-4.988a2.572 2.572 0 0 1-.3-.342 2.573 2.573 0 0 1-.3-.713 2.667 2.667 0 0 1-.04-1.158c.036-.206.097-.4.183-.581a2.539 2.539 0 0 1 .564-.944l3.854-4.126 5.406-5.788a1.375 1.375 0 0 0-.038-1.96l-.175-.187A1.374 1.374 0 0 0 13.483 0z" fill="#FFA116"/>
        <path d="M20.891 12.68h-9.063a1.374 1.374 0 0 0-1.375 1.375v.25c0 .76.616 1.375 1.375 1.375h9.063a1.374 1.374 0 0 0 1.375-1.375v-.25a1.374 1.374 0 0 0-1.375-1.375z" fill="#B3B1B0"/>
        <path d="M14.028 24.012a1.374 1.374 0 0 1-.961-.438l-4.662-4.988a1.375 1.375 0 0 1 .024-2.012l.175-.188a1.375 1.375 0 0 1 2.012.024l4.662 4.988a1.375 1.375 0 0 1-.024 2.012l-.175.188a1.374 1.374 0 0 1-1.051.414z" fill="#FFA116"/>
      </svg>
    );
  }

  if (p.includes("codeforces")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="12" width="5" height="10" rx="1" fill="#F44336"/>
        <rect x="9.5" y="6" width="5" height="16" rx="1" fill="#2196F3"/>
        <rect x="17" y="2" width="5" height="20" rx="1" fill="#FFEB3B"/>
      </svg>
    );
  }

  if (p.includes("codechef")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.257.004C10.478.12 9.86.614 9.463 1.333c-.291.52-.321.54-.58.438-.327-.13-.79-.126-1.098.009-.522.229-.77.762-.627 1.35.054.225.03.27-.15.293-.302.038-.52.17-.73.438-.22.28-.287.515-.247.872.04.356.16.564.5.865.234.206.277.28.277.487 0 .251-.135.448-.533.78-.16.133-.187.185-.187.36 0 .169.029.228.164.336.335.265.473.461.473.672 0 .19-.021.205-.326.244-.375.048-.55.2-.66.572-.053.18-.064.31-.033.38.077.176.42.52.722.723a9.7 9.7 0 0 0 .695.435c.05.023.064.077.05.19-.014.124-.05.182-.187.3-.215.188-.298.422-.214.607.048.105.14.177.42.326l.376.2.042.338c.033.258.073.374.172.502.162.208.263.245.72.263.308.013.393.033.52.123.316.226.468.226.815.001.12-.078.198-.094.442-.094.337 0 .436-.035.583-.207.1-.117.144-.244.188-.542l.033-.227.312-.16c.425-.217.54-.338.54-.568 0-.159-.075-.257-.32-.419-.167-.109-.227-.187-.227-.293 0-.101.06-.14.342-.224.247-.074.388-.155.586-.34.227-.211.273-.355.174-.54-.06-.114-.287-.337-.586-.573a2.33 2.33 0 0 1-.357-.365c-.044-.088-.044-.119.004-.189.103-.15.223-.449.223-.556 0-.106-.15-.309-.36-.487-.225-.192-.243-.254-.104-.362.322-.25.542-.598.576-.915.024-.216-.026-.44-.15-.677-.153-.29-.313-.42-.623-.504a.663.663 0 0 1-.244-.11c-.048-.054.013-.218.19-.514.212-.354.247-.465.247-.78 0-.309-.066-.47-.28-.688a1.244 1.244 0 0 0-.56-.302c-.222-.064-.247-.084-.349-.271C13.027.66 12.38.054 11.635.002 11.525-.005 11.36-.003 11.257.004z" fill="#5B4638"/>
        <path d="M12 24c-4.571 0-7.714-2.571-8.571-4.286C2.571 17.857 3.429 14 3.429 14s1.714 3.857 4.285 5.143C10.286 20.429 12 20.571 12 20.571s1.714-.142 4.286-1.428c2.571-1.286 4.285-5.143 4.285-5.143s.858 3.857 0 5.714C19.714 21.429 16.571 24 12 24z" fill="#5B4638"/>
      </svg>
    );
  }

  if (p.includes("geeksforgeeks")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.16-.759h1.516c0 .097.013.194.04.29a2.273 2.273 0 0 0 1.335 1.415c.39.157.82.227 1.245.203.388-.009.764-.09 1.11-.24a1.727 1.727 0 0 0 .657-.518c.168-.22.258-.487.258-.76a1.105 1.105 0 0 0-.117-.485 1.191 1.191 0 0 0-.356-.407 1.671 1.671 0 0 0-1.098-.39l-1.754-.017v-1.456l1.754-.017c.174.001.347-.03.51-.091a1.671 1.671 0 0 0 .588-.3c.168-.135.3-.308.386-.508a1.105 1.105 0 0 0 .117-.485c0-.273-.09-.54-.258-.76a1.727 1.727 0 0 0-.657-.518 3.257 3.257 0 0 0-1.11-.24 3.37 3.37 0 0 0-1.245.204 2.273 2.273 0 0 0-1.335 1.414 1.652 1.652 0 0 0-.04.29H14.37c.016-.262.063-.52.16-.758a3.79 3.79 0 0 1 2.135-2.078 4.51 4.51 0 0 1 3.116-.016 3.691 3.691 0 0 1 1.104.695c.23.213.422.465.565.745.143.28.214.59.214.905 0 .462-.152.91-.441 1.283-.288.37-.679.64-1.124.773v.026c.445.133.836.403 1.124.773.289.373.441.82.441 1.283 0 .315-.07.625-.214.905z" fill="#2F8D46"/>
        <path d="M2.329 14.315c.143.28.334.532.565.745.23.213.502.39.806.52a4.51 4.51 0 0 0 3.127-.073c.5-.205.96-.51 1.34-.898.399-.414.692-.934.838-1.505a3.57 3.57 0 0 0 .061-.684h-1.516a1.652 1.652 0 0 1-.04.29 2.273 2.273 0 0 1-1.335 1.414 3.37 3.37 0 0 1-1.245.204 3.257 3.257 0 0 1-1.11-.24 1.727 1.727 0 0 1-.657-.518 1.29 1.29 0 0 1-.258-.76 1.105 1.105 0 0 1 .117-.485c.087-.2.218-.374.386-.508a1.671 1.671 0 0 1 1.098-.39l1.754-.017v-1.456l-1.754-.017c-.174.001-.347-.03-.51-.091a1.671 1.671 0 0 1-.588-.3 1.296 1.296 0 0 1-.386-.508 1.105 1.105 0 0 1-.117-.485c0-.273.09-.54.258-.76.168-.22.39-.39.657-.518.346-.15.722-.23 1.11-.24.425-.024.855.046 1.245.204a2.273 2.273 0 0 1 1.335 1.414c.027.096.04.193.04.29h1.516a3.57 3.57 0 0 0-.06-.684 3.943 3.943 0 0 0-.84-1.505 3.79 3.79 0 0 0-1.339-.898 4.51 4.51 0 0 0-3.127-.073 3.691 3.691 0 0 0-.806.52 2.915 2.915 0 0 0-.565.745 2.532 2.532 0 0 0-.214.905c0 .462.152.91.441 1.283.288.37.679.64 1.124.773v.026c-.445.133-.836.403-1.124.773a2.307 2.307 0 0 0-.441 1.283c0 .315.07.625.214.905z" fill="#2F8D46"/>
      </svg>
    );
  }

  if (p.includes("hackerrank")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701a.257.257 0 0 0 .183-.442L9.311 4.93a.258.258 0 0 0-.366 0L7.41 6.466a.257.257 0 0 0 .183.442h.699v10.085a.258.258 0 0 0 .258.258h1.26c.07.002.138-.025.186-.078l1.023-1.144h2.907v3.87c0 .143.115.258.258.258h1.26a.258.258 0 0 0 .257-.258V6.908h.699a.257.257 0 0 0 .184-.442l-1.537-1.536a.258.258 0 0 0-.366 0l-1.535 1.536a.257.257 0 0 0 .183.442h.699v4.134h-2.656a.258.258 0 0 0-.186.078l-1.023 1.144H9.963v-5.63a.258.258 0 0 0-.258-.258H8.445" fill="#00EA64"/>
      </svg>
    );
  }

  if (p.includes("atcoder")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#E87870" strokeWidth="2" fill="none"/>
        <text x="12" y="16" textAnchor="middle" fill="#E87870" fontSize="10" fontWeight="bold" fontFamily="monospace">A</text>
      </svg>
    );
  }

  // Default fallback
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="var(--t3)" strokeWidth="1.5" fill="none"/>
      <path d="M8 12h8M12 8v8" stroke="var(--t3)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

// Derive a direct registered URL from the platform and the contest URL
const getContestLink = (contest: any): string => {
  if (contest.url) return contest.url;
  const p = contest.platform.toLowerCase();
  if (p.includes("leetcode")) return "https://leetcode.com/contest/";
  if (p.includes("codeforces")) return "https://codeforces.com/contests";
  if (p.includes("codechef")) return "https://www.codechef.com/contests";
  if (p.includes("geeksforgeeks")) return "https://www.geeksforgeeks.org/events";
  if (p.includes("hackerrank")) return "https://www.hackerrank.com/contests";
  if (p.includes("atcoder")) return "https://atcoder.jp/contests";
  return "#";
};

export const ContestTracker = () => {
  const { data, isLoading, error } = useContests();
  const contests = data?.contests || [];
  const [reminders, setRemindersState] = useState<Record<string, boolean>>(getReminders);

  useEffect(() => {
    setRemindersState(getReminders());
  }, []);

  const handleRemind = (contest: { name: string; platform: string; startTime: string; duration: string; url: string }) => {
    const key = `${contest.platform}-${contest.name}`;
    const isReminded = reminders[key];

    if (isReminded) {
      const updated = { ...reminders };
      delete updated[key];
      setReminders(updated);
      setRemindersState(updated);
      toast.info("Reminder removed", {
        description: `${contest.name} removed.`,
      });
    } else {
      const url = buildGoogleCalendarUrl(contest);
      window.open(url, "_blank", "noopener,noreferrer");
      const updated = { ...reminders, [key]: true };
      setReminders(updated);
      setRemindersState(updated);
      toast.success("Adding to Google Calendar", {
        description: `${contest.name} — confirm in the opened tab.`,
      });
    }
  };

  return (
    <section className="sec cyber-theme py-6" id="events">
      <div className="text-center mb-12">
        <div className="hero-eyebrow" style={{letterSpacing: "0.4em"}}>⬥ Upcoming Battles ⬥</div>
        <h2 style={{fontFamily: "var(--fq)", fontSize: "2.5rem", letterSpacing: "0.1em", color: "var(--t1)", marginBottom: "1rem"}}>
          Never Miss A <span style={{color: "var(--blood)"}}>Contest</span>
        </h2>
        <p style={{fontSize: "11px", letterSpacing: "0.1em", color: "var(--t4)"}}>Track coding contests and set reminders with just one click</p>
      </div>

      <div className="w-[95%] max-w-[1600px] mx-auto">
        <div className="ev-box">
          <div className="ev-head">
            <div>
              <div className="ev-title">Upcoming Contests</div>
              <span className="ev-sub">All times in GMT+5:30</span>
            </div>
          </div>
          
          <div className="ev-body">
            {isLoading ? (
              <div className="p-12 text-center text-[var(--t4)] font-[var(--fs)] text-xs tracking-widest uppercase">Initializing Radar...</div>
            ) : error ? (
              <div className="p-12 text-center text-[var(--ember)] font-[var(--fs)] text-xs tracking-widest uppercase">Radar Offline - Unable to fetch intel.</div>
            ) : contests.length === 0 ? (
              <div className="p-12 text-center text-[var(--t4)] font-[var(--fs)] text-xs tracking-widest uppercase">No Intel Found. Standby for new targets.</div>
            ) : (
              contests.slice(0, 7).map((contest: any, index: number) => {
                const key = `${contest.platform}-${contest.name}`;
                const isReminded = !!reminders[key];
                const contestLink = getContestLink(contest);
                return (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="ev-row"
                  >
                    {/* Left Side: Platform Logo + Contest Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Clickable Platform Logo */}
                      <a 
                        href={contestLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ev-logo-link flex-shrink-0"
                        title={`Open on ${contest.platform}`}
                      >
                        <PlatformLogo platform={contest.platform} size={32} />
                      </a>

                      <div className="min-w-0">
                        <span className={`ev-bp ${getBadgeClass(contest.platform)}`}>{contest.platform}</span>
                        <h4 className="ev-name">{contest.name}</h4>
                        <div className="ev-meta">
                          <span className="ev-m-item">🗓 {formatContestDate(contest.startTime)}</span>
                          <span className="ev-m-item">⏰ {formatContestTime(contest.startTime)}</span>
                          <span className="ev-m-item dur">{contest.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Buttons */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* View Contest Button */}
                      <a 
                        href={contestLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ev-btn ev-btn-view"
                      >
                        <ExternalLink className="w-3 h-3" /> DETAILS
                      </a>

                      {/* Add to Calendar Button */}
                      <button 
                        onClick={() => handleRemind(contest)} 
                        className={`ev-btn ev-btn-cal ${isReminded ? 'reminded' : ''}`}
                      >
                        <CalendarPlus className="w-3.5 h-3.5" /> {isReminded ? 'SYNCED' : 'SYNC CAL'}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

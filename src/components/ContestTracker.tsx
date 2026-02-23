import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useContests } from "@/hooks/useContests";
import { toast } from "sonner";

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
  return minutes || 120; // default 2 hours
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
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' });
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
      // Remove reminder
      const updated = { ...reminders };
      delete updated[key];
      setReminders(updated);
      setRemindersState(updated);
      toast.info("Reminder removed", {
        description: `${contest.name} — delete it manually from your Google Calendar if already added.`,
      });
    } else {
      // Add reminder — open Google Calendar
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
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Never Miss a <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(190, 95%, 60%), hsl(260, 80%, 65%))" }}>Contest</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Track coding contests and set reminders with just one click
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl p-6" style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              ))}
            </>
          ) : error ? (
            <div className="rounded-xl p-8 text-center" style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <p className="text-white/50">Failed to load contests. Please try again later.</p>
            </div>
          ) : contests.length === 0 ? (
            <div className="rounded-xl p-8 text-center" style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <p className="text-white/50">No upcoming contests found.</p>
            </div>
          ) : (
            contests.slice(0, 7).map((contest, index) => {
              const key = `${contest.platform}-${contest.name}`;
              const isReminded = !!reminders[key];

              return (
                <motion.div
                  key={contest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(16px)",
                    border: isReminded
                      ? "1px solid rgba(0, 210, 255, 0.25)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isReminded
                      ? "0 4px 16px rgba(0, 210, 255, 0.08)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                    transition: "all 50ms ease",
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${contest.bgClass} ${contest.colorClass}`}>
                        {contest.platform}
                      </span>
                      <h3 className="font-semibold line-clamp-1 text-white/90">{contest.name}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatContestDate(contest.startTime)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatContestTime(contest.startTime)}
                      </span>
                      <span className="text-white/70 font-medium">{contest.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRemind(contest)}
                      className={`gap-2 ${
                        isReminded
                          ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/25"
                          : "bg-white/10 border-white/10 text-white/80 hover:bg-white/15"
                      }`}
                    >
                      {isReminded ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                      {isReminded ? "Reminded" : "Remind"}
                    </Button>
                    <a href={contest.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-white/50 hover:text-white hover:bg-white/10">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

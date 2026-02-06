import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { gfg160DSTopics, getTotalProblems, getCompletedProblems, type GFG160Problem } from "@/data/gfg160Problems";

const STORAGE_KEY = "gfg160-completed";

const difficultyColors: Record<string, { text: string; bg: string }> = {
  Easy: { text: "text-success", bg: "bg-success/10" },
  Medium: { text: "text-warning", bg: "bg-warning/10" },
  Hard: { text: "text-destructive", bg: "bg-destructive/10" },
};

const loadCompleted = (): Record<number, boolean> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveCompleted = (data: Record<number, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

interface TopicSectionProps {
  topic: typeof gfg160DSTopics[0];
  completedMap: Record<number, boolean>;
  onToggle: (day: number) => void;
  index: number;
}

const TopicSection = ({ topic, completedMap, onToggle, index }: TopicSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const completedCount = topic.problems.filter(
    (p) => completedMap[p.day] ?? p.completed
  ).length;
  const total = topic.problems.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass rounded-xl overflow-hidden"
    >
      {/* Topic Header */}
      <button
        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{topic.icon}</span>
          <div className="text-left">
            <h3 className="font-semibold text-sm sm:text-base">{topic.name}</h3>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{total} completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="hidden sm:block w-24 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gfg transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gfg min-w-[36px] text-right">
            {Math.round(progress)}%
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Problem List */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 divide-y divide-border/30">
              {topic.problems.map((problem) => {
                const isCompleted = completedMap[problem.day] ?? problem.completed;
                const colors = difficultyColors[problem.difficulty];

                return (
                  <div
                    key={problem.day}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isCompleted ? "bg-gfg/5" : "hover:bg-muted/20"
                    }`}
                  >
                    {/* Completed icon */}
                    <button
                      onClick={() => onToggle(problem.day)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-gfg" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground/50" />
                      )}
                    </button>

                    {/* Day number */}
                    <span className="text-xs text-muted-foreground font-mono min-w-[38px]">
                      Day {problem.day}
                    </span>

                    {/* Problem name */}
                    <span
                      className={`flex-1 text-sm ${
                        isCompleted
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {problem.name}
                    </span>

                    {/* Difficulty badge */}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.text} ${colors.bg}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const GFG160Tracker = () => {
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>(loadCompleted);

  useEffect(() => {
    // Initialize from default data if nothing stored
    const stored = loadCompleted();
    if (Object.keys(stored).length === 0) {
      const defaults: Record<number, boolean> = {};
      gfg160DSTopics.forEach((topic) =>
        topic.problems.forEach((p) => {
          if (p.completed) defaults[p.day] = true;
        })
      );
      setCompletedMap(defaults);
      saveCompleted(defaults);
    }
  }, []);

  const handleToggle = useCallback((day: number) => {
    setCompletedMap((prev) => {
      const updated = { ...prev, [day]: !prev[day] };
      saveCompleted(updated);
      return updated;
    });
  }, []);

  const totalProblems = getTotalProblems();
  const completedCount = getCompletedProblems(completedMap);
  const overallProgress = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0;

  return (
    <div>
      {/* Overall Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            GfG 160 Challenge
            <a
              href="https://www.geeksforgeeks.org/batch/gfg-160-problems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gfg hover:text-gfg/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            160 Days of Problem Solving — Data Structures
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-gfg">
              {completedCount}/{totalProblems}
            </div>
            <div className="text-xs text-muted-foreground">Solved</div>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--gfg))"
                strokeWidth="5"
                strokeDasharray={`${overallProgress * 1.758} 999`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
              {Math.round(overallProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Topic Sections */}
      <div className="space-y-3">
        {gfg160DSTopics.map((topic, index) => (
          <TopicSection
            key={topic.name}
            topic={topic}
            completedMap={completedMap}
            onToggle={handleToggle}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default GFG160Tracker;

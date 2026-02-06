import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HeatmapDay {
  date: string;
  count: number;
}

interface MonthData {
  month: string;
  year: number;
  weeks: { date: Date; count: number }[][];
}

interface ContributionHeatmapProps {
  data: HeatmapDay[];
  platform?: "leetcode" | "codeforces" | "gfg" | "atcoder" | "codechef" | "hackerrank";
}

const getHeatmapColor = (count: number, platform: string): string => {
  if (count < 0) return "transparent"; // Padding cells
  if (count === 0) return "hsl(var(--muted))";
  
  // Platform-specific colors
  const colors: Record<string, string[]> = {
    leetcode: ["hsl(33 100% 20%)", "hsl(33 100% 30%)", "hsl(33 100% 40%)", "hsl(33 100% 50%)"],
    codeforces: ["hsl(204 70% 20%)", "hsl(204 70% 33%)", "hsl(204 70% 43%)", "hsl(204 70% 53%)"],
    gfg: ["hsl(120 61% 15%)", "hsl(120 61% 24%)", "hsl(120 61% 29%)", "hsl(120 61% 34%)"],
    atcoder: ["hsl(190 95% 20%)", "hsl(190 95% 30%)", "hsl(190 95% 40%)", "hsl(190 95% 50%)"],
    codechef: ["hsl(25 65% 20%)", "hsl(25 65% 30%)", "hsl(25 65% 35%)", "hsl(25 65% 40%)"],
    hackerrank: ["hsl(152 69% 15%)", "hsl(152 69% 21%)", "hsl(152 69% 26%)", "hsl(152 69% 31%)"],
  };
  
  const platformColors = colors[platform] || colors.leetcode;
  
  if (count === 1) return platformColors[0];
  if (count <= 3) return platformColors[1];
  if (count <= 6) return platformColors[2];
  return platformColors[3];
};

const processHeatmapDataByMonth = (data: HeatmapDay[]): MonthData[] => {
  if (!data || data.length === 0) return [];

  const months: MonthData[] = [];
  let currentMonthKey = "";
  let currentMonthWeeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];

  data.forEach((day) => {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (monthKey !== currentMonthKey) {
      if (currentMonthKey !== "") {
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) {
            currentWeek.push({ date: new Date(0), count: -1 });
          }
          currentMonthWeeks.push(currentWeek);
        }

        const [prevYear, prevMonth] = currentMonthKey.split("-").map(Number);
        months.push({
          month: new Date(prevYear, prevMonth).toLocaleDateString("en-US", { month: "short" }),
          year: prevYear,
          weeks: currentMonthWeeks,
        });
      }

      currentMonthKey = monthKey;
      currentMonthWeeks = [];
      currentWeek = [];

      const dayOfWeek = date.getDay();
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: new Date(0), count: -1 });
      }
    }

    currentWeek.push({ date, count: day.count });

    if (date.getDay() === 6) {
      currentMonthWeeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: new Date(0), count: -1 });
    }
    currentMonthWeeks.push(currentWeek);
  }

  if (currentMonthKey !== "") {
    const [year, month] = currentMonthKey.split("-").map(Number);
    months.push({
      month: new Date(year, month).toLocaleDateString("en-US", { month: "short" }),
      year: year,
      weeks: currentMonthWeeks,
    });
  }

  return months;
};

export const ContributionHeatmap = ({ data, platform = "leetcode" }: ContributionHeatmapProps) => {
  const monthsData = useMemo(() => processHeatmapDataByMonth(data), [data]);

  // Calculate stats
  const totalActiveDays = data.filter((d) => d.count > 0).length;
  
  // Calculate current streak
  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate max streak
  let maxStreak = 0;
  let tempStreak = 0;
  for (const day of data) {
    if (day.count > 0) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  if (monthsData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No submission data available
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Heatmap Grid */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {monthsData.map((monthData, monthIndex) => (
            <div key={`${monthData.year}-${monthData.month}-${monthIndex}`} className="flex flex-col">
              <div className="flex gap-[2px]">
                {monthData.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[2px]">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className="w-3 h-3 rounded-sm transition-all hover:ring-1 hover:ring-foreground/30"
                            style={{
                              backgroundColor: getHeatmapColor(day.count, platform),
                              visibility: day.count < 0 ? "hidden" : "visible",
                            }}
                          />
                        </TooltipTrigger>
                        {day.count >= 0 && (
                          <TooltipContent>
                            <p className="text-xs">
                              <span className="font-medium">{day.count} submissions</span>
                              <br />
                              {day.date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {monthData.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 justify-center lg:min-w-[140px]">
        <div className="text-center lg:text-left p-3 rounded-lg bg-muted/30">
          <div className="text-xl lg:text-2xl font-bold">{totalActiveDays}</div>
          <div className="text-xs text-muted-foreground">Active Days</div>
        </div>
        <div className="text-center lg:text-left p-3 rounded-lg bg-muted/30">
          <div className="text-xl lg:text-2xl font-bold">{currentStreak}</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>
        <div className="text-center lg:text-left p-3 rounded-lg bg-muted/30">
          <div className="text-xl lg:text-2xl font-bold">{maxStreak}</div>
          <div className="text-xs text-muted-foreground">Max Streak</div>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LeetCodeProfile {
  username: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptanceRate: string;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: string;
  attendedContestsCount: number;
}

export interface LeetCodeHeatmapDay {
  date: string;
  count: number;
}

export interface ContestHistoryItem {
  contestName: string;
  startTime: number;
  ranking: number;
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  finishTime: number;
}

export interface LeetCodeStats {
  profile: LeetCodeProfile;
  heatmap: LeetCodeHeatmapDay[];
  contestHistory: ContestHistoryItem[];
  lastUpdated: string;
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const { data, error } = await supabase.functions.invoke("fetch-leetcode-stats", {
    body: { username },
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  if (data.error) {
    throw new Error(data.error);
  }
  
  return data as LeetCodeStats;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export function useLeetCodeStats(username: string = 'Ydp5K7DIfv') {
  return useQuery({
    queryKey: ["leetcode-stats", username],
    queryFn: () => fetchLeetCodeStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
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
}

export interface LeetCodeHeatmapDay {
  date: string;
  count: number;
}

export interface LeetCodeStats {
  profile: LeetCodeProfile;
  heatmap: LeetCodeHeatmapDay[];
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

export function useLeetCodeStats(username: string = 'Ydp5K7DIfv') {
  return useQuery({
    queryKey: ["leetcode-stats", username],
    queryFn: () => fetchLeetCodeStats(username),
    staleTime: 1000 * 60 * 30, // 30 min cache
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GFGStats {
  username: string;
  name: string;
  profileUrl: string;
  instituteRank: string;
  instituteName: string;
  codingScore: number;
  problemsSolved: number;
  monthlyCodingScore: number;
  currentStreak: number;
  maxStreak: number;
  languages: string[];
  solvedByDifficulty: {
    school: number;
    basic: number;
    easy: number;
    medium: number;
    hard: number;
  };
  lastUpdated: string;
}

async function fetchGFGStats(username: string): Promise<GFGStats> {
  const { data, error } = await supabase.functions.invoke(`fetch-gfg-stats?username=${username}`);
  
  if (error) {
    throw new Error(error.message);
  }
  
  if (data.error) {
    throw new Error(data.error);
  }
  
  return data as GFGStats;
}

export function useGFGStats(username: string) {
  return useQuery({
    queryKey: ["gfg-stats", username],
    queryFn: () => fetchGFGStats(username),
    staleTime: 1000 * 60 * 30, // 30 min cache
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

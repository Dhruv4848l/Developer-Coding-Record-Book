import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CodeforcesProfile {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  avatar: string;
  problemsSolved: number;
  totalSubmissions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  contestsParticipated: number;
  rankColor: string;
  maxRankColor: string;
}

export interface CodeforcesHeatmapDay {
  date: string;
  count: number;
}

export interface CodeforcesContest {
  name: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
}

export interface CodeforcesRatingEntry {
  contestId: number;
  contestName: string;
  rank: number;
  rating: number;
  ratingChange: number;
}

export interface CodeforcesStats {
  profile: CodeforcesProfile;
  heatmap: CodeforcesHeatmapDay[];
  recentContests: CodeforcesContest[];
  ratingHistory: CodeforcesRatingEntry[];
  lastUpdated: string;
}

async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats> {
  const { data, error } = await supabase.functions.invoke("fetch-codeforces-stats", {
    body: null,
    headers: {},
  });
  
  // Pass handle as query param via URL
  const response = await supabase.functions.invoke(`fetch-codeforces-stats?handle=${handle}`);
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  
  return response.data as CodeforcesStats;
}

export function useCodeforcesStats(handle: string) {
  return useQuery({
    queryKey: ["codeforces-stats", handle],
    queryFn: () => fetchCodeforcesStats(handle),
    staleTime: 1000 * 60 * 30, // 30 min cache
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

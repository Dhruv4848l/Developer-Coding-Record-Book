import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AtCoderProfile {
  username: string;
  rating: number;
  highestRating: number;
  rank: string;
  rankColor: string;
  country: string;
  affiliation: string;
  contestsParticipated: number;
  problemsSolved: number;
  acceptedSubmissions: number;
  globalRank: number;
}

export interface AtCoderContest {
  contestName: string;
  rank: number;
  performance: number;
  newRating: number;
  ratingChange: number;
  date: string;
}

export interface AtCoderHeatmapDay {
  date: string;
  count: number;
}

export interface AtCoderStats {
  profile: AtCoderProfile;
  contestHistory: AtCoderContest[];
  heatmap: AtCoderHeatmapDay[];
  lastUpdated: string;
}

async function fetchAtCoderStats(username: string): Promise<AtCoderStats> {
  const { data, error } = await supabase.functions.invoke("fetch-atcoder-stats", {
    body: { username },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as AtCoderStats;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000;

export function useAtCoderStats(username: string = "MrCoder420") {
  return useQuery({
    queryKey: ["atcoder-stats", username],
    queryFn: () => fetchAtCoderStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
}

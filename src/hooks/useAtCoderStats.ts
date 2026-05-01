import { useQuery } from "@tanstack/react-query";
// Using native fetch instead of Supabase client

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
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/atcoder`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }
  
  const data = await response.json();
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

import { useQuery } from "@tanstack/react-query";
// Using native fetch instead of Supabase client

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
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/codeforces`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ handle }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }
  
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  
  return data as CodeforcesStats;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export function useCodeforcesStats(handle: string = "Ordinary_Coder_420") {
  return useQuery({
    queryKey: ["codeforces-stats", handle],
    queryFn: () => fetchCodeforcesStats(handle),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

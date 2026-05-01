import { useQuery } from "@tanstack/react-query";
// Using native fetch instead of Supabase client

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
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/leetcode`;
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
  if (data.error) throw new Error(data.error);
  
  return data as LeetCodeStats;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export function useLeetCodeStats(username: string = 'Ordinary_Coder_Here') {
  return useQuery({
    queryKey: ["leetcode-stats", username],
    queryFn: () => fetchLeetCodeStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
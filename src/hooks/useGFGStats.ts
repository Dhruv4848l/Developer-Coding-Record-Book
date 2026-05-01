import { useQuery } from "@tanstack/react-query";
// Using native fetch instead of Supabase client

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
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/gfg`;
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
  
  return data as GFGStats;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export function useGFGStats(username: string) {
  return useQuery({
    queryKey: ["gfg-stats", username],
    queryFn: () => fetchGFGStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

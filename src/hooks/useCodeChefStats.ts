import { useQuery } from "@tanstack/react-query";
// Using native fetch instead of Supabase client

export interface CodeChefProfile {
  username: string;
  rating: number;
  highestRating: number;
  stars: number;
  globalRank: number;
  countryRank: number;
  problemsSolved: number;
  contestsParticipated: number;
  division: string;
  country: string;
}

export interface CodeChefContest {
  code: string;
  name: string;
  rating: number;
  rank: number;
  date: string;
}

export interface CodeChefStats {
  profile: CodeChefProfile;
  ratingHistory: CodeChefContest[];
  lastUpdated: string;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

async function fetchCodeChefStats(username: string): Promise<CodeChefStats> {
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/codechef`;
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
  return data as CodeChefStats;
}

export function useCodeChefStats(username: string = "cooking_coder") {
  return useQuery({
    queryKey: ["codechef-stats", username],
    queryFn: () => fetchCodeChefStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
}

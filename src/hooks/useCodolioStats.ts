 import { useQuery } from "@tanstack/react-query";
 // Using native fetch instead of Supabase client
 
 export interface CodolioProfile {
   username: string;
   name: string;
   globalRank: number;
   problemsSolved: number;
   totalSubmissions: number;
   activeDays: number;
   currentStreak: number;
   longestStreak: number;
 }
 
 export interface HeatmapDay {
   date: string;
   count: number;
 }
 export interface CodolioBadge {
   name: string;
   category: string;
   stars: number;
 }

 export interface CodolioStats {
   profile: CodolioProfile;
   badges?: CodolioBadge[];
   heatmap: HeatmapDay[];
   lastUpdated: string;
 }
 
const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

async function fetchCodolioStats(username: string): Promise<CodolioStats> {
  const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/codolio`;
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
  return data as CodolioStats;
}

export function useCodolioStats(username: string = "dhruvmajiever191") {
  return useQuery({
    queryKey: ["codolio-stats", username],
    queryFn: () => fetchCodolioStats(username),
    staleTime: FOUR_HOURS,
    refetchInterval: FOUR_HOURS,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
 import { useQuery } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 
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
 
 export interface CodolioStats {
   profile: CodolioProfile;
   heatmap: HeatmapDay[];
   lastUpdated: string;
 }
 
const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

async function fetchCodolioStats(username: string): Promise<CodolioStats> {
  const { data, error } = await supabase.functions.invoke("fetch-codolio-stats", {
    body: { username },
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
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
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
 
 async function fetchCodolioStats(): Promise<CodolioStats> {
   const { data, error } = await supabase.functions.invoke("fetch-codolio-stats");
   
   if (error) {
     throw new Error(error.message);
   }
   
   return data as CodolioStats;
 }
 
 export function useCodolioStats() {
   return useQuery({
     queryKey: ["codolio-stats"],
     queryFn: fetchCodolioStats,
     staleTime: 1000 * 60 * 60, // 1 hour cache
     refetchOnWindowFocus: false,
   });
 }
 import { useQuery } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 
 export interface Contest {
   platform: string;
   name: string;
   startTime: string;
   duration: string;
   url: string;
   colorClass: string;
   bgClass: string;
 }
 
 interface ContestsResponse {
   contests: Contest[];
   lastUpdated: string;
 }
 
 async function fetchContests(): Promise<ContestsResponse> {
   const { data, error } = await supabase.functions.invoke("fetch-contests");
   
   if (error) {
     throw new Error(error.message);
   }
   
   if (data.error) {
     throw new Error(data.error);
   }
   
   return data as ContestsResponse;
 }
 
 export function useContests() {
   return useQuery({
     queryKey: ["contests"],
     queryFn: fetchContests,
     staleTime: 1000 * 60 * 15, // 15 min cache
     refetchOnWindowFocus: false,
     retry: 2,
   });
 }
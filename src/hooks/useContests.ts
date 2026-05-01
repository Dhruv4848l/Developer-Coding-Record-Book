 import { useQuery } from "@tanstack/react-query";
 // Using native fetch instead of Supabase client
 
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
   const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/contests`;
   const response = await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
   });
   
   if (!response.ok) {
     const errorData = await response.json().catch(() => ({}));
     throw new Error(errorData.error || `HTTP error ${response.status}`);
   }
   
   const data = await response.json();
   if (data.error) throw new Error(data.error);
   
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
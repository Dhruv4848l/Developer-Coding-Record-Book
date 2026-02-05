 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 interface Contest {
   platform: string;
   name: string;
   startTime: string;
   duration: string;
   url: string;
   colorClass: string;
   bgClass: string;
 }
 
 async function fetchLeetCodeContests(): Promise<Contest[]> {
   try {
     const response = await fetch('https://leetcode.com/graphql', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         query: `
           query {
             topTwoContests {
               title
               startTime
               duration
             }
           }
         `
       })
     });
     
     const data = await response.json();
     const contests = data?.data?.topTwoContests || [];
     
     return contests.map((contest: any) => ({
       platform: 'LeetCode',
       name: contest.title,
       startTime: new Date(contest.startTime * 1000).toISOString(),
       duration: `${Math.floor(contest.duration / 3600)}h ${(contest.duration % 3600) / 60}m`,
       url: 'https://leetcode.com/contest/',
       colorClass: 'text-leetcode',
       bgClass: 'bg-leetcode/10',
     }));
   } catch (error) {
     console.error('Error fetching LeetCode contests:', error);
     return [];
   }
 }
 
 async function fetchCodeforcesContests(): Promise<Contest[]> {
   try {
     const response = await fetch('https://codeforces.com/api/contest.list?gym=false');
     const data = await response.json();
     
     if (data.status !== 'OK') return [];
     
     const upcomingContests = data.result
       .filter((contest: any) => contest.phase === 'BEFORE')
       .slice(0, 5);
     
     return upcomingContests.map((contest: any) => ({
       platform: 'Codeforces',
       name: contest.name,
       startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
       duration: `${Math.floor(contest.durationSeconds / 3600)}h`,
       url: `https://codeforces.com/contest/${contest.id}`,
       colorClass: 'text-codeforces',
       bgClass: 'bg-codeforces/10',
     }));
   } catch (error) {
     console.error('Error fetching Codeforces contests:', error);
     return [];
   }
 }
 
 async function fetchCodeChefContests(): Promise<Contest[]> {
   try {
     const response = await fetch('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all');
     const data = await response.json();
     
     const upcomingContests = (data?.future_contests || []).slice(0, 5);
     
     return upcomingContests.map((contest: any) => ({
       platform: 'CodeChef',
       name: contest.contest_name,
       startTime: new Date(contest.contest_start_date_iso).toISOString(),
       duration: `${Math.floor(parseInt(contest.contest_duration) / 60)}h`,
       url: `https://www.codechef.com/${contest.contest_code}`,
       colorClass: 'text-codechef',
       bgClass: 'bg-codechef/10',
     }));
   } catch (error) {
     console.error('Error fetching CodeChef contests:', error);
     return [];
   }
 }
 
 serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const [leetcode, codeforces, codechef] = await Promise.all([
       fetchLeetCodeContests(),
       fetchCodeforcesContests(),
       fetchCodeChefContests(),
     ]);
 
     const allContests = [...leetcode, ...codeforces, ...codechef]
       .filter(c => new Date(c.startTime) > new Date())
       .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
       .slice(0, 10);
 
     return new Response(
       JSON.stringify({ contests: allContests, lastUpdated: new Date().toISOString() }),
       { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   } catch (error) {
     console.error('Error:', error);
     return new Response(
       JSON.stringify({ error: 'Failed to fetch contests' }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });
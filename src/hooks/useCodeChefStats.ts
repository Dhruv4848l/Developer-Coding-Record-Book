import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export interface CodeChefStats {
  profile: CodeChefProfile;
  lastUpdated: string;
}

const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

async function fetchCodeChefStats(username: string): Promise<CodeChefStats> {
  const { data, error } = await supabase.functions.invoke("fetch-codechef-stats", {
    body: { username },
  });

  if (error) {
    throw new Error(error.message);
  }

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

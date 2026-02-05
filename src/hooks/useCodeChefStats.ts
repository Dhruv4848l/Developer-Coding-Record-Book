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

const CODECHEF_USERNAME = "cooking_coder";

async function fetchCodeChefStats(): Promise<CodeChefStats> {
  const { data, error } = await supabase.functions.invoke("fetch-codechef-stats", {
    body: { username: CODECHEF_USERNAME },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as CodeChefStats;
}

export function useCodeChefStats() {
  return useQuery({
    queryKey: ["codechef-stats", CODECHEF_USERNAME],
    queryFn: fetchCodeChefStats,
    staleTime: 1000 * 60 * 60, // 1 hour cache
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
}

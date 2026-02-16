const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface AtCoderStats {
  profile: {
    username: string;
    rating: number;
    highestRating: number;
    rank: string;
    rankColor: string;
    country: string;
    affiliation: string;
    contestsParticipated: number;
    problemsSolved: number;
    acceptedSubmissions: number;
    globalRank: number;
  };
  contestHistory: {
    contestName: string;
    rank: number;
    performance: number;
    newRating: number;
    ratingChange: number;
    date: string;
  }[];
  heatmap: { date: string; count: number }[];
  lastUpdated: string;
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/html',
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function getRankFromRating(rating: number): { rank: string; color: string } {
  if (rating >= 2800) return { rank: 'Red', color: '#FF0000' };
  if (rating >= 2400) return { rank: 'Orange', color: '#FF8C00' };
  if (rating >= 2000) return { rank: 'Yellow', color: '#C0C000' };
  if (rating >= 1600) return { rank: 'Blue', color: '#0000FF' };
  if (rating >= 1200) return { rank: 'Cyan', color: '#00C0C0' };
  if (rating >= 800) return { rank: 'Green', color: '#008000' };
  if (rating >= 400) return { rank: 'Brown', color: '#804000' };
  return { rank: 'Gray', color: '#808080' };
}

async function fetchAtCoderProfile(username: string): Promise<AtCoderStats | null> {
  try {
    console.log('Fetching AtCoder profile for:', username);
    
    // Fetch from AtCoder APIs - use official history endpoint for all contests
    const [profileResponse, historyResponse, submissionResponse] = await Promise.all([
      fetchWithTimeout(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${username}`),
      fetchWithTimeout(`https://atcoder.jp/users/${username}/history/json`),
      fetchWithTimeout(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${username}&from_second=0`),
    ]);

    let acRank = 0;
    let rating = 0;
    let highestRating = 0;
    let contestHistory: any[] = [];
    let acceptedSubmissions = 0;
    let problemsSolved = 0;

    // Parse AC rank
    if (profileResponse.ok) {
      const rankData = await profileResponse.json();
      acRank = rankData?.rank || 0;
      acceptedSubmissions = rankData?.count || 0;
    }

    // Parse contest history from AtCoder's official endpoint
    if (historyResponse.ok) {
      const historyData = await historyResponse.json();
      console.log('Contest history entries:', Array.isArray(historyData) ? historyData.length : 0);
      if (Array.isArray(historyData) && historyData.length > 0) {
        // Get latest rating from the most recent rated contest
        const ratedContests = historyData.filter((c: any) => c.IsRated !== false);
        if (ratedContests.length > 0) {
          const latestRated = ratedContests[ratedContests.length - 1];
          rating = latestRated.NewRating || 0;
          highestRating = ratedContests.reduce((max: number, c: any) => 
            Math.max(max, c.NewRating || 0), 0);
        }
        
        // Map ALL contest history (last 10), fields from official API:
        // ContestName, ContestScreenName, Place, OldRating, NewRating, Performance, IsRated, EndTime
        contestHistory = historyData.slice(-10).reverse().map((c: any) => ({
          contestName: c.ContestName || c.ContestScreenName || 'Unknown Contest',
          rank: c.Place || 0,
          performance: c.Performance || 0,
          newRating: c.NewRating || 0,
          ratingChange: (c.NewRating || 0) - (c.OldRating || 0),
          date: c.EndTime ? new Date(c.EndTime).toISOString().split('T')[0] : 'Unknown',
        }));
      }
    }

    // Parse submissions to get problems solved and heatmap
    const heatmapData: { date: string; count: number }[] = [];
    const submissionCounts: Record<string, number> = {};
    const solvedProblems = new Set<string>();

    if (submissionResponse.ok) {
      const submissions = await submissionResponse.json();
      if (Array.isArray(submissions)) {
        submissions.forEach((sub: any) => {
          if (sub.result === 'AC') {
            solvedProblems.add(sub.problem_id);
          }
          
          const date = new Date(sub.epoch_second * 1000).toISOString().split('T')[0];
          submissionCounts[date] = (submissionCounts[date] || 0) + 1;
        });
        
        problemsSolved = solvedProblems.size;
      }
    }

    // Generate heatmap for last 12 months
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - (52 * 7));
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const currentDate = new Date(startDate);
    while (currentDate <= now) {
      const dateStr = currentDate.toISOString().split('T')[0];
      heatmapData.push({
        date: dateStr,
        count: submissionCounts[dateStr] || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const { rank, color } = getRankFromRating(rating);

    return {
      profile: {
        username,
        rating,
        highestRating,
        rank,
        rankColor: color,
        country: 'India',
        affiliation: '',
        contestsParticipated: contestHistory.length,
        problemsSolved,
        acceptedSubmissions,
        globalRank: acRank,
      },
      contestHistory,
      heatmap: heatmapData,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching AtCoder profile:', error);
    return null;
  }
}

// Fallback stats
function getFallbackStats(username: string): AtCoderStats {
  return {
    profile: {
      username,
      rating: 0,
      highestRating: 0,
      rank: 'Unrated',
      rankColor: '#808080',
      country: 'India',
      affiliation: '',
      contestsParticipated: 0,
      problemsSolved: 0,
      acceptedSubmissions: 0,
      globalRank: 0,
    },
    contestHistory: [],
    heatmap: [],
    lastUpdated: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let username = 'MrCoder420';

    try {
      const body = await req.json();
      if (body?.username) {
        username = body.username;
      }
    } catch {
      // Use default username
    }

    console.log('Fetching AtCoder stats for:', username);

    const stats = await fetchAtCoderProfile(username);

    if (!stats) {
      console.log('AtCoder fetch failed, using fallback');
      const fallbackStats = getFallbackStats(username);
      return new Response(JSON.stringify(fallbackStats), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AtCoder stats function:', error);
    const fallbackStats = getFallbackStats('MrCoder420');
    return new Response(JSON.stringify(fallbackStats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

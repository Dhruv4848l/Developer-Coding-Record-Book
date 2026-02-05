const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

interface ContestHistoryItem {
  contestName: string;
  startTime: number;
  ranking: number;
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  finishTime: number;
}

interface LeetCodeStats {
  username: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptanceRate: string;
  submissionCalendar: Record<string, number>;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: string;
  attendedContestsCount: number;
  contestHistory: ContestHistoryItem[];
}

interface ContestInfo {
  contestId: number;
  contestName: string;
  contestSlug: string;
  startTime: number;
  finishTime: number;
  ranking: number;
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  ratingChange: number;
}

interface ContestRankingInfo {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  // Query for user profile and submission stats
  const userProfileQuery = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
         submitStats {
           acSubmissionNum {
             difficulty
             count
             submissions
           }
           totalSubmissionNum {
             difficulty
             count
             submissions
           }
         }
        submissionCalendar
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        contest {
          title
          startTime
        }
      }
    }
  `;

  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
    },
    body: JSON.stringify({
      query: userProfileQuery,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'GraphQL error');
  }

  const user = data.data?.matchedUser;
  if (!user) {
    throw new Error('User not found');
  }

  // Parse submission stats
  const acStats = user.submitStatsGlobal?.acSubmissionNum || [];
  const easySolved = acStats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acStats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
  const hardSolved = acStats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
  const totalSolved = acStats.find((s: any) => s.difficulty === 'All')?.count || (easySolved + mediumSolved + hardSolved);

  // Calculate acceptance rate
  const submitStats = user.submitStats;
  let acceptanceRate = '0%';
  if (submitStats) {
    const totalAcSubmissions = submitStats.acSubmissionNum?.find((s: any) => s.difficulty === 'All')?.submissions || 0;
    const totalSubmissionsCount = submitStats.totalSubmissionNum?.find((s: any) => s.difficulty === 'All')?.submissions || 0;
    if (totalSubmissionsCount > 0) {
      acceptanceRate = ((totalAcSubmissions / totalSubmissionsCount) * 100).toFixed(1) + '%';
    }
  }

  // Parse submission calendar (JSON string -> object)
  let submissionCalendar: Record<string, number> = {};
  try {
    submissionCalendar = JSON.parse(user.submissionCalendar || '{}');
  } catch {
    submissionCalendar = {};
  }

  // Calculate total submissions from calendar
  const totalSubmissions = Object.values(submissionCalendar).reduce((sum, count) => sum + count, 0);

  // Parse contest ranking info
  const contestRanking = data.data?.userContestRanking;
  const contestHistory = data.data?.userContestRankingHistory || [];

  // Process contest history - only attended contests
  const attendedContests = contestHistory
    .filter((c: any) => c.attended)
    .map((c: any) => ({
      contestName: c.contest?.title || 'Unknown Contest',
      startTime: c.contest?.startTime || 0,
      ranking: c.ranking || 0,
      problemsSolved: c.problemsSolved || 0,
      totalProblems: c.totalProblems || 0,
      rating: Math.round(c.rating || 0),
      finishTime: c.finishTimeInSeconds || 0,
    }))
    .sort((a: any, b: any) => b.startTime - a.startTime); // Most recent first

  return {
    username: user.username,
    ranking: user.profile?.ranking || contestRanking?.globalRanking || 0,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalSubmissions,
    acceptanceRate,
    submissionCalendar,
    contestRating: contestRanking?.rating ? Math.round(contestRanking.rating) : 0,
    contestGlobalRanking: contestRanking?.globalRanking || 0,
    contestTopPercentage: contestRanking?.topPercentage ? contestRanking.topPercentage.toFixed(2) : '0',
    attendedContestsCount: contestRanking?.attendedContestsCount || 0,
    contestHistory: attendedContests,
  };
}

function processHeatmapData(submissionCalendar: Record<string, number>) {
  const heatmap: { date: string; count: number }[] = [];
  
  // Get date range for last 12 months
  const now = new Date();
  const endDate = new Date(now);
  endDate.setHours(0, 0, 0, 0);
  
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (52 * 7));
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const timestamp = Math.floor(currentDate.getTime() / 1000);
    const count = submissionCalendar[timestamp.toString()] || 0;
    
    heatmap.push({
      date: currentDate.toISOString().split('T')[0],
      count,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return heatmap;
}

function calculateStreaks(heatmap: { date: string; count: number }[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Current streak (counting backwards from today)
  for (let i = heatmap.length - 1; i >= 0; i--) {
    if (heatmap[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Longest streak
  for (const day of heatmap) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  const activeDays = heatmap.filter(day => day.count > 0).length;
  
  return { currentStreak, longestStreak, activeDays };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let username = 'Ydp5K7DIfv';
    
    // Try to get username from request body first (for POST requests)
    try {
      const body = await req.json();
      if (body?.username) {
        username = body.username;
      }
    } catch {
      // If no body, try URL params
      const url = new URL(req.url);
      const urlUsername = url.searchParams.get('username');
      if (urlUsername) {
        username = urlUsername;
      }
    }
    
    console.log('Fetching LeetCode stats for:', username);
    
    const stats = await fetchLeetCodeStats(username);
    const heatmap = processHeatmapData(stats.submissionCalendar);
    const streaks = calculateStreaks(heatmap);
    
    const result = {
      profile: {
        username: stats.username,
        ranking: stats.ranking,
        totalSolved: stats.totalSolved,
        easySolved: stats.easySolved,
        mediumSolved: stats.mediumSolved,
        hardSolved: stats.hardSolved,
        totalSubmissions: stats.totalSubmissions,
        acceptanceRate: stats.acceptanceRate,
        ...streaks,
        contestRating: stats.contestRating,
        contestGlobalRanking: stats.contestGlobalRanking,
        contestTopPercentage: stats.contestTopPercentage,
        attendedContestsCount: stats.attendedContestsCount,
      },
      contestHistory: stats.contestHistory,
      heatmap,
      lastUpdated: new Date().toISOString(),
    };
    
    console.log('LeetCode stats result:', JSON.stringify(result.profile));
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to fetch stats' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
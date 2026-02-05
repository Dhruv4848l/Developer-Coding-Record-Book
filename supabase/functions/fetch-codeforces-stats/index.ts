const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  registrationTimeSeconds: number;
  avatar: string;
  titlePhoto: string;
}

interface CodeforcesSubmission {
  id: number;
  creationTimeSeconds: number;
  problem: {
    name: string;
    index: string;
    rating?: number;
    tags: string[];
  };
  verdict: string;
}

interface CodeforcesContest {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
}

async function fetchUserInfo(handle: string): Promise<CodeforcesUser | null> {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result.length > 0) {
      return data.result[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

async function fetchUserSubmissions(handle: string): Promise<CodeforcesSubmission[]> {
  try {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    }
    return [];
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
}

async function fetchUserRatingHistory(handle: string): Promise<CodeforcesContest[]> {
  try {
    const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    }
    return [];
  } catch (error) {
    console.error('Error fetching rating history:', error);
    return [];
  }
}

function generateHeatmap(submissions: CodeforcesSubmission[]): { date: string; count: number }[] {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  // Create a map of dates to submission counts
  const submissionCounts: Record<string, number> = {};
  
  submissions.forEach(sub => {
    const date = new Date(sub.creationTimeSeconds * 1000);
    if (date >= oneYearAgo) {
      const dateStr = date.toISOString().split('T')[0];
      submissionCounts[dateStr] = (submissionCounts[dateStr] || 0) + 1;
    }
  });
  
  // Generate complete heatmap data
  const heatmapData: { date: string; count: number }[] = [];
  const currentDate = new Date(oneYearAgo);
  
  while (currentDate <= now) {
    const dateStr = currentDate.toISOString().split('T')[0];
    heatmapData.push({
      date: dateStr,
      count: submissionCounts[dateStr] || 0,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return heatmapData;
}

function calculateStreaks(heatmap: { date: string; count: number }[]): { currentStreak: number; longestStreak: number } {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Calculate longest streak
  for (const day of heatmap) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  // Calculate current streak (from today backwards)
  const reversed = [...heatmap].reverse();
  for (const day of reversed) {
    if (day.count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  return { currentStreak, longestStreak };
}

function countUniqueProblemsSolved(submissions: CodeforcesSubmission[]): number {
  const solved = new Set<string>();
  
  submissions.forEach(sub => {
    if (sub.verdict === 'OK') {
      const problemId = `${sub.problem.index}-${sub.problem.name}`;
      solved.add(problemId);
    }
  });
  
  return solved.size;
}

function getRankColor(rank: string): string {
  const rankLower = rank?.toLowerCase() || '';
  if (rankLower.includes('legendary')) return '#FF0000';
  if (rankLower.includes('international grandmaster')) return '#FF0000';
  if (rankLower.includes('grandmaster')) return '#FF0000';
  if (rankLower.includes('international master')) return '#FF8C00';
  if (rankLower.includes('master')) return '#FF8C00';
  if (rankLower.includes('candidate master')) return '#AA00AA';
  if (rankLower.includes('expert')) return '#0000FF';
  if (rankLower.includes('specialist')) return '#03A89E';
  if (rankLower.includes('pupil')) return '#008000';
  return '#808080'; // newbie
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let handle = 'Ordinary_Coder_420';
    
    // Try to get handle from request body
    try {
      const body = await req.json();
      if (body?.handle) {
        handle = body.handle;
      }
    } catch {
      // If no body, use default handle
    }
    
    const [userInfo, submissions, ratingHistory] = await Promise.all([
      fetchUserInfo(handle),
      fetchUserSubmissions(handle),
      fetchUserRatingHistory(handle),
    ]);
    
    if (!userInfo) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const heatmap = generateHeatmap(submissions);
    const { currentStreak, longestStreak } = calculateStreaks(heatmap);
    const problemsSolved = countUniqueProblemsSolved(submissions);
    const activeDays = heatmap.filter(d => d.count > 0).length;
    
    // Get recent contests (last 10)
    const recentContests = ratingHistory.slice(-10).reverse().map(contest => ({
      name: contest.contestName,
      rank: contest.rank,
      oldRating: contest.oldRating,
      newRating: contest.newRating,
      ratingChange: contest.newRating - contest.oldRating,
    }));
    
    const stats = {
      profile: {
        handle: userInfo.handle,
        rating: userInfo.rating || 0,
        maxRating: userInfo.maxRating || 0,
        rank: userInfo.rank || 'newbie',
        maxRank: userInfo.maxRank || 'newbie',
        contribution: userInfo.contribution || 0,
        friendOfCount: userInfo.friendOfCount || 0,
        avatar: userInfo.avatar,
        problemsSolved,
        totalSubmissions: submissions.length,
        activeDays,
        currentStreak,
        longestStreak,
        contestsParticipated: ratingHistory.length,
        rankColor: getRankColor(userInfo.rank),
        maxRankColor: getRankColor(userInfo.maxRank),
      },
      heatmap,
      recentContests,
      ratingHistory: ratingHistory.map(r => ({
        contestId: r.contestId,
        contestName: r.contestName,
        rank: r.rank,
        rating: r.newRating,
        ratingChange: r.newRating - r.oldRating,
      })),
      lastUpdated: new Date().toISOString(),
    };
    
    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

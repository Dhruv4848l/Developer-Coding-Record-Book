import express from 'express';
import cache from '../lib/cache';

const router = express.Router();

function validateUsername(username: unknown): { valid: boolean; error?: string } {
  if (!username || typeof username !== 'string') return { valid: false, error: 'Username is required' };
  if (username.length < 1 || username.length > 50) return { valid: false, error: 'Username must be between 1 and 50 characters' };
  if (!/^[a-zA-Z0-9_.\-]+$/.test(username)) return { valid: false, error: 'Username contains invalid characters' };
  return { valid: true };
}

const rateLimiter = new Map<string, number[]>();
function checkRateLimit(ip: string, limit = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = (rateLimiter.get(ip) || []).filter(t => now - t < windowMs);
  if (requests.length >= limit) return false;
  requests.push(now);
  rateLimiter.set(ip, requests);
  return true;
}

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

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
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

  // We use node-fetch or native fetch in Node 18+
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

  const acStats = user.submitStatsGlobal?.acSubmissionNum || [];
  const easySolved = acStats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acStats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
  const hardSolved = acStats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
  const totalSolved = acStats.find((s: any) => s.difficulty === 'All')?.count || (easySolved + mediumSolved + hardSolved);

  const submitStats = user.submitStats;
  let acceptanceRate = '0%';
  if (submitStats) {
    const totalAcSubmissions = submitStats.acSubmissionNum?.find((s: any) => s.difficulty === 'All')?.submissions || 0;
    const totalSubmissionsCount = submitStats.totalSubmissionNum?.find((s: any) => s.difficulty === 'All')?.submissions || 0;
    if (totalSubmissionsCount > 0) {
      acceptanceRate = ((totalAcSubmissions / totalSubmissionsCount) * 100).toFixed(1) + '%';
    }
  }

  let submissionCalendar: Record<string, number> = {};
  try {
    submissionCalendar = JSON.parse(user.submissionCalendar || '{}');
  } catch {
    submissionCalendar = {};
  }

  const totalSubmissions = Object.values(submissionCalendar).reduce((sum, count) => sum + count, 0);

  const contestRanking = data.data?.userContestRanking;
  const contestHistory = data.data?.userContestRankingHistory || [];

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
    .sort((a: any, b: any) => b.startTime - a.startTime);

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
  
  // Count by UTC date string
  const countByDate: Record<string, number> = {};
  for (const [timestampStr, count] of Object.entries(submissionCalendar)) {
    const date = new Date(parseInt(timestampStr) * 1000);
    // timestamp is midnight UTC, so this gives the proper UTC date string
    const dateString = date.toISOString().split('T')[0];
    countByDate[dateString] = (countByDate[dateString] || 0) + count;
  }

  // To build the grid, use UTC calendar math from today
  const now = new Date();
  const todayDateStr = now.toISOString().split('T')[0];
  const endDate = new Date(todayDateStr + 'T00:00:00Z');
  
  const startDate = new Date(endDate.getTime());
  startDate.setUTCDate(startDate.getUTCDate() - (52 * 7));
  const dayOfWeek = startDate.getUTCDay(); // 0 is Sunday
  startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek);
  
  const currentDate = new Date(startDate.getTime());
  while (currentDate <= endDate) {
    const isoDateStr = currentDate.toISOString().split('T')[0];
    const count = countByDate[isoDateStr] || 0;
    
    heatmap.push({
      date: isoDateStr,
      count,
    });
    
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  
  return heatmap;
}

function calculateStreaks(heatmap: { date: string; count: number }[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  let i = heatmap.length - 1;
  if (i >= 0 && heatmap[i].count === 0) {
    i--;
  }
  
  for (; i >= 0; i--) {
    if (heatmap[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
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

router.post('/', async (req, res) => {
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    let username = 'Ordinary_Coder_Here';
    
    if (req.body?.username) {
      username = req.body.username;
    } else if (req.query?.username) {
      username = req.query.username as string;
    }

    const validation = validateUsername(username);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    
    const forceSync = req.query.force === 'true';
    const cacheKey = `leetcode_${username}`;

    if (!forceSync && cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
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
    cache.set(cacheKey, result);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch stats' });
  }
});

export default router;

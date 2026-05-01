import express from 'express';

const router = express.Router();

const rateLimiter = new Map<string, number[]>();
function checkRateLimit(ip: string, limit = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = (rateLimiter.get(ip) || []).filter(t => now - t < windowMs);
  if (requests.length >= limit) return false;
  requests.push(now);
  rateLimiter.set(ip, requests);
  return true;
}

interface Contest {
  platform: string;
  name: string;
  startTime: string;
  duration: string;
  url: string;
  colorClass: string;
  bgClass: string;
}

async function fetchDigitomizeContests(): Promise<Contest[]> {
  try {
    const response = await fetch('https://api.digitomize.com/contests');
    const data = await response.json();
    const contests = data?.results || (Array.isArray(data) ? data : []);
    if (!contests || !Array.isArray(contests) || contests.length === 0) return [];

    const now = new Date();
    return contests
      .filter((contest: any) => new Date(contest.startTimeUnix * 1000) > now)
      .map((contest: any) => {
        const platform = (contest.host || '').toLowerCase();
        let colorClass = 'text-primary';
        let bgClass = 'bg-primary/10';

        if (platform.includes('leetcode')) { colorClass = 'text-leetcode'; bgClass = 'bg-leetcode/10'; }
        else if (platform.includes('codeforces')) { colorClass = 'text-codeforces'; bgClass = 'bg-codeforces/10'; }
        else if (platform.includes('codechef')) { colorClass = 'text-codechef'; bgClass = 'bg-codechef/10'; }
        else if (platform.includes('atcoder')) { colorClass = 'text-atcoder'; bgClass = 'bg-atcoder/10'; }
        else if (platform.includes('geeksforgeeks') || platform.includes('gfg')) { colorClass = 'text-gfg'; bgClass = 'bg-gfg/10'; }
        else if (platform.includes('hackerrank')) { colorClass = 'text-hackerrank'; bgClass = 'bg-hackerrank/10'; }

        const durationMinutes = contest.duration || 0;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = Math.floor(durationMinutes % 60);
        const durationStr = hours > 0 ? (minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`) : `${minutes}m`;

        return {
          platform: contest.host || 'Unknown',
          name: contest.name || 'Unnamed Contest',
          startTime: new Date(contest.startTimeUnix * 1000).toISOString(),
          duration: durationStr,
          url: contest.url || '#',
          colorClass,
          bgClass,
        };
      });
  } catch (error) {
    return [];
  }
}

async function fetchLeetCodeContests(): Promise<Contest[]> {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query { topTwoContests { title startTime duration } }`
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
    return [];
  }
}

router.post('/', async (req, res) => {
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    const [digitomize, leetcode, codeforces, codechef] = await Promise.all([
      fetchDigitomizeContests(),
      fetchLeetCodeContests(),
      fetchCodeforcesContests(),
      fetchCodeChefContests(),
    ]);

    const digitomizeNames = new Set(digitomize.map(c => c.name.toLowerCase().trim()));
    
    const filteredLeetcode = leetcode.filter(c => !digitomizeNames.has(c.name.toLowerCase().trim()));
    const filteredCodeforces = codeforces.filter(c => !digitomizeNames.has(c.name.toLowerCase().trim()));
    const filteredCodechef = codechef.filter(c => !digitomizeNames.has(c.name.toLowerCase().trim()));

    const allContests = [...digitomize, ...filteredLeetcode, ...filteredCodeforces, ...filteredCodechef]
      .filter(c => new Date(c.startTime) > new Date())
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 15);

    return res.json({ contests: allContests, lastUpdated: new Date().toISOString() });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to fetch contests' });
  }
});

export default router;

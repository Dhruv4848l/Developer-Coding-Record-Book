import express from 'express';

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

interface GFGStats {
  username: string;
  name: string;
  profileUrl: string;
  instituteRank: string;
  instituteName: string;
  codingScore: number;
  problemsSolved: number;
  monthlyCodingScore: number;
  currentStreak: number;
  maxStreak: number;
  languages: string[];
  solvedByDifficulty: {
    school: number;
    basic: number;
    easy: number;
    medium: number;
    hard: number;
  };
}

async function fetchWithTimeout(url: string, options: RequestInit, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function fetchFromAuthGFGAPI(username: string): Promise<GFGStats | null> {
  try {
    const response = await fetchWithTimeout(
      `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`,
      { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } },
      8000
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.data) return null;

    const userInfo = data.data;
    return {
      username: username,
      name: userInfo.name || '',
      profileUrl: `https://www.geeksforgeeks.org/user/${username}`,
      instituteRank: userInfo.institute_rank?.toString() || 'N/A',
      instituteName: userInfo.institute_name || 'N/A',
      codingScore: parseInt(userInfo.score) || 0,
      problemsSolved: parseInt(userInfo.total_problems_solved) || 0,
      monthlyCodingScore: parseInt(userInfo.monthly_score) || 0,
      currentStreak: parseInt(userInfo.pod_solved_current_streak) || 0,
      maxStreak: parseInt(userInfo.pod_solved_longest_streak) || 0,
      languages: [],
      solvedByDifficulty: { school: 0, basic: 0, easy: 0, medium: 0, hard: 0 },
    };
  } catch (error) {
    return null;
  }
}

async function fetchFromVercelAPI(username: string): Promise<GFGStats | null> {
  try {
    const response = await fetchWithTimeout(
      `https://geeksforgeeksapi.vercel.app/api/gfg?username=${username}`,
      { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' } },
      8000
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.error) return null;
    
    return {
      username: data.username || username,
      name: '',
      profileUrl: `https://www.geeksforgeeks.org/user/${username}`,
      instituteRank: data.globalRank || 'N/A',
      instituteName: 'N/A',
      codingScore: parseInt(data.codingScore) || 0,
      problemsSolved: parseInt(data.codingStats?.problemsSolved) || 0,
      monthlyCodingScore: 0,
      currentStreak: parseInt(data.streak) || 0,
      maxStreak: 0,
      languages: [],
      solvedByDifficulty: {
        school: parseInt(data.school) || 0,
        basic: parseInt(data.basic) || 0,
        easy: parseInt(data.easy) || 0,
        medium: parseInt(data.medium) || 0,
        hard: parseInt(data.hard) || 0,
      },
    };
  } catch (error) {
    return null;
  }
}

function getFallbackStats(username: string): GFGStats {
  return {
    username: username,
    name: 'Dhruv Maji',
    profileUrl: `https://www.geeksforgeeks.org/user/${username}`,
    instituteRank: 'N/A',
    instituteName: 'Parul Institute of Engineering and Technology',
    codingScore: 450,
    problemsSolved: 180,
    monthlyCodingScore: 25,
    currentStreak: 5,
    maxStreak: 23,
    languages: ['C++', 'Java', 'Python'],
    solvedByDifficulty: { school: 15, basic: 45, easy: 70, medium: 40, hard: 10 },
  };
}

router.post('/', async (req, res) => {
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    let username = 'dhruvmaji8b4b';
    if (req.body?.username) username = req.body.username;
    else if (req.query?.username) username = req.query.username as string;

    const validation = validateUsername(username);
    if (!validation.valid) return res.status(400).json({ error: validation.error });
    
    const [authStats, vercelStats] = await Promise.all([
      fetchFromAuthGFGAPI(username).catch(() => null),
      fetchFromVercelAPI(username).catch(() => null),
    ]);
    
    if (authStats) {
      if (vercelStats && vercelStats.solvedByDifficulty) {
        authStats.solvedByDifficulty = vercelStats.solvedByDifficulty;
      }
      return res.json({ ...authStats, lastUpdated: new Date().toISOString() });
    }
    
    if (vercelStats) {
      return res.json({ ...vercelStats, lastUpdated: new Date().toISOString() });
    }
    
    return res.json({ ...getFallbackStats(username), lastUpdated: new Date().toISOString() });
  } catch (error) {
    console.error('Error in GFG stats function:', error);
    return res.json({ ...getFallbackStats('dhruvmaji8b4b'), lastUpdated: new Date().toISOString() });
  }
});

export default router;

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

interface CodeChefContest {
  code: string;
  name: string;
  rating: number;
  rank: number;
  date: string;
}

interface CodeChefStats {
  profile: {
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
  };
  ratingHistory: CodeChefContest[];
  lastUpdated: string;
}

async function fetchCodeChefProfile(username: string): Promise<CodeChefStats | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('CodeChef profile page not ok:', response.status);
      return null;
    }

    const html = await response.text();

    let rating = 0;
    let highestRating = 0;
    let stars = 0;
    let globalRank = 0;
    let countryRank = 0;
    let problemsSolved = 0;
    let contestsParticipated = 0;

    const solvedPatterns = [
      /<h3[^>]*>Fully Solved[^<]*<\/h3>\s*<span[^>]*>(\d+)/i,
      /Fully\s*Solved[^0-9]*(\d+)/i,
      /Problems\s*Solved[^0-9]*(\d+)/i,
      /"problemsSolved":\s*(\d+)/i,
      /fully_solved[":]+\s*(\d+)/i,
    ];

    for (const pattern of solvedPatterns) {
      const match = html.match(pattern);
      if (match) {
        problemsSolved = parseInt(match[1]);
        break;
      }
    }

    const ratingPatterns = [
      /class="rating"[^>]*>\s*(\d+)/is,
      /rating-number[^>]*>\s*(\d+)/is,
      /"currentRating":\s*(\d+)/i,
    ];

    for (const pattern of ratingPatterns) {
      const match = html.match(pattern);
      if (match) {
        rating = parseInt(match[1]);
        break;
      }
    }

    const highestMatch = html.match(/Highest Rating[^0-9]*(\d+)/i);
    if (highestMatch) {
      highestRating = parseInt(highestMatch[1]);
    }

    const starsMatch = html.match(/(\d+)\s*(?:★|star)/i);
    if (starsMatch) {
      stars = parseInt(starsMatch[1]);
    }

    const globalRankMatch = html.match(/Global\s*Rank[^0-9]*(\d+)/i);
    if (globalRankMatch) {
      globalRank = parseInt(globalRankMatch[1]);
    }

    const countryRankMatch = html.match(/Country\s*Rank[^0-9]*(\d+)/i);
    if (countryRankMatch) {
      countryRank = parseInt(countryRankMatch[1]);
    }

    let ratingHistory: CodeChefContest[] = [];

    const ratingArrayMatch = html.match(/all_rating\s*=\s*(\[.*?\])\s*;/);
    if (ratingArrayMatch && ratingArrayMatch[1].trim()) {
      try {
        const rawArray = JSON.parse(ratingArrayMatch[1]);
        if (Array.isArray(rawArray)) {
          contestsParticipated = rawArray.length;
          ratingHistory = rawArray.map((item: any) => ({
            code: item.code || '',
            name: item.name || '',
            rating: parseInt(item.rating, 10) || 0,
            rank: parseInt(item.rank, 10) || 0,
            date: item.end_date || `${item.getyear}-${item.getmonth}-${item.getday}`
          }));
        }
      } catch (e) {
        console.error('Failed to parse CodeChef rating array:', e);
      }
    }

    if (stars === 0 && rating > 0) {
      if (rating >= 2500) stars = 7;
      else if (rating >= 2200) stars = 6;
      else if (rating >= 2000) stars = 5;
      else if (rating >= 1800) stars = 4;
      else if (rating >= 1600) stars = 3;
      else if (rating >= 1400) stars = 2;
      else stars = 1;
    }

    const stats: CodeChefStats = {
      profile: {
        username,
        rating,
        highestRating: highestRating || rating,
        stars,
        globalRank,
        countryRank,
        problemsSolved,
        contestsParticipated,
        division: stars > 0 ? `${stars} Star` : 'Unrated',
        country: 'India',
      },
      ratingHistory,
      lastUpdated: new Date().toISOString(),
    };

    return stats;
  } catch (error) {
    console.error('Error fetching CodeChef profile:', error);
    return null;
  }
}

router.post('/', async (req, res) => {
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    let username = 'cooking_coder';

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
    const cacheKey = `codechef_${username}`;

    if (!forceSync && cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const stats = await fetchCodeChefProfile(username);

    if (!stats) {
      return res.status(404).json({ error: 'User not found or API unavailable' });
    }

    cache.set(cacheKey, stats);
    return res.json(stats);
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;

import express from 'express';
import cache from '../lib/cache';

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

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000): Promise<Response> {
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

async function getHackerRankStats(username: string) {
  try {
    const defaultHeaders = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
    
    // Fetch all required data concurrently
    const [profileRes, historyRes, badgesRes] = await Promise.all([
      fetchWithTimeout(`https://www.hackerrank.com/rest/hackers/${username}`, { headers: defaultHeaders }),
      fetchWithTimeout(`https://www.hackerrank.com/rest/hackers/${username}/submission_histories`, { headers: defaultHeaders }),
      fetchWithTimeout(`https://www.hackerrank.com/rest/hackers/${username}/badges`, { headers: defaultHeaders }),
    ]);

    if (!profileRes.ok) throw new Error('HackerRank profile not found');

    const profileData = await profileRes.json();
    const historyData = historyRes.ok ? await historyRes.json() : {};
    const badgesData = badgesRes.ok ? await badgesRes.json() : { models: [] };

    const name = profileData.model?.name || username;
    
    // Calculate problems solved from badges
    let problemsSolved = 0;
    let bestRank = Infinity;
    
    const badges = (badgesData.models || []).map((b: any) => ({
      name: b.badge_name || b.badge_type || "Unknown",
      category: b.category_name || "General",
      stars: b.stars || 0
    }));

    if (badgesData.models && Array.isArray(badgesData.models)) {
      badgesData.models.forEach((badge: any) => {
        problemsSolved += (badge.solved || 0);
        if (badge.hacker_rank && badge.hacker_rank > 0 && badge.hacker_rank < bestRank) {
          bestRank = badge.hacker_rank;
        }
      });
    }
    
    if (bestRank === Infinity) bestRank = 0;

    // Process heatmap history format: { "YYYY-MM-DD": count, ... }
    const heatmapData: { date: string; count: number }[] = [];
    let totalSubmissions = 0;
    let activeDays = 0;
    
    Object.keys(historyData).forEach(dateStr => {
      const count = parseInt(historyData[dateStr]) || 0;
      if (count > 0) {
         heatmapData.push({ date: dateStr, count });
         totalSubmissions += count;
         activeDays += 1;
      }
    });

    // We must generate a filled heatmap spanning 52 weeks
    const now = new Date();
    const endDate = new Date(now);
    endDate.setHours(0, 0, 0, 0);
    
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (52 * 7));
    startDate.setDate(startDate.getDate() - startDate.getDay()); // go back to Sunday
    
    const filledHeatmap: { date: string; count: number }[] = [];
    const submissionsByDate: Record<string, number> = historyData;
    
    const currentDate = new Date(startDate);
    let tempStreak = 0;
    let longestStreak = 0;
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = submissionsByDate[dateStr] ? Number(submissionsByDate[dateStr]) : 0;
      
      filledHeatmap.push({ date: dateStr, count });
      
      if (count > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate current streak
    let currentStreak = 0;
    const checkDate = new Date(endDate);
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (submissionsByDate[dateStr] && submissionsByDate[dateStr] > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === endDate.toISOString().split('T')[0]) {
        // If today is empty, check yesterday before breaking streak
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      profile: {
        username,
        name,
        globalRank: bestRank,
        problemsSolved, 
        totalSubmissions,
        activeDays,
        currentStreak,
        longestStreak,
      },
      badges,
      heatmap: filledHeatmap,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error in HackerRank scraping:', error);
    throw error;
  }
};

router.post('/', async (req, res) => {
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    let username = 'dhruvmajiever191';
    if (req.body?.username) username = req.body.username;
    else if (req.query?.username) username = req.query.username as string;

    const forceSync = req.query.force === 'true';
    const cacheKey = `hackerrank_${username}`;

    if (!forceSync && cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const stats = await getHackerRankStats(username);
    cache.set(cacheKey, stats);
    return res.json(stats);
  } catch (error) {
    console.error('Error fetching HackerRank/Codolio stats:', error);
    return res.status(500).json({ error: 'Failed to fetch HackerRank stats' });
  }
});

export default router;

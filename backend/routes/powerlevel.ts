import express from 'express';
import cache from '../lib/cache';

const router = express.Router();

const rankTitles = [
  { max: 500, title: "Novice" },
  { max: 1000, title: "Cyber Initiate" },
  { max: 1500, title: "Adept" },
  { max: 2000, title: "Cyber Warrior" },
  { max: 3000, title: "Void Knight" },
  { max: 4000, title: "System Commander" },
  { max: 5000, title: "Arch-Mage" },
  { max: 6000, title: "Grandmaster" },
  { max: Infinity, title: "Void Vanguard" }
];

router.post('/', async (req, res) => {
  const { leetcode, codeforces, codechef, hackerrank } = req.body;
  
  if (!leetcode || !codeforces || !codechef || !hackerrank) {
    return res.status(400).json({ error: "Missing platform username(s). Please provide leetcode, codeforces, codechef, and hackerrank." });
  }

  const forceSync = req.query.force === 'true';
  const cacheKey = `powerlevel_${leetcode}_${codeforces}_${codechef}_${hackerrank}`;

  if (!forceSync && cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  const port = process.env.PORT || 5000;
  // pass force flag to child APIs if forceSync is true
  const baseUrl = `http://localhost:${port}/api`;
  const suffix = forceSync ? '?force=true' : '';

  try {
    const urls = [
      fetch(`${baseUrl}/leetcode${suffix}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: leetcode }) }),
      fetch(`${baseUrl}/codeforces${suffix}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ handle: codeforces }) }),
      fetch(`${baseUrl}/codechef${suffix}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: codechef }) }),
      fetch(`${baseUrl}/codolio${suffix}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: hackerrank }) })
    ];

    const [lcRes, cfRes, ccRes, hrRes] = await Promise.allSettled(urls);

    let lcData: any, cfData: any, ccData: any, hrData: any;

    if (lcRes.status === 'fulfilled' && lcRes.value.ok) lcData = await lcRes.value.json();
    if (cfRes.status === 'fulfilled' && cfRes.value.ok) cfData = await cfRes.value.json();
    if (ccRes.status === 'fulfilled' && ccRes.value.ok) ccData = await ccRes.value.json();
    if (hrRes.status === 'fulfilled' && hrRes.value.ok) hrData = await hrRes.value.json();

    const lcRating = lcData?.profile?.contestRating || 0;
    const cfRating = cfData?.profile?.rating || 0;
    const ccRating = ccData?.profile?.rating || 0;

    const lcSolved = lcData?.profile?.totalSolved || 0;
    const cfSolved = cfData?.profile?.problemsSolved || 0;
    const ccSolved = ccData?.profile?.problemsSolved || 0;
    const hrSolved = hrData?.profile?.problemsSolved || 0; 
    
    // Total problems solved
    let totalSolved = lcSolved + cfSolved + ccSolved + hrSolved;

    // Formula: Base = (LC_Rating * 1.5) + CF_Rating + (CodeChef_Rating * 0.8)
    const baseScore = (lcRating * 1.5) + cfRating + (ccRating * 0.8);
    // Multiplier = 1 + (Total_Problems_Solved / 5000)
    const multiplier = 1 + (totalSolved / 5000);

    const totalPowerLevel = Math.round(baseScore * multiplier);

    const currentRank = rankTitles.find(r => totalPowerLevel <= r.max) || rankTitles[rankTitles.length - 1];
    
    // Find next rank to calculate progress
    const rankIndex = rankTitles.findIndex(r => r.title === currentRank.title);
    const prevRankMax = rankIndex > 0 ? rankTitles[rankIndex - 1].max : 0;
    const nextRankMax = currentRank.max === Infinity ? totalPowerLevel : currentRank.max;

    const result = {
        powerLevel: totalPowerLevel,
        rankTitle: currentRank.title,
        baseScore: Math.round(baseScore),
        multiplier: parseFloat(multiplier.toFixed(2)),
        totalSolved,
        rankProgress: {
          current: totalPowerLevel - prevRankMax,
          total: nextRankMax - prevRankMax,
          prevRankMax,
          nextRankMax
        },
        ratings: {
            leetcode: lcRating,
            codeforces: cfRating,
            codechef: ccRating
        }
    };

    cache.set(cacheKey, result);
    return res.json(result);

  } catch (err) {
    console.error("Error in powerlevel:", err);
    return res.status(500).json({ error: "Failed to aggregate power level" });
  }
});

export default router;

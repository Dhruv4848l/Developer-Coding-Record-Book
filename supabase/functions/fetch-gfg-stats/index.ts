const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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

// Fetch with timeout to prevent hanging
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
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
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      8000
    );

    if (!response.ok) {
      console.error('Auth GFG API response not OK:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Auth GFG API response received');

    if (!data.data) {
      console.error('Auth GFG API: No data field in response');
      return null;
    }

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
      solvedByDifficulty: {
        school: 0,
        basic: 0,
        easy: 0,
        medium: 0,
        hard: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching from Auth GFG API:', error);
    return null;
  }
}

async function fetchFromVercelAPI(username: string): Promise<GFGStats | null> {
  try {
    const response = await fetchWithTimeout(
      `https://geeksforgeeksapi.vercel.app/api/gfg?username=${username}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      8000
    );

    if (!response.ok) {
      console.error('Vercel API response not OK:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Vercel API response received');

    if (data.error) {
      console.error('Vercel API error:', data.error);
      return null;
    }
    
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
    console.error('Error fetching from Vercel API:', error);
    return null;
  }
}

// Fallback data for dhruvmaji8b4b when APIs fail
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
    solvedByDifficulty: {
      school: 15,
      basic: 45,
      easy: 70,
      medium: 40,
      hard: 10,
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username') || 'dhruvmaji8b4b';
    
    console.log('Fetching GFG stats for:', username);
    
    // Try both APIs in parallel with timeout
    const [authStats, vercelStats] = await Promise.all([
      fetchFromAuthGFGAPI(username).catch(() => null),
      fetchFromVercelAPI(username).catch(() => null),
    ]);
    
    // Merge the data - prefer auth API for main stats, use vercel for difficulty breakdown
    if (authStats) {
      if (vercelStats && vercelStats.solvedByDifficulty) {
        authStats.solvedByDifficulty = vercelStats.solvedByDifficulty;
      }
      
      return new Response(
        JSON.stringify({
          ...authStats,
          lastUpdated: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Fall back to vercel stats if auth failed
    if (vercelStats) {
      return new Response(
        JSON.stringify({
          ...vercelStats,
          lastUpdated: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Use fallback data if both APIs fail
    console.log('Both APIs failed, using fallback data');
    const fallbackStats = getFallbackStats(username);
    
    return new Response(
      JSON.stringify({
        ...fallbackStats,
        lastUpdated: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in GFG stats function:', error);
    
    // Return fallback data even on complete failure
    const fallbackStats = getFallbackStats('dhruvmaji8b4b');
    return new Response(
      JSON.stringify({
        ...fallbackStats,
        lastUpdated: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

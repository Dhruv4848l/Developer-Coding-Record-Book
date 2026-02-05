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

async function fetchFromAuthGFGAPI(username: string): Promise<GFGStats | null> {
  try {
    // Primary API: auth.geeksforgeeks.org (official)
    const response = await fetch(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('Auth GFG API response not OK:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Auth GFG API response:', JSON.stringify(data));

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
    // Secondary API: GFG-API (Vercel-based) for difficulty breakdown
    const response = await fetch(`https://geeksforgeeksapi.vercel.app/api/gfg?username=${username}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('Vercel API response not OK:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Vercel API response:', JSON.stringify(data));

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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username') || 'dhruvmaji8b4b';
    
    console.log('Fetching GFG stats for:', username);
    
    // Try the auth API first (primary source)
    const authStats = await fetchFromAuthGFGAPI(username);
    
    // Also try to get difficulty breakdown from Vercel API
    const vercelStats = await fetchFromVercelAPI(username);
    
    // Merge the data - prefer auth API for main stats, use vercel for difficulty breakdown
    if (authStats) {
      // Merge difficulty breakdown from vercel if available
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
    
    return new Response(
      JSON.stringify({ error: 'User not found or unable to fetch data' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in GFG stats function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

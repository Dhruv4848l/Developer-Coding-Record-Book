const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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
  lastUpdated: string;
}

// Fetch using CodeChef's internal ratings API
async function fetchRatingHistory(username: string): Promise<{ rating: number; highestRating: number; contests: number } | null> {
  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch profile page:', response.status);
      return null;
    }

    const html = await response.text();
    console.log('HTML length:', html.length);

    // Try to find rating from various patterns
    // Pattern 1: Look for the rating display
    let rating = 0;
    let highestRating = 0;

    // Look for rating in the profile section
    const ratingPatterns = [
      /class="rating"[^>]*>(\d+)/i,
      /rating-number[^>]*>(\d+)/i,
      /"currentRating"\s*:\s*(\d+)/i,
      /Rating:\s*(\d+)/i,
    ];

    for (const pattern of ratingPatterns) {
      const match = html.match(pattern);
      if (match) {
        rating = parseInt(match[1]);
        console.log('Found rating with pattern:', pattern.source, '-> ', rating);
        break;
      }
    }

    // Look for highest rating
    const highestPatterns = [
      /Highest Rating[^<]*<[^>]*>(\d+)/i,
      /"highestRating"\s*:\s*(\d+)/i,
      /max rating[^<]*<[^>]*>(\d+)/i,
    ];

    for (const pattern of highestPatterns) {
      const match = html.match(pattern);
      if (match) {
        highestRating = parseInt(match[1]);
        break;
      }
    }

    // Count contests from rating graph data if available
    let contests = 0;
    const contestMatch = html.match(/all_rating\s*=\s*\[([^\]]+)\]/);
    if (contestMatch) {
      const ratings = contestMatch[1].split(',');
      contests = ratings.length;
    }

    return { rating, highestRating: highestRating || rating, contests };
  } catch (error) {
    console.error('Error fetching rating history:', error);
    return null;
  }
}

async function fetchCodeChefProfile(username: string): Promise<CodeChefStats | null> {
  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.error('CodeChef profile page not ok:', response.status);
      return null;
    }

    const html = await response.text();
    console.log('Fetched HTML, length:', html.length);
    
    // Log a snippet of the HTML for debugging
    console.log('HTML snippet (first 2000 chars):', html.substring(0, 2000));

    // Initialize default values
    let rating = 0;
    let highestRating = 0;
    let stars = 0;
    let globalRank = 0;
    let countryRank = 0;
    let problemsSolved = 0;
    let contestsParticipated = 0;

    // Extract rating - multiple patterns
    const ratingPatterns = [
      /class="rating"[^>]*>\s*(\d+)/is,
      /rating-number[^>]*>\s*(\d+)/is,
      /currentRating[":]+\s*(\d+)/i,
      /<div[^>]*rating[^>]*>(\d+)</i,
    ];

    for (const pattern of ratingPatterns) {
      const match = html.match(pattern);
      if (match) {
        rating = parseInt(match[1]);
        console.log('Found rating:', rating);
        break;
      }
    }

    // Extract highest rating
    const highestMatch = html.match(/Highest Rating[^0-9]*(\d+)/i) ||
                         html.match(/highestRating[":]+\s*(\d+)/i);
    if (highestMatch) {
      highestRating = parseInt(highestMatch[1]);
    }

    // Extract stars - look for star symbols or star count
    const starsMatch = html.match(/(\d+)\s*(?:★|star)/i) ||
                       html.match(/rating-star[^>]*>([★]+)/);
    if (starsMatch) {
      stars = starsMatch[1].length === 1 ? parseInt(starsMatch[1]) : starsMatch[1].length;
    }

    // Extract global rank
    const globalRankMatch = html.match(/Global\s*Rank[^0-9]*(\d+)/i) ||
                            html.match(/globalRank[":]+\s*(\d+)/i);
    if (globalRankMatch) {
      globalRank = parseInt(globalRankMatch[1]);
    }

    // Extract country rank  
    const countryRankMatch = html.match(/Country\s*Rank[^0-9]*(\d+)/i) ||
                              html.match(/countryRank[":]+\s*(\d+)/i);
    if (countryRankMatch) {
      countryRank = parseInt(countryRankMatch[1]);
    }

    // Extract problems solved
    const solvedPatterns = [
      /Fully\s*Solved[^0-9]*(\d+)/i,
      /Problems\s*Solved[^0-9]*(\d+)/i,
      /fully_solved[":]+\s*(\d+)/i,
      /problemsSolved[":]+\s*(\d+)/i,
    ];

    for (const pattern of solvedPatterns) {
      const match = html.match(pattern);
      if (match) {
        problemsSolved = parseInt(match[1]);
        break;
      }
    }

    // Try to extract from JSON embedded in script tags
    const jsonMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({[^<]+})/);
    if (jsonMatch) {
      try {
        const jsonData = JSON.parse(jsonMatch[1]);
        console.log('Found JSON data in page');
        // Extract values from JSON if available
      } catch (e) {
        console.log('Could not parse embedded JSON');
      }
    }

    // Look for rating data array to count contests
    const ratingArrayMatch = html.match(/all_rating\s*=\s*\[([^\]]*)\]/);
    if (ratingArrayMatch && ratingArrayMatch[1].trim()) {
      const ratings = ratingArrayMatch[1].split(',').filter(r => r.trim());
      contestsParticipated = ratings.length;
    }

    // Determine star rating from rating value if not found
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
      lastUpdated: new Date().toISOString(),
    };

    console.log('Parsed stats:', JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Error fetching CodeChef profile:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let username = 'cooking_coder';

    // Try to get username from request body
    try {
      const body = await req.json();
      if (body?.username) {
        username = body.username;
      }
    } catch {
      // If no body, use default username
    }

    console.log('Fetching CodeChef stats for:', username);

    const stats = await fetchCodeChefProfile(username);

    if (!stats) {
      return new Response(
        JSON.stringify({ error: 'User not found or API unavailable' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

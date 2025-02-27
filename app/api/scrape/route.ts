import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeResults } from '@/lib/scrapers/youtube';
import { fetchGitHubResults } from '@/lib/scrapers/github';
import { fetchPapersResults } from '@/lib/scrapers/papers';

// Rate limiting variables
const RATE_LIMIT = 5; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }
    
    // Fetch data based on type
    let results: any = {};
    
    if (type === 'all' || type === 'youtube') {
      results.youtube = await fetchYouTubeResults(query, type === 'youtube' ? limit : 3);
    }
    
    if (type === 'all' || type === 'github') {
      results.github = await fetchGitHubResults(query, type === 'github' ? limit : 3);
    }
    
    if (type === 'all' || type === 'papers') {
      results.papers = await fetchPapersResults(query, type === 'papers' ? limit : 3);
    }
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in scrape API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const ipData = ipRequestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  // Reset count if the window has passed
  if (now > ipData.resetTime) {
    ipData.count = 0;
    ipData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Increment count and check if over limit
  ipData.count += 1;
  ipRequestCounts.set(ip, ipData);
  
  return ipData.count <= RATE_LIMIT;
}
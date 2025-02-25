import { NextRequest, NextResponse } from "next/server";
import { VideoResult } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    // This is a simulated response since we don't have direct YouTube API access
    // In a real app, you would use the YouTube Data API with your API key
    const results: VideoResult[] = generateMockYouTubeResults(query);

    return NextResponse.json(results);
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube results" },
      { status: 500 }
    );
  }
}

// This function generates mock YouTube results based on the query
// In a real application, you would replace this with actual YouTube API calls
function generateMockYouTubeResults(query: string): VideoResult[] {
  const channels = [
    "ML Explained",
    "AI Coffee Break",
    "The AI Epiphany",
    "Code Emporium",
    "StatQuest",
  ];

  const timeframes = [
    "1 month ago",
    "2 months ago",
    "6 months ago",
    "1 year ago",
  ];

  // Generate a deterministic but seemingly random number from a string
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  return Array.from({ length: 5 }, (_, i) => {
    const videoId = hashString(`${query}-video-${i}`)
      .toString(16)
      .substring(0, 11);
    const hash = hashString(`${query}-${i}`);

    return {
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: `${query} Explained: Part ${i + 1} - Research Paper Review`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      views: `${(100 + (hash % 900)).toFixed(1)}K views`,
      published: timeframes[hash % timeframes.length],
      channel: channels[hash % channels.length],
    };
  });
}

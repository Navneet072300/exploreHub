import { NextRequest, NextResponse } from "next/server";
import { RepoResult } from "@/lib/types";

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
    // This is a simulated response since we don't have direct GitHub API access
    // In a real app, you would use the GitHub API with proper authentication
    const results: RepoResult[] = generateMockGitHubResults(query);

    return NextResponse.json(results);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub results" },
      { status: 500 }
    );
  }
}

// This function generates mock GitHub results based on the query
// In a real application, you would replace this with actual GitHub API calls
function generateMockGitHubResults(query: string): RepoResult[] {
  const languages = [
    "Python",
    "TypeScript",
    "PyTorch",
    "TensorFlow",
    "JavaScript",
  ];

  const authors = [
    "huggingface",
    "tensorflow",
    "pytorch",
    "facebookresearch",
    "openai",
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
    const hash = hashString(`${query}-repo-${i}`);
    const repoName =
      query.split(" ").join("-").toLowerCase() + (i > 0 ? `-${i}` : "");
    const authorIndex = hash % authors.length;
    const stars = 50 + (hash % 950);

    return {
      url: `https://github.com/${authors[authorIndex]}/${repoName}`,
      name: repoName,
      stars: stars,
      author: authors[authorIndex],
      forks: Math.max(Math.floor(stars * 0.3), 1),
      language: languages[hash % languages.length],
      description: `Implementation of "${query}" research paper with examples and documentation`,
    };
  });
}

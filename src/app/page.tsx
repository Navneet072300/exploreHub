"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsSection from "@/components/ResultsSection";
import VideoCard from "@/components/VideoCard";
import RepoCard from "@/components/RepoCard";
import LoadingDots from "@/components/LoadingDots";
import { VideoResult, RepoResult } from "@/lib/types";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [repoResults, setRepoResults] = useState<RepoResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      // Fetch YouTube videos
      const videosResponse = await fetch(
        `/api/youtube?query=${encodeURIComponent(searchQuery)}`
      );
      if (!videosResponse.ok) throw new Error("Failed to fetch videos");
      const videos = await videosResponse.json();

      // Fetch GitHub repos
      const reposResponse = await fetch(
        `/api/github?query=${encodeURIComponent(searchQuery)}`
      );
      if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
      const repos = await reposResponse.json();

      setVideoResults(videos);
      setRepoResults(repos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
            Research Paper Explorer
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400">
            Find the best explanations and implementations
          </h2>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* YouTube Results */}
          <ResultsSection title="YouTube Explanations" icon="▶">
            {isLoading ? (
              <LoadingDots />
            ) : videoResults.length > 0 ? (
              videoResults.map((video, index) => (
                <VideoCard key={index} video={video} />
              ))
            ) : query ? (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No video explanations found
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                Enter a paper name to find video explanations
              </div>
            )}
          </ResultsSection>

          {/* GitHub Results */}
          <ResultsSection title="Code Implementations" icon="⌨">
            {isLoading ? (
              <LoadingDots />
            ) : repoResults.length > 0 ? (
              repoResults.map((repo, index) => (
                <RepoCard key={index} repo={repo} />
              ))
            ) : query ? (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No code implementations found
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                Enter a paper name to find implementations
              </div>
            )}
          </ResultsSection>
        </div>

        {/* Attribution */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          Results sourced from YouTube and GitHub
        </div>
      </div>
    </main>
  );
}

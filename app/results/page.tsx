import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SearchForm } from "@/components/search-form";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Search className="h-6 w-6" />
            <h1 className="text-2xl font-bold">WebScraper</h1>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto mb-8">
          <SearchForm />
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Results for {query}</h2>

          <Suspense fallback={<ResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        </div>
      </div>

      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WebScraper. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">YouTube Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">GitHub Repositories</h3>
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <div className="flex space-x-4 pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Research Papers</h3>
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex space-x-4 pt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

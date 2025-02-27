import { Star, GitFork, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchGitHubResults } from "@/lib/scrapers/github";

export async function GitHubResults({
  query,
  limit = 5,
}: {
  query: string;
  limit?: number;
}) {
  const repositories = await fetchGitHubResults(query, limit);

  if (!repositories || repositories.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">GitHub Repositories</h3>
        <p className="text-muted-foreground">
          No GitHub repositories found for {query}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">GitHub Repositories</h3>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <Card key={repo.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{repo.name}</CardTitle>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                {repo.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center">
                  <GitFork className="h-4 w-4 mr-1" />
                  <span>{repo.forks}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  View <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

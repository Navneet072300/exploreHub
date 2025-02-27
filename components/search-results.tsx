import { YouTubeResults } from '@/components/youtube-results';
import { GitHubResults } from '@/components/github-results';
import { PapersResults } from '@/components/papers-results';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function SearchResults({ query }: { query: string }) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 w-full mb-8">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="youtube">YouTube</TabsTrigger>
        <TabsTrigger value="github">GitHub</TabsTrigger>
        <TabsTrigger value="papers">Papers</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-12">
        <YouTubeResults query={query} limit={3} />
        <GitHubResults query={query} limit={3} />
        <PapersResults query={query} limit={3} />
      </TabsContent>
      
      <TabsContent value="youtube">
        <YouTubeResults query={query} limit={9} />
      </TabsContent>
      
      <TabsContent value="github">
        <GitHubResults query={query} limit={10} />
      </TabsContent>
      
      <TabsContent value="papers">
        <PapersResults query={query} limit={10} />
      </TabsContent>
    </Tabs>
  );
}
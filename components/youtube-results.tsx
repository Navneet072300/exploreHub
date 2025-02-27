import Image from "next/image";
import { ExternalLink, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchYouTubeResults } from "@/lib/scrapers/youtube";

export async function YouTubeResults({
  query,
  limit = 6,
}: {
  query: string;
  limit?: number;
}) {
  const videos = await fetchYouTubeResults(query, limit);

  if (!videos || videos.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">YouTube Videos</h3>
        <p className="text-muted-foreground">
          No YouTube videos found for {query}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">YouTube Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium line-clamp-2 mb-2">{video.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {video.channelName}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{video.duration}</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Watch <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

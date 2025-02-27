import { Calendar, ExternalLink, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchPapersResults } from "@/lib/scrapers/papers";

export async function PapersResults({
  query,
  limit = 5,
}: {
  query: string;
  limit?: number;
}) {
  const papers = await fetchPapersResults(query, limit);

  if (!papers || papers.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Research Papers</h3>
        <p className="text-muted-foreground">
          No research papers found for {query}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Research Papers</h3>
      <div className="space-y-4">
        {papers.map((paper) => (
          <Card key={paper.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{paper.title}</CardTitle>
              <CardDescription>{paper.authors.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {paper.abstract}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{paper.year}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{paper.journal}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Read <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

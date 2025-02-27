import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Search, Github, Youtube, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Search className="h-6 w-6" />
            <h1 className="text-2xl font-bold">WebScraper</h1>
          </Link>
          <ModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-4">About WebScraper</h2>
          <p className="text-lg text-muted-foreground mb-8">
            WebScraper is a powerful tool that helps you find content across multiple platforms with a single search.
          </p>
          
          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <p className="mb-4">
                WebScraper uses advanced web scraping techniques to search for content across different platforms:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Youtube className="h-5 w-5 mr-2" />
                      YouTube
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Find relevant videos from YouTube related to your search query.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Github className="h-5 w-5 mr-2" />
                      GitHub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Discover repositories, code examples, and projects on GitHub.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Research Papers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access academic papers and research from various sources.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-2xl font-semibold mb-4">Technology Stack</h3>
              <p className="mb-6">
                WebScraper is built using modern web technologies:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span><strong>Next.js:</strong> React framework for server-side rendering and API routes</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span><strong>TypeScript:</strong> Type-safe JavaScript for better developer experience</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span><strong>Tailwind CSS:</strong> Utility-first CSS framework for styling</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span><strong>Puppeteer:</strong> Headless browser for web scraping</span>
                </li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-2xl font-semibold mb-4">Legal & Ethical Considerations</h3>
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Important Notice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    WebScraper is designed to comply with the terms of service of all scraped websites:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• We respect robots.txt rules</li>
                    <li>• We implement rate limiting to prevent server overload</li>
                    <li>• We only access publicly available information</li>
                    <li>• We do not store or cache content from scraped websites</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WebScraper. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
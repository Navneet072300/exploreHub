import { SearchForm } from '@/components/search-form';
import { ModeToggle } from '@/components/mode-toggle';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Search className="h-6 w-6" />
            <h1 className="text-2xl font-bold">WebScraper</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Find Content Across Platforms
          </h2>
          <p className="text-lg text-muted-foreground">
            Search for YouTube videos, GitHub repositories, research papers, and blogs related to your query.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <SearchForm />
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
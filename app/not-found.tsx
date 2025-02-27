import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
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

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <h2 className="text-6xl font-bold mb-4">404</h2>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Button asChild>
            <Link href="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WebScraper. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Library } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Library className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Next Library</h1>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/books"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              All Books
            </Link>
            <Link
              href="/create-book"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Add Book
            </Link>
            <Link
              href="/borrow-summary"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Borrow Summary
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

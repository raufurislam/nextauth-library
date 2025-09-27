import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BorrowNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Book Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The book you're looking for doesn't exist or might have been
            removed. Please check the book ID and try again.
          </p>
          <Button asChild className="w-full">
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

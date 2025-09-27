import { BookOpen } from 'lucide-react';

export default function BooksLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 bg-muted rounded-md w-64 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded-md w-48 animate-pulse" />
          </div>
          <div className="h-10 bg-muted rounded-md w-32 animate-pulse" />
        </div>

        <div className="h-10 bg-muted rounded-md w-full mb-6 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-6 bg-muted rounded w-20 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full animate-pulse" />
                <div className="h-3 bg-muted rounded w-full animate-pulse" />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-muted rounded w-16 animate-pulse" />
                <div className="h-8 bg-muted rounded w-16 animate-pulse" />
                <div className="h-8 bg-muted rounded w-20 animate-pulse" />
                <div className="h-8 bg-muted rounded w-20 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Centered loading indicator */}
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <BookOpen className="h-6 w-6 animate-spin" />
            <span className="text-lg font-medium">Loading books...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

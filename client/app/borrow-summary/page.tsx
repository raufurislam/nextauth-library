'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

// Custom hook for data management
import { useBorrowSummary } from '@/hooks/use-borrow-summary';
import { ErrorState } from '@/components/borrow-summary/error-state';
import { SummaryTable } from '@/components/borrow-summary/summary-table';

export default function BorrowSummaryPage() {
  const { borrowSummary, loading, error, refetch } = useBorrowSummary();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Borrow Summary
            </h1>
            <p className="text-muted-foreground">
              Overview of all borrowed books and lending analytics
            </p>
          </div>
          <Button asChild>
            <Link href="/books">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>

        {/* Error State */}
        {error && <ErrorState error={error} onRetry={refetch} />}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          <SummaryTable borrowSummary={borrowSummary} loading={loading} />
        </div>
      </div>
    </div>
  );
}

import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyBooksStateProps {
  hasSearchTerm: boolean;
  addButtonHref?: string;
}

export function EmptyBooksState({
  hasSearchTerm,
  addButtonHref = '/create-book',
}: EmptyBooksStateProps) {
  return (
    <div className="text-center py-12">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        No books found
      </h3>
      <p className="text-muted-foreground mb-4">
        {hasSearchTerm
          ? 'Try adjusting your search terms'
          : 'Get started by adding your first book'}
      </p>
      <Button asChild>
        <Link href={addButtonHref}>Add New Book</Link>
      </Button>
    </div>
  );
}

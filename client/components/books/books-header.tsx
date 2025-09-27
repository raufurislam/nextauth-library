import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface BooksHeaderProps {
  title?: string;
  description?: string;
  addButtonText?: string;
  addButtonHref?: string;
}

export function BooksHeader({
  title = 'Book Collection',
  description = "Manage your library's book inventory",
  addButtonText = 'Add New Book',
  addButtonHref = '/create-book',
}: BooksHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button asChild>
        <Link href={addButtonHref}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonText}
        </Link>
      </Button>
    </div>
  );
}

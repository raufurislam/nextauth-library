import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Book } from '@/lib/types';

interface BookInfoCardProps {
  book: Book;
}

export function BookInfoCard({ book }: BookInfoCardProps) {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Book Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BookHeader book={book} />
        <BookDetails book={book} />
        <BookAvailability book={book} />
        <BookDescription book={book} />
      </CardContent>
    </Card>
  );
}

function BookHeader({ book }: { book: Book }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {book.title}
      </h3>
      <p className="text-muted-foreground">by {book.author}</p>
    </div>
  );
}

function BookDetails({ book }: { book: Book }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Genre</p>
        <p className="font-medium">{book.genre}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">ISBN</p>
        <p className="font-mono text-sm">{book.isbn}</p>
      </div>
    </div>
  );
}

function BookAvailability({ book }: { book: Book }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Available Copies</p>
        <p className="text-2xl font-bold text-primary">{book.copies}</p>
      </div>
      <Badge variant={book.available ? 'default' : 'secondary'}>
        {book.available ? 'Available' : 'Unavailable'}
      </Badge>
    </div>
  );
}

function BookDescription({ book }: { book: Book }) {
  return (
    <div className="pt-2">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {book.description}
      </p>
    </div>
  );
}

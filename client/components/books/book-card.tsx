import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Book } from '@/lib/types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  disabled?: boolean;
}

export function BookCard({
  book,
  onEdit,
  onDelete,
  disabled = false,
}: BookCardProps) {
  return (
    <Card
      className={`border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{book.title}</CardTitle>
            <CardDescription className="text-sm">
              by {book.author}
            </CardDescription>
          </div>
          <Badge variant={book.available ? 'default' : 'secondary'}>
            {book.available ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <BookDetails book={book} />
        <BookActions
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

function BookDetails({ book }: { book: Book }) {
  return (
    <div className="space-y-2 mb-4">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Genre:</span> {book.genre}
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">ISBN:</span> {book.isbn}
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Copies:</span> {book.copies}
      </p>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {book.description}
      </p>
    </div>
  );
}

function BookActions({
  book,
  onEdit,
  onDelete,
  disabled = false,
}: {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/books/${book._id}`}>
          <BookOpen className="mr-1 h-3 w-3" />
          View
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(book)}
        disabled={disabled}
      >
        <Edit className="mr-1 h-3 w-3" />
        Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(book)}
        disabled={disabled}
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Delete
      </Button>
      {book.available && (
        <Button size="sm" asChild>
          <Link href={`/borrow/${book?._id}`}>Borrow</Link>
        </Button>
      )}
    </div>
  );
}

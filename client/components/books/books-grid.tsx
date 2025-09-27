import type { Book } from '@/lib/types';
import { BookCard } from './book-card';

interface BooksGridProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (book: Book) => void;
  disabled?: boolean;
}

export function BooksGrid({
  books,
  onEditBook,
  onDeleteBook,
  disabled = false,
}: BooksGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onEdit={onEditBook}
          onDelete={onDeleteBook}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

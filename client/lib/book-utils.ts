import type { Book } from '@/lib/types';

export function filterBooks(books: Book[], searchTerm: string): Book[] {
  if (!searchTerm.trim()) {
    return books;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase();

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(normalizedSearchTerm) ||
      book.author.toLowerCase().includes(normalizedSearchTerm) ||
      book.genre.toLowerCase().includes(normalizedSearchTerm)
  );
}

export function createUpdatedBook(
  originalBook: Book,
  formData: FormData
): Book {
  const copiesCount = Number.parseInt(formData.get('copies') as string);

  return {
    ...originalBook,
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    genre: formData.get('genre') as string,
    isbn: formData.get('isbn') as string,
    description: formData.get('description') as string,
    copies: copiesCount,
    available: copiesCount > 0,
  };
}

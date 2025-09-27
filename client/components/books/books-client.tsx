'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Book } from '@/lib/types';
import { createUpdatedBook, filterBooks } from '@/lib/book-utils';
import { BooksHeader } from '@/components/books/books-header';
import { BookSearch } from '@/components/books/book-search';
import { BooksGrid } from '@/components/books/books-grid';
import { EmptyBooksState } from '@/components/books/empty-books-state';
import { BookEditDialog } from '@/components/books/book-edit-dialog';
import { BookDeleteDialog } from '@/components/books/book-delete-dialog';
import { updateBook, deleteBook } from '@/app/api/bookApi/api';
import { toast } from 'sonner';

interface BooksClientProps {
  initialBooks: Book[];
}

export default function BooksClient({ initialBooks }: BooksClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredBooks = filterBooks(books, searchTerm);

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBook || isUpdating) return;

    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedBook = createUpdatedBook(editingBook, formData);

      // Update UI
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === editingBook._id ? updatedBook : book
        )
      );

      // Update on server
      await updateBook(updatedBook);

      setIsEditDialogOpen(false);
      setEditingBook(null);

      toast.success('Book updated successfully');

      // Revalidate the page data
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === editingBook._id ? editingBook : book
        )
      );

      const message =
        error instanceof Error ? error.message : 'Failed to update book';
      toast.error(message);
      console.error('Error updating book:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteBook = (book: Book) => {
    setDeleteConfirm(book);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm || isDeleting) return;

    setIsDeleting(true);

    try {
      // update UI
      const bookToDelete = deleteConfirm;

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book?._id !== bookToDelete._id)
      );
      setIsDeleteDialogOpen(false);
      setDeleteConfirm(null);

      // Delete on server
      await deleteBook(bookToDelete._id);

      toast.success('Book deleted successfully');

      // Revalidate the page data
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      // Revert optimistic update on error
      setBooks((prevBooks) => [...prevBooks, deleteConfirm]);

      const message =
        error instanceof Error ? error.message : 'Failed to delete book';
      toast.error(message);
      console.error('Error deleting book:', error);

      // Reopen dialog for retry
      setIsDeleteDialogOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BooksHeader />

        <BookSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {filteredBooks.length > 0 ? (
          <BooksGrid
            books={filteredBooks}
            onEditBook={handleEditBook}
            onDeleteBook={handleDeleteBook}
          />
        ) : (
          <EmptyBooksState hasSearchTerm={!!searchTerm} />
        )}
      </div>

      <BookEditDialog
        book={editingBook}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
        isLoading={isUpdating}
      />

      <BookDeleteDialog
        book={deleteConfirm}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

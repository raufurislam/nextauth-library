'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { borrowBook } from '@/app/api/bookApi/api';
import { getDefaultDueDate } from '@/lib/borrow-utils';
import { BookInfoCard } from '@/components/borrow/book-info-card';
import { BorrowForm } from '@/components/borrow/borrow-form';
import {
  BookNotFound,
  BookUnavailable,
  BorrowSuccess,
} from '@/components/borrow/borrow-states';
import { toast } from 'sonner';

interface BorrowClientProps {
  book: Book | null;
}

export default function BorrowClient({ book }: BorrowClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ quantity: number } | null>(
    null
  );

  // Set default due date
  useEffect(() => {
    if (book) {
      // This effect could be used for additional initialization if needed
    }
  }, [book]);

  const handleBorrowSubmit = async (quantity: number, dueDate: string) => {
    if (!book) return;

    setIsSubmitting(true);

    try {
      const result = await borrowBook(book?._id, quantity, dueDate);

      setSuccessData({ quantity });
      setSuccess(true);

      toast.success('Book borrowed successfully!');

      // Redirect to borrow summary after success message
      setTimeout(() => {
        router.push('/borrow-summary');
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to borrow book';
      toast.error(errorMessage);
      throw error; // Re-throw so form can handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle different states
  if (!book) {
    return <BookNotFound />;
  }

  if (!book.available) {
    return <BookUnavailable bookTitle={book.title} />;
  }

  if (success && successData) {
    return (
      <BorrowSuccess bookTitle={book.title} quantity={successData.quantity} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/books/${book._id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Book
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BookInfoCard book={book} />
            <BorrowForm
              book={book}
              onSubmit={handleBorrowSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

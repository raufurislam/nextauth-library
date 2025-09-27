import { useState, useEffect } from 'react';
import { BorrowSummary } from '@/lib/types';
import { getBorrowedBooks } from '@/app/api/bookApi/api';

interface UseBorrowSummaryResult {
  borrowSummary: BorrowSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBorrowSummary(): UseBorrowSummaryResult {
  const [borrowSummary, setBorrowSummary] = useState<BorrowSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const borrowed = await getBorrowedBooks();

      setBorrowSummary(borrowed);
    } catch (err) {
      console.error('Failed to fetch borrowed books:', err);
      setError('Failed to load borrowed books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return {
    borrowSummary,
    loading,
    error,
    refetch: fetchBorrowedBooks,
  };
}

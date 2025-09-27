import { Button } from '@/components/ui/button';
import { BookOpen, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatQuantityText } from '@/lib/borrow-utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  backButton?: React.ReactNode;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  backButton,
}: EmptyStateProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {backButton && <div className="mb-6">{backButton}</div>}
        <div className="text-center py-12">
          {icon}
          <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          {action}
        </div>
      </div>
    </div>
  );
}

export function BookNotFound() {
  return (
    <EmptyState
      icon={
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      }
      title="Book not found"
      description="The book you're trying to borrow doesn't exist."
      action={
        <Button asChild>
          <Link href="/books">Back to Books</Link>
        </Button>
      }
    />
  );
}

interface BookUnavailableProps {
  bookTitle: string;
}

export function BookUnavailable({ bookTitle }: BookUnavailableProps) {
  return (
    <EmptyState
      icon={
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      }
      title="Book Unavailable"
      description={`"${bookTitle}" is currently out of stock.`}
      action={
        <Button asChild>
          <Link href="/books">Browse Other Books</Link>
        </Button>
      }
      backButton={
        <Button variant="ghost" asChild>
          <Link href="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      }
    />
  );
}

interface BorrowSuccessProps {
  bookTitle: string;
  quantity: number;
}

export function BorrowSuccess({ bookTitle, quantity }: BorrowSuccessProps) {
  return (
    <EmptyState
      icon={<CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />}
      title="Book Borrowed Successfully!"
      description={`You have successfully borrowed ${quantity} ${formatQuantityText(
        quantity
      )} of "${bookTitle}".`}
      action={
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Redirecting to borrow summary...
          </p>
          <Button asChild>
            <Link href="/borrow-summary">View Borrow Summary</Link>
          </Button>
        </div>
      }
    />
  );
}

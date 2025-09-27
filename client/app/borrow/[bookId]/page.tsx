import BorrowClient from '@/components/borrow/borrow-client';
import { getBookById } from '@/app/api/bookApi/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BorrowPageProps {
  params: {
    bookId: string;
  };
}

export async function generateMetadata({
  params,
}: BorrowPageProps): Promise<Metadata> {
  try {
    const book = await getBookById(params.bookId);

    if (!book) {
      return {
        title: 'Book Not Found | Library Management',
        description: 'The requested book was not found.',
      };
    }

    return {
      title: `Borrow: ${book.title} | Library Management`,
      description: `Borrow ${book.title} by ${book.author} from our library collection.`,
      openGraph: {
        title: `Borrow: ${book.title}`,
        description: `Borrow ${book.title} by ${book.author} from our library collection.`,
      },
    };
  } catch {
    return {
      title: 'Borrow Book | Library Management',
      description: 'Borrow a book from our library collection.',
    };
  }
}

export default async function BorrowPage({ params }: BorrowPageProps) {
  try {
    const book = await getBookById(params.bookId);

    if (!book) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Borrow Book</h1>
            <p className="text-muted-foreground">
              Complete the form below to borrow this book.
            </p>
          </div>

          <BorrowClient book={book} />
        </div>
      </div>
    );
  } catch (error) {
    // If book not found, show not-found page
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }

    // For other errors, this will trigger the error.tsx page
    throw new Error('Failed to load book details');
  }
}

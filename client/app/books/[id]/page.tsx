'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Book } from '@/lib/types';
import { ArrowLeft, Edit, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getBookById } from '@/app/api/bookApi/api';

export default function BookDetailPage() {
  const params = useParams();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const bookId = params.id as string;
      const book = await getBookById(bookId);
      setBook(book || null);
    };

    fetchBook();
  }, [params.id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Book not found
            </h3>
            <p className="text-muted-foreground mb-4">
              The book you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/books">Back to Books</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      by {book.author}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={book.available ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {book.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Genre
                      </h4>
                      <p className="text-muted-foreground">{book.genre}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">ISBN</h4>
                      <p className="text-muted-foreground font-mono text-sm">
                        {book.isbn}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Available Copies
                      </h4>
                      <p className="text-muted-foreground">{book.copies}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Status
                      </h4>
                      <p className="text-muted-foreground">
                        {book.available ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href={`/edit-book/${book._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Book
                  </Link>
                </Button>
                {book.available && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href={`/borrow/${book._id}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Borrow Book
                    </Link>
                  </Button>
                )}
                {!book.available && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Book Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Copies:</span>
                  <span className="font-medium">{book.copies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium">
                    {book.available ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="font-medium">{book.genre}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

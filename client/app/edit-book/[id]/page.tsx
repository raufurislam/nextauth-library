'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Book } from '@/lib/types';
import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';
import { getBooks, updateBook } from '@/app/api/bookApi/api';

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      const bookId = params.id as string;
      const foundBook = books.find((b) => b._id === bookId) as Book | undefined;
      setBook(foundBook || null);
    };

    fetchBooks();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updatedBook = {
      ...book,
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      genre: formData.get('genre') as string,
      isbn: formData.get('isbn') as string,
      description: formData.get('description') as string,
      copies: Number.parseInt(formData.get('copies') as string),
      available: Number.parseInt(formData.get('copies') as string) > 0,
    };

    // Simulate API call
    try {
      const res = await updateBook(updatedBook);
      console.log('Book updated:', res);
    } catch (error) {
      console.error('Error updating book:', error);
    }

    setIsSubmitting(false);
    router.push(`/books/${book._id}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Book not found
            </h3>
            <p className="text-muted-foreground mb-4">
              The book you're trying to edit doesn't exist.
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
            <Link href={`/books/${book._id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Book
            </Link>
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Edit className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Edit Book</CardTitle>
                  <CardDescription>Update the book details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={book.title}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      defaultValue={book.author}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre *</Label>
                    <Input
                      id="genre"
                      name="genre"
                      defaultValue={book.genre}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      defaultValue={book.isbn}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={book.description}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies *</Label>
                  <Input
                    id="copies"
                    name="copies"
                    type="number"
                    min="0"
                    defaultValue={book.copies}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Set to 0 to mark the book as unavailable
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating Book...' : 'Update Book'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/books/${book._id}`}>Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

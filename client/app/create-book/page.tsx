'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { ArrowLeft, BookPlus } from 'lucide-react';
import Link from 'next/link';
import { createBook } from '@/app/api/bookApi/api';
import { toast } from 'sonner';

export default function CreateBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const newBook = {
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
      const res = await createBook(newBook);

      // @ts-ignore
      if (res?.success) {
        setIsSubmitting(false);
        toast.success('Book added successfully!');
        router.push('/books');
      }
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

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

        <div className="max-w-2xl mx-auto">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookPlus className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Add New Book</CardTitle>
                  <CardDescription>
                    Fill in the details to add a new book to your library
                  </CardDescription>
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
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      placeholder="Enter author name"
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
                      placeholder="Enter genre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      placeholder="978-0-123456-78-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter book description"
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
                    placeholder="0"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Set to 0 to mark the book as unavailable
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding Book...' : 'Add Book'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/books">Cancel</Link>
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

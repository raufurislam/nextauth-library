import type React from 'react';
import { useState } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  BookOpen,
  Calendar as CalendarIcon,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { validateBorrowRequest, formatQuantityText } from '@/lib/borrow-utils';

interface BorrowFormProps {
  book: Book;
  onSubmit: (quantity: number, dueDate: string) => Promise<void>;
  isSubmitting: boolean;
}

export function BorrowForm({ book, onSubmit, isSubmitting }: BorrowFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value);
    setQuantity(newQuantity);
    setError('');

    if (newQuantity > book.copies) {
      setError(`Only ${book.copies} copies are available`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateBorrowRequest(
      quantity,
      book.copies,
      dueDate
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    try {
      await onSubmit(quantity, dueDate);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to borrow book';
      setError(errorMessage);
    }
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-xl">Borrow Book</CardTitle>
            <CardDescription>Fill in the borrowing details</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <QuantityInput
            quantity={quantity}
            maxQuantity={book.copies}
            onChange={handleQuantityChange}
            disabled={isSubmitting}
          />

          <DueDatePicker
            dueDate={dueDate}
            onSelect={setDueDate}
            disabled={isSubmitting}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <BorrowSummary
            bookTitle={book.title}
            quantity={quantity}
            dueDate={dueDate}
          />

          <FormActions
            isSubmitting={isSubmitting}
            hasError={!!error}
            bookId={book._id}
          />
        </form>
      </CardContent>
    </Card>
  );
}

interface QuantityInputProps {
  quantity: number;
  maxQuantity: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

function QuantityInput({
  quantity,
  maxQuantity,
  onChange,
  disabled,
}: QuantityInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="flex items-center space-x-2">
        <Hash className="h-4 w-4" />
        <span>Quantity *</span>
      </Label>
      <Input
        id="quantity"
        name="quantity"
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <p className="text-sm text-muted-foreground">
        Maximum {maxQuantity} {formatQuantityText(maxQuantity)} available
      </p>
    </div>
  );
}

interface DueDatePickerProps {
  dueDate: string;
  onSelect: (date: string) => void;
  disabled: boolean;
}

function DueDatePicker({ dueDate, onSelect, disabled }: DueDatePickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dueDate" className="flex items-center space-x-2">
        <CalendarIcon className="h-4 w-4" />
        <span>Due Date *</span>
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            disabled={disabled}
          >
            {dueDate ? format(new Date(dueDate), 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dueDate ? new Date(dueDate) : undefined}
            onSelect={(date) => {
              if (date) {
                onSelect(date.toISOString().split('T')[0]);
              }
            }}
            disabled={(date) => date <= new Date()}
          />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">
        Select when you plan to return the book
      </p>
    </div>
  );
}

interface BorrowSummaryProps {
  bookTitle: string;
  quantity: number;
  dueDate: string;
}

function BorrowSummary({ bookTitle, quantity, dueDate }: BorrowSummaryProps) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h4 className="font-medium text-foreground mb-2">Borrowing Summary</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Book:</span>
          <span className="font-medium">{bookTitle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity:</span>
          <span className="font-medium">{quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Due Date:</span>
          <span className="font-medium">{dueDate || 'Not selected'}</span>
        </div>
      </div>
    </div>
  );
}

interface FormActionsProps {
  isSubmitting: boolean;
  hasError: boolean;
  bookId: string;
}

function FormActions({ isSubmitting, hasError, bookId }: FormActionsProps) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <Button type="submit" disabled={isSubmitting || hasError}>
        {isSubmitting ? 'Processing...' : 'Borrow Book'}
      </Button>
      <Button type="button" variant="outline" asChild>
        <Link href={`/books/${bookId}`}>Cancel</Link>
      </Button>
    </div>
  );
}

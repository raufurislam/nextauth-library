import type React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Book } from '@/lib/types';

interface BookEditDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export function BookEditDialog({
  book,
  open,
  onOpenChange,
  onSave,
  isLoading = false,
}: BookEditDialogProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Make changes to the book details here.
          </DialogDescription>
        </DialogHeader>
        <BookEditForm book={book} onSubmit={onSave} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

function BookEditForm({
  book,
  onSubmit,
  isLoading = false,
}: {
  book: Book;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <FormField
          id="title"
          label="Title"
          defaultValue={book.title}
          required
          disabled={isLoading}
        />
        <FormField
          id="author"
          label="Author"
          defaultValue={book.author}
          required
          disabled={isLoading}
        />
        <FormField
          id="genre"
          label="Genre"
          defaultValue={book.genre}
          required
          disabled={isLoading}
        />
        <FormField
          id="isbn"
          label="ISBN"
          defaultValue={book.isbn}
          required
          disabled={isLoading}
        />
        <FormField
          id="copies"
          label="Copies"
          type="number"
          min="0"
          defaultValue={book.copies.toString()}
          required
          disabled={isLoading}
        />
        <FormTextAreaField
          id="description"
          label="Description"
          defaultValue={book.description}
          rows={3}
          disabled={isLoading}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  type?: string;
  min?: string;
  required?: boolean;
  disabled?: boolean;
}

function FormField({
  id,
  label,
  defaultValue,
  type = 'text',
  min,
  required,
  disabled = false,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        min={min}
        defaultValue={defaultValue}
        className="col-span-3"
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

interface FormTextAreaFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  rows?: number;
  disabled?: boolean;
}

function FormTextAreaField({
  id,
  label,
  defaultValue,
  rows = 3,
  disabled = false,
}: FormTextAreaFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Textarea
        id={id}
        name={id}
        defaultValue={defaultValue}
        className="col-span-3"
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
}

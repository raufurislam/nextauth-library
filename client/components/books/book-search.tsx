import type React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BookSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function BookSearch({
  searchTerm,
  onSearchChange,
  placeholder = 'Search books by title, author, or genre...',
  disabled = false,
}: BookSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
        disabled={disabled}
      />
    </div>
  );
}

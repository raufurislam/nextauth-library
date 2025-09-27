export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BorrowedBook {
  _id: string;
  title: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  totalQuantity: number;
  borrowDate: string;
  dueDate: string;
}

export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

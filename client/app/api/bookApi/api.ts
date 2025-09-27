import type { Book } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Server-side API functions (for SSR)
export async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        `Failed to fetch book: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

export async function updateBook(updatedBook: Book): Promise<Book> {
  if (!API_URL) {
    throw new Error("API URL not configured");
  }

  const response = await fetch(`${API_URL}/books/${updatedBook?._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update book: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  return await response.json();
}

export async function deleteBook(bookId: string): Promise<void> {
  if (!API_URL) {
    throw new Error("API URL not configured");
  }

  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to delete book: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
}

export async function borrowBook(
  bookId: string,
  quantity: number,
  dueDate: string
): Promise<any> {
  if (!API_URL) {
    throw new Error("API URL not configured");
  }

  const response = await fetch(`${API_URL}/borrow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book: bookId,
      quantity,
      dueDate,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to borrow book: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return await response.json();
}

export async function getBorrowedBooks(): Promise<any[]> {
  try {
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    const response = await fetch(`${API_URL}/borrow`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch borrowed books: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return [];
  }
}

export async function createBook(book: Omit<Book, "_id">): Promise<Book> {
  if (!API_URL) {
    throw new Error("API URL not configured");
  }

  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create book: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return await response.json();
}

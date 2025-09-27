export function validateBorrowRequest(
  quantity: number,
  availableCopies: number,
  dueDate: string
): string | null {
  if (quantity <= 0) {
    return 'Quantity must be greater than 0';
  }

  if (quantity > availableCopies) {
    return `Only ${availableCopies} copies are available`;
  }

  if (!dueDate) {
    return 'Please select a due date';
  }

  const selectedDate = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    return 'Due date must be in the future';
  }

  return null;
}

export function getDefaultDueDate(): string {
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 14);
  return defaultDueDate.toISOString().split('T')[0];
}

export function formatQuantityText(quantity: number): string {
  return quantity === 1 ? 'copy' : 'copies';
}

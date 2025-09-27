import mongoose, { Schema, Document, model } from 'mongoose';
import Book from './book.model';

interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
  },
  { timestamps: true }
);

borrowSchema.post('save', async function (doc, next) {
  const book = await Book.findById(doc.book);
  if (book) {
    book.copies -= doc.quantity;
    book.updateAvailability();
    await book.save();
  }
  next();
});

const Borrow = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;
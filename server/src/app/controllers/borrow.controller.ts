import Borrow from '../models/borrow.model';
import Book from '../models/book.model';
import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';

export const borrowBook: RequestHandler = async (req, res, next) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!mongoose.isValidObjectId(book)) {
      throw next(
        res.status(400).json({
        success: false,
        message: 'Invalid book ID',
        error: 'Invalid ObjectId format'
      })
      );
    }
    if (!quantity || quantity < 1) {
      throw next(
        res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
        error: 'Invalid quantity'
      })
      );
    }
    if (!dueDate) {
      throw next(
        res.status(400).json({
        success: false,
        message: 'Due date is required',
        error: 'Missing due date'
      })
      );
    }

    const bookDoc = await Book.findById(book);
    if (!bookDoc) {
      throw next(
        res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'No book exists with the provided ID'
      })
      );
    }

    if (bookDoc.copies < quantity) {
      throw next(
       res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: 'Insufficient copies'
      })
      );
    }

    const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    bookDoc.copies -= quantity;
    await bookDoc.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    next(error);
  }
};


export const borrowedSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          _id : 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error });
  }
};
import express from 'express';
import { borrowBook, borrowedSummary } from '../controllers/borrow.controller';


const router = express.Router();

router.post('/', borrowBook);
router.get('/', borrowedSummary);

export default router;
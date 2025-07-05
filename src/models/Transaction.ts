import mongoose, { Schema, Document } from 'mongoose';

export const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Housing',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Education',
  'Personal',
  'Other'
] as const;

export type Category = typeof categories[number];

export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: Category;
}

const TransactionSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: categories, default: 'Other' },
});

// Use a more robust check to prevent errors when running on the client side
const TransactionModel = mongoose.models.Transaction || 
  (typeof mongoose !== 'undefined' && mongoose.model<ITransaction>('Transaction', TransactionSchema));

export default TransactionModel;
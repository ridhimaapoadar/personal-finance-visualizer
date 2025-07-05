import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  category: string;
  limit: number;
  month: number; // 1-12 for Jan-Dec
  year: number;
}

const BudgetSchema = new Schema<IBudget>(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    limit: {
      type: Number,
      required: [true, "Budget limit is required"],
      min: [0, "Budget limit cannot be negative"],
    },
    month: {
      type: Number,
      required: [true, "Month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2000, "Year must be 2000 or later"],
    },
  },
  {
    timestamps: true,
  }
);

// Add a compound index to ensure uniqueness of category+month+year combination
BudgetSchema.index({ category: 1, month: 1, year: 1 }, { unique: true });

// Use a more robust check to prevent errors when running on the client side
const BudgetModel = mongoose.models.Budget || 
  (typeof mongoose !== 'undefined' && mongoose.model<IBudget>("Budget", BudgetSchema));

export default BudgetModel;
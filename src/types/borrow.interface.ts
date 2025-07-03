import { Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

 export interface IBorrowSummary {
    totalQuantity: number;
    book: {
      title: string; 
      isbn: number; 
    } 
 }

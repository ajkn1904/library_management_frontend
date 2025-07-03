import { Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  totalQuantity: number;
  dueDate: Date;
}


export interface IBorrow {
  book: string;
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

 export interface IBorrowProps {
  book: {
    bookId: string;
    title: string;
    copies: number;
  };
}


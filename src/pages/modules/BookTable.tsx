import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { IBooks } from '@/types/books.interface';
import { Edit2, Trash2 } from 'lucide-react';


interface IProps {
    book: IBooks
}


const BookTable = ({ book }: IProps) => {
    return (
        <>
            <TableRow className="hover:bg-gray-100 transition-colors duration-200">
                <TableCell className="font-medium max-w-[225px] overflow-hidden overflow-ellipsis">{book.title}</TableCell>
                <TableCell className="text-left">{book.author}</TableCell>
                <TableCell className="text-left">{book.genre}</TableCell>
                <TableCell className="text-center">{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell>{book.available ? "Available" : "Unavailable"}</TableCell>
                <TableCell>
                    <div className='w-full'>
                        <div className='flex justify-between items-center p-1'>
                            <Trash2 />
                            <Edit2 />
                        </div>
                        <Button className='w-full'>BORROW</Button>
                    </div>

                </TableCell>
            </TableRow>
        </>
    );
};

export default BookTable;
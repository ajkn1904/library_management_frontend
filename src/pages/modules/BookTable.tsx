import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { IBooks } from '@/types/books.interface';
import { NotebookPen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddBorrow from '../Borrow/AddBorrow';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import EditBook from './EditBook';
import { useDeleteBookMutation } from '@/redux/api/baseApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

interface IProps {
    book: IBooks;
}


const BookTable = ({ book }: IProps) => {
    const navigate = useNavigate();
    const [borrowState, setBorrowState] = useState(false)
    const [editState, setEditState] = useState(false)

    const [deleteBook, { isSuccess, isError }] = useDeleteBookMutation();


    const handleDelete = async (id: string) => {
        const doDlt = window.confirm(`Do you want to delete ${book.title}?`);
        if (doDlt) {
            await deleteBook({ id });
        };
    }


    if (isSuccess) {
        toast.error(`Book ${book.title} deleted successfully!`);
    }
    if (isError) {
        toast.error("An error occurred while deleting the book. Please try again later.");
    }

    const handleRowClick = () => {
        navigate(`/books/${book._id}`);
    };


    return (
        <>
            <TableRow className="group hover:bg-gray-100 transition-colors duration-200" onClick={handleRowClick}>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer font-medium max-w-[225px] overflow-hidden overflow-ellipsis">
                    {book.title}
                </TableCell>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer text-left">{book.author}</TableCell>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer text-left">{book.genre}</TableCell>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer text-center">{book.isbn}</TableCell>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer text-center">{book.copies}</TableCell>
                <TableCell className="group-hover:text-blue-600 group-hover:cursor-pointer">
                    {book.available ? "Available" : "Unavailable"}
                </TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className='w-full'>
                        <div className='flex justify-between items-center p-4'>
                            <Trash2 className='hover:text-red-600  cursor-pointer' onClick={() => handleDelete(book._id)} />

                            <Dialog open={editState} onOpenChange={setEditState}>
                                <form>
                                    <DialogTrigger asChild>
                                        <NotebookPen className='hover:text-blue-600  cursor-pointer' />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogDescription className="sr-only">Fill up the form to edit book details.</DialogDescription>
                                            <DialogTitle>Edit Book</DialogTitle>
                                        </DialogHeader>

                                        <EditBook {...book} setEditState={setEditState} key={book._id} />

                                    </DialogContent>
                                </form>
                            </Dialog>
                        </div>

                        <Dialog open={borrowState} onOpenChange={setBorrowState}>
                            <form>
                                <DialogTrigger asChild>
                                    <Button className="cursor-pointer bg-green-500 disabled:bg-gray-500 w-full" disabled={!book.available}>BORROW</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogDescription className="sr-only">Fill up the form to Borrow book</DialogDescription>
                                        <DialogTitle>Borrow</DialogTitle>
                                    </DialogHeader>

                                    <AddBorrow book={{ bookId: book._id, title: book.title, copies: book.copies }} key={book._id} />

                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};

export default BookTable;
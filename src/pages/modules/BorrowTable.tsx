import type { IBorrowSummary } from '@/types/borrow.interface';
import { TableCell, TableRow } from '@/components/ui/table';
interface IProps {
    borrow: IBorrowSummary
}


const BorrowTable = ({borrow}: IProps) => {

    return (
        <>
            <TableRow className="hover:bg-gray-100 transition-colors duration-200">
                <TableCell className="font-medium">{borrow.book.title}</TableCell>
                <TableCell className="text-center">{borrow.book.isbn}</TableCell>
                <TableCell className="text-center">{borrow.totalQuantity}</TableCell>
            </TableRow>
        </>
    );
};

export default BorrowTable;
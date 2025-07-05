import type { IBorrowSummary } from '@/types/borrow.interface';
import { useGetBorrowsQuery } from '../../redux/api/baseApi'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BorrowTable from '../modules/BorrowTable';
import { SkeletonCard } from '../modules/SkeletonCard';

const BorrowSummary = () => {
    const { data, isLoading } = useGetBorrowsQuery(undefined);


    if (isLoading) {
        return <SkeletonCard />;
    }
    if (!data) {
        return <div>No borrows found</div>;
    }


    return (
        <div className='min-h-screen'>
            <h1 className='font-bold font-serif text-2xl md:text-3xl lg:text-4xl pt-3 ml-[15px]'>Borrow List</h1>
            <div className='space-y-5 mt-5 w-[96%] xl:max-w-[85%] mx-auto border border-gray-200 rounded-lg shadow-md mb-10'>
                <Table>
                    <TableCaption>A list of your recent borrows.</TableCaption>
                    <TableHeader className='bg-blue-200 text-lg font-bold'>
                        <TableRow>
                            <TableHead className='rounded-tl-lg'>TITLE</TableHead>
                            <TableHead className="text-center">ISBN</TableHead>
                            <TableHead className="text-center rounded-tr-lg">TOTAL QUANTITY</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="p-5">
                        {
                            !isLoading && data.data.map((borrow: IBorrowSummary, index: number) => <BorrowTable borrow={borrow} key={index} />)
                        }

                    </TableBody>

                </Table>
            </div>
        </div>
    );
};

export default BorrowSummary;
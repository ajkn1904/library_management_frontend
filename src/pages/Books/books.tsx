
import type { IBooks } from '../../types/books.interface';
import BookTable from './../modules/BookTable';
import { useGetBooksQuery } from '../../redux/api/baseApi'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const books = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No books found</div>;
    }


    return (
        <div className='min-h-screen'>
            <h1 className='font-bold font-serif text-5xl'>Book List</h1>
            <div className='space-y-5 mt-5 w-[96%] xl:max-w-[85%] mx-auto border border-gray-200 rounded-lg shadow-md mb-10'>
                <Table>
                    <TableCaption>A list of your recent books.</TableCaption>
                    <TableHeader className='bg-blue-200 text-lg font-bold'>
                        <TableRow>
                            <TableHead className="w-[225px]">TITLE</TableHead>
                            <TableHead>AUTHOR</TableHead>
                            <TableHead>GENRE</TableHead>
                            <TableHead className="w-[90px]">ISBN</TableHead>
                            <TableHead>COPIES</TableHead>
                            <TableHead>AVAILABILITY</TableHead>
                            <TableHead className="text-right overflow-hidden">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="p-5">
                        {
                            !isLoading && data.data.map((book: IBooks) => <BookTable book={book} key={book._id} />)
                        }

                    </TableBody>

                </Table>
            </div>
        </div>
    );
};

export default books;
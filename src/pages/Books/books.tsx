
import type { IBooks } from '../../types/books.interface';
import BookTable from './../modules/BookTable';
import { useGetBooksQuery } from '../../redux/api/baseApi'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SkeletonCard } from '../modules/SkeletonCard';
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"

const books = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const itemsPerPage = 10;

    if (isLoading) return <SkeletonCard />;
    if (!data) return <div>No books found</div>;

    const totalBooks = data.data.length;
    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const sortedBooks = [...data.data].sort((a, b) => {
        if (sortOrder === "asc") {
            return a._id > b._id ? 1 : -1;
        } else {
            return a._id < b._id ? 1 : -1;
        }
    });

    const paginatedBooks = sortedBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const half = Math.floor(maxVisiblePages / 2);

        let start = Math.max(currentPage - half, 1);
        const end = Math.min(start + maxVisiblePages - 1, totalPages);

        if (end - start < maxVisiblePages - 1) {
            start = Math.max(end - maxVisiblePages + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="min-h-screen">
            <h1 className="font-bold font-serif text-2xl md:text-3xl lg:text-4xl pt-3 ml-[15px]">Book List</h1>

            {/* Sort */}
            <div className="flex justify-end items-center p-4">
                <label htmlFor="sort" className="mr-2 font-medium">Sort:</label>
                <select id="sort" className="border rounded-lg px-2 py-1" value={sortOrder} onChange={e => { setSortOrder(e.target.value); setCurrentPage(1); }}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="space-y-5 mt-5 w-[96%] xl:max-w-[85%] mx-auto border border-gray-200 rounded-lg shadow-md mb-10">
                <Table>
                    <TableCaption>A list of your recent books.</TableCaption>
                    <TableHeader className="bg-blue-200 text-lg font-bold">
                        <TableRow>
                            <TableHead className="w-[225px] rounded-tl-lg">TITLE</TableHead>
                            <TableHead>AUTHOR</TableHead>
                            <TableHead>GENRE</TableHead>
                            <TableHead className="w-[90px]">ISBN</TableHead>
                            <TableHead>COPIES</TableHead>
                            <TableHead>AVAILABILITY</TableHead>
                            <TableHead className="text-right overflow-hidden rounded-tr-lg">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBooks.map((book: IBooks) => (
                            <BookTable book={book} key={book._id} />
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <Pagination className="justify-center py-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageClick(Math.max(currentPage - 1, 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                        </PaginationItem>

                        {getPageNumbers().map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink isActive={currentPage === page} onClick={() => handlePageClick(page)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {totalPages > 5 && getPageNumbers().slice(-1)[0] < totalPages && (
                            <>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink onClick={() => handlePageClick(totalPages)}>
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};


export default books;

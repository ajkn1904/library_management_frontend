import App from "@/App";
import { createBrowserRouter } from "react-router";
import AddBook from "@/pages/Books/AddBook";
import books from "@/pages/Books/books";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import BookDetails from "@/pages/Books/BookDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: books
            },
            {
                path: "books",
                Component: books
            },
            {
                path: "create-book",
                Component: AddBook
            },
            {
                path: "books/:id",
                Component: BookDetails
            },
            {
                path: "borrow-summary",
                Component: BorrowSummary
            },
        ]
    },
]);

export default router;
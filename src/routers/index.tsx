import App from "@/App";
import { createBrowserRouter } from "react-router";
import AddBook from "@/pages/Books/AddBook";
import books from "@/pages/Books/books";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";

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
                path: "borrow-summary",
                Component: BorrowSummary
            },
        ]
    },
]);

export default router;
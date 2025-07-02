import App from "@/App";
import { createBrowserRouter } from "react-router";
import AllBooks from "@/pages/AllBooks";
import AddBook from "@/pages/AddBook";
import BorrowSummary from "@/pages/BorrowSummary";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: AllBooks
            },
            {
                path: "books",
                Component: AllBooks
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
import App from "@/App";
import { createBrowserRouter } from "react-router";
import AddBook from "@/pages/Books/AddBook";
import books from "@/pages/Books/books";
import borrow from "@/pages/Borrow/borrow";

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
                Component: borrow
            },
        ]
    },
]);

export default router;
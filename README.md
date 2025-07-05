# 📖 Library Management Frontend with React, TypeScript, TailwindCSS & ShadcnUI

This is a minimal library management system using **`Recact.js`** with **`TypeScript`** for type safety, **`TailwindCSS`** with **`ShadcnUI`** as the css libraries, and **`Redux Toolkit Query (RTK Query)`** for `State` & `API` handling.

The system will allow users to view a list of books, perform CRUD operations, borrow books, and view a simple borrow summary—all without authentication, category filters, or payment integration.

The main goal is to build a functional and clean client-side application that interacts with a RESTful API, demonstrating proper state management, UI design, and core functionality.

---

## 🔑 Key Features

The project includes:

- Book Management - Add - Edit - Delete Book
- Borrow Book
- Book Details & Borrow Summary
- Business logic enforcement (e.g., availability control on borrow)
- Minimal & user-friendly UI/UX
- Perform**CRUD** operations
- Filtering features
- Pagination
- Responsive design

---

## 🧱 Installation & Setup Process

### CLI Commands :----------

- `npm create vite@latest 'ProjectName' `
- `npm init --y`
- `npm install tailwindcss @tailwindcss/vite`
- `npm install -D @types/node`
- `npx shadcn@latest init`
- `npm install @reduxjs/toolkit react-redux`
- `npm i react-router`
- `npm install react-toastify`


### At `index.css` :----------
```css
@import "tailwindcss";
```

### At `tsconfig.json` :----------

```json
// ...,
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
// ...
```

### At `tsconfig.app.json` :----------

```json
"compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
}
```

## At `vite.config.ts` :----------

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
  },
});
```

---

## 🧩 **Page List**

- **/books** – Displays a list of all books with options to view, edit, delete, and borrow.
- **/create-book** – Form interface to add a new book to the system.
- **/books/:id** – Detailed view of a single book’s information.
- **/borrow-summary** – Displays an aggregated summary of all borrowed books

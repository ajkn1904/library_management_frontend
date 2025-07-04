import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-iota-sage.vercel.app/api/",
  }),

  tagTypes: ["book", "borrow"],

  endpoints: (builder) => ({
    //Book Endpoints
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book", "borrow"],
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    editBook: builder.mutation({
      query: ({id, newBookData}) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: newBookData,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: ({id}) => ({
        url: `/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["book"],
    }),

    //Borrow Endpoints
    getBorrows: builder.query({
      query: () => "/borrow",
      providesTags: ["book", "borrow"],
    }),
    createBorrow: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBorrowsQuery,
  useCreateBorrowMutation,
  useEditBookMutation,
  useDeleteBookMutation
} = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-iota-sage.vercel.app/api/" }),

    tagTypes: ["book", "borrow"],

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book", "borrow"],
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),
        invalidatesTags: ["book"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation} = baseApi;

"use client";
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const transactionsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      let accessToken = ""
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        accessToken = user?.accessToken
      }
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ["transactions"],
  reducerPath: "transactionsApi",
  endpoints: (build) => ({
    
    getAllTransaction: build.query({
      query: () => `/user/transactions-overview`,
      providesTags: ["transactions"],
    }),
  }),
});

export const {
  useGetAllTransactionQuery
} = transactionsApi;
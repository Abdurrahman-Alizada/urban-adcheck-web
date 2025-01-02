"use client"
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const packageApi = createApi({
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

  tagTypes: ["Packages"],
  reducerPath: "packageApi",
  endpoints: (build) => ({
    getAllPackages: build.query({
      query: () => `/packages/getAll`,
      providesTags: ["Packages"],
    }),
  }),
});

export const {
  useGetAllPackagesQuery
} = packageApi;
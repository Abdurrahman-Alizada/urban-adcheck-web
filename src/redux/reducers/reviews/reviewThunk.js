"use client";
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const reviewApi = createApi({
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

  tagTypes: ["reviews"],
  reducerPath: "reviewApi",
  endpoints: (build) => ({
    createReview: build.mutation({
      query: data => ({
        url: `/user/review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),


    updateReviewByWatchdog: build.mutation({
      query: (data) => ({
        url: `/user/review/${data?.reviewId}`,
        method: 'PUT',
        body: data.info,
      })
    }),
    getReviewOfJob: build.query({
      query: (jobId) => `/user/job/review/${jobId}`,
      providesTags: ["reviews"]
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewOfJobQuery,
  useUpdateReviewByWatchdogMutation
} = reviewApi;
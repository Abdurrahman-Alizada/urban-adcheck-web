"use client"
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const jobApi = createApi({
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
            // hello
            return headers;
        },
    }),

    tagTypes: ["Job",],
    reducerPath: "jobApi",
    endpoints: (build) => ({

        createJob: build.mutation({
            query: formData1 => ({
                url: `/user/jobs`,
                method: 'POST',
                body: formData1,
                formData: true,
                prepareHeaders: (headers) => {
                    headers.delete('Content-Type');
                    return headers;
                },
            }),
            invalidatesTags: ['Job'],
        }),

        getAllJobs: build.query({
            query: () => `/jobs`,
            providesTags: ["Job"],
        }),
    }),
});

export const {
    useCreateJobMutation,
    useGetAllJobsQuery
} = jobApi;
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

    tagTypes: ["Job","acceptOrRejectWatchdog"],
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
        updateJob: build.mutation({
            query: data => ({
                url: `/user/jobs/${data?._id}`,
                method: 'PUT',
                body: data?.data
            }),
            invalidatesTags: ['Job'],
        }),
        subscribePackage: build.mutation({
            query: data => ({
                url: `/create-checkout-session`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Job'],
        }),
        acceptOrRejectWatchdog: build.mutation({
            query: data => ({
                url: `/user/jobs/${data.jobId}/watchdog-report/${data.reportId}/action`,
                method: 'POST',
                body: data.body,
            }),
            invalidatesTags: ['Job'],
        }),

        acceptJobByWatchDog: build.mutation({
            query: data => ({
                url: `/user/jobs/${data.jobId}/accept`,
                method: 'PUT'
            }),
            invalidatesTags: ['Job'],
        }),

        getAllJobs: build.query({
            query: () => `/jobs`,
            providesTags: ["Job"],
        }),
        jobList: build.query({
            query: (filters) => {
                const queryString = new URLSearchParams(filters).toString();
                return `/user/jobs?${queryString}`;
            },
            providesTags: ["Job"],
        }),
        jobDetails: build.query({
            query: (jobId) => `/user/jobs/${jobId}`,
            providesTags: ["Job"],
        }),
        jobSummary: build.query({
            query: () => `/user/jobs/watchdog/jobsSummary`,
            providesTags: ["Job"],
        }),
        jobbystatus: build.query({
            query: () => `/jobs/jobsByStatus`,
            providesTags: ["Job"],
        }),
    }),
});

export const {
    useJobSummaryQuery,
    useJobbystatusQuery,
    useSubscribePackageMutation,
    useCreateJobMutation,
    useAcceptOrRejectWatchdogMutation,
    useGetAllJobsQuery,
    useJobListQuery,
    useJobDetailsQuery,
    useUpdateJobMutation,
    useAcceptJobByWatchDogMutation

} = jobApi;
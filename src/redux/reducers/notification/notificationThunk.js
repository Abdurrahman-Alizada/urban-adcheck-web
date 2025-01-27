"use client"
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const notificationApi = createApi({
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

    tagTypes: ["notification"],
    reducerPath: "notificationApi",
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
            invalidatesTags: ['notification'],
        }),

        UpdateNotification: build.mutation({
            query: (data) => ({
              url: `/users/notifications/catalog/${data.notifcationId}`,
              method: 'PUT',
              body:data.info
            }),
            invalidatesTags: ["notification"],
          }),
        
        getAllNotification: build.query({
            query: () => `/users/notifications/catalog`,
            providesTags: ["notification"],
        }),
    }),
});

export const {
    useGetAllNotificationQuery,
    useUpdateNotificationMutation
} = notificationApi;
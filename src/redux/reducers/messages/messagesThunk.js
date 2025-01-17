"use client";
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const messagesApi = createApi({
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

  tagTypes: ["messages", "getRoomById","getAllMessagesRoom","sendMessageRoutes"],
  reducerPath: "messagesApi",
  endpoints: (build) => ({
    sendMessageRoutes: build.mutation({
      query: data => ({
        url: `/users/message/rooms`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['sendMessageRoutes'],
    }),
    updateMessageRoutes: build.mutation({
      query: data => ({
        url: `/users/message/room/${data?.roomId}`,
        method: 'PUT',
        body: data?.newMessage,
      }),
      invalidatesTags: ['sendMessageRoutes'],
    }),
    getRoomByJobId: build.query({
      query: (jobId) => `/users/message/room/getRoomByJob/${jobId}`,
      providesTags: ["messages", "getRoomById"],
    }),
    getRoomById: build.query({
      query: (Id) => `/users/message/room/${Id}`,
      providesTags: ["messages"],
    }),
    getAllMessagesRoom: build.query({
        query: (data) => `/users/message/rooms`,
        providesTags: ["messages", "getAllMessagesRoom"],
      }),
  }),
});

export const {
  useGetAllMessagesRoomQuery,
  useGetRoomByJobIdQuery,
  useSendMessageRoutesMutation,
  useUpdateMessageRoutesMutation,
  useGetRoomByIdQuery
} = messagesApi;
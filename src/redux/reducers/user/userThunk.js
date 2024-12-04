"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../axios";


export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      let token = ""
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        token = user?.token
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // hello
      return headers;
    },
  }),
  tagTypes: ["User", "CurrentLoginUser"],
  reducerPath: "userApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: user => ({
        url: `/user/login`,
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    signupUser: build.mutation({
        query: user => ({
          url: `/user/login`,
          method: 'POST',
          body: {
            email: user.email,
            password: user.password,
          },
        }),
        invalidatesTags: ['User'],
      }),
    getCurrentLoginUser: build.query({
      query: () => `/user/currentLoginUser`,
      providesTags: ["User","CurrentLoginUser"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,

  useGetCurrentLoginUserQuery,
} = userApi;
"use client"
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
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

  tagTypes: ["User", "CurrentLoginUser", "loginUser", "signupUser", "signOutUser"],
  reducerPath: "userApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: user => ({
        url: `/user/session`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['loginUser'],
    }),
    signupUser: build.mutation({
      query: user => ({
        url: `/user/signup`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['signupUser'],
    }),
    forgotPassword: build.mutation({
      query: email => ({
        url: `/user/account/forget-password`,
        method: 'PUT',
        body: email
      })
    }),
    resetPassword: build.mutation({
      query: password => ({
        url: `/user/reset`,
        method: 'PUT',
        body: password,
      })
    }),
    UpdateUser:build.mutation({
      query: User => ({
        url: `/user/self`,
        method: 'PUT',
        body: User,
      })
    }),
    signOutUser: build.mutation({
      query: () => ({
        url: `/user/session`,
        method: 'DELETE',
      })
    }),
    getCurrentLoginUser: build.query({
      query: () => `/user/self`,
      providesTags: ["User", "CurrentLoginUser"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetCurrentLoginUserQuery,
  useSignOutUserMutation
} = userApi;
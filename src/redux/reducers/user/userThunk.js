"use client"
import ForgotPassword from "@/app/auth/forgotpassword/page";
import { baseURL } from "@/redux/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.token; // Access the token from Redux store
        if (token) {
            headers.set('Authorization', `Bearer ${token}`); // Add token to headers
        }
        return headers;
    },
    }),

  tagTypes: ["User", "CurrentLoginUser","loginUser","signupUser"],
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
    forgotPassword:build.mutation({
        query: email=> ({
          url: `/user/account/forget-password`,
          method:'PUT',
          body: email
        })
      }),
    resetPassword:build.mutation({
        query: user=>({
        url:`/user/account/reset-password`,
        method:'GET',
        body: user,

        })
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentLoginUserQuery,
} = userApi;
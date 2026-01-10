import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "@/app/AuthSlice";
import { data } from "react-router-dom";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result?.data?.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result?.data?.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadMe: builder.query({
      query: () => "/me",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(setUser(result?.data?.user));
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(setUser(null));
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLoadMeQuery,useLogoutMutation } =
  authApi;

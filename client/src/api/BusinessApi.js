import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BusinessApi = createApi({
  reducerPath: "Business",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/business",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerBusiness: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllBusiness: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    getBusinessById: builder.query({
      query: (id) => ({ url: `/business/${id}`, method: "GET" }),
    }),
    editBusiness: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/updateBusiness/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterBusinessMutation,
  useGetAllBusinessQuery,
  useGetBusinessByIdQuery,
  useEditBusinessMutation,
} = BusinessApi;

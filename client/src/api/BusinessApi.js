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
    searchBusiness: builder.query({
      query: (params) => {
        const qs = new URLSearchParams(params).toString();
        return `/search?${qs}`;
      },
    }),
    filterBusiness: builder.query({
      query: (params) => {
        const query = new URLSearchParams(params).toString();
        return `/filter?${query}`;
      },
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `/updateStatus/${id}`,
        method: "PATCH",
      }),
    }),
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `/deleteBusiness/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterBusinessMutation,
  useGetAllBusinessQuery,
  useGetBusinessByIdQuery,
  useEditBusinessMutation,
  useSearchBusinessQuery,
  useFilterBusinessQuery,
  useUpdateStatusMutation,
  useDeleteBusinessMutation,
} = BusinessApi;

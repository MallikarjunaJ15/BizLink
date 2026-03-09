import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = import.meta.env.VITE_OWNERAVAILABILITY_URL;
export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    credentials: "include",
  }),
  tagTypes: ["Availability"],
  endpoints: (builder) => ({
    setAvailability: builder.mutation({
      query: ({ businessId, ...data }) => ({
        url: `/set/${businessId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Availability"],
    }),

    getAvailability: builder.query({
      query: (businessId) => `/${businessId}`,
      providesTags: ["Availability"],
    }),
  }),
});

export const { useGetAvailabilityQuery, useSetAvailabilityMutation } =
  availabilityApi;

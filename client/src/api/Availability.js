import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const url = import.meta.VITE_OWNERAVAILABILITY_UL;
export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    credentials: "include",
  }),
  tagTypes: ["Availability"],
  endpoints: (builder) => ({
    setAvailability: builder.mutation({
      query: (data) => ({
        url: "/set",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

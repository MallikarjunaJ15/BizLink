import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const meetingUrl = import.meta.env.VITE_MEETING_URL;
export const meetingApi = createApi({
  reducerPath: "meetingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: meetingUrl,
    credentials: "include",
  }),
  tagTypes: ["Meetings"],
  endpoints: (builder) => ({
    bookMeeting: builder.mutation({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meetings"],
    }),
  }),
});

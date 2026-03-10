import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const meetingUrl = import.meta.env.VITE_MEETING_URL;
console.log(meetingUrl);
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
export const { useBookMeetingMutation } = meetingApi;

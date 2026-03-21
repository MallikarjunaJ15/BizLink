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
    getUserMeetings: builder.query({
      query: (filter) => `/my-meetings?filter=${filter || ""}`,
      providesTags: ["Meetings"],
    }),
    handleApproval: builder.mutation({
      query: ({ meetingId, action, reason }) => ({
        url: `/${meetingId}/approval`,
        method: "PATCH",
        body: { action, reason },
      }),
      invalidatesTags: ["Meetings"],
    }),
    cancelMeeting: builder.mutation({
      query: ({ meetingId, reason }) => ({
        url: `/${meetingId}/cancel`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Meetings"],
    }),
  }),
});
export const { useBookMeetingMutation, useGetUserMeetingsQuery ,useHandleApprovalMutation,useCancelMeetingMutation} = meetingApi;

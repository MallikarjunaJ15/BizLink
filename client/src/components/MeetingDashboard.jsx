// components/MeetingsDashboard.jsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Video,
} from "lucide-react";
import { toast } from "sonner";

const MeetingsDashboard = () => {
  const [filter, setFilter] = useState("upcoming");

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <Loader2 className="w-8 h-8 animate-spin text-[#d90429]" />
//       </div>
//     );
//   }

  return (
    <div className="font-display">
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 bg-white rounded-2xl p-2 shadow-md">
        {["upcoming", "pending", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all capitalize ${
              filter === tab
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white"
                : "text-[#8d99ae] hover:text-[#2b2d42]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {[1,2,3]?.meetings?.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Calendar className="w-16 h-16 text-[#8d99ae] mx-auto mb-4" />
            <p className="text-[#8d99ae] text-lg">No {filter} meetings</p>
          </div>
        ) : (
          [1,2,3]?.meetings?.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#8d99ae]/10 hover:border-[#d90429]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Business Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={meeting.business.BusinessThumbnail}
                    alt={meeting.business.Businessname}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meeting Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-[#2b2d42] text-lg mb-2">
                    {meeting.business.Businessname}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-[#8d99ae] mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(meeting.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {meeting.startTime} - {meeting.endTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {meeting.buyer.name}
                    </div>
                  </div>

                  {/* Meeting Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        meeting.meetingType === "FIRST_MEETING"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {meeting.meetingType === "FIRST_MEETING"
                        ? "First Meeting"
                        : "Follow-up"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        meeting.status === "SCHEDULED"
                          ? "bg-green-100 text-green-700"
                          : meeting.status === "COMPLETED"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>

                  {/* Approval Buttons (for pending follow-ups) */}
                  {meeting.requiresApproval &&
                    meeting.approvalStatus === "PENDING" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(meeting._id)}
                          disabled={approving}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(meeting._id)}
                          disabled={approving}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                  {/* Join Meeting Button (for scheduled meetings) */}
                  {meeting.status === "SCHEDULED" &&
                    meeting.approvalStatus !== "PENDING" && (
                      <button className="flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all">
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingsDashboard;

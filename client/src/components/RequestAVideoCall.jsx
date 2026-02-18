// components/RequestVideoCallModal.jsx
import React, { useState } from "react";
import {
  X,
  Video,
  Calendar,
  Clock,
  User,
  Building2,
  Send,
  MessageSquareHeart,
} from "lucide-react";

const RequestVideoCallModal = ({ business, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelcctedTime] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      businessId: business._id,
      ownerId: business.owner._id,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-display">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-3 rounded-xl">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Request Video Call
            </h2>
          </div>
          <p className="text-white/80 text-sm">
            Schedule a meeting to discuss this business
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[#edf2f4] to-white border-b-2 border-[#8d99ae]/10">
          <div className="flex items-start gap-4">
            {/* Business Thumbnail */}
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <img
                src={business.BusinessThumbnail}
                alt={business.Businessname}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Business Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-[#d90429]" />
                <h3 className="font-bold text-[#2b2d42] text-lg">
                  {business.Businessname}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-[#8d99ae]">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Owner: {business.owner.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#8d99ae]">
                <MessageSquareHeart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {business.owner.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="p-6" onSubmit={handleSubmit}>
          {/* Date Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-[#2b2d42] font-bold mb-2">
              <Calendar className="w-5 h-5 text-[#d90429]" />
              Select Date
            </label>
            <input
              type="date"
              min={today}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
              required
            />
          </div>

          {/* Time Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-[#2b2d42] font-bold mb-2">
              <Clock className="w-5 h-5 text-[#d90429]" />
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelcctedTime(e.target.value)}
              className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#8d99ae]/20 text-[#2b2d42] py-3 rounded-xl font-bold hover:bg-[#8d99ae]/30 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Request Call
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestVideoCallModal;

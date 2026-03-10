// components/RequestVideoCallModal.jsx (COMPLETELY FIXED)
import React, { useState } from "react";
import {
  X,
  Video,
  Calendar,
  Clock,
  User,
  Building2,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useGetAvailableSlotsQuery } from "@/api/Availability";
import { toast } from "sonner";

const RequestVideoCallModal = ({ business, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7); // 30 days ahead
  const maxDateStr = maxDate.toISOString().split("T")[0];

  // Fetch available slots when date is selected
  const { data, isLoading, error } = useGetAvailableSlotsQuery(
    {
      businessId: business._id,
      date: selectedDate,
    },
    { skip: !selectedDate },
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    onSubmit({
      businessId: business._id,
      ownerId: business.owner._id,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-display">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] p-6 relative sticky top-0 z-10">
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
            <h2 className="text-2xl font-bold text-white">Book a Meeting</h2>
          </div>
          <p className="text-white/80 text-sm">
            Schedule a video call with the business owner
          </p>
        </div>

        {/* Business Info */}
        <div className="p-6 bg-gradient-to-br from-[#edf2f4] to-white border-b-2 border-[#8d99ae]/10">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <img
                src={business.BusinessThumbnail}
                alt={business.Businessname}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-[#d90429]" />
                <h3 className="font-bold text-[#2b2d42] text-lg">
                  {business.Businessname}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-[#8d99ae] mb-1">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Owner: {business?.owner?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#8d99ae]">
                <Clock className="w-4 h-4" />
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
              max={maxDateStr}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null); // Reset slot when date changes
              }}
              className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
              required
            />
          </div>

          {/* Available Time Slots */}
          {selectedDate && (
            <div className="mb-6">
              <label className="flex items-center gap-2 text-[#2b2d42] font-bold mb-3">
                <Clock className="w-5 h-5 text-[#d90429]" />
                Available Time Slots
              </label>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#d90429]" />
                  <p className="ml-3 text-[#8d99ae]">
                    Loading available slots...
                  </p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 font-semibold">
                      Failed to load slots
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Please try again later
                    </p>
                  </div>
                </div>
              ) : data?.slots?.length === 0 ? (
                <div className="bg-[#edf2f4] rounded-xl p-8 text-center border-2 border-dashed border-[#8d99ae]/30">
                  <Clock className="w-16 h-16 text-[#8d99ae] mx-auto mb-3 opacity-50" />
                  <p className="text-[#2b2d42] font-semibold mb-1">
                    No slots available
                  </p>
                  <p className="text-[#8d99ae] text-sm">
                    {data?.message || "Owner is not available on this date"}
                  </p>
                  {data?.dayOfWeek && (
                    <p className="text-[#8d99ae] text-xs mt-2">
                      Try selecting a different day
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {/* Availability Info */}
                  {data?.ownerAvailability && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-blue-700">
                        Owner is available from{" "}
                        <span className="font-bold">
                          {data.ownerAvailability.startTime}
                        </span>{" "}
                        to{" "}
                        <span className="font-bold">
                          {data.ownerAvailability.endTime}
                        </span>{" "}
                        ({data.ownerAvailability.slotDuration} min slots)
                      </p>
                    </div>
                  )}

                  {/* Slot Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {data?.slots?.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl font-semibold transition-all text-sm ${
                          selectedSlot?.startTime === slot.startTime
                            ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg scale-105"
                            : "bg-[#edf2f4] text-[#2b2d42] hover:bg-[#8d99ae]/20 hover:scale-105"
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    ))}
                  </div>

                  {/* Slot Counter */}
                  <p className="text-xs text-[#8d99ae] mt-3 text-center">
                    {data.availableSlots} of {data.totalSlots} slots available
                  </p>
                </>
              )}
            </div>
          )}

          {/* Selected Slot Display */}
          {selectedSlot && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-sm text-[#8d99ae] mb-1">Selected Time</p>
              <p className="text-lg font-bold text-green-700">
                {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Duration: {selectedSlot.duration} minutes
              </p>
            </div>
          )}

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
              disabled={!selectedSlot}
              className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              <Send className="w-5 h-5" />
              Book Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestVideoCallModal;

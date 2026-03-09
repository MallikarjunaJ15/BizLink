// components/OwnerAvailabilityDashboard.jsx (COMPLETELY REDESIGNED)
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Save,
  Loader2,
  Zap,
  ChevronDown,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useGetAvailabilityQuery } from "@/api/Availability";
import { useSetAvailabilityMutation } from "@/api/Availability";
import { useParams } from "react-router-dom";

const OwnerAvailabilityDashboard = () => {
  const { businessId } = useParams();
  // console.log(businessId);
  const { data: availabilityData, isLoading: loadingAvailability } =
    useGetAvailabilityQuery(businessId);

  const [setAvailability, { isLoading: saving }] = useSetAvailabilityMutation();
  const [buffer, setBuffer] = useState(15);
  const [defaultSlotDuration, setDefaultSlotDuration] = useState(30);
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  useEffect(() => {
    if (availabilityData?.availability) {
      const existing = availabilityData.availability.weekdays;
      const updatedSchedule = {};

      Object.keys(existing).forEach((day) => {
        if (existing[day]?.startTime) {
          updatedSchedule[day] = [
            {
              id: Date.now(),
              startTime: existing[day].startTime,
              endTime: existing[day].endTime,
              slotDuration: existing[day].slotDuration || 30,
            },
          ];
        } else {
          updatedSchedule[day] = [];
        }
      });

      setWeeklySchedule(updatedSchedule);
      setBuffer(availabilityData.availability.buffer || 15);
    }
  }, [availabilityData]);

  // Add time slot to a day
  const addTimeSlot = (day) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: [
        ...prev[day],
        {
          id: Date.now(),
          startTime: "09:00",
          endTime: "17:00",
          slotDuration: defaultSlotDuration,
        },
      ],
    }));
  };

  // Remove time slot
  const removeTimeSlot = (day, slotId) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }));
  };

  // Update time slot
  const updateTimeSlot = (day, slotId, field, value) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot,
      ),
    }));
  };

  // Save availability
  const handleSave = async () => {
    try {
      // Format weekly schedule
      const formattedWeekdays = {};
      Object.keys(weeklySchedule).forEach((day) => {
        if (weeklySchedule[day].length > 0) {
          formattedWeekdays[day] = {
            startTime: weeklySchedule[day][0].startTime,
            endTime: weeklySchedule[day][0].endTime,
            slotDuration: weeklySchedule[day][0].slotDuration,
          };
        } else {
          formattedWeekdays[day] = null;
        }
      });

      await setAvailability({
        businessId,
        weekdays: formattedWeekdays,
        buffer,
        timeZone: "Asia/Kolkata",
      }).unwrap();

      toast.success("Availability saved successfully! 🎉");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save availability");
    }
  };

  if (loadingAvailability) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#d90429]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#8d99ae]/10 overflow-hidden font-display">
      {/* Header */}

      <div className="p-8">
        {/* Global Settings */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#edf2f4] to-white p-5 rounded-xl border-2 border-[#8d99ae]/20">
            <label className="block text-[#2b2d42] font-bold mb-2 text-sm">
              🕐 Default Slot Duration
            </label>
            <select
              value={defaultSlotDuration}
              onChange={(e) => setDefaultSlotDuration(Number(e.target.value))}
              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-3 font-semibold focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>

          <div className="bg-gradient-to-br from-[#edf2f4] to-white p-5 rounded-xl border-2 border-[#8d99ae]/20">
            <label className="block text-[#2b2d42] font-bold mb-2 text-sm">
              ⏱️ Buffer Between Meetings
            </label>
            <select
              value={buffer}
              onChange={(e) => setBuffer(Number(e.target.value))}
              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-3 font-semibold focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
            >
              <option value={0}>No buffer</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#2b2d42]">
              Weekly Recurring Schedule
            </h3>
            <p className="text-sm text-[#8d99ae]">
              Add multiple time slots per day
            </p>
          </div>

          {Object.keys(weeklySchedule).map((day) => (
            <div
              key={day}
              className="bg-gradient-to-br from-white to-[#edf2f4] rounded-2xl border-2 border-[#8d99ae]/20 overflow-hidden hover:border-[#d90429]/30 transition-all"
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] p-4 flex items-center justify-between">
                <span className="text-white font-bold capitalize text-lg">
                  {day}
                </span>
                <button
                  onClick={() => addTimeSlot(day)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add Slot
                </button>
              </div>

              {/* Time Slots */}
              <div className="p-4 space-y-3">
                {weeklySchedule[day].length === 0 ? (
                  <div className="text-center py-8 text-[#8d99ae]">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No availability set for {day}</p>
                  </div>
                ) : (
                  weeklySchedule[day].map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white p-4 rounded-xl border-2 border-[#8d99ae]/20 hover:border-[#d90429]/40 transition-all"
                    >
                      <div className="grid grid-cols-4 gap-3 items-center">
                        <div>
                          <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                            Start
                          </label>
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) =>
                              updateTimeSlot(
                                day,
                                slot.id,
                                "startTime",
                                e.target.value,
                              )
                            }
                            className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold focus:ring-2 focus:ring-[#d90429]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                            End
                          </label>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) =>
                              updateTimeSlot(
                                day,
                                slot.id,
                                "endTime",
                                e.target.value,
                              )
                            }
                            className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold focus:ring-2 focus:ring-[#d90429]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                            Duration
                          </label>
                          <select
                            value={slot.slotDuration}
                            onChange={(e) =>
                              updateTimeSlot(
                                day,
                                slot.id,
                                "slotDuration",
                                Number(e.target.value),
                              )
                            }
                            className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold focus:ring-2 focus:ring-[#d90429]"
                          >
                            <option value={15}>15m</option>
                            <option value={30}>30m</option>
                            <option value={45}>45m</option>
                            <option value={60}>60m</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeTimeSlot(day, slot.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-all hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t-2 border-[#8d99ae]/20">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {saving ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Save Availability
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerAvailabilityDashboard;

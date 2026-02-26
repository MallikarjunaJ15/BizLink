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

const OwnerAvailabilityDashboard = ({ businessId }) => {
  const [specificDates, setSpecificDates] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [mode, setMode] = useState("recurring");
  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#8d99ae]/10 overflow-hidden font-display">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2b2d42] via-[#8d99ae] to-[#2b2d42] p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Availability Settings
            </h2>
            <p className="text-white/80 text-sm">
              Control when buyers can book meetings
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setMode("recurring")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
              mode === "recurring"
                ? "bg-white text-[#2b2d42] shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            📅 Weekly Schedule
          </button>
          <button
            onClick={() => setMode("specific")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
              mode === "specific"
                ? "bg-white text-[#2b2d42] shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            📆 Specific Dates
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Global Settings */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#edf2f4] to-white p-5 rounded-xl border-2 border-[#8d99ae]/20">
            <label className="block text-[#2b2d42] font-bold mb-2 text-sm">
              🕐 Default Slot Duration
            </label>
            <select className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-3 font-semibold focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all">
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
            <select className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-3 font-semibold focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all">
              <option value={0}>No buffer</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </div>

        {/* Weekly Schedule Mode */}
        {mode === "recurring" && (
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
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105">
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
                              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold focus:ring-2 focus:ring-[#d90429]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                              End
                            </label>
                            <input
                              type="time"
                              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold focus:ring-2 focus:ring-[#d90429]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                              Duration
                            </label>
                            <select
                              value={slot.slotDuration}
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
        )}

        {/* Specific Dates Mode */}
        {mode === "specific" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#2b2d42]">
                  Specific Date Availability
                </h3>
                <p className="text-sm text-[#8d99ae]">
                  Override weekly schedule for specific dates
                </p>
              </div>
              <button className="bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <Plus className="w-5 h-5" />
                Add Date
              </button>
            </div>

            {specificDates.length === 0 ? (
              <div className="bg-gradient-to-br from-[#edf2f4] to-white rounded-2xl p-12 text-center border-2 border-dashed border-[#8d99ae]/30">
                <Calendar className="w-16 h-16 text-[#8d99ae] mx-auto mb-4 opacity-50" />
                <p className="text-[#8d99ae] font-semibold">
                  No specific dates added yet
                </p>
                <p className="text-sm text-[#8d99ae] mt-2">
                  Add custom availability for holidays, special events, etc.
                </p>
              </div>
            ) : (
              specificDates.map((dateObj) => (
                <div
                  key={dateObj.id}
                  className="bg-gradient-to-br from-white to-[#edf2f4] rounded-2xl border-2 border-[#8d99ae]/20 overflow-hidden"
                >
                  {/* Date Header */}
                  <div className="bg-gradient-to-r from-[#d90429] to-[#ef233c] p-4 flex items-center justify-between">
                    <input
                      type="date"
                      className="bg-white/20 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-lg border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <div className="flex items-center gap-2">
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all">
                        <Plus className="w-4 h-4" />
                        Add Slot
                      </button>
                      <button className="bg-white/20 hover:bg-red-500 text-white p-2 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="p-4 space-y-3">
                    {dateObj.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="bg-white p-4 rounded-xl border-2 border-[#8d99ae]/20"
                      >
                        <div className="grid grid-cols-4 gap-3 items-center">
                          <div>
                            <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                              Start
                            </label>
                            <input
                              type="time"
                              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                              End
                            </label>
                            <input
                              type="time"
                              className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#8d99ae] font-semibold mb-1">
                              Duration
                            </label>
                            <select className="w-full border-2 border-[#8d99ae]/30 rounded-lg p-2 text-sm font-semibold">
                              <option value={15}>15m</option>
                              <option value={30}>30m</option>
                              <option value={45}>45m</option>
                              <option value={60}>60m</option>
                            </select>
                          </div>
                          <div className="flex justify-end">
                            <button className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t-2 border-[#8d99ae]/20">
          <button className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
            <Save className="w-6 h-6" />
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerAvailabilityDashboard;

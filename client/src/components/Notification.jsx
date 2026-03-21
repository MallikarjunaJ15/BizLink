import React, { useState, useEffect } from "react";
import { Bell, X, Video, CheckCircle, XCircle, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Notification = () => {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const socket = io("http://localhost:5000");

    // Join with user ID
    socket.emit("user:join", user._id);
    console.log("🔔 Connected to notifications");

    // Listen for notifications
    socket.on("receive:notification", (notification) => {
      console.log("🔔 New notification:", notification);

      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/logo.png",
        });
      }
    });

    // Request browser notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      console.log("🔔 Disconnected from notifications");
      socket.disconnect();
    };
  }, [user?._id]);

  const handleNotificationClick = (notification) => {
    // Navigate based on notification type
    if (notification.type === "MEETING_REQUEST") {
      navigate("/meetings?tab=pending");
    } else if (notification.type === "MEETING_APPROVED") {
      navigate("/meetings?tab=upcoming");
    } else if (notification.meetingId) {
      navigate(`/meetings`);
    }
    setShowDropdown(false);
  };

  const clearNotification = (index, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
          setUnreadCount(0);
        }}
        className="relative p-2 hover:bg-[#edf2f4] rounded-full transition-all"
      >
        <Bell className="w-6 h-6 text-[#2b2d42]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#d90429] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#8d99ae]/20 overflow-hidden z-[9999]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-white/80 hover:text-white text-sm font-semibold transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-[#8d99ae] mx-auto mb-3 opacity-50" />
                  <p className="text-[#8d99ae] font-semibold">
                    No notifications
                  </p>
                  <p className="text-[#8d99ae] text-sm mt-1">
                    You're all caught up! 🎉
                  </p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    onClick={() => handleNotificationClick(notification)}
                    className="p-4 border-b border-[#8d99ae]/10 hover:bg-[#edf2f4] cursor-pointer transition-colors group relative"
                  >
                    <button
                      onClick={(e) => clearNotification(index, e)}
                      className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>

                    <div className="flex items-start gap-3 pr-8">
                      {/* Icon based on type */}
                      <div
                        className={`p-2 rounded-full ${
                          notification.type === "MEETING_REQUEST"
                            ? "bg-blue-100"
                            : notification.type === "MEETING_APPROVED"
                              ? "bg-green-100"
                              : notification.type === "MEETING_REJECTED"
                                ? "bg-red-100"
                                : "bg-[#edf2f4]"
                        }`}
                      >
                        {notification.type === "MEETING_REQUEST" && (
                          <Clock className="w-5 h-5 text-blue-600" />
                        )}
                        {notification.type === "MEETING_APPROVED" && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {notification.type === "MEETING_REJECTED" && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        {!notification.type && (
                          <Video className="w-5 h-5 text-[#d90429]" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-[#2b2d42] font-semibold text-sm mb-1">
                          {notification.title}
                        </p>
                        <p className="text-[#8d99ae] text-xs">
                          {notification.message}
                        </p>
                        <p className="text-[#8d99ae] text-xs mt-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

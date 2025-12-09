// src/components/NotificationBell.jsx
"use client";
import { useState, useEffect } from "react";
import { Bell, X, Check, XCircle, Trash2, CheckCheck } from "lucide-react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on mount AND every 30 seconds
  useEffect(() => {
    loadNotifications();
    
    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    const handleRefresh = () => loadNotifications();
    window.addEventListener("notifications-updated", handleRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notifications-updated", handleRefresh);
    };
  }, []);

  async function loadNotifications() {
    try {
      const res = await fetch("/api/notifications");
      const json = await res.json();
      
      if (json.success) {
        const notifs = json.data || [];
        setNotifications(notifs);
        
        const unread = notifs.filter(n => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  }

  async function markAsRead(notificationId) {
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notificationId }),
      });
      
      if (res.ok) {
        setNotifications(prev => 
          prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  }

  async function markAllAsRead() {
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n._id);
      
      for (const id of unreadIds) {
        await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      }
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Mark all as read error:", err);
    }
  }

  async function clearNotification(notificationId) {
    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        loadNotifications(); // Refresh to update count
      }
    } catch (err) {
      console.error("Clear notification error:", err);
    }
  }

  async function handleAccept(invitationId) {
    try {
      const res = await fetch(`/api/notifications/${invitationId}/accept`, {
        method: "POST",
      });
      
      const json = await res.json();
      
      if (json.success) {
        alert("Invitation accepted! Reloading...");
        window.location.reload();
      } else {
        alert(json.error || "Failed to accept invitation");
      }
    } catch (err) {
      console.error("Accept invitation error:", err);
      alert("Network error");
    }
  }

  async function handleDecline(invitationId) {
    try {
      const res = await fetch(`/api/notifications/${invitationId}/decline`, {
        method: "POST",
      });
      
      const json = await res.json();
      
      if (json.success) {
        loadNotifications();
      } else {
        alert(json.error || "Failed to decline invitation");
      }
    } catch (err) {
      console.error("Decline invitation error:", err);
      alert("Network error");
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) loadNotifications();
        }}
        className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-lg text-gray-900">Notifications</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No notifications yet</p>
                  <p className="text-sm mt-1">We'll notify you when something happens</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notif.read ? "bg-teal-50/30 border-l-2 border-teal-500" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {/* Icon based on type */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notif.type === "invitation" ? "bg-purple-100" : "bg-teal-100"
                        }`}>
                          {notif.type === "invitation" && <Bell className="w-4 h-4 text-purple-600" />}
                          {notif.type === "invitation_accepted" && <Check className="w-4 h-4 text-teal-600" />}
                          {notif.type === "task_assigned" && <CheckCheck className="w-4 h-4 text-blue-600" />}
                          {!notif.type && <Bell className="w-4 h-4 text-gray-600" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            {notif.type === "invitation" && "🎉 Workspace Invitation"}
                            {notif.type === "invitation_accepted" && "✅ Invitation Accepted"}
                            {notif.type === "task_assigned" && "📋 Task Assigned"}
                            {notif.type === "task_completed" && "✅ Task Completed"}
                            {!notif.type && "📬 Notification"}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif._id)}
                              title="Mark as read"
                              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <Check className="w-4 h-4 text-gray-600" />
                            </button>
                          )}
                          <button
                            onClick={() => clearNotification(notif._id)}
                            title="Clear notification"
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>

                      {/* Invitation Actions */}
                      {notif.type === "invitation" && notif.status === "pending" && (
                        <div className="flex gap-2 mt-2 pl-11">
                          <button
                            onClick={() => handleAccept(notif._id)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 text-sm font-medium flex items-center justify-center gap-1.5 shadow-md transition-all"
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(notif._id)}
                            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Bell, X, Check, XCircle } from "lucide-react";

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
    }, 30000); // Check every 30 seconds

    // Listen for manual refresh triggers
  const handleRefresh = () => loadNotifications();
  window.addEventListener("notifications-updated", handleRefresh);

    return () =>{ clearInterval(interval);
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
        
        // Count unread
        const unread = notifs.filter(n => !n.read).length;
        setUnreadCount(unread);
        
        console.log("🔔 Loaded notifications:", notifs.length, "Unread:", unread);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
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
        alert("Invitation declined");
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
          if (!open) loadNotifications(); // Refresh when opening
        }}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-lg">Notifications</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`p-4 hover:bg-gray-50 ${!notif.read ? "bg-teal-50/30" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notif.type === "invitation" && "Workspace Invitation"}
                            {notif.type === "invitation_accepted" && "Invitation Accepted"}
                            {notif.type === "task_assigned" && "Task Assigned"}
                            {notif.type === "task_completed" && "Task Completed"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {notif.type === "invitation" && notif.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleAccept(notif._id)}
                            className="flex-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm flex items-center justify-center gap-1"
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(notif._id)}
                            className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-1"
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
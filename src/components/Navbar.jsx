// src/components/Navbar.jsx
"use client";
import { Search, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import NotificationBell from "@/components/NotificationBell";
import { signOut } from "next-auth/react";

const getInitials = (nameOrEmail) => {
  if (!nameOrEmail) return "U";
  const s = String(nameOrEmail).trim();
  if (!s) return "U";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  const letters = s.replace(/[^A-Za-z]/g, "");
  if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
  return s.slice(0, 2).toUpperCase();
};

export default function Navbar({ title }) {
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userInitials = getInitials(userName || userEmail);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-20 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-4 md:px-8 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("toggle-sidebar"));
            }
          }}
          aria-label="Toggle sidebar"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h1
          className="text-2xl text-gray-900 font-bold"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none"
          />
        </div>

        <NotificationBell />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
  {session?.user?.avatar ? (
    <img
      src={session.user.avatar}
      alt="avatar"
      className="w-10 h-10 object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-sm text-white font-bold">
      {userInitials}
    </div>
  )}
</div>

            <div className="hidden sm:block text-left">
              <p className="text-sm text-gray-900 font-semibold">{userName || userEmail}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{userName || userEmail}</p>
                <p className="text-xs text-gray-500 mt-0.5">{userEmail}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    window.location.href = "/settings";
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  View Profile
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    window.location.href = "/settings";
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </button>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

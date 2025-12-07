"use client";
import { Search, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import NotificationBell from "@/components/NotificationBell";
import { signOut } from "next-auth/react";

export default function Navbar({ title }) {
  const { data: session } = useSession();

  // Get user initials from name
  const getUserInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userInitials = getUserInitials(userName);

  return (
    <header className="relative z-20 h-20 bg-white/70 backdrop-blur-xl border-b border-white/30 flex items-center justify-between px-4 md:px-8 shadow-sm">
      {/* Mobile hamburger + title */}
      <div className="flex items-center">
        {/* Hamburger - visible only on small screens */}
        <button
          onClick={() => {
            // dispatch an app-level event listened by Sidebar
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("toggle-sidebar"));
            }
          }}
          aria-label="Toggle sidebar"
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition mr-3"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h1
          className="text-2xl text-gray-900"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-4 py-2.5 rounded-xl bg-white/60 border border-gray-200 text-sm focus:ring-2 focus:ring-teal-200 focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <NotificationBell />

        {/* Profile - Dynamic from session */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-sm text-white font-semibold">
            {userInitials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-gray-900 font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
           {/* Logout button */}
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="ml-2 px-3 py-1.5 bg-red-400 text-white rounded-lg text-sm hover:bg-red-700 transition"
    title="Sign out"
    aria-label="Sign out"
  >
    Logout
  </button>
        </div>
      </div>
    </header>
  );
}

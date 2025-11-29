"use client";
import { Search, Bell } from "lucide-react";

export default function Navbar({ title }) {
  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-white/30 flex items-center justify-between px-8 shadow-sm">
      <h1
        className="text-2xl text-gray-900"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-4 py-2.5 rounded-xl bg-white/60 border border-gray-200 text-sm focus:ring-2 focus:ring-teal-200 focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-3 hover:bg-white/70 rounded-xl transition-all">
          <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-teal-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-sm text-white font-semibold">
            JD
          </div>
          <div>
            <p className="text-sm text-gray-900 font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

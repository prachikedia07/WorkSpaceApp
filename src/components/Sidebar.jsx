"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Briefcase, DollarSign, Settings, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // listen for the toggle event dispatched by Navbar hamburger
  useEffect(() => {
    function onToggle() {
      setOpen((v) => !v);
    }
    window.addEventListener("toggle-sidebar", onToggle);
    return () => window.removeEventListener("toggle-sidebar", onToggle);
  }, []);

  // close sidebar on navigation when in mobile
  const handleNav = (path) => {
    router.push(path);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpen(false);
    }
  };

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "workspace", label: "Workspace", icon: Briefcase, path: "/workspace" },
    { id: "finance", label: "Finance", icon: DollarSign, path: "/finance" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white/60 backdrop-blur-lg border-r border-white/30 shadow-lg z-50 transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:inset-auto md:h-screen
        `}
        aria-hidden={false}
      >
        {/* Mobile header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-lg text-gray-900"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              TeamFinance
            </span>
          </div>

          {/* Close button visible only on mobile */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all text-left
                ${
                  active
                    ? "bg-gradient-to-r from-teal-50 to-teal-100 text-teal-600 shadow-sm"
                    : "text-gray-600 hover:bg-white/70 hover:shadow-sm"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-white/20">
          <div className="rounded-xl p-4 bg-white/60 backdrop-blur-md shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Current Plan</p>
            <p className="text-sm text-gray-900 font-medium">Pro Account</p>
          </div>
        </div>
      </aside>
    </>
  );
}

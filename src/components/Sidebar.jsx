"use client";
import { LayoutDashboard, Briefcase, DollarSign, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "workspace", label: "Workspace", icon: Briefcase, path: "/workspace" },
    { id: "finance", label: "Finance", icon: DollarSign, path: "/finance" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-72 h-screen flex flex-col border-r border-white/30 bg-white/60 backdrop-blur-lg shadow-lg">
      {/* Logo */}
      <div className="p-8 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl text-gray-900"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
          >
            TeamFinance
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${
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
  );
}

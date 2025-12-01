// src/app/dashboard/page.jsx (or wherever your DashboardPage lives)
"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Folder,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ReportsWidget from "@/components/ReportsWidget"; // ← new widget import

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userSummary, setUserSummary] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/dashboard" });
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/summary")
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setUserSummary(data);
        })
        .catch((err) => console.error("Error loading user summary:", err));
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  const chartData = [
    { month: "Jan", revenue: 4500, expenses: 3200 },
    { month: "Feb", revenue: 5200, expenses: 3800 },
    { month: "Mar", revenue: 4800, expenses: 3500 },
    { month: "Apr", revenue: 6100, expenses: 4200 },
    { month: "May", revenue: 7200, expenses: 4800 },
    { month: "Jun", revenue: 6800, expenses: 4500 },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "created a new project",
      project: "Q4 Marketing Campaign",
      time: "2 hours ago",
      avatar: "SC",
    },
    {
      id: 2,
      user: "Michael Ross",
      action: "added expense",
      project: "Office Supplies",
      time: "4 hours ago",
      avatar: "MR",
    },
    {
      id: 3,
      user: "Emma Wilson",
      action: "completed task",
      project: "Website Redesign",
      time: "5 hours ago",
      avatar: "EW",
    },
    {
      id: 4,
      user: "James Miller",
      action: "updated budget",
      project: "Development Team",
      time: "1 day ago",
      avatar: "JM",
    },
  ];

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 via-teal-50/20 to-transparent min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white/70 shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 capitalize">
          Welcome back, {userSummary?.name || session.user.name || "User"} 👋
        </h2>
        <p className="text-gray-600 mt-1">
          Your current plan: {userSummary?.plan || "Free"}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: `$${userSummary?.totalRevenue || 0}`,
            icon: <DollarSign className="w-6 h-6 text-white" />,
            color: "from-teal-400 to-teal-600",
            stat: "+12.5%",
            text: "vs last month",
            trendIcon: <TrendingUp className="w-4 h-4 text-teal-600" />,
          },
          {
            label: "Total Expenses",
            value: `$${userSummary?.totalExpenses || 0}`,
            icon: <TrendingDown className="w-6 h-6 text-white" />,
            color: "from-red-400 to-red-600",
            stat: "+8.2%",
            text: "vs last month",
            trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
          },
          {
            label: "Active Projects",
            value: `${userSummary?.projects || 0}`,
            icon: <Folder className="w-6 h-6 text-white" />,
            color: "from-amber-400 to-amber-600",
            stat: "+3",
            text: "new this month",
            trendIcon: <TrendingUp className="w-4 h-4 text-teal-600" />,
          },
          {
            label: "Team Members",
            value: `${userSummary?.teamMembers || 0}`,
            icon: <Users className="w-6 h-6 text-white" />,
            color: "from-emerald-400 to-emerald-600",
            stat: "+2",
            text: "new members",
            trendIcon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">{card.label}</p>
                <p
                  className="text-3xl text-gray-900 font-semibold"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {card.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-md`}
              >
                {card.icon}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {card.trendIcon}
              <span className="text-sm font-medium text-gray-600">
                {card.stat}
              </span>
              <span className="text-sm text-gray-500">{card.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
    <ReportsWidget months={6} />
  </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50">
          <h3 className="text-lg text-gray-900 font-semibold mb-1">
            Revenue vs Expenses
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Monthly comparison for the last 6 months
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="revenue" fill="#00BFA5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#FFB300" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50">
          <h3 className="text-lg text-gray-900 font-semibold mb-1">
            Growth Trend
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Revenue growth over time
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00BFA5"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg text-gray-900 font-semibold mb-1">
              Recent Activities
            </h3>
            <p className="text-sm text-gray-600">
              Latest updates from your team
            </p>
          </div>
          <button className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1 font-medium">
            View all <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-sm text-white font-medium shadow-md">
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-teal-600 mt-1">
                  {activity.project}
                </p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

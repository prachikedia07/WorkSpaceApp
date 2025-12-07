// // src/app/dashboard/page.jsx (or wherever your DashboardPage lives)
// "use client";

// import { useSession, signIn } from "next-auth/react";
// import { useEffect, useState } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Users,
//   Folder,
//   DollarSign,
//   ArrowUpRight,
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import ReportsWidget from "@/components/ReportsWidget"; // ← new widget import
// import TasksWidget from "@/components/TasksWidget";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const [userSummary, setUserSummary] = useState(null);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       signIn(undefined, { callbackUrl: "/dashboard" });
//     }
//   }, [status]);

//   useEffect(() => {
//     if (status === "authenticated") {
//       fetch("/api/user/summary")
//         .then((res) => res.json())
//         .then((data) => {
//           if (!data.error) setUserSummary(data);
//         })
//         .catch((err) => console.error("Error loading user summary:", err));
//     }
//   }, [status]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (!session) return null;

// const chartData = userSummary?.chartData || [];

//   const recentActivities = [
//     {
//       id: 1,
//       user: "Sarah Chen",
//       action: "created a new project",
//       project: "Q4 Marketing Campaign",
//       time: "2 hours ago",
//       avatar: "SC",
//     },
//     {
//       id: 2,
//       user: "Michael Ross",
//       action: "added expense",
//       project: "Office Supplies",
//       time: "4 hours ago",
//       avatar: "MR",
//     },
//     {
//       id: 3,
//       user: "Emma Wilson",
//       action: "completed task",
//       project: "Website Redesign",
//       time: "5 hours ago",
//       avatar: "EW",
//     },
//     {
//       id: 4,
//       user: "James Miller",
//       action: "updated budget",
//       project: "Development Team",
//       time: "1 day ago",
//       avatar: "JM",
//     },
//   ];

//   return (
//     <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 via-teal-50/20 to-transparent min-h-screen">
//       {/* Welcome Section */}
//       <div className="bg-white/70 shadow-md rounded-2xl p-6 border border-gray-100">
//         <h2 className="text-2xl font-semibold text-gray-800 capitalize">
//           Welcome back, {userSummary?.name || session.user.name || "User"} 👋
//         </h2>
//         <p className="text-gray-600 mt-1">
//           Your current plan: {userSummary?.plan || "Free"}
//         </p>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           {
//             label: "Total Revenue",
//             value: `$${userSummary?.totalRevenue || 0}`,
//             icon: <DollarSign className="w-6 h-6 text-white" />,
//             color: "from-teal-400 to-teal-600",
//             stat: "+12.5%",
//             text: "vs last month",
//             trendIcon: <TrendingUp className="w-4 h-4 text-teal-600" />,
//           },
//           {
//             label: "Total Expenses",
//             value: `$${userSummary?.totalExpenses || 0}`,
//             icon: <TrendingDown className="w-6 h-6 text-white" />,
//             color: "from-red-400 to-red-600",
//             stat: "+8.2%",
//             text: "vs last month",
//             trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
//           },
//           {
//             label: "Active Projects",
//             value: `${userSummary?.projects || 0}`,
//             icon: <Folder className="w-6 h-6 text-white" />,
//             color: "from-amber-400 to-amber-600",
//             stat: "+3",
//             text: "new this month",
//             trendIcon: <TrendingUp className="w-4 h-4 text-teal-600" />,
//           },
//           {
//             label: "Team Members",
//             value: `${userSummary?.teamMembers || 0}`,
//             icon: <Users className="w-6 h-6 text-white" />,
//             color: "from-emerald-400 to-emerald-600",
//             stat: "+2",
//             text: "new members",
//             trendIcon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
//           },
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-2">{card.label}</p>
//                 <p
//                   className="text-3xl text-gray-900 font-semibold"
//                   style={{ fontFamily: "Space Grotesk, sans-serif" }}
//                 >
//                   {card.value}
//                 </p>
//               </div>
//               <div
//                 className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-md`}
//               >
//                 {card.icon}
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               {card.trendIcon}
//               <span className="text-sm font-medium text-gray-600">
//                 {card.stat}
//               </span>
//               <span className="text-sm text-gray-500">{card.text}</span>
//             </div>
//           </div>
//         ))}
//       </div>

// <div className="mt-6">
//   <TasksWidget />
// </div>

//       <div className="mt-6">
//     <ReportsWidget months={6} />
//   </div>


//       

//         {/* Area Chart */}
//         <div className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50">
//           <h3 className="text-lg text-gray-900 font-semibold mb-1">
//             Growth Trend
//           </h3>
//           <p className="text-sm text-gray-600 mb-6">
//             Revenue growth over time
//           </p>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={chartData}>
//               <defs>
//                 <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.4} />
//                   <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
//               <YAxis tick={{ fill: "#6b7280" }} />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "rgba(255,255,255,0.95)",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(0,0,0,0.1)",
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#00BFA5"
//                 strokeWidth={3}
//                 fill="url(#colorRevenue)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Activities */}
//       <div className="glass-strong rounded-2xl shadow-lg p-6 border border-white/50">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg text-gray-900 font-semibold mb-1">
//               Recent Activities
//             </h3>
//             <p className="text-sm text-gray-600">
//               Latest updates from your team
//             </p>
//           </div>
//           <button className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1 font-medium">
//             View all <ArrowUpRight className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="space-y-3">
//           {recentActivities.map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition"
//             >
//               <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-sm text-white font-medium shadow-md">
//                 {activity.avatar}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm text-gray-900">
//                   <span className="font-medium">{activity.user}</span>{" "}
//                   {activity.action}
//                 </p>
//                 <p className="text-sm text-teal-600 mt-1">
//                   {activity.project}
//                 </p>
//               </div>
//               <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
//                 {activity.time}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/dashboard/page.jsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Folder,
  DollarSign,
  CheckSquare,
  AlertCircle,
  Clock,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    workspaces: [],
    tasks: {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
      urgent: 0,
    },
    finance: {
      totalRevenue: 0,
      totalExpenses: 0,
      balance: 0,
      monthlyData: [],
    },
    recentActivity: [],
  });

  // Get user first name
  const getUserFirstName = () => {
    if (!session?.user?.name) return "there";
    const parts = session.user.name.trim().split(" ");
    return parts[0];
  };

  // Get user initials
  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    const parts = session.user.name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/dashboard" });
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      loadDashboardData();
    }
  }, [status]);

  async function loadDashboardData() {
    try {
      // Load workspaces
      const workspacesRes = await fetch("/api/workspaces");
      const workspacesData = await workspacesRes.json();
      const workspaces = workspacesData.data || [];

      // Load tasks from all workspaces
      let allTasks = [];
      for (const workspace of workspaces) {
        try {
          const tasksRes = await fetch(`/api/tasks?workspaceId=${workspace._id}`);
          const tasksData = await tasksRes.json();
          if (tasksData.success) {
            allTasks = [...allTasks, ...(tasksData.data || [])];
          }
        } catch (err) {
          console.error("Failed to load tasks for workspace:", workspace._id);
        }
      }

      // Calculate task stats
      const taskStats = {
        total: allTasks.length,
        todo: allTasks.filter((t) => t.status === "todo").length,
        inProgress: allTasks.filter((t) => t.status === "inprogress").length,
        completed: allTasks.filter((t) => t.status === "completed").length,
        urgent: allTasks.filter((t) => t.priority === "high").length,
      };

      // Load finance data
      let financeData = {
        totalRevenue: 0,
        totalExpenses: 0,
        balance: 0,
        monthlyData: [],
      };

      try {
        const financeRes = await fetch("/api/transactions?limit=1000");
        const financeJson = await financeRes.json();
        if (financeJson.transactions) {
          const transactions = financeJson.transactions;

          // Calculate totals
          financeData.totalRevenue = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + Math.abs(Number(t.amount) || 0), 0);

          financeData.totalExpenses = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + Math.abs(Number(t.amount) || 0), 0);

          financeData.balance = financeData.totalRevenue - financeData.totalExpenses;
        }
      } catch (err) {
        console.error("Failed to load finance data:", err);
      }

      // Load recent activity
      let recentActivity = [];
      try {
        const notifRes = await fetch("/api/notifications");
        const notifData = await notifRes.json();
        if (notifData.success) {
          recentActivity = (notifData.data || []).slice(0, 8);
        }
      } catch (err) {
        console.error("Failed to load notifications");
      }

      setDashboardData({
        workspaces,
        tasks: taskStats,
        finance: financeData,
        recentActivity,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/20 to-amber-50/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const { workspaces, tasks, finance, recentActivity } = dashboardData;

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-gray-50 via-teal-50/30 to-amber-50/20 min-h-screen">
      {/* Welcome Header - Personalized */}
      <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-300" />
              Welcome back, {getUserFirstName()}! 👋
            </h1>
            <p className="text-teal-100 text-lg">
              Here's what's happening with your projects today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                {getUserInitials()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/workspace"
          className="glass-strong rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{tasks.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>{tasks.inProgress} in progress</span>
            <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/workspace"
          className="glass-strong rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Urgent Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{tasks.urgent}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>High priority items</span>
            <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/finance"
          className="glass-strong rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                ${Math.abs(finance.balance).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            {finance.balance >= 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-emerald-600 font-medium">Positive</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-red-600 font-medium">Negative</span>
              </>
            )}
            <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition text-gray-600" />
          </div>
        </Link>

        <Link
          href="/workspace"
          className="glass-strong rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Workspaces</p>
              <p className="text-3xl font-bold text-gray-900">{workspaces.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Folder className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>Active projects</span>
            <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Workspaces */}
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6 border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Workspaces</h3>
              <p className="text-sm text-gray-600 mt-1">Manage your active projects</p>
            </div>
            <Link
              href="/workspace"
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition flex items-center gap-2 text-sm font-medium shadow-md"
            >
              <Plus className="w-4 h-4" />
              New
            </Link>
          </div>

          {workspaces.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No workspaces yet</p>
              <Link
                href="/workspace"
                className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Create Your First Workspace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspaces.slice(0, 4).map((workspace, idx) => {
                const gradients = [
                  "from-teal-400 to-cyan-600",
                  "from-purple-400 to-indigo-600",
                  "from-pink-400 to-rose-600",
                  "from-orange-400 to-amber-600",
                ];
                return (
                  <Link
                    key={workspace._id}
                    href={`/workspace?id=${workspace._id}`}
                    className="p-5 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${
                          gradients[idx % gradients.length]
                        } rounded-xl flex items-center justify-center text-white font-bold shadow-md text-lg`}
                      >
                        {workspace.name.charAt(0).toUpperCase()}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:text-teal-600 transition" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                      {workspace.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {workspace.members?.length || 0} members
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Task Overview */}
        <div className="glass-strong rounded-2xl p-6 border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Task Status</h3>
              <p className="text-sm text-gray-600 mt-1">Current progress</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">To Do</span>
                <span className="text-sm font-bold text-gray-900">{tasks.todo}</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all shadow-sm"
                  style={{
                    width: `${tasks.total ? (tasks.todo / tasks.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">In Progress</span>
                <span className="text-sm font-bold text-gray-900">{tasks.inProgress}</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full transition-all shadow-sm"
                  style={{
                    width: `${tasks.total ? (tasks.inProgress / tasks.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completed</span>
                <span className="text-sm font-bold text-gray-900">{tasks.completed}</span>
              </div>
              <div className="w-full bg-teal-100 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2.5 rounded-full transition-all shadow-sm"
                  style={{
                    width: `${tasks.total ? (tasks.completed / tasks.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <Link
            href="/workspace"
            className="mt-6 w-full block text-center py-2 px-4 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition text-sm font-medium"
          >
            View All Tasks
          </Link>
        </div>
      </div>

      {/* Quick Actions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="glass-strong rounded-2xl p-6 border border-white/50">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600 mt-1">Common tasks & shortcuts</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/workspace"
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition group border border-teal-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Create Task</p>
                <p className="text-xs text-gray-600">Add a new task to workspace</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/finance"
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition group border border-emerald-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Add Transaction</p>
                <p className="text-xs text-gray-600">Record income or expense</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/workspace"
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition group border border-purple-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Invite Member</p>
                <p className="text-xs text-gray-600">Add team member to workspace</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="glass-strong rounded-2xl p-6 border border-white/50">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Financial Summary</h3>
            <p className="text-sm text-gray-600 mt-1">Total overview</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Total Income</span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${finance.totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">From all sources</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Total Expenses</span>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${finance.totalExpenses.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">All transactions</p>
            </div>

            <Link
              href="/finance"
              className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition text-sm font-medium shadow-md"
            >
              View Financial Details
            </Link>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="glass-strong rounded-2xl p-6 border border-white/50">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h3>
            <p className="text-sm text-gray-600 mt-1">Tasks due soon</p>
          </div>

          {tasks.urgent > 0 ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-900">{tasks.urgent} Urgent Tasks</span>
                </div>
                <p className="text-sm text-gray-600">High priority items need attention</p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-900">{tasks.inProgress} In Progress</span>
                </div>
                <p className="text-sm text-gray-600">Currently being worked on</p>
              </div>

              <Link
                href="/workspace"
                className="block w-full text-center py-2.5 px-4 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition text-sm font-medium"
              >
                View All Tasks
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="w-16 h-16 text-green-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2 font-medium">All caught up!</p>
              <p className="text-sm text-gray-500">No urgent tasks at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-strong rounded-2xl p-6 border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600 mt-1">Latest updates & notifications</p>
          </div>
        </div>

        {recentActivity.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/60 transition border border-gray-100"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === "task_assigned" && (
                    <CheckSquare className="w-5 h-5 text-teal-600" />
                  )}
                  {activity.type === "invitation_accepted" && (
                    <Users className="w-5 h-5 text-teal-600" />
                  )}
                  {activity.type?.includes("invitation") && (
                    <Users className="w-5 h-5 text-teal-600" />
                  )}
                  {!activity.type && <Clock className="w-5 h-5 text-teal-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
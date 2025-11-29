"use client";

import { 
  DollarSign, TrendingUp, TrendingDown, Download, Filter, 
  ArrowUpRight, ArrowDownRight 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", income: 12500, expenses: 8400 },
  { month: "Feb", income: 15200, expenses: 9800 },
  { month: "Mar", income: 13800, expenses: 9200 },
  { month: "Apr", income: 16100, expenses: 10500 },
  { month: "May", income: 18200, expenses: 11200 },
  { month: "Jun", income: 17500, expenses: 10800 },
];

const categoryData = [
  { name: "Salaries", value: 45000, color: "#00BFA5" },
  { name: "Marketing", value: 15000, color: "#FFB300" },
  { name: "Operations", value: 12000, color: "#06B6D4" },
  { name: "Software", value: 8000, color: "#10B981" },
  { name: "Other", value: 5000, color: "#F59E0B" },
];

const transactions = [
  { id: 1, date: "2025-10-28", description: "Monthly payroll", category: "Salaries", amount: -15000, status: "completed" },
  { id: 2, date: "2025-10-27", description: "Client payment - Project Alpha", category: "Income", amount: 8500, status: "completed" },
  { id: 3, date: "2025-10-26", description: "Adobe Creative Cloud", category: "Software", amount: -299, status: "completed" },
  { id: 4, date: "2025-10-25", description: "Facebook Ads campaign", category: "Marketing", amount: -1200, status: "completed" },
  { id: 5, date: "2025-10-24", description: "Client payment - Project Beta", category: "Income", amount: 12000, status: "pending" },
  { id: 6, date: "2025-10-23", description: "Office supplies", category: "Operations", amount: -450, status: "completed" },
  { id: 7, date: "2025-10-22", description: "AWS hosting services", category: "Software", amount: -890, status: "completed" },
  { id: 8, date: "2025-10-21", description: "Consulting services rendered", category: "Income", amount: 5500, status: "completed" },
];

export default function FinancePage() {
  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 via-teal-50/10 to-amber-50/10 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-gray-900 font-space-grotesk font-bold mb-2">
            Finance Overview
          </h2>
          <p className="text-gray-600">Track your income, expenses, and budget</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 glass border-white/50 hover:bg-white/80 rounded-xl h-11">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2 glass border-white/50 hover:bg-white/80 rounded-xl h-11">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income */}
        <Card className="glass rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Income</p>
              <p className="text-3xl font-space-grotesk font-bold text-gray-900">$93,300</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <ArrowUpRight className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-600 font-medium">+16.2%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </Card>

        {/* Expenses */}
        <Card className="glass rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Expenses</p>
              <p className="text-3xl font-space-grotesk font-bold text-gray-900">$59,900</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <ArrowDownRight className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">+8.1%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </Card>

        {/* Profit */}
        <Card className="glass rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Net Profit</p>
              <p className="text-3xl font-space-grotesk font-bold text-gray-900">$33,400</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-600 font-medium">+24.3%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <Card className="lg:col-span-2 glass rounded-2xl border border-white/50 shadow-md p-6">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB300" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFB300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                }} />
                <Area type="monotone" dataKey="income" stroke="#00BFA5" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="#FFB300" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="glass rounded-2xl border border-white/50 shadow-md p-6">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>This month's breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-gray-600">{cat.name}</span>
                  </div>
                  <span className="text-gray-900 font-medium">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TRANSACTIONS TABLE */}
      <Card className="glass rounded-2xl border border-white/50 shadow-md p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-lg font-space-grotesk font-semibold text-gray-900">Recent Transactions</h3>
            <p className="text-sm text-gray-600">Latest financial activities</p>
          </div>
          <Button variant="outline" className="glass border-white/50 hover:bg-white/80 rounded-xl text-sm">View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b">
                <th className="py-3">Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-white/60 transition">
                  <td className="py-3 text-gray-600">
                    {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="text-gray-900 font-medium">{tx.description}</td>
                  <td>
                    <Badge className="bg-gray-100 text-gray-700">{tx.category}</Badge>
                  </td>
                  <td>
                    <Badge className={tx.status === "completed"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-amber-100 text-amber-700"}>
                      {tx.status}
                    </Badge>
                  </td>
                  <td className={`text-right font-medium ${tx.amount > 0 ? "text-teal-600" : "text-red-600"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

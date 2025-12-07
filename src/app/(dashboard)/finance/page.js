// src/app/finance/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit2, Trash2, RefreshCcw, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Toast({ open, type = "success", message, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div
        className={`max-w-sm px-4 py-3 rounded-2xl shadow-lg flex items-start gap-3 ${
          type === "error" ? "bg-red-600 text-white" : "bg-teal-600 text-white"
        }`}
      >
        <div className="flex-1">
          <div className="font-semibold">{type === "error" ? "Error" : "Success"}</div>
          <div className="text-sm mt-1 opacity-90">{message}</div>
        </div>
        <button className="ml-2 p-1" onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SlideOver({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      <aside className="fixed right-0 top-0 h-full w-full sm:w-[520px] bg-white z-50 shadow-2xl p-6 overflow-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">Edit transaction details</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </aside>
    </>
  );
}

export default function FinancePage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Financial summary
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);

  // Add form
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [project, setProject] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit slide-over
  const [editing, setEditing] = useState(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Toast
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  // Load all transactions and calculate stats
  useEffect(() => {
    loadFinanceData();
  }, []);

  // async function loadFinanceData() {
  //   setLoading(true);
  //   try {
  //     const res = await fetch("/api/transactions?limit=1000");
  //     const json = await res.json();
  //     const txns = json.transactions || [];
  //     setTransactions(txns);

  //     // Calculate totals
  //     let revenue = 0;
  //     let expenses = 0;

  //     txns.forEach((t) => {
  //       const amt = Math.abs(Number(t.amount) || 0);
  //       if (t.type === "income") revenue += amt;
  //       else expenses += amt;
  //     });

  //     setTotalRevenue(revenue);
  //     setTotalExpenses(expenses);

  //     // Generate monthly data for last 6 months
  //     const monthlyMap = {};
  //     const now = new Date();

  //     for (let i = 5; i >= 0; i--) {
  //       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  //       const key = d.toISOString().slice(0, 7);
  //       monthlyMap[key] = { revenue: 0, expenses: 0, net: 0 };
  //     }

  //     txns.forEach((t) => {
  //       if (!t.date) return;
  //       const key = new Date(t.date).toISOString().slice(0, 7);
  //       if (monthlyMap[key]) {
  //         const amt = Math.abs(Number(t.amount) || 0);
  //         if (t.type === "income") {
  //           monthlyMap[key].revenue += amt;
  //           monthlyMap[key].net += amt;
  //         } else {
  //           monthlyMap[key].expenses += amt;
  //           monthlyMap[key].net -= amt;
  //         }
  //       }
  //     });

  //     const chartData = Object.entries(monthlyMap).map(([month, data]) => ({
  //       month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
  //       Income: data.revenue,
  //       Expenses: data.expenses,
  //       Net: data.net,
  //     }));

  //     setMonthlyData(chartData);

  //     // Category breakdown for expenses
  //     const categoryMap = {};
  //     txns.filter(t => t.type === "expense").forEach((t) => {
  //       const cat = t.category || "General";
  //       const amt = Math.abs(Number(t.amount) || 0);
  //       categoryMap[cat] = (categoryMap[cat] || 0) + amt;
  //     });

  //     const topCategories = Object.entries(categoryMap)
  //       .sort(([, a], [, b]) => b - a)
  //       .slice(0, 5)
  //       .map(([category, amount]) => ({ category, amount }));

  //     setCategoryBreakdown(topCategories);

  //   } catch (err) {
  //     console.error("Failed to load finance data:", err);
  //     setToast({ open: true, type: "error", message: "Failed to load finance data" });
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function loadFinanceData() {
  setLoading(true);
  try {
    const res = await fetch("/api/transactions?limit=1000");
    const json = await res.json();

    const txns = json.transactions || [];
    console.log("Transactions from API:", txns);

    setTransactions(txns);

    // 1) Totals
    let revenue = 0;
    let expenses = 0;

    txns.forEach((t) => {
      const amt = Math.abs(Number(t.amount) || 0);
      if (t.type === "income") revenue += amt;
      else if (t.type === "expense") expenses += amt;
    });

    setTotalRevenue(revenue);
    setTotalExpenses(expenses);

    // 2) Build last 6 months buckets
    const monthlyMap = {};
    const now = new Date();

    // for (let i = 5; i >= 0; i--) {
    //   const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    //   const key = d.toISOString().slice(0, 7); // "YYYY-MM"
    //   monthlyMap[key] = { revenue: 0, expenses: 0, net: 0 };
    // }
    for (let i = 5; i >= 0; i--) {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  // Use getMonth() + 1 so month is 1..12 and not affected by timezone offsets
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // "YYYY-MM"
  monthlyMap[key] = { revenue: 0, expenses: 0, net: 0 };
}


    txns.forEach((t) => {
      if (!t.date) return;
      const dateObj = new Date(t.date);
      if (isNaN(dateObj.getTime())) return;

      const key = dateObj.toISOString().slice(0, 7);
      if (!monthlyMap[key]) return; // ignore older/newer than 6 months

      const amt = Math.abs(Number(t.amount) || 0);
      if (t.type === "income") {
        monthlyMap[key].revenue += amt;
        monthlyMap[key].net += amt;
      } else if (t.type === "expense") {
        monthlyMap[key].expenses += amt;
        monthlyMap[key].net -= amt;
      }
    });

    const chartData = Object.entries(monthlyMap).map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
      Income: data.revenue,
      Expenses: data.expenses,
      Net: data.net,
    }));

    console.log("Monthly chart data:", chartData);
    setMonthlyData(chartData);

    // 3) Category breakdown (only expenses)
    const categoryMap = {};
    txns
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const cat = t.category || "General";
        const amt = Math.abs(Number(t.amount) || 0);
        categoryMap[cat] = (categoryMap[cat] || 0) + amt;
      });

    const topCategories = Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, amount]) => ({ category, amount }));

    console.log("Category breakdown:", topCategories);
    setCategoryBreakdown(topCategories);
  } catch (err) {
    console.error("Failed to load finance data:", err);
    setToast({
      open: true,
      type: "error",
      message: "Failed to load finance data",
    });
  } finally {
    setLoading(false);
  }
}


  function resetAddForm() {
    setAmount("");
    setType("income");
    setCategory("General");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
    setProject("");
  }

  async function handleAdd() {
    if (!amount || isNaN(Number(amount))) {
      setToast({ open: true, type: "error", message: "Enter a valid amount" });
      return;
    }
    setSubmitting(true);

    const optimistic = {
      _id: "tmp-" + Date.now(),
      amount: Math.abs(Number(amount)),
      type,
      category,
      description,
      date,
      project,
      status: "completed",
    };
    setTransactions((prev) => [optimistic, ...prev]);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          type,
          category,
          description,
          date,
          project,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setTransactions((prev) => prev.filter((t) => t._id !== optimistic._id));
        setToast({ open: true, type: "error", message: json.error || "Could not add transaction" });
      } else {
        setTransactions((prev) => {
          const replaced = prev.map((t) => (t._id === optimistic._id ? json.transaction : t));
          if (!replaced.some((t) => t._id === json.transaction._id)) {
            return [json.transaction, ...prev.filter((t) => t._id !== optimistic._id)];
          }
          return replaced;
        });
        setToast({ open: true, type: "success", message: "Transaction added" });
        resetAddForm();
        loadFinanceData();
        try { router.refresh(); } catch (_) {}
        window.dispatchEvent(new Event("transactionsUpdated"));
      }
    } catch (err) {
      console.error(err);
      setTransactions((prev) => prev.filter((t) => t._id !== optimistic._id));
      setToast({ open: true, type: "error", message: "Network error" });
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(tx) {
    setEditing({
      ...tx,
      date: tx.date ? new Date(tx.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      amount: tx.amount,
    });
  }

  async function handleEditSave() {
    if (!editing) return;
    if (isNaN(Number(editing.amount))) {
      setToast({ open: true, type: "error", message: "Enter a valid amount" });
      return;
    }
    setEditSubmitting(true);
    try {
      const payload = {
        amount: Number(editing.amount),
        type: editing.type,
        category: editing.category,
        description: editing.description,
        date: editing.date,
        project: editing.project,
      };
      const res = await fetch(`/api/transactions/${editing._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setToast({ open: true, type: "error", message: json.error || "Failed to update" });
      } else {
        setTransactions((prev) => prev.map((t) => (String(t._id) === String(editing._id) ? json.transaction : t)));
        setToast({ open: true, type: "success", message: "Transaction updated" });
        setEditing(null);
        loadFinanceData();
        try { router.refresh(); } catch (_) {}
        window.dispatchEvent(new Event("transactionsUpdated"));
      }
    } catch (err) {
      console.error(err);
      setToast({ open: true, type: "error", message: "Network error" });
    } finally {
      setEditSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this transaction? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setToast({ open: true, type: "error", message: json.error || "Failed to delete" });
      } else {
        setTransactions((prev) => prev.filter((t) => String(t._id) !== String(id)));
        setToast({ open: true, type: "success", message: "Transaction deleted" });
        loadFinanceData();
        try { router.refresh(); } catch (_) {}
        window.dispatchEvent(new Event("transactionsUpdated"));
      }
    } catch (err) {
      console.error(err);
      setToast({ open: true, type: "error", message: "Network error" });
    }
  }

  const netBalance = totalRevenue - totalExpenses;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Finance</h1>
          <p className="text-gray-600 mt-1">Add, view and manage your transactions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-500">Net Balance</div>
            <div className="text-lg font-semibold">
              {netBalance >= 0 ? (
                <span className="text-teal-700">+ ${Math.abs(netBalance).toLocaleString()}</span>
              ) : (
                <span className="text-red-600">- ${Math.abs(netBalance).toLocaleString()}</span>
              )}
            </div>
          </div>
          <Button variant="outline" onClick={loadFinanceData}>
            <RefreshCcw className="w-4 h-4 mr-2 ml-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* Add form */}
      <Card className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
        <CardHeader className="p-0 mb-4">
          <CardTitle>Add Transaction</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="md:col-span-1">
              <label className="text-xs text-gray-600">Amount</label>
              <Input placeholder="e.g. 1200" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="md:col-span-1">
              <label className="text-xs text-gray-600">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-md">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="text-xs text-gray-600">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-600">Description</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
            </div>

            <div className="md:col-span-1">
              <label className="text-xs text-gray-600">Date</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="md:col-span-4">
              <label className="text-xs text-gray-600">Project (optional)</label>
              <Input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project name" />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 mt-2">
              <Button onClick={handleAdd} className="h-11 p-2" disabled={submitting}>
                <Plus className="w-4 h-4 mr-2" />
                {submitting ? "Adding..." : "Add Transaction"}
              </Button>
              <Button variant="outline" onClick={resetAddForm} className="h-11 p-2 m-1">Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Width Bar Chart - Income vs Expenses */}
      <Card className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
        <CardHeader className="p-0 mb-4">
          <CardTitle>Income vs Expenses (Last 6 Months)</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Monthly financial overview</p>
        </CardHeader>
        <CardContent className="p-0">
          {/* {loading ? (
            <div className="h-[350px] flex items-center justify-center text-gray-500">Loading chart...</div>
          ) : monthlyData.length === 0 || monthlyData.every(d => d.Income === 0 && d.Expenses === 0) ? (
            <div className="h-[350px] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No transaction data available yet</p>
                <p className="text-sm text-gray-400 mt-1">Add transactions to see charts</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.98)",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="Income" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expenses" fill="#fbbf24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )} */}
          {loading ? (
  <div className="h-[350px] flex items-center justify-center text-gray-500">
    Loading chart...
  </div>
) : transactions.length === 0 ? (
  <div className="h-[350px] flex items-center justify-center">
    <div className="text-center">
      <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500">No transaction data available yet</p>
      <p className="text-sm text-gray-400 mt-1">Add transactions to see charts</p>
    </div>
  </div>
) : (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Legend />
      <Bar dataKey="Income" fill="#14b8a6" radius={[8, 8, 0, 0]} />
      <Bar dataKey="Expenses" fill="#fbbf24" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)}

        </CardContent>
      </Card>

      {/* Two Column Layout - Net Trend & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Balance Trend */}
        <Card className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
          <CardHeader className="p-0 mb-4">
            <CardTitle>Net Balance Trend</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Monthly profit/loss overview</p>
          </CardHeader>
          <CardContent className="p-0">
            {/* {loading ? (
              <div className="h-[280px] flex items-center justify-center text-gray-500">Loading...</div>
            ) : monthlyData.length === 0 || monthlyData.every(d => d.Net === 0) ? (
              <div className="h-[280px] flex items-center justify-center text-gray-400">
                <p>No data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.98)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Net" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )} */}
            {loading ? (
  <div className="h-[280px] flex items-center justify-center text-gray-500">
    Loading...
  </div>
) : transactions.length === 0 ? (
  <div className="h-[280px] flex items-center justify-center text-gray-400">
    <p>No data available</p>
  </div>
) : (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Line
        type="monotone"
        dataKey="Net"
        stroke="#6366f1"
        strokeWidth={3}
        dot={{ fill: "#6366f1", r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
)}

          </CardContent>
        </Card>

        {/* Top Expense Categories */}
        <Card className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
          <CardHeader className="p-0 mb-4">
            <CardTitle>Top Expense Categories</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Where your money goes</p>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="h-[280px] flex items-center justify-center text-gray-500">Loading...</div>
            ) : categoryBreakdown.length === 0 ? (
              <div className="h-[280px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingDown className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No expense categories yet</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryBreakdown.map((item, idx) => {
                  const colors = ["#14b8a6", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];
                  const maxAmount = Math.max(...categoryBreakdown.map(c => c.amount));
                  const percentage = (item.amount / maxAmount) * 100;
                  
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all shadow-sm"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: colors[idx % colors.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <Card className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
        <CardHeader className="p-0 mb-4">
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading transactions...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-700 border-b">
                    <th className="py-3">Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th className="text-right pr-2">Amount</th>
                    <th className="text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr><td colSpan={6} className="py-12 text-center text-gray-500">No transactions yet</td></tr>
                  ) : transactions.slice(0, 50).map((tx) => (
                    <tr key={tx._id || tx.id} className="hover:bg-white/40 transition">
                      <td className="py-3 text-gray-600">{tx.date ? new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}</td>
                      <td className="text-gray-900 font-medium">{tx.description || "-"}</td>
                      <td><Badge className="bg-gray-100 text-gray-700">{tx.category || "General"}</Badge></td>
                      <td><Badge className={tx.status === "completed" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"}>{tx.status || "completed"}</Badge></td>
                      <td className={`text-right font-semibold pr-2 ${tx.type === "expense" ? "text-red-500" : "text-teal-600"}`}>
                        {tx.type === "expense" ? `- $${Number(tx.amount).toLocaleString()}` : `+ $${Number(tx.amount).toLocaleString()}`}
                      </td>
                      <td className="text-right pr-2">
                        <div className="inline-flex items-center gap-2">
                          <button title="Edit" onClick={() => openEdit(tx)} className="p-2 rounded-md hover:bg-gray-100">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button title="Delete" onClick={() => handleDelete(tx._id)} className="p-2 rounded-md hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit slide-over */}
      <SlideOver open={!!editing} onClose={() => setEditing(null)} title="Edit Transaction">
        {editing && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600">Amount</label>
              <Input value={editing.amount} onChange={(e) => setEditing({ ...editing, amount: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-gray-600">Type</label>
              <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full p-2 border rounded-md">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600">Category</label>
              <Input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-gray-600">Description</label>
              <Input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-gray-600">Date</label>
              <Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-gray-600">Project</label>
              <Input value={editing.project} onChange={(e) => setEditing({ ...editing, project: e.target.value })} />
            </div>

            <div className="flex items-center gap-3 p-4 m-2">
              <Button onClick={handleEditSave} disabled={editSubmitting}>
                {editSubmitting ? "Saving..." : "Save changes"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </SlideOver>

      <Toast open={toast.open} type={toast.type} message={toast.message} onClose={() => setToast({ ...toast, open: false })} />
    </div>
  );
}
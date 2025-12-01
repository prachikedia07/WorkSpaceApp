// src/components/ReportsWidget.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ReportsWidget({ months = 6 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(months);
  const mountedRef = useRef(true);
  const chartHeight = 260;

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  // Try multiple endpoints gracefully: first /api/user/monthly, fallback to /api/user/summary
  async function fetchFromEndpoints(m) {
    const tries = [
      `/api/user/monthly?months=${m}`, // preferred (your custom monthly route)
      `/api/user/summary?months=${m}`, // fallback (I saw /api/user/summary in your code)
      `/api/user/summary`, // ultimate fallback without query
    ];

    for (const url of tries) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        // If 404 or other non-OK, skip to next
        if (!res.ok) {
          console.warn(`ReportsWidget: ${url} returned ${res.status}. trying next fallback...`);
          continue;
        }

        // If server returned HTML (Next 404 page), avoid json() parse errors.
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("text/html")) {
          console.warn(`ReportsWidget: ${url} returned HTML (content-type: text/html). skipping.`);
          continue;
        }

        // parse JSON safely
        const json = await res.json();
        return { url, json };
      } catch (err) {
        console.warn(`ReportsWidget fetch failed for ${url}:`, err);
        // try next endpoint
      }
    }

    return { url: null, json: null };
  }

  async function fetchData(m = range) {
    if (!mountedRef.current) return;
    setLoading(true);
    try {
      const { url, json } = await fetchFromEndpoints(m);
      if (!mountedRef.current) return;
      if (!url || !json) {
        console.warn("ReportsWidget: no usable endpoint found.");
        setData([]);
        return;
      }

      // two possible shapes:
      // 1) json is an array of { month, revenue, expenses }
      // 2) json is an object with chartData: [ ... ]
      let chart = [];
      if (Array.isArray(json)) {
        chart = json;
      } else if (Array.isArray(json.chartData)) {
        chart = json.chartData;
      } else if (Array.isArray(json.data)) {
        chart = json.data;
      } else {
        // best-effort: try keys that look like months
        chart = json.chartData || json.data || [];
      }

      // ensure numeric values
      chart = (chart || []).map((r) => ({
        month: r.month || r.label || r._id || "",
        revenue: Number(r.revenue || r.revenue || r.revenue === 0 ? r.revenue : r.revenue) || Number(r.revenue || 0) || 0,
        expenses: Number(r.expenses || r.expenses || r.expenses === 0 ? r.expenses : r.expenses) || Number(r.expenses || 0) || 0,
      }));

      setData(chart);
    } catch (err) {
      console.error("ReportsWidget fetch error:", err);
      setData([]);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  // Re-fetch when other parts of app dispatch this event
  useEffect(() => {
    function onTx() {
      fetchData(range);
    }
    window.addEventListener("transactionsUpdated", onTx);
    window.addEventListener("resize", onTx);
    return () => {
      window.removeEventListener("transactionsUpdated", onTx);
      window.removeEventListener("resize", onTx);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const totalRevenue = (data || []).reduce((s, d) => s + (Number(d.revenue) || 0), 0);
  const totalExpenses = (data || []).reduce((s, d) => s + (Number(d.expenses) || 0), 0);
  const net = totalRevenue - totalExpenses;

  return (
    <div className="rounded-2xl p-6 bg-white/80 shadow-md border border-white/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Monthly Summary</h3>
          <p className="text-sm text-gray-500">Last {range} months — quick glance</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={String(range)}
            onChange={(e) => setRange(Number(e.target.value))}
            className="p-2 rounded-md border bg-white"
            aria-label="Select months range"
          >
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
          <button
            onClick={() => fetchData(range)}
            className="px-3 py-2 rounded-md border bg-white"
            aria-label="Refresh reports"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500">Revenue</div>
          <div className="text-2xl font-semibold">${Number(totalRevenue).toLocaleString()}</div>
          <div className="text-xs text-teal-600 mt-1">↗ +0.0% <span className="text-gray-500">vs previous</span></div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Expenses</div>
          <div className="text-2xl font-semibold">${Number(totalExpenses).toLocaleString()}</div>
          <div className="text-xs text-emerald-600 mt-1">↘ +0.0% <span className="text-gray-500">vs previous</span></div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500">Net</div>
          <div className="text-2xl font-semibold">${Number(net).toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">period total</div>
        </div>
      </div>

      <div style={{ minHeight: chartHeight, height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data || []} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            />
            <Bar dataKey="expenses" fill="#FFB300" radius={[6, 6, 0, 0]} />
            <Bar dataKey="revenue" fill="#00BFA5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {loading && <div className="text-sm text-gray-500 mt-3">Loading...</div>}
      {!loading && (!data || data.length === 0) && <div className="text-sm text-gray-500 mt-3">No data for selected range</div>}
    </div>
  );
}

// src/components/TasksWidget.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * TasksWidget
 * - shows counts (todo / completed)
 * - quick add input (POST /api/tasks)
 * - link to workspace page
 */

export default function TasksWidget() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const json = await res.json();
      if (json?.success) {
        // Map _id to id so the rest of UI can use `id`
        const mapped = (json.data || []).map((t) => ({ ...t, id: t._id }));
        setTasks(mapped);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("TasksWidget load error:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const todo = tasks.filter((t) => t.status === "todo").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  async function addQuickTask(e) {
    e?.preventDefault();
    if (!title?.trim()) return;
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: "",
          status: "todo",
        }),
      });
      setTitle("");
      await load();
      // optionally navigate to workspace to show created task:
      // router.push("/workspace");
    } catch (err) {
      console.error("addQuickTask error:", err);
    }
  }

  return (
    <div className="glass-strong rounded-2xl p-6 shadow border border-white/50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Tasks Overview</h3>
          <p className="text-sm text-gray-600">{loading ? "Loading..." : `${todo} pending • ${completed} done`}</p>
        </div>

        <div className="text-sm">
          <Link href="/workspace" className="text-teal-600 hover:underline">
            Open Tasks →
          </Link>
        </div>
      </div>

      <form onSubmit={addQuickTask} className="mt-4 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick task title"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}

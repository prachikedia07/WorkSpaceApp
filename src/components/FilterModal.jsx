"use client";

import { useState, useEffect } from "react";

export default function FilterModal({ open, onClose, members, onApply, initial = {} }) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (open) {
      setStatus(initial.status || "");
      setPriority(initial.priority || "");
      setAssignee(initial.assignee || "");
      setQ(initial.q || "");
    }
  }, [open]);

  if (!open) return null;

  function apply() {
    onApply({ status, priority, assignee, q });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Filter Tasks</h2>

        <div className="space-y-4">
          <select className="border p-2 rounded w-full"
            value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Done</option>
          </select>

          <select className="border p-2 rounded w-full"
            value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select className="border p-2 rounded w-full"
            value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="">All Members</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <input className="border p-2 rounded w-full"
            placeholder="Search..." value={q}
            onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded"
            onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

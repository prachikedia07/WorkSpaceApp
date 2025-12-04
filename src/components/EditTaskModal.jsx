// src/components/EditTaskModal.jsx
"use client";
import { useState, useEffect } from "react";

/**
 * EditTaskModal
 * Props:
 * - open, onClose, task, onSaved(updatedTask)
 */
export default function EditTaskModal({ open, onClose, task = {}, onSaved }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
      });
    }
  }, [task]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-3">Edit Task</h3>

        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("/api/tasks", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: task.id, updates: { ...form, dueDate: form.dueDate || null } }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
              onSaved?.(json.data);
              window.dispatchEvent(new CustomEvent("task-updated", { detail: json.data }));
              onClose();
            } else {
              alert("Save failed: " + (json?.error || res.status));
            }
          } catch (err) {
            console.error(err);
            alert("Network error");
          }
        }}>
          <input className="w-full border p-2 mb-3" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title" />
          <select className="w-full border p-2 mb-3" value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" className="w-full border p-2 mb-3" value={form.dueDate} onChange={(e)=>setForm({...form, dueDate:e.target.value})} />
          <textarea className="w-full border p-2 mb-3" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-teal-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// src/components/WorkspaceSwitcher.jsx
"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Plus, Check, Briefcase } from "lucide-react";

export default function WorkspaceSwitcher({ currentWorkspaceId, onSwitch }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    setLoading(true);
    try {
      const res = await fetch("/api/workspaces");
      const json = await res.json();
      if (json.success) {
        setWorkspaces(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load workspaces:", err);
    } finally {
      setLoading(false);
    }
  }

  async function createNewWorkspace() {
    const name = prompt("Enter workspace name:");
    if (!name || !name.trim()) return;

    try {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const json = await res.json();
      if (json.success) {
        await loadWorkspaces();
        onSwitch(json.data._id);
        setOpen(false);
      } else {
        alert(json.error || "Failed to create workspace");
      }
    } catch (err) {
      console.error("Create workspace error:", err);
      alert("Failed to create workspace");
    }
  }

  const current = workspaces.find((w) => String(w._id) === String(currentWorkspaceId));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2  bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Briefcase className="w-4 h-4 text-gray-600" />
        <span className="font-medium text-gray-900">
          {current?.name || "Select Workspace"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
              Your Workspaces
            </div>

            {loading ? (
              <div className="px-4 py-8 text-center text-gray-500">
                Loading...
              </div>
            ) : workspaces.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No workspaces
              </div>
            ) : (
              workspaces.map((workspace) => {
                const isActive = String(workspace._id) === String(currentWorkspaceId);
                return (
                  <button
                    key={workspace._id}
                    onClick={() => {
                      onSwitch(workspace._id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                      isActive ? "bg-teal-50" : ""
                    }`}
                  >
                    <Briefcase
                      className={`w-4 h-4 ${
                        isActive ? "text-teal-600" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`flex-1 text-left text-sm ${
                        isActive
                          ? "text-teal-900 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {workspace.name}
                    </span>
                    {isActive && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </button>
                );
              })
            )}

            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={createNewWorkspace}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Plus className="w-4 h-4 text-gray-400" />
                Create New Workspace
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
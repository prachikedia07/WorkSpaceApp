"use client";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function WorkspaceActions({ workspace, onWorkspaceUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function checkOwnership() {
    try {
      const res = await fetch("/api/auth/session");
      const json = await res.json();
      
      if (json?.user?.id) {
        const currentUserId = String(json.user.id);
        const workspaceOwnerId = String(workspace.owner);
        setIsOwner(currentUserId === workspaceOwnerId);
      }
    } catch (err) {
      console.error("Failed to check ownership:", err);
    } finally {
      setLoading(false);
    }
  }
  
  checkOwnership();
}, [workspace]);

  async function handleEdit() {
    setNewName(workspace.name);
    setIsEditing(true);
  }

  async function handleSave() {
    if (!newName.trim()) {
      alert("Please enter a workspace name");
      return;
    }

    try {
      const res = await fetch(`/api/workspaces/${workspace._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        alert("Workspace updated successfully!");
        setIsEditing(false);
        if (onWorkspaceUpdated) onWorkspaceUpdated();
      } else {
        alert(json.error || "Failed to update workspace");
      }
    } catch (err) {
      console.error("Update workspace error:", err);
      alert("Network error. Please try again.");
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${workspace.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/workspaces/${workspace._id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (json.success) {
        alert("Workspace deleted successfully!");
        window.location.reload(); // Reload to show next workspace
      } else {
        alert(json.error || "Failed to delete workspace");
      }
    } catch (err) {
      console.error("Delete workspace error:", err);
      alert("Network error. Please try again.");
    }
  }

  return (
    <>
       {loading ? null : isOwner ? (
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          title="Edit Workspace"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Delete Workspace"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    ) : null}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Workspace</h3>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="My Workspace"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
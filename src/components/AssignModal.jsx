
// // src/components/AssignModal.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { X, Users, Check } from "lucide-react";

// export default function AssignModal({ open, onClose, task, workspaceId, onAssigned }) {
//   const [members, setMembers] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // Load workspace members when modal opens
//   useEffect(() => {
//     if (open && workspaceId) {
//       loadMembers();
//     }
//   }, [open, workspaceId]);

//   // Set initially selected members from task
//   useEffect(() => {
//     if (open && task) {
//       setSelected((task.assignees || []).map(String));
//     }
//   }, [open, task]);

//   async function loadMembers() {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(`/api/workspaces/${workspaceId}/members`);
//       const json = await res.json();

//       if (json.success) {
//         setMembers(json.data || []);
//       } else {
//         setError(json.error || "Failed to load members");
//       }
//     } catch (err) {
//       console.error("Load members error:", err);
//       setError("Network error loading members");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function toggleMember(memberId) {
//     setSelected((prev) => {
//       const id = String(memberId);
//       if (prev.includes(id)) {
//         return prev.filter((x) => x !== id);
//       } else {
//         return [...prev, id];
//       }
//     });
//   }

//   async function save() {
//     setSaving(true);
//     setError("");

//     try {
//       const res = await fetch("/api/tasks", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: task.id,
//           updates: { assignees: selected },
//         }),
//       });

//       const json = await res.json();

//       if (json.success) {
//         onAssigned?.(json.data);
//         onClose();
//         window.dispatchEvent(new CustomEvent("task-updated", { detail: json.data }));
//       } else {
//         setError(json.error || "Failed to assign members");
//       }
//     } catch (err) {
//       console.error("Assign error:", err);
//       setError("Network error. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div className="flex items-center gap-2">
//             <Users className="w-5 h-5 text-teal-600" />
//             <h3 className="text-lg font-semibold text-gray-900">Assign Members</h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {/* Task Info */}
//           <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-600">Task</p>
//             <p className="font-medium text-gray-900 truncate">{task?.title || "Untitled"}</p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
//             </div>
//           ) : members.length === 0 ? (
//             <div className="text-center py-12">
//               <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No team members found</p>
//               <p className="text-sm text-gray-400 mt-1">Add members to your workspace first</p>
//             </div>
//           ) : (
//             <>
//               {/* Selected Count */}
//               <div className="mb-3 text-sm text-gray-600">
//                 {selected.length === 0 ? (
//                   "Select members to assign"
//                 ) : (
//                   <span className="font-medium text-teal-600">
//                     {selected.length} member{selected.length !== 1 ? "s" : ""} selected
//                   </span>
//                 )}
//               </div>

//               {/* Members List */}
//               <div className="space-y-2">
//                 {members.map((member) => {
//                   const isSelected = selected.includes(String(member.id));

//                   return (
//                     <div
//                       key={member.id}
//                       onClick={() => toggleMember(member.id)}
//                       className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
//                         isSelected
//                           ? "border-teal-500 bg-teal-50"
//                           : "border-gray-200 hover:border-teal-200 hover:bg-gray-50"
//                       }`}
//                     >
//                       {/* Checkbox */}
//                       <div
//                         className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
//                           isSelected
//                             ? "bg-teal-600 border-teal-600"
//                             : "border-gray-300 bg-white"
//                         }`}
//                       >
//                         {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
//                       </div>

//                       {/* Avatar */}
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium shadow-sm">
//                         {member.initials}
//                       </div>

//                       {/* Info */}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {member.name}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">{member.email}</p>
//                       </div>

//                       {/* Role Badge */}
//                       {member.isOwner && (
//                         <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
//                           Owner
//                         </span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t p-4 bg-gray-50 flex gap-2">
//           <button
//             onClick={onClose}
//             disabled={saving}
//             className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={save}
//             disabled={saving || loading}
//             className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {saving ? "Saving..." : "Save Assignment"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/AssignModal.jsx
"use client";
import { useState, useEffect } from "react";
import { X, Users, Check } from "lucide-react";

/**
 * Utility: normalize raw member object returned by API to shape:
 * { id, _id, name, email, initials, isOwner }
 */
function normalizeMember(raw) {
  // Accept different shapes: { _id, id, email, name } or maybe just email
  const id = raw?._id || raw?.id || raw?.email || "";
  const email = raw?.email || (typeof id === "string" && id.includes("@") ? id : "");
  const name = raw?.name || (email ? email.split("@")[0] : "Unknown");
  const initials = raw?.initials || (name ? name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase() : "??");
  const isOwner = !!raw?.isOwner || !!raw?.owner || false;
  return { ...raw, id: String(id), _id: raw?._id, name, email, initials, isOwner };
}

/** strictly check 24-char hex ObjectId-ish strings */
function looksLikeObjectId(s) {
  if (!s || typeof s !== "string") return false;
  return /^[0-9a-fA-F]{24}$/.test(s);
}

export default function AssignModal({ open, onClose, task, workspaceId, onAssigned }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && workspaceId) {
      loadMembers();
    }
  }, [open, workspaceId]);

  // When modal opens with a task, try to set selected assignees:
  useEffect(() => {
    if (!open) return;
    if (!task) {
      setSelected([]);
      return;
    }
    // task.assignees might be array of ObjectIds, emails or mixed.
    // We'll normalize to strings and prefer values that match members list ids.
    const rawAssignees = task.assignees || [];
    const asStrings = rawAssignees.map(String);

    // If members are loaded, map to their ids where possible.
    if (members.length) {
      const memberIds = members.map((m) => m.id);
      const intersection = asStrings.filter((a) => memberIds.includes(a));
      if (intersection.length) {
        setSelected(intersection);
        return;
      }
    }

    // Fallback: keep only valid-looking ObjectIds or emails
    setSelected(asStrings.filter((a) => a && (looksLikeObjectId(a) || a.includes("@"))));
  }, [open, task, members]);

  async function loadMembers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/members`);
      // API may return raw JSON or { success, data } — handle both
      const json = await res.json().catch(() => null);
      let raw = [];

      if (!json) {
        setError("Invalid response from server.");
        return;
      }

      if (json.success && (json.data || json.members)) {
        raw = json.data || json.members || [];
      } else if (Array.isArray(json)) {
        raw = json;
      } else if (json.data && Array.isArray(json.data)) {
        raw = json.data;
      } else if (json.member) {
        // single member object returned
        raw = [json.member];
      } else {
        // maybe response shape: { success: false, error: "..." }
        if (!json.success) {
          setError(json.error || "Failed to load members");
          return;
        }
      }

      const normalized = raw.map(normalizeMember);
      setMembers(normalized);
    } catch (err) {
      console.error("Load members error:", err);
      setError("Network error loading members");
    } finally {
      setLoading(false);
    }
  }

  function toggleMember(memberId) {
    setSelected((prev) => {
      const id = String(memberId);
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  async function save() {
    setSaving(true);
    setError("");

    if (!task?.id) {
      setError("Missing task id. Cannot assign.");
      setSaving(false);
      return;
    }

    // Map selected IDs to the best candidate the server expects:
    // Prefer 24-hex ObjectId strings. If member list contains mapping from email to id,
    // convert email -> member.id if possible.
    const memberIdSet = new Set(members.map((m) => m.id));
    const sanitized = selected
      .map((s) => {
        // if selection is an email and a member with that email exists -> use member.id
        if (s && s.includes("@")) {
          const found = members.find((m) => m.email === s || m.id === s || m._id === s);
          return found ? found.id : s; // if not found it's probably an invitee email - send as-is
        }
        return s;
      })
      .filter(Boolean);

    // final guard: if any id is "undefined" or empty, block and ask user to refresh/load members
    if (sanitized.some((s) => !s || String(s).toLowerCase() === "undefined")) {
      setError("Invalid selection detected. Please re-open the modal and try again.");
      setSaving(false);
      return;
    }

    // If backend expects ObjectId only, ensure at least we're sending member ids (24 hex).
    // If user selected emails (invite flow), backend should handle that route separately.
    // We'll still send what user selected — server should validate.
    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.id,
          updates: { assignees: sanitized },
        }),
      });

      // handle no-content / invalid json
      const text = await res.text();
      const json = text ? JSON.parse(text) : { success: res.ok };

      if (json.success) {
        onAssigned?.(json.data || json);
        onClose();
        window.dispatchEvent(new CustomEvent("task-updated", { detail: json.data || json }));
      } else {
        setError(json.error || "Failed to assign members");
      }
    } catch (err) {
      console.error("Assign error:", err);
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Assign Members</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Task</p>
            <p className="font-medium text-gray-900 truncate">{task?.title || "Untitled"}</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No team members found</p>
              <p className="text-sm text-gray-400 mt-1">Add members to your workspace first</p>
            </div>
          ) : (
            <>
              <div className="mb-3 text-sm text-gray-600">
                {selected.length === 0 ? "Select members to assign" : <span className="font-medium text-teal-600">{selected.length} member{selected.length !== 1 ? "s" : ""} selected</span>}
              </div>

              <div className="space-y-2">
                {members.map((member) => {
                  const idKey = member.id || member._id || member.email;
                  const isSelected = selected.includes(String(idKey));
                  return (
                    <div
                      key={String(idKey)}
                      onClick={() => toggleMember(idKey)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-200 hover:bg-gray-50"}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-teal-600 border-teal-600" : "border-gray-300 bg-white"}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>

                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium shadow-sm">
                        {member.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 truncate">{member.email}</p>
                      </div>

                      {member.isOwner && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">Owner</span>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 flex gap-2">
          <button onClick={onClose} disabled={saving} className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={save} disabled={saving || loading} className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? "Saving..." : "Save Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}

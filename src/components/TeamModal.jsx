

// // src/components/TeamModal.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { X, Mail, UserPlus, Trash2, Crown } from "lucide-react";

// /** same normalize helper as AssignModal */
// function normalizeMember(raw) {
//   const id = raw?._id || raw?.id || raw?.email || "";
//   const email = raw?.email || (typeof id === "string" && id.includes("@") ? id : "");
//   const name = raw?.name || (email ? email.split("@")[0] : "Unknown");
//   const initials = raw?.initials || (name ? name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase() : "??");
//   const isOwner = !!raw?.isOwner || !!raw?.owner || false;
//   return { ...raw, id: String(id), _id: raw?._id, name, email, initials, isOwner };
// }

// export default function TeamModal({ open, onClose, workspaceId }) {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newEmail, setNewEmail] = useState("");
//   const [adding, setAdding] = useState(false);
//   const [removing, setRemoving] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     if (open && workspaceId) {
//       loadMembers();
//       loadCurrentUser();
//     }
//   }, [open, workspaceId]);

//   async function loadCurrentUser() {
//     try {
//       // Try session endpoint first
//       const s = await fetch("/api/auth/session").then((r) => r.json()).catch(() => null);
//       if (s?.user?.id) {
//         setCurrentUserId(String(s.user.id));
//         return;
//       }
//       // fallback to /api/user
//       const u = await fetch("/api/user").then((r) => r.json()).catch(() => null);
//       // handle both {success,data} and direct object
//       if (u?.success && u.data) {
//         setCurrentUserId(String(u.data._id || u.data.id));
//       } else if (u?._id || u?.id) {
//         setCurrentUserId(String(u._id || u.id));
//       }
//     } catch (err) {
//       console.warn("Failed to load current user", err);
//     }
//   }

//   async function loadMembers() {
//     if (!workspaceId) return;
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`/api/workspaces/${workspaceId}/members`);
//       const json = await res.json().catch(() => null);

//       if (!json) {
//         setError("Invalid response from server.");
//         return;
//       }

//       let raw = [];
//       if (json.success && (json.data || json.members)) {
//         raw = json.data || json.members || [];
//       } else if (Array.isArray(json)) {
//         raw = json;
//       } else if (json.data && Array.isArray(json.data)) {
//         raw = json.data;
//       } else if (json.member) {
//         raw = [json.member];
//       } else if (json.success === false) {
//         setError(json.error || "Failed to load members");
//         return;
//       }

//       const normalized = raw.map(normalizeMember);
//       setMembers(normalized);
//     } catch (err) {
//       console.error("Load members error:", err);
//       setError("Network error loading members");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function addMember() {
//     setError("");
//     setSuccess("");
//     if (!newEmail.trim()) {
//       setError("Please enter an email address");
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     setAdding(true);
//     try {
//       const res = await fetch(`/api/workspaces/${workspaceId}/members`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: newEmail.trim() }),
//       });
//       const text = await res.text();
//       const json = text ? JSON.parse(text) : { success: res.ok };

//       if (json.success) {
//         setSuccess(`Added ${json.member?.name || json.member?.email || newEmail} successfully!`);
//         setNewEmail("");
//         await loadMembers();
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(json.error || "Failed to add member");
//       }
//     } catch (err) {
//       console.error("Add member error:", err);
//       setError("Network error. Please try again.");
//     } finally {
//       setAdding(false);
//     }
//   }

//   async function removeMember(memberId, memberName) {
//     if (!confirm(`Remove ${memberName} from this workspace?`)) return;
//     setRemoving(memberId);
//     setError("");
//     setSuccess("");
//     try {
//       const res = await fetch(`/api/workspaces/${workspaceId}/members?memberId=${memberId}`, { method: "DELETE" });
//       const text = await res.text();
//       const json = text ? JSON.parse(text) : { success: res.ok };
//       if (json.success) {
//         setSuccess(`Removed ${memberName} successfully!`);
//         await loadMembers();
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(json.error || "Failed to remove member");
//       }
//     } catch (err) {
//       console.error("Remove member error:", err);
//       setError("Network error. Please try again.");
//     } finally {
//       setRemoving(null);
//     }
//   }

//   if (!open) return null;

//   const currentUserMember = members.find(m => String(m.id) === String(currentUserId));
//   const isOwner = currentUserMember?.isOwner || !!members.find(m => m.isOwner && String(m.id) === String(currentUserId));

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//         <div className="flex items-center justify-between p-6 border-b">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
//             <p className="text-sm text-gray-600 mt-1">Manage who has access to this workspace</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
//               <span className="text-sm">{error}</span>
//               <button onClick={() => setError("")} className="ml-auto">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {success && (
//             <div className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-3 rounded-lg flex items-start gap-2">
//               <span className="text-sm">{success}</span>
//               <button onClick={() => setSuccess("")} className="ml-auto">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-3">Current Members ({members.length})</h4>

//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
//               </div>
//             ) : members.length === 0 ? (
//               <div className="text-center py-12 text-gray-500"><p>No members yet</p></div>
//             ) : (
//               <div className="space-y-2">
//                 {members.map((member) => {
//                   const idKey = member.id || member._id || member.email;
//                   return (
//                     <div key={String(idKey)} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium shadow-md">
//                         {member.initials}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2">
//                           <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
//                           {member.isOwner && <Crown className="w-4 h-4 text-amber-500" title="Workspace Owner" />}
//                           {String(member.id) === String(currentUserId) && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">You</span>}
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">{member.email}</p>
//                       </div>

//                       {isOwner && !member.isOwner && (
//                         <button onClick={() => removeMember(member.id, member.name)} disabled={removing === member.id} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 disabled:opacity-50" title="Remove member">
//                           {removing === member.id ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div> : <Trash2 className="w-4 h-4" />}
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {isOwner ? (
//             <div className="border-t pt-6">
//               <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add New Member</h4>

//               <div className="flex gap-2">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="email"
//                       value={newEmail}
//                       onChange={(e) => setNewEmail(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && addMember()}
//                       placeholder="colleague@example.com"
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
//                       disabled={adding}
//                     />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">Member must have an account already</p>
//                 </div>

//                 <button onClick={addMember} disabled={adding || !newEmail.trim()} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
//                   {adding ? "Adding..." : "Add"}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="border-t pt-6">
//               <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
//                 <p className="font-medium mb-1">💡 Member Privileges</p>
//                 <p>Only the workspace owner can add or remove members.</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="border-t p-4 bg-gray-50">
//           <button onClick={onClose} className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/components/TeamModal.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { X, Mail, UserPlus, Trash2, Crown, Search } from "lucide-react";

// async function fetchJson(url, opts) {
//   try {
//     const r = await fetch(url, opts);
//     const j = await r.json().catch(() => null);
//     return { ok: r.ok, status: r.status, json: j };
//   } catch (err) {
//     console.error("fetchJson error", err);
//     return { ok: false, error: err };
//   }
// }

// export default function TeamModal({ open, onClose, workspaceId }) {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newEmail, setNewEmail] = useState("");
//   const [adding, setAdding] = useState(false);
//   const [removing, setRemoving] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // for autocomplete / registered users pick
//   const [allUsers, setAllUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     if (open && workspaceId) {
//       loadMembers();
//       loadCurrentUser();
//       loadAllUsers(); // load registry for pick
//     } else {
//       // clear UI state
//       setQuery("");
//       setSuggestions([]);
//       setAllUsers([]);
//     }
//   }, [open, workspaceId]);

//   async function loadCurrentUser() {
//     const r = await fetchJson("/api/auth/session");
//     if (r.json?.user?.id) setCurrentUserId(r.json.user.id);
//   }

//   async function loadAllUsers() {
//     // load a list of registered users for autocomplete / invite selection
//     const r = await fetchJson("/api/user"); // adjust if /api/users in your project
//     if (r.ok && Array.isArray(r.json?.data || r.json)) {
//       const list = (r.json.data || r.json).map((u) => ({
//         id: String(u._id || u.id || ""),
//         email: u.email,
//         name: u.name || u.email,
//         initials: computeInitials(u.name || u.email),
//       }));
//       setAllUsers(list);
//     } else {
//       // ignore silently — still allow email invites
//     }
//   }

//   function computeInitials(nameOrEmail) {
//     const s = (nameOrEmail || "").trim();
//     if (!s) return "??";
//     // if email, take local-part
//     const local = s.includes("@") ? s.split("@")[0] : s;
//     const parts = local.split(/[.\s_-]+/).filter(Boolean);
//     if (parts.length === 0) return "??";
//     if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   }

//   async function loadMembers() {
//     if (!workspaceId) return;
//     setLoading(true);
//     setError("");
//     const r = await fetchJson(`/api/workspaces/${workspaceId}/members`);
//     console.log("[TeamModal] /members", r.status, r.json);
//     if (!r.ok || !r.json) {
//       setError(r.json?.error || "Failed to load members");
//       setMembers([]);
//       setLoading(false);
//       return;
//     }
//     if (!r.json.success) {
//       setError(r.json.error || "Failed to load members");
//       setMembers([]);
//       setLoading(false);
//       return;
//     }

//     // normalize shape
//     const normalized = (r.json.data || []).map((m) => {
//       const name = m.name || m.email || "Unknown";
//       return {
//         id: String(m.id || m._id || ""),
//         name,
//         email: m.email || "",
//         initials: m.initials || computeInitials(name),
//         isOwner: !!m.isOwner,
//       };
//     });
//     setMembers(normalized);
//     setLoading(false);
//   }

//   useEffect(() => {
//     if (!query) {
//       setSuggestions([]);
//       return;
//     }
//     const q = query.toLowerCase();
//     const matches = allUsers.filter(
//       (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
//     );
//     setSuggestions(matches.slice(0, 6));
//   }, [query, allUsers]);

//   async function addMember(email) {
//     if (!email || !email.trim()) {
//       setError("Please enter an email");
//       return;
//     }
//     setAdding(true);
//     setError("");
//     setSuccess("");
//     try {
//       const r = await fetchJson(`/api/workspaces/${workspaceId}/members`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.trim() }),
//       });
//       console.log("[TeamModal] add member reply", r.status, r.json);
//       if (!r.ok || !r.json) {
//         setError("Failed to add member");
//       } else if (r.json.success) {
//         // server will return member or a message
//         setSuccess(r.json.message || `Added ${email} (or invite sent)`);
//         setNewEmail("");
//         setQuery("");
//         setSuggestions([]);
//         await loadMembers();
//         setTimeout(() => setSuccess(""), 3500);
//       } else {
//         setError(r.json.error || "Failed to add member");
//       }
//     } catch (err) {
//       console.error("Add member error", err);
//       setError("Network error");
//     } finally {
//       setAdding(false);
//     }
//   }

//   async function removeMember(memberId, memberName) {
//     if (!confirm(`Remove ${memberName} from this workspace?`)) return;
//     setRemoving(memberId);
//     setError("");
//     setSuccess("");
//     try {
//       const r = await fetchJson(`/api/workspaces/${workspaceId}/members?memberId=${memberId}`, {
//         method: "DELETE",
//       });
//       if (!r.ok || !r.json) {
//         setError("Failed to remove");
//       } else if (r.json.success) {
//         setSuccess(`Removed ${memberName}`);
//         await loadMembers();
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(r.json.error || "Failed to remove");
//       }
//     } catch (err) {
//       console.error("Remove member error", err);
//       setError("Network error");
//     } finally {
//       setRemoving(null);
//     }
//   }

//   if (!open) return null;

//   const currentUserMember = members.find((m) => String(m.id) === String(currentUserId));
//   const isOwner = currentUserMember?.isOwner || false;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
//             <p className="text-sm text-gray-600 mt-1">Manage who has access to this workspace</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
//               <span className="text-sm">{error}</span>
//               <button onClick={() => setError("")} className="ml-auto"><X className="w-4 h-4" /></button>
//             </div>
//           )}
//           {success && (
//             <div className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-3 rounded-lg flex items-start gap-2">
//               <span className="text-sm">{success}</span>
//               <button onClick={() => setSuccess("")} className="ml-auto"><X className="w-4 h-4" /></button>
//             </div>
//           )}

//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-3">Current Members ({members.length})</h4>
//             {loading ? (
//               <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" /></div>
//             ) : members.length === 0 ? (
//               <div className="text-center py-12 text-gray-500"><p>No members yet</p></div>
//             ) : (
//               <div className="space-y-2">
//                 {members.map((member) => (
//                   <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium shadow-md">
//                       {member.initials}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2">
//                         <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
//                         {member.isOwner && <Crown className="w-4 h-4 text-amber-500" title="Workspace Owner" />}
//                         {String(member.id) === String(currentUserId) && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">You</span>}
//                       </div>
//                       <p className="text-xs text-gray-500 truncate">{member.email}</p>
//                     </div>

//                     {isOwner && !member.isOwner && (
//                       <button
//                         onClick={() => removeMember(member.id, member.name)}
//                         disabled={removing === member.id}
//                         className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 disabled:opacity-50"
//                         title="Remove member"
//                       >
//                         {removing === member.id ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" /> : <Trash2 className="w-4 h-4" />}
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Add Member Section (Owner Only) */}
//           {isOwner && (
//             <div className="border-t pt-6">
//               <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" /> Add / Invite Member
//               </h4>

//               <div className="flex gap-2">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     value={query || newEmail}
//                     onChange={(e) => {
//                       setQuery(e.target.value);
//                       setNewEmail(e.target.value);
//                     }}
//                     onKeyPress={(e) => e.key === "Enter" && addMember(newEmail)}
//                     placeholder="Search registered users or paste email"
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
//                     disabled={adding}
//                   />
//                   {/* suggestions dropdown */}
//                   {suggestions.length > 0 && (
//                     <div className="absolute left-0 right-0 mt-12 bg-white border rounded shadow z-50 max-h-48 overflow-auto">
//                       {suggestions.map((u) => (
//                         <div key={u.id} className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2" onClick={() => { setNewEmail(u.email); setQuery(u.name); setSuggestions([]); }}>
//                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">{u.initials}</div>
//                           <div className="flex-1 min-w-0">
//                             <div className="text-sm truncate">{u.name}</div>
//                             <div className="text-xs text-gray-500 truncate">{u.email}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => addMember(newEmail)}
//                   disabled={adding || !newEmail.trim()}
//                   className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
//                 >
//                   {adding ? "Adding..." : "Add / Invite"}
//                 </button>
//               </div>

//               <p className="text-xs text-gray-500 mt-2">If email belongs to a registered user they will be added immediately; otherwise an invite email will be sent (stubbed).</p>
//             </div>
//           )}

//           {!isOwner && (
//             <div className="border-t pt-6">
//               <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
//                 <p className="font-medium mb-1">💡 Member Privileges</p>
//                 <p>Only the workspace owner can add or remove members.</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t p-4 bg-gray-50">
//           <button onClick={onClose} className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/TeamModal.jsx

"use client";
import { useEffect, useState } from "react";
import { X, Mail, UserPlus, Trash2, Crown } from "lucide-react";
import InviteModal from "./InviteModal";

export default function TeamModal({ open, onClose, workspaceId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    if (open && workspaceId) {
      loadMembers();
      loadCurrentUser();
    }
  }, [open, workspaceId]);

  async function loadCurrentUser() {
    try {
      const res = await fetch("/api/auth/session");
      const json = await res.json();
      console.log("[TeamModal] Current session:", json);
      
      if (json?.user?.id) {
        setCurrentUserId(String(json.user.id));
      } else if (json?.user?.email) {
        // Fallback: fetch user by email
        const userRes = await fetch("/api/user");
        const userData = await userRes.json();
        if (userData?.success && userData.data?._id) {
          setCurrentUserId(String(userData.data._id));
        }
      }
    } catch (err) {
      console.error("Failed to load current user:", err);
    }
  }

  async function loadMembers() {
    if (!workspaceId) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/members`);
      const json = await res.json();
      
      console.log("[TeamModal] Members response:", json);
      
      if (json.success) {
        const normalized = (json.data || []).map((m) => ({
          id: String(m.id || m._id || ""),
          name: m.name || m.email || "Unknown",
          email: m.email || "",
          initials: m.initials || computeInitials(m.name || m.email),
          isOwner: !!m.isOwner,
        }));
        
        console.log("[TeamModal] Normalized members:", normalized);
        setMembers(normalized);
      } else {
        setError(json.error || "Failed to load members");
      }
    } catch (err) {
      console.error("Load members error:", err);
      setError("Network error loading members");
    } finally {
      setLoading(false);
    }
  }

  function computeInitials(nameOrEmail) {
    if (!nameOrEmail) return "??";
    const s = nameOrEmail.trim();
    const local = s.includes("@") ? s.split("@")[0] : s;
    const parts = local.split(/[.\s_-]+/).filter(Boolean);
    if (parts.length === 0) return "??";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  async function addMember() {
    if (!newEmail.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setAdding(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        setSuccess(`Added ${json.member?.name || newEmail} successfully!`);
        setNewEmail("");
        await loadMembers();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(json.error || "Failed to add member");
      }
    } catch (err) {
      console.error("Add member error:", err);
      setError("Network error. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  async function removeMember(memberId, memberName) {
    if (!confirm(`Remove ${memberName} from this workspace?`)) {
      return;
    }

    setRemoving(memberId);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `/api/workspaces/${workspaceId}/members?memberId=${memberId}`,
        { method: "DELETE" }
      );

      const json = await res.json();

      if (json.success) {
        setSuccess(`Removed ${memberName} successfully!`);
        await loadMembers();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(json.error || "Failed to remove member");
      }
    } catch (err) {
      console.error("Remove member error:", err);
      setError("Network error. Please try again.");
    } finally {
      setRemoving(null);
    }
  }

  if (!open) return null;

  // ✅ FIX: Better owner detection
  const currentUserMember = members.find(
    (m) => String(m.id) === String(currentUserId)
  );
  const isOwner = currentUserMember?.isOwner || false;

  console.log("[TeamModal] Owner check:", {
    currentUserId,
    currentUserMember,
    isOwner,
    allMembers: members.map(m => ({ id: m.id, isOwner: m.isOwner }))
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage who has access to this workspace
            </p>
          </div>
          <div className="flex items-center gap-2">
    {isOwner && (
      <button
        onClick={()=> setShowInviteModal(true)}
        className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        Invite by Email
      </button>
    )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <span className="text-sm">{error}</span>
              <button onClick={() => setError("")} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {success && (
            <div className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <span className="text-sm">{success}</span>
              <button onClick={() => setSuccess("")} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Current Members ({members.length})
            </h4>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No members yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-teal-200 hover:bg-teal-50/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium shadow-md">
                      {member.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {member.name}
                        </p>
                        {member.isOwner && (
                          <Crown className="w-4 h-4 text-amber-500" title="Workspace Owner" />
                        )}
                        {String(member.id) === String(currentUserId) && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>

                    {isOwner && !member.isOwner && (
                      <button
                        onClick={() => removeMember(member.id, member.name)}
                        disabled={removing === member.id}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 disabled:opacity-50"
                        title="Remove member"
                      >
                        {removing === member.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ ALWAYS SHOW THIS SECTION */}
          {isOwner ? (
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add New Member
              </h4>

              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addMember()}
                      placeholder="colleague@example.com"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      disabled={adding}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Member must have an account already
                  </p>
                </div>

                <button
                  onClick={addMember}
                  disabled={adding || !newEmail.trim()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {adding ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t pt-6">
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium mb-1">💡 Member Privileges</p>
                <p>Only the workspace owner can add or remove members.</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Invite Modal */}
      <InviteModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        workspaceId={workspaceId}
        workspaceName="Workspace"
      />
    </div>
  );
}
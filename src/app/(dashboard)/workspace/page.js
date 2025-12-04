// // // // // // src/app/workspace/tasks/page.jsx
// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { DndProvider, useDrag, useDrop } from "react-dnd";
// // // // // import { HTML5Backend } from "react-dnd-html5-backend";

// // // // // import AssignModal from "@/components/AssignModal";
// // // // // import EditTaskModal from "@/components/EditTaskModal";
// // // // // import FilterModal from "@/components/FilterModal";
// // // // // // near other imports
// // // // // import TeamModal from "@/components/TeamModal";



// // // // // /* Column definitions */
// // // // // const columnDefinitions = [
// // // // //   { id: "todo", title: "To Do" },
// // // // //   { id: "inprogress", title: "In Progress" },
// // // // //   { id: "review", title: "Review" },
// // // // //   { id: "completed", title: "Done" },
// // // // // ];

// // // // // const priorityBadgeClasses = {
// // // // //   low: "bg-gray-100 text-gray-600 border border-gray-200",
// // // // //   medium: "bg-amber-100 text-amber-700 border border-amber-200",
// // // // //   high: "bg-red-100 text-red-700 border border-red-200",
// // // // // };

// // // // // /* TaskCard — now accepts members prop and shows initials for assignees */
// // // // // function TaskCard({ task, columnId, onToggle, onDelete, members = [] }) {
// // // // //   const [{ isDragging }, drag] = useDrag(
// // // // //     () => ({
// // // // //       type: "TASK",
// // // // //       item: { id: task.id, fromColumn: columnId },
// // // // //       collect: (monitor) => ({ isDragging: monitor.isDragging() }),
// // // // //     }),
// // // // //     [task, columnId]
// // // // //   );

// // // // //   const [openAssign, setOpenAssign] = useState(false);
// // // // //   const [openEdit, setOpenEdit] = useState(false);



// // // // //   return (
// // // // //     <>
// // // // //       <div
// // // // //         ref={drag}
// // // // //         className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${isDragging ? "opacity-50" : ""
// // // // //           }`}
// // // // //       >
// // // // //         <div className="flex items-start justify-between mb-3">
// // // // //           <h4
// // // // //             className={`text-sm text-gray-900 font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""
// // // // //               }`}
// // // // //           >
// // // // //             {task.title}
// // // // //           </h4>

// // // // //           <div className="flex items-center gap-2">
// // // // //             <button
// // // // //               onClick={() => setOpenEdit(true)}
// // // // //               className="text-gray-400 hover:text-gray-600"
// // // // //               title="Edit"
// // // // //             >
// // // // //               <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => setOpenAssign(true)}
// // // // //               className="text-gray-400 hover:text-teal-600"
// // // // //               title="Assign"
// // // // //             >
// // // // //               <Users className="w-4 h-4" />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <p className="text-sm text-gray-600 mb-4 leading-relaxed">{task.description}</p>

// // // // //         <div className="flex flex-wrap gap-2 mb-4">
// // // // //           {(task.tags || []).map((tag) => (
// // // // //             <Badge key={tag} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
// // // // //               {tag}
// // // // //             </Badge>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="flex items-center justify-between">
// // // // //           <div className="flex items-center gap-2">
// // // // //             <span
// // // // //               className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${priorityBadgeClasses[task.priority || "medium"]
// // // // //                 }`}
// // // // //             >
// // // // //               {task.priority || "medium"}
// // // // //             </span>
// // // // //           </div>

// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="flex items-center gap-1.5 text-xs text-gray-500">
// // // // //               <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
// // // // //               {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
// // // // //             </div>
// // // // //             <div className="flex -space-x-2">
// // // // //               {(task.assignees || []).map((assigneeId) => {
// // // // //                 const m = members.find((x) => String(x.id) === String(assigneeId));
// // // // //                 const initials = m ? m.initials : String(assigneeId).slice(0, 2).toUpperCase();
// // // // //                 return (
// // // // //                   <div
// // // // //                     key={assigneeId}
// // // // //                     className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
// // // // //                     title={m ? m.name : assigneeId}
// // // // //                   >
// // // // //                     {initials}
// // // // //                   </div>
// // // // //                 );
// // // // //               })}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="mt-3 flex gap-3 justify-end">
// // // // //           <button onClick={() => onToggle(task)} className="text-sm text-teal-600">
// // // // //             {task.status === "completed" ? "Undo" : "Complete"}
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={() => {
// // // // //               if (confirm("Delete this task?")) onDelete(task.id);
// // // // //             }}
// // // // //             className="text-sm text-red-600"
// // // // //           >
// // // // //             Delete
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Modals */}
// // // // //       <AssignModal
// // // // //         open={openAssign}
// // // // //         onClose={() => setOpenAssign(false)}
// // // // //         task={task}
// // // // //         // allMembers will be passed from parent (we pass members when rendering TaskCard)
// // // // //         allMembers={members}
// // // // //         onAssigned={(updated) => {
// // // // //           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
// // // // //         }}
// // // // //       />

// // // // //       <EditTaskModal
// // // // //         open={openEdit}
// // // // //         onClose={() => setOpenEdit(false)}
// // // // //         task={task}
// // // // //         onSaved={(updated) => {
// // // // //           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
// // // // //         }}
// // // // //       />
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // /* Column component (passes members down) */
// // // // // function ColumnComponent({ column, onDrop, onToggle, onDelete, members }) {
// // // // //   const [{ isOver }, drop] = useDrop(
// // // // //     () => ({
// // // // //       accept: "TASK",
// // // // //       drop: (item) => {
// // // // //         if (item.fromColumn !== column.id) {
// // // // //           onDrop(item.id, item.fromColumn, column.id);
// // // // //         }
// // // // //       },
// // // // //       collect: (monitor) => ({ isOver: monitor.isOver() }),
// // // // //     }),
// // // // //     [column]
// // // // //   );

// // // // //   return (
// // // // //     <div
// // // // //       ref={drop}
// // // // //       className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${isOver ? "bg-teal-50/50" : "bg-white/40"
// // // // //         } rounded-2xl p-5 backdrop-blur-sm border border-white/50`}
// // // // //     >
// // // // //       <div className="flex items-center justify-between mb-5">
// // // // //         <div className="flex items-center gap-3">
// // // // //           <h3 className="text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
// // // // //             {column.title}
// // // // //           </h3>
// // // // //           <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
// // // // //             {(column.tasks || []).length}
// // // // //           </Badge>
// // // // //         </div>
// // // // //         <button className="text-gray-400 hover:text-teal-600 transition-colors p-1 hover:bg-white/60 rounded-lg">
// // // // //           <Plus className="w-4 h-4" strokeWidth={2} />
// // // // //         </button>
// // // // //       </div>

// // // // //       <div className="space-y-4">
// // // // //         {(column.tasks || []).map((task) => (
// // // // //           <TaskCard key={task.id} task={task} columnId={column.id} onToggle={onToggle} onDelete={onDelete} members={members} />
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* Main WorkspacePage */
// // // // // export default function WorkspacePage() {
// // // // //   const [columns, setColumns] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });
// // // // //   const [filter, setFilter] = useState({});
// // // // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// // // // //   const [teamOpen, setTeamOpen] = useState(false);

// // // // //   // members fetched from API (fallback to sample)
// // // // //   const [members, setMembers] = useState([
// // // // //     { id: "SC", name: "Sarah Chen", initials: "SC" },
// // // // //     { id: "MR", name: "Michael Ross", initials: "MR" },
// // // // //     { id: "EW", name: "Emma Wilson", initials: "EW" },
// // // // //     { id: "JM", name: "James Miller", initials: "JM" },
// // // // //   ]);

// // // // //   // load members from server (if you have /api/user or /api/users)
// // // // //   useEffect(() => {
// // // // //     let mounted = true;
// // // // //     async function loadMembers() {
// // // // //       try {
// // // // //         const res = await fetch("/api/user"); // adjust endpoint if different
// // // // //         if (!res.ok) return;
// // // // //         const json = await res.json();
// // // // //         const raw = json?.success ? json.data || [] : [];
// // // // //         const mapped = raw.map((u) => ({
// // // // //           id: u._id || u.id,
// // // // //           name: u.name || u.firstName || u.email || "User",
// // // // //           initials: (u.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase(),
// // // // //         }));
// // // // //         if (mounted && mapped.length) setMembers(mapped);
// // // // //       } catch (err) {
// // // // //         console.warn("Could not load members, using sample:", err);
// // // // //       }
// // // // //     }
// // // // //     loadMembers();
// // // // //     return () => {
// // // // //       mounted = false;
// // // // //     };
// // // // //   }, []);

// // // // //   /* Load tasks (with optional filters) */
// // // // //   async function loadTasks(f = filter) {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const params = new URLSearchParams();
// // // // //       if (f.status) params.set("status", f.status);
// // // // //       if (f.priority) params.set("priority", f.priority);
// // // // //       if (f.assignee) params.set("assignee", f.assignee);
// // // // //       if (f.q) params.set("q", f.q);

// // // // //       const url = "/api/tasks" + (params.toString() ? `?${params.toString()}` : "");
// // // // //       const res = await fetch(url);
// // // // //       const json = await res.json();
// // // // //       const raw = json?.success ? json.data || [] : [];

// // // // //       const mapped = raw.map((t) => ({
// // // // //         ...t,
// // // // //         id: t._id,
// // // // //         title: t.title || "",
// // // // //         description: t.description || "",
// // // // //         priority: t.priority || "medium",
// // // // //         status: t.status || "todo",
// // // // //         tags: t.tags || [],
// // // // //         assignees: t.assignees || [],
// // // // //         dueDate: t.dueDate || null,
// // // // //       }));

// // // // //       const cols = columnDefinitions.map((colDef) => ({
// // // // //         ...colDef,
// // // // //         tasks: mapped.filter((t) => t.status === colDef.id),
// // // // //       }));

// // // // //       setColumns(cols);
// // // // //     } catch (err) {
// // // // //       console.error("loadTasks error:", err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }

// // // // //   useEffect(() => {
// // // // //     loadTasks();
// // // // //     function onUpdate() {
// // // // //       loadTasks();
// // // // //     }
// // // // //     window.addEventListener("task-updated", onUpdate);
// // // // //     return () => window.removeEventListener("task-updated", onUpdate);
// // // // //   }, []);

// // // // //   /* Drag/drop persistence */
// // // // //   const handleDrop = async (taskId, fromColumnId, toColumnId) => {
// // // // //     setColumns((prev) => {
// // // // //       const newCols = JSON.parse(JSON.stringify(prev));
// // // // //       const from = newCols.find((c) => c.id === fromColumnId);
// // // // //       const to = newCols.find((c) => c.id === toColumnId);
// // // // //       if (!from || !to) return prev;
// // // // //       const idx = from.tasks.findIndex((t) => t.id === taskId);
// // // // //       if (idx === -1) return prev;
// // // // //       const [task] = from.tasks.splice(idx, 1);
// // // // //       task.status = toColumnId;
// // // // //       to.tasks.unshift(task);
// // // // //       return newCols;
// // // // //     });

// // // // //     try {
// // // // //       await fetch("/api/tasks", {
// // // // //         method: "PATCH",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ id: taskId, updates: { status: toColumnId } }),
// // // // //       });
// // // // //     } catch (err) {
// // // // //       console.error("persist status change failed:", err);
// // // // //       loadTasks();
// // // // //     }
// // // // //   };

// // // // //   /* Add task */
// // // // //   async function addTask(e) {
// // // // //     e?.preventDefault();
// // // // //     if (!form.title.trim()) return;
// // // // //     try {
// // // // //       await fetch("/api/tasks", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate || null, status: "todo" }),
// // // // //       });
// // // // //       setForm({ title: "", description: "", priority: "medium", dueDate: "" });
// // // // //       await loadTasks();
// // // // //     } catch (err) {
// // // // //       console.error("addTask error:", err);
// // // // //     }
// // // // //   }

// // // // //   /* Toggle complete */
// // // // //   async function toggleComplete(task) {
// // // // //     const newStatus = task.status === "completed" ? "todo" : "completed";
// // // // //     try {
// // // // //       await fetch("/api/tasks", {
// // // // //         method: "PATCH",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ id: task.id, updates: { status: newStatus } }),
// // // // //       });
// // // // //       await loadTasks();
// // // // //     } catch (err) {
// // // // //       console.error("toggleComplete error:", err);
// // // // //     }
// // // // //   }

// // // // //   /* Delete task */
// // // // //   async function deleteTask(id) {
// // // // //     try {
// // // // //       await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
// // // // //       await loadTasks();
// // // // //     } catch (err) {
// // // // //       console.error("deleteTask error:", err);
// // // // //     }
// // // // //   }

// // // // //   /* summary numbers */
// // // // //   const totalTasks = columns.reduce((s, c) => s + (c.tasks?.length || 0), 0);
// // // // //   const inProgressCount = columns.find((c) => c.id === "inprogress")?.tasks?.length || 0;
// // // // //   const completedCount = columns.find((c) => c.id === "completed")?.tasks?.length || 0;

// // // // //   return (
// // // // //     <>
// // // // //       <DndProvider backend={HTML5Backend}>
// // // // //         <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
// // // // //           <div className="mb-10">
// // // // //             <div className="flex items-center justify-between mb-6">
// // // // //               <div>
// // // // //                 <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
// // // // //                   Product Development
// // // // //                 </h2>
// // // // //                 <p className="text-gray-600">Track progress and manage team tasks</p>
// // // // //               </div>
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <Button
// // // // //                   variant="outline"
// // // // //                   onClick={() => setTeamOpen(true)}
// // // // //                   className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
// // // // //                 >
// // // // //                   <Users className="w-4 h-4" /> Team
// // // // //                 </Button>


// // // // //                 <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11">
// // // // //                   <Tag className="w-4 h-4" /> Filter
// // // // //                 </Button>

// // // // //                 <Button onClick={() => document.getElementById("add-task-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl h-11">
// // // // //                   <Plus className="w-4 h-4" /> New Task
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-4 gap-5">
// // // // //               {[
// // // // //                 ["Total Tasks", totalTasks],
// // // // //                 ["In Progress", inProgressCount],
// // // // //                 ["Completed", completedCount],
// // // // //                 ["Team Members", members.length],
// // // // //               ].map(([label, num]) => (
// // // // //                 <div key={label} className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md">
// // // // //                   <p className="text-sm text-gray-600 mb-1">{label}</p>
// // // // //                   <p className="text-2xl text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
// // // // //                     {num}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Add Task Form */}
// // // // //           <div id="add-task-form" className="bg-white shadow rounded-xl p-6 mb-8">
// // // // //             <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // // //               <input className="border rounded p-2" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
// // // // //               <select className="border rounded p-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
// // // // //                 <option value="low">Low</option>
// // // // //                 <option value="medium">Medium</option>
// // // // //                 <option value="high">High</option>
// // // // //               </select>
// // // // //               <input className="border rounded p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
// // // // //               <textarea className="border rounded p-2 col-span-1 md:col-span-4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
// // // // //               <div className="col-span-1 md:col-span-4 flex gap-2">
// // // // //                 <button className="bg-teal-600 text-white px-4 py-2 rounded" type="submit">Add Task</button>
// // // // //                 <button type="button" onClick={() => setForm({ title: "", description: "", priority: "medium", dueDate: "" })} className="px-4 py-2 rounded border">Reset</button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>

// // // // //           {/* Kanban Board */}
// // // // //           <div className="flex flex-wrap gap-5 w-full pb-6">
// // // // //             {loading ? <div>Loading tasks...</div> : columns.map((col) => (
// // // // //               <ColumnComponent key={col.id} column={col} onDrop={handleDrop} onToggle={toggleComplete} onDelete={deleteTask} members={members} />
// // // // //             ))}
// // // // //           </div>

// // // // //                     {/* Team modal */}
// // // // //           <TeamModal open={teamOpen} onClose={() => setTeamOpen(false)} />


// // // // //           {/* Filter Modal */}
// // // // //           <FilterModal
// // // // //             open={isFilterOpen}
// // // // //             onClose={() => setIsFilterOpen(false)}
// // // // //             members={members}
// // // // //             onApply={(f) => {
// // // // //               setFilter(f);
// // // // //               loadTasks(f);
// // // // //             }}
// // // // //             initial={filter}
// // // // //           />
// // // // //         </div>
// // // // //       </DndProvider>
// // // // //     </>
// // // // //   );
// // // // // }


// // // src/app/(dashboard)/workspace/page.js
// // "use client";

// // import { useEffect, useState } from "react";
// // import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { DndProvider, useDrag, useDrop } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";

// // import AssignModal from "@/components/AssignModal";
// // import EditTaskModal from "@/components/EditTaskModal";
// // import FilterModal from "@/components/FilterModal";
// // import TeamModal from "@/components/TeamModal";
// // import Sidebar from "@/components/Sidebar";

// // /* Column definitions */
// // const columnDefinitions = [
// //   { id: "todo", title: "To Do" },
// //   { id: "inprogress", title: "In Progress" },
// //   { id: "review", title: "Review" },
// //   { id: "completed", title: "Done" },
// // ];

// // const priorityBadgeClasses = {
// //   low: "bg-gray-100 text-gray-600 border border-gray-200",
// //   medium: "bg-amber-100 text-amber-700 border border-amber-200",
// //   high: "bg-red-100 text-red-700 border border-red-200",
// // };

// // /* TaskCard — now accepts members prop and shows initials for assignees */
// // function TaskCard({ task, columnId, onToggle, onDelete, members = [], workspaceId }) {
// //   const [{ isDragging }, drag] = useDrag(
// //     () => ({
// //       type: "TASK",
// //       item: { id: task.id, fromColumn: columnId },
// //       collect: (monitor) => ({ isDragging: monitor.isDragging() }),
// //     }),
// //     [task, columnId]
// //   );

// //   const [openAssign, setOpenAssign] = useState(false);
// //   const [openEdit, setOpenEdit] = useState(false);

// //   return (
// //     <>
// //       <div
// //         ref={drag}
// //         className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${
// //           isDragging ? "opacity-50" : ""
// //         }`}
// //       >
// //         <div className="flex items-start justify-between mb-3">
// //           <h4
// //             className={`text-sm text-gray-900 font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""
// //               }`}
// //           >
// //             {task.title}
// //           </h4>

// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={() => setOpenEdit(true)}
// //               className="text-gray-400 hover:text-gray-600"
// //               title="Edit"
// //             >
// //               <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
// //             </button>
// //             <button
// //               onClick={() => setOpenAssign(true)}
// //               className="text-gray-400 hover:text-teal-600"
// //               title="Assign"
// //             >
// //               <Users className="w-4 h-4" />
// //             </button>
// //           </div>
// //         </div>

// //         <p className="text-sm text-gray-600 mb-4 leading-relaxed">{task.description}</p>

// //         <div className="flex flex-wrap gap-2 mb-4">
// //           {(task.tags || []).map((tag) => (
// //             <Badge key={tag} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
// //               {tag}
// //             </Badge>
// //           ))}
// //         </div>

// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <span
// //               className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${
// //                 priorityBadgeClasses[task.priority || "medium"]
// //               }`}
// //             >
// //               {task.priority || "medium"}
// //             </span>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <div className="flex items-center gap-1.5 text-xs text-gray-500">
// //               <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
// //               {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
// //             </div>
// //             <div className="flex -space-x-2">
// //               {(task.assignees || []).map((assigneeId) => {
// //                 const m = members.find((x) => String(x.id) === String(assigneeId));
// //                 const initials = m ? m.initials : String(assigneeId).slice(0, 2).toUpperCase();
// //                 return (
// //                   <div
// //                     key={assigneeId}
// //                     className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
// //                     title={m ? m.name : assigneeId}
// //                   >
// //                     {initials}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-3 flex gap-3 justify-end">
// //           <button onClick={() => onToggle(task)} className="text-sm text-teal-600">
// //             {task.status === "completed" ? "Undo" : "Complete"}
// //           </button>
// //           <button
// //             onClick={() => {
// //               if (confirm("Delete this task?")) onDelete(task.id);
// //             }}
// //             className="text-sm text-red-600"
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </div>

// //       <AssignModal
// //         open={openAssign}
// //         onClose={() => setOpenAssign(false)}
// //         task={task}
// //         workspaceId={workspaceId} // pass workspace id so AssignModal can fetch members
// //         onAssigned={(updated) => {
// //           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
// //         }}
// //       />

// //       <EditTaskModal
// //         open={openEdit}
// //         onClose={() => setOpenEdit(false)}
// //         task={task}
// //         onSaved={(updated) => {
// //           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
// //         }}
// //       />
// //     </>
// //   );
// // }

// // /* Column component (passes members down) */
// // function ColumnComponent({ column, onDrop, onToggle, onDelete, members, workspaceId }) {
// //   const [{ isOver }, drop] = useDrop(
// //     () => ({
// //       accept: "TASK",
// //       drop: (item) => {
// //         if (item.fromColumn !== column.id) {
// //           onDrop(item.id, item.fromColumn, column.id);
// //         }
// //       },
// //       collect: (monitor) => ({ isOver: monitor.isOver() }),
// //     }),
// //     [column]
// //   );

// //   return (
// //     <div
// //       ref={drop}
// //       className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${isOver ? "bg-teal-50/50" : "bg-white/40"
// //         } rounded-2xl p-5 backdrop-blur-sm border border-white/50`}
// //     >
// //       <div className="flex items-center justify-between mb-5">
// //         <div className="flex items-center gap-3">
// //           <h3 className="text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
// //             {column.title}
// //           </h3>
// //           <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
// //             {(column.tasks || []).length}
// //           </Badge>
// //         </div>
// //         <button className="text-gray-400 hover:text-teal-600 transition-colors p-1 hover:bg-white/60 rounded-lg">
// //           <Plus className="w-4 h-4" strokeWidth={2} />
// //         </button>
// //       </div>

// //       <div className="space-y-4">
// //         {(column.tasks || []).map((task) => (
// //           <TaskCard key={task.id} task={task} columnId={column.id} onToggle={onToggle} onDelete={onDelete} members={members} workspaceId={workspaceId} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* Main WorkspacePage */
// // export default function WorkspacePage() {
// //   const [columns, setColumns] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });
// //   const [filter, setFilter] = useState({});
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [teamOpen, setTeamOpen] = useState(false);

// //   // members fetched from API (fallback to sample)
// //   const [members, setMembers] = useState([
// //     { id: "SC", name: "Sarah Chen", initials: "SC" },
// //     { id: "MR", name: "Michael Ross", initials: "MR" },
// //     { id: "EW", name: "Emma Wilson", initials: "EW" },
// //     { id: "JM", name: "James Miller", initials: "JM" },
// //   ]);

// //   // workspace state (was missing)
// //   const [workspace, setWorkspace] = useState(null);

// //   // load workspace (default)
// //   useEffect(() => {
// //     let mounted = true;
// //     async function loadWorkspace() {
// //       try {
// //         const res = await fetch("/api/workspaces/default");
// //         const json = await res.json();
// //         if (json?.success && mounted) {
// //           setWorkspace(json.data);
// //         } else {
// //           console.warn("No default workspace or not authenticated:", json);
// //         }
// //       } catch (err) {
// //         console.error("loadWorkspace error:", err);
// //       }
// //     }
// //     loadWorkspace();
// //     return () => (mounted = false);
// //   }, []);

// //   // load members (for avatar initials etc)
// //   useEffect(() => {
// //     let mounted = true;
// //     async function loadMembers() {
// //       try {
// //         const res = await fetch("/api/user");
// //         if (!res.ok) return;
// //         const json = await res.json();
// //         const raw = json?.success ? json.data || [] : [];
// //         const mapped = raw.map((u) => ({
// //           id: u._id || u.id,
// //           name: u.name || u.firstName || u.email || "User",
// //           initials: (u.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase(),
// //         }));
// //         if (mounted && mapped.length) setMembers(mapped);
// //       } catch (err) {
// //         console.warn("Could not load members, using sample:", err);
// //       }
// //     }
// //     loadMembers();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   /* Load tasks (with optional filters) */
// //   async function loadTasks(f = filter) {
// //     if (!workspace?._id) return; // wait until workspace loaded
// //     setLoading(true);
// //     try {
// //       const params = new URLSearchParams();
// //       if (f.status) params.set("status", f.status);
// //       if (f.priority) params.set("priority", f.priority);
// //       if (f.assignee) params.set("assignee", f.assignee);
// //       if (f.q) params.set("q", f.q);
// //       params.set("workspaceId", workspace._id);

// //       const url = "/api/tasks" + (params.toString() ? `?${params.toString()}` : "");
// //       const res = await fetch(url);
// //       const json = await res.json();
// //       const raw = json?.success ? json.data || [] : [];

// //       const mapped = raw.map((t) => ({
// //         ...t,
// //         id: t._id || t.id,
// //         title: t.title || "",
// //         description: t.description || "",
// //         priority: t.priority || "medium",
// //         status: t.status || "todo",
// //         tags: t.tags || [],
// //         assignees: t.assignees || [],
// //         dueDate: t.dueDate || null,
// //       }));

// //       const cols = columnDefinitions.map((colDef) => ({
// //         ...colDef,
// //         tasks: mapped.filter((t) => t.status === colDef.id),
// //       }));

// //       setColumns(cols);
// //     } catch (err) {
// //       console.error("loadTasks error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   useEffect(() => {
// //     // load tasks when workspace is ready
// //     if (workspace?._id) loadTasks();
// //     function onUpdate() {
// //       loadTasks();
// //     }
// //     window.addEventListener("task-updated", onUpdate);
// //     return () => window.removeEventListener("task-updated", onUpdate);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [workspace]);

// //   /* Drag/drop persistence */
// //   const handleDrop = async (taskId, fromColumnId, toColumnId) => {
// //     setColumns((prev) => {
// //       const newCols = JSON.parse(JSON.stringify(prev));
// //       const from = newCols.find((c) => c.id === fromColumnId);
// //       const to = newCols.find((c) => c.id === toColumnId);
// //       if (!from || !to) return prev;
// //       const idx = from.tasks.findIndex((t) => t.id === taskId);
// //       if (idx === -1) return prev;
// //       const [task] = from.tasks.splice(idx, 1);
// //       task.status = toColumnId;
// //       to.tasks.unshift(task);
// //       return newCols;
// //     });

// //     try {
// //       await fetch("/api/tasks", {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ id: taskId, updates: { status: toColumnId } }),
// //       });
// //     } catch (err) {
// //       console.error("persist status change failed:", err);
// //       loadTasks();
// //     }
// //   };

// //   /* Add task */
// //   async function addTask(e) {
// //     e?.preventDefault();
// //     if (!form.title.trim() || !workspace?._id) return;
// //     try {
// //       await fetch("/api/tasks", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate || null, status: "todo", workspaceId: workspace._id }),
// //       });
// //       setForm({ title: "", description: "", priority: "medium", dueDate: "" });
// //       await loadTasks();
// //     } catch (err) {
// //       console.error("addTask error:", err);
// //     }
// //   }

// //   /* Toggle complete */
// //   async function toggleComplete(task) {
// //     const newStatus = task.status === "completed" ? "todo" : "completed";
// //     try {
// //       await fetch("/api/tasks", {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ id: task.id, updates: { status: newStatus } }),
// //       });
// //       await loadTasks();
// //     } catch (err) {
// //       console.error("toggleComplete error:", err);
// //     }
// //   }

// //   /* Delete task */
// //   async function deleteTask(id) {
// //     try {
// //       await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
// //       await loadTasks();
// //     } catch (err) {
// //       console.error("deleteTask error:", err);
// //     }
// //   }

// //   /* summary numbers */
// //   const totalTasks = columns.reduce((s, c) => s + (c.tasks?.length || 0), 0);
// //   const inProgressCount = columns.find((c) => c.id === "inprogress")?.tasks?.length || 0;
// //   const completedCount = columns.find((c) => c.id === "completed")?.tasks?.length || 0;

// //   return (
// //     <>
// //       <DndProvider backend={HTML5Backend}>
// //         <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
// //           <div className="mb-10">
// //             <div className="flex items-center justify-between mb-6">
// //               <div>
// //                 <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
// //                   {workspace ? workspace.name : "Workspace"}
// //                 </h2>
// //                 <p className="text-gray-600">Track progress and manage team tasks</p>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => setTeamOpen(true)}
// //                   className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
// //                 >
// //                   <Users className="w-4 h-4" /> Team
// //                 </Button>

// //                 <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11">
// //                   <Tag className="w-4 h-4" /> Filter
// //                 </Button>

// //                 <Button onClick={() => document.getElementById("add-task-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl h-11">
// //                   <Plus className="w-4 h-4" /> New Task
// //                 </Button>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-4 gap-5">
// //               {[
// //                 ["Total Tasks", totalTasks],
// //                 ["In Progress", inProgressCount],
// //                 ["Completed", completedCount],
// //                 ["Team Members", members.length],
// //               ].map(([label, num]) => (
// //                 <div key={label} className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md">
// //                   <p className="text-sm text-gray-600 mb-1">{label}</p>
// //                   <p className="text-2xl text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
// //                     {num}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Add Task Form */}
// //           <div id="add-task-form" className="bg-white shadow rounded-xl p-6 mb-8">
// //             <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //               <input className="border rounded p-2" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
// //               <select className="border rounded p-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
// //                 <option value="low">Low</option>
// //                 <option value="medium">Medium</option>
// //                 <option value="high">High</option>
// //               </select>
// //               <input className="border rounded p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
// //               <textarea className="border rounded p-2 col-span-1 md:col-span-4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
// //               <div className="col-span-1 md:col-span-4 flex gap-2">
// //                 <button className="bg-teal-600 text-white px-4 py-2 rounded" type="submit">Add Task</button>
// //                 <button type="button" onClick={() => setForm({ title: "", description: "", priority: "medium", dueDate: "" })} className="px-4 py-2 rounded border">Reset</button>
// //               </div>
// //             </form>
// //           </div>

// //           {/* Kanban Board */}
// //           <div className="flex flex-wrap gap-5 w-full pb-6">
// //             {loading ? <div>Loading tasks...</div> : columns.map((col) => (
// //               <ColumnComponent key={col.id} column={col} onDrop={handleDrop} onToggle={toggleComplete} onDelete={deleteTask} members={members} workspaceId={workspace?._id} />
// //             ))}
// //           </div>

// //           {/* Team modal */}
// //           <TeamModal
// //             open={teamOpen}
// //             onClose={() => setTeamOpen(false)}
// //             workspaceId={workspace?._id} // fixed: use workspace state
// //           />

// //           {/* Filter Modal */}
// //           <FilterModal
// //             open={isFilterOpen}
// //             onClose={() => setIsFilterOpen(false)}
// //             members={members}
// //             onApply={(f) => {
// //               setFilter(f);
// //               loadTasks(f);
// //             }}
// //             initial={filter}
// //           />
// //         </div>
// //       </DndProvider>
// //     </>
// //   );
// // }


// // src/app/(dashboard)/workspace/page.js
// "use client";

// import { useEffect, useState } from "react";
// import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// import AssignModal from "@/components/AssignModal";
// import EditTaskModal from "@/components/EditTaskModal";
// import FilterModal from "@/components/FilterModal";
// import TeamModal from "@/components/TeamModal";
// // import WorkspaceSwitcher from "@/app/components/WorkspaceSwitcher";

// import Sidebar from "@/components/Sidebar";

// /* Column definitions */
// const columnDefinitions = [
//   { id: "todo", title: "To Do" },
//   { id: "inprogress", title: "In Progress" },
//   { id: "review", title: "Review" },
//   { id: "completed", title: "Done" },
// ];

// const priorityBadgeClasses = {
//   low: "bg-gray-100 text-gray-600 border border-gray-200",
//   medium: "bg-amber-100 text-amber-700 border border-amber-200",
//   high: "bg-red-100 text-red-700 border border-red-200",
// };

// /* TaskCard — now accepts members prop and shows initials for assignees */
// function TaskCard({ task, columnId, onToggle, onDelete, members = [], workspaceId }) {
//   const [{ isDragging }, drag] = useDrag(
//     () => ({
//       type: "TASK",
//       item: { id: task.id, fromColumn: columnId },
//       collect: (monitor) => ({ isDragging: monitor.isDragging() }),
//     }),
//     [task, columnId]
//   );

//   const [openAssign, setOpenAssign] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);

//   return (
//     <>
//       <div
//         ref={drag}
//         className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${
//           isDragging ? "opacity-50" : ""
//         }`}
//       >
//         <div className="flex items-start justify-between mb-3">
//           <h4
//             className={`text-sm text-gray-900 font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""
//               }`}
//           >
//             {task.title}
//           </h4>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setOpenEdit(true)}
//               className="text-gray-400 hover:text-gray-600"
//               title="Edit"
//             >
//               <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
//             </button>
//             <button
//               onClick={() => setOpenAssign(true)}
//               className="text-gray-400 hover:text-teal-600"
//               title="Assign"
//             >
//               <Users className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         <p className="text-sm text-gray-600 mb-4 leading-relaxed">{task.description}</p>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {(task.tags || []).map((tag) => (
//             <Badge key={tag} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
//               {tag}
//             </Badge>
//           ))}
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span
//               className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${
//                 priorityBadgeClasses[task.priority || "medium"]
//               }`}
//             >
//               {task.priority || "medium"}
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1.5 text-xs text-gray-500">
//               <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
//               {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
//             </div>
//             <div className="flex -space-x-2">
//               {(task.assignees || []).map((assigneeId) => {
//                 // find member record safely
//                 const m = members.find(
//                   (x) =>
//                     String(x.id) === String(assigneeId) ||
//                     String(x._id) === String(assigneeId) ||
//                     String(x.id) === String(assigneeId?._id)
//                 );

//                 // compute initials from member name/email — fallback to "?" not raw id
//                 let initials = "?";
//                 if (m && m.name) {
//                   initials = m.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
//                 } else if (m && m.email) {
//                   initials = m.email.split("@")[0].slice(0, 2).toUpperCase();
//                 } else if (typeof assigneeId === "string" && assigneeId.includes("@")) {
//                   initials = assigneeId.split("@")[0].slice(0, 2).toUpperCase();
//                 } else {
//                   initials = "?";
//                 }

//                 const title = m ? (m.name || m.email) : String(assigneeId);
//                 return (
//                   <div
//                     key={String(assigneeId)}
//                     className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
//                     title={title}
//                   >
//                     {initials}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="mt-3 flex gap-3 justify-end">
//           <button onClick={() => onToggle(task)} className="text-sm text-teal-600">
//             {task.status === "completed" ? "Undo" : "Complete"}
//           </button>
//           <button
//             onClick={() => {
//               if (confirm("Delete this task?")) onDelete(task.id);
//             }}
//             className="text-sm text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       <AssignModal
//         open={openAssign}
//         onClose={() => setOpenAssign(false)}
//         task={task}
//         workspaceId={workspaceId}
//         onAssigned={(updated) => {
//           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
//         }}
//       />

//       <EditTaskModal
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         task={task}
//         onSaved={(updated) => {
//           window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }));
//         }}
//       />
//     </>
//   );
// }

// /* Column component (passes members down) */
// function ColumnComponent({ column, onDrop, onToggle, onDelete, members, workspaceId }) {
//   const [{ isOver }, drop] = useDrop(
//     () => ({
//       accept: "TASK",
//       drop: (item) => {
//         if (item.fromColumn !== column.id) {
//           onDrop(item.id, item.fromColumn, column.id);
//         }
//       },
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//     }),
//     [column]
//   );

//   return (
//     <div
//       ref={drop}
//       className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${isOver ? "bg-teal-50/50" : "bg-white/40"
//         } rounded-2xl p-5 backdrop-blur-sm border border-white/50`}
//     >
//       <div className="flex items-center justify-between mb-5">
//         <div className="flex items-center gap-3">
//           <h3 className="text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
//             {column.title}
//           </h3>
//           <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
//             {(column.tasks || []).length}
//           </Badge>
//         </div>
//         <button className="text-gray-400 hover:text-teal-600 transition-colors p-1 hover:bg-white/60 rounded-lg">
//           <Plus className="w-4 h-4" strokeWidth={2} />
//         </button>
//       </div>

//       <div className="space-y-4">
//         {(column.tasks || []).map((task) => (
//           <TaskCard key={task.id} task={task} columnId={column.id} onToggle={onToggle} onDelete={onDelete} members={members} workspaceId={workspaceId} />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* Main WorkspacePage */
// export default function WorkspacePage() {
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });
//   const [filter, setFilter] = useState({});
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [teamOpen, setTeamOpen] = useState(false);

//   // members fetched from API (fallback to sample)
//   const [members, setMembers] = useState([
//     { id: "SC", name: "Sarah Chen", initials: "SC" },
//     { id: "MR", name: "Michael Ross", initials: "MR" },
//     { id: "EW", name: "Emma Wilson", initials: "EW" },
//     { id: "JM", name: "James Miller", initials: "JM" },
//   ]);

//   // workspace state
//   const [workspace, setWorkspace] = useState(null);
//   const [workspaceLoading, setWorkspaceLoading] = useState(false);

//   async function handleSwitchWorkspace(id) {
//     if (!id) return;
//     try {
//       setWorkspaceLoading(true);
//       const res = await fetch(`/api/workspaces/${id}`);
//       const json = await res.json();
//       if (json.success) {
//         setWorkspace(json.data);
//         // after setting workspace, load tasks for it
//         await loadTasks(); // ensure loadTasks uses workspace._id
//       } else {
//         console.error("Failed to load workspace:", json.error);
//       }
//     } catch (err) {
//       console.error("handleSwitchWorkspace error:", err);
//     } finally {
//       setWorkspaceLoading(false);
//     }
//   }

//   // initial workspace load — pick first available workspace
//   useEffect(() => {
//     let mounted = true;
//     async function init() {
//       try {
//         const res = await fetch("/api/workspaces");
//         const json = await res.json();
//         if (!mounted) return;
//         if (json.success && json.data && json.data.length) {
//           // pick first workspace by default
//           const first = json.data[0];
//           const detailsRes = await fetch(`/api/workspaces/${first._id}`);
//           const detailsJson = await detailsRes.json();
//           if (detailsJson.success) {
//             setWorkspace(detailsJson.data);
//           } else {
//             setWorkspace(null);
//           }
//         } else {
//           setWorkspace(null);
//         }
//       } catch (err) {
//         console.error("init workspace error:", err);
//         setWorkspace(null);
//       }
//     }
//     init();
//     return () => (mounted = false);
//   }, []);

//   // load members (for avatar initials etc)
//   useEffect(() => {
//     let mounted = true;
//     async function loadMembers() {
//       try {
//         const res = await fetch("/api/user");
//         if (!res.ok) return;
//         const json = await res.json();
//         const raw = json?.success ? json.data || [] : [];
//         const mapped = raw.map((u) => ({
//           id: u._id || u.id,
//           name: u.name || u.firstName || u.email || "User",
//           initials: (u.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase(),
//         }));
//         if (mounted && mapped.length) setMembers(mapped);
//       } catch (err) {
//         console.warn("Could not load members, using sample:", err);
//       }
//     }
//     loadMembers();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* Load tasks (with optional filters) */
//   async function loadTasks(f = filter) {
//     if (!workspace?._id) return; // wait until workspace loaded
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (f.status) params.set("status", f.status);
//       if (f.priority) params.set("priority", f.priority);
//       if (f.assignee) params.set("assignee", f.assignee);
//       if (f.q) params.set("q", f.q);
//       params.set("workspaceId", workspace._id);

//       const url = "/api/tasks" + (params.toString() ? `?${params.toString()}` : "");
//       const res = await fetch(url);
//       const json = await res.json();
//       const raw = json?.success ? json.data || [] : [];

//       const mapped = raw.map((t) => ({
//         ...t,
//         id: t._id || t.id,
//         title: t.title || "",
//         description: t.description || "",
//         priority: t.priority || "medium",
//         status: t.status || "todo",
//         tags: t.tags || [],
//         assignees: t.assignees || [],
//         dueDate: t.dueDate || null,
//       }));

//       const cols = columnDefinitions.map((colDef) => ({
//         ...colDef,
//         tasks: mapped.filter((t) => t.status === colDef.id),
//       }));

//       setColumns(cols);
//     } catch (err) {
//       console.error("loadTasks error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     // load tasks when workspace is ready
//     if (workspace?._id) loadTasks();
//     function onUpdate() {
//       loadTasks();
//     }
//     window.addEventListener("task-updated", onUpdate);
//     return () => window.removeEventListener("task-updated", onUpdate);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [workspace]);

//   /* Drag/drop persistence */
//   const handleDrop = async (taskId, fromColumnId, toColumnId) => {
//     setColumns((prev) => {
//       const newCols = JSON.parse(JSON.stringify(prev));
//       const from = newCols.find((c) => c.id === fromColumnId);
//       const to = newCols.find((c) => c.id === toColumnId);
//       if (!from || !to) return prev;
//       const idx = from.tasks.findIndex((t) => t.id === taskId);
//       if (idx === -1) return prev;
//       const [task] = from.tasks.splice(idx, 1);
//       task.status = toColumnId;
//       to.tasks.unshift(task);
//       return newCols;
//     });

//     try {
//       await fetch("/api/tasks", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: taskId, updates: { status: toColumnId } }),
//       });
//     } catch (err) {
//       console.error("persist status change failed:", err);
//       loadTasks();
//     }
//   };

//   /* Add task */
//   async function addTask(e) {
//     e?.preventDefault();
//     if (!form.title.trim() || !workspace?._id) return;
//     try {
//       await fetch("/api/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate || null, status: "todo", workspaceId: workspace._id }),
//       });
//       setForm({ title: "", description: "", priority: "medium", dueDate: "" });
//       await loadTasks();
//     } catch (err) {
//       console.error("addTask error:", err);
//     }
//   }

//   /* Toggle complete */
//   async function toggleComplete(task) {
//     const newStatus = task.status === "completed" ? "todo" : "completed";
//     try {
//       await fetch("/api/tasks", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: task.id, updates: { status: newStatus } }),
//       });
//       await loadTasks();
//     } catch (err) {
//       console.error("toggleComplete error:", err);
//     }
//   }

//   /* Delete task */
//   async function deleteTask(id) {
//     try {
//       await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
//       await loadTasks();
//     } catch (err) {
//       console.error("deleteTask error:", err);
//     }
//   }

//   /* summary numbers */
//   const totalTasks = columns.reduce((s, c) => s + (c.tasks?.length || 0), 0);
//   const inProgressCount = columns.find((c) => c.id === "inprogress")?.tasks?.length || 0;
//   const completedCount = columns.find((c) => c.id === "completed")?.tasks?.length || 0;

//   return (
//     <>
//       <DndProvider backend={HTML5Backend}>
//         <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
//           <div className="mb-10">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
//                   {workspace ? workspace.name : "Workspace"}
//                 </h2>
//                 <p className="text-gray-600">Track progress and manage team tasks</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 {/* <WorkspaceSwitcher currentWorkspaceId={workspace?._id} onSelect={handleSwitchWorkspace} /> */}

//                 <Button
//                   variant="outline"
//                   onClick={() => setTeamOpen(true)}
//                   className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
//                 >
//                   <Users className="w-4 h-4" /> Team
//                 </Button>

//                 <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11">
//                   <Tag className="w-4 h-4" /> Filter
//                 </Button>

//                 <Button onClick={() => document.getElementById("add-task-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl h-11">
//                   <Plus className="w-4 h-4" /> New Task
//                 </Button>
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-5">
//               {[
//                 ["Total Tasks", totalTasks],
//                 ["In Progress", inProgressCount],
//                 ["Completed", completedCount],
//                 ["Team Members", members.length],
//               ].map(([label, num]) => (
//                 <div key={label} className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md">
//                   <p className="text-sm text-gray-600 mb-1">{label}</p>
//                   <p className="text-2xl text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
//                     {num}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Add Task Form */}
//           <div id="add-task-form" className="bg-white shadow rounded-xl p-6 mb-8">
//             <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <input className="border rounded p-2" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//               <select className="border rounded p-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//               <input className="border rounded p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
//               <textarea className="border rounded p-2 col-span-1 md:col-span-4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//               <div className="col-span-1 md:col-span-4 flex gap-2">
//                 <button className="bg-teal-600 text-white px-4 py-2 rounded" type="submit">Add Task</button>
//                 <button type="button" onClick={() => setForm({ title: "", description: "", priority: "medium", dueDate: "" })} className="px-4 py-2 rounded border">Reset</button>
//               </div>
//             </form>
//           </div>

//           {/* Kanban Board */}
//           <div className="flex flex-wrap gap-5 w-full pb-6">
//             {loading ? <div>Loading tasks...</div> : columns.map((col) => (
//               <ColumnComponent key={col.id} column={col} onDrop={handleDrop} onToggle={toggleComplete} onDelete={deleteTask} members={members} workspaceId={workspace?._id} />
//             ))}
//           </div>

//           {/* Team modal */}
//           <TeamModal
//             open={teamOpen}
//             onClose={() => setTeamOpen(false)}
//             workspaceId={workspace?._id}
//           />

//           {/* Filter Modal */}
//           <FilterModal
//             open={isFilterOpen}
//             onClose={() => setIsFilterOpen(false)}
//             members={members}
//             onApply={(f) => {
//               setFilter(f);
//               loadTasks(f);
//             }}
//             initial={filter}
//           />
//         </div>
//       </DndProvider>
//     </>
//   );
// }

// // src/app/(dashboard)/workspace/page.jsx
// // FINAL CLEAN VERSION - Replace your entire workspace page with this
// // "use client";

// // import { useEffect, useState } from "react";
// // import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { DndProvider, useDrag, useDrop } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";

// // import AssignModal from "@/components/AssignModal";
// // import EditTaskModal from "@/components/EditTaskModal";
// // import FilterModal from "@/components/FilterModal";
// // import TeamModal from "@/components/TeamModal";

// // const columnDefinitions = [
// //   { id: "todo", title: "To Do" },
// //   { id: "inprogress", title: "In Progress" },
// //   { id: "review", title: "Review" },
// //   { id: "completed", title: "Done" },
// // ];

// // const priorityBadgeClasses = {
// //   low: "bg-gray-100 text-gray-600 border border-gray-200",
// //   medium: "bg-amber-100 text-amber-700 border border-amber-200",
// //   high: "bg-red-100 text-red-700 border border-red-200",
// // };

// // function TaskCard({ task, columnId, onToggle, onDelete, workspaceId }) {
// //   const [{ isDragging }, drag] = useDrag(
// //     () => ({
// //       type: "TASK",
// //       item: { id: task.id, fromColumn: columnId },
// //       collect: (monitor) => ({ isDragging: monitor.isDragging() }),
// //     }),
// //     [task, columnId]
// //   );

// //   const [openAssign, setOpenAssign] = useState(false);
// //   const [openEdit, setOpenEdit] = useState(false);

// //   return (
// //     <>
// //       <div
// //         ref={drag}
// //         className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${
// //           isDragging ? "opacity-50" : ""
// //         }`}
// //       >
// //         <div className="flex items-start justify-between mb-3">
// //           <h4
// //             className={`text-sm text-gray-900 font-medium ${
// //               task.status === "completed" ? "line-through text-gray-400" : ""
// //             }`}
// //           >
// //             {task.title}
// //           </h4>

// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={() => setOpenEdit(true)}
// //               className="text-gray-400 hover:text-gray-600"
// //               title="Edit"
// //             >
// //               <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
// //             </button>
// //             <button
// //               onClick={() => setOpenAssign(true)}
// //               className="text-gray-400 hover:text-teal-600"
// //               title="Assign"
// //             >
// //               <Users className="w-4 h-4" />
// //             </button>
// //           </div>
// //         </div>

// //         <p className="text-sm text-gray-600 mb-4 leading-relaxed">
// //           {task.description}
// //         </p>

// //         <div className="flex flex-wrap gap-2 mb-4">
// //           {(task.tags || []).map((tag) => (
// //             <Badge
// //               key={tag}
// //               variant="secondary"
// //               className="text-xs bg-teal-50 text-teal-700"
// //             >
// //               {tag}
// //             </Badge>
// //           ))}
// //         </div>

// //         <div className="flex items-center justify-between">
// //           <span
// //             className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${
// //               priorityBadgeClasses[task.priority || "medium"]
// //             }`}
// //           >
// //             {task.priority || "medium"}
// //           </span>

// //           <div className="flex items-center gap-3">
// //             <div className="flex items-center gap-1.5 text-xs text-gray-500">
// //               <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
// //               {task.dueDate
// //                 ? new Date(task.dueDate).toLocaleDateString()
// //                 : "No date"}
// //             </div>
// //             {task.assignees && task.assignees.length > 0 && (
// //               <div className="flex -space-x-2">
// //                 {task.assignees.slice(0, 3).map((_, idx) => (
// //                   <div
// //                     key={idx}
// //                     className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
// //                   >
// //                     {idx + 1}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="mt-3 flex gap-3 justify-end">
// //           <button onClick={() => onToggle(task)} className="text-sm text-teal-600">
// //             {task.status === "completed" ? "Undo" : "Complete"}
// //           </button>
// //           <button
// //             onClick={() => {
// //               if (confirm("Delete this task?")) onDelete(task.id);
// //             }}
// //             className="text-sm text-red-600"
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </div>

// //       <AssignModal
// //         open={openAssign}
// //         onClose={() => setOpenAssign(false)}
// //         task={task}
// //         workspaceId={workspaceId}
// //         onAssigned={() => {
// //           window.dispatchEvent(new Event("task-updated"));
// //         }}
// //       />

// //       <EditTaskModal
// //         open={openEdit}
// //         onClose={() => setOpenEdit(false)}
// //         task={task}
// //         onSaved={() => {
// //           window.dispatchEvent(new Event("task-updated"));
// //         }}
// //       />
// //     </>
// //   );
// // }

// // function ColumnComponent({ column, onDrop, onToggle, onDelete, workspaceId }) {
// //   const [{ isOver }, drop] = useDrop(
// //     () => ({
// //       accept: "TASK",
// //       drop: (item) => {
// //         if (item.fromColumn !== column.id) {
// //           onDrop(item.id, item.fromColumn, column.id);
// //         }
// //       },
// //       collect: (monitor) => ({ isOver: monitor.isOver() }),
// //     }),
// //     [column]
// //   );

// //   return (
// //     <div
// //       ref={drop}
// //       className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${
// //         isOver ? "bg-teal-50/50" : "bg-white/40"
// //       } rounded-2xl p-5 backdrop-blur-sm border border-white/50`}
// //     >
// //       <div className="flex items-center justify-between mb-5">
// //         <div className="flex items-center gap-3">
// //           <h3
// //             className="text-gray-900"
// //             style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
// //           >
// //             {column.title}
// //           </h3>
// //           <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
// //             {(column.tasks || []).length}
// //           </Badge>
// //         </div>
// //       </div>

// //       <div className="space-y-4">
// //         {(column.tasks || []).map((task) => (
// //           <TaskCard
// //             key={task.id}
// //             task={task}
// //             columnId={column.id}
// //             onToggle={onToggle}
// //             onDelete={onDelete}
// //             workspaceId={workspaceId}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default function WorkspacePage() {
// //   const [columns, setColumns] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [workspace, setWorkspace] = useState(null);
// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     priority: "medium",
// //     dueDate: "",
// //   });
// //   const [filter, setFilter] = useState({});
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [teamOpen, setTeamOpen] = useState(false);

// //   // Load default workspace
// //   useEffect(() => {
// //     async function loadWorkspace() {
// //       try {
// //         const res = await fetch("/api/workspaces/default");
// //         const json = await res.json();
// //         if (json.success) {
// //           setWorkspace(json.data);
// //         }
// //       } catch (err) {
// //         console.error("Failed to load workspace:", err);
// //       }
// //     }
// //     loadWorkspace();
// //   }, []);

// //   // Load tasks when workspace changes
// //   useEffect(() => {
// //     if (workspace?._id) {
// //       loadTasks();
// //     }

// //     function onUpdate() {
// //       if (workspace?._id) loadTasks();
// //     }
// //     window.addEventListener("task-updated", onUpdate);
// //     return () => window.removeEventListener("task-updated", onUpdate);
// //   }, [workspace]);

// //   async function loadTasks(f = filter) {
// //     if (!workspace?._id) return;

// //     setLoading(true);
// //     try {
// //       const params = new URLSearchParams();
// //       params.set("workspaceId", workspace._id);
// //       if (f.status) params.set("status", f.status);
// //       if (f.priority) params.set("priority", f.priority);
// //       if (f.q) params.set("q", f.q);

// //       const res = await fetch(`/api/tasks?${params.toString()}`);
// //       const json = await res.json();

// //       if (json.success) {
// //         const tasks = (json.data || []).map((t) => ({
// //           ...t,
// //           id: t._id,
// //         }));

// //         const cols = columnDefinitions.map((colDef) => ({
// //           ...colDef,
// //           tasks: tasks.filter((t) => t.status === colDef.id),
// //         }));

// //         setColumns(cols);
// //       }
// //     } catch (err) {
// //       console.error("Failed to load tasks:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   async function handleDrop(taskId, fromColumnId, toColumnId) {
// //     // Optimistic update
// //     setColumns((prev) => {
// //       const newCols = JSON.parse(JSON.stringify(prev));
// //       const from = newCols.find((c) => c.id === fromColumnId);
// //       const to = newCols.find((c) => c.id === toColumnId);
// //       if (!from || !to) return prev;

// //       const idx = from.tasks.findIndex((t) => t.id === taskId);
// //       if (idx === -1) return prev;

// //       const [task] = from.tasks.splice(idx, 1);
// //       task.status = toColumnId;
// //       to.tasks.unshift(task);
// //       return newCols;
// //     });

// //     // Persist to server
// //     try {
// //       await fetch("/api/tasks", {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ id: taskId, updates: { status: toColumnId } }),
// //       });
// //     } catch (err) {
// //       console.error("Failed to update task status:", err);
// //       loadTasks(); // Revert on error
// //     }
// //   }

// //   async function addTask(e) {
// //     e.preventDefault();
// //     if (!form.title.trim() || !workspace?._id) return;

// //     try {
// //       const res = await fetch("/api/tasks", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           ...form,
// //           workspaceId: workspace._id,
// //           status: "todo",
// //         }),
// //       });

// //       if (res.ok) {
// //         setForm({ title: "", description: "", priority: "medium", dueDate: "" });
// //         loadTasks();
// //       }
// //     } catch (err) {
// //       console.error("Failed to add task:", err);
// //     }
// //   }

// //   async function toggleComplete(task) {
// //     const newStatus = task.status === "completed" ? "todo" : "completed";
// //     try {
// //       await fetch("/api/tasks", {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ id: task.id, updates: { status: newStatus } }),
// //       });
// //       loadTasks();
// //     } catch (err) {
// //       console.error("Failed to toggle task:", err);
// //     }
// //   }

// //   async function deleteTask(id) {
// //     try {
// //       await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
// //       loadTasks();
// //     } catch (err) {
// //       console.error("Failed to delete task:", err);
// //     }
// //   }

// //   const totalTasks = columns.reduce((s, c) => s + (c.tasks?.length || 0), 0);
// //   const inProgressCount =
// //     columns.find((c) => c.id === "inprogress")?.tasks?.length || 0;
// //   const completedCount =
// //     columns.find((c) => c.id === "completed")?.tasks?.length || 0;

// //   if (!workspace) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <p className="text-gray-600">Loading workspace...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
// //         <div className="mb-10">
// //           <div className="flex items-center justify-between mb-6">
// //             <div>
// //               <h2
// //                 className="text-3xl text-gray-900 mb-2"
// //                 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
// //               >
// //                 {workspace.name}
// //               </h2>
// //               <p className="text-gray-600">Track progress and manage team tasks</p>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setTeamOpen(true)}
// //                 className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
// //               >
// //                 <Users className="w-4 h-4" /> Team
// //               </Button>

// //               <Button
// //                 variant="outline"
// //                 onClick={() => setIsFilterOpen(true)}
// //                 className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
// //               >
// //                 <Tag className="w-4 h-4" /> Filter
// //               </Button>

// //               <Button
// //                 onClick={() =>
// //                   document
// //                     .getElementById("add-task-form")
// //                     ?.scrollIntoView({ behavior: "smooth" })
// //                 }
// //                 className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl h-11"
// //               >
// //                 <Plus className="w-4 h-4" /> New Task
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-4 gap-5">
// //             {[
// //               ["Total Tasks", totalTasks],
// //               ["In Progress", inProgressCount],
// //               ["Completed", completedCount],
// //               ["Team Members", 1],
// //             ].map(([label, num]) => (
// //               <div
// //                 key={label}
// //                 className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md"
// //               >
// //                 <p className="text-sm text-gray-600 mb-1">{label}</p>
// //                 <p
// //                   className="text-2xl text-gray-900"
// //                   style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
// //                 >
// //                   {num}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div id="add-task-form" className="bg-white shadow rounded-xl p-6 mb-8">
// //           <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //             <input
// //               className="border rounded p-2"
// //               placeholder="Task title"
// //               value={form.title}
// //               onChange={(e) => setForm({ ...form, title: e.target.value })}
// //             />
// //             <select
// //               className="border rounded p-2"
// //               value={form.priority}
// //               onChange={(e) => setForm({ ...form, priority: e.target.value })}
// //             >
// //               <option value="low">Low</option>
// //               <option value="medium">Medium</option>
// //               <option value="high">High</option>
// //             </select>
// //             <input
// //               className="border rounded p-2"
// //               type="date"
// //               value={form.dueDate}
// //               onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
// //             />
// //             <textarea
// //               className="border rounded p-2 col-span-1 md:col-span-4"
// //               placeholder="Description"
// //               value={form.description}
// //               onChange={(e) => setForm({ ...form, description: e.target.value })}
// //             />
// //             <div className="col-span-1 md:col-span-4 flex gap-2">
// //               <button
// //                 className="bg-teal-600 text-white px-4 py-2 rounded"
// //                 type="submit"
// //               >
// //                 Add Task
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setForm({ title: "", description: "", priority: "medium", dueDate: "" })
// //                 }
// //                 className="px-4 py-2 rounded border"
// //               >
// //                 Reset
// //               </button>
// //             </div>
// //           </form>
// //         </div>

// //         <div className="flex flex-wrap gap-5 w-full pb-6">
// //           {loading ? (
// //             <div>Loading tasks...</div>
// //           ) : (
// //             columns.map((col) => (
// //               <ColumnComponent
// //                 key={col.id}
// //                 column={col}
// //                 onDrop={handleDrop}
// //                 onToggle={toggleComplete}
// //                 onDelete={deleteTask}
// //                 workspaceId={workspace._id}
// //               />
// //             ))
// //           )}
// //         </div>

// //         <TeamModal
// //           open={teamOpen}
// //           onClose={() => setTeamOpen(false)}
// //           workspaceId={workspace._id}
// //         />

// //         <FilterModal
// //           open={isFilterOpen}
// //           onClose={() => setIsFilterOpen(false)}
// //           members={[]}
// //           onApply={(f) => {
// //             setFilter(f);
// //             loadTasks(f);
// //           }}
// //           initial={filter}
// //         />
// //       </div>
// //     </DndProvider>
// //   );
// // }


// src/app/(dashboard)/workspace/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AssignModal from "@/components/AssignModal";
import EditTaskModal from "@/components/EditTaskModal";
import FilterModal from "@/components/FilterModal";
import TeamModal from "@/components/TeamModal";

const columnDefinitions = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "completed", title: "Done" },
];

const priorityBadgeClasses = {
  low: "bg-gray-100 text-gray-600 border border-gray-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  high: "bg-red-100 text-red-700 border border-red-200",
};

/* ------- small helper for robust fetches ------- */
async function safeFetchJson(url, opts = {}) {
  try {
    // include credentials by default (so cookie-based auth will work)
    const merged = { credentials: "include", ...opts };
    const res = await fetch(url, merged);
    if (!res.ok) {
      // try to read a string body for debugging
      let body;
      try { body = await res.text(); } catch (_) { body = null; }
      console.warn(`safeFetchJson non-ok ${res.status} ${url}`, body);
      return { ok: false, status: res.status, statusText: res.statusText, body };
    }
    const json = await res.json();
    return { ok: true, data: json };
  } catch (err) {
    console.error("safeFetchJson error", url, err);
    return { ok: false, error: err };
  }
}

/* ------- TaskCard ------- */
function TaskCard({ task, columnId, onToggle, onDelete, members = [], workspaceId }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TASK",
      item: { id: task.id, fromColumn: columnId },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [task, columnId]
  );

  const [openAssign, setOpenAssign] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // helper to render initials safely
  const renderInitials = (assigneeId) => {
    const m = members.find((x) => String(x.id) === String(assigneeId) || String(x._id) === String(assigneeId));
    if (m && m.name) return m.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
    if (typeof assigneeId === "string" && assigneeId.includes("@")) return assigneeId.split("@")[0].slice(0, 2).toUpperCase();
    return "??";
  };

  return (
    <>
      <div
        ref={drag}
        className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <h4 className={`text-sm text-gray-900 font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={() => setOpenEdit(true)} className="text-gray-400 hover:text-gray-600" title="Edit">
              <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button onClick={() => setOpenAssign(true)} className="text-gray-400 hover:text-teal-600" title="Assign">
              <Users className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{task.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {(task.tags || []).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${priorityBadgeClasses[task.priority || "medium"]}`}>
            {task.priority || "medium"}
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
            </div>
            <div className="flex -space-x-2">
              {(task.assignees || []).map((a) => (
                <div
                  key={String(a)}
                  className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
                  title={String(a)}
                >
                  {renderInitials(a)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-3 justify-end">
          <button onClick={() => onToggle(task)} className="text-sm text-teal-600">
            {task.status === "completed" ? "Undo" : "Complete"}
          </button>
          <button
            onClick={() => {
              if (confirm("Delete this task?")) onDelete(task.id);
            }}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <AssignModal
        open={openAssign}
        onClose={() => setOpenAssign(false)}
        task={task}
        workspaceId={workspaceId}
        onAssigned={(updated) => window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }))}
      />

      <EditTaskModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        task={task}
        onSaved={(updated) => window.dispatchEvent(new CustomEvent("task-updated", { detail: updated }))}
      />
    </>
  );
}

/* ------- ColumnComponent ------- */
function ColumnComponent({ column, onDrop, onToggle, onDelete, members, workspaceId }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "TASK",
      drop: (item) => {
        if (item.fromColumn !== column.id) onDrop(item.id, item.fromColumn, column.id);
      },
      collect: (monitor) => ({ isOver: monitor.isOver() }),
    }),
    [column]
  );

  return (
    <div ref={drop} className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${isOver ? "bg-teal-50/50" : "bg-white/40"} rounded-2xl p-5 backdrop-blur-sm border border-white/50`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 className="text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
            {column.title}
          </h3>
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
            {(column.tasks || []).length}
          </Badge>
        </div>
        <button className="text-gray-400 hover:text-teal-600 transition-colors p-1 hover:bg-white/60 rounded-lg">
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-4">
        {(column.tasks || []).map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} onToggle={onToggle} onDelete={onDelete} members={members} workspaceId={workspaceId} />
        ))}
      </div>
    </div>
  );
}

/* ------- MAIN Page ------- */
export default function WorkspacePage() {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });
  const [filter, setFilter] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);

  /* -------- init: fetch workspaces, pick first if any -------- */
  useEffect(() => {
    let mounted = true;
    async function init() {
      const r = await safeFetchJson("/api/workspaces");
      if (!mounted) return;
      if (!r.ok) {
        console.warn("Could not fetch workspaces", r);
        setWorkspace(null);
        return;
      }
      const list = r.data?.data || r.data || [];
      if (!list.length) {
        setWorkspace(null);
        return;
      }
      const first = list[0];
      // attempt to fetch details for first workspace
      const d = await safeFetchJson(`/api/workspaces/${first._id || first.id}`);
      if (d.ok && d.data?.data) setWorkspace(d.data.data);
      else setWorkspace(first);
    }
    init();
    return () => (mounted = false);
  }, []);

  /* -------- load members (for initials) -------- */
  /* -------- load members (for initials) -------- */
useEffect(() => {
  let mounted = true;
  async function loadMembers() {
    try {
      // try singular endpoint first
      const r = await safeFetchJson("/api/user");
      if (!mounted) return;

      let raw;

      // if singular failed, try plural fallback
      if (!r.ok) {
        const r2 = await safeFetchJson("/api/users");
        if (!mounted) return;
        if (!r2.ok) {
          console.warn("loadMembers: both /api/user and /api/users failed", r, r2);
          setMembers([]);
          return;
        }
        raw = r2.data?.data ?? r2.data ?? r2;
      } else {
        raw = r.data?.data ?? r.data ?? r;
      }

      // if server returned HTML (Next 404 page) it'll be a string — bail safely
      if (typeof raw === "string") {
        console.warn("loadMembers: server returned a string (probably HTML). Ignoring.", raw.slice(0, 300));
        raw = [];
      }

      // normalize single object -> array, null -> []
      if (!Array.isArray(raw)) {
        if (raw == null) raw = [];
        else raw = [raw];
      }

      const mapped = raw.map((u) => ({
        id: u?._id ?? u?.id ?? u?.email ?? Math.random().toString(36).slice(2),
        name: u?.name ?? u?.email ?? "Unknown",
        email: u?.email ?? null,
      }));

      if (mounted) setMembers(mapped);
    } catch (err) {
      console.error("loadMembers error:", err);
      if (mounted) setMembers([]);
    }
  }
  loadMembers();
  return () => (mounted = false);
}, []);


  /* -------- loadTasks (requires workspace._id) -------- */
  async function loadTasks(f = filter) {
    if (!workspace?._id) {
      setColumns(columnDefinitions.map((c) => ({ ...c, tasks: [] })));
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("workspaceId", workspace._id);
      if (f.status) params.set("status", f.status);
      if (f.priority) params.set("priority", f.priority);
      if (f.assignee) params.set("assignee", f.assignee);
      if (f.q) params.set("q", f.q);

      const r = await safeFetchJson(`/api/tasks?${params.toString()}`);
      if (!r.ok) {
        setColumns(columnDefinitions.map((c) => ({ ...c, tasks: [] })));
        return;
      }
      const raw = r.data?.data || r.data || [];
      const mapped = raw.map((t) => ({
        ...t,
        id: t._id || t.id,
        title: t.title || "",
        description: t.description || "",
        priority: t.priority || "medium",
        status: t.status || "todo",
        tags: t.tags || [],
        assignees: t.assignees || [],
        dueDate: t.dueDate || null,
      }));
      const cols = columnDefinitions.map((colDef) => ({ ...colDef, tasks: mapped.filter((t) => t.status === colDef.id) }));
      setColumns(cols);
    } catch (err) {
      console.error("loadTasks error", err);
    } finally {
      setLoading(false);
    }
  }

  /* reload tasks when workspace changes */
  useEffect(() => {
    if (workspace?._id) loadTasks();
    function onUpdate() {
      if (workspace?._id) loadTasks();
    }
    window.addEventListener("task-updated", onUpdate);
    return () => window.removeEventListener("task-updated", onUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

  /* -------- drag/drop persistence -------- */
  const handleDrop = async (taskId, fromColumnId, toColumnId) => {
    // optimistic UI update
    setColumns((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const from = next.find((c) => c.id === fromColumnId);
      const to = next.find((c) => c.id === toColumnId);
      if (!from || !to) return prev;
      const idx = from.tasks.findIndex((t) => t.id === taskId);
      if (idx === -1) return prev;
      const [task] = from.tasks.splice(idx, 1);
      task.status = toColumnId;
      to.tasks.unshift(task);
      return next;
    });

    // persist
    try {
      await safeFetchJson("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, updates: { status: toColumnId } }),
      });
    } catch (err) {
      console.error("persist status change failed:", err);
      loadTasks();
    }
  };

  /* -------- add / toggle / delete -------- */
  async function addTask(e) {
    e?.preventDefault();
    if (!form.title.trim() || !workspace?._id) return;
    try {
      await safeFetchJson("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate || null, status: "todo", workspaceId: workspace._id }),
      });
      setForm({ title: "", description: "", priority: "medium", dueDate: "" });
      loadTasks();
    } catch (err) {
      console.error("addTask error:", err);
    }
  }

  async function toggleComplete(task) {
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await safeFetchJson("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, updates: { status: newStatus } }),
      });
      loadTasks();
    } catch (err) {
      console.error("toggleComplete error:", err);
    }
  }

  async function deleteTask(id) {
    try {
      await safeFetchJson(`/api/tasks?id=${id}`, { method: "DELETE" });
      loadTasks();
    } catch (err) {
      console.error("deleteTask error:", err);
    }
  }

  const totalTasks = columns.reduce((s, c) => s + (c.tasks?.length || 0), 0);
  const inProgressCount = columns.find((c) => c.id === "inprogress")?.tasks?.length || 0;
  const completedCount = columns.find((c) => c.id === "completed")?.tasks?.length || 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
                {workspace ? workspace.name : "Workspace"}
              </h2>
              <p className="text-gray-600">Track progress and manage team tasks</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setTeamOpen(true)} className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11">
                <Users className="w-4 h-4" /> Team
              </Button>

              <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11">
                <Tag className="w-4 h-4" /> Filter
              </Button>

              <Button onClick={() => document.getElementById("add-task-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl h-11">
                <Plus className="w-4 h-4" /> New Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {[
              ["Total Tasks", totalTasks],
              ["In Progress", inProgressCount],
              ["Completed", completedCount],
              ["Team Members", members.length || 0],
            ].map(([label, num]) => (
              <div key={label} className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md">
                <p className="text-sm text-gray-600 mb-1">{label}</p>
                <p className="text-2xl text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
                  {num}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="add-task-form" className="bg-white shadow rounded-xl p-6 mb-8">
          <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="border rounded p-2" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <select className="border rounded p-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input className="border rounded p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <textarea className="border rounded p-2 col-span-1 md:col-span-4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="col-span-1 md:col-span-4 flex gap-2">
              <button className="bg-teal-600 text-white px-4 py-2 rounded" type="submit">Add Task</button>
              <button type="button" onClick={() => setForm({ title: "", description: "", priority: "medium", dueDate: "" })} className="px-4 py-2 rounded border">Reset</button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap gap-5 w-full pb-6">
          {loading ? <div>Loading tasks...</div> : columns.map((col) => <ColumnComponent key={col.id} column={col} onDrop={handleDrop} onToggle={toggleComplete} onDelete={deleteTask} members={members} workspaceId={workspace?._id} />)}
        </div>

        <TeamModal open={teamOpen} onClose={() => setTeamOpen(false)} workspaceId={workspace?._id} />

        <FilterModal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} members={members} onApply={(f) => { setFilter(f); loadTasks(f); }} initial={filter} />
      </div>
    </DndProvider>
  );
}
